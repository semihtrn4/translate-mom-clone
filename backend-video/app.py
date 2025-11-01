import os
import requests
from flask import Flask, request, jsonify
from supabase import create_client, Client
import subprocess
import tempfile

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = Flask(__name__)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError("SUPABASE_URL veya SUPABASE_SERVICE_KEY tanımlı değil.")

# Supabase client oluştur
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

@app.route("/", methods=["GET"])
def home():
    return """
    <h2>✅ Video Processing Backend Çalışıyor</h2>
    <p>Servis başarıyla ayakta.</p>
    <ul>
        <li><a href='/health'>/health</a> → Sağlık kontrolü</li>
        <li>POST /render_subtitle → Video + altyazı birleştirme</li>
    </ul>
    """

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "video-processing-backend"})

@app.route("/render_subtitle", methods=["POST"])
def render_subtitle():
    """
    Video + altyazı birleştirme işlemi (Memory Optimized)
    Expects: {video_url, subtitle_url, output_name, user_id}
    """
    input_video = None
    subtitle_file = None
    output_video = None
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"success": False, "error": "No JSON data received"}), 400
        
        video_url = data.get("video_url")
        subtitle_url = data.get("subtitle_url")
        output_name = data.get("output_name", "final.mp4")
        user_id = data.get("user_id", "anonymous")

        if not video_url or not subtitle_url:
            return jsonify({"success": False, "error": "video_url and subtitle_url are required"}), 400

        print(f"Processing video for user: {user_id}")
        print(f"Video URL: {video_url}")
        print(f"Subtitle URL: {subtitle_url}")

        # Geçici dosyalar oluştur
        with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp_video:
            input_video = tmp_video.name
        with tempfile.NamedTemporaryFile(suffix='.ass', delete=False) as tmp_sub:
            subtitle_file = tmp_sub.name
        with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp_out:
            output_video = tmp_out.name

        # Video'yu indir (STREAMING - memory efficient)
        print("Downloading video...")
        video_response = requests.get(video_url, timeout=300, stream=True)
        if video_response.status_code != 200:
            raise Exception(f"Failed to download video: HTTP {video_response.status_code}")
        
        with open(input_video, "wb") as f:
            for chunk in video_response.iter_content(chunk_size=8192):
                f.write(chunk)
        print("Video downloaded successfully")

        # Subtitle'ı indir
        print("Downloading subtitle...")
        subtitle_response = requests.get(subtitle_url, timeout=60)
        if subtitle_response.status_code != 200:
            raise Exception(f"Failed to download subtitle: HTTP {subtitle_response.status_code}")
        
        with open(subtitle_file, "wb") as f:
            f.write(subtitle_response.content)
        print(f"Subtitle downloaded: {len(subtitle_response.content)} bytes")

        # FFmpeg ile subtitle'ı videoya yak (MEMORY OPTIMIZED)
        print("Running FFmpeg with memory optimization...")
        ffmpeg_cmd = [
            "ffmpeg", "-y",
            "-i", input_video,
            "-vf", f"ass={subtitle_file}",
            "-c:v", "libx264",              # Video codec
            "-preset", "ultrafast",         # Hız öncelikli (daha az RAM)
            "-crf", "28",                   # Kalite (28 = düşük dosya boyutu)
            "-c:a", "copy",                 # Audio kopyala
            "-max_muxing_queue_size", "1024",  # Buffer boyutu
            "-threads", "1",                # Tek thread (daha az RAM)
            output_video
        ]
        
        result = subprocess.run(
            ffmpeg_cmd,
            capture_output=True,
            text=True,
            timeout=600
        )
        
        if result.returncode != 0:
            print(f"FFmpeg stderr: {result.stderr}")
            raise Exception(f"FFmpeg failed with code {result.returncode}: {result.stderr}")
        
        print("FFmpeg completed successfully")

        # Input dosyalarını hemen sil (RAM serbest bırak)
        try:
            os.remove(input_video)
            print("Input video cleaned up")
            input_video = None
        except Exception as e:
            print(f"Failed to clean input video: {e}")

        try:
            os.remove(subtitle_file)
            print("Subtitle file cleaned up")
            subtitle_file = None
        except Exception as e:
            print(f"Failed to clean subtitle: {e}")

        # Supabase'e yükle
        storage_path = f"{user_id}/{output_name}"
        print(f"Uploading to Supabase: {storage_path}")
        
        # Eski dosyayı sil (varsa)
        try:
            supabase.storage.from_("processed-videos").remove([storage_path])
            print("Existing file removed")
        except Exception as e:
            print(f"No existing file to remove: {e}")

        # Output video'yu yükle
        print("Reading output video...")
        with open(output_video, "rb") as f:
            video_data = f.read()
            print(f"Video file size: {len(video_data)} bytes")
            
            supabase.storage.from_("processed-videos").upload(
                path=storage_path,
                file=video_data,
                file_options={"content-type": "video/mp4"}
            )
        
        print(f"Uploaded {len(video_data)} bytes to Supabase")

        # Public URL al
        public_url = supabase.storage.from_("processed-videos").get_public_url(storage_path)
        
        print(f"Final video URL: {public_url}")

        return jsonify({
            "success": True,
            "final_video_url": public_url
        })

    except subprocess.TimeoutExpired:
        print("FFmpeg timeout error")
        return jsonify({"success": False, "error": "FFmpeg processing timeout"}), 500
    except requests.Timeout:
        print("Download timeout error")
        return jsonify({"success": False, "error": "Download timeout"}), 500
    except Exception as e:
        print(f"Error in render_subtitle: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        # Geçici dosyaları temizle
        for f in [input_video, subtitle_file, output_video]:
            if f:
                try:
                    os.remove(f)
                    print(f"Cleaned up: {f}")
                except Exception as e:
                    print(f"Failed to clean up {f}: {e}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() in ("1", "true", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)

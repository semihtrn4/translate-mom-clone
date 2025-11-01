import os
from flask import Flask, request, jsonify
from supabase import create_client
import subprocess

# -----------------------------
# Opsiyonel: .env dosyasını yükle
# -----------------------------
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = Flask(__name__)

# -----------------------------
# Supabase Client (güvenli)
# -----------------------------
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError(
        "SUPABASE_URL veya SUPABASE_SERVICE_KEY tanımlı değil. "
        "Render dashboard veya .env dosyasından bu değerleri ekleyin."
    )

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# -----------------------------
# ROUTES
# -----------------------------
@app.route("/", methods=["GET"])
def home():
    """Ana sayfa — basit durum mesajı döner"""
    return """
    <h2>✅ Video Processing Backend Çalışıyor</h2>
    <p>Servis başarıyla ayakta.</p>
    <ul>
        <li><a href='/health'>/health</a> → Sağlık kontrolü</li>
        <li>POST /process → FFmpeg işlem simülasyonu</li>
        <li>POST /render_subtitle → Video + altyazı birleştirme</li>
    </ul>
    """

@app.route("/health", methods=["GET"])
def health():
    """Sağlık kontrolü"""
    return jsonify({"status": "healthy", "service": "video-processing-backend"})

@app.route("/process", methods=["POST"])
def process():
    """Simulated video processing endpoint."""
    try:
        result = subprocess.run(
            ["ffmpeg", "-version"],
            capture_output=True,
            text=True,
            check=True
        )
        return jsonify({
            "status": "ok",
            "message": "processing simulated",
            "ffmpeg_version": result.stdout.splitlines()[0] if result.stdout else "unknown"
        }), 200
    except subprocess.CalledProcessError as e:
        return jsonify({
            "status": "error",
            "message": f"FFmpeg failed: {e.stderr}"
        }), 500
    except FileNotFoundError:
        return jsonify({
            "status": "error",
            "message": "FFmpeg bulunamadı. Sunucuda ffmpeg yüklü değil."
        }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# -----------------------------
# Yeni Route: /render_subtitle
# -----------------------------
@app.route("/render_subtitle", methods=["POST"])
def render_subtitle():
    """
    Video + altyazı birleştirme işlemi (FFmpeg + Supabase upload)
    """
    try:
        data = request.get_json()
        video_url = data["video_url"]
        subtitle_url = data["subtitle_url"]
        output_name = data.get("output_name", "final.mp4")
        user_id = data.get("user_id", "anonymous")

        # Geçici dosya isimleri
        input_video = "input.mp4"
        subtitle_file = "subtitles.ass"
        output_video = "output.mp4"

        # Dosyaları indir
        subprocess.run(["wget", "-O", input_video, video_url], check=True)
        subprocess.run(["wget", "-O", subtitle_file, subtitle_url], check=True)

        # FFmpeg ile altyazıyı göm (-y parametresiyle mevcut dosya üzerine yazar)
        subprocess.run([
            "ffmpeg", "-y", "-i", input_video, "-vf", f"ass={subtitle_file}", "-c:a", "copy", output_video
        ], check=True)

        # Önce aynı isimde dosya varsa sil
        try:
            supabase.storage.from_("processed-videos").remove([f"{user_id}/{output_name}"])
        except Exception as e:
            print("⚠️ Eski dosya silinemedi:", e)

        # Supabase’a yükle
        with open(output_video, "rb") as f:
            res = supabase.storage.from_("processed-videos").upload(
                f"{user_id}/{output_name}", f.read(), {"contentType": "video/mp4"}
            )

        # Public URL oluştur
        public_url = supabase.storage.from_("processed-videos").get_public_url(f"{user_id}/{output_name}")
        public_url_data = public_url.get("data", {})
        final_url = public_url_data.get("publicUrl", None)

        return jsonify({
            "success": True,
            "final_video_url": final_url
        }), 200

    except subprocess.CalledProcessError as e:
        return jsonify({
            "success": False,
            "error": f"FFmpeg veya wget hatası: {e.stderr}"
        }), 500
    except FileNotFoundError as e:
        return jsonify({
            "success": False,
            "error": f"Gerekli araç eksik: {str(e)}"
        }), 500
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        # Geçici dosyaları temizle
        for f in ["input.mp4", "subtitles.ass", "output.mp4"]:
            try:
                if os.path.exists(f):
                    os.remove(f)
            except Exception:
                pass

# -----------------------------
# WSGI Entry Point
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() in ("1", "true", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)

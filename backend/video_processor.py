try:
    from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
    from moviepy.video.tools.subtitles import SubtitlesClip
    import json
    import sys
    import requests
    import os
    import tempfile
except ImportError as e:
    print(f"Error importing required modules: {e}")
    sys.exit(1)

def parse_srt_subtitles(srt_content):
    """
    Parse SRT subtitle format into a list of (start_time, end_time, text) tuples
    """
    subtitles = []
    blocks = srt_content.strip().split('\n\n')
    
    for block in blocks:
        lines = block.strip().split('\n')
        if len(lines) >= 3:
            # Skip subtitle number if present
            time_line = None
            text_lines = []
            
            # Find the time line (contains -->)
            for i, line in enumerate(lines):
                if '-->' in line:
                    time_line = line
                    text_lines = lines[i+1:]
                    break
            
            if time_line:
                # Parse time format: 00:00:01,234 --> 00:00:03,456
                start_time_str, end_time_str = time_line.split(' --> ')
                
                # Convert to seconds
                start_time = parse_time_string(start_time_str)
                end_time = parse_time_string(end_time_str)
                
                # Join text lines
                text = ' '.join(text_lines)
                
                subtitles.append((start_time, end_time, text))
    
    return subtitles

def parse_time_string(time_str):
    """
    Convert time string (00:00:01,234) to seconds
    """
    # Handle both comma and period as decimal separator
    time_str = time_str.replace(',', '.')
    parts = time_str.split(':')
    
    if len(parts) == 3:
        h, m, s = parts
        return int(h) * 3600 + int(m) * 60 + float(s)
    elif len(parts) == 2:
        m, s = parts
        return int(m) * 60 + float(s)
    else:
        return float(parts[0])

def download_file(url, local_path):
    """
    Download a file from URL to local path
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(local_path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"Error downloading file: {e}")
        return False

def process_video_with_subtitles(video_path, srt_path, output_path, style_config=None):
    """
    Process video by embedding subtitles using moviepy
    
    Args:
        video_path (str): Path to the input video file
        srt_path (str): Path to the SRT subtitle file
        output_path (str): Path where the output video will be saved
        style_config (dict): Optional styling configuration for subtitles
    """
    try:
        # Load video
        print(f"Loading video from: {video_path}")
        video = VideoFileClip(video_path)
        print(f"Video loaded. Duration: {video.duration} seconds, Size: {video.size}")
        
        # Load and parse subtitles
        print(f"Loading subtitles from: {srt_path}")
        with open(srt_path, 'r', encoding='utf-8') as f:
            srt_content = f.read()
        
        # Parse SRT subtitles
        subtitle_data = parse_srt_subtitles(srt_content)
        print(f"Parsed {len(subtitle_data)} subtitle entries")
        
        # Create subtitle generator function
        def make_textclip(txt):
            # Default style
            style = {
                'fontsize': 24,
                'font': 'Arial',
                'color': 'white',
                'stroke_color': 'black',
                'stroke_width': 1,
                'method': 'caption'
            }
            
            # Apply custom style if provided
            if style_config:
                style.update(style_config)
            
            # Handle size parameter for TextClip
            size = style.pop('size', video.size)
            
            print(f"Creating text clip with style: {style}")
            
            # Create clip with size parameter
            try:
                clip = TextClip(txt, size=size, **style)
                return clip
            except Exception as e:
                print(f"Error creating TextClip: {e}")
                # Fallback to simpler text clip
                return TextClip(txt, fontsize=style.get('fontsize', 24), color=style.get('color', 'white'))

        # Create subtitles clip
        print("Creating subtitles clip...")
        subtitles = SubtitlesClip(subtitle_data, make_textclip)
        
        # Position subtitles
        print("Positioning subtitles...")
        subtitles = subtitles.set_position(('center', 'bottom'))
        
        # Composite video with subtitles
        print("Compositing video with subtitles...")
        final_video = CompositeVideoClip([video, subtitles.set_start(0)])
        
        # Write output video
        print(f"Writing output video to: {output_path}")
        final_video.write_videofile(
            output_path,
            codec='libx264',
            audio_codec='aac',
            temp_audiofile='temp-audio.m4a',
            remove_temp=True,
            verbose=True,
            logger='bar'  # Show progress bar
        )
        
        # Clean up
        video.close()
        final_video.close()
        
        print("Video processing completed successfully")
        return True, "Video processed successfully"
    
    except Exception as e:
        print(f"Error processing video: {e}")
        import traceback
        traceback.print_exc()
        return False, str(e)

def process_video_from_urls(video_url, srt_url, output_path, style_config=None):
    """
    Process video by downloading files from URLs and embedding subtitles
    
    Args:
        video_url (str): URL to the input video file
        srt_url (str): URL to the SRT subtitle file
        output_path (str): Path where the output video will be saved
        style_config (dict): Optional styling configuration for subtitles
    """
    try:
        # Create temporary directory for downloaded files
        with tempfile.TemporaryDirectory() as temp_dir:
            video_path = os.path.join(temp_dir, 'input_video.mp4')
            srt_path = os.path.join(temp_dir, 'subtitles.srt')
            
            # Download files
            print("Downloading video file...")
            if not download_file(video_url, video_path):
                return False, "Failed to download video file"
            
            print("Downloading subtitle file...")
            if not download_file(srt_url, srt_path):
                return False, "Failed to download subtitle file"
            
            # Process video
            print("Processing video with subtitles...")
            success, message = process_video_with_subtitles(
                video_path, 
                srt_path, 
                output_path, 
                style_config
            )
            
            return success, message
    
    except Exception as e:
        print(f"Error in process_video_from_urls: {e}")
        import traceback
        traceback.print_exc()
        return False, f"Error downloading files: {str(e)}"

def main():
    """
    Main function to process video with subtitles
    Expects JSON input with video_url, srt_url, output_path, and optional style_config
    """
    try:
        # Read input from stdin
        input_data = json.load(sys.stdin)
        
        video_url = input_data['video_url']
        srt_url = input_data['srt_url']
        output_path = input_data.get('output_path', 'output.mp4')
        style_config = input_data.get('style_config', {})
        
        print(f"Processing video: {video_url}")
        print(f"Subtitles: {srt_url}")
        print(f"Output: {output_path}")
        print(f"Style config: {style_config}")
        
        # Process video
        success, message = process_video_from_urls(
            video_url, 
            srt_url, 
            output_path, 
            style_config
        )
        
        # Output result
        result = {
            'success': success,
            'message': message
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'success': False,
            'message': f'Error processing input: {str(e)}'
        }
        print(json.dumps(error_result))

if __name__ == "__main__":
    main()
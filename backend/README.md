# Video Processing Backend Service

This Python backend service uses moviepy to merge video files with subtitle files.

## Requirements

- Python 3.7+
- moviepy 1.0.3
- requests 2.31.0
- Flask 2.3.2

## Installation

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Install FFmpeg (required by moviepy):
   - Windows: Download from https://ffmpeg.org/download.html
   - macOS: `brew install ffmpeg`
   - Linux: `sudo apt-get install ffmpeg`

## Running as a Web Service

To run the service as a web server:

```bash
python app.py
```

The service will start on port 8000 and expose two endpoints:
- `POST /process` - Process video with subtitles
- `GET /health` - Health check endpoint

## Usage

### As a Web Service

Send a POST request to `/process` with the following JSON payload:

```json
{
  "video_url": "https://example.com/video.mp4",
  "srt_url": "https://example.com/subtitles.srt",
  "user_id": "user123",
  "video_name": "my_video.mp4",
  "style_config": {
    "fontsize": 24,
    "font": "Arial",
    "color": "white",
    "stroke_color": "black",
    "stroke_width": 1
  }
}
```

The service will respond with:
```json
{
  "success": true,
  "message": "Video processed successfully"
}
```

### As a Standalone Script

The service can also be used as a standalone script by providing JSON input via stdin:

```bash
echo '{"video_url": "https://example.com/video.mp4", "srt_url": "https://example.com/subtitles.srt"}' | python video_processor.py
```

## Deployment

### Using Docker (Recommended)

1. Build and run the Docker container:
   ```bash
   docker build -t video-processing-backend .
   docker run -d -p 8000:8000 video-processing-backend
   ```

2. Or use the provided deployment script:
   ```bash
   deploy.bat
   ```

### Manual Deployment

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Install FFmpeg:
   - Windows: Download from https://ffmpeg.org/download.html and add to PATH
   - macOS: `brew install ffmpeg`
   - Linux: `sudo apt-get install ffmpeg`

3. Run the service:
   ```
   python app.py
   ```

## Integration with Supabase

This service is designed to be called from a Supabase Edge Function. The Edge Function should:

1. Upload the video and subtitle files to Supabase Storage
2. Get public URLs for the uploaded files
3. Call this Python service with the URLs
4. Handle the response and return appropriate feedback to the client

## Environment Variables

- `PORT` - Port to run the web service on (default: 8000)
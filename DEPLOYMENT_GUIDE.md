# Deployment and Testing Guide

This guide explains how to deploy and test the video processing integration with the Python backend service.

## Prerequisites

1. Python 3.7+
2. Node.js and npm
3. Supabase CLI
4. FFmpeg (for moviepy)

## Local Development Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Install FFmpeg

- **Windows**: Download from https://ffmpeg.org/download.html and add to PATH
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt-get install ffmpeg`

### 3. Run the Python Service Locally

```bash
cd backend
python app.py
```

The service will start on port 8000.

### 4. Set Supabase Environment Variables

In your Supabase project, set these environment variables:

```bash
supabase secrets set PYTHON_VIDEO_SERVICE_URL=http://localhost:8000/process
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Note: For local development, you might need to use `host.docker.internal` instead of `localhost` if running the Python service on the same machine as the Supabase functions.

## Docker Deployment

### 1. Build and Run with Docker

```bash
cd backend
docker build -t video-processing-backend .
docker run -d -p 8000:8000 video-processing-backend
```

### 2. Or use the provided deployment script

```bash
cd backend
deploy.bat
```

## Testing the Integration

### 1. Test the Python Service Directly

Send a POST request to `http://localhost:8000/process` with JSON data:

```json
{
  "video_url": "https://example.com/video.mp4",
  "srt_url": "https://example.com/subtitles.srt",
  "user_id": "test_user",
  "video_name": "test_video.mp4"
}
```

### 2. Test via the Supabase Edge Function

Use the frontend application to:
1. Upload a video
2. Add subtitles
3. Click "Create Video with Subtitles"

Monitor the Supabase function logs to verify the integration works correctly.

## Troubleshooting

### Common Issues

1. **"Connection refused" errors**: Make sure the Python service is running on port 8000
2. **Authentication errors**: Verify the Supabase environment variables are set correctly
3. **FFmpeg not found**: Ensure FFmpeg is installed and in the PATH
4. **File upload errors**: Check that the Supabase storage buckets exist and have correct permissions

### Checking Logs

1. **Python service logs**: Check the terminal where you ran `python app.py`
2. **Supabase function logs**: Use the Supabase dashboard or CLI:
   ```bash
   supabase functions logs process-video
   ```

## Production Deployment

For production deployment, consider:

1. **Hosting the Python service**: Use a cloud provider (AWS, Google Cloud, Azure) or a container orchestration platform (Kubernetes)
2. **Environment variables**: Set production values for all environment variables
3. **Security**: Restrict access to the Python service endpoints
4. **Monitoring**: Implement logging and monitoring for both the Python service and Supabase functions
5. **Scaling**: Consider using a message queue for handling multiple video processing requests

## Health Checks

The Python service provides a health check endpoint at `GET /health` which returns:

```json
{
  "status": "healthy",
  "service": "video-processing-backend"
}
```

Use this endpoint to monitor the service status in production.
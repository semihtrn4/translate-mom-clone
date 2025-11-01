# Video Processing Backend

This is a Python Flask backend for processing videos with FFmpeg and integrating with Supabase.

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- FFmpeg installed on your system

## Setup Instructions

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements-full.txt
   ```

3. **Set environment variables**:
   Create a `.env` file with the following variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   PORT=5000  # Optional, defaults to 5000
   FLASK_DEBUG=false  # Optional, defaults to false
   ```

4. **Run the server**:
   ```bash
   python app.py
   ```

   Or for production:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

## API Endpoints

- `GET /` - Health check and API documentation
- `GET /health` - Health status
- `POST /process` - Simulate video processing
- `POST /render_subtitle` - Render subtitles onto video

## Required System Tools

- FFmpeg: Used for video processing
- wget: Used for downloading files (on Windows, you might need to install it separately)

On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg wget
```

On macOS (with Homebrew):
```bash
brew install ffmpeg wget
```

On Windows:
Download FFmpeg from https://ffmpeg.org/download.html and add it to your PATH.
For wget, you can use PowerShell's `Invoke-WebRequest` or install wget for Windows.
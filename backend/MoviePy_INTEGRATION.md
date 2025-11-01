# MoviePy Video Processing Integration

This document explains how the MoviePy library is integrated into the video processing workflow for the translate-mom-clone application.

## Overview

The video processing workflow uses MoviePy, a Python library for video editing, to embed subtitles into videos. The integration follows this architecture:

1. **Frontend** - User uploads video and creates subtitles
2. **Supabase Edge Function** - Authenticates user and orchestrates the process
3. **Python Backend Service** - Uses MoviePy to process the video
4. **Supabase Storage** - Stores input and output files

## How It Works

### 1. Data Flow

```
User Uploads Video + Subtitles
        ↓
Supabase Edge Function (process-video)
        ↓
Convert to SRT Format & Upload to Storage
        ↓
Call Python Backend Service with File URLs
        ↓
Python Service Downloads Files
        ↓
MoviePy Processes Video with Subtitles
        ↓
Upload Processed Video to Supabase Storage
        ↓
Return Processed Video URL to Frontend
```

### 2. MoviePy Processing Steps

1. **Download Files**: The Python service downloads the video and SRT subtitle files from Supabase Storage
2. **Parse Subtitles**: Convert SRT format to MoviePy's subtitle format
3. **Load Video**: Load the video file using `VideoFileClip`
4. **Create Text Clips**: Generate text clips for each subtitle using `TextClip`
5. **Composite Video**: Overlay subtitles on the video using `CompositeVideoClip`
6. **Export Video**: Save the final video with embedded subtitles

### 3. Key MoviePy Components

- `VideoFileClip`: Loads and processes video files
- `TextClip`: Creates text overlays for subtitles
- `SubtitlesClip`: Handles subtitle timing and positioning
- `CompositeVideoClip`: Combines video and subtitle layers

## Styling Options

The service supports various subtitle styling options:

- **Font**: Font family and size
- **Color**: Text color and background color
- **Outline**: Stroke color and width
- **Position**: Top, middle, or bottom positioning
- **Effects**: Bold and italic text

## Error Handling

The integration includes comprehensive error handling:

- File download failures
- Video processing errors
- Subtitle parsing issues
- Storage upload problems

## Performance Considerations

- Videos are processed in temporary directories
- Resources are properly cleaned up after processing
- Temporary files are automatically removed

## Testing

To test the MoviePy integration:

```bash
cd backend
python test_moviepy.py
```

This will verify that:
- All MoviePy imports work correctly
- Subtitle parsing functions properly
- Video processing functions can be imported

## Deployment

The Python service can be deployed as:

1. **Standalone Service**: Run directly with Python
2. **Docker Container**: Using the provided Dockerfile
3. **Cloud Function**: As an AWS Lambda, Google Cloud Function, etc.

## Environment Variables

The service requires these environment variables:

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for storage access)

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are installed
2. **FFmpeg Issues**: MoviePy requires FFmpeg to be installed
3. **Memory Errors**: Large videos may require more memory
4. **Timeout Issues**: Long videos may exceed processing time limits

### Debugging Steps

1. Check that all Python dependencies are installed
2. Verify FFmpeg is available in the system PATH
3. Test with small video files first
4. Check Supabase credentials and permissions
import requests
import json
import os

# Check if we have test files
test_video = "test_video.mp4"
test_srt = "test_subtitles.srt"

# Create a simple SRT file for testing
srt_content = """1
00:00:01,000 --> 00:00:03,000
Hello World!

2
00:00:03,500 --> 00:00:05,500
This is a test subtitle.
"""

with open(test_srt, "w") as f:
    f.write(srt_content)

print(f"Created test SRT file: {test_srt}")

# Test the video processing endpoint with local files
url = "http://localhost:8000/process"

# For local testing, we'll need to serve the files via HTTP
# For now, let's just test the endpoint structure
data = {
    "video_url": "http://localhost:8001/test_video.mp4",  # This won't work without a local server
    "srt_url": f"http://localhost:8001/{test_srt}",
    "user_id": "test_user",
    "video_name": "test_video.mp4",
    "style_config": {
        "fontsize": 24,
        "font": "Arial",
        "color": "white",
        "stroke_color": "black",
        "stroke_width": 1
    }
}

print("Testing video processing service structure...")
print(f"Data: {json.dumps(data, indent=2)}")

# Let's also test with a simple direct call to the processing function
from video_processor import process_video_from_urls

print("\nTesting direct function call...")
try:
    # This will fail because we don't have a real video file
    # But it will help us see if the function structure is working
    success, message = process_video_from_urls(
        "nonexistent.mp4",
        test_srt,
        "output.mp4",
        data["style_config"]
    )
    print(f"Direct function call result - Success: {success}, Message: {message}")
except Exception as e:
    print(f"Expected error in direct function call: {e}")

print("\nTest completed.")
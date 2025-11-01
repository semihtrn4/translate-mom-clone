import requests
import json

# Test the video processing endpoint
url = "http://localhost:8000/process"

# Sample test data
data = {
    "video_url": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "srt_url": "https://raw.githubusercontent.com/opensubtitles/download-sample-files/master/sample.srt",
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

print("Testing video processing service...")
print(f"Sending request to: {url}")
print(f"Data: {json.dumps(data, indent=2)}")

try:
    response = requests.post(url, json=data)
    print(f"Response status code: {response.status_code}")
    print(f"Response headers: {response.headers}")
    print(f"Response content: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"Success: {result.get('success')}")
        print(f"Message: {result.get('message')}")
        if 'processed_video_url' in result:
            print(f"Processed video URL: {result['processed_video_url']}")
        if 'processed_video_path' in result:
            print(f"Processed video path: {result['processed_video_path']}")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"Error making request: {e}")
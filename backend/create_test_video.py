#!/usr/bin/env python3
"""
Script to create a simple test video using OpenCV
"""

try:
    import cv2
    import numpy as np
except ImportError as e:
    print(f"Error importing required modules: {e}")
    print("\nPlease install the required packages:")
    print("pip install opencv-python numpy")
    print("\nOr install all dependencies from requirements.txt:")
    print("pip install -r requirements.txt")
    print("\nOn Windows, if you encounter issues, try:")
    print("pip install --upgrade pip")
    print("pip install --no-cache-dir opencv-python")
    exit(1)

# Create a simple test video
width, height = 640, 480
fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # type: ignore[attr-defined]
out = cv2.VideoWriter('test_video.mp4', fourcc, 30.0, (width, height))

# Create 90 frames (3 seconds at 30fps)
for i in range(90):
    # Create a black frame
    frame = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Add some text
    text = f'Test Video Frame {i}'
    cv2.putText(frame, text, (50, height//2), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    
    # Write the frame
    out.write(frame)

# Release everything
out.release()
print('Test video created successfully: test_video.mp4')
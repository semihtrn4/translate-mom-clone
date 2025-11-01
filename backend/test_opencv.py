#!/usr/bin/env python3
"""
Test script to check OpenCV installation
"""

try:
    import cv2
    print("SUCCESS: OpenCV imported successfully!")
    print(f"OpenCV version: {cv2.__version__}")
except ImportError as e:
    print("ERROR: Could not import cv2")
    print(f"Error details: {e}")
    print("\nTo fix this issue, please install opencv-python:")
    print("pip install opencv-python")
    print("\nOr if you're using the requirements.txt file:")
    print("pip install -r requirements.txt")
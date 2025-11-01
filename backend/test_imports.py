"""
Test script to verify that all required imports work correctly
"""
def test_imports():
    try:
        # Test Flask imports
        from flask import Flask, request, jsonify
        print("✓ Flask imports successful")
        
        # Test requests import
        import requests
        print("✓ Requests import successful")
        
        # Test moviepy imports
        from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
        from moviepy.video.tools.subtitles import SubtitlesClip
        print("✓ MoviePy imports successful")
        
        # Test video_processor module
        import video_processor
        print("✓ Video processor module import successful")
        
        # Test app module
        import app
        print("✓ App module import successful")
        
        print("\nAll imports successful! The Python backend is ready to use.")
        return True
        
    except Exception as e:
        print(f"✗ Import error: {e}")
        return False

if __name__ == "__main__":
    test_imports()
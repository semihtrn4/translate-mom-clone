"""
Test script to verify that the moviepy functionality works correctly
"""
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_moviepy_imports():
    """Test that all moviepy imports work correctly"""
    try:
        from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
        from moviepy.video.tools.subtitles import SubtitlesClip
        print("✓ All moviepy imports successful")
        return True
    except ImportError as e:
        print(f"✗ Moviepy import error: {e}")
        return False

def test_subtitle_parsing():
    """Test subtitle parsing functionality"""
    try:
        from video_processor import parse_srt_subtitles
        
        # Test SRT content
        test_srt = """1
00:00:01,000 --> 00:00:03,000
Hello World

2
00:00:05,000 --> 00:00:07,000
This is a test subtitle"""
        
        subtitles = parse_srt_subtitles(test_srt)
        if len(subtitles) == 2:
            print("✓ Subtitle parsing successful")
            return True
        else:
            print("✗ Subtitle parsing failed - incorrect number of subtitles")
            return False
    except Exception as e:
        print(f"✗ Subtitle parsing error: {e}")
        return False

def test_video_processing_function():
    """Test that the video processing function can be imported"""
    try:
        from video_processor import process_video_with_subtitles
        print("✓ Video processing function import successful")
        return True
    except Exception as e:
        print(f"✗ Video processing function import error: {e}")
        return False

def main():
    """Run all tests"""
    print("Testing moviepy functionality...")
    print("=" * 40)
    
    tests = [
        test_moviepy_imports,
        test_subtitle_parsing,
        test_video_processing_function
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
    
    print("=" * 40)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! The moviepy setup is working correctly.")
        return 0
    else:
        print("❌ Some tests failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
"""
Script to run the video processing service locally for testing
"""
import os
import sys
import subprocess

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"Error installing requirements: {e}")
        return False
    return True

def run_service():
    """Run the Flask service"""
    try:
        # Set environment variable for local testing
        os.environ['PORT'] = '8000'
        print("Starting video processing service on port 8000...")
        print("Press Ctrl+C to stop the service")
        
        # Run the app
        subprocess.check_call([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\nService stopped")
    except Exception as e:
        print(f"Error running service: {e}")

if __name__ == "__main__":
    print("Video Processing Service Local Runner")
    print("====================================")
    
    # Install requirements if needed
    if install_requirements():
        run_service()
# OpenCV Installation Fix Guide

## Problem
The error `Import "cv2" could not be resolved` occurs because the OpenCV library is not installed in your Python environment.

## Solution

### 1. Install OpenCV
Add `opencv-python` to your requirements.txt (already done) and install it:

```bash
pip install opencv-python
```

Or install all dependencies from requirements.txt:
```bash
pip install -r backend/requirements.txt
```

### 2. Disk Space Issue
If you encounter a "No space left on device" error during installation:

1. Free up disk space on your system
2. Or try installing with no cache:
   ```bash
   pip install --no-cache-dir opencv-python
   ```

### 3. Alternative Installation Methods

If pip installation continues to fail:

1. **Using conda (if you have Anaconda/Miniconda):**
   ```bash
   conda install -c conda-forge opencv
   ```

2. **Using pre-compiled wheels:**
   Download a wheel file from [https://www.lfd.uci.edu/~gohlke/pythonlibs/#opencv](https://www.lfd.uci.edu/~gohlke/pythonlibs/#opencv) and install:
   ```bash
   pip install path/to/downloaded/opencv_python-xxx.whl
   ```

### 4. Verification
After installation, verify that OpenCV is working:

```python
import cv2
print("OpenCV version:", cv2.__version__)
```

### 5. For Your Specific Script
Your [create_test_video.py](file:///c%3A/Users/User/Desktop/translate-mom-clone/backend/create_test_video.py) script should work once OpenCV is properly installed.

## Additional Notes
- Make sure you're using the correct Python environment (you're already using `.venv`)
- If you continue to have issues, consider using a different virtual environment or system Python installation
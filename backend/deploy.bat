@echo off
echo Building Docker image...
docker build -t video-processing-backend .

echo Running container...
docker run -d -p 8000:8000 --name video-processing-service video-processing-backend

echo.
echo Video processing backend service deployed!
echo Service is running on http://localhost:8000
echo Health check: http://localhost:8000/health
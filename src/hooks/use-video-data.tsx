
import { useState, useEffect } from "react";

export function useVideoData(videoId: string) {
  const [originalVideoUrl, setOriginalVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedVideos = localStorage.getItem('uploadedVideos');
    if (savedVideos) {
      try {
        const videos = JSON.parse(savedVideos);
        const video = videos.find((v: any) => v.tempId === videoId);
        if (video) {
          setOriginalVideoUrl(video.url);
        }
      } catch (e) {
        console.error('Error loading video URL:', e);
      }
    }
  }, [videoId]);

  return { originalVideoUrl };
}

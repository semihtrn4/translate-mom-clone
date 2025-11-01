
import { useState, useEffect, useRef, useCallback } from "react";

export function useVideoBlobManager() {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Clean up the blob URL when component unmounts or URL changes
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  const createBlobUrl = useCallback((blob: Blob) => {
    // Clean up any existing blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    
    // Create a new blob URL
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setVideoBlob(blob);
    blobUrlRef.current = url;
    
    return url;
  }, []);

  const refreshBlobUrl = useCallback(() => {
    if (videoBlob) {
      // Revoke the old URL if it exists
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      
      // Create a new blob URL
      const newUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(newUrl);
      blobUrlRef.current = newUrl;
      return newUrl;
    }
    return videoUrl;
  }, [videoBlob, videoUrl]);

  return {
    videoBlob,
    videoUrl,
    createBlobUrl,
    refreshBlobUrl,
    setVideoBlob,
    setVideoUrl
  };
}

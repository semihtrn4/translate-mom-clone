
import React, { useState, useEffect, useRef } from "react";
import FinalVideoPlayer from "@/components/dashboard/FinalVideoPlayer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Download, Info } from "lucide-react";
import { useVideoProcessing } from "@/hooks/use-video-processing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FinalTabProps {
  videoUrl: string;
  videoName: string;
}

const FinalTab: React.FC<FinalTabProps> = ({ videoUrl, videoName }) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(videoUrl);
  const blobUrlRef = useRef<string | null>(null);
  
  const { refreshProcessedVideoUrl, processedVideoBlob } = useVideoProcessing();

  // Clean up any created blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    console.log("FinalTab: Setting up video URL:", videoUrl);
    
    // If previously we created a blob URL, revoke it
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    
    // Use the current URL directly
    setCurrentVideoUrl(videoUrl);
    
  }, [videoUrl, retryCount]);

  const handleRetry = () => {
    console.log("Retrying with new URL generation");
    
    // If previous blob URL exists, clean it up
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    
    // Try to get a refreshed URL from the processing hook
    const refreshedUrl = refreshProcessedVideoUrl();
    if (refreshedUrl && refreshedUrl !== currentVideoUrl) {
      console.log("Using refreshed blob URL:", refreshedUrl);
      setCurrentVideoUrl(refreshedUrl);
    } else {
      // Just increment the retry count to force a refresh
      setRetryCount(prevCount => prevCount + 1);
    }
    
    toast({
      title: "Retrying Video Load",
      description: "Attempting to reload the video with a fresh URL.",
    });
  };

  if (!videoUrl) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="font-medium text-red-500">Video Not Available</h3>
        <p className="mt-2">The processed video could not be loaded. Please try processing again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FinalVideoPlayer
        videoUrl={currentVideoUrl}
        videoName={videoName}
        onRetry={handleRetry}
      />
      
      <Alert variant="default" className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Browser-based Processing</AlertTitle>
        <AlertDescription>
          Currently, this app uses browser-based processing which has limitations. The subtitles are "soft-embedded" 
          rather than "hard-embedded" into the video. For proper embedding with FFmpeg, a server-side implementation 
          would be required. You can download both the video and subtitle file separately.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FinalTab;

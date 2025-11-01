
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, AlertTriangle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface FinalVideoPlayerProps {
  videoUrl: string;
  videoName: string;
  onRetry?: () => void;
}

const FinalVideoPlayer: React.FC<FinalVideoPlayerProps> = ({ 
  videoUrl, 
  videoName,
  onRetry 
}) => {
  const { toast } = useToast();
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Reset states when video URL changes
  useEffect(() => {
    console.log("FinalVideoPlayer: URL changed to", videoUrl);
    setIsVideoLoading(true);
    setVideoError(null);
    
    // Clean up any previous video elements
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.load();
      
      // Set a slight delay before setting the new src
      const timer = setTimeout(() => {
        try {
          if (videoRef.current) {
            videoRef.current.src = videoUrl;
            videoRef.current.load();
            console.log("Video src set and load() called");
          }
        } catch (error) {
          console.error("Error setting video source:", error);
          setVideoError("Failed to set video source. Please try again.");
          setIsVideoLoading(false);
        }
      }, 300);
      
      return () => {
        clearTimeout(timer);
        // Clean up on unmount or URL change
        if (videoElement) {
          videoElement.pause();
          videoElement.removeAttribute('src');
          videoElement.load();
        }
      };
    }
  }, [videoUrl, loadAttempts]);
  
  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsVideoLoading(false);
    setVideoError(null);
    
    // Auto-play after successful load
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Auto-play prevented by browser, user interaction required");
      });
    }
    
    toast({
      title: "Video Loaded Successfully",
      description: "Your video with embedded subtitles is now ready to play.",
    });
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error event:", e);
    setIsVideoLoading(false);
    
    // Check if there's source content
    if (videoRef.current && videoRef.current.src) {
      const isBlobUrl = videoRef.current.src.startsWith('blob:');
      setVideoError(
        isBlobUrl 
          ? "Failed to load the video from a temporary URL. The URL might have expired or been revoked."
          : "Failed to load the processed video. This could be due to an issue with the video source."
      );
    } else {
      setVideoError("Video source is missing or invalid. Please try processing the video again.");
    }
    
    toast({
      title: "Video Error",
      description: "Failed to load the processed video. Please try the 'Retry Loading' button.",
      variant: "destructive"
    });
  };

  const handleRetry = () => {
    console.log("Retrying video load directly...");
    setIsVideoLoading(true);
    setVideoError(null);
    setLoadAttempts(prev => prev + 1);
    
    toast({
      title: "Retrying",
      description: "Attempting to reload the video...",
    });
    
    // If parent component provided a retry function, call it
    if (onRetry) {
      onRetry();
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) {
      toast({
        title: "No Video Available",
        description: "There is no processed video to download.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      console.log("Downloading video from URL:", videoUrl);
      
      // For blob URLs, we can download directly
      if (videoUrl.startsWith('blob:')) {
        const a = document.createElement("a");
        a.href = videoUrl;
        a.download = `${videoName.replace(/\.[^/.]+$/, '')}_with_subtitles.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: "Your video with embedded subtitles is being downloaded.",
        });
      } else {
        toast({
          title: "Cannot Download",
          description: "This video cannot be downloaded directly.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error downloading video:", error);
      toast({
        title: "Download Failed",
        description: "There was a problem downloading the video.",
        variant: "destructive"
      });
    }
  };

  const isBlob = videoUrl && videoUrl.startsWith('blob:');

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Final Video with Embedded Subtitles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 mb-4">
          {isVideoLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading video...</span>
            </div>
          )}
          
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 z-10">
              <AlertTriangle className="h-10 w-10 mb-2" />
              <p className="text-center mb-4">{videoError}</p>
              <Button onClick={handleRetry} variant="default" className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" /> Retry Loading
              </Button>
            </div>
          )}
          
          <video 
            ref={videoRef}
            className="w-full h-full object-contain z-0"
            controls
            controlsList="nodownload"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{ display: videoError ? 'none' : 'block' }}
            playsInline
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button 
            onClick={handleRetry}
            variant="outline"
            className="w-full sm:w-auto flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> 
            Retry Loading
          </Button>
          
          <Button 
            onClick={handleDownload}
            className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 flex items-center"
            disabled={!isBlob || isVideoLoading || !!videoError}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Video
          </Button>
        </div>
        
        {/* Additional debug information */}
        <Alert variant="default" className="mt-4 bg-gray-100 dark:bg-gray-800">
          <AlertTitle className="text-xs font-medium">Technical Information</AlertTitle>
          <AlertDescription className="text-xs text-gray-500 break-all">
            <div>Video Name: {videoName}</div>
            <div>Video URL Type: {isBlob ? "Blob URL (with subtitles)" : "Regular URL"}</div>
            <div>URL Length: {videoUrl ? videoUrl.length : 0} characters</div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default FinalVideoPlayer;

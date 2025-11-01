
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { embedSubtitlesIntoVideo } from "@/services/ffmpegService";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { useVideoBlobManager } from "./use-video-blob-manager";

export function useVideoProcessor() {
  const [processingVideo, setProcessingVideo] = useState(false);
  const { 
    videoBlob, 
    videoUrl, 
    createBlobUrl, 
    refreshBlobUrl 
  } = useVideoBlobManager();
  const { toast } = useToast();

  const processVideoWithSubtitles = useCallback(async (
    originalVideoUrl: string | null,
    subtitleData: SubtitleSegment[] | null,
    subtitleStyle: SubtitleStyle,
    videoName: string
  ) => {
    if (!originalVideoUrl) {
      toast({
        title: "Video Not Found",
        description: "Could not find the original video to process.",
        variant: "destructive"
      });
      return null;
    }
    
    if (!subtitleData || subtitleData.length === 0) {
      toast({
        title: "No Subtitles",
        description: "There are no subtitle segments to embed.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      setProcessingVideo(true);
      
      toast({
        title: "Processing Video",
        description: "Embedding subtitles into your video...",
      });
      
      // Process the video and get both URL and blob
      const { processedUrl, processedBlob } = await embedSubtitlesIntoVideo(
        originalVideoUrl,
        subtitleData,
        subtitleStyle,
        videoName
      );
      
      // Create a blob URL from the processed blob
      if (processedBlob) {
        const url = createBlobUrl(processedBlob);
        
        toast({
          title: "Video Processing Complete",
          description: "Your subtitles have been embedded into the video.",
        });
        
        return url;
      } else {
        throw new Error("Failed to generate processed video blob");
      }
    } catch (error) {
      console.error("Error processing video:", error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing the video.",
        variant: "destructive"
      });
      return null;
    } finally {
      setProcessingVideo(false);
    }
  }, [toast, createBlobUrl]);

  return {
    processingVideo,
    videoBlob,
    videoUrl,
    refreshVideoUrl: refreshBlobUrl,
    processVideoWithSubtitles
  };
}

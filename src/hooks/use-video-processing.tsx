
import { useCallback } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle, defaultSubtitleStyle } from "@/services/subtitleStyle";
import { useVideoProcessor } from "./video/use-video-processor";

export function useVideoProcessing() {
  const {
    processingVideo,
    videoBlob: processedVideoBlob,
    videoUrl: processedVideoUrl,
    refreshVideoUrl: refreshProcessedVideoUrl,
    processVideoWithSubtitles
  } = useVideoProcessor();

  const createSubtitlesWithVideo = useCallback(async (
    originalVideoUrl: string | null,
    subtitleData: SubtitleSegment[] | null,
    subtitleStyle: SubtitleStyle,
    videoName: string
  ) => {
    return processVideoWithSubtitles(
      originalVideoUrl,
      subtitleData,
      subtitleStyle || defaultSubtitleStyle,
      videoName
    );
  }, [processVideoWithSubtitles]);

  return {
    processingVideo,
    processedVideoUrl,
    processedVideoBlob,
    setProcessedVideoUrl: useCallback(() => {}, []), // Deprecated - kept for backward compatibility
    refreshProcessedVideoUrl,
    createSubtitlesWithVideo
  };
}

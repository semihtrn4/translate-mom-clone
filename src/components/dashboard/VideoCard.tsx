import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extractAudioFromVideo, transcribeAudio } from "@/services/audioProcessingService";

interface UploadedVideo {
  name: string;
  size: number;
  url: string;
  tempId: string;
}

interface VideoCardProps {
  video: UploadedVideo;
  onSubtitlesGenerated: (subtitles: SubtitleSegment[], videoId: string) => void;
}

export interface SubtitleSegment {
  id: string;
  start: number; // milliseconds
  end: number; // milliseconds
  text: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSubtitlesGenerated }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcessVideo = async () => {
    try {
      setIsProcessing(true);
      toast({
        title: "Processing started",
        description: "Extracting audio from your video...",
      });

      // Step 1: Extract audio from video
      const audioBlob = await extractAudioFromVideo(video.url);
      
      toast({
        title: "Audio extracted",
        description: "Transcribing audio with AssemblyAI...",
      });

      // Step 2: Transcribe audio with AssemblyAI
      const subtitles = await transcribeAudio(audioBlob, video.name);
      
      // Step 3: Pass the subtitle data to the parent component
      onSubtitlesGenerated(subtitles, video.tempId);
      
      toast({
        title: "Processing complete",
        description: "Your video has been processed and subtitles generated!",
      });
    } catch (error) {
      console.error("Error processing video:", error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <video 
          src={video.url} 
          className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
          controls
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{video.name}</h3>
        <p className="text-sm text-gray-500">
          {(video.size / (1024 * 1024)).toFixed(2)} MB
        </p>
        <div className="mt-4 flex gap-2">
          <Button 
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
            onClick={handleProcessVideo}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Process Video"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;


import React, { useState } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import StylePreview from "@/components/dashboard/subtitle-styler/StylePreview";
import StyleSettings from "@/components/dashboard/subtitle-styler/StyleSettings";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StyleTabProps {
  subtitles: SubtitleSegment[];
  videoName: string;
  videoId: string;
  translatedSubtitles: SubtitleSegment[] | null;
  translationLanguageName: string | null;
  style?: SubtitleStyle;
  onStyleChange?: (newStyle: SubtitleStyle) => void;
  onCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
  subtitleFileContent?: string | null;
  subtitleFileName?: string | null;
  onCreateVideoWithSubtitles?: () => Promise<void>;
  isProcessingVideo?: boolean;
}

const StyleTab: React.FC<StyleTabProps> = ({
  subtitles,
  videoName,
  videoId,
  translatedSubtitles,
  translationLanguageName,
  style,
  onStyleChange,
  onCreateSubtitleFile,
  subtitleFileContent,
  subtitleFileName,
  onCreateVideoWithSubtitles,
  isProcessingVideo
}) => {
  const { toast } = useToast();
  const [processingStarted, setProcessingStarted] = useState(false);
  
  // Use translated subtitles if available, otherwise use original subtitles
  const displaySubtitles = translatedSubtitles || subtitles;
  
  const handleStyleChange = (key: keyof SubtitleStyle, value: any) => {
    if (style && onStyleChange) {
      const updatedStyle = { ...style, [key]: value };
      onStyleChange(updatedStyle);
    }
  };

  const handleCreateVideoWithSubtitles = async () => {
    setProcessingStarted(true);
    
    try {
      // Log that we're starting video processing
      console.log("Starting video processing with subtitles");
      
      if (onCreateVideoWithSubtitles) {
        await onCreateVideoWithSubtitles();
        
        toast({
          title: "Video Processing Started",
          description: "Your video is being processed with embedded subtitles. You'll be automatically redirected to the Final Video tab when it's ready.",
        });
      }
    } catch (error) {
      console.error("Error starting video processing:", error);
      toast({
        title: "Processing Error",
        description: "There was an error starting the video processing. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Style Settings</h3>
          {style && (
            <StyleSettings 
              style={style} 
              onStyleChange={handleStyleChange}
              subtitles={displaySubtitles}
              videoName={videoName}
              onCreateSubtitleFile={onCreateSubtitleFile}
            />
          )}
          
          <div className="mt-6">
            {subtitleFileContent && (
              <Button 
                onClick={handleCreateVideoWithSubtitles}
                disabled={isProcessingVideo || processingStarted}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 mt-4"
              >
                {isProcessingVideo ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Create Video with Subtitles
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <StylePreview 
            style={style}
            subtitles={displaySubtitles}
            videoId={videoId}
            translationLanguageName={translationLanguageName}
          />
        </div>
      </div>
      
      {subtitleFileContent && (
        <div className="mt-6">
          <Separator className="my-4" />
          <Alert>
            <AlertTitle>ASS Subtitle File: {subtitleFileName}</AlertTitle>
            <AlertDescription>
              <div className="mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md overflow-x-auto max-h-60">
                <pre className="text-xs whitespace-pre-wrap">{subtitleFileContent}</pre>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default StyleTab;

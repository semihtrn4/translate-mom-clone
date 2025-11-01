
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";

interface DownloadButtonsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
  subtitles: SubtitleSegment[];
  videoName: string;
  onCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  style,
  onStyleChange,
  subtitles,
  videoName,
  onCreateSubtitleFile
}) => {
  const { toast } = useToast();

  const handleCreateASS = () => {
    try {
      if (onCreateSubtitleFile) {
        const result = onCreateSubtitleFile('ass');
        if (result) {
          toast({
            title: "ASS File Created",
            description: `Advanced subtitle file has been created.`,
          });
        }
      }
      onStyleChange('preferredFormat', 'ass');
    } catch (error) {
      console.error("Error creating ASS subtitles:", error);
      toast({
        title: "Creation Failed",
        description: "There was an error creating your advanced subtitle file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={handleCreateASS} 
        variant="default"
        className="w-full"
        disabled={subtitles.length === 0}
        type="button"
      >
        <FileText className="h-4 w-4 mr-2" /> Create ASS Subtitle File
      </Button>
    </div>
  );
};

export default DownloadButtons;

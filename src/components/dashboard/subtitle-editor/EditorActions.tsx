
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Film, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EditorActionsProps {
  onDownload: () => void;
  onCreateSubtitles: () => void;
  isProcessing?: boolean;
  downloadLabel?: string;
  createSubtitlesLabel?: string;
}

const EditorActions: React.FC<EditorActionsProps> = ({
  onDownload,
  onCreateSubtitles,
  isProcessing = false,
  downloadLabel = "Download",
  createSubtitlesLabel = "Create Subtitles"
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button 
        variant="outline"
        onClick={onDownload}
        disabled={isProcessing}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        {downloadLabel}
      </Button>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="default"
            onClick={onCreateSubtitles}
            disabled={isProcessing}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Film className="h-4 w-4" />
                {createSubtitlesLabel}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>Translate the subtitles into the selected language and apply the chosen style settings. Burn (hardcode) the subtitles into the video.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default EditorActions;

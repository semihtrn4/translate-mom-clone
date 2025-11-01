
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Edit, Plus, Film } from "lucide-react";

interface SubtitleEditControlsProps {
  onEditTime?: () => void;
  onEditText?: () => void;
  onAddSegment?: () => void;
  onCreateSubtitles?: () => void;
}

const SubtitleEditControls: React.FC<SubtitleEditControlsProps> = ({
  onEditTime,
  onEditText,
  onAddSegment,
  onCreateSubtitles
}) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={onEditTime}
        disabled={!onEditTime}
        className="flex items-center gap-2"
      >
        <Clock className="h-4 w-4" />
        Edit Times
      </Button>
      
      <Button
        variant="outline"
        onClick={onEditText}
        disabled={!onEditText}
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Edit Text
      </Button>
      
      <Button
        variant="outline"
        onClick={onAddSegment}
        disabled={!onAddSegment}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Segment
      </Button>
      
      <Button
        variant="default"
        onClick={onCreateSubtitles}
        disabled={!onCreateSubtitles}
        className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90"
      >
        <Film className="h-4 w-4" />
        Create Subtitles
      </Button>
    </div>
  );
};

export default SubtitleEditControls;

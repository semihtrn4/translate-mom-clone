
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VideoPreviewProps {
  file: File;
  onRemove: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ file, onRemove }) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="mt-4 border-2 border-dashed rounded-lg p-8">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium truncate max-w-[250px]">{file.name}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRemoveClick}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;

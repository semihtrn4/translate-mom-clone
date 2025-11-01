
import React from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

interface SegmentSelectorProps {
  subtitles: SubtitleSegment[];
  onSegmentSelect: (index: number) => void;
  onCancel: () => void;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const SegmentSelector: React.FC<SegmentSelectorProps> = ({
  subtitles,
  onSegmentSelect,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Segment to Edit</h3>
      <p className="text-sm text-muted-foreground">
        Choose which subtitle segment you want to edit
      </p>
      
      <ScrollArea className="h-[300px] border rounded-md p-2">
        <div className="space-y-2">
          {subtitles.map((subtitle, index) => (
            <Button
              key={subtitle.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => onSegmentSelect(index)}
            >
              <div className="flex items-center gap-2 w-full">
                <Clock size={16} className="shrink-0" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <span className="font-medium">Segment {index + 1}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(subtitle.start)} - {formatTime(subtitle.end)}
                    </span>
                  </div>
                  <span className="text-sm truncate">{subtitle.text}</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default SegmentSelector;

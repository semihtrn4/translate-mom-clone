
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Clock } from "lucide-react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { Textarea } from "@/components/ui/textarea";

interface SubtitleSegmentEditorProps {
  subtitle: SubtitleSegment;
  index: number;
  isEditing: boolean;
  isTranslation?: boolean;
  onTextChange: (index: number, newText: string) => void;
  onTimeChange: (index: number, type: 'start' | 'end', value: string) => void;
  onEditToggle: (index: number | null) => void;
}

// Format milliseconds to MM:SS.mmm format for display
const formatTimeForDisplay = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};

const SubtitleSegmentEditor: React.FC<SubtitleSegmentEditorProps> = ({
  subtitle,
  index,
  isEditing,
  isTranslation = false,
  onTextChange,
  onTimeChange,
  onEditToggle
}) => {
  return (
    <div className="py-3 border-b last:border-0 grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Segment {index + 1}</span>
        </div>
        {!isTranslation && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEditToggle(null)}
                className="h-8 px-2 text-green-600 hover:text-green-700"
              >
                <Save size={16} />
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEditToggle(index)}
                className="h-8 px-2"
              >
                <Pencil size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Time</label>
          {isEditing && !isTranslation ? (
            <Input 
              value={formatTimeForDisplay(subtitle.start)} 
              onChange={(e) => onTimeChange(index, 'start', e.target.value)}
              className="h-8 text-sm"
            />
          ) : (
            <div className="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800 text-sm">
              {formatTimeForDisplay(subtitle.start)}
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">End Time</label>
          {isEditing && !isTranslation ? (
            <Input 
              value={formatTimeForDisplay(subtitle.end)} 
              onChange={(e) => onTimeChange(index, 'end', e.target.value)}
              className="h-8 text-sm"
            />
          ) : (
            <div className="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800 text-sm">
              {formatTimeForDisplay(subtitle.end)}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Subtitle Text</label>
        {isEditing && !isTranslation ? (
          <Textarea
            value={subtitle.text}
            onChange={(e) => onTextChange(index, e.target.value)}
            rows={2}
            className="w-full p-2 text-sm"
          />
        ) : (
          <div className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-sm">
            {subtitle.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtitleSegmentEditor;

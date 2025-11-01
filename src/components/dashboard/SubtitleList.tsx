
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import SubtitleSegmentEditor from "./SubtitleSegmentEditor";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SubtitleListProps {
  subtitles: SubtitleSegment[];
  editingIndex: number | null;
  isTranslation?: boolean;
  languageName?: string;
  onDownload: () => void;
  onTextChange?: (index: number, newText: string) => void;
  onTimeChange?: (index: number, type: 'start' | 'end', value: string) => void;
  onEditToggle?: (index: number | null) => void;
  error?: string | null;
}

const SubtitleList: React.FC<SubtitleListProps> = ({
  subtitles,
  editingIndex,
  isTranslation = false,
  languageName,
  onDownload,
  onTextChange = () => {},
  onTimeChange = () => {},
  onEditToggle = () => {},
  error = null
}) => {
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div>
      {isTranslation && languageName && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Translated to: {languageName}
          </span>
          <Button 
            onClick={onDownload} 
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={16} /> Download Translated
          </Button>
        </div>
      )}
      
      {subtitles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No subtitles available.
        </div>
      ) : (
        subtitles.map((subtitle, index) => (
          <SubtitleSegmentEditor
            key={subtitle.id}
            subtitle={subtitle}
            index={index}
            isEditing={editingIndex === index}
            isTranslation={isTranslation}
            onTextChange={onTextChange}
            onTimeChange={onTimeChange}
            onEditToggle={onEditToggle}
          />
        ))
      )}
    </div>
  );
};

export default SubtitleList;

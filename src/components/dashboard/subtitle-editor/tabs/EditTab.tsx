
import React from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import SubtitleList from "@/components/dashboard/SubtitleList";
import SegmentSelector from "@/components/dashboard/subtitle-editor/SegmentSelector";

interface EditTabProps {
  subtitles: SubtitleSegment[];
  editingIndex: number | null;
  isSelectingSegment: boolean;
  onTextChange: (index: number, newText: string) => void;
  onTimeChange: (index: number, type: 'start' | 'end', value: string) => void;
  onEditToggle: (index: number | null) => void;
  onSegmentSelect: (index: number) => void;
  onCancelSelection: () => void;
}

const EditTab: React.FC<EditTabProps> = ({
  subtitles,
  editingIndex,
  isSelectingSegment,
  onTextChange,
  onTimeChange,
  onEditToggle,
  onSegmentSelect,
  onCancelSelection,
}) => {
  const handleDownload = () => {
    console.log("Downloading subtitles");
    // Implementation for downloading would go here
  };

  if (isSelectingSegment) {
    return (
      <SegmentSelector 
        subtitles={subtitles}
        onSegmentSelect={onSegmentSelect}
        onCancel={onCancelSelection}
      />
    );
  }
  
  return (
    <SubtitleList 
      subtitles={subtitles}
      editingIndex={editingIndex}
      onTextChange={onTextChange}
      onTimeChange={onTimeChange}
      onEditToggle={onEditToggle}
      onDownload={handleDownload}
      error={null}
    />
  );
};

export default EditTab;

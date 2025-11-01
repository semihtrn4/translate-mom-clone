
import React from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle } from "@/services/subtitleStyle";
import FontSettings from "./components/FontSettings";
import ColorSettings from "./components/ColorSettings";
import PositionSettings from "./components/PositionSettings";
import OutlineSettings from "./components/OutlineSettings";
import DownloadButtons from "./components/DownloadButtons";

interface StyleSettingsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
  subtitles: SubtitleSegment[];
  videoName: string;
  onCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
}

const StyleSettings: React.FC<StyleSettingsProps> = ({ 
  style, 
  onStyleChange, 
  subtitles, 
  videoName,
  onCreateSubtitleFile
}) => {
  return (
    <div className="space-y-4">
      <FontSettings style={style} onStyleChange={onStyleChange} />
      <ColorSettings style={style} onStyleChange={onStyleChange} />
      <PositionSettings style={style} onStyleChange={onStyleChange} />
      <OutlineSettings style={style} onStyleChange={onStyleChange} />
      <DownloadButtons 
        style={style} 
        onStyleChange={onStyleChange} 
        subtitles={subtitles} 
        videoName={videoName}
        onCreateSubtitleFile={onCreateSubtitleFile}
      />
    </div>
  );
};

export default StyleSettings;

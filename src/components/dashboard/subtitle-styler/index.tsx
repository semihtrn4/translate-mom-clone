
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush } from "lucide-react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle, defaultSubtitleStyle } from "@/services/subtitleStyle";
import StyleSettings from "./StyleSettings";
import StylePreview from "./StylePreview";

interface SubtitleStylerProps {
  subtitles: SubtitleSegment[];
  videoName: string;
  videoId?: string;
  translatedSubtitles?: SubtitleSegment[] | null;
  translationLanguageName?: string | null;
  style?: SubtitleStyle;
  onStyleChange?: (style: SubtitleStyle) => void;
  onCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
}

const SubtitleStyler: React.FC<SubtitleStylerProps> = ({ 
  subtitles, 
  videoName, 
  videoId,
  translatedSubtitles,
  translationLanguageName,
  style: externalStyle,
  onStyleChange,
  onCreateSubtitleFile
}) => {
  const [internalStyle, setInternalStyle] = useState<SubtitleStyle>(externalStyle || defaultSubtitleStyle);
  const [initialPreviewText, setInitialPreviewText] = useState("This is how your subtitles will appear");

  // Use first subtitle text as example if available
  useEffect(() => {
    if (subtitles.length > 0) {
      setInitialPreviewText(subtitles[0].text);
    }
  }, [subtitles]);

  // Update internal style when external style changes
  useEffect(() => {
    if (externalStyle) {
      setInternalStyle(externalStyle);
    }
  }, [externalStyle]);

  const handleStyleChange = (key: keyof SubtitleStyle, value: any) => {
    const updatedStyle = {
      ...internalStyle,
      [key]: value
    };
    
    setInternalStyle(updatedStyle);
    
    if (onStyleChange) {
      onStyleChange(updatedStyle);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Paintbrush className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Subtitle Styling</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Styling Controls */}
          <StyleSettings 
            style={internalStyle} 
            onStyleChange={handleStyleChange} 
            subtitles={subtitles} 
            videoName={videoName}
            onCreateSubtitleFile={onCreateSubtitleFile}
          />
          
          {/* Preview */}
          <StylePreview 
            style={internalStyle} 
            initialText={initialPreviewText} 
            videoId={videoId} 
            translatedSubtitles={translatedSubtitles}
            translationLanguageName={translationLanguageName}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SubtitleStyler;

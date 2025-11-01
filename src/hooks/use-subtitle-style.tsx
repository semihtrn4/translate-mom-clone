
import { useCallback } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { useSubtitleStyleManager } from "./subtitle/use-subtitle-style-manager";
import { useSubtitleExport } from "./subtitle/use-subtitle-export";

export function useSubtitleStyle() {
  const { 
    subtitleStyle, 
    setSubtitleStyle, 
    handleSubtitleStyleChange 
  } = useSubtitleStyleManager();
  
  const { createSubtitleFile: exportSubtitleFile } = useSubtitleExport();

  const createSubtitleFile = useCallback((
    format: 'srt' | 'ass',
    subtitleData: SubtitleSegment[],
    videoName: string
  ): { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null => {
    const result = exportSubtitleFile(format, subtitleData, videoName, subtitleStyle);
    
    if (result && result.updatedStyle) {
      // Update the subtitle style with the user's preferred format
      setSubtitleStyle(result.updatedStyle);
    }
    
    return result;
  }, [subtitleStyle, exportSubtitleFile, setSubtitleStyle]);

  return {
    subtitleStyle,
    setSubtitleStyle,
    handleSubtitleStyleChange,
    createSubtitleFile
  };
}

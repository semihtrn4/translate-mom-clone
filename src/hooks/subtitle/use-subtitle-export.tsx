
import { useCallback } from "react";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { useToast } from "@/hooks/use-toast";
import { createStyledASS, downloadStyledASS } from "@/services/subtitleStyle";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";

export function useSubtitleExport() {
  const { toast } = useToast();

  const createSubtitleFile = useCallback((
    format: 'srt' | 'ass',
    subtitleData: SubtitleSegment[],
    videoName: string,
    subtitleStyle: SubtitleStyle
  ): { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null => {
    if (!subtitleData || subtitleData.length === 0) {
      toast({
        title: "No Subtitles",
        description: "There are no subtitle segments to export.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      let fileName;
      let assContent;
      
      // Create a copy of the subtitle style with the updated format preference
      // We'll always use ASS for better styling support
      const styleWithFormat = {
        ...subtitleStyle,
        preferredFormat: 'ass' as const // This ensures it's typed correctly
      };
      
      // Now generate the subtitle file content as ASS for better styling support
      const result = createStyledASS(subtitleData, videoName, styleWithFormat);
      fileName = result.fileName;
      assContent = result.content;
      
      toast({
        title: "ASS Subtitle File Created",
        description: `Your subtitle file "${fileName}" has been created.`,
      });
      
      return { 
        fileName, 
        updatedStyle: styleWithFormat,
        content: assContent 
      };
    } catch (error) {
      console.error(`Error creating ASS file:`, error);
      toast({
        title: "File Creation Failed",
        description: error instanceof Error ? error.message : `An error occurred while creating the ASS file.`,
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const downloadSubtitleFile = useCallback((
    format: 'srt' | 'ass',
    subtitleData: SubtitleSegment[],
    videoName: string,
    subtitleStyle: SubtitleStyle
  ): { fileName: string; updatedStyle?: SubtitleStyle } | null => {
    if (!subtitleData || subtitleData.length === 0) {
      toast({
        title: "No Subtitles",
        description: "There are no subtitle segments to export.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      // Always use ASS for better styling support
      const styleWithFormat = {
        ...subtitleStyle,
        preferredFormat: 'ass' as const
      };
      
      // Download the file
      const fileName = downloadStyledASS(subtitleData, videoName, styleWithFormat);
      
      toast({
        title: "ASS Subtitle File Downloaded",
        description: `Your subtitle file "${fileName}" has been downloaded.`,
      });
      
      return { fileName, updatedStyle: styleWithFormat };
    } catch (error) {
      console.error(`Error downloading ASS file:`, error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : `An error occurred while downloading the ASS file.`,
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  return {
    createSubtitleFile,
    downloadSubtitleFile
  };
}

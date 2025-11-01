
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { useSubtitles } from "@/hooks/use-subtitles";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { useSubtitleStyle } from "@/hooks/use-subtitle-style";
import { useVideoProcessing } from "@/hooks/use-video-processing";
import { useVideoData } from "@/hooks/use-video-data";
import TabsContainer from "./subtitle-editor/TabsContainer";

interface SubtitleEditorProps {
  subtitles: SubtitleSegment[];
  videoId: string;
  videoName: string;
}

const SubtitleEditor: React.FC<SubtitleEditorProps> = ({ 
  subtitles: initialSubtitles,
  videoId,
  videoName
}) => {
  const [activeTab, setActiveTab] = useState("edit");
  const { toast } = useToast();
  const [subtitleFileContent, setSubtitleFileContent] = useState<string | null>(null);
  const [subtitleFileName, setSubtitleFileName] = useState<string | null>(null);
  
  const { originalVideoUrl } = useVideoData(videoId);
  const { 
    subtitleStyle, 
    handleSubtitleStyleChange, 
    createSubtitleFile 
  } = useSubtitleStyle();
  const {
    processingVideo,
    processedVideoUrl,
    createSubtitlesWithVideo
  } = useVideoProcessing();
  
  const {
    subtitles, 
    editingIndex,
    setEditingIndex,
    isSelectingSegment,
    handleTextChange,
    handleTimeChange,
    handleAddSegment,
    startSegmentSelection,
    cancelSegmentSelection,
    selectSegmentToEdit
  } = useSubtitles(initialSubtitles);
  
  const {
    translationError,
    targetLanguage,
    setTargetLanguage,
    isTranslating,
    translatedSubtitles,
    translationLanguageName,
    handleTranslate
  } = useTranslation();
  
  useEffect(() => {
    if (processedVideoUrl && activeTab !== "final") {
      setActiveTab("final");
      
      toast({
        title: "Video Processing Complete",
        description: "Your video with embedded subtitles is ready to view.",
      });
    }
  }, [processedVideoUrl, activeTab, toast]);
  
  const handleEditTime = () => {
    setActiveTab("edit");
    toast({
      title: "Edit Time",
      description: "Now you can edit the start and end times of your subtitles.",
    });
  };
  
  const handleEditText = () => {
    setActiveTab("edit");
    startSegmentSelection();
    toast({
      title: "Select a Segment",
      description: "Please choose which segment you want to edit.",
    });
  };
  
  const handleTranslateSubtitles = () => {
    if (!subtitles || subtitles.length === 0) {
      toast({
        title: "No Subtitles",
        description: "There are no subtitle segments to translate.",
        variant: "destructive"
      });
      return;
    }
    
    handleTranslate(subtitles);
  };
  
  const handleCreateSubtitles = async () => {
    if (!originalVideoUrl) {
      toast({
        title: "Video Not Found",
        description: "Could not find the original video to process.",
        variant: "destructive"
      });
      return;
    }
    
    const subtitleData = translatedSubtitles || subtitles;
    
    const updatedStyle = {
      ...subtitleStyle,
      preferredFormat: 'ass' as const
    };
    
    const result = await createSubtitlesWithVideo(
      originalVideoUrl,
      subtitleData,
      updatedStyle,
      videoName
    );
    
    if (result && activeTab !== "final") {
      setActiveTab("final");
    }
  };

  const handleCreateSubtitleFile = (format: 'srt' | 'ass') => {
    const subtitleData = translatedSubtitles || subtitles;
    const updatedStyle = {
      ...subtitleStyle,
      preferredFormat: 'ass' as const
    };
    handleSubtitleStyleChange(updatedStyle);
    
    const result = createSubtitleFile('ass', subtitleData, videoName);
    
    if (result && result.content) {
      setSubtitleFileContent(result.content);
      setSubtitleFileName(result.fileName);
      
      if (activeTab === "style") {
        toast({
          title: "ASS Subtitle File Created",
          description: "Would you like to embed these subtitles into your video? Click 'Create Video with Subtitles'.",
        });
      }
    }
    
    return result;
  };

  const handleCreateVideoWithSubtitles = async () => {
    if (!originalVideoUrl) {
      toast({
        title: "Video Not Found",
        description: "Could not find the original video to process.",
        variant: "destructive"
      });
      return;
    }
    
    if (!subtitleFileContent) {
      // First create the subtitle file if it doesn't exist
      const result = handleCreateSubtitleFile('ass');
      if (!result || !result.content) {
        toast({
          title: "Subtitle File Required",
          description: "Please generate an ASS subtitle file first.",
          variant: "destructive"
        });
        return;
      }
    }
    
    toast({
      title: "Processing Video",
      description: "Embedding subtitles into your video...",
    });
    
    const subtitleData = translatedSubtitles || subtitles;
    
    const updatedStyle = {
      ...subtitleStyle,
      preferredFormat: 'ass' as const
    };
    
    const result = await createSubtitlesWithVideo(
      originalVideoUrl,
      subtitleData,
      updatedStyle,
      videoName
    );
    
    if (result && activeTab !== "final") {
      setActiveTab("final");
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <TabsContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subtitles={subtitles}
          editingIndex={editingIndex}
          translatedSubtitles={translatedSubtitles}
          translationLanguageName={translationLanguageName}
          isSelectingSegment={isSelectingSegment}
          isTranslating={isTranslating}
          targetLanguage={targetLanguage}
          videoId={videoId}
          videoName={videoName}
          translationError={translationError}
          processedVideoUrl={processedVideoUrl}
          processingVideo={processingVideo}
          subtitleStyle={subtitleStyle}
          subtitleFileContent={subtitleFileContent}
          subtitleFileName={subtitleFileName}
          onSubtitleStyleChange={handleSubtitleStyleChange}
          handleCreateSubtitleFile={handleCreateSubtitleFile}
          handleTranslateSubtitles={handleTranslateSubtitles}
          handleAddSegment={handleAddSegment}
          handleCreateSubtitles={handleCreateSubtitles}
          handleCreateVideoWithSubtitles={handleCreateVideoWithSubtitles}
          handleEditTime={handleEditTime}
          handleEditText={handleEditText}
          handleTextChange={handleTextChange}
          handleTimeChange={handleTimeChange}
          setEditingIndex={setEditingIndex}
          selectSegmentToEdit={selectSegmentToEdit}
          cancelSegmentSelection={cancelSegmentSelection}
          setTargetLanguage={setTargetLanguage}
        />
      </CardContent>
    </Card>
  );
};

export default SubtitleEditor;

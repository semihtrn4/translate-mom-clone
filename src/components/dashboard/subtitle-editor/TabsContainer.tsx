
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { SubtitleStyle } from "@/services/subtitleStyle";
import EditTab from "./tabs/EditTab";
import TranslateTab from "./tabs/TranslateTab";
import StyleTab from "./tabs/StyleTab";
import FinalTab from "./tabs/FinalTab";

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subtitles: SubtitleSegment[];
  editingIndex: number | null;
  translatedSubtitles: SubtitleSegment[] | null;
  translationLanguageName: string | null;
  isSelectingSegment: boolean;
  isTranslating: boolean;
  targetLanguage: string;
  videoId: string;
  videoName: string;
  translationError: string | null;
  processedVideoUrl: string | null;
  processingVideo: boolean;
  subtitleStyle?: SubtitleStyle;
  subtitleFileContent?: string | null;
  subtitleFileName?: string | null;
  onSubtitleStyleChange?: (style: SubtitleStyle) => void;
  handleCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
  // Handlers
  handleTranslateSubtitles: () => void;
  handleAddSegment: () => void;
  handleCreateSubtitles: () => void;
  handleCreateVideoWithSubtitles: () => Promise<void>;
  handleEditTime: () => void;
  handleEditText: () => void;
  handleTextChange: (index: number, newText: string) => void;
  handleTimeChange: (index: number, type: 'start' | 'end', value: string) => void;
  setEditingIndex: (index: number | null) => void;
  selectSegmentToEdit: (index: number) => void;
  cancelSegmentSelection: () => void;
  setTargetLanguage: (lang: string) => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  setActiveTab,
  subtitles,
  editingIndex,
  translatedSubtitles,
  translationLanguageName,
  isSelectingSegment,
  isTranslating,
  targetLanguage,
  videoId,
  videoName,
  translationError,
  processedVideoUrl,
  processingVideo,
  subtitleStyle,
  subtitleFileContent,
  subtitleFileName,
  onSubtitleStyleChange,
  handleCreateSubtitleFile,
  // Handlers
  handleTranslateSubtitles,
  handleAddSegment,
  handleCreateSubtitles,
  handleCreateVideoWithSubtitles,
  handleEditTime,
  handleEditText,
  handleTextChange,
  handleTimeChange,
  setEditingIndex,
  selectSegmentToEdit,
  cancelSegmentSelection,
  setTargetLanguage,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="edit">Edit Subtitles</TabsTrigger>
        <TabsTrigger value="translate">Translate</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        {processedVideoUrl && (
          <TabsTrigger value="final">Final Video</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="edit">
        <EditTab 
          subtitles={subtitles}
          editingIndex={editingIndex}
          isSelectingSegment={isSelectingSegment}
          onTextChange={handleTextChange}
          onTimeChange={handleTimeChange}
          onEditToggle={setEditingIndex}
          onSegmentSelect={selectSegmentToEdit}
          onCancelSelection={cancelSegmentSelection}
        />
      </TabsContent>
      
      <TabsContent value="translate">
        <TranslateTab
          subtitles={subtitles}
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          onTranslate={handleTranslateSubtitles}
          isTranslating={isTranslating}
          onEditTime={handleEditTime}
          onEditText={handleEditText}
          onAddSegment={handleAddSegment}
          onCreateSubtitles={handleCreateSubtitles}
          isProcessing={processingVideo}
          translationError={translationError}
          translatedSubtitles={translatedSubtitles}
          translationLanguageName={translationLanguageName}
          onCreateSubtitleFile={handleCreateSubtitleFile}
          subtitleStyle={subtitleStyle}
        />
      </TabsContent>
      
      <TabsContent value="style">
        <StyleTab
          subtitles={subtitles}
          videoName={videoName}
          videoId={videoId}
          translatedSubtitles={translatedSubtitles}
          translationLanguageName={translationLanguageName}
          style={subtitleStyle}
          onStyleChange={onSubtitleStyleChange}
          onCreateSubtitleFile={handleCreateSubtitleFile}
          subtitleFileContent={subtitleFileContent}
          subtitleFileName={subtitleFileName}
          onCreateVideoWithSubtitles={handleCreateVideoWithSubtitles}
          isProcessingVideo={processingVideo}
        />
      </TabsContent>
      
      {processedVideoUrl && (
        <TabsContent value="final">
          <FinalTab
            videoUrl={processedVideoUrl}
            videoName={videoName}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TabsContainer;


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import SubtitleList from "@/components/dashboard/SubtitleList";
import SubtitleStyler from "@/components/dashboard/subtitle-styler";
import TranslationControls from "@/components/dashboard/TranslationControls";
import SegmentSelector from "./SegmentSelector";
import { useSubtitles } from "@/hooks/use-subtitles";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";

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

  const handleDownload = () => {
    console.log("Downloading subtitles");
    // Implementation for downloading would go here
  };
  
  const handleEditTime = () => {
    setActiveTab("edit");
    // Optionally focus on the time input or set a specific segment for editing
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
    // Always use the current subtitles state to ensure newly added segments are included
    console.log(`Translating ${subtitles.length} segments, including any newly added ones`);
    
    // Validate subtitles before translation
    if (!subtitles || subtitles.length === 0) {
      toast({
        title: "No Subtitles",
        description: "There are no subtitle segments to translate.",
        variant: "destructive"
      });
      return;
    }
    
    // Pass the latest subtitles to translation handler
    handleTranslate(subtitles);
  };
  
  const handleCreateSubtitles = () => {
    toast({
      title: "Subtitles Created",
      description: "Your subtitles have been created successfully.",
    });
    
    // Implementation for finalizing subtitles would go here
    console.log("Creating finalized subtitles", subtitles);
  };

  // This effect makes sure the subtitle state is synced with any changes
  useEffect(() => {
    console.log("Subtitle state updated:", subtitles.length, "segments");
    // Log the actual subtitle texts to help with debugging
    if (subtitles.length > 0) {
      const texts = subtitles.map(s => s.text);
      console.log("Subtitle texts:", texts);
    }
  }, [subtitles]);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Edit Subtitles</TabsTrigger>
            <TabsTrigger value="translate">Translate</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            {isSelectingSegment ? (
              <SegmentSelector 
                subtitles={subtitles}
                onSegmentSelect={selectSegmentToEdit}
                onCancel={cancelSegmentSelection}
              />
            ) : (
              <SubtitleList 
                subtitles={subtitles}
                editingIndex={editingIndex}
                onTextChange={handleTextChange}
                onTimeChange={handleTimeChange}
                onEditToggle={setEditingIndex}
                onDownload={handleDownload}
                error={null}
              />
            )}
          </TabsContent>
          
          <TabsContent value="translate">
            <div className="space-y-6">
              <TranslationControls 
                targetLanguage={targetLanguage}
                setTargetLanguage={setTargetLanguage}
                onTranslate={handleTranslateSubtitles}
                isTranslating={isTranslating}
                onEditTime={handleEditTime}
                onEditText={handleEditText}
                onAddSegment={handleAddSegment}
                onCreateSubtitles={handleCreateSubtitles}
              />
              
              {translationError && (
                <div className="text-red-500 mt-4">
                  {translationError}
                </div>
              )}
              
              {translatedSubtitles && (
                <div className="mt-6">
                  <SubtitleList 
                    subtitles={translatedSubtitles}
                    editingIndex={null}
                    isTranslation={true}
                    languageName={translationLanguageName || undefined}
                    onDownload={handleDownload}
                    error={null}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="style">
            <SubtitleStyler 
              subtitles={subtitles}
              videoName={videoName}
              videoId={videoId}
              translatedSubtitles={translatedSubtitles}
              translationLanguageName={translationLanguageName}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SubtitleEditor;

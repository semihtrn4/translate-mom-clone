
import React, { useState } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import TranslationControls from "@/components/dashboard/TranslationControls";
import SubtitleList from "@/components/dashboard/SubtitleList";
import EditorActions from "../EditorActions";
import SubtitleFormatSelector from "../SubtitleFormatSelector";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface TranslateTabProps {
  subtitles: SubtitleSegment[];
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  onTranslate: () => void;
  isTranslating: boolean;
  isProcessing?: boolean;
  onEditTime?: () => void;
  onEditText?: () => void;
  onAddSegment?: () => void;
  onCreateSubtitles?: () => void;
  onCreateSubtitleFile?: (format: 'srt' | 'ass') => { fileName: string; content: string; updatedStyle?: SubtitleStyle } | null;
  translationError: string | null;
  translatedSubtitles: SubtitleSegment[] | null;
  translationLanguageName: string | null;
  subtitleStyle?: SubtitleStyle;
}

const TranslateTab: React.FC<TranslateTabProps> = ({
  subtitles,
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  isTranslating,
  isProcessing = false,
  onEditTime,
  onEditText,
  onAddSegment,
  onCreateSubtitles,
  onCreateSubtitleFile,
  translationError,
  translatedSubtitles,
  translationLanguageName,
  subtitleStyle
}) => {
  const [subtitleFileContent, setSubtitleFileContent] = useState<string | null>(null);
  const [subtitleFileName, setSubtitleFileName] = useState<string | null>(null);
  
  const handleCreateSubtitleFile = (format: 'srt' | 'ass') => {
    if (!onCreateSubtitleFile) return;
    
    // Call the parent component's handler
    const result = onCreateSubtitleFile(format);
    
    // If we have content returned, display it
    if (result && result.content) {
      setSubtitleFileContent(result.content);
      setSubtitleFileName(result.fileName);
    }
  };

  const handleDownload = () => {
    console.log("Downloading translated subtitles");
    // Implementation for downloading would go here
  };

  return (
    <div className="space-y-6">
      <TranslationControls 
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        onTranslate={onTranslate}
        isTranslating={isTranslating}
        onEditTime={onEditTime}
        onEditText={onEditText}
        onAddSegment={onAddSegment}
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
          
          <div className="flex justify-end gap-2 mt-4">
            {onCreateSubtitleFile && (
              <SubtitleFormatSelector 
                onSelectFormat={handleCreateSubtitleFile} 
                isDisabled={isProcessing}
              />
            )}
            
            {onCreateSubtitles && (
              <EditorActions 
                onDownload={handleDownload}
                onCreateSubtitles={onCreateSubtitles}
                isProcessing={isProcessing}
                downloadLabel="Save SRT"
                createSubtitlesLabel="Create Video with Subtitles"
              />
            )}
          </div>
          
          {subtitleFileContent && (
            <div className="mt-6">
              <Separator className="my-4" />
              <Alert>
                <AlertTitle>ASS Subtitle File: {subtitleFileName}</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md overflow-x-auto max-h-60">
                    <pre className="text-xs whitespace-pre-wrap">{subtitleFileContent}</pre>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslateTab;

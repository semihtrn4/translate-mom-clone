
import React, { useState, useEffect } from "react";
import LanguageSelector from "./translation/LanguageSelector";
import TranslateButton from "./translation/TranslateButton";
import SubtitleEditControls from "./translation/SubtitleEditControls";
import ApiKeyDialog, { setIsApiKeyDialogOpen } from "./translation/ApiKeyDialog";
import { setDeepLApiKey } from "@/services/translation/translationService";

// Re-export the setIsApiKeyDialogOpen function for external use
export { setIsApiKeyDialogOpen };

interface TranslationControlsProps {
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  onTranslate: () => void;
  isTranslating: boolean;
  onEditTime?: () => void;
  onEditText?: () => void;
  onAddSegment?: () => void;
  onCreateSubtitles?: () => void;
}

export const TranslationControls: React.FC<TranslationControlsProps> = ({
  targetLanguage,
  setTargetLanguage,
  onTranslate,
  isTranslating,
  onEditTime,
  onEditText,
  onAddSegment,
  onCreateSubtitles
}) => {
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  
  // Set the API key on initial load
  useEffect(() => {
    const savedKey = localStorage.getItem('deepl_api_key') || "585cfc6c-ff54-47cd-a2c3-3e8e449e559d";
    setDeepLApiKey(savedKey);
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LanguageSelector 
            targetLanguage={targetLanguage} 
            setTargetLanguage={setTargetLanguage} 
          />
          <TranslateButton 
            onTranslate={onTranslate} 
            isTranslating={isTranslating} 
          />
        </div>
        
        {/* Subtitle Editing Controls */}
        <SubtitleEditControls 
          onEditTime={onEditTime}
          onEditText={onEditText}
          onAddSegment={onAddSegment}
          onCreateSubtitles={onCreateSubtitles}
        />
      </div>
      
      {/* API Key Dialog */}
      <ApiKeyDialog 
        isOpen={isApiKeyDialogOpen} 
        onOpenChange={setIsApiKeyDialogOpen} 
      />
    </>
  );
};

// Also include a default export for backward compatibility
export default TranslationControls;

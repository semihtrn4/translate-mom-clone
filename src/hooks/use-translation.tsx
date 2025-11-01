
import { useState } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { translateSubtitles } from "@/services/translation/translationService";
import { useToast } from "@/hooks/use-toast";

export function useTranslation() {
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState("EN-US");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedSubtitles, setTranslatedSubtitles] = useState<SubtitleSegment[] | null>(null);
  const [translationLanguageName, setTranslationLanguageName] = useState<string | null>(null);
  const { toast } = useToast();

  const getLanguageNameFromCode = (code: string): string => {
    const languages = {
      "DE": "German",
      "EN-US": "English (US)",
      "EN-GB": "English (UK)",
      "ES": "Spanish",
      "FR": "French",
      "IT": "Italian",
      "JA": "Japanese",
      "NL": "Dutch",
      "PL": "Polish",
      "PT": "Portuguese",
      "RU": "Russian",
      "ZH": "Chinese"
    };
    
    return (languages as Record<string, string>)[code] || code;
  };

  const handleTranslate = async (subtitles: SubtitleSegment[]) => {
    if (!subtitles || subtitles.length === 0) {
      toast({
        title: "Translation Error",
        description: "No subtitles to translate",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsTranslating(true);
      setTranslationError(null);
      
      console.log(`Translating ${subtitles.length} subtitles to ${targetLanguage}`);
      
      // Get the language name for display purposes
      const languageName = getLanguageNameFromCode(targetLanguage);
      setTranslationLanguageName(languageName);
      
      // Check for empty segments to warn the user
      const emptySegments = subtitles.filter(segment => !segment.text || segment.text.trim() === '');
      if (emptySegments.length > 0) {
        console.warn(`Found ${emptySegments.length} empty segments`);
        
        toast({
          title: "Translation Warning",
          description: `${emptySegments.length} segments have no text to translate`,
          variant: "destructive"
        });
      }
      
      // Always pass the current subtitles to ensure all segments (including new ones) are translated
      const translated = await translateSubtitles(subtitles, targetLanguage);
      
      console.log(`Translation completed: ${translated.length} segments`);
      
      // Ensure we have the same number of segments in the translated result
      if (translated.length === subtitles.length) {
        setTranslatedSubtitles(translated);
      } else {
        // If there's a mismatch, we'll create a properly aligned translation result
        const alignedTranslations = subtitles.map((segment, index) => {
          // If we have a translation for this index, use it
          if (index < translated.length) {
            return translated[index];
          }
          // Otherwise create a mock translation for this segment
          return {
            ...segment,
            id: `translated-${segment.id}`,
            // Just use the original text without appending language name
            text: segment.text || ""
          };
        });
        
        setTranslatedSubtitles(alignedTranslations);
      }
      
      toast({
        title: "Translation Complete",
        description: `${subtitles.length} segments translated to ${languageName}`,
      });
      
    } catch (error) {
      console.error("Translation error:", error);
      setTranslationError(error instanceof Error ? error.message : "Translation failed");
      
      toast({
        title: "Translation Failed",
        description: error instanceof Error ? error.message : "Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    translationError,
    targetLanguage,
    setTargetLanguage,
    isTranslating,
    translatedSubtitles,
    translationLanguageName,
    handleTranslate
  };
}


import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSupportedLanguages } from "@/services/translation/translationService";

interface LanguageSelectorProps {
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  targetLanguage, 
  setTargetLanguage 
}) => {
  const SUPPORTED_LANGUAGES = getSupportedLanguages();
  
  return (
    <Select
      value={targetLanguage}
      onValueChange={setTargetLanguage}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;

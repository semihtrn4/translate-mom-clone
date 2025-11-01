
import React from "react";
import { Button } from "@/components/ui/button";
import { Languages, RefreshCw } from "lucide-react";

interface TranslateButtonProps {
  onTranslate: () => void;
  isTranslating: boolean;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ 
  onTranslate, 
  isTranslating 
}) => {
  return (
    <Button 
      onClick={onTranslate} 
      disabled={isTranslating}
      className="bg-brand-blue hover:bg-brand-blue/90 flex items-center gap-2"
    >
      {isTranslating ? <RefreshCw className="animate-spin" size={16} /> : <Languages size={16} />}
      {isTranslating ? "Translating..." : "Translate"}
    </Button>
  );
};

export default TranslateButton;

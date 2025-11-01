
import { useState, useCallback } from "react";
import { SubtitleStyle, defaultSubtitleStyle } from "@/services/subtitleStyle";
import { useToast } from "@/hooks/use-toast";

export function useSubtitleStyleManager() {
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>(defaultSubtitleStyle);
  const { toast } = useToast();

  const handleSubtitleStyleChange = useCallback((newStyle: SubtitleStyle) => {
    // Ensure we have valid color values for critical properties
    const updatedStyle = {
      ...newStyle,
      textColor: newStyle.textColor || defaultSubtitleStyle.textColor,
      outlineColor: newStyle.outlineColor || defaultSubtitleStyle.outlineColor
    };

    // If background color is in invalid format, reset it
    if (updatedStyle.backgroundColor && 
        !updatedStyle.backgroundColor.startsWith('#') && 
        !updatedStyle.backgroundColor.startsWith('rgb')) {
      console.warn('Invalid background color format, resetting to default');
      updatedStyle.backgroundColor = defaultSubtitleStyle.backgroundColor;
    }

    setSubtitleStyle(updatedStyle);
  }, []);

  return {
    subtitleStyle,
    setSubtitleStyle,
    handleSubtitleStyleChange
  };
}

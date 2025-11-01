
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubtitleStyle } from "@/services/subtitleStyle";

interface ColorSettingsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({ style, onStyleChange }) => {
  const rgbaToHex = (rgba: string): string => {
    if (!rgba || !rgba.startsWith('rgba(')) return '#000000';
    
    try {
      const matches = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (!matches) return '#000000';
      
      const r = parseInt(matches[1], 10);
      const g = parseInt(matches[2], 10);
      const b = parseInt(matches[3], 10);
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } catch (e) {
      console.error("Error parsing rgba:", e);
      return '#000000';
    }
  };

  const handleBackgroundColorChange = (hexColor: string) => {
    try {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      const alpha = 0.7;
      
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.error("Invalid hex color", hexColor);
        return;
      }
      
      onStyleChange('backgroundColor', `rgba(${r}, ${g}, ${b}, ${alpha})`);
    } catch (error) {
      console.error("Error processing color:", error);
    }
  };

  const backgroundColorHex = style.backgroundColor?.startsWith('rgba') 
    ? rgbaToHex(style.backgroundColor)
    : style.backgroundColor || '#000000';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="textColor">Text Color</Label>
        <div className="flex items-center gap-2">
          <div 
            className="h-8 w-8 rounded border border-gray-300"
            style={{ backgroundColor: style.textColor }}
          />
          <Input
            id="textColor"
            type="text"
            value={style.textColor}
            onChange={(e) => onStyleChange('textColor', e.target.value)}
            className="flex-1"
          />
          <Input
            type="color"
            value={style.textColor}
            onChange={(e) => onStyleChange('textColor', e.target.value)}
            className="w-12 p-1 h-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex items-center gap-2">
          <div 
            className="h-8 w-8 rounded border border-gray-300"
            style={{ backgroundColor: style.backgroundColor }}
          />
          <Input
            id="backgroundColor"
            type="text"
            value={style.backgroundColor}
            onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
            className="flex-1"
          />
          <Input
            type="color"
            value={backgroundColorHex}
            onChange={(e) => handleBackgroundColorChange(e.target.value)}
            className="w-12 p-1 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorSettings;

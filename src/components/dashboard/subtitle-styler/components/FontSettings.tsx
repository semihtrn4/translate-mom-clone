
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SubtitleStyle, availableFontFamilies } from "@/services/subtitleStyle";

interface FontSettingsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
}

const FontSettings: React.FC<FontSettingsProps> = ({ style, onStyleChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <select 
          id="fontFamily"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={style.fontFamily}
          onChange={(e) => onStyleChange('fontFamily', e.target.value)}
        >
          {availableFontFamilies.map(font => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Font Size: {style.fontSize}px</Label>
        <Slider 
          value={[style.fontSize]} 
          min={10} 
          max={36} 
          step={1}
          onValueChange={(value) => onStyleChange('fontSize', value[0])}
        />
      </div>
    </div>
  );
};

export default FontSettings;

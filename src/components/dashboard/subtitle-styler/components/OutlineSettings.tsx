
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubtitleStyle } from "@/services/subtitleStyle";

interface OutlineSettingsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
}

const OutlineSettings: React.FC<OutlineSettingsProps> = ({ style, onStyleChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="outline"
          checked={style.outline}
          onChange={(e) => onStyleChange('outline', e.target.checked)}
          className="rounded border-gray-300"
        />
        <Label htmlFor="outline">Text Outline</Label>
      </div>
      
      {style.outline && (
        <div className="flex items-center gap-2 mt-2">
          <div 
            className="h-6 w-6 rounded border border-gray-300"
            style={{ backgroundColor: style.outlineColor || '#000000' }}
          />
          <Input
            type="color"
            value={style.outlineColor || '#000000'}
            onChange={(e) => onStyleChange('outlineColor', e.target.value)}
            className="w-12 p-1 h-8"
          />
        </div>
      )}
    </div>
  );
};

export default OutlineSettings;

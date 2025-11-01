
import React from "react";
import { Label } from "@/components/ui/label";
import { SubtitleStyle } from "@/services/subtitleStyle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PositionSettingsProps {
  style: SubtitleStyle;
  onStyleChange: (key: keyof SubtitleStyle, value: any) => void;
}

const PositionSettings: React.FC<PositionSettingsProps> = ({ style, onStyleChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="position">Position</Label>
      <Select 
        value={style.position}
        onValueChange={(value) => onStyleChange('position', value as 'bottom' | 'top' | 'middle')}
      >
        <SelectTrigger id="position" className="w-full">
          <SelectValue placeholder="Select position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bottom">Bottom</SelectItem>
          <SelectItem value="middle">Middle</SelectItem>
          <SelectItem value="top">Top</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PositionSettings;


import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface SubtitleFormatSelectorProps {
  onSelectFormat: (format: 'srt' | 'ass') => void;
  isDisabled?: boolean;
}

const SubtitleFormatSelector: React.FC<SubtitleFormatSelectorProps> = ({ onSelectFormat, isDisabled = false }) => {
  // Directly create ASS file when button is clicked
  const handleCreateAssFile = () => {
    onSelectFormat('ass');
  };

  return (
    <Button 
      variant="outline" 
      disabled={isDisabled}
      className="flex items-center gap-2"
      onClick={handleCreateAssFile}
    >
      <FileText className="h-4 w-4" />
      Create ASS Subtitle File
    </Button>
  );
};

export default SubtitleFormatSelector;


import { useState } from "react";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { useToast } from "@/hooks/use-toast";

export function useSubtitles(initialSubtitles: SubtitleSegment[]) {
  const [subtitles, setSubtitles] = useState<SubtitleSegment[]>(initialSubtitles);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSelectingSegment, setIsSelectingSegment] = useState(false);
  const { toast } = useToast();

  const handleSubtitleUpdate = (updatedSubtitle: SubtitleSegment) => {
    setSubtitles(prev => 
      prev.map(sub => sub.id === updatedSubtitle.id ? updatedSubtitle : sub)
    );
  };

  const handleTextChange = (index: number, newText: string) => {
    const updatedSubtitles = [...subtitles];
    updatedSubtitles[index] = {
      ...updatedSubtitles[index],
      text: newText
    };
    setSubtitles(updatedSubtitles);
  };

  const handleTimeChange = (index: number, type: 'start' | 'end', value: string) => {
    // This is just a placeholder - in a real app you'd need to parse the time string
    // and convert it to milliseconds properly
    const updatedSubtitles = [...subtitles];
    updatedSubtitles[index] = {
      ...updatedSubtitles[index],
      [type]: parseInt(value) || 0
    };
    setSubtitles(updatedSubtitles);
  };

  const handleAddSegment = () => {
    // Create a new segment with default values
    const newId = `segment-${Date.now()}`;
    const lastSegment = subtitles[subtitles.length - 1];
    const newStartTime = lastSegment ? lastSegment.end + 100 : 0;
    
    const newSegment: SubtitleSegment = {
      id: newId,
      start: newStartTime,
      end: newStartTime + 3000, // Default 3 seconds duration
      text: "New subtitle text"
    };
    
    setSubtitles([...subtitles, newSegment]);
    setEditingIndex(subtitles.length); // Set editing to the new segment
    
    toast({
      title: "New Segment Added",
      description: "A new subtitle segment has been added. You can now edit it.",
    });
  };

  const startSegmentSelection = () => {
    setIsSelectingSegment(true);
  };

  const cancelSegmentSelection = () => {
    setIsSelectingSegment(false);
  };

  const selectSegmentToEdit = (index: number) => {
    setEditingIndex(index);
    setIsSelectingSegment(false);
    
    toast({
      title: "Segment Selected",
      description: "You can now edit the text for this segment.",
    });
  };

  return {
    subtitles,
    setSubtitles,
    editingIndex,
    setEditingIndex,
    isSelectingSegment,
    handleSubtitleUpdate,
    handleTextChange,
    handleTimeChange,
    handleAddSegment,
    startSegmentSelection,
    cancelSegmentSelection,
    selectSegmentToEdit
  };
}

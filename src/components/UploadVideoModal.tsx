
import React, { useState, useRef } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DropZone from "@/components/upload/DropZone";
import VideoPreview from "@/components/upload/VideoPreview";
import UploadProgress from "@/components/upload/UploadProgress";

export interface UploadedVideo {
  name: string;
  size: number;
  url: string;
  tempId: string;
}

interface UploadVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoUploaded: (video: UploadedVideo) => void;
}

const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded }: UploadVideoModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    // Check if file is a video
    if (!selectedFile.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateTempId = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Create a temporary URL for the video
        const videoUrl = URL.createObjectURL(file);
        
        // Generate a random temp ID for the video
        const tempId = generateTempId();
        
        // Simulate processing delay
        setTimeout(() => {
          setIsUploading(false);
          toast({
            title: "Upload successful",
            description: "Your video has been uploaded and is being processed."
          });
          
          // Pass the video information back to the parent component
          onVideoUploaded({
            name: file.name,
            size: file.size,
            url: videoUrl,
            tempId: tempId
          });
          
          // Reset the modal
          setFile(null);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 500);
      }
    }, 200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Upload Video</DialogTitle>
          <DialogDescription>
            Upload a video to translate and add subtitles
          </DialogDescription>
        </DialogHeader>
        
        {!isUploading ? (
          <>
            {file ? (
              <VideoPreview file={file} onRemove={removeFile} />
            ) : (
              <DropZone 
                onFileSelect={handleFileSelect}
                fileInputRef={fileInputRef}
              />
            )}
            
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={!file}
                className="bg-brand-orange hover:bg-brand-orange/90"
              >
                Upload Video
              </Button>
            </DialogFooter>
          </>
        ) : (
          <UploadProgress 
            fileName={file?.name || ""} 
            progress={uploadProgress} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoModal;

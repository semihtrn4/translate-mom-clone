
import React from "react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  fileName: string;
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ fileName, progress }) => {
  return (
    <div className="py-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Uploading {fileName}</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-sm text-gray-500">
        Please don't close this window while your video is uploading.
      </p>
    </div>
  );
};

export default UploadProgress;

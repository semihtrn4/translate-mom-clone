
import React from "react";
import VideoCard, { SubtitleSegment } from "./VideoCard";

interface UploadedVideo {
  name: string;
  size: number;
  url: string;
  tempId: string;
}

interface VideoGridProps {
  videos: UploadedVideo[];
  onSubtitlesGenerated: (subtitles: SubtitleSegment[], videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onSubtitlesGenerated }) => {
  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <VideoCard 
            key={video.tempId} 
            video={video} 
            onSubtitlesGenerated={onSubtitlesGenerated}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;

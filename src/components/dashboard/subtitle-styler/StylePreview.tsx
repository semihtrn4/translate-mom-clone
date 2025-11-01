import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, Play, Pause } from "lucide-react";
import { SubtitleStyle, generateSubtitlePreviewStyle } from "@/services/subtitleStyle";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";
import { Button } from "@/components/ui/button";

interface StylePreviewProps {
  style: SubtitleStyle;
  initialText?: string;
  videoId?: string;
  subtitles?: SubtitleSegment[];
  translatedSubtitles?: SubtitleSegment[] | null;
  translationLanguageName?: string | null;
}

const StylePreview: React.FC<StylePreviewProps> = ({ 
  style, 
  initialText = "This is how your subtitles will appear",
  videoId,
  subtitles = [],
  translatedSubtitles,
  translationLanguageName
}) => {
  const [previewText, setPreviewText] = useState(initialText);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use the appropriate subtitle array
  const subtitleArray = translatedSubtitles || subtitles || [];

  // Find the video source if we have access to uploaded videos
  useEffect(() => {
    if (videoId) {
      try {
        const videos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
        const currentVideo = videos.find((v: any) => v.tempId === videoId);
        if (currentVideo) {
          setVideoSrc(currentVideo.url);
        }
      } catch (error) {
        console.error("Error loading video source:", error);
      }
    }
  }, [videoId]);

  // Update preview text with translated subtitle if available
  useEffect(() => {
    if (translatedSubtitles && translatedSubtitles.length > 0) {
      setPreviewText(translatedSubtitles[0].text);
    }
  }, [translatedSubtitles]);

  // Handle video timeupdate to track playback time
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateTime = () => {
      setCurrentTime(videoElement.currentTime * 1000); // Convert to ms
    };

    videoElement.addEventListener('timeupdate', updateTime);
    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // Update active subtitle based on current time
  useEffect(() => {
    if (subtitleArray.length === 0) return;

    const activeSubtitle = subtitleArray.find(
      sub => currentTime >= sub.start && currentTime <= sub.end
    );

    if (activeSubtitle) {
      setActiveSubtitle(activeSubtitle.text);
    } else {
      setActiveSubtitle(null);
    }
  }, [currentTime, subtitleArray]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-2" />
          <Label>Live Preview</Label>
        </div>
        {translationLanguageName && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {translationLanguageName}
          </span>
        )}
      </div>
      <div 
        className="border rounded-lg flex-1 p-0 relative overflow-hidden"
        style={{ minHeight: "240px", backgroundColor: "#000" }}
      >
        {/* Video backdrop */}
        {videoSrc ? (
          <>
            <video 
              ref={videoRef}
              src={videoSrc} 
              className="absolute inset-0 w-full h-full object-contain"
              muted
              loop
              playsInline
              onError={(e) => console.error("Preview video error:", e)}
            />
            <div className="absolute bottom-2 left-2 z-20">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-black/50 hover:bg-black/70 text-white border-white/30 h-8 w-8 p-0"
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
            <p className="text-sm">Video preview</p>
          </div>
        )}
        
        {/* Subtitle overlay */}
        <div 
          className={`subtitle-preview absolute ${style.position === 'top' ? 'top-4' : style.position === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-4'}`}
          style={{ 
            width: '100%', 
            textAlign: 'center',
            padding: '0 16px',
            zIndex: 10,
            transition: 'all 0.3s ease',
            opacity: (isPlaying && videoSrc) ? 1 : 0.5
          }}
        >
          {isPlaying && videoSrc && activeSubtitle ? (
            <div 
              style={generateSubtitlePreviewStyle(style)}
              className="transition-all duration-300 ease-in-out"
            >
              {activeSubtitle}
            </div>
          ) : (
            <div 
              style={generateSubtitlePreviewStyle(style)}
              className="transition-all duration-300 ease-in-out"
            >
              {previewText}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Input 
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type to preview subtitle text"
          className="text-sm"
          disabled={Boolean(isPlaying && videoSrc)}
        />
      </div>
    </div>
  );
};

export default StylePreview;

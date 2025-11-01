import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Video } from "lucide-react";
import { toast } from "sonner";

interface ProcessedVideo {
  id: string;
  user_id: string;
  video_url: string;
  video_name: string | null;
  subtitle_path: string | null;
  created_at: string;
}

export const ProcessedVideoDisplay: React.FC = () => {
  const [processedVideo, setProcessedVideo] = useState<ProcessedVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestProcessedVideo();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('processed-videos-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'processed_videos'
        },
        (payload) => {
          console.log('New processed video:', payload);
          setProcessedVideo(payload.new as ProcessedVideo);
          toast.success("Your processed video is ready!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestProcessedVideo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('processed_videos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching processed video:', error);
        toast.error("Failed to load processed video");
      } else if (data) {
        setProcessedVideo(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!processedVideo) return;

    try {
      const response = await fetch(processedVideo.video_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = processedVideo.video_name || 'processed_video.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started!");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download video");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Processed Video
          </CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!processedVideo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Processed Video
          </CardTitle>
          <CardDescription>No processed videos yet. Upload and process a video to see it here.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Processed Video
        </CardTitle>
        <CardDescription>
          {processedVideo.video_name || 'Latest processed video'} - {new Date(processedVideo.created_at).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={processedVideo.video_url}
            controls
            className="w-full h-full"
            onError={(e) => {
              console.error('Video load error:', e);
              toast.error("Failed to load video preview");
            }}
          >
            {processedVideo.subtitle_path && (
              <track
                src={processedVideo.subtitle_path}
                kind="subtitles"
                srcLang="en"
                label="Subtitles"
                default
              />
            )}
            Your browser does not support the video tag.
          </video>
        </div>
        
        <Button 
          onClick={handleDownload}
          className="w-full"
          variant="default"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Processed Video
        </Button>
      </CardContent>
    </Card>
  );
};

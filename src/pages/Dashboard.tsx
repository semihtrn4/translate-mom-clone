
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UploadVideoModal from "@/components/UploadVideoModal";
import VideoGrid from "@/components/dashboard/VideoGrid";
import SubtitleEditor from "@/components/dashboard/SubtitleEditor";
import { ProcessedVideoDisplay } from "@/components/dashboard/ProcessedVideoDisplay";
import { SubtitleSegment } from "@/components/dashboard/VideoCard";

interface UploadedVideo {
  name: string;
  size: number;
  url: string;
  tempId: string;
}

interface VideoSubtitles {
  videoId: string;
  subtitles: SubtitleSegment[];
}

const Dashboard = () => {
  const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [processedSubtitles, setProcessedSubtitles] = useState<VideoSubtitles | null>(null);
  
  // Load videos from localStorage on initial render
  useEffect(() => {
    const savedVideos = localStorage.getItem('uploadedVideos');
    if (savedVideos) {
      try {
        setUploadedVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Error loading saved videos:', e);
      }
    }
  }, []);
  
  const handleVideoUploaded = (video: UploadedVideo) => {
    const newVideos = [...uploadedVideos, video];
    setUploadedVideos(newVideos);
    
    // Save to localStorage for persistence
    localStorage.setItem('uploadedVideos', JSON.stringify(newVideos));
    
    setIsUploadVideoModalOpen(false);
  };
  
  const handleSubtitlesGenerated = (subtitles: SubtitleSegment[], videoId: string) => {
    setProcessedSubtitles({
      videoId,
      subtitles
    });
  };
  
  // Find the video name for the currently processed video
  const getVideoNameById = (id: string): string => {
    const video = uploadedVideos.find(v => v.tempId === id);
    return video ? video.name : "Video";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome to your TranslateMom dashboard</p>
        </div>
        
        <VideoGrid 
          videos={uploadedVideos} 
          onSubtitlesGenerated={handleSubtitlesGenerated}
        />
        
        {processedSubtitles && (
          <SubtitleEditor 
            subtitles={processedSubtitles.subtitles}
            videoId={processedSubtitles.videoId}
            videoName={getVideoNameById(processedSubtitles.videoId)}
          />
        )}
        
        <div className="mb-8">
          <ProcessedVideoDisplay />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Translations</CardTitle>
              <CardDescription>Your recent translation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{uploadedVideos.length}</p>
              <p className="text-sm text-gray-500">
                {uploadedVideos.length === 0 ? "No translations yet" : `${uploadedVideos.length} video${uploadedVideos.length > 1 ? 's' : ''} uploaded`}
              </p>
              <Button 
                className="mt-4 w-full bg-brand-orange hover:bg-brand-orange/90"
                onClick={() => setIsUploadVideoModalOpen(true)}
              >
                Start Translating
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>Your current plan usage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
                <div className="bg-brand-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-sm text-gray-500">0/100 minutes used</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                <span className="font-medium">Plan:</span> Free Trial
              </p>
              <p className="text-sm">
                <span className="font-medium">Renewal Date:</span> N/A
              </p>
              <Button variant="outline" className="mt-4 w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadVideoModalOpen}
        onClose={() => setIsUploadVideoModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />
    </div>
  );
};

export default Dashboard;

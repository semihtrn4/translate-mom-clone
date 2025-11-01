// FFmpeg video processing service with Supabase Edge Function

import { SubtitleSegment } from "../components/dashboard/VideoCard.tsx";
import { SubtitleStyle, defaultSubtitleStyle } from "./subtitleStyle/index.ts";
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Embeds subtitles into a video file using FFmpeg via Supabase Edge Function
 * 
 * @param videoUrl URL of the original video
 * @param subtitles Array of subtitle segments
 * @param style Subtitle styling configuration
 * @param videoName Name of the video file
 * @returns Promise resolving to URL of the processed video and blob
 */
export const embedSubtitlesIntoVideo = (
  videoUrl: string,
  subtitles: SubtitleSegment[],
  style: SubtitleStyle = defaultSubtitleStyle,
  videoName: string
): Promise<{ processedUrl: string; processedBlob: Blob }> => {
  console.log(`Processing video with subtitles: ${videoName}`);
  console.log(`Subtitles: ${subtitles.length} segments`);
  console.log("Style settings:", style);
  
  const updatedStyle = {
    ...style,
    preferredFormat: 'ass' as const
  };
  
<<<<<<< HEAD
  return new Promise(async (resolve, reject) => {
    try {
      // Import Supabase client
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("User must be authenticated to process videos. Please log in.");
      }
      
      console.log("User authenticated, proceeding with video processing");
=======
  return new Promise((resolve, reject) => {
    // Import Supabase client
    import("../integrations/supabase/client.ts").then(async ({ supabase }) => {
      try {
        // Type the supabase client
        const typedSupabase = supabase as SupabaseClient;
        
        // Check authentication with more detailed logging
        console.log("Checking user authentication...");
        const { data: { session }, error: authError } = await typedSupabase.auth.getSession();
        if (authError) {
          console.error("Authentication check failed:", authError);
          throw new Error(`Authentication check failed: ${authError.message}`);
        }
        
        if (!session) {
          console.error("No active session found");
          throw new Error("User must be authenticated to process videos - no session found");
        }
        
        const user = session.user;
        console.log("User authenticated successfully:", user?.id);
>>>>>>> 208b8da (supabase error)

        // Fetch the video blob from the URL
        const response = await fetch(videoUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }
        
        const videoBlob = await response.blob();
        const videoFile = new File([videoBlob], videoName, { type: videoBlob.type });
        
        // Prepare form data
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('subtitles', JSON.stringify(subtitles));
        formData.append('style', JSON.stringify(updatedStyle));
        formData.append('videoName', videoName);
        
        console.log("Uploading video to server for processing...");
        
        // Call edge function with improved error handling
        const { data, error } = await typedSupabase.functions.invoke('process-video', {
          body: formData,
          headers: { 
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          }
        });
        
        if (error) {
          console.error("Edge function error:", error);
          // Check if it's an authentication error
          if (error.message && error.message.includes('Unauthorized')) {
            throw new Error("Authentication failed when calling video processing service. Please try logging in again.");
          }
          throw new Error(error.message || "Failed to process video");
        }
        
        if (!data.success) {
          throw new Error(data.error || "Video processing failed");
        }
        
        console.log("Video processed successfully:", data.message);
        
        // Fetch the processed video
        const processedResponse = await fetch(data.processedVideoUrl);
        if (!processedResponse.ok) {
          throw new Error(`Failed to fetch processed video: ${processedResponse.status} ${processedResponse.statusText}`);
        }
        
        const processedBlob = await processedResponse.blob();
        const processedUrl = URL.createObjectURL(processedBlob);
        
        resolve({ processedUrl, processedBlob });
      } catch (error) {
        console.error("Error processing video:", error);
        reject(error);
      }
<<<<<<< HEAD
      
      const videoBlob = await response.blob();
      const videoFile = new File([videoBlob], videoName, { type: videoBlob.type });
      
      // Prepare form data
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('subtitles', JSON.stringify(subtitles));
      formData.append('style', JSON.stringify(updatedStyle));
      formData.append('videoName', videoName);
      
      console.log("Uploading video to server for processing...");
      
      // Call edge function with explicit auth header
      const { data, error } = await supabase.functions.invoke('process-video', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to process video");
      }
      
      if (!data.success) {
        throw new Error(data.error || "Video processing failed");
      }
      
      console.log("Video processed successfully:", data.message);
      
      // Fetch the processed video
      const processedResponse = await fetch(data.processedVideoUrl);
      if (!processedResponse.ok) {
        throw new Error("Failed to fetch processed video");
      }
      
      const processedBlob = await processedResponse.blob();
      const processedUrl = URL.createObjectURL(processedBlob);
      
      resolve({ processedUrl, processedBlob });
    } catch (error) {
      console.error("Error processing video:", error);
=======
    }).catch((error) => {
      console.error("Error importing Supabase client:", error);
>>>>>>> 208b8da (supabase error)
      reject(error);
    });
  });
};

/**
 * Generates FFmpeg filter complex command for subtitle styling
 * Note: This would be used in a server-side implementation with actual FFmpeg
 * 
 * @param style Subtitle styling configuration
 * @returns FFmpeg filter complex string (not used in browser implementation)
 */
export const generateFFmpegSubtitleFilter = (style: SubtitleStyle = defaultSubtitleStyle): string => {
  // This would generate the actual FFmpeg command for styling subtitles
  // For example: subtitles=file.ass:force_style='FontName=Arial,FontSize=24,PrimaryColour=&H00FFFFFF'
  
  // Convert hex color to FFmpeg format (AABBGGRR)
  const textColor = style.textColor || defaultSubtitleStyle.textColor;
  const outlineColor = style.outlineColor || defaultSubtitleStyle.outlineColor || '#000000';
  
  // Build style options for ASS
  const styleOptions = [
    `FontName=${style.fontFamily || 'Arial'}`,
    `FontSize=${style.fontSize || 16}`,
    `Bold=${style.bold ? 1 : 0}`,
    `Italic=${style.italic ? 0 : 0}`,
    `Alignment=${style.position === 'top' ? 8 : style.position === 'middle' ? 5 : 2}`,
    `PrimaryColour=${textColor.replace('#', '&H')}`,
    `OutlineColour=${outlineColor.replace('#', '&H')}`,
    `BorderStyle=1`,
    `Outline=${style.outline ? (style.strokeWidth || 2) : 0}`,
    `Shadow=0`,
    `MarginV=${style.position === 'top' ? 20 : style.position === 'middle' ? 50 : 20}`,
  ].join(',');
  
  // Always use ASS format for better styling support
  return `subtitles=file.ass:force_style='${styleOptions}'`;
};
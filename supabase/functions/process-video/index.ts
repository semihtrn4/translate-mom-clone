<<<<<<< HEAD
// @ts-ignore - Required for Supabase Edge Functions
=======
// deno-lint-ignore-file require-await
/// <reference path="../deno-types.d.ts" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

>>>>>>> 208b8da (supabase error)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Add reference to Deno type definitions
/// <reference path="../deno-types.d.ts" />

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

interface SubtitleStyle {
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  position: 'bottom' | 'top' | 'middle';
  outline: boolean;
  outlineColor?: string;
  strokeWidth?: number;
  bold?: boolean;
  italic?: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // More detailed logging for debugging
    console.log('Processing video request');
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
<<<<<<< HEAD
      throw new Error('No authorization header');
=======
      return new Response(
        JSON.stringify({ success: false, error: 'No authorization header provided' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
>>>>>>> 208b8da (supabase error)
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace('Bearer ', '');
    console.log('Token extracted from header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        global: { 
          headers: { 
            Authorization: authHeader,
            'apikey': Deno.env.get('SUPABASE_ANON_KEY') ?? ''
          } 
        },
        auth: {
          persistSession: false,
          detectSessionInUrl: false
        }
      }
    );

<<<<<<< HEAD
    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (!token) {
      console.error('Invalid Authorization header format');
      throw new Error('Invalid Authorization header');
=======
    // Use getUser instead of getSession for token validation
    console.log('Attempting to get user with token');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError) {
      console.error('User authentication error:', userError);
      return new Response(
        JSON.stringify({ success: false, error: `User authentication failed: ${userError.message}` }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
>>>>>>> 208b8da (supabase error)
    }
    
    if (!user) {
      console.error('No user found in authentication response');
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized: No valid user found' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    console.log('User authenticated successfully:', user.id);

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError) {
      console.error('Auth error:', userError);
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    
    if (!user) {
      console.error('No user found in session');
      throw new Error('User not authenticated');
    }
    
    console.log('User authenticated:', user.id);

    const formData = await req.formData();
    const videoFile = formData.get('video') as File;
    const subtitles = JSON.parse(formData.get('subtitles') as string) as SubtitleSegment[];
    const style = JSON.parse(formData.get('style') as string) as SubtitleStyle;
    const videoName = formData.get('videoName') as string;

    if (!videoFile || !subtitles || !style) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Processing video: ${videoName} for user: ${user.id}`);
    console.log(`Subtitles: ${subtitles.length} segments`);

    // Upload original video to storage
    const videoFileName = `${user.id}/${Date.now()}_${videoName}`;
    const videoBuffer = await videoFile.arrayBuffer();
    
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(videoFileName, videoBuffer, {
        contentType: videoFile.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to upload video: ${uploadError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Video uploaded successfully');

    // Create ASS subtitle file
    const assContent = generateASSSubtitle(subtitles, style, videoName);
    const assFileName = `${user.id}/${Date.now()}_${videoName.replace(/\.[^/.]+$/, '')}.ass`;
    
    const { error: assUploadError } = await supabase.storage
      .from('videos')
      .upload(assFileName, new TextEncoder().encode(assContent), {
        contentType: 'text/plain',
        upsert: false
      });

    if (assUploadError) {
      console.error('ASS upload error:', assUploadError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to upload subtitle file: ${assUploadError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get public URL for the ASS subtitle file
    const { data: assUrlData } = supabase.storage
      .from('videos')
      .getPublicUrl(assFileName);

    console.log('Subtitle file uploaded successfully');

<<<<<<< HEAD
    // Generate VTT subtitle file for browser playback
    const vttContent = generateVTTSubtitle(subtitles);
    const vttFileName = `${user.id}/${Date.now()}_${videoName.replace(/\.[^/.]+$/, '')}.vtt`;

    const { error: vttUploadError } = await supabase.storage
=======
    // Convert ASS to SRT for Python processing
    const srtContent = convertASSToSRT(assContent);
    const srtFileName = `${user.id}/${Date.now()}_${videoName.replace(/\.[^/.]+$/, '')}.srt`;
    
    const { error: srtUploadError } = await supabase.storage
      .from('videos')
      .upload(srtFileName, new TextEncoder().encode(srtContent), {
        contentType: 'text/plain',
        upsert: false
      });

    if (srtUploadError) {
      console.error('SRT upload error:', srtUploadError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to upload SRT subtitle file: ${srtUploadError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get URLs for the files
    const { data: videoUrlData } = supabase.storage
      .from('videos')
      .getPublicUrl(videoFileName);
    
    const { data: srtUrlData } = supabase.storage
      .from('videos')
      .getPublicUrl(srtFileName);

    // Call Python backend service for video processing
    const pythonServiceUrl = Deno.env.get('PYTHON_VIDEO_SERVICE_URL') || 'http://host.docker.internal:8000/process';
    
    // Map style properties to Python service format
    const pythonStyleConfig = {
      fontsize: style.fontSize || 24,
      font: style.fontFamily || 'Arial',
      color: style.textColor || 'white',
      stroke_color: style.outlineColor || 'black',
      stroke_width: style.outline ? (style.strokeWidth || 1) : 0
    };

    console.log('Calling Python backend service for video processing...');
    console.log('Video URL:', videoUrlData.publicUrl);
    console.log('SRT URL:', srtUrlData.publicUrl);
    console.log('Python service URL:', pythonServiceUrl);

    const pythonServiceResponse = await fetch(pythonServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        video_url: videoUrlData.publicUrl,
        srt_url: srtUrlData.publicUrl,
        user_id: user.id,
        video_name: videoName,
        style_config: pythonStyleConfig,
        supabase_url: Deno.env.get('SUPABASE_URL'),
        supabase_key: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY'),
        bucket_name: 'processed-videos'
      })
    });

    if (!pythonServiceResponse.ok) {
      const errorText = await pythonServiceResponse.text();
      console.error('Python service error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: `Python service error: ${errorText}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const pythonResult = await pythonServiceResponse.json();
    console.log('Python service response:', pythonResult);
    
    if (!pythonResult.success) {
      console.error('Python service failed:', pythonResult.message);
      return new Response(
        JSON.stringify({ success: false, error: `Python service failed: ${pythonResult.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // If the Python service returns a processed video URL, use it
    if (pythonResult.processed_video_url) {
      console.log('Video processed successfully with Python service');
      return new Response(
        JSON.stringify({
          success: true,
          processedVideoUrl: pythonResult.processed_video_url,
          message: 'Video and subtitles processed successfully with Python service.',
          videoPath: videoFileName,
          subtitlePath: assFileName,
          processedPath: pythonResult.processed_video_url
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback: copy the original video to processed-videos bucket
    console.log('Falling back to copying original video');
    const processedFileName = `${user.id}/${Date.now()}_processed_${videoName}`;
    
    const { error: copyError } = await supabase.storage
>>>>>>> 208b8da (supabase error)
      .from('processed-videos')
      .upload(vttFileName, new TextEncoder().encode(vttContent), {
        contentType: 'text/vtt',
        upsert: false
      });

<<<<<<< HEAD
    if (vttUploadError) {
      console.error('VTT upload error:', vttUploadError);
      // Continue without failing the entire request
=======
    if (copyError) {
      console.error('Copy error:', copyError);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to create processed video: ${copyError.message}` }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
>>>>>>> 208b8da (supabase error)
    }

    // Get public URL for the processed video
    const { data: urlData } = supabase.storage
      .from('processed-videos')
      .getPublicUrl(videoFileName);

    // Get public URL for the VTT subtitles
    const { data: vttUrlData } = supabase.storage
      .from('processed-videos')
      .getPublicUrl(vttFileName);

    // Call Python backend to render final video with subtitles
    const renderResponse = await fetch("https://translate-mom-clone-1.onrender.com/render_subtitle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        video_url: urlData.publicUrl,
        subtitle_url: assUrlData.publicUrl,
        output_name: `final_${videoName}`,
        user_id: user.id
      }),
    });

    const renderResult = await renderResponse.json();
    if (renderResult.success) {
      console.log("Final video generated:", renderResult.final_video_url);

      // Store processed video details in database
      const { error: dbError } = await supabase
        .from('processed_videos')
        .insert({
          user_id: user.id,
          video_url: renderResult.final_video_url,
          video_name: videoName,
          subtitle_path: vttUrlData?.publicUrl ?? null
        });

      if (dbError) {
        console.error('Failed to store processed video record:', dbError);
        // Don't fail the entire request, just log the error
      } else {
        console.log('Processed video record stored successfully');
      }

      return new Response(
        JSON.stringify({
          success: true,
          processedVideoUrl: renderResult.final_video_url,
          message: 'Video processed and rendered successfully.',
          videoPath: videoFileName,
          subtitlePath: assFileName,
          processedPath: videoFileName
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Video processing complete');

    // Store processed video details in database
    const { error: dbError } = await supabase
      .from('processed_videos')
      .insert({
        user_id: user.id,
        video_url: urlData.publicUrl,
        video_name: videoName,
        subtitle_path: vttUrlData?.publicUrl ?? null
      });

    if (dbError) {
      console.error('Failed to store processed video record:', dbError);
      // Don't fail the entire request, just log the error
    } else {
      console.log('Processed video record stored successfully');
    }

    return new Response(
      JSON.stringify({
        success: true,
        processedVideoUrl: urlData.publicUrl,
        message: 'Video and subtitles processed successfully with Python service.',
        videoPath: videoFileName,
        subtitlePath: assFileName,
        processedPath: videoFileName
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error processing video:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generateASSSubtitle(
  subtitles: SubtitleSegment[], 
  style: SubtitleStyle,
  videoName: string
): string {
  let content = '[Script Info]\n';
  content += `Title: ${videoName} subtitles\n`;
  content += 'ScriptType: v4.00+\n';
  content += 'WrapStyle: 0\n';
  content += 'ScaledBorderAndShadow: yes\n';
  content += 'YCbCr Matrix: None\n\n';
  
  content += '[V4+ Styles]\n';
  content += 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n';
  
  const convertColor = (cssColor: string): string => {
    if (cssColor.startsWith('rgba')) {
      const rgba = cssColor.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
      if (rgba) {
        const [, r, g, b, a] = rgba;
        const alpha = Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0');
        return '&H' + alpha + b.padStart(2, '0') + g.padStart(2, '0') + r.padStart(2, '0');
      }
    }
    
    if (cssColor.startsWith('#')) {
      const hex = cssColor.slice(1);
      const r = hex.slice(0, 2);
      const g = hex.slice(2, 4);
      const b = hex.slice(4, 6);
      return '&H00' + b + g + r;
    }
    
    return '&H00FFFFFF';
  };
  
  const getAlignment = (position: string): number => {
    switch (position) {
      case 'top': return 8;
      case 'middle': return 5;
      case 'bottom': return 2;
      default: return 2;
    }
  };
  
  const textColor = convertColor(style.textColor);
  const bgColor = convertColor(style.backgroundColor);
  const outlineColor = style.outline ? convertColor(style.outlineColor || '#000000') : '&H00000000';
  const alignment = getAlignment(style.position);
  
  content += `Style: Default,${style.fontFamily},${style.fontSize},${textColor},${textColor},${outlineColor},${bgColor},${style.bold ? -1 : 0},0,0,0,100,100,0,0,1,${style.outline ? (style.strokeWidth || 2) : 0},0,${alignment},10,10,10,1\n\n`;
  
  content += '[Events]\n';
  content += 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';
  
  const formatTime = (ms: number) => {
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };
  
  subtitles.forEach(subtitle => {
    content += `Dialogue: 0,${formatTime(subtitle.start)},${formatTime(subtitle.end)},Default,,0,0,0,,${subtitle.text}\n`;
  });
  
  return content;
}

<<<<<<< HEAD
function generateVTTSubtitle(subtitles: SubtitleSegment[]): string {
  const pad = (n: number, width = 2) => n.toString().padStart(width, '0');
  const format = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor(ms % 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(millis, 3)}`;
  };

  let content = 'WEBVTT\n\n';
  subtitles.forEach((s, i) => {
    content += `${i + 1}\n`;
    content += `${format(s.start)} --> ${format(s.end)}\n`;
    content += `${s.text}\n\n`;
  });
  return content;
=======
function convertASSToSRT(assContent: string): string {
  // This is a simplified conversion - in a real implementation, you would need a more robust parser
  const lines = assContent.split('\n');
  let srtContent = '';
  let subtitleIndex = 1;
  
  let inEvents = false;
  for (const line of lines) {
    if (line.startsWith('[Events]')) {
      inEvents = true;
      continue;
    }
    
    if (!inEvents) continue;
    
    if (line.startsWith('Dialogue:')) {
      // Parse ASS dialogue line
      const parts = line.split(',');
      if (parts.length >= 10) {
        const startTime = parts[1];
        const endTime = parts[2];
        const text = parts.slice(9).join(',');
        
        // Convert ASS time format to SRT format
        const srtStartTime = convertASSTimeToSRT(startTime);
        const srtEndTime = convertASSTimeToSRT(endTime);
        
        srtContent += `${subtitleIndex}\n`;
        srtContent += `${srtStartTime} --> ${srtEndTime}\n`;
        srtContent += `${text}\n\n`;
        
        subtitleIndex++;
      }
    }
  }
  
  return srtContent;
}

function convertASSTimeToSRT(assTime: string): string {
  // Convert ASS time format (h:mm:ss.cc) to SRT format (h:mm:ss,mmm)
  const [timePart, centiseconds] = assTime.split('.');
  const [hours, minutes, seconds] = timePart.split(':');
  
  // Convert centiseconds to milliseconds
  const milliseconds = parseInt(centiseconds) * 10;
  
  return `${hours}:${minutes}:${seconds},${milliseconds.toString().padStart(3, '0')}`;
>>>>>>> 208b8da (supabase error)
}
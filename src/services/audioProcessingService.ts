
const ASSEMBLY_AI_API_KEY = "6327ed3d24ef42bd9eb381204e67ef33";
const ASSEMBLY_AI_API_URL = "https://api.assemblyai.com/v2";

import type { SubtitleSegment } from "@/components/dashboard/VideoCard";

// Function to extract audio from a video file
export const extractAudioFromVideo = async (videoUrl: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create audio element to load the video
      const audioElement = document.createElement('audio');
      audioElement.src = videoUrl;
      
      // Create media element source
      const source = audioContext.createMediaElementSource(audioElement);
      
      // Create media recorder to capture the audio stream
      const destinationNode = audioContext.createMediaStreamDestination();
      source.connect(destinationNode);
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(destinationNode.stream);
      const chunks: BlobPart[] = [];
      
      // Add event listeners
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        resolve(blob);
      };
      
      // Play the audio and start recording
      audioElement.onloadedmetadata = () => {
        audioElement.play();
        mediaRecorder.start();
        
        // Stop recording when audio ends
        audioElement.onended = () => {
          mediaRecorder.stop();
          audioElement.remove();
        };
      };
      
      audioElement.onerror = (error) => {
        reject(new Error("Error loading video for audio extraction"));
      };
    } catch (error) {
      reject(error);
    }
  });
};

// Function to transcribe audio with AssemblyAI
export const transcribeAudio = async (audioBlob: Blob, fileName: string): Promise<SubtitleSegment[]> => {
  try {
    // Step 1: Upload the audio file to AssemblyAI
    const uploadResponse = await fetch(`${ASSEMBLY_AI_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLY_AI_API_KEY
      },
      body: audioBlob
    });
    
    if (!uploadResponse.ok) {
      throw new Error('Failed to upload audio to AssemblyAI');
    }
    
    const uploadData = await uploadResponse.json();
    const audioUrl = uploadData.upload_url;
    
    // Step 2: Submit the transcription request
    const transcriptResponse = await fetch(`${ASSEMBLY_AI_API_URL}/transcript`, {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLY_AI_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        auto_highlights: true,
        speaker_labels: false,
        format_text: true,
        auto_chapters: true
      })
    });
    
    if (!transcriptResponse.ok) {
      throw new Error('Failed to submit transcription request');
    }
    
    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;
    
    // Step 3: Poll for the transcription result
    let result;
    let status = 'processing';
    
    while (status !== 'completed' && status !== 'error') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pollingResponse = await fetch(`${ASSEMBLY_AI_API_URL}/transcript/${transcriptId}`, {
        method: 'GET',
        headers: {
          'authorization': ASSEMBLY_AI_API_KEY
        }
      });
      
      if (!pollingResponse.ok) {
        throw new Error('Failed to get transcription status');
      }
      
      result = await pollingResponse.json();
      status = result.status;
      
      if (status === 'error') {
        throw new Error(`Transcription error: ${result.error}`);
      }
    }
    
    // Step 4: Get the transcription with word-level timestamps
    if (!result.words || result.words.length === 0) {
      throw new Error('No words found in transcription');
    }
    
    // Process the words into subtitle segments (approximately 10-second chunks)
    return processWordsIntoSubtitles(result.words);
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio. Please try again.');
  }
};

// Helper function to process words into subtitle segments
function processWordsIntoSubtitles(words: any[]): SubtitleSegment[] {
  const segments: SubtitleSegment[] = [];
  const SEGMENT_DURATION = 7000; // 7 seconds per segment
  
  let currentSegment = {
    id: '1',
    start: words[0].start,
    end: 0,
    text: ''
  };
  
  let segmentIndex = 1;
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // If this word would make the segment too long, create a new segment
    if (word.start - currentSegment.start > SEGMENT_DURATION && currentSegment.text.length > 0) {
      // Finalize current segment
      currentSegment.end = words[i - 1].end;
      segments.push({...currentSegment});
      
      // Start a new segment
      segmentIndex++;
      currentSegment = {
        id: segmentIndex.toString(),
        start: word.start,
        end: 0,
        text: word.text
      };
    } else {
      // Add to current segment
      currentSegment.text += (currentSegment.text ? ' ' : '') + word.text;
    }
  }
  
  // Add the last segment
  if (currentSegment.text.length > 0) {
    currentSegment.end = words[words.length - 1].end;
    segments.push(currentSegment);
  }
  
  return segments;
}

// Function to convert subtitle segments to SRT format
export const convertToSRT = (subtitles: SubtitleSegment[]): string => {
  return subtitles.map((segment, index) => {
    const startTime = formatTimestamp(segment.start);
    const endTime = formatTimestamp(segment.end);
    
    return `${index + 1}\n${startTime} --> ${endTime}\n${segment.text}\n`;
  }).join('\n');
};

// Helper function to format timestamp as HH:MM:SS,mmm
function formatTimestamp(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;
  
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(milliseconds, 3)}`;
}

function pad(num: number, size: number = 2): string {
  let s = num.toString();
  while (s.length < size) s = '0' + s;
  return s;
}

// Function to download SRT file
export const downloadSRT = (subtitles: SubtitleSegment[], filename: string): void => {
  const srtContent = convertToSRT(subtitles);
  const blob = new Blob([srtContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.replace(/\.[^/.]+$/, '') + '.srt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

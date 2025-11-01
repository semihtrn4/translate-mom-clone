
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TranslationInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TranslationInfoModal = ({ isOpen, onClose }: TranslationInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Video Translation Project Requirements</DialogTitle>
          <DialogDescription>
            The following requirements outline the backend API for a video translation and subtitling application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
          <p className="text-sm">
            The system must adhere to modern RESTful practices, support asynchronous processing for large file operations, 
            and include robust error handling and logging. The application will integrate the following external services: 
            Supabase (for user authentication and storage), AssemblyAI (for audio extraction and subtitle generation), 
            DeepL (for subtitle translation), and FFmpeg (for embedding subtitles into the video).
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold">1. User Authentication & Storage:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Use Supabase to implement user authentication, including Google Sign-In.</li>
              <li>Manage session security and token handling as per best practices.</li>
              <li>Utilize Supabase Storage to securely store uploaded videos and generated files.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">2. Video Upload:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Enable users to upload their 'first video' without limitations on file size.</li>
              <li>Validate file formats and sizes before processing.</li>
              <li>Implement asynchronous processing to handle large uploads.</li>
              <li>Save the video in Supabase Storage upon successful upload.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">3. Audio Extraction & Subtitle Generation:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Upon successful video upload, call the AssemblyAI API to:</li>
              <ul className="list-circle pl-5 text-sm space-y-1">
                <li>Extract the audio from the video and convert it into an MP3 file.</li>
                <li>Transcribe the extracted audio to generate a time-coded SRT subtitle file.</li>
                <li>Optionally, generate a plain text transcript.</li>
              </ul>
              <li>Include error handling and logging for every sub-step.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">4. Dashboard & Processing Status:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Create API endpoints that allow the frontend to display a dashboard showing:</li>
              <ul className="list-circle pl-5 text-sm space-y-1">
                <li>Video upload progress, audio extraction, and subtitle generation statuses.</li>
                <li>Detailed timing information and the generated original SRT subtitles.</li>
              </ul>
              <li>Ensure that the system supports asynchronous updates.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">5. Subtitle Translation:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Integrate with the DeepL API to translate the original SRT subtitles.</li>
              <li>Validate that the chosen language is supported by DeepL.</li>
              <li>Provide a 'Translate' action that displays the translated SRT subtitles.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">6. Subtitle Customization:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Offer endpoints for users to customize the subtitle appearance.</li>
              <li>Provide a live preview functionality.</li>
              <li>Generate a final SRT file that combines the translated subtitles with style options.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">7. Video Finalization with FFmpeg:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Use FFmpeg to embed (burn-in) the final, styled SRT subtitles into the original video.</li>
              <li>Ensure that the FFmpeg process is executed asynchronously.</li>
              <li>Optionally, allow the system to support multiple subtitle files.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">8. Download Option:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Provide an API endpoint that enables users to download the finalized video.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">9. General Considerations:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Implement comprehensive error management.</li>
              <li>Use asynchronous job queues and logging to track long-running operations.</li>
              <li>Document every endpoint clearly.</li>
              <li>Ensure robust integration with all external services.</li>
              <li>Follow modular and maintainable coding practices.</li>
            </ul>
          </div>
          
          <div className="space-y-2 border-t pt-3">
            <h3 className="font-semibold text-brand-orange">API Keys:</h3>
            <p className="text-sm"><strong>DeepL API Key:</strong> 585cfc6c-ff54-47cd-a2c3-3e8e449e559d:fx</p>
            <p className="text-sm"><strong>AssemblyAI API Key:</strong> 6327ed3d24ef42bd9eb381204e67ef33</p>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranslationInfoModal;

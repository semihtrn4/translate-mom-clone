-- Create processed_videos table
CREATE TABLE public.processed_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_name TEXT,
  subtitle_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.processed_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own processed videos" 
ON public.processed_videos 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own processed videos" 
ON public.processed_videos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.processed_videos;
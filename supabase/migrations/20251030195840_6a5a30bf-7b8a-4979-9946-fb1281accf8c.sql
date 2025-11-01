-- Create storage bucket for original videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for processed videos with subtitles
INSERT INTO storage.buckets (id, name, public)
VALUES ('processed-videos', 'processed-videos', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for videos bucket
CREATE POLICY "Users can upload their own videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own videos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policies for processed-videos bucket
CREATE POLICY "Users can upload their own processed videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'processed-videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own processed videos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'processed-videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own processed videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'processed-videos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
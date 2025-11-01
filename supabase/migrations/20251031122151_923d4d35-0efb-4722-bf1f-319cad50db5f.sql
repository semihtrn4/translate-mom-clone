-- Ensure processed-videos bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('processed-videos', 'processed-videos', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Create storage policies for processed videos
CREATE POLICY "Public access to processed videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'processed-videos');

CREATE POLICY "Authenticated users can upload processed videos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'processed-videos' 
  AND auth.role() = 'authenticated'
);
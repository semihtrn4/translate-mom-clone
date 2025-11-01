# Supabase Edge Functions

<<<<<<< HEAD
This directory contains Supabase Edge Functions that run on the Deno runtime.

## TypeScript Configuration

The functions use TypeScript but run on the Deno runtime. To ensure proper type checking:

1. The `deno-types.d.ts` file provides type definitions for Deno globals
2. Each function file includes a reference to this type definition file:
   ```typescript
   /// <reference path="../deno-types.d.ts" />
   ```

The Deno type definitions include:
- `Deno.serve()` function for starting the server
- `Deno.env.get()` function for accessing environment variables

## Function: process-video

This function handles video processing workflows:
- Accepts video uploads with subtitle data
- Stores videos and subtitles in Supabase storage
- Calls external Python backend for FFmpeg processing
- Stores processed video information in the database

## Development

When editing these functions in an IDE, you may see type errors for Deno globals. These can be safely ignored as the functions will run correctly on the Supabase platform.

To deploy functions:
```bash
supabase functions deploy process-video
```
=======
This directory contains the Supabase Edge Functions for the translate-mom-clone project.

## Functions

### process-video

This function handles video processing by:
1. Authenticating the user
2. Uploading video and subtitle files to Supabase Storage
3. Calling the Python backend service for actual video processing
4. Returning the processed video URL

## Local Development

### Prerequisites

1. Install Deno:
   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

### Running Functions Locally

1. Start the Supabase local development server:
   ```bash
   supabase start
   ```

2. Deploy functions to local server:
   ```bash
   supabase functions deploy --local
   ```

3. View function logs:
   ```bash
   supabase functions logs --local
   ```

## Deployment

To deploy functions to Supabase:
```bash
supabase functions deploy
```

## Troubleshooting

### Common Issues

1. **Module not found errors**: 
   - Ensure all remote modules are cached: `deno cache <URL>`
   - Check import paths are correct

2. **Authentication issues**:
   - Verify the user session is active
   - Check that the Authorization header is properly set

3. **File upload issues**:
   - Ensure the user has proper permissions
   - Check that the storage buckets exist

4. **Python backend service issues**:
   - Verify the service is running and accessible
   - Check the PYTHON_VIDEO_SERVICE_URL environment variable

### Environment Variables

The following environment variables are required:
- `SUPABASE_URL`: The Supabase project URL
- `SUPABASE_ANON_KEY`: The Supabase anonymous key
- `PYTHON_VIDEO_SERVICE_URL`: The URL of the Python backend service (default: http://host.docker.internal:8000/process)

## Architecture

The video processing workflow:
1. Frontend calls the Edge Function with video and subtitle data
2. Edge Function authenticates the user and uploads files to Supabase Storage
3. Edge Function calls the Python backend service with file URLs and styling information
4. Python backend downloads the files, processes the video with MoviePy to embed subtitles
5. Python backend uploads the processed video back to Supabase Storage
6. Edge Function returns the processed video URL to the frontend
7. Frontend displays the processed video with embedded subtitles
>>>>>>> 208b8da (supabase error)

try:
    from flask import Flask, request, jsonify
    import json
    import tempfile
    import os
    import time
    import requests
    from video_processor import process_video_from_urls
except ImportError as e:
    print(f"Error importing required modules: {e}")
    exit(1)

app = Flask(__name__)

def upload_to_supabase_storage(file_path, bucket_name, file_name, supabase_url, supabase_key):
    """
    Upload a file to Supabase Storage
    """
    try:
        print(f"Uploading file to Supabase: {file_path} to bucket: {bucket_name}")
        # Read the file
        with open(file_path, 'rb') as f:
            files = {'file': (file_name, f, 'video/mp4')}
            headers = {
                'Authorization': f'Bearer {supabase_key}',
                'apikey': supabase_key
            }
            
            # Upload URL
            upload_url = f"{supabase_url}/storage/v1/object/{bucket_name}/{file_name}"
            print(f"Upload URL: {upload_url}")
            
            response = requests.post(upload_url, files=files, headers=headers)
            print(f"Upload response status: {response.status_code}")
            response.raise_for_status()
            
            # Get public URL
            public_url = f"{supabase_url}/storage/v1/object/public/{bucket_name}/{file_name}"
            print(f"Public URL: {public_url}")
            return True, public_url
    except Exception as e:
        print(f"Error uploading to Supabase: {e}")
        import traceback
        traceback.print_exc()
        return False, str(e)

@app.route('/process', methods=['POST'])
def process_video():
    try:
        print("Received video processing request")
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            print("No JSON data provided")
            return jsonify({
                'success': False,
                'message': 'No JSON data provided'
            }), 400
        
        # Extract required parameters
        video_url = data.get('video_url')
        srt_url = data.get('srt_url')
        
        print(f"Video URL: {video_url}")
        print(f"SRT URL: {srt_url}")
        
        if not video_url or not srt_url:
            print("Missing video_url or srt_url")
            return jsonify({
                'success': False,
                'message': 'Missing video_url or srt_url'
            }), 400
        
        # Extract optional parameters
        user_id = data.get('user_id', 'unknown')
        video_name = data.get('video_name', 'video')
        style_config = data.get('style_config', {})
        
        print(f"User ID: {user_id}")
        print(f"Video name: {video_name}")
        print(f"Style config: {style_config}")
        
        # Extract Supabase parameters for uploading result
        supabase_url = data.get('supabase_url')
        supabase_key = data.get('supabase_key')
        bucket_name = data.get('bucket_name', 'processed-videos')
        
        print(f"Supabase URL: {supabase_url}")
        print(f"Bucket name: {bucket_name}")
        
        # Create output path
        with tempfile.TemporaryDirectory() as temp_dir:
            output_filename = f"{user_id}_{int(time.time())}_processed_{video_name}"
            output_path = os.path.join(temp_dir, output_filename)
            print(f"Output path: {output_path}")
            
            # Process video
            print("Starting video processing...")
            success, message = process_video_from_urls(
                video_url,
                srt_url,
                output_path,
                style_config
            )
            
            print(f"Video processing result - Success: {success}, Message: {message}")
            
            if not success:
                return jsonify({
                    'success': False,
                    'message': message
                }), 500
            
            # Check if output file was created
            if not os.path.exists(output_path):
                print("Processed video file was not created")
                return jsonify({
                    'success': False,
                    'message': 'Processed video file was not created'
                }), 500
            
            print("Video processing completed successfully")
            
            # If Supabase credentials provided, upload the processed video
            if supabase_url and supabase_key:
                print("Uploading processed video to Supabase...")
                upload_success, upload_result = upload_to_supabase_storage(
                    output_path, 
                    bucket_name, 
                    output_filename, 
                    supabase_url, 
                    supabase_key
                )
                
                if upload_success:
                    print("Video uploaded successfully to Supabase")
                    return jsonify({
                        'success': True,
                        'message': 'Video processed and uploaded successfully',
                        'processed_video_url': upload_result
                    })
                else:
                    print(f"Failed to upload video to Supabase: {upload_result}")
                    return jsonify({
                        'success': False,
                        'message': f'Video processed but failed to upload: {upload_result}'
                    }), 500
            
            # If no Supabase credentials, return local path
            print("No Supabase credentials provided, returning local path")
            return jsonify({
                'success': True,
                'message': 'Video processed successfully',
                'processed_video_path': output_path
            })
    
    except Exception as e:
        print(f"Error processing request: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'message': f'Error processing request: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'video-processing-backend'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting video processing backend on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
import { useState } from 'react';
import YouTubePlayer from './YouTubePlayer';
import AudioVisualizer from './AudioVisualizer';

const VideoPlayer = ({ source, url, onTimeUpdate }) => {
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
    }
  };

  const handleVideoTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    onTimeUpdate?.(currentTime);
  };

  // YouTube source
  if (source === 'youtube' && url) {
    return (
      <div className="w-full h-full">
        <YouTubePlayer 
          url={url} 
          onTimeUpdate={onTimeUpdate}
        />
      </div>
    );
  }

  // Uploaded video source
  if (source === 'upload') {
    return (
      <div className="w-full h-full bg-card rounded-lg border border-border overflow-hidden">
        {uploadedVideo ? (
          <video
            src={uploadedVideo}
            controls
            className="w-full h-full object-contain"
            onTimeUpdate={handleVideoTimeUpdate}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4">
            <p className="text-muted-foreground text-center">
              Upload a video file to start captioning
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
                Choose Video File
              </div>
            </label>
          </div>
        )}
      </div>
    );
  }

  // Microphone source
  if (source === 'microphone') {
    return (
      <AudioVisualizer onTimeUpdate={onTimeUpdate} />
    );
  }

  // Screen audio source (placeholder)
  if (source === 'screen') {
    return (
      <div className="w-full h-full bg-card rounded-lg border border-border flex items-center justify-center">
        <p className="text-muted-foreground">Screen audio capture - Coming soon</p>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="w-full h-full bg-card rounded-lg border border-border flex items-center justify-center">
      <p className="text-muted-foreground">No media source selected</p>
    </div>
  );
};

export default VideoPlayer;

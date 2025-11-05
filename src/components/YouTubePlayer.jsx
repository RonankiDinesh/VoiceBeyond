import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ url, onTimeUpdate, onReady }) => {
  const [player, setPlayer] = useState(null);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match?.[2] || null;
  };

  const videoId = getYouTubeID(url);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        onTimeUpdate?.(currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, onTimeUpdate]);

  const handleReady = (event) => {
    setPlayer(event.target);
    onReady?.(event.target);
  };

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
          },
        }}
        onReady={handleReady}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};

export default YouTubePlayer;

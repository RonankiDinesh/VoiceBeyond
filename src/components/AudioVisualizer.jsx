import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';

const AudioVisualizer = ({ onTimeUpdate }) => {
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => stopRecording();
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(mediaStream);
      
      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      startTimeRef.current = Date.now();

      visualize();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const visualize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      // Update time
      if (startTimeRef.current && onTimeUpdate) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        onTimeUpdate(elapsed);
      }

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'hsl(var(--primary) / 0.1)');
      gradient.addColorStop(1, 'hsl(var(--background))');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waveform
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'hsl(var(--primary))';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  return (
    <div className="w-full h-full bg-card rounded-lg border border-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isRecording ? 'bg-primary/20 animate-pulse' : 'bg-muted'}`}>
            <Mic className={`w-5 h-5 ${isRecording ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Live Microphone</h3>
            <p className="text-xs text-muted-foreground">
              {isRecording ? 'Recording...' : 'Click Start to begin'}
            </p>
          </div>
        </div>
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="sm"
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? (
            <>
              <MicOff className="mr-2 w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Mic className="mr-2 w-4 h-4" />
              Start
            </>
          )}
        </Button>
      </div>
      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default AudioVisualizer;

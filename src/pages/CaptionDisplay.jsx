import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CaptionControls } from "@/components/CaptionControls";
import { CaptionOverlay } from "@/components/CaptionOverlay";
import { LatencyIndicator } from "@/components/LatencyIndicator";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { 
  Settings, 
  Maximize2,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CaptionDisplay() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [overlayMode, setOverlayMode] = useState(false);
  const [latency, setLatency] = useState<"low" | "medium" | "high">("low");
  
  // Settings state
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [captionMode, setCaptionMode] = useState("raw");
  const [fontSize, setFontSize] = useState(24);
  const [captionSpeed, setCaptionSpeed] = useState(50);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(false);

  const captionBoxRef = useRef(null);
  const source = searchParams.get("source");

  // Mock WebSocket connection and caption generation
  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: `Started captioning from ${source}`
      });
    }, 1000);

    // Mock caption generation
    const mockCaptions = [
      "Welcome to real-time captioning",
      "This is a demonstration of our multilingual caption system",
      "Captions appear in real-time as speech is detected",
      "You can customize font size, speed, and language",
      "The system supports over 20 languages",
      "Accessibility features include high contrast and dyslexia-friendly fonts"
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < mockCaptions.length) {
        const newCaption: Caption = {
          id: Date.now().toString(),
          text: mockCaptions[index],
          timestamp: Date.now(),
          language: outputLanguage
        };
        
        setCaptions(prev => [...prev, newCaption]);
        setCurrentCaption(mockCaptions[index]);
        
        // Simulate latency changes
        const randomLatency = Math.random();
        if (randomLatency > 0.8) setLatency("high");
        else if (randomLatency > 0.5) setLatency("medium");
        else setLatency("low");
        
        index++;
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [source, outputLanguage, toast]);

  // Auto-scroll to latest caption
  useEffect(() => {
    if (captionBoxRef.current) {
      captionBoxRef.current.scrollTop = captionBoxRef.current.scrollHeight;
    }
  }, [captions]);

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link to="/select">
              <ChevronLeft className="mr-2 w-4 h-4" />
              <span className="hidden xs:inline">Change Source</span>
              <span className="xs:hidden">Back</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <ConnectionStatus isConnected={isConnected} />
              <LatencyIndicator latency={latency} />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOverlayMode(!overlayMode)}
                className="hidden sm:flex"
              >
                <Maximize2 className="mr-2 w-4 h-4" />
                Overlay Mode
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOverlayMode(!overlayMode)}
                className="sm:hidden"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Caption Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl bg-card shadow-card border border-border p-8 ${
              highContrast ? "bg-black text-white" : ""
            } ${dyslexiaFriendly ? "font-mono" : ""}`}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Live Captions</h2>
              <p className="text-muted-foreground">
                Source: {source === "microphone" ? "Live Microphone" : "YouTube"}
              </p>
            </div>

            {/* Current Caption (Large) */}
            <div className="mb-8 p-6 rounded-xl bg-muted/50 min-h-[120px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentCaption}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: `${fontSize}px` }}
                  className="font-semibold text-center leading-relaxed"
                >
                  {currentCaption || "Waiting for audio..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Caption History */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Caption History</h3>
              <div
                ref={captionBoxRef}
                className="space-y-3 max-h-96 overflow-y-auto pr-4 custom-scrollbar"
              >
                {captions.map((caption, index) => (
                  <motion.div
                    key={caption.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="flex-1">{caption.text}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(caption.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Controls Sidebar */}
          {showSettings && (
            <CaptionControls
              outputLanguage={outputLanguage}
              setOutputLanguage={setOutputLanguage}
              captionMode={captionMode}
              setCaptionMode={setCaptionMode}
              fontSize={fontSize}
              setFontSize={setFontSize}
              captionSpeed={captionSpeed}
              setCaptionSpeed={setCaptionSpeed}
              highContrast={highContrast}
              setHighContrast={setHighContrast}
              dyslexiaFriendly={dyslexiaFriendly}
              setDyslexiaFriendly={setDyslexiaFriendly}
            />
          )}
        </div>
      </main>

      {/* Overlay Mode */}
      {overlayMode && (
        <CaptionOverlay
          caption={currentCaption}
          fontSize={fontSize}
          onClose={() => setOverlayMode(false)}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </div>
  );
}

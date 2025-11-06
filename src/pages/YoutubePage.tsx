import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Youtube, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";
import { DraggableCaption } from "@/components/DraggableCaption";


export default function YoutubePage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [language, setLanguage] = useState("hi");
  const [currentCaption, setCurrentCaption] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID from URL
  const extractVideoId = (inputUrl: string) => {
    const patterns = [
      /youtube\.com.*v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/shorts\/([^?]+)/,
    ];
    for (const p of patterns) {
      const match = inputUrl.match(p);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    const newVideoId = extractVideoId(value);

    if (newVideoId !== videoId) {
      if (videoRef.current) videoRef.current.src = "";
      setVideoId(newVideoId);
      setIsConnected(false);
      setIsDimmed(false);
      setShowOverlay(false);
      setCurrentCaption("");
    }
  };

  const handleSubmit = async () => {
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube link.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (videoRef.current) {
        videoRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }

      // Call backend API directly with axios
      const response = await axios.post("http://127.0.0.1:8000/api/captions", {
        youtube_url: url, // must match FastAPI field
        language: language,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      setCurrentCaption(result.caption || "No transcription received.");
      setShowOverlay(true);
      setIsConnected(true);
      setIsDimmed(true);
    } catch (error) {
      toast({
        title: "Error",
        description: axios.isAxiosError(error)
          ? error.response?.data?.detail || error.message
          : "Failed to process YouTube video.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen gradient-hero flex flex-col items-center justify-start px-4 py-20 font-clash relative ${
        isDimmed
          ? "before:absolute before:inset-0 before:bg-background/80 before:backdrop-blur-sm before:z-10"
          : ""
      }`}
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 max-sm:top-5 top-4 scale-150"
        onClick={() => (window.location.href = "/select")}
      >
        <ArrowLeft className="w-10 h-10" />
      </Button>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-3xl bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border relative ${
          isDimmed ? "z-20" : ""
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg mb-6">
            <Youtube className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center">YouTube Captioning</h1>
          <p className="text-muted-foreground text-lg text-center mt-2">
            Enter the URL and select your caption language.
          </p>
        </div>

        {/* Input and Submit */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={url}
            onChange={handleUrlChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-12 text-lg flex-1"
          />
          <Button
            onClick={handleSubmit}
            size="lg"
            className="h-12 px-6 text-lg shadow-primary hover:shadow-glow"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start<ArrowRight className="ml-2 w-5 h-5" /></>}
          </Button>
        </div>

        {/* Video Preview */}
        {videoId && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Video Preview</h2>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-border">
              <iframe ref={videoRef} src={`https://www.youtube.com/embed/${videoId}`} className="w-full h-full" allowFullScreen />
            </div>

            {/* Display Transcription */}
            {isConnected && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Transcribed Text</h3>
                </div>
                <div className="bg-muted p-4 rounded-lg min-h-[100px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCaption}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-lg text-center"
                    >
                      {currentCaption || "Processing..."}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Language Selector */}
        <div className="mt-12">
          <LanguageSelector onChange={setLanguage} scrollable />
        </div>
      </motion.div>
    </div>
  );
}

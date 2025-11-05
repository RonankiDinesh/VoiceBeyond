import { motion } from "framer-motion";
import { Mic, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useState } from "react";

export default function LiveMicrophonePage() {
  const { toast } = useToast();
  const [language, setLanguage] = useState("Hindi");

  const handleStart = () => {
    toast({
      title: "Live Captioning Started",
      description: `Captions will appear in ${language}`,
    });
  };

  return (
    <div className="relative min-h-screen font-clash overflow-hidden">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-20 scale-150 bg-white/10 hover:bg-white/20"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </Button>

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/background-video.mp4"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20 w-full max-w-3xl text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg mx-auto mb-6">
            <Mic className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Live Microphone Captioning
          </h1>
          <p className="text-gray-200 text-lg mb-10">
            Speak into your microphone to get real-time captions.
          </p>

          <LanguageSelector onChange={setLanguage} scrollable />

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 px-8 py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg shadow-green-500/50 transition-all"
            onClick={handleStart}
          >
            Start Live Captions
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

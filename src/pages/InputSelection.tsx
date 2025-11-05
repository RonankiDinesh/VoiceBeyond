import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Youtube, 
  Upload, 
  Mic, 
  Monitor,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function InputSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const inputMethods = [
    {
      id: "youtube",
      icon: Youtube,
      title: "YouTube URL",
      description: "Paste a YouTube video link to generate captions",
      color: "from-red-500 to-red-600",
      action: () => setSelectedMethod("youtube")
    },
    {
      id: "upload",
      icon: Upload,
      title: "Upload Video",
      description: "Upload your own video file for captioning",
      color: "from-blue-500 to-blue-600",
      action: () => {
        toast({
          title: "Coming Soon",
          description: "Video upload feature will be available soon!"
        });
      }
    },
    {
      id: "microphone",
      icon: Mic,
      title: "Live Microphone",
      description: "Use your microphone for real-time speech captioning",
      color: "from-green-500 to-green-600",
      action: () => navigate("/captions?source=microphone")
    },
    {
      id: "screen",
      icon: Monitor,
      title: "Screen Audio",
      description: "Capture audio from your screen or applications",
      color: "from-purple-500 to-purple-600",
      action: () => {
        toast({
          title: "Coming Soon",
          description: "Screen audio capture will be available soon!"
        });
      }
    }
  ];

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a YouTube URL",
        variant: "destructive"
      });
      return;
    }
    navigate(`/captions?source=youtube&url=${encodeURIComponent(youtubeUrl)}`);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Select Audio Input Source
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose how you want to capture audio for real-time captions
            </p>
          </div>

          {/* Input Method Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {inputMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={method.action}
                className={`p-8 rounded-2xl bg-card shadow-card border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? "border-primary shadow-primary" 
                    : "border-transparent hover:border-primary/50 hover:shadow-primary"
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{method.title}</h3>
                <p className="text-muted-foreground text-lg">{method.description}</p>
              </motion.div>
            ))}
          </div>

          {/* YouTube URL Input */}
          {selectedMethod === "youtube" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-card shadow-card border border-border">
                <h3 className="text-xl font-bold mb-4">Enter YouTube URL</h3>
                <div className="flex gap-4">
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="flex-1 text-lg h-12"
                  />
                  <Button 
                    onClick={handleYoutubeSubmit}
                    size="lg"
                    className="shadow-primary hover:shadow-glow transition-smooth"
                  >
                    Start Captioning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

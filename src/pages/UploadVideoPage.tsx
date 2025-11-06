import { motion } from "framer-motion";
import { Upload, Video, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";

export default function UploadVideoPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [language, setLanguage] = useState("Hindi");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please choose a video file.",
        variant: "destructive",
      });
      return;
    }

    // Log file details for debugging
    console.log('File being uploaded:', {
      name: selectedFile.name,
      type: selectedFile.type,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
    });

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', selectedFile); // Changed 'file' to 'video' to match backend expectation
      formData.append('language', language);

      // Log FormData contents
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch('https://webhook.site/fa0e2daa-5ddd-49d8-a5e9-81073d8fae7c', {
        method: 'POST',
        body: formData,
        // Remove Content-Type header - browser will set it automatically with boundary
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log('Response was not JSON:', responseText);
        throw new Error('Invalid response format');
      }

      toast({
        title: "Upload Successful",
        description: "Your video is being processed for captions.",
      });

      // Log successful response
      console.log('Upload successful:', data);
      
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-clash overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/background-video.mp4"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-20 min-h-screen">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 scale-150 bg-white/10 hover:bg-white/20"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-8 h-8 text-white" />
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20 w-full max-w-3xl"
        >
          {/* Header */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg mx-auto mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-3">
            Upload Your Video
          </h1>
          <p className="text-gray-200 text-lg text-center mb-10">
            Select a video, preview it instantly, and choose your caption language.
          </p>

          {/* Upload Box */}
          <label
            htmlFor="videoUpload"
            className="border-2 border-dashed border-white/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-all text-center bg-white/10 backdrop-blur-md"
          >
            <Video className="w-12 h-12 text-white mb-4" />
            <p className="text-gray-200 text-lg mb-2">
              {selectedFile ? "Selected File:" : "Click to upload a video"}
            </p>
            {selectedFile && (
              <p className="font-medium text-lg text-white">{selectedFile.name}</p>
            )}
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>

          {/* Video Preview */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <h2 className="text-xl font-semibold mb-3 text-white text-center">
                Video Preview
              </h2>
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/30 bg-black">
                <video src={preview} controls className="w-full h-full" />
              </div>
            </motion.div>
          )}

          {/* Language Selector */}
          <div className="mt-12">
            <LanguageSelector onChange={setLanguage} scrollable />
          </div>

          {/* Upload Button */}
          <Button
            size="lg"
            onClick={handleUpload}
            className="w-full mt-10 h-12 text-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-600/80 bg-blue-600 hover:bg-blue-700 text-white transition-all"
          >
            {selectedFile ? "Upload & Continue" : "Select a Video First"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import InputSelection from "./pages/InputSelection";
import CaptionDisplay from "./pages/CaptionDisplay";
import NotFound from "./pages/NotFound";


import YoutubePage from "./pages/YoutubePage";
import UploadVideoPage from "./pages/UploadVideoPage";
import MicrophonePage from "./pages/MicrophonePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select" element={<InputSelection />} />
          <Route path="/captions" element={<CaptionDisplay />} />

          {/* ✅ Add your new pages RIGHT HERE */}
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/upload-video" element={<UploadVideoPage />} />
          <Route path="/microphone" element={<MicrophonePage />} />

          {/* ✅ Catch-all must stay LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

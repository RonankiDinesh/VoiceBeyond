// import { motion } from "framer-motion";
// import { Mic, ArrowLeft } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import LanguageSelector from "@/components/LanguageSelector";
// import { useState, useRef } from "react";

// // ✅ Dummy backend URL (replace later)
// const WS_URL = "wss://echo.websocket.events
// ";

// export default function LiveMicrophonePage() {
//   const { toast } = useToast();
//   const [language, setLanguage] = useState("Hindi");
//   const [caption, setCaption] = useState("Say something…");

//   // Refs for audio & websocket
//   const wsRef = useRef(null);
//   const audioCtxRef = useRef(null);
//   const micSourceRef = useRef(null);
//   const workletNodeRef = useRef(null);

//   // Convert Float32 to 16-bit PCM
//   const floatTo16 = (float32Array) => {
//     const buffer = new ArrayBuffer(float32Array.length * 2);
//     const view = new DataView(buffer);
//     float32Array.forEach((s, i) => {
//       const val = Math.max(-1, Math.min(1, s));
//       view.setInt16(i * 2, val < 0 ? val * 0x8000 : val * 0x7fff, true);
//     });
//     return buffer;
//   };

//   const startCaptions = async () => {
//     toast({
//       title: "🎤 Live Captioning Started",
//       description: `Captions will appear in ${language}`,
//     });

//     // ✅ Create WebSocket
//     wsRef.current = new WebSocket(WS_URL);
//     wsRef.current.binaryType = "arraybuffer";

//     wsRef.current.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       setCaption(data.partial || data.text || "");
//     };

//     await new Promise((res) => (wsRef.current.onopen = res));

//     // ✅ Access microphone
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     audioCtxRef.current = new AudioContext({ sampleRate: 48000 });
//     micSourceRef.current = audioCtxRef.current.createMediaStreamSource(stream);

//     // ✅ AudioWorklet for real-time capture
//     const processor = `
//       class MicProcessor extends AudioWorkletProcessor {
//         process(inputs) {
//           const input = inputs[0];
//           if (input && input[0]) this.port.postMessage(input[0]);
//           return true;
//         }
//       }
//       registerProcessor("mic-processor", MicProcessor);
//     `;
//     const blob = new Blob([processor], { type: "application/javascript" });
//     const url = URL.createObjectURL(blob);
//     await audioCtxRef.current.audioWorklet.addModule(url);

//     workletNodeRef.current = new AudioWorkletNode(audioCtxRef.current, "mic-processor");

//     workletNodeRef.current.port.onmessage = (event) => {
//       const pcm16 = floatTo16(event.data);
//       wsRef.current.send(pcm16);
//     };

//     micSourceRef.current
//       .connect(workletNodeRef.current)
//       .connect(audioCtxRef.current.destination);
//   };

//   const stopCaptions = () => {
//     workletNodeRef.current?.disconnect();
//     micSourceRef.current?.disconnect();
//     audioCtxRef.current?.close();
//     wsRef.current?.close();

//     setCaption("Say something…");

//     toast({
//       title: "🛑 Captions Stopped",
//       description: "Microphone closed.",
//     });
//   };

//   return (
//     <div className="relative min-h-screen font-clash overflow-hidden">
//       {/* Back Button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-4 top-4 z-20 scale-150 bg-white/10 hover:bg-white/20"
//         onClick={() => window.history.back()}
//       >
//         <ArrowLeft className="w-5 h-5 text-white" />
//       </Button>

//       {/* Background video */}
//       <video
//         autoPlay
//         muted
//         loop
//         className="absolute top-0 left-0 w-full h-full object-cover"
//         src="/background-video.mp4"
//       />
//       <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

//       <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 min-h-screen">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 shadow-xl border border-white/20 w-full max-w-3xl text-center"
//         >
//           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg mx-auto mb-6">
//             <Mic className="w-10 h-10 text-white" />
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//             Live Microphone Captioning
//           </h1>
//           <p className="text-gray-200 text-lg mb-10">
//             Speak into your microphone to get real-time captions.
//           </p>

//           <LanguageSelector onChange={setLanguage} scrollable />

//           {/* Live Caption Box */}
//           <div className="mt-8 p-4 text-lg rounded-lg bg-black/50 text-white border border-white/20 min-h-[60px]">
//             {caption}
//           </div>

//           {/* Buttons */}
//           <div className="mt-10 flex gap-4 justify-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="px-8 py-3 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg shadow-green-500/50 transition-all"
//               onClick={startCaptions}
//             >
//               Start
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               className="px-8 py-3 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-500/50 transition-all"
//               onClick={stopCaptions}
//             >
//               Stop
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

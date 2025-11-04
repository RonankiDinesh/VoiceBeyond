import { motion, Reorder, useDragControls } from "framer-motion";
import { X, Move } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface CaptionOverlayProps {
  caption: string;
  fontSize: number;
  onClose: () => void;
}

export const CaptionOverlay = ({ caption, fontSize, onClose }: CaptionOverlayProps) => {
  const [opacity, setOpacity] = useState(0.95);
  const controls = useDragControls();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center pb-20"
    >
      <motion.div
        drag
        dragControls={controls}
        dragMomentum={false}
        className="pointer-events-auto relative group"
        style={{ opacity }}
      >
        {/* Drag Handle */}
        <div
          onPointerDown={(e) => controls.start(e)}
          className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card shadow-lg border border-border">
            <Move className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Drag to move</span>
          </div>
        </div>

        {/* Caption Box */}
        <div
          className="min-w-[600px] max-w-[90vw] px-8 py-6 rounded-2xl backdrop-blur-xl border-2 border-primary/30 shadow-glow"
          style={{
            background: `rgba(0, 0, 0, ${opacity * 0.8})`,
          }}
        >
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: `${fontSize}px` }}
            className="font-semibold text-white text-center leading-relaxed"
          >
            {caption || "Waiting for audio..."}
          </motion.p>
        </div>

        {/* Controls */}
        <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-24 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <Button
            size="icon"
            variant="destructive"
            onClick={onClose}
            className="rounded-full w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { motion, useDragControls } from "framer-motion";
import { X, Move } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface DraggableCaptionProps {
  caption: string;
  onClose: () => void;
}

export const DraggableCaption = ({ caption, onClose }: DraggableCaptionProps) => {
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

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Caption Box */}
        <div
          className="min-w-[400px] max-w-[90vw] px-6 py-4 rounded-xl backdrop-blur-xl border-2 border-primary/30 shadow-glow"
          style={{
            background: `hsl(var(--background) / ${opacity})`,
          }}
        >
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-center font-medium"
          >
            {caption}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};
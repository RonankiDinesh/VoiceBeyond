import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface LatencyIndicatorProps {
  latency: "low" | "medium" | "high";
}

export const LatencyIndicator = ({ latency }: LatencyIndicatorProps) => {
  const config = {
    low: { color: "text-green-500", bg: "bg-green-500/20", label: "Low Latency" },
    medium: { color: "text-yellow-500", bg: "bg-yellow-500/20", label: "Medium Latency" },
    high: { color: "text-red-500", bg: "bg-red-500/20", label: "High Latency" },
  };

  const current = config[latency];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-full ${current.bg} border border-current/20`}
    >
      <Activity className={`w-4 h-4 ${current.color}`} />
      <span className={`text-sm font-medium ${current.color}`}>{current.label}</span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`w-2 h-2 rounded-full ${current.color.replace('text', 'bg')}`}
      />
    </motion.div>
  );
};

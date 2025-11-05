import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-full ${
        isConnected 
          ? "bg-green-500/20 border-green-500/20" 
          : "bg-red-500/20 border-red-500/20"
      } border`}
    >
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">Connected</span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-500">Disconnected</span>
        </>
      )}
    </motion.div>
  );
};

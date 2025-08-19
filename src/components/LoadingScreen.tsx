import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  isLoading: boolean;
  isTransitioning?: boolean;
}

const LoadingScreen = ({
  onLoadingComplete,
  isLoading,
  isTransitioning = false,
}: LoadingScreenProps) => {
  const [staticIntensity, setStaticIntensity] = useState(0);

    useEffect(() => {
    if (!isLoading) {
      // For transitions, complete immediately
      if (isTransitioning) {
        onLoadingComplete();
        return;
      }
 
      // For initial load, fade to static when loading is complete
      setStaticIntensity(1);

      // Call onLoadingComplete after static effect
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }
  }, [isLoading, isTransitioning, onLoadingComplete]);

  // Reset static intensity when loading starts
  useEffect(() => {
    if (isLoading) {
      setStaticIntensity(0);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isTransitioning ? 0.2 : 0.5 }}
          className={`fixed inset-0 z-50 backdrop-blur-sm ${
            isTransitioning ? "bg-charcoal/20" : "bg-charcoal/40"
          }`}
        >
          {/* Loading Spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className={`border-2 border-warm-white/10 rounded-full ${
                  isTransitioning ? "w-6 h-6" : "w-10 h-10"
                }`}
                animate={{ rotate: -360 }}
                transition={{
                  duration: isTransitioning ? 1.5 : 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Inner spinner */}
              <motion.div
                className={`absolute border-2 border-warm-white/30 border-t-warm-white/90 rounded-full ${
                  isTransitioning ? "inset-0.5 w-5 h-5" : "inset-1 w-8 h-8"
                }`}
                animate={{ rotate: 360 }}
                transition={{
                  duration: isTransitioning ? 0.5 : 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          {/* Static Overlay */}
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: staticIntensity }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
              animation: "grain 0.2s steps(10) infinite",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

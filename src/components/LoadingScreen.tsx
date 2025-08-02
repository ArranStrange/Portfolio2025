import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const name = "ARRAN OXLEY STRANGE";
  const loadingMessages = [
    "Prepping something useful...",
    "Waking the code...",
    "Brewing the pixels...",
  ];

  useEffect(() => {
    // Typewriter effect for name
    if (currentIndex < name.length) {
      const timer = setTimeout(() => {
        setCurrentText(name.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Show loading message after name is complete
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {/* Animated grain overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="grain-overlay" />
      </div>

      <div className="relative z-10 text-center">
        {/* Name with typewriter effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-8xl font-space font-light text-warm-white mb-8 tracking-wider"
        >
          {currentText}
          <span className="animate-pulse">|</span>
        </motion.h1>

        {/* Loading message */}
        <AnimatePresence>
          {showMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl text-warm-white/70 font-inter"
            >
              {loadingMessages[0]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Custom cursor (placeholder) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-6 border border-warm-white/30 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

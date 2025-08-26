import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    // Only trigger transition if path actually changed
    if (location.pathname !== previousPathRef.current) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Start transition
      setIsTransitioning(true);

      // After blur animation completes, update path and start unblur
      timeoutRef.current = setTimeout(() => {
        setCurrentPath(location.pathname);
        previousPathRef.current = location.pathname;
        setIsTransitioning(false);
      }, 400); // Slightly longer for smoother transition
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Page Content with Blur Transition */}
      <motion.div
        key={currentPath}
        initial={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        animate={{
          filter: isTransitioning ? "blur(15px)" : "blur(0px)",
          opacity: isTransitioning ? 0.3 : 1,
          scale: isTransitioning ? 1.02 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing curve
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Primary Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Glow Effect During Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Border Glow */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 50px rgba(255,255,255,0.05)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isLowPerformanceDevice, createIntersectionObserver, isInViewport } from '../utils/performance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  fallback?: React.ReactNode;
  enableLazyLoading?: boolean;
  enableReducedMotion?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  className = '',
  threshold = 0.1,
  fallback = null,
  enableLazyLoading = true,
  enableReducedMotion = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check if we should use reduced motion
  const useReducedMotion = enableReducedMotion && (
    isLowPerformanceDevice() || 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!enableLazyLoading) {
      setIsVisible(true);
      setIsLoaded(true);
      setShouldRender(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Create intersection observer
    observerRef.current = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Small delay to ensure smooth loading
            setTimeout(() => {
              setIsLoaded(true);
              setShouldRender(true);
            }, 100);
            
            // Disconnect observer once visible
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold }
    );

    observerRef.current.observe(container);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableLazyLoading, threshold]);

  // Check if element is already in viewport on mount
  useEffect(() => {
    if (!enableLazyLoading) return;

    const container = containerRef.current;
    if (container && isInViewport(container)) {
      setIsVisible(true);
      setTimeout(() => {
        setIsLoaded(true);
        setShouldRender(true);
      }, 100);
    }
  }, [enableLazyLoading]);

  return (
    <div ref={containerRef} className={className}>
      <AnimatePresence mode="wait">
        {!shouldRender && fallback && (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: useReducedMotion ? 0.2 : 0.3 }}
            className="w-full h-full"
          >
            {fallback}
          </motion.div>
        )}
        
        {shouldRender && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: useReducedMotion ? 0.3 : 0.5,
              ease: useReducedMotion ? "easeOut" : "easeInOut"
            }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerformanceOptimizer;

import React, { useEffect, useRef } from 'react';

interface AnimationInitializerProps {
  onAnimationsReady: () => void;
  children: React.ReactNode;
}

const AnimationInitializer: React.FC<AnimationInitializerProps> = ({
  onAnimationsReady,
  children,
}) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Initialize animations and ensure they're ready
    const initializeAnimations = () => {
      // Give animations time to initialize
      setTimeout(() => {
        // Check if key animation elements are ready
        const starField = document.querySelector('[data-animation="starfield"]');
        const vhsGrain = document.querySelector('[data-animation="vhs-grain"]');
        const dayNightCycle = document.querySelector('[data-animation="day-night"]');
        
        // If animations are present, give them extra time to initialize
        if (starField || vhsGrain || dayNightCycle) {
          setTimeout(() => {
            if (!initializedRef.current) {
              initializedRef.current = true;
              onAnimationsReady();
            }
          }, 1000);
        } else {
          // If no heavy animations, proceed immediately
          if (!initializedRef.current) {
            initializedRef.current = true;
            onAnimationsReady();
          }
        }
      }, 500);
    };

    initializeAnimations();

    return () => {
      initializedRef.current = true;
    };
  }, [onAnimationsReady]);

  return <>{children}</>;
};

export default AnimationInitializer;

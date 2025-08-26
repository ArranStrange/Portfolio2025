import { useState, useCallback } from 'react';

interface PageTransitionState {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

export const usePageTransition = (): PageTransitionState => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    isTransitioning,
    startTransition,
    endTransition,
  };
};

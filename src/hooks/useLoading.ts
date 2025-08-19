import { useState, useEffect } from "react";

export const useLoading = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Initial loading delay
    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500); // 1.5 seconds for static effect

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  const startTransition = () => {
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Shorter transition delay for smoother experience
  };

  const isLoading = isInitialLoading || isTransitioning;

  return {
    isLoading,
    isInitialLoading,
    isTransitioning,
    loadingComplete,
    handleLoadingComplete,
    startTransition,
    endTransition,
  };
};

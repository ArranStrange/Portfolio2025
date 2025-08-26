import { useState, useEffect } from "react";
import { createComprehensiveLoader } from "../utils/seo";

export const useLoading = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadEverything = async () => {
      try {
        // Only show loading screen on first visit
        if (hasLoadedOnce) {
          setIsInitialLoading(false);
          return;
        }

        // Load comprehensive resources (images, fonts, DOM, animations)
        await createComprehensiveLoader();

        if (isMounted) {
          // Mark as loaded and complete loading
          setHasLoadedOnce(true);
          setIsInitialLoading(false);
        }
      } catch (error) {
        console.error("Failed to load resources:", error);
        // Continue anyway if resources fail to load
        if (isMounted) {
          setHasLoadedOnce(true);
          setIsInitialLoading(false);
        }
      }
    };

    loadEverything();

    return () => {
      isMounted = false;
    };
  }, [hasLoadedOnce]);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  const isLoading = isInitialLoading;

  return {
    isLoading,
    loadingComplete,
    handleLoadingComplete,
  };
};

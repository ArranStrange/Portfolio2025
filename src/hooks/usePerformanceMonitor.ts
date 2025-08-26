import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

interface PerformanceMonitorReturn {
  metrics: PerformanceMetrics | null;
  isLowPerformance: boolean;
  suggestions: string[];
  optimizePerformance: () => void;
}

export const usePerformanceMonitor = (): PerformanceMonitorReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const measurePerformance = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    const layoutShiftEntries = performance.getEntriesByType('layout-shift');

    if (navigation) {
      const newMetrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        timeToInteractive: navigation.loadEventEnd - navigation.fetchStart,
      };

      // Get paint metrics
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          newMetrics.firstContentfulPaint = entry.startTime;
        }
      });

      // Get layout shift metrics
      layoutShiftEntries.forEach((entry: any) => {
        newMetrics.cumulativeLayoutShift += entry.value;
      });

      setMetrics(newMetrics);

      // Determine if performance is low
      const isLow = 
        newMetrics.loadTime > 3000 ||
        newMetrics.firstContentfulPaint > 2000 ||
        newMetrics.cumulativeLayoutShift > 0.1;

      setIsLowPerformance(isLow);

      // Generate suggestions
      const newSuggestions: string[] = [];
      
      if (newMetrics.loadTime > 3000) {
        newSuggestions.push('Consider optimizing image sizes and using WebP format');
      }
      
      if (newMetrics.firstContentfulPaint > 2000) {
        newSuggestions.push('Optimize critical rendering path and reduce blocking resources');
      }
      
      if (newMetrics.cumulativeLayoutShift > 0.1) {
        newSuggestions.push('Fix layout shifts by setting explicit dimensions for images and ads');
      }

      if (newMetrics.timeToInteractive > 5000) {
        newSuggestions.push('Reduce JavaScript bundle size and optimize code splitting');
      }

      setSuggestions(newSuggestions);
    }
  }, []);

  const optimizePerformance = useCallback(() => {
    // Implement performance optimizations
    if (typeof window !== 'undefined') {
      // Clear unused resources
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }

      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc();
      }

      // Reload performance metrics
      setTimeout(measurePerformance, 1000);
    }
  }, [measurePerformance]);

  useEffect(() => {
    // Measure performance after initial load
    const timer = setTimeout(measurePerformance, 1000);

    // Listen for performance events
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => prev ? {
            ...prev,
            largestContentfulPaint: entry.startTime
          } : null);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // PerformanceObserver not supported
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [measurePerformance]);

  return {
    metrics,
    isLowPerformance,
    suggestions,
    optimizePerformance,
  };
};

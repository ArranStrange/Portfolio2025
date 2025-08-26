// Performance optimization utilities
import React from "react";

export class PerformanceManager {
  private static instance: PerformanceManager;
  private frameRateLimit: number = 30; // Default 30 FPS
  private lastFrameTime: number = 0;

  private constructor() {}

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  setFrameRateLimit(fps: number): void {
    this.frameRateLimit = fps;
  }

  shouldSkipFrame(currentTime: number): boolean {
    const frameInterval = 1000 / this.frameRateLimit;
    if (currentTime - this.lastFrameTime < frameInterval) {
      return true;
    }
    this.lastFrameTime = currentTime;
    return false;
  }

  // Throttle function calls
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastExecTime = 0;

    return (...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Debounce function calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
}

// Utility functions for checking device capabilities
export const isLowPerformanceDevice = (): boolean => {
  // Check for mobile devices or devices with limited hardware
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check for low-end devices based on hardware concurrency
  const lowCPU =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  return Boolean(isMobile || prefersReducedMotion || lowCPU);
};

// Optimized requestAnimationFrame wrapper
export const optimizedRequestAnimationFrame = (
  callback: FrameRequestCallback
): number => {
  const performanceManager = PerformanceManager.getInstance();

  return requestAnimationFrame((time) => {
    if (!performanceManager.shouldSkipFrame(time)) {
      callback(time);
    } else {
      optimizedRequestAnimationFrame(callback);
    }
  });
};

// Memory management utilities
export const cleanupCanvas = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void => {
  canvas.width = width;
  canvas.height = height;
};

// Animation optimization helpers
export const createOptimizedAnimationLoop = (
  callback: (time: number) => void,
  fps: number = 30
): (() => void) => {
  const performanceManager = PerformanceManager.getInstance();
  performanceManager.setFrameRateLimit(fps);

  let animationId: number;
  let isRunning = false;

  const animate = (time: number) => {
    if (!isRunning) return;

    if (!performanceManager.shouldSkipFrame(time)) {
      callback(time);
    }

    animationId = optimizedRequestAnimationFrame(animate);
  };

  const stop = () => {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };

  return stop;
};

// Lazy loading utilities
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> => {
  return React.lazy(() => {
    return new Promise((resolve) => {
      // Add a small delay to ensure smooth loading
      setTimeout(() => {
        importFunc().then(resolve);
      }, 100);
    });
  });
};

// Intersection Observer for performance
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
  } else {
    fn();
  }
};

// Batch DOM updates
export const batchDOMUpdates = (updates: (() => void)[]): void => {
  if (typeof window !== "undefined" && window.requestAnimationFrame) {
    requestAnimationFrame(() => {
      updates.forEach((update) => update());
    });
  } else {
    updates.forEach((update) => update());
  }
};

// Optimize heavy computations
export const optimizeHeavyComputation = <T>(
  computation: () => T,
  deps: any[],
  delay: number = 100
): T | null => {
  const [result, setResult] = React.useState<T | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const computed = computation();
      setResult(computed);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, deps);

  return result;
};

// Preload images for better performance
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const imagePromises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(imagePromises);
};

// Optimize scroll events
export const createOptimizedScrollHandler = (
  handler: (event: Event) => void,
  throttleMs: number = 16
): ((event: Event) => void) => {
  const performanceManager = PerformanceManager.getInstance();
  return performanceManager.throttle(handler, throttleMs);
};

// Check if element is in viewport
export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

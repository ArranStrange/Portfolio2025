// Performance optimization utilities

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
    let timeoutId: NodeJS.Timeout | null = null;
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
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
}

// Utility functions for checking device capabilities
export const isLowPerformanceDevice = (): boolean => {
  // Check for mobile devices or devices with limited hardware
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for low-end devices based on hardware concurrency
  const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  return isMobile || prefersReducedMotion || lowCPU;
};

// Optimized requestAnimationFrame wrapper
export const optimizedRequestAnimationFrame = (callback: FrameRequestCallback): number => {
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
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number): void => {
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

  const start = () => {
    isRunning = true;
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

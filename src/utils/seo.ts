// SEO and Performance utilities

export const generateStructuredData = (type: string, data: any) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return {
    ...baseData,
    ...data,
  };
};

export const trackPageView = (page: string) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: page,
    });
  }

  // Plausible Analytics tracking
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { props: { page } });
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Plausible Analytics event tracking
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: parameters });
  }
};

// Performance monitoring
export const measurePageLoad = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      console.log('Page Load Performance:', {
        loadTime: `${loadTime}ms`,
        domContentLoaded: `${domContentLoaded}ms`,
        totalTime: `${navigation.loadEventEnd - navigation.fetchStart}ms`,
      });

      // Track performance metrics
      trackEvent('page_performance', {
        load_time: loadTime,
        dom_content_loaded: domContentLoaded,
        total_time: navigation.loadEventEnd - navigation.fetchStart,
      });
    }
  }
};

// Lazy loading utility
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/favicon.ico',
    // Add other critical resources here
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'fetch';
    document.head.appendChild(link);
  });
};

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

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
    // Favicon and manifest
    '/favicon.ico',
    '/site.webmanifest',
    
    // Critical images for initial render
    '/Mountain 1.png',
    '/Mountain 2.png', 
    '/Mountain 3.png',
    '/Mountain 4.png',
    '/Mountain 5.png',
    '/Mountain 6.png',
    '/Tree.png',
    
    // Wave images
    '/Waves/Wave 1.png',
    '/Waves/Wave 2.png',
    '/Waves/Wave 3.png',
    '/Waves/Wave 4.png',
    '/Waves/Wave 5.png',
    '/Waves/Wave 6.png',
    
    // Pebble images
    '/Pebbles/Pebble 1.png',
    '/Pebbles/Pebble 2.png',
    '/Pebbles/Pebble 3.png',
    '/Pebbles/Pebble 4.png',
    '/Pebbles/Pebble 5.png',
    '/Pebbles/Pebble 6.png',
    '/Pebbles/Pebble 7.png',
    '/Pebbles/Pebble 8.png',
    '/Pebbles/Pebble 9.png',
    '/Pebbles/Pebble 10.png',
    '/Pebbles/Pebble 11.png',
    '/Pebbles/Pebble 12.png',
    
    // Stick images
    '/Sticks/Layer 23.png',
    '/Sticks/Layer 24.png',
    '/Sticks/Layer 25.png',
    '/Sticks/Layer 26.png',
    '/Sticks/Layer 27.png',
    '/Sticks/Layer 28.png',
    
    // Icon images
    '/Icons/Black Book.png',
    '/Icons/Sticky Fingers.png',
    '/Icons/VISOR.png',
    '/Icons/Weather App.png',
    
    // Grain overlay
    '/grain overlay.png',
  ];

  // Preload critical resources
  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'image';
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });

  // Preload fonts
  const fontLinks = [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap', as: 'style' },
  ];

  fontLinks.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Resource loading promise
export const createResourceLoader = () => {
  const resources = [
    // Critical mountain images
    '/Mountain 1.png',
    '/Mountain 2.png',
    '/Mountain 3.png',
    '/Mountain 4.png',
    '/Mountain 5.png',
    '/Mountain 6.png',
    '/Tree.png',
    
    // Wave images
    '/Waves/Wave 1.png',
    '/Waves/Wave 2.png',
    '/Waves/Wave 3.png',
    '/Waves/Wave 4.png',
    '/Waves/Wave 5.png',
    '/Waves/Wave 6.png',
    
    // Pebble images
    '/Pebbles/Pebble 1.png',
    '/Pebbles/Pebble 2.png',
    '/Pebbles/Pebble 3.png',
    '/Pebbles/Pebble 4.png',
    '/Pebbles/Pebble 5.png',
    '/Pebbles/Pebble 6.png',
    '/Pebbles/Pebble 7.png',
    '/Pebbles/Pebble 8.png',
    '/Pebbles/Pebble 9.png',
    '/Pebbles/Pebble 10.png',
    '/Pebbles/Pebble 11.png',
    '/Pebbles/Pebble 12.png',
    
    // Stick images
    '/Sticks/Layer 23.png',
    '/Sticks/Layer 24.png',
    '/Sticks/Layer 25.png',
    '/Sticks/Layer 26.png',
    '/Sticks/Layer 27.png',
    '/Sticks/Layer 28.png',
    
    // Icon images
    '/Icons/Black Book.png',
    '/Icons/Sticky Fingers.png',
    '/Icons/VISOR.png',
    '/Icons/Weather App.png',
    
    // Grain overlay
    '/grain overlay.png',
  ];

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  return Promise.all(resources.map(loadImage));
};

// Comprehensive loading checker for entire site
export const createComprehensiveLoader = () => {
  return new Promise<void>((resolve) => {
    let resourcesLoaded = false;
    let fontsLoaded = false;
    let domReady = false;
    let animationsReady = false;
    let componentsReady = false;
    let siteContentReady = false;

    // Check if all resources are loaded
    const checkResources = async () => {
      try {
        await createResourceLoader();
        resourcesLoaded = true;
        checkAllReady();
      } catch (error) {
        console.warn('Some resources failed to load, continuing anyway:', error);
        resourcesLoaded = true;
        checkAllReady();
      }
    };

    // Check if fonts are loaded
    const checkFonts = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          fontsLoaded = true;
          checkAllReady();
        });
      } else {
        // Fallback for browsers without Font Loading API
        setTimeout(() => {
          fontsLoaded = true;
          checkAllReady();
        }, 1000);
      }
    };

    // Check if DOM is ready
    const checkDOM = () => {
      if (document.readyState === 'complete') {
        domReady = true;
        checkAllReady();
      } else {
        window.addEventListener('load', () => {
          domReady = true;
          checkAllReady();
        });
      }
    };

    // Check if animations are ready (give them time to initialize)
    const checkAnimations = () => {
      setTimeout(() => {
        animationsReady = true;
        checkAllReady();
      }, 1500); // Give animations time to initialize
    };

    // Check if components are ready
    const checkComponents = () => {
      // Wait for React to be fully mounted and components to be ready
      setTimeout(() => {
        // Check if key elements are in the DOM
        const root = document.getElementById('root');
        const isReactMounted = root && root.children.length > 0;
        
        if (isReactMounted) {
          componentsReady = true;
          checkAllReady();
        } else {
          // If not ready, check again
          setTimeout(() => {
            componentsReady = true;
            checkAllReady();
          }, 500);
        }
      }, 1000);
    };

    // Check if entire site content is ready
    const checkSiteContent = () => {
      // Preload all route components and ensure they're ready
      setTimeout(() => {
        // This ensures all pages and components are initialized
        siteContentReady = true;
        checkAllReady();
      }, 2000); // Give extra time for all site content to be ready
    };

    // Check if everything is ready
    const checkAllReady = () => {
      if (resourcesLoaded && fontsLoaded && domReady && animationsReady && componentsReady && siteContentReady) {
        // Additional delay to ensure smooth transition
        setTimeout(() => {
          resolve();
        }, 500);
      }
    };

    // Start all checks
    checkResources();
    checkFonts();
    checkDOM();
    checkAnimations();
    checkComponents();
    checkSiteContent();
  });
};

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

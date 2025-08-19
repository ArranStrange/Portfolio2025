import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { HelmetProvider } from "react-helmet-async";
import Hero from "./components/Hero";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import GitHubPage from "./pages/GitHubPage";
import ContactPage from "./pages/ContactPage";
import Navigation from "./components/Navigation";
import BlogPage from "./pages/BlogPage";
import ShootingStars from "./components/ShootingStars";
import StarField from "./components/StarField";
import VHSGrainOverlay from "./components/VHSGrainOverlay";
import DayNightCycle from "./components/DayNightCycle";
import LoadingScreen from "./components/LoadingScreen";
import Analytics from "./components/Analytics";
import { usePerformance } from "./hooks/usePerformance";
import { useLoading } from "./hooks/useLoading";

// Extend Window interface to include Lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// Component to handle scroll to top on route changes
function ScrollToTop({
  startTransition,
  endTransition,
}: {
  startTransition: () => void;
  endTransition: () => void;
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Start transition when route changes
    startTransition();

    // Small delay to ensure transition starts before scroll
    setTimeout(() => {
      // Scroll to top when pathname changes
      window.scrollTo(0, 0);

      // If Lenis is available, use it for smooth scrolling
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }

      // End transition after scroll
      endTransition();
    }, 100);
  }, [pathname, startTransition, endTransition]);

  return null;
}

function App() {
  const { settings, getComponentSettings } = usePerformance();
  const {
    isLoading,
    isTransitioning,
    loadingComplete,
    handleLoadingComplete,
    startTransition,
    endTransition,
  } = useLoading();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with optimized settings
    const lenis = new Lenis({
      duration: settings.reducedMotion ? 0.8 : 1.2, // Faster for reduced motion
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: settings.reducedMotion ? 0.6 : 0.8, // Less sensitive for reduced motion
    });

    // Make Lenis available globally for other components
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [settings.reducedMotion]);

  // Get component-specific settings
  const starFieldSettings = getComponentSettings("StarField");
  const vhsSettings = getComponentSettings("VHSGrainOverlay");
  const shootingStarsSettings = getComponentSettings("ShootingStars");
  const dayNightSettings = getComponentSettings("DayNightCycle");

  return (
    <>
      {/* StarField - Always visible */}
      <StarField starCount={starFieldSettings.starCount} />

      {/* VHS grain overlay - Always visible */}
      {vhsSettings.enabled && (
        <VHSGrainOverlay
          intensity={vhsSettings.intensity}
          speed={vhsSettings.speed}
        />
      )}

      {/* Loading Screen */}
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        isTransitioning={isTransitioning}
      />

      {/* Main App Content */}
      {loadingComplete && (
        <HelmetProvider>
          <Router>
            <div className="relative min-h-screen">
              <ScrollToTop
                startTransition={startTransition}
                endTransition={endTransition}
              />

              {/* Conditionally render day/night cycle */}
              {dayNightSettings.enabled && <DayNightCycle />}

              {/* Conditionally render shooting stars */}
              {shootingStarsSettings.enabled && <ShootingStars />}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingComplete ? 1 : 0 }}
                transition={{
                  duration: settings.reducedMotion ? 0.3 : 0.5,
                  ease: settings.reducedMotion ? "easeOut" : "easeInOut",
                  delay: loadingComplete ? 0.1 : 0, // Small delay to ensure loading is gone
                }}
                className="relative z-10"
              >
                <Navigation />
                <Analytics />
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/github" element={<GitHubPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </motion.div>
            </div>
          </Router>
        </HelmetProvider>
      )}
    </>
  );
}

export default App;

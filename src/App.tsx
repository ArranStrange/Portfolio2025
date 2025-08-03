import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Hero from "./components/Hero";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Navigation from "./components/Navigation";
import BlogPage from "./pages/BlogPage";
import ShootingStars from "./components/ShootingStars";
import StarField from "./components/StarField";
import VHSGrainOverlay from "./components/VHSGrainOverlay";
import DayNightCycle from "./components/DayNightCycle";

// Component to handle scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);

    // If Lenis is available, use it for smooth scrolling
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Make Lenis available globally for other components
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen">
        <ScrollToTop />
        <VHSGrainOverlay intensity={1} speed={0.8} />
        <DayNightCycle />
        <ShootingStars />
        <StarField starCount={750} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;

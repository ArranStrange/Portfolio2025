import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Now from "./components/Now";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(false);

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

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-charcoal">
      {/* Grain overlay for film texture */}
      {/* <div className="grain-overlay" /> */}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Hero />

            {/* <Projects />
            <Now />
            <About />
            <Contact /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

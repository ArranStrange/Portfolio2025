import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MountainParallax from "./MountainParallax";
import IntroText from "./IntroText";
import DayNightCycle from "./DayNightCycle";
import SEO from "./SEO";

const Hero = () => {
  const navigate = useNavigate();
  const [showIntroText, setShowIntroText] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  // Show continue button after a delay
  useEffect(() => {
    if (showIntroText) {
      setTimeout(() => setShowContinueButton(true), 3000);
    }
  }, [showIntroText]);

  const handleContinue = useCallback(() => {
    document.body.style.overflow = "";
    setShowIntroText(false);
    setShowContinueButton(false);
    // Navigate to projects page
    navigate("/projects");
  }, [navigate]);

  const handleMountainAnimationComplete = () => {
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowIntroText(true);
    }, 200);
  };

  return (
    <>
      <SEO 
        title="Home"
        description="Indie web developer with a background in design and hospitality, crafting original, beautiful applications. Currently designing VISOR — a platform for film sims and presets."
        keywords="full-stack developer, web designer, React, TypeScript, Cardiff, UK, VISOR, film sims, web applications"
        type="website"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
      {/* Mountain Parallax Section */}
      <section className="h-screen relative">
        <MountainParallax
          onAnimationComplete={handleMountainAnimationComplete}
        />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.button
            onClick={() => {
              const introSection = document.querySelector(
                "#intro-text-section"
              );
              if (introSection) {
                introSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.5, // Delay to let mountain animation settle
              ease: "easeOut" 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center space-y-4 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }} // Reduced movement for smoother animation
              transition={{
                duration: 3, // Slower for smoother motion
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-warm-white/80 font-satoshi font-bold uppercase tracking-wider text-lg group-hover:text-warm-white transition-colors"
            >
              ARRAN MILLER-STRANGE
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} // Reduced movement for smoother animation
              transition={{
                duration: 3, // Slower for smoother motion
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="w-px h-12 bg-warm-white/40 mx-auto group-hover:bg-warm-white/60 transition-colors"
            />
          </motion.button>
        </div>
      </section>

      {/* Day/Night Cycle */}
      <DayNightCycle />

      {/* Intro text section */}
      <section id="intro-text-section" className="h-screen relative">
        <AnimatePresence>
          {showIntroText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }} // Reduced offset for smoother animation
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94] // Smoother easing curve
              }}
              className="w-full h-full"
            >
              <IntroText
                showContinueButton={showContinueButton}
                onContinue={handleContinue}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
    </>
  );
};

export default Hero;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MountainParallax from "./MountainParallax";
import IntroText from "./IntroText";
import DayNightCycle from "./DayNightCycle";

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
    setShowIntroText(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center space-y-4 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-warm-white/80 font-satoshi font-bold uppercase tracking-wider text-lg group-hover:text-warm-white transition-colors"
            >
              Scroll
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
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
      <section
        id="intro-text-section"
        className="h-screen relative flex items-center justify-center"
      >
        <AnimatePresence>
          {showIntroText && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto px-6"
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
  );
};

export default Hero;

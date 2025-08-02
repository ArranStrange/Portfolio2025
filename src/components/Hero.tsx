import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MountainParallax from "./MountainParallax";
import IntroText from "./IntroText";

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

  return (
    <>
      {/* Section 1: Dark screen with scroll prompt */}
      <section className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-warm-white/80 font-satoshi uppercase tracking-wider text-lg"
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
            className="w-px h-12 bg-warm-white/40 mx-auto"
          />
        </motion.div>
      </section>

      {/* Section 2: Mountain animation area */}
      <MountainParallax onAnimationComplete={() => setShowIntroText(true)} />

      {/* Intro text appears below mountains */}
      <AnimatePresence>
        {showIntroText && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="min-h-[100vh] flex items-center justify-center py-8"
          >
            <IntroText
              showContinueButton={showContinueButton}
              onContinue={handleContinue}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroTextProps {
  showContinueButton: boolean;
  onContinue: () => void;
}

const IntroText: React.FC<IntroTextProps> = ({
  showContinueButton,
  onContinue,
}) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  // Check if scroll to begin section is out of view
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show indicator when we're past the first section (scroll to begin)
      setShowScrollIndicator(scrollY > windowHeight);
    };

    window.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // Check initial position

    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const sections = useMemo(
    () => [
      {
        label: "NAME /00-1",
        content: "ARRAN MILLER-STRANGE\nINDIE WEB DEVELOPER FROM WALES",
      },
      {
        label: "ABOUT /00-2",
        content:
          "A MULTI-DISCIPLINARY CREATIVE\nFOCUSED ON CRAFTING ORIGINAL,\nBEAUTIFUL WEB APPLICATIONS.",
      },
      {
        label: "APPROACH /00-3",
        content:
          "BUILDING PRODUCTS THAT BLEND\nDESIGN, CODE, AND STORYTELLING.",
      },
      {
        label: "CURRENT /00-4",
        content:
          "CURRENTLY DESIGNING VISOR —\nA PLATFORM FOR FILM SIMS + PRESETS.",
      },
    ],
    []
  );

  return (
    <div
      id="intro-text-container"
      className="w-full min-h-screen flex flex-col justify-center pointer-events-auto py-20"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        {/* Scroll indicator - top right */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute top-8 right-6 text-warm-white/60 font-space uppercase tracking-wider text-xs z-20"
            >
              Hover to highlight
            </motion.div>
          )}
        </AnimatePresence>

        {/* All sections displayed at once */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredSection(index)}
              onMouseLeave={() => setHoveredSection(null)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Left column - Labels */}
              <motion.div
                animate={{
                  opacity: hoveredSection === index ? 1 : 0.6,
                  color: hoveredSection === index ? "#f8f8f2" : "#6b7280",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-space uppercase tracking-wide text-sm"
              >
                {section.label}
              </motion.div>

              {/* Right column - Content */}
              <motion.div
                animate={{
                  opacity: hoveredSection === index ? 1 : 0.6,
                  color: hoveredSection === index ? "#f8f8f2" : "#6b7280",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-space uppercase tracking-wide text-lg leading-relaxed"
              >
                {section.content.split("\n").map((line, lineIndex) => (
                  <div key={lineIndex} className={lineIndex > 0 ? "ml-8" : ""}>
                    {line}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button at the very bottom */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mt-20 text-center"
            >
              <button
                onClick={onContinue}
                className="text-center text-warm-white/80 font-space uppercase tracking-wider text-sm hover:text-warm-white transition-colors duration-300"
              >
                Continue →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntroText;

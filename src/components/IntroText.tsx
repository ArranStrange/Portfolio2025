import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface IntroTextProps {
  showContinueButton: boolean;
  onContinue: () => void;
}

const IntroText: React.FC<IntroTextProps> = ({
  showContinueButton,
  onContinue,
}) => {
  const navigate = useNavigate();
  const [focusedSection, setFocusedSection] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Random fade animation system
  useEffect(() => {
    const interval = setInterval(() => {
      // Only change focus if not hovering
      if (!isHovering) {
        const randomIndex = Math.floor(Math.random() * 4);
        setFocusedSection(randomIndex);
      }
    }, 3000); // Change focus every 3 seconds

    return () => clearInterval(interval);
  }, [isHovering]);

  const handleMouseEnter = (index: number) => {
    setHoveredSection(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
    setIsHovering(false);
  };

  const handleSectionClick = (index: number) => {
    switch (index) {
      case 0: // CURRENTLY
        window.open("https://visor-c51a1.web.app/", "_blank");
        break;
      case 1: // ABOUT
        navigate("/about");
        break;
      case 2: // COLLABS
        window.open("mailto:arranstrange@googlemail.com", "_blank");
        break;
      case 3: // PROJECTS
        navigate("/projects");
        break;
    }
  };

  const sections = useMemo(
    () => [
      {
        label: "CURRENTLY",
        number: "/00-1",
        content:
          "DESIGNING VISOR — A PLATFORM FOR FILM SIMS + PRESETS — AND OPEN TO NEW CREATIVE PROJECTS.",
      },
      {
        label: "ABOUT",
        number: "/00-2",
        content:
          "AN INDIE WEB DEVELOPER WITH A BACKGROUND IN DESIGN + HOSPITALITY, FOCUSED ON CRAFTING ORIGINAL, BEAUTIFUL APPLICATIONS.",
      },
      {
        label: "COLLABS",
        number: "/00-3",
        content:
          "OPEN TO COLLABORATING WITH CREATIVES + CHATting ABOUT FUTURE EMPLOYMENT OPPORTUNITIES.",
      },
      {
        label: "PROJECTS",
        number: "/00-4",
        content:
          "EXPLORING IDEAS THAT BLEND DESIGN, TECHNOLOGY + STORYTELLING INTO ORIGINAL, EXPRESSIVE WEB EXPERIENCES.",
      },
    ],
    []
  );

  return (
    <div
      id="intro-text-container"
      className="w-full h-screen flex flex-col justify-between pointer-events-auto"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        {/* All sections displayed at once */}
        <div className="space-y-8 md:space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleSectionClick(index)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start cursor-pointer"
            >
              {/* Left column - Labels */}
              <motion.div
                animate={{
                  opacity: isHovering
                    ? hoveredSection === index
                      ? 1
                      : 0.2
                    : focusedSection === index
                    ? 1
                    : 0.2,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-satoshi uppercase tracking-wide text-xs md:text-base"
              >
                <span className="text-warm-white">{section.label}</span>
                <span className="text-warm-white/60 ml-2">
                  {section.number}
                </span>
              </motion.div>

              {/* Right column - Content */}
              <motion.div
                animate={{
                  opacity: isHovering
                    ? hoveredSection === index
                      ? 1
                      : 0.2
                    : focusedSection === index
                    ? 1
                    : 0.2,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-space uppercase tracking-wide text-base md:text-2xl leading-relaxed text-warm-white"
              >
                {section.content}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Button at the very bottom */}
      <AnimatePresence>
        {showContinueButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mx-auto px-6 md:px-12 pb-8 text-center"
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
  );
};

export default IntroText;

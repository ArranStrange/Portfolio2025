import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import MountainParallax from "./MountainParallax";

// IntroText component for the editorial sections
const IntroText = ({
  currentSection,
  onSectionChange,
  showContinueButton,
  onContinue,
}: {
  currentSection: number;
  onSectionChange: (section: number) => void;
  showContinueButton: boolean;
  onContinue: () => void;
}) => {
  const sections = useMemo(
    () => [
      ["ARRAN MILLER-STRANGE", "INDIE WEB DEVELOPER"],
      [
        "A MULTI-DISCIPLINARY CREATIVE",
        "FOCUSED ON CRAFTING ORIGINAL,",
        "BEAUTIFUL WEB APPLICATIONS.",
      ],
      [
        "EXPERIENCED IN FRONTEND + BACKEND",
        "WITH A LOVE FOR DETAIL, FEELING + FLOW.",
      ],
      ["BUILDING PRODUCTS THAT BLEND", "DESIGN, CODE, AND STORYTELLING."],
      ["CURRENTLY DESIGNING VISOR —", "A PLATFORM FOR FILM SIMS + PRESETS."],
      ["OPEN TO COLLABORATIONS,", "PASSION PROJECTS + IDEAS WITH HEART."],
    ],
    []
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(
        0,
        Math.min(sections.length - 1, currentSection + direction)
      );
      if (newSection !== currentSection) {
        onSectionChange(newSection);
      }
    },
    [currentSection, sections.length, onSectionChange]
  );

  const handleTouch = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const startY = touch.clientY;

      const handleTouchEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;
        const threshold = 50;

        if (Math.abs(deltaY) > threshold) {
          const direction = deltaY > 0 ? 1 : -1;
          const newSection = Math.max(
            0,
            Math.min(sections.length - 1, currentSection + direction)
          );
          if (newSection !== currentSection) {
            onSectionChange(newSection);
          }
        }
      };

      document.addEventListener("touchend", handleTouchEnd, { once: true });
    },
    [currentSection, sections.length, onSectionChange]
  );

  useEffect(() => {
    const container = document.getElementById("intro-text-container");
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouch, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouch);
    };
  }, [handleWheel, handleTouch]);

  return (
    <div
      id="intro-text-container"
      className="fixed inset-0 flex items-center justify-end pointer-events-auto z-50"
    >
      <div className="max-w-[90vw] md:max-w-[45ch] pr-6 md:pr-24 space-y-8">
        <AnimatePresence mode="wait">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index === currentSection ? 1 : 0.25,
                y: index === currentSection ? 0 : 20,
                color: index === currentSection ? "#f8f8f2" : "#6b7280",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-right"
            >
              {section.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className="font-space uppercase tracking-wide text-[1.1rem] leading-relaxed mb-2"
                >
                  {line}
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Continue Button */}
        <AnimatePresence>
          {showContinueButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              onClick={onContinue}
              className="text-right text-warm-white/80 font-space uppercase tracking-wider text-sm hover:text-warm-white transition-colors duration-300"
            >
              Continue →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Hero = () => {
  const [showIntroText, setShowIntroText] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);

  // Debounced section change
  const [lastSectionChange, setLastSectionChange] = useState(0);
  const debouncedSectionChange = useCallback(
    (section: number) => {
      const now = Date.now();
      if (now - lastSectionChange > 400) {
        setCurrentSection(section);
        setLastSectionChange(now);

        // Show continue button when user reaches the last section
        if (section === 5) {
          setTimeout(() => setShowContinueButton(true), 1000);
        } else {
          setShowContinueButton(false);
        }
      }
    },
    [lastSectionChange]
  );

  const handleContinue = useCallback(() => {
    document.body.style.overflow = "";
    setShowIntroText(false);
    setShowContinueButton(false);
    setCurrentSection(0);
    // Scroll to the next section
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Section 1: Black screen with scroll prompt */}
      <section className="h-screen bg-black flex items-center justify-center">
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
            className="text-warm-white/80 font-space uppercase tracking-wider text-lg"
          >
            Scroll to begin
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
      <MountainParallax />

      {/* Section 3: Black screen with intro text */}
      <section className="h-screen bg-black relative">
        <AnimatePresence>
          {showIntroText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="h-full flex items-center justify-center"
            >
              <IntroText
                currentSection={currentSection}
                onSectionChange={debouncedSectionChange}
                showContinueButton={showContinueButton}
                onContinue={handleContinue}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Hero;

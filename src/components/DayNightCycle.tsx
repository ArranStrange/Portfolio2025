import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DayNightCycle: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Very subtle rotation over the entire scroll range
  const sunRotation = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Wider circular motion parameters - sun moves in a larger circle around the screen
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.6; // Increased from 0.4 to 0.6 for wider path
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Background opacity changes - lightest when sun is at top
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.05, 0.15, 0.05, 0]
  );

  // Wider circular sun movement with more keyframes for smoother circular path
  const sunX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [
      centerX, // Bottom
      centerX + radius * 0.5, // Bottom-right
      centerX + radius * 0.866, // Bottom-right diagonal
      centerX + radius, // Right
      centerX + radius * 0.866, // Top-right diagonal
      centerX, // Top
      centerX - radius * 0.866, // Top-left diagonal
      centerX - radius, // Left
      centerX - radius * 0.866, // Bottom-left diagonal
      centerX - radius * 0.5, // Bottom-left
      centerX, // Back to bottom
    ]
  );

  // Sun Y position - starts below screen and rises to top with wider circular path
  const sunY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [
      centerY + radius + 100, // Below screen (off-screen)
      centerY + radius * 0.866, // Bottom-right
      centerY + radius * 0.5, // Bottom-right diagonal
      centerY, // Right
      centerY - radius * 0.5, // Top-right diagonal
      centerY - radius, // Top
      centerY - radius * 0.5, // Top-left diagonal
      centerY, // Left
      centerY + radius * 0.5, // Bottom-left diagonal
      centerY + radius * 0.866, // Bottom-left
      centerY + radius + 100, // Back below screen (off-screen)
    ]
  );

  // Sun opacity - brightest when at the top
  const sunOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.6, 0.7, 0.9, 0.7, 0.6]
  );

  return (
    <>
      {/* Background overlay that changes opacity */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          opacity: backgroundOpacity,
        }}
      />

      {/* Sun Icon */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          x: sunX,
          y: sunY,
          rotate: sunRotation,
          opacity: sunOpacity,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dw6klz9kg/image/upload/v1754218200/Sun_yktvyc.png"
          alt="Sun"
          className="w-12 h-12 md:w-16 md:h-16 blur-sm"
          animate={{
            scale: [1, 1.02, 1], // Very subtle scale animation
            opacity: [0.8, 0.85, 0.8], // Very subtle opacity animation
          }}
          transition={{
            duration: 8, // Much longer duration for slower animation
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Stars that fade in/out very subtly */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.3]),
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </motion.div>
    </>
  );
};

export default DayNightCycle;

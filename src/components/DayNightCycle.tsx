import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DayNightCycle: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Simplified transforms with fewer keyframes for better performance
  const sunRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const moonRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Optimized elliptical motion parameters
  const radiusY = Math.min(window.innerWidth, window.innerHeight) * 0.35; // Reduced from 0.4
  const radiusX = window.innerWidth * 0.7; // Reduced from 0.8
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Simplified background opacity with fewer keyframes
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.3, 0.6, 0.3, 0]
  );

  // Simplified sun position with fewer keyframes
  const sunX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [centerX + radiusX, centerX, centerX - radiusX, centerX, centerX + radiusX]
  );

  const sunY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [centerY, centerY - radiusY, centerY, centerY + radiusY, centerY]
  );

  // Simplified moon position (opposite to sun)
  const moonX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [centerX - radiusX, centerX, centerX + radiusX, centerX, centerX - radiusX]
  );

  const moonY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [centerY, centerY + radiusY, centerY, centerY - radiusY, centerY]
  );

  return (
    <>
      {/* Background overlay that changes opacity */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
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
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dw6klz9kg/image/upload/v1754218200/Sun_yktvyc.png"
          alt="Sun"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 blur-sm"
          animate={{
            scale: [1, 1.05, 1], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity animation
          }}
          transition={{
            duration: 4, // Increased duration for smoother animation
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          x: moonX,
          y: moonY,
          rotate: moonRotation,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dw6klz9kg/image/upload/v1754218193/Moon_y75qfa.png"
          alt="Moon"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 blur-sm"
          animate={{
            scale: [1, 1.05, 1], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity animation
          }}
          transition={{
            duration: 5, // Increased duration for smoother animation
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Stars that fade in/out based on day/night */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]),
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </motion.div>
    </>
  );
};

export default DayNightCycle;

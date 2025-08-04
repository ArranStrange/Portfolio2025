import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DayNightCycle: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to rotation and position
  const sunRotation = useTransform(scrollYProgress, [0, 1], [0, 180]); // Slower rotation
  const moonRotation = useTransform(scrollYProgress, [0, 1], [0, 180]); // Slower rotation

  // Elliptical motion parameters - wider horizontally for more x-axis spacing
  const radiusY = Math.min(window.innerWidth, window.innerHeight) * 0.4; // 40% of smaller screen dimension for Y (reduced to stay visible)
  const radiusX = window.innerWidth * 0.8; // 80% of screen width for X (much wider)
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Background opacity based on sun position in top half of screen
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    [0, 0, 0.2, 0.4, 0.6, 0.4, 0.2, 0, 0] // Brightest when sun is at top (0.5)
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
          x: useTransform(
            scrollYProgress,
            [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            [
              centerX + radiusX, // Right
              centerX + radiusX * 0.7, // Right-Top
              centerX, // Top
              centerX - radiusX * 0.7, // Left-Top
              centerX - radiusX, // Left
              centerX - radiusX * 0.7, // Left-Bottom
              centerX, // Bottom
              centerX + radiusX * 0.7, // Right-Bottom
              centerX + radiusX, // Right (back to start)
            ]
          ),
          y: useTransform(
            scrollYProgress,
            [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            [
              centerY, // Right
              centerY - radiusY * 0.7, // Right-Top
              centerY - radiusY, // Top
              centerY - radiusY * 0.7, // Left-Top
              centerY, // Left
              centerY + radiusY * 0.7, // Left-Bottom
              centerY + radiusY, // Bottom
              centerY + radiusY * 0.7, // Right-Bottom
              centerY, // Right (back to start)
            ]
          ),
          rotate: sunRotation,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dw6klz9kg/image/upload/v1754218200/Sun_yktvyc.png"
          alt="Sun"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          x: useTransform(
            scrollYProgress,
            [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            [
              centerX - radiusX, // Left (opposite to sun)
              centerX - radiusX * 0.7, // Left-Bottom (opposite to sun)
              centerX, // Bottom (opposite to sun)
              centerX + radiusX * 0.7, // Right-Bottom (opposite to sun)
              centerX + radiusX, // Right (opposite to sun)
              centerX + radiusX * 0.7, // Right-Top (opposite to sun)
              centerX, // Top (opposite to sun)
              centerX - radiusX * 0.7, // Left-Top (opposite to sun)
              centerX - radiusX, // Left (back to start)
            ]
          ),
          y: useTransform(
            scrollYProgress,
            [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            [
              centerY, // Left
              centerY + radiusY * 0.7, // Left-Bottom
              centerY + radiusY, // Bottom
              centerY + radiusY * 0.7, // Right-Bottom
              centerY, // Right
              centerY - radiusY * 0.7, // Right-Top
              centerY - radiusY, // Top
              centerY - radiusY * 0.7, // Left-Top
              centerY, // Left (back to start)
            ]
          ),
          rotate: moonRotation,
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dw6klz9kg/image/upload/v1754218193/Moon_y75qfa.png"
          alt="Moon"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
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

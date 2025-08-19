import React from "react";
import { motion } from "framer-motion";

interface VHSGrainOverlayProps {
  intensity?: number; // 0-1, controls grain opacity
  speed?: number; // Animation speed multiplier
  className?: string;
}

const VHSGrainOverlay: React.FC<VHSGrainOverlayProps> = ({
  intensity = 0.15,
  speed = 1,
  className = "",
}) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "200px 200px, 150px 150px, 100px 100px",
        opacity: intensity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
      animate={{
        backgroundPosition: [
          "0px 0px, 0px 0px, 0px 0px",
          "200px 200px, 150px 150px, 100px 100px",
        ],
      }}
      transition={{
        duration: 12 / speed, // Increased duration for smoother animation
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Simplified noise layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.05) 3px,
              rgba(255,255,255,0.05) 6px
            )
          `,
          mixBlendMode: "soft-light",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "6px 6px"],
        }}
        transition={{
          duration: 20 / speed, // Increased duration for smoother animation
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Simplified color noise */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,200,150,0.01) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(150,200,255,0.01) 1px, transparent 1px)
          `,
          backgroundSize: "300px 300px, 250px 250px",
          mixBlendMode: "color",
        }}
        animate={{
          backgroundPosition: [
            "0px 0px, 0px 0px",
            "300px 300px, 250px 250px",
          ],
        }}
        transition={{
          duration: 25 / speed, // Increased duration for smoother animation
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default VHSGrainOverlay;

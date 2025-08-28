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
      data-animation="vhs-grain"
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize:
          "clamp(150px, 15vw, 200px) clamp(150px, 15vw, 200px), clamp(100px, 12vw, 150px) clamp(100px, 12vw, 150px)",
        opacity: intensity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
      animate={{
        backgroundPosition: [
          "0px 0px, 0px 0px",
          "clamp(150px, 15vw, 200px) clamp(150px, 15vw, 200px), clamp(100px, 12vw, 150px) clamp(100px, 12vw, 150px)",
        ],
      }}
      transition={{
        duration: 15 / speed, // Increased duration for smoother animation
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
              transparent clamp(3px, 0.3vw, 4px),
              rgba(255,255,255,0.03) clamp(3px, 0.3vw, 4px),
              rgba(255,255,255,0.03) clamp(6px, 0.6vw, 8px)
            )
          `,
          mixBlendMode: "soft-light",
        }}
        animate={{
          backgroundPosition: [
            "0px 0px",
            "clamp(6px, 0.6vw, 8px) clamp(6px, 0.6vw, 8px)",
          ],
        }}
        transition={{
          duration: 25 / speed, // Increased duration for smoother animation
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Simplified color noise */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,200,150,0.008) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(150,200,255,0.008) 1px, transparent 1px)
          `,
          backgroundSize:
            "clamp(200px, 20vw, 300px) clamp(200px, 20vw, 300px), clamp(150px, 18vw, 250px) clamp(150px, 18vw, 250px)",
          mixBlendMode: "color",
        }}
        animate={{
          backgroundPosition: ["0px 0px, 0px 0px", "clamp(200px, 20vw, 300px) clamp(200px, 20vw, 300px), clamp(150px, 18vw, 250px) clamp(150px, 18vw, 250px)"],
        }}
        transition={{
          duration: 30 / speed, // Increased duration for smoother animation
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default VHSGrainOverlay;

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
      // Temporary debug - uncomment to see if overlay is positioned correctly
      // style={{ border: '2px solid red' }}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.25) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px),
          radial-gradient(circle at 10% 90%, rgba(255,255,255,0.35) 1px, transparent 1px),
          radial-gradient(circle at 90% 10%, rgba(255,255,255,0.28) 1px, transparent 1px)
        `,
        backgroundSize:
          "200px 200px, 150px 150px, 100px 100px, 250px 250px, 180px 180px",
        opacity: intensity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
      animate={{
        backgroundPosition: [
          "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px",
          "200px 200px, 150px 150px, 100px 100px, 250px 250px, 180px 180px",
        ],
      }}
      transition={{
        duration: 8 / speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Additional noise layer for more authentic VHS look */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.08) 2px,
              rgba(255,255,255,0.08) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.06) 2px,
              rgba(255,255,255,0.06) 4px
            )
          `,
          mixBlendMode: "soft-light",
        }}
        animate={{
          backgroundPosition: ["0px 0px, 0px 0px", "4px 4px, 4px 4px"],
        }}
        transition={{
          duration: 12 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle color noise for VHS warmth */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,200,150,0.02) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(150,200,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(255,150,200,0.01) 1px, transparent 1px)
          `,
          backgroundSize: "300px 300px, 250px 250px, 350px 350px",
          mixBlendMode: "color",
        }}
        animate={{
          backgroundPosition: [
            "0px 0px, 0px 0px, 0px 0px",
            "300px 300px, 250px 250px, 350px 350px",
          ],
        }}
        transition={{
          duration: 15 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default VHSGrainOverlay;

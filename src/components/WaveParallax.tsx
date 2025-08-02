import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WaveLayer {
  image: string;
  zIndex: number;
  finalOffset: number;
  animationSpeed: number;
  amplitude: number;
}

interface WaveParallaxProps {
  onAnimationComplete?: () => void;
}

const WaveParallax: React.FC<WaveParallaxProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Wave layer configurations
  const waveLayers: WaveLayer[] = [
    {
      image: "/Waves/Wave 6.png", // Background wave
      zIndex: 1,
      finalOffset: 0,
      animationSpeed: 4,
      amplitude: 8,
    },
    {
      image: "/Waves/Wave 5.png",
      zIndex: 2,
      finalOffset: 50,
      animationSpeed: 3.5,
      amplitude: 10,
    },
    {
      image: "/Waves/Wave 4.png",
      zIndex: 3,
      finalOffset: 100,
      animationSpeed: 3,
      amplitude: 12,
    },
    {
      image: "/Waves/Wave 3.png",
      zIndex: 4,
      finalOffset: 150,
      animationSpeed: 2.5,
      amplitude: 14,
    },
    {
      image: "/Waves/Wave 2.png",
      zIndex: 5,
      finalOffset: 200,
      animationSpeed: 2,
      amplitude: 16,
    },
    {
      image: "/Waves/Wave 1.png",
      zIndex: 6,
      finalOffset: 250,
      animationSpeed: 1.5,
      amplitude: 18,
    },
  ];

  // Check if container is in view
  const isInView = useInView(containerRef, {
    margin: "-50px 0px 0px 0px",
    once: false,
    amount: 0.1,
  });

  return (
    <section
      ref={containerRef}
      id="wave-section"
      className="h-screen relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: "100vh",
        width: "100vw",
        background: "transparent",
      }}
    >
      {/* Wave Layers */}
      {waveLayers.map((layer, index) => {
        // All waves are animated (including background Wave 6)
        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: layer.zIndex,
            }}
            initial={{ y: 800, opacity: 1 }}
            animate={
              isInView
                ? {
                    y: layer.finalOffset,
                    opacity: 1,
                  }
                : { y: 800, opacity: 1 }
            }
            transition={{
              duration: 0.8 + index * 0.4,
              delay: index * 0.4,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              // Trigger callback when the last wave (Wave 1) completes initial animation
              if (index === 5) {
                onAnimationComplete?.();
              }
            }}
          >
            <motion.img
              src={layer.image}
              alt={`Wave layer ${index + 1}`}
              className="object-cover object-top"
              style={{
                width: "350px",
                height: "75vh",
                objectFit: "cover",
                objectPosition: "top",
              }}
              animate={
                isInView
                  ? {
                      y: [0, -layer.amplitude, 0, layer.amplitude, 0],
                    }
                  : { y: 0 }
              }
              transition={{
                y: {
                  duration: layer.animationSpeed,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1.0], // Custom cubic-bezier for smoother motion
                },
              }}
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default WaveParallax;

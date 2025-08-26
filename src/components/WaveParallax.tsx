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

  // Wave layer configurations with optimized settings
  const waveLayers: WaveLayer[] = [
    {
      image: "/Waves/Wave 6.png", // Background wave
      zIndex: 1,
      finalOffset: 0,
      animationSpeed: 6, // Slower for smoother motion
      amplitude: 6, // Reduced amplitude
    },
    {
      image: "/Waves/Wave 5.png",
      zIndex: 2,
      finalOffset: 50,
      animationSpeed: 5.5,
      amplitude: 8,
    },
    {
      image: "/Waves/Wave 4.png",
      zIndex: 3,
      finalOffset: 100,
      animationSpeed: 5,
      amplitude: 10,
    },
    {
      image: "/Waves/Wave 3.png",
      zIndex: 4,
      finalOffset: 150,
      animationSpeed: 4.5,
      amplitude: 12,
    },
    {
      image: "/Waves/Wave 2.png",
      zIndex: 5,
      finalOffset: 200,
      animationSpeed: 4,
      amplitude: 14,
    },
    {
      image: "/Waves/Wave 1.png",
      zIndex: 6,
      finalOffset: 250,
      animationSpeed: 3.5,
      amplitude: 16,
    },
  ];

  // Check if container is in view with optimized settings
  const isInView = useInView(containerRef, {
    margin: "-100px 0px 0px 0px", // Increased margin for earlier trigger
    once: true, // Only trigger once for better performance
    amount: 0.3, // Trigger when 30% visible for smoother start
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
        // Optimized animation settings
        const animationDuration = 1.2 + index * 0.3; // Reduced duration spread
        const animationDelay = index * 0.2; // Reduced delay spread
        
        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: layer.zIndex,
            }}
            initial={{ y: 500, opacity: 0.7 }} // Reduced initial offset
            animate={
              isInView
                ? {
                    y: layer.finalOffset,
                    opacity: 1,
                  }
                : { y: 500, opacity: 0.7 }
            }
            transition={{
              duration: animationDuration,
              delay: animationDelay,
              ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing curve
              opacity: {
                duration: animationDuration * 0.8,
                delay: animationDelay,
                ease: "easeOut",
              },
            }}
            onAnimationComplete={() => {
              // Trigger callback when the last wave completes initial animation
              if (index === waveLayers.length - 1) {
                setTimeout(() => {
                  onAnimationComplete?.();
                }, 300); // Small delay to ensure smooth completion
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
                      y: [0, -layer.amplitude * 0.5, 0, layer.amplitude * 0.5, 0], // Reduced amplitude for smoother motion
                    }
                  : { y: 0 }
              }
              transition={{
                y: {
                  duration: layer.animationSpeed,
                  repeat: Infinity,
                  ease: "easeInOut", // Simpler easing for smoother continuous motion
                  repeatDelay: 0, // No delay between repeats
                },
              }}
              loading="eager" // Ensure images load immediately
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default WaveParallax;

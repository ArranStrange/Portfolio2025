import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MountainLayer {
  image: string;
  zIndex: number;
  finalOffset: number;
  width?: string;
}

interface MountainParallaxProps {
  onAnimationComplete?: () => void;
}

const MountainParallax: React.FC<MountainParallaxProps> = ({
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mountain layer configurations
  const mountainLayers: MountainLayer[] = [
    {
      image: "/Mountain 6.png", // Static background
      zIndex: 1,
      finalOffset: 0,
    },
    {
      image: "/Mountain 5.png",
      zIndex: 2,
      finalOffset: 50,
    },
    {
      image: "/Mountain 3.png",
      zIndex: 3,
      finalOffset: 85,
    },
    {
      image: "/Mountain 4.png",
      zIndex: 4,
      finalOffset: 150,
    },
    {
      image: "/Mountain 2.png",
      zIndex: 5,
      finalOffset: 230,
    },
    {
      image: "/Mountain 1.png",
      zIndex: 6,
      finalOffset: 340,
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
      id="mountain-section"
      className="h-screen relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: "100vh",
        width: "100vw",
        background: "transparent",
      }}
    >
      {/* Mountain Layers */}
      {mountainLayers.map((layer, index) => {
        // Optimized animation settings
        const animationDuration = 1.5 + index * 0.2; // Reduced duration spread
        const animationDelay = index * 0.15; // Reduced delay spread
        
        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: layer.zIndex,
            }}
            initial={{ y: 400, opacity: 0.6 }} // Reduced initial offset
            animate={
              isInView
                ? {
                    y: layer.finalOffset,
                    opacity: 1,
                  }
                : { y: 400, opacity: 0.6 }
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
              // Trigger callback when the last mountain completes
              if (index === mountainLayers.length - 1) {
                setTimeout(() => {
                  onAnimationComplete?.();
                }, 200); // Small delay to ensure smooth completion
              }
            }}
          >
            <img
              src={layer.image}
              alt={`Mountain layer ${index + 1}`}
              className="object-cover object-top"
              style={{
                width: layer.width || "350px",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "top",
                marginTop: "300px",
              }}
              loading="eager" // Ensure images load immediately
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default MountainParallax;

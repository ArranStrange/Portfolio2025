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
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164221/home/portfolio/mountains/Mountain_6.png", // Static background
      zIndex: 1,
      finalOffset: 0,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164219/home/portfolio/mountains/Mountain_5.png",
      zIndex: 2,
      finalOffset: 50,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164217/home/portfolio/mountains/Mountain_3.png",
      zIndex: 3,
      finalOffset: 85,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164218/home/portfolio/mountains/Mountain_4.png",
      zIndex: 4,
      finalOffset: 150,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164215/home/portfolio/mountains/Mountain_2.png",
      zIndex: 5,
      finalOffset: 230,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1755591233/Mountain_1_irdjrg.png",
      zIndex: 6,
      finalOffset: 340,
    },
  ];

  // Check if container is in view
  const isInView = useInView(containerRef, {
    margin: "-50px 0px 0px 0px", // Trigger when top is 50px into viewport
    once: false,
    amount: 0.1, // Trigger when 10% of the element is visible
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
        // Background mountain (Mountain 6) - now animated
        if (index === 0) {
          return (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                zIndex: layer.zIndex,
              }}
              initial={{ y: 600, opacity: 1 }}
              animate={
                isInView
                  ? {
                      y: layer.finalOffset,
                      opacity: 1,
                    }
                  : { y: 600, opacity: 0.8 }
              }
              transition={{
                duration: 1.2 + index * 0.3,
                delay: index * 0.2,
                ease: [0.4, 0.0, 0.2, 1.0],
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
              />
            </motion.div>
          );
        }

        // Animated mountains (Mountain 5-1)
        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: layer.zIndex,
            }}
            initial={{ y: 600, opacity: 0.8 }}
            animate={
              isInView
                ? {
                    y: layer.finalOffset,
                    opacity: 1,
                  }
                : { y: 600, opacity: 0.8 }
            }
            transition={{
              duration: 1.2 + index * 0.3,
              delay: index * 0.2,
              ease: [0.4, 0.0, 0.2, 1.0],
            }}
            onAnimationComplete={() => {
              // Trigger callback when the last mountain (Mountain 1) completes
              if (index === 5) {
                onAnimationComplete?.();
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
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default MountainParallax;

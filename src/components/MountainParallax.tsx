import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MountainLayer {
  image: string;
  zIndex: number;
  finalOffset: number;
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
      finalOffset: 100,
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
      finalOffset: 200,
    },
    {
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754164214/home/portfolio/mountains/Mountain_1.png",
      zIndex: 6,
      finalOffset: 250,
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
      className="h-screen relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Mountain Layers */}
      {mountainLayers.map((layer, index) => {
        // Static mountain (Mountain 6)
        if (index === 0) {
          return (
            <div
              key={index}
              className="absolute bottom-0 left-0 w-full h-screen pointer-events-none"
              style={{
                zIndex: layer.zIndex,
                width: "100vw",
                height: "100vh",
              }}
            >
              <img
                src={layer.image}
                alt={`Mountain layer ${index + 1}`}
                className="w-full h-full object-cover object-bottom"
                style={{
                  width: "350px",
                  height: "100vh",
                  objectFit: "cover",
                  objectPosition: "top",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          );
        }

        // Animated mountains (Mountain 5-1)
        return (
          <motion.div
            key={index}
            className="absolute bottom-0 left-0 w-full h-screen pointer-events-none"
            style={{
              zIndex: layer.zIndex,
              width: "100vw",
              height: "100vh",
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
              // Trigger callback when the last mountain (Mountain 1) completes
              if (index === 5) {
                onAnimationComplete?.();
              }
            }}
          >
            <img
              src={layer.image}
              alt={`Mountain layer ${index + 1}`}
              className="w-full h-full object-cover object-bottom"
              style={{
                width: "350px",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "top",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </motion.div>
        );
      })}
    </section>
  );
};

export default MountainParallax;

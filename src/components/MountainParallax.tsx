import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MountainLayer {
  image: string;
  zIndex: number;
  finalOffset: number;
}

const MountainParallax: React.FC = () => {
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
      image: "/Mountain 4.png",
      zIndex: 3,
      finalOffset: 100,
    },
    {
      image: "/Mountain 3.png",
      zIndex: 4,
      finalOffset: 150,
    },
    {
      image: "/Mountain 2.png",
      zIndex: 5,
      finalOffset: 200,
    },
    {
      image: "/Mountain 1.png",
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
      className="h-screen relative w-full bg-black overflow-hidden"
      style={{ backgroundColor: "black", height: "100vh" }}
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
              duration: 1.5 + index * 0.8,
              delay: index * 0.8,
              ease: "easeOut",
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

      {/* Gradient fade-out overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </section>
  );
};

export default MountainParallax;

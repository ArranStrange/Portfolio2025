import React, { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";
import StarField from "./StarField";
import { motion } from "framer-motion";

interface Pebble {
  id: number;
  image: string;
  size: number;
  body: Matter.Body;
  element: HTMLImageElement;
}

interface PebblesPhysicsProps {
  onAnimationComplete?: () => void;
}

const PebblesPhysics: React.FC<PebblesPhysicsProps> = ({
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mouseRef = useRef<Matter.Mouse | null>(null);

  const [pebbles, setPebbles] = useState<Pebble[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasTriggeredRef = useRef(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  // Pebble configurations
  const pebbleImages = [
    "/Pebbles/Pebble 1.png",
    "/Pebbles/Pebble 2.png",
    "/Pebbles/Pebble 3.png",
    "/Pebbles/Pebble 4.png",
    "/Pebbles/Pebble 5.png",
    "/Pebbles/Pebble 6.png",
    "/Pebbles/Pebble 7.png",
    "/Pebbles/Pebble 8.png",
    "/Pebbles/Pebble 9.png",
    "/Pebbles/Pebble 10.png",
    "/Pebbles/Pebble 11.png",
    "/Pebbles/Pebble 12.png",
  ];

  // Preload images
  const preloadImages = useCallback(() => {
    const imagePromises = pebbleImages.map((src) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded((prev) => prev + 1);
          resolve(img);
        };
        img.src = src;
      });
    });

    setTotalImages(pebbleImages.length);
    return Promise.all(imagePromises);
  }, [pebbleImages]);

  const createPebble = useCallback(
    (
      x: number,
      y: number,
      size: number,
      image: string,
      element: HTMLImageElement
    ): Pebble => {
      const body = Matter.Bodies.circle(x, y, size, {
        restitution: 0.3,
        friction: 0.8,
        density: 0.003,
        render: {
          fillStyle: "transparent",
        },
      });

      return {
        id: Math.random(),
        image,
        size,
        body,
        element,
      };
    },
    []
  );

  const initializePhysics = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Check if mobile
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create engine with heavier gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.004 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: rect.width,
        height: rect.height,
        wireframes: false,
        background: "transparent",
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
      },
    });
    renderRef.current = render;

    // Create ground at the very bottom of the component
    const ground = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height,
      rect.width,
      10,
      {
        isStatic: true,
        render: { fillStyle: "transparent" },
        restitution: 0.2,
      }
    );

    // Create side walls to keep pebbles on screen
    const leftWall = Matter.Bodies.rectangle(
      -5,
      rect.height / 2,
      10,
      rect.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    const rightWall = Matter.Bodies.rectangle(
      rect.width + 5,
      rect.height / 2,
      10,
      rect.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Create bottom wall to catch any pebbles that fall through
    const bottomWall = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height,
      rect.width,
      10,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Add all bodies to world
    Matter.World.add(engine.world, [ground, leftWall, rightWall, bottomWall]);

    // Create mouse constraint for dragging
    const mouse = Matter.Mouse.create(render.canvas);
    mouseRef.current = mouse;

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraintRef.current = mouseConstraint;

    Matter.World.add(engine.world, mouseConstraint);

    // Start renderer and runner
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    setIsInitialized(true);
  }, []);

  const addPebbles = useCallback(async () => {
    if (!engineRef.current || !containerRef.current) return;

    // Preload all images first
    const loadedImages = await preloadImages();

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newPebbles: Pebble[] = [];

    // Determine pebble count based on screen size
    const totalPebbles = isMobile ? 15 : 40;

    // Create pebbles spread across the full width at the top
    const pebblesPerRow = isMobile ? 5 : 8; // More pebbles per row for better spread
    const spacing = rect.width / (pebblesPerRow + 1); // Even spacing across width

    for (let i = 0; i < totalPebbles; i++) {
      const row = Math.floor(i / pebblesPerRow);
      const col = i % pebblesPerRow;

      const x = spacing + col * spacing; // Spread across full width
      const y = 50 + row * 30; // Slight vertical offset for each row
      const size = isMobile ? 20 + Math.random() * 10 : 25 + Math.random() * 15;
      const imageIndex = Math.floor(Math.random() * pebbleImages.length);

      const pebble = createPebble(
        x,
        y,
        size,
        pebbleImages[imageIndex],
        loadedImages[imageIndex]
      );
      newPebbles.push(pebble);
      Matter.World.add(engineRef.current.world, pebble.body);
    }

    setPebbles(newPebbles);
  }, [createPebble, pebbleImages, preloadImages, isMobile]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Apply subtle force to nearby pebbles
      if (engineRef.current && pebbles.length > 0) {
        const mouseRadius = 80; // Radius of effect

        pebbles.forEach((pebble) => {
          const pebblePos = pebble.body.position;
          const distance = Math.sqrt(
            Math.pow(pebblePos.x - x, 2) + Math.pow(pebblePos.y - y, 2)
          );

          if (distance < mouseRadius) {
            const force = ((mouseRadius - distance) / mouseRadius) * 0.0005;
            const angle = Math.atan2(pebblePos.y - y, pebblePos.x - x);

            Matter.Body.applyForce(pebble.body, pebblePos, {
              x: Math.cos(angle) * force,
              y: Math.sin(angle) * force,
            });
          }
        });
      }
    },
    [pebbles]
  );

  const handleMouseLeave = useCallback(() => {
    // Mouse left the component
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Manual trigger not needed since auto-trigger is working
  }, []);

  const handleScroll = useCallback(() => {
    // Manual trigger not needed since auto-trigger is working
  }, []);

  const handleTouchStart = useCallback(() => {
    // Manual trigger not needed since auto-trigger is working
  }, []);

  const handleProjectsClick = useCallback(() => {
    // Scroll to the next section (Projects component)
    const nextSection = document.querySelector('section[ref="sectionRef"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: scroll down by one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  const drawPebbles = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each pebble
    pebbles.forEach((pebble) => {
      const position = pebble.body.position;
      const angle = pebble.body.angle;

      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(angle);

      // Draw the pebble image
      ctx.drawImage(
        pebble.element,
        -pebble.size,
        -pebble.size,
        pebble.size * 2,
        pebble.size * 2
      );

      ctx.restore();
    });
  }, [pebbles]);

  const resetPebbles = useCallback(() => {
    if (!engineRef.current) return;

    setIsResetting(true);
    setHasTriggered(false);
    hasTriggeredRef.current = false;

    // Remove all pebbles from the world
    pebbles.forEach((pebble) => {
      Matter.World.remove(engineRef.current!.world, pebble.body);
    });

    setPebbles([]);

    // Add new pebbles after a short delay
    setTimeout(() => {
      addPebbles();
      // Auto-trigger the fall after adding pebbles
      setTimeout(() => {
        if (
          engineRef.current &&
          pebbles.length > 0 &&
          !hasTriggeredRef.current
        ) {
          hasTriggeredRef.current = true;
          setHasTriggered(true);

          // Add some random velocity to each pebble to make them fall naturally
          pebbles.forEach((pebble) => {
            const randomX = (Math.random() - 0.5) * 2;
            const randomY = Math.random() * 1;

            Matter.Body.setVelocity(pebble.body, {
              x: randomX,
              y: randomY,
            });
          });
        }
      }, 500);
      setIsResetting(false);
    }, 500);
  }, [pebbles, addPebbles]);

  // Animation loop for drawing
  useEffect(() => {
    if (!isInitialized || pebbles.length === 0) return;

    const animate = () => {
      drawPebbles();
      requestAnimationFrame(animate);
    };

    animate();
  }, [isInitialized, pebbles, drawPebbles]);

  // Initialize physics on mount
  useEffect(() => {
    initializePhysics();

    return () => {
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
    };
  }, [initializePhysics]);

  // Add pebbles and trigger fall after initialization and image loading
  useEffect(() => {
    if (isInitialized && imagesLoaded === totalImages && totalImages > 0) {
      setTimeout(() => {
        addPebbles();
        onAnimationComplete?.();

        // Trigger fall after pebbles are added
        setTimeout(() => {
          if (
            engineRef.current &&
            pebbles.length > 0 &&
            !hasTriggeredRef.current
          ) {
            hasTriggeredRef.current = true;
            setHasTriggered(true);

            // Add some random velocity to each pebble to make them fall naturally
            pebbles.forEach((pebble) => {
              const randomX = (Math.random() - 0.5) * 2;
              const randomY = Math.random() * 1;

              Matter.Body.setVelocity(pebble.body, {
                x: randomX,
                y: randomY,
              });
            });
          }
        }, 1000);
      }, 300);
    }
  }, [
    isInitialized,
    imagesLoaded,
    totalImages,
    addPebbles,
    onAnimationComplete,
  ]);

  // Remove the interval for checking bounds since we have walls
  useEffect(() => {
    // No longer needed
  }, []);

  // Add scroll and touch listeners for better mobile support
  useEffect(() => {
    if (!isInitialized || hasTriggered) return;

    const handleScrollEvent = () => {
      handleScroll();
    };

    const handleTouchEvent = () => {
      handleTouchStart();
    };

    // Add both scroll and touch listeners for better mobile support
    window.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("touchstart", handleTouchEvent, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      window.removeEventListener("touchstart", handleTouchEvent);
    };
  }, [isInitialized, hasTriggered, handleScroll, handleTouchStart]);

  // Auto-click reset button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resetButtonRef.current) {
        resetButtonRef.current.click();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current || !renderRef.current)
        return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const canvas = canvasRef.current;

      // Update mobile state
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      canvas.width = rect.width;
      canvas.height = rect.height;

      renderRef.current.canvas.width = rect.width;
      renderRef.current.canvas.height = rect.height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* StarField background */}
      <StarField starCount={150} />

      {/* Canvas for physics simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Reset button */}
      <button
        ref={resetButtonRef}
        onClick={resetPebbles}
        disabled={isResetting}
        className="absolute top-8 right-8 z-10 text-warm-white/40 font-inter text-sm hover:text-warm-white/60 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isResetting ? "resetting..." : "reset"}
      </button>

      {/* Projects scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center space-y-4 cursor-pointer"
        onClick={handleProjectsClick}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-warm-white/80 font-space uppercase tracking-wider text-lg"
        >
          Projects
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="w-px h-12 bg-warm-white/40 mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default PebblesPhysics;

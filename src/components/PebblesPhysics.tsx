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
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [pebbles, setPebbles] = useState<Pebble[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Reduced pebble configurations for better performance
  const pebbleImages = [
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162596/home/portfolio/pebbles/Pebble_1.png",
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162599/home/portfolio/pebbles/Pebble_2.png",
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162600/home/portfolio/pebbles/Pebble_3.png",
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162601/home/portfolio/pebbles/Pebble_4.png",
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162601/home/portfolio/pebbles/Pebble_5.png",
    "https://res.cloudinary.com/dw6klz9kg/image/upload/v1754162602/home/portfolio/pebbles/Pebble_6.png",
  ];

  // Preload images
  const preloadImages = useCallback(() => {
    return Promise.all(
      pebbleImages.map((src) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = src;
        });
      })
    );
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
        restitution: 0.4,
        friction: 0.7,
        density: 0.002,
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

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Create engine with optimized settings
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
      enableSleeping: true,
    });
    engineRef.current = engine;

    // Create invisible boundaries - use actual screen dimensions
    const ground = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height - 10,
      rect.width,
      20,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    const leftWall = Matter.Bodies.rectangle(
      -10,
      rect.height / 2,
      20,
      rect.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    const rightWall = Matter.Bodies.rectangle(
      rect.width + 10,
      rect.height / 2,
      20,
      rect.height,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Add boundaries to world
    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    // Create mouse constraint for dragging pebbles
    const mouse = Matter.Mouse.create(canvas);
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

    // Start runner only (no renderer since we're using custom canvas)
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    setIsInitialized(true);
  }, []);

  const startPebbleDrop = useCallback(async () => {
    if (!engineRef.current || !containerRef.current || hasStarted) return;

    setHasStarted(true);
    const loadedImages = await preloadImages();

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newPebbles: Pebble[] = [];

    // Reduced pebble count for better performance
    const totalPebbles = isMobile ? 6 : 12;
    const pebblesPerRow = isMobile ? 3 : 4;
    const spacing = rect.width / (pebblesPerRow + 1);

    // Create pebbles
    for (let i = 0; i < totalPebbles; i++) {
      const row = Math.floor(i / pebblesPerRow);
      const col = i % pebblesPerRow;

      const x = spacing + col * spacing;
      const y = -50 - row * 40;
      const size = isMobile ? 35 + Math.random() * 15 : 30 + Math.random() * 15;
      const imageIndex = Math.floor(Math.random() * pebbleImages.length);

      const pebble = createPebble(
        x,
        y,
        size,
        pebbleImages[imageIndex],
        loadedImages[imageIndex]
      );
      newPebbles.push(pebble);
    }

    setPebbles(newPebbles);

    // Add pebbles to world with staggered timing
    const dropDuration = 1500;
    const dropInterval = dropDuration / totalPebbles;

    newPebbles.forEach((pebble, index) => {
      setTimeout(() => {
        if (pebble.body && engineRef.current) {
          Matter.World.add(engineRef.current.world, pebble.body);

          // Gentle initial velocity
          const randomX = (Math.random() - 0.5) * 0.2;
          const randomY = Math.random() * 0.1;

          Matter.Body.setVelocity(pebble.body, {
            x: randomX,
            y: randomY,
          });
        }
      }, index * dropInterval);
    });

    onAnimationComplete?.();
  }, [
    createPebble,
    pebbleImages,
    preloadImages,
    isMobile,
    hasStarted,
    onAnimationComplete,
  ]);

  const resetPebbles = useCallback(() => {
    if (!engineRef.current) return;

    setIsResetting(true);
    setHasStarted(false);

    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Remove all pebbles from the world
    pebbles.forEach((pebble) => {
      Matter.World.remove(engineRef.current!.world, pebble.body);
    });

    setPebbles([]);

    // Restart after a short delay
    setTimeout(() => {
      startPebbleDrop();
      setIsResetting(false);
    }, 300);
  }, [pebbles, startPebbleDrop]);

  const handleProjectsClick = useCallback(() => {
    const projectsSection = document.querySelector('[data-section="projects"]');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  const drawPebbles = useCallback(() => {
    if (!canvasRef.current || pebbles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with proper dimensions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each pebble
    pebbles.forEach((pebble) => {
      if (!pebble.body || !pebble.element) return;

      const position = pebble.body.position;
      const angle = pebble.body.angle;

      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(angle);

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

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

  // Mouse interaction handlers
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !mouseConstraintRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Update mouse position in Matter.js
      mouseConstraintRef.current.mouse.position.x = mouseX;
      mouseConstraintRef.current.mouse.position.y = mouseY;

      // Find pebble at mouse position
      const clickedPebble = pebbles.find((pebble) => {
        const distance = Math.sqrt(
          Math.pow(pebble.body.position.x - mouseX, 2) +
            Math.pow(pebble.body.position.y - mouseY, 2)
        );
        return distance <= pebble.size;
      });

      if (clickedPebble) {
        // Set the constraint to this pebble
        mouseConstraintRef.current.body = clickedPebble.body;
      }
    },
    [pebbles]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!mouseConstraintRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Update mouse position in Matter.js
      mouseConstraintRef.current.mouse.position.x = mouseX;
      mouseConstraintRef.current.mouse.position.y = mouseY;
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    // Let Matter.js handle the constraint release naturally
  }, []);

  // Optimized animation loop
  useEffect(() => {
    if (!isInitialized || pebbles.length === 0) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (time: number) => {
      if (time - lastTime >= frameInterval) {
        lastTime = time;
        drawPebbles();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isInitialized, pebbles, drawPebbles]);

  // Initialize physics on mount
  useEffect(() => {
    initializePhysics();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
    };
  }, [initializePhysics]);

  // Start pebble drop after initialization
  useEffect(() => {
    if (isInitialized && !hasStarted) {
      const timer = setTimeout(() => {
        startPebbleDrop();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInitialized, hasStarted, startPebbleDrop]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const canvas = canvasRef.current;

      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Update canvas size with device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Reset pebbles when screen size changes
      if (hasStarted) {
        resetPebbles();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasStarted, resetPebbles]);

  return (
    <section
      ref={containerRef}
      className="h-screen relative w-full overflow-hidden flex items-center justify-center"
    >
      {/* StarField background with reduced star count */}
      <StarField starCount={100} />

      {/* Canvas for physics simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{ zIndex: 1 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Reset button */}
      <button
        onClick={resetPebbles}
        disabled={isResetting}
        className="absolute top-4 right-4 z-20 text-warm-white/40 font-satoshi text-sm hover:text-warm-white/60 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isResetting ? "resetting..." : "reset"}
      </button>

      {/* Projects scroll indicator - properly centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative z-10 text-center space-y-4 cursor-pointer"
        onClick={handleProjectsClick}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-warm-white/80 font-satoshi uppercase tracking-wider text-lg md:text-xl"
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

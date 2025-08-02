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
  const [isMobile, setIsMobile] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

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
        friction: 0.6,
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

    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Create engine with lighter gravity for smoother movement
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.003 },
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

    // Create invisible boundaries
    const ground = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height - 5,
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

  const startPebbleDrop = useCallback(async () => {
    if (!engineRef.current || !containerRef.current || hasStarted) return;

    setHasStarted(true);
    const loadedImages = await preloadImages();

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newPebbles: Pebble[] = [];

    // Responsive pebble count
    const totalPebbles = isMobile ? 12 : 24;
    const pebblesPerRow = isMobile ? 4 : 6;
    const spacing = rect.width / (pebblesPerRow + 1);

    // Create pebbles
    for (let i = 0; i < totalPebbles; i++) {
      const row = Math.floor(i / pebblesPerRow);
      const col = i % pebblesPerRow;

      const x = spacing + col * spacing;
      const y = -50 - row * 40; // Start above the screen
      const size = isMobile ? 25 + Math.random() * 12 : 22 + Math.random() * 12;
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

    // Staggered drop over 2.5 seconds
    const dropDuration = 2500;
    const dropInterval = dropDuration / totalPebbles;

    newPebbles.forEach((pebble, index) => {
      setTimeout(() => {
        if (pebble.body && engineRef.current) {
          Matter.World.add(engineRef.current.world, pebble.body);

          // Add slight random velocity
          const randomX = (Math.random() - 0.5) * 0.5;
          const randomY = Math.random() * 0.3;

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
      if (!containerRef.current || !canvasRef.current || !renderRef.current)
        return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const canvas = canvasRef.current;

      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      canvas.width = rect.width;
      canvas.height = rect.height;

      renderRef.current.canvas.width = rect.width;
      renderRef.current.canvas.height = rect.height;

      // Reset pebbles when screen size changes for responsive layout
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
        onClick={resetPebbles}
        disabled={isResetting}
        className="absolute top-4 right-4 z-20 text-warm-white/40 font-inter text-sm hover:text-warm-white/60 transition-colors disabled:opacity-50 cursor-pointer"
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
          className="text-warm-white/80 font-space uppercase tracking-wider text-lg md:text-xl"
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

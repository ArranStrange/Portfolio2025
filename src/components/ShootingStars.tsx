import React, { useEffect, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create shooting stars with optimized parameters
    const createStar = (): Star => {
      const x = Math.random() * canvas.width;
      const y = -20;
      const vx = (Math.random() - 0.5) * 0.3; // Reduced horizontal movement
      const vy = Math.random() * 1.5 + 0.5; // Reduced speed range

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        vx,
        vy,
        size: Math.random() * 0.3 + 0.1, // Reduced size range
        opacity: 1,
        trail: [],
      };
    };

    // Initialize stars with reduced count
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 3; i++) { // Reduced from 6 to 3 stars
        setTimeout(() => {
          starsRef.current.push(createStar());
        }, i * 3000); // Increased delay between stars
      }
    };

    // Update star trail with simplified logic
    const updateTrail = (star: Star) => {
      star.trail.push({ x: star.x, y: star.y, opacity: star.opacity });

      // Keep only last 8 trail points (reduced for performance)
      if (star.trail.length > 8) {
        star.trail.shift();
      }

      // Simplified trail fade
      for (let i = 0; i < star.trail.length; i++) {
        star.trail[i].opacity = Math.max(0, star.trail[i].opacity - 0.12);
      }
    };

    // Draw star with simplified trail
    const drawStar = (star: Star) => {
      if (!ctx) return;

      // Draw trail with reduced effects
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Simplified trail drawing
      for (let i = 0; i < star.trail.length; i++) {
        const point = star.trail[i];
        const alpha = point.opacity * (i / star.trail.length);
        if (alpha > 0.02) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.1})`; // Reduced opacity
          ctx.shadowColor = "rgba(255, 255, 255, 0.2)"; // Reduced shadow
          ctx.shadowBlur = 2; // Reduced blur

          ctx.beginPath();
          ctx.arc(point.x, point.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw main star with simplified effects
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.4})`; // Reduced opacity
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)"; // Reduced shadow
      ctx.shadowBlur = 3; // Reduced blur

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Optimized animation loop with frame rate limiting
    const animate = () => {
      if (!ctx || !canvas) return;

      // Limit frame rate to 30 FPS for better performance
      const time = performance.now();
      if (time - lastTimeRef.current < 33) { // 33ms = ~30 FPS
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star, index) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Update trail
        updateTrail(star);

        // Draw star
        drawStar(star);

        // Remove stars that are off screen
        if (star.y > canvas.height + 20) {
          starsRef.current.splice(index, 1);

          // Create new star after a longer delay
          setTimeout(() => {
            starsRef.current.push(createStar());
          }, Math.random() * 4000 + 1000); // Increased delay range
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    initStars();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ShootingStars;

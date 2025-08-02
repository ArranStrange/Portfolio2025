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

    // Create shooting stars
    const createStar = (): Star => {
      const x = Math.random() * canvas.width;
      const y = -20;
      const vx = (Math.random() - 0.5) * 0.5; // Very slight horizontal movement
      const vy = Math.random() * 2 + 0.3; // Downward speed between 0.3-2.3 (some much faster)

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        vx,
        vy,
        size: Math.random() * 0.4 + 0.1, // Size between 0.1-0.5
        opacity: 1,
        trail: [],
      };
    };

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          starsRef.current.push(createStar());
        }, i * 2000); // Stagger star creation
      }
    };

    // Update star trail
    const updateTrail = (star: Star) => {
      star.trail.push({ x: star.x, y: star.y, opacity: star.opacity });

      // Keep only last 15 trail points (reduced for performance)
      if (star.trail.length > 15) {
        star.trail.shift();
      }

      // Fade trail points more efficiently
      for (let i = 0; i < star.trail.length; i++) {
        star.trail[i].opacity = Math.max(0, star.trail[i].opacity - 0.08);
      }
    };

    // Draw star with trail
    const drawStar = (star: Star) => {
      if (!ctx) return;

      // Draw trail
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Draw trail more efficiently
      for (let i = 0; i < star.trail.length; i++) {
        const point = star.trail[i];
        const alpha = point.opacity * (i / star.trail.length);
        if (alpha > 0.01) {
          // Skip very transparent points
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.shadowBlur = 3;

          ctx.beginPath();
          ctx.arc(point.x, point.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw main star
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`;
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle glow effect
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.2})`;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas completely transparent
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

        // Remove stars that are off screen (only check bottom since they only fall down)
        if (star.y > canvas.height + 20) {
          starsRef.current.splice(index, 1);

          // Create new star after a delay (reduced delay for better performance)
          setTimeout(() => {
            starsRef.current.push(createStar());
          }, Math.random() * 2000 + 500); // Random delay between 0.5-2.5 seconds
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

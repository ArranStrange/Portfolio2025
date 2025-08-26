import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({
  starCount = 200,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate stars with optimized parameters
    const generateStars = (): Star[] => {
      const stars: Star[] = [];
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.4 + 0.1, // Reduced max size
          opacity: Math.random() * 0.08 + 0.02, // Reduced opacity range
          twinkleSpeed: Math.random() * 0.008 + 0.003, // Reduced speed
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      return stars;
    };

    starsRef.current = generateStars();

    // Optimized animation loop with frame rate limiting
    const animate = (time: number) => {
      frameCountRef.current++;
      
      // Limit frame rate to 30 FPS for better performance
      if (time - lastTimeRef.current < 33) { // 33ms = ~30 FPS
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = time;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch draw stars for better performance
      ctx.save();
      ctx.fillStyle = "#ffffff";

      // Draw stars with simplified effects
      starsRef.current.forEach((star) => {
        // Simplified twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.03 + 0.97;
        const currentOpacity = star.opacity * twinkle;

        // Only draw if opacity is above threshold for performance
        if (currentOpacity > 0.01) {
          ctx.globalAlpha = currentOpacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a small delay to ensure smooth start
    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    // Small delay to ensure canvas is ready
    setTimeout(startAnimation, 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      data-animation="starfield"
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default StarField;

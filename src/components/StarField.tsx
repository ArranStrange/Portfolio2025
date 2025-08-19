import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  brightenSpeed: number;
  brightenPhase: number;
  brightenIntensity: number;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate stars with optimized parameters
    const generateStars = (): Star[] => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.5 + 0.1, // Reduced max size
          opacity: Math.random() * 0.1 + 0.02, // Reduced opacity range
          twinkleSpeed: Math.random() * 0.01 + 0.005, // Reduced speed
          twinklePhase: Math.random() * Math.PI * 2,
          brightenSpeed: Math.random() * 0.0005 + 0.0002, // Reduced speed
          brightenPhase: Math.random() * Math.PI * 2,
          brightenIntensity: Math.random() * 0.2 + 0.05, // Reduced intensity
        });
      }
      return stars;
    };

    starsRef.current = generateStars();

    // Optimized animation loop with frame rate limiting
    const animate = (time: number) => {
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

      // Draw stars with reduced complexity
      starsRef.current.forEach((star) => {
        // Simplified twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.05 + 0.95;

        // Simplified brightening effect
        const brighten = Math.sin(time * star.brightenSpeed + star.brightenPhase) * 0.3 + 0.7;
        const brightenEffect = brighten * star.brightenIntensity;

        // Combine effects
        const currentOpacity = star.opacity * twinkle + brightenEffect;

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

    animationRef.current = requestAnimationFrame(animate);

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
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default StarField;

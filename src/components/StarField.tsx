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

    // Generate stars
    const generateStars = (): Star[] => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.7,
          opacity: Math.random() * 0.15 + 0.01,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          brightenSpeed: Math.random() * 0.001 + 0.0005,
          brightenPhase: Math.random() * Math.PI * 2,
          brightenIntensity: Math.random() * 0.3 + 0.1,
        });
      }
      return stars;
    };

    starsRef.current = generateStars();

    // Animation loop
    const animate = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        // Calculate twinkling effect
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.1 + 0.9;

        // Calculate occasional brightening effect
        const brighten =
          Math.sin(time * star.brightenSpeed + star.brightenPhase) * 0.5 + 0.5;
        const brightenEffect = Math.pow(brighten, 3) * star.brightenIntensity; // Cubic curve for more dramatic peaks

        // Combine effects
        const currentOpacity = star.opacity * twinkle + brightenEffect;

        // Only draw if opacity is above threshold for performance
        if (currentOpacity > 0.02) {
          ctx.save();
          ctx.globalAlpha = currentOpacity;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

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

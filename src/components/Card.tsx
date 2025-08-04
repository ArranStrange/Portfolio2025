import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "subtle" | "none";
  className?: string;
  animate?: boolean;
  initial?: any;
  animateProps?: any;
  transition?: any;
}

const Card = ({
  children,
  size = "md",
  variant = "default",
  className = "",
  animate = false,
  initial,
  animateProps,
  transition,
}: CardProps) => {
  const baseClasses = "backdrop-blur-sm rounded-lg";

  const sizeClasses = {
    sm: "p-4 md:p-6",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-10 lg:p-12",
  };

  const variantClasses = {
    default: "border-4 border-warm-white/30",
    accent: "border-4 border-rustic-gold/40",
    subtle: "border-4 border-warm-white/20",
    none: "",
  };

  const cardClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={cardClasses}
        initial={initial}
        animate={animateProps}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

export default Card;

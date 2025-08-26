import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className={`border-2 border-warm-white/10 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Inner spinner */}
        <motion.div
          className={`absolute border-2 border-warm-white/30 border-t-warm-white/90 rounded-full ${
            size === "sm" ? "inset-0.5 w-3 h-3" :
            size === "md" ? "inset-0.5 w-5 h-5" :
            "inset-1 w-6 h-6"
          }`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;

import { motion } from "framer-motion";
import Hero from "../components/Hero";

const HeroPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <Hero />
    </motion.div>
  );
};

export default HeroPage;

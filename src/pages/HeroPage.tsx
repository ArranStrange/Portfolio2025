import { motion } from "framer-motion";
import Hero from "../components/Hero";
import StarField from "../components/StarField";
import ShootingStars from "../components/ShootingStars";

const HeroPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <ShootingStars />
      <StarField starCount={750} /> <Hero />
    </motion.div>
  );
};

export default HeroPage;

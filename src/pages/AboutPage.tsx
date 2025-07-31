import { motion } from "framer-motion";
import About from "../components/About";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <About />
    </motion.div>
  );
};

export default AboutPage; 
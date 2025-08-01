import { motion } from "framer-motion";
import Projects from "../components/Projects";
import PebblesPhysics from "../components/PebblesPhysics";

const ProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <PebblesPhysics />
      <Projects />
    </motion.div>
  );
};

export default ProjectsPage;

import { motion } from "framer-motion";
import Projects from "../components/Projects";
import PebblesPhysics from "../components/PebblesPhysics";
import SEO from "../components/SEO";

const ProjectsPage = () => {
  return (
    <>
      <SEO 
        title="Projects"
        description="Exploring ideas that blend design, technology and storytelling into expressive web experiences. View my latest projects including VISOR and other creative applications."
        keywords="web projects, React applications, TypeScript, web design, VISOR, film sims, creative development"
        type="website"
      />
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
    </>
  );
};

export default ProjectsPage;

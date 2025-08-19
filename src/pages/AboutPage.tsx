import { motion } from "framer-motion";
import About from "../components/About";
import SEO from "../components/SEO";

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About"
        description="Indie web developer with a background in design and hospitality, crafting original, beautiful applications. Based in Cardiff, UK."
        keywords="about, web developer, Cardiff, UK, design background, hospitality, indie developer"
        type="profile"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <About />
      </motion.div>
    </>
  );
};

export default AboutPage;

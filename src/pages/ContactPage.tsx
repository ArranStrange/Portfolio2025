import { motion } from "framer-motion";
import Contact from "../components/Contact";
import SEO from "../components/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact"
        description="Open to collaborating with people and happy to talk about employment opportunities. Get in touch for project enquiries or employment conversations."
        keywords="contact, collaboration, employment, web development, freelance, Cardiff"
        type="website"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Contact />
      </motion.div>
    </>
  );
};

export default ContactPage;

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const About = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Content sections for each step
  const sections = [
    {
      title: "ABOUT",
      number: "/00-1",
      content:
        "AN INDIE WEB DEVELOPER WITH A BACKGROUND IN DESIGN, FOCUSED ON CRAFTING ORIGINAL, BEAUTIFUL APPLICATIONS.",
      details:
        "My goal is to design exceptional user experiences for visually stunning applications. I am passionate about minimalism, clean user interfaces, and impactful typography.",
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1756394550/ME_and_Rhodes_hjosni.png",
    },
    {
      title: "APPROACH",
      number: "/00-2",
      content:
        "I’VE BUILT MY SKILLS THROUGH ENDURING ENDLESS STUDY AND HANDS-ON PROJECTS.",
      details:
        "I'm building one passion project at a time until I’m able to bring that same care and focus into a professional work space.",

      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1756394548/Glasto_mdecws.png",
    },

    {
      title: "DETAILS",
      number: "/00-3",
      content:
        "I AIM TO DESIGN EXPERIENCES THAT FEEL CLEAN, INTUITIVE, AND VISUALLY STRONG. MINIMALISM, TYPOGRAPHY, AND FLOW ARE THE ELEMENTS I KEEP COMING BACK TO.",
      details:
        "my focus is on building applications where design and engineering work seamlessly together — products that are both well-crafted under the hood and visually engaging on the surface. i care about creating smooth, intuitive journeys that feel effortless for the user.",
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1756396024/Cardiff_jfalgx.png",
    },

    {
      title: "FOUNDATIONS",
      number: "/00-4",
      content:
        "MY BACKGROUND IN DESIGN SHAPED HOW I SEE THE WEB; LAYOUT, BALANCE, AND TYPOGRAPHY FIRST TAUGHT ME HOW TO BUILD EXPERIENCES. THAT PATH LED ME INTO DEVELOPMENT.",
      details:
        "Starting in graphic design and creative projects, I learned how to shape visuals that connect with people. Over time, that same eye for detail drew me into code. I now bring both together, crafting interfaces that are thoughtful in design and solid in engineering.",
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1756395548/brecon_drhjlc.png",
    },

    {
      title: "CONNECT",
      number: "/00-5",
      content:
        "I’M READY TO BRING MY SKILLS INTO A PROFESSIONAL SETTING. FROM DESIGN TO DEVELOPMENT, I’M LOOKING FOR THE RIGHT TEAM TO GROW WITH.",
      details:
        "Open to conversations about roles and opportunities in web development. If you're looking for a developer with a different perspective, get in touch.",
      image:
        "https://res.cloudinary.com/dw6klz9kg/image/upload/v1756395547/Gower_dstwtf.png",
    },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/github");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/projects");
    }
  };

  const isLastStep = currentStep === 4;

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background with subtle noise texture */}
      <div className="absolute inset-0 bg-charcoal" />

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center section-padding">
        <div className="w-full max-w-6xl mx-auto">
          {/* Content Card */}
          <Card
            size="lg"
            variant="none"
            className="max-h-[85vh] overflow-hidden"
            animate={true}
            initial={{ opacity: 0, y: 20 }}
            animateProps={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
              {/* Text Content */}
              <div className="flex flex-col justify-center space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Section Number */}
                    <motion.div
                      className="text-warm-white/40 font-satoshi text-sm font-medium tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {sections[currentStep].number}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      className="text-3xl md:text-4xl lg:text-5xl font-satoshi font-medium text-warm-white leading-tight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {sections[currentStep].title}
                    </motion.h2>

                    {/* Main Content */}
                    <motion.p
                      className="text-lg md:text-xl lg:text-2xl font-light text-warm-white/90 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {sections[currentStep].content}
                    </motion.p>

                    {/* Details */}
                    <motion.p
                      className="text-base md:text-lg text-warm-white/70 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {sections[currentStep].details}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.div
                  className="flex items-center justify-between pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {/* Back Button */}
                  <motion.button
                    onClick={handleBack}
                    className="text-warm-white font-satoshi font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:text-warm-white/80 underline underline-offset-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentStep === 0 ? "Back" : "Previous"}
                  </motion.button>

                  {/* Progress Indicator */}
                  <div className="flex gap-2">
                    {sections.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index <= currentStep
                            ? "bg-warm-white scale-125"
                            : "bg-warm-white/30 scale-100"
                        }`}
                        animate={{
                          scale: index <= currentStep ? 1.25 : 1,
                        }}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={handleNext}
                    className="text-warm-white font-satoshi font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:text-warm-white/80 underline underline-offset-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLastStep ? "Continue" : "Next"}
                  </motion.button>
                </motion.div>
              </div>

              {/* Image Section */}
              <div className="flex items-start justify-center pt-4">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-64 lg:h-96"
                >
                  <img
                    src={sections[currentStep].image}
                    alt={sections[currentStep].title}
                    className="w-full h-full object-cover rounded-lg opacity-80 object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-lg" />
                </motion.div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

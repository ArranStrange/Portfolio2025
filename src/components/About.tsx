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
        "AN INDIE WEB DEVELOPER WITH A BACKGROUND IN DESIGN + HOSPITALITY, FOCUSED ON CRAFTING ORIGINAL, BEAUTIFUL APPLICATIONS.",
      details:
        "I specialise in creating applications that blend design and engineering seamlessly—products that are both visually impressive and well-built at their core.",
      image: "/Mountain 1.png",
    },
    {
      title: "APPROACH",
      number: "/00-2",
      content:
        "EVERY DECISION HAS A PURPOSE, EVERY FEATURE SERVES A NEED. I BELIEVE IN MAKING THE WEB COME ALIVE WITH SUBTLE ANIMATIONS AND COMPLEX INTERACTIONS.",
      details:
        "From subtle animations to complex physics simulations, I craft experiences that engage and delight users while maintaining exceptional performance.",
      image: "/Mountain 3.png",
    },
    {
      title: "DETAILS",
      number: "/00-3",
      content:
        "EVERY PIXEL, EVERY INTERACTION, EVERY LINE OF CODE MATTERS. I OBSESS OVER THE DETAILS THAT TRANSFORM GOOD EXPERIENCES INTO EXCEPTIONAL ONES.",
      details:
        "My work combines innovative design, smooth animations, and intuitive functionality to bring ideas to life on the web.",
      image: "/Mountain 5.png",
    },
    {
      title: "RESPONSIVE",
      number: "/00-4",
      content:
        "LIKE THE WAVES OF THE OCEAN, MY DESIGNS FLOW SEAMLESSLY ACROSS DEVICES AND SCREEN SIZES, ADAPTING TO CREATE THE PERFECT EXPERIENCE.",
      details:
        "I focus on delivering seamless functionality that enables engaging and intuitive user journeys across all platforms.",
      image: "/Waves/Wave 2.png",
    },
    {
      title: "FOUNDATIONS",
      number: "/00-5",
      content:
        "SOLID FOUNDATIONS CREATE LASTING IMPACT. I BUILD WITH MODERN TECHNOLOGIES AND BEST PRACTICES TO ENSURE YOUR DIGITAL PRESENCE STANDS THE TEST OF TIME.",
      details:
        "Code that works today and will work tomorrow. I build with modern technologies and best practices to ensure lasting impact.",
      image: "/Tree.png",
    },
    {
      title: "CONNECT",
      number: "/00-6",
      content:
        "LET'S BRING YOUR VISION TO LIFE. WHETHER IT'S A SIMPLE WEBSITE OR A COMPLEX WEB APPLICATION, I'M HERE TO TURN YOUR IDEAS INTO REALITY.",
      details:
        "Open to collaborating with creatives and chatting about future employment opportunities. Let's create something beautiful together.",
      image: "/Mountain 6.png",
    },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/github");
    }
  };

  const isLastStep = currentStep === 5;

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
              <div className="flex items-center justify-center">
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
                    className="w-full h-full object-cover rounded-lg opacity-80 object-top"
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

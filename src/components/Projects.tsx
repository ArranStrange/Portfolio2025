import { motion } from "framer-motion";
import { useState } from "react";
import Card from "./Card";

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "VISOR",
      description: "Photography tool for film simulations and presets",
      stack: ["React", "TypeScript", "Node.js"],
      image: "/placeholder-visor.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Run Tracker",
      description: "Fitness app with ghost run feature",
      stack: ["React Native", "Firebase", "Maps API"],
      image: "/placeholder-run.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Black Book",
      description: "Clean dark UI drinks library with filters",
      stack: ["React", "Tailwind", "Cocktail API"],
      image: "/placeholder-drinks.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Weather App",
      description: "Minimal weather interface with location tracking",
      stack: ["React", "OpenWeather API", "Geolocation"],
      image: "/placeholder-weather.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Sticky Fingers",
      description: "Street food market website",
      stack: ["WordPress", "Custom Theme", "WooCommerce"],
      image: "/placeholder-food.jpg",
      link: "#",
    },
  ];

  const currentProject = projects[currentProjectIndex];

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="relative z-10 h-screen flex flex-col justify-center px-6 md:px-12">
        <div className="w-full max-w-lg lg:max-w-xl mx-auto">
          {/* Project Card */}
          <Card
            key={currentProject.id}
            size="lg"
            variant="none"
            className="max-h-[85vh] overflow-y-auto"
            animate={true}
            initial={{ opacity: 0, y: 20 }}
            animateProps={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Preview Section */}
            <div className="mb-6 md:mb-8">
              <div className="aspect-video border border-warm-white/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-warm-white/60 font-satoshi text-sm md:text-lg mb-2 md:mb-4">
                      {currentProject.title} Preview
                    </div>
                    {/* Mountain silhouette */}
                    <div className="w-20 h-10 md:w-32 md:h-16 mx-auto">
                      <svg
                        viewBox="0 0 128 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 64L20 40L40 50L60 30L80 45L100 25L128 45V64H0Z"
                          fill="#374151"
                          opacity="0.6"
                        />
                        <path
                          d="M10 64L25 45L40 55L60 35L80 50L100 30L118 50V64H10Z"
                          fill="#4B5563"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4 md:space-y-5">
              {/* Title */}
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-satoshi font-bold text-warm-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {currentProject.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg lg:text-xl text-warm-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {currentProject.description}
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                className="flex flex-wrap gap-2 md:gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {currentProject.stack.map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-rustic-gold rounded-full mr-1.5 md:mr-2"></div>
                    <span className="text-xs md:text-sm text-rustic-gold font-satoshi tracking-wide">
                      {tech}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* View Project Button */}
              <motion.div
                className="flex justify-center pt-4 md:pt-6 pb-4 md:pb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="px-6 md:px-8 py-2 md:py-3 border border-warm-white/20 rounded-lg text-warm-white hover:bg-warm-white/5 transition-colors font-satoshi text-sm md:text-base">
                  View Project
                </button>
              </motion.div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 md:mt-8">
            <button
              onClick={prevProject}
              className="text-warm-white/60 hover:text-warm-white transition-colors font-satoshi text-xs md:text-sm"
            >
              ← Previous
            </button>

            <div className="flex space-x-1.5 md:space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                    index === currentProjectIndex
                      ? "bg-warm-white"
                      : "bg-warm-white/30 hover:bg-warm-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="text-warm-white/60 hover:text-warm-white transition-colors font-satoshi text-xs md:text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

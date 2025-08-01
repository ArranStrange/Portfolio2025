import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Lenis from "lenis";

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isScrollingProjects = useRef(false);
  const currentProjectIndex = useRef(0);

  const projects = [
    {
      id: 1,
      title: "VISOR",
      description: "Photography tool for film simulations and presets",
      stack: "React • TypeScript • Node.js",
      image: "/placeholder-visor.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Run Tracker",
      description: "Fitness app with ghost run feature",
      stack: "React Native • Firebase • Maps API",
      image: "/placeholder-run.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Black Book",
      description: "Clean dark UI drinks library with filters",
      stack: "React • Tailwind • Cocktail API",
      image: "/placeholder-drinks.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Weather App",
      description: "Minimal weather interface with location tracking",
      stack: "React • OpenWeather API • Geolocation",
      image: "/placeholder-weather.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Sticky Fingers",
      description: "Street food market website",
      stack: "WordPress • Custom Theme • WooCommerce",
      image: "/placeholder-food.jpg",
      link: "#",
    },
  ];

  useEffect(() => {
    // Get the Lenis instance from the global scope
    const lenis = (window as { lenis?: Lenis }).lenis;
    if (!lenis) return;

    lenisRef.current = lenis;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Check if we're in the projects section
      if (sectionTop <= 0 && sectionTop + sectionHeight > 0) {
        if (!isScrollingProjects.current) {
          isScrollingProjects.current = true;
          lenis.stop();
        }

        // Calculate how much we've scrolled through the section
        const scrollProgress =
          Math.abs(sectionTop) / (sectionHeight - windowHeight);
        const targetProjectIndex = Math.min(
          Math.floor(scrollProgress * projects.length),
          projects.length - 1
        );

        if (targetProjectIndex !== currentProjectIndex.current) {
          currentProjectIndex.current = targetProjectIndex;
        }

        // Move horizontally based on scroll
        const xOffset = -(targetProjectIndex * 100);
        if (containerRef.current) {
          containerRef.current.style.transform = `translateX(${xOffset}vw)`;
        }

        // If we've reached the end of projects, resume normal scrolling
        if (
          targetProjectIndex >= projects.length - 1 &&
          scrollProgress >= 0.95
        ) {
          isScrollingProjects.current = false;
          lenis.start();
        }
      } else {
        if (isScrollingProjects.current) {
          isScrollingProjects.current = false;
          lenis.start();
        }
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Horizontal scroll container */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-screen transition-transform duration-300 ease-out"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-screen h-full px-6 md:px-12 flex items-center"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
                {/* Project Image */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    className="aspect-video bg-warm-white/10 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-warm-white/5 to-warm-white/10 flex items-center justify-center">
                      <span className="text-warm-white/30 font-inter">
                        {project.title} Preview
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl md:text-4xl font-space font-medium mb-3">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-warm-white/80 mb-4">
                      {project.description}
                    </p>
                    <p className="text-sm text-rustic-gold font-mono tracking-wide">
                      {project.stack}
                    </p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 border border-warm-white/20 rounded-lg text-warm-white hover:bg-warm-white/5 transition-colors"
                  >
                    View Project
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

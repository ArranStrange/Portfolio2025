import { motion } from "framer-motion";

const Now = () => {
  return (
    <section className="min-h-screen py-20">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Now
        </motion.h2>

        <div className="space-y-12">
          {/* Current Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-space font-medium text-rustic-gold">
              Building VISOR
            </h3>
            <p className="body-text text-balance">
              I'm currently focused on VISOR, a photography tool that brings
              film simulations and presets to digital photographers. It's built
              with React, TypeScript, and a Node.js backend, featuring real-time
              preview and custom preset creation.
            </p>
          </motion.div>

          {/* Code Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-warm-white/5 rounded-lg p-6 border border-warm-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-warm-white/60 font-mono">
                VISOR Core
              </span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="text-sm text-warm-white/80 font-mono overflow-x-auto">
              {`const FilmSimulation = {
  name: 'Kodak Portra 400',
  contrast: 1.2,
  saturation: 0.9,
  grain: 0.3,
  colors: {
    shadows: '#2a1a0f',
    highlights: '#f8f6f0'
  }
}`}
            </pre>
          </motion.div>

          {/* Current Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-space font-medium">Current Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "React",
                "TypeScript",
                "GraphQL",
                "MongoDB",
                "Framer Motion",
                "Tailwind CSS",
                "Node.js",
                "Vercel",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-warm-white/5 rounded-lg p-4 text-center border border-warm-white/10 hover:bg-warm-white/10 transition-colors"
                >
                  <span className="text-sm font-mono text-warm-white/80">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-space font-medium">
              Learning & Growing
            </h3>
            <p className="body-text text-balance">
              I'm exploring advanced React patterns, performance optimization,
              and building more sophisticated state management solutions. Always
              curious about new tools that make development more thoughtful and
              efficient.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Now;

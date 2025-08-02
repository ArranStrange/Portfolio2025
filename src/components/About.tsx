import { motion } from "framer-motion";

const About = () => {
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
          About
        </motion.h2>

        <div className="space-y-12">
          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[16/9] rounded-lg border border-warm-white/10 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border border-rustic-gold/20">
                <svg
                  className="w-8 h-8 text-rustic-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-warm-white/60 font-satoshi">
                Countryside roots, digital craft
              </p>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="body-text text-balance leading-relaxed">
                I grew up in the countryside, where patience and attention to
                detail weren't just virtues—they were necessities. That same
                mindset carried me through managing a street food market, where
                every detail mattered to the customer experience.
              </p>

              <p className="body-text text-balance leading-relaxed">
                Late nights, naptimes, and tutorials got me into code. When my
                daughter was born, I found myself with pockets of time—sometimes
                just 20 minutes— to learn something new. Those moments became my
                foundation in web development.
              </p>

              <p className="body-text text-balance leading-relaxed">
                Now I bring that same resilience and calm to software. I build
                tools that feel thoughtful and purposeful, because good software
                should make people's lives easier, not more complicated.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Thoughtful",
                description:
                  "Every decision has a purpose, every feature serves a need.",
              },
              {
                title: "Reliable",
                description: "Code that works today and will work tomorrow.",
              },
              {
                title: "Human",
                description:
                  "Software that understands people, not just requirements.",
              },
            ].map((value) => (
              <div key={value.title} className="space-y-4">
                <h3 className="text-xl font-satoshi font-medium text-rustic-gold">
                  {value.title}
                </h3>
                <p className="text-warm-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

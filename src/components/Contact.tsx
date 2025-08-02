import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="min-h-screen py-20">
      <div className="section-padding max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Let's build something honest.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="body-text text-balance text-warm-white/80">
            I'm always interested in thoughtful projects and meaningful
            collaborations. Whether you have a specific idea or just want to
            chat about possibilities, let's start a conversation.
          </p>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-warm-white/60 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-warm-white/5 border border-warm-white/20 rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none focus:border-rustic-gold transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-warm-white/60 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-warm-white/5 border border-warm-white/20 rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none focus:border-rustic-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-warm-white/60 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-warm-white/5 border border-warm-white/20 rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none focus:border-rustic-gold transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-4 bg-rustic-gold text-charcoal font-medium rounded-lg hover:bg-rustic-gold/90 transition-colors"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Alternative contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-warm-white/10"
          >
            <p className="text-warm-white/60 mb-4">
              Or simply email me at{" "}
              <a
                href="mailto:hello@arranstrange.com"
                className="text-rustic-gold hover:text-rustic-gold/80 transition-colors"
              >
                hello@arranstrange.com
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-warm-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-warm-white/40 font-inter">
              Made in Wales
            </p>
            <div className="flex items-center space-x-6 text-sm text-warm-white/40 font-inter">
              <span>Built with React</span>
              <span>•</span>
              <span>Hosted on Vercel</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;

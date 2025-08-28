import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // EmailJS configuration - replace these with your actual credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("EmailJS Config:", {
        serviceId,
        templateId,
        publicKey: publicKey.substring(0, 5) + "...",
      });
      console.log("Form Data:", formData);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      };

      console.log("Template Params:", templateParams);

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("EmailJS Result:", result);

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 md:pt-0">
      <div className="section-padding max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          GET IN TOUCH
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-warm-white/60 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none transition-colors bg-transparent backdrop-blur-sm ${
                    errors.name
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-warm-white/20 focus:border-warm-white/40"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-warm-white/60 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none transition-colors bg-transparent backdrop-blur-sm ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-warm-white/20 focus:border-warm-white/40"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-warm-white/60 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg text-warm-white placeholder-warm-white/40 focus:outline-none transition-colors resize-none bg-transparent backdrop-blur-sm ${
                  errors.message
                    ? "border-red-500/50 focus:border-red-500/70"
                    : "border-warm-white/20 focus:border-warm-white/40"
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
              >
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}

            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`px-8 py-3 font-satoshi font-light text-sm transition-colors border border-warm-white/30 rounded-lg ${
                  isSubmitting
                    ? "bg-warm-white/10 text-warm-white/40 cursor-not-allowed border-warm-white/20"
                    : "bg-transparent text-warm-white/80 hover:text-warm-white hover:bg-warm-white/5 hover:border-warm-white/50"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </motion.form>

          {/* Alternative contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-4 border-t border-warm-white/10"
          >
            <p className="text-warm-white/60 text-sm">
              Or simply email me at{" "}
              <a
                href="mailto:arranstrange@googlemail.com"
                className="text-warm-white/80 hover:text-warm-white transition-colors"
              >
                arranstrange@googlemail.com
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
          className="mt-12 pt-6 border-t border-warm-white/10"
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

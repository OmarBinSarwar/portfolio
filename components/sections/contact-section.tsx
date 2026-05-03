"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useState } from "react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "omarbinsarwar50@gmail.com",
    href: "mailto:omarbinsarwar50@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: "#",
  },
];

const socials = [
  { icon: Github, href: "https://github.com/OmarBinSarwar", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/omar-bin-sarwar/",
    label: "LinkedIn",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="section-shell section-contact h-screen overflow-y-auto overflow-x-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-24 pb-20 sm:pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full glass text-xs sm:text-sm text-primary mb-3 sm:mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-foreground">Let&apos;s Work </span>
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto px-2">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">
              Contact Info
            </h3>

            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-2xl glass palette-surface-a transition-colors"
                whileHover={{ x: 2 }}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <method.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {method.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors truncate">
                    {method.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4 sm:pt-6"
            >
              <h4 className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                Find me on
              </h4>
              <div className="flex gap-2 sm:gap-3">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl glass palette-surface-b flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-3 sm:p-4 rounded-lg sm:rounded-2xl glass palette-surface-c mt-4 sm:mt-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-accent animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  Currently available for new projects
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 md:space-y-6"
            >
              {/* Name Field */}
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "name" ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label
                  htmlFor="name"
                  className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none text-xs ${
                    focusedField === "name" || formData.name
                      ? "-top-2 sm:-top-2.5 text-xs text-primary bg-background px-1.5 sm:px-2"
                      : "top-2.5 sm:top-3 md:top-4 text-muted-foreground"
                  }`}
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-4 rounded-lg sm:rounded-xl glass palette-surface-b bg-transparent border-2 border-transparent focus:border-primary outline-none transition-colors text-sm sm:text-base"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label
                  htmlFor="email"
                  className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none text-xs ${
                    focusedField === "email" || formData.email
                      ? "-top-2 sm:-top-2.5 text-xs text-primary bg-background px-1.5 sm:px-2"
                      : "top-2.5 sm:top-3 md:top-4 text-muted-foreground"
                  }`}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-4 rounded-lg sm:rounded-xl glass palette-surface-a bg-transparent border-2 border-transparent focus:border-primary outline-none transition-colors text-sm sm:text-base"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label
                  htmlFor="message"
                  className={`absolute left-3 sm:left-4 transition-all duration-200 pointer-events-none text-xs ${
                    focusedField === "message" || formData.message
                      ? "-top-2 sm:-top-2.5 text-xs text-primary bg-background px-1.5 sm:px-2"
                      : "top-2.5 sm:top-3 md:top-4 text-muted-foreground"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-4 rounded-lg sm:rounded-xl glass palette-surface-c bg-transparent border-2 border-transparent focus:border-primary outline-none transition-colors resize-none text-sm sm:text-base"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

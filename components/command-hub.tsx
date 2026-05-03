"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Section = "home" | "about" | "skills" | "projects" | "contact";

interface CommandHubProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections = [
  {
    id: "home" as Section,
    label: "Home",
    icon: Home,
  },
  {
    id: "about" as Section,
    label: "About",
    icon: User,
  },
  {
    id: "skills" as Section,
    label: "Skills",
    icon: Code2,
  },
  {
    id: "projects" as Section,
    label: "Projects",
    icon: FolderKanban,
  },
  {
    id: "contact" as Section,
    label: "Contact",
    icon: Mail,
  },
];

export function CommandHub({
  activeSection,
  onSectionChange,
}: CommandHubProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Floating Navigation Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="fixed bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <div className="glass rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex items-center gap-0.5 sm:gap-1 shadow-lg">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                aria-label={section.label}
              >
                <Icon className="w-4 sm:w-5 h-4 sm:h-5" />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap"
                    >
                      {section.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-xl bg-primary -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}

          {/* Separator */}
          <div className="w-px h-8 bg-border mx-1" />

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {mounted &&
              (resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* Social Links - Floating Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      >
        <motion.a
          href="https://github.com/OmarBinSarwar"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl glass text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/omar-bin-sarwar/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl glass text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="mailto:omarbinsarwar50@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl glass text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </motion.a>
        <div className="w-px h-16 bg-gradient-to-b from-border to-transparent mx-auto" />
      </motion.div>

      {/* Top bar with name */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 p-6"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.button
            onClick={() => onSectionChange("home")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
              O
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Omar Bin Sarwar
              </div>
              <div className="text-xs text-muted-foreground">
                Software Developer
              </div>
            </div>
          </motion.button>

          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="hidden sm:inline">Available for work</span>
            <span className="sm:hidden">Available</span>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
}

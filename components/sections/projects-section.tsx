"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Cloud,
  ExternalLink,
  Film,
  Github,
} from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Weather App",
    description:
      "A beautiful weather application that provides real-time weather data, forecasts, and location-based weather information with a clean, intuitive interface.",
    icon: Cloud,
    tags: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
    liveUrl: "https://weather-app-obs.vercel.app/",
    githubUrl: "https://github.com/OmarBinSarwar/Weather_App",
    featured: true,
  },
  {
    id: 2,
    title: "CinemaWave",
    description:
      "A modern movie discovery platform where users can explore trending films, search for movies, view detailed information, and discover new content to watch.",
    icon: Film,
    tags: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
    liveUrl: "https://cinema-wave.vercel.app/",
    githubUrl: "https://github.com/OmarBinSarwar/CinemaWave",
    featured: true,
  },
  {
    id: 3,
    title: "OBS Tasker",
    description:
      "A sleek and efficient task management application to help organize daily tasks, track progress, and boost productivity with an elegant user interface.",
    icon: CheckSquare,
    tags: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
    liveUrl: "https://obs-tasker.vercel.app/",
    githubUrl: "https://github.com/OmarBinSarwar/OBS_Tasker",
    featured: true,
  },
];

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  const activeProject = projects[activeIndex];
  const Icon = activeProject.icon;

  return (
    <div className="section-shell section-projects h-screen overflow-y-auto overflow-x-hidden flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-24 pb-20 sm:pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto w-full">
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
            Featured Work
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto px-2">
            A showcase of my recent work and creative experiments
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full glass palette-surface-a text-foreground transition-colors -translate-x-1 sm:-translate-x-2 lg:-translate-x-8"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6" />
          </motion.button>

          <motion.button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full glass palette-surface-b text-foreground transition-colors translate-x-1 sm:translate-x-2 lg:translate-x-8"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
          </motion.button>

          {/* Main Project Card */}
          <div className="perspective-2000 px-3 sm:px-6 md:px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject.id}
                custom={direction}
                initial={{
                  rotateY: direction > 0 ? 30 : -30,
                  opacity: 0,
                  scale: 0.9,
                  x: direction > 0 ? 150 : -150,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  rotateY: direction > 0 ? -30 : 30,
                  opacity: 0,
                  scale: 0.9,
                  x: direction > 0 ? -150 : 150,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="preserve-3d"
              >
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
                  {/* Project Preview */}
                  <motion.div
                    className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden glass palette-surface-a group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 grid-pattern opacity-30" />

                    {/* Project icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl sm:rounded-3xl glass flex items-center justify-center"
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-primary" />
                      </motion.div>
                    </div>

                    {/* Featured badge */}
                    {activeProject.featured && (
                      <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full glass palette-chip-a text-xs font-medium"
                      >
                        Featured
                      </motion.div>
                    )}

                    {/* Hover overlay with links - hidden on mobile, visible on hover/lg screens */}
                    <motion.div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-2 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                      <motion.a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-medium text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span className="hidden sm:inline">View Live</span>
                      </motion.a>
                      <motion.a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl glass font-medium text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span className="hidden sm:inline">Code</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  {/* Project Info */}
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                        Project {String(activeIndex + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                        {activeProject.title}
                      </h3>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    >
                      {activeProject.description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-1.5 sm:gap-2"
                    >
                      {activeProject.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg glass palette-surface-b text-xs sm:text-sm font-medium"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap pt-1 sm:pt-2"
                    >
                      <motion.a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-medium text-xs sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Live</span>
                      </motion.a>
                      <motion.a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl glass palette-surface-c font-medium text-xs sm:text-base transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span className="hidden sm:inline">Source Code</span>
                        <span className="sm:hidden">Code</span>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`relative h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-10 bg-primary"
                    : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="projectIndicator"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

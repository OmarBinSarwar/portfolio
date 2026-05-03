"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Cloud, Film, CheckSquare } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Weather App",
    description: "A beautiful weather application that provides real-time weather data, forecasts, and location-based weather information with a clean, intuitive interface.",
    icon: Cloud,
    tags: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
    liveUrl: "https://weather-app-obs.vercel.app/",
    githubUrl: "https://github.com/OmarBinSarwar/Weather_App",
    featured: true,
  },
  {
    id: 2,
    title: "CinemaWave",
    description: "A modern movie discovery platform where users can explore trending films, search for movies, view detailed information, and discover new content to watch.",
    icon: Film,
    tags: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
    liveUrl: "https://cinema-wave.vercel.app/",
    githubUrl: "https://github.com/OmarBinSarwar/CinemaWave",
    featured: true,
  },
  {
    id: 3,
    title: "OBS Tasker",
    description: "A sleek and efficient task management application to help organize daily tasks, track progress, and boost productivity with an elegant user interface.",
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
    <div className="section-shell section-projects min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary mb-4"
          >
            Featured Work
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A showcase of my recent work and creative experiments
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass palette-surface-a text-foreground transition-colors -translate-x-2 lg:-translate-x-8"
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass palette-surface-b text-foreground transition-colors translate-x-2 lg:translate-x-8"
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Main Project Card */}
          <div className="perspective-2000 px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject.id}
                custom={direction}
                initial={{ 
                  rotateY: direction > 0 ? 30 : -30, 
                  opacity: 0,
                  scale: 0.9,
                  x: direction > 0 ? 150 : -150
                }}
                animate={{ 
                  rotateY: 0, 
                  opacity: 1,
                  scale: 1,
                  x: 0
                }}
                exit={{ 
                  rotateY: direction > 0 ? -30 : 30, 
                  opacity: 0,
                  scale: 0.9,
                  x: direction > 0 ? -150 : 150
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20 
                }}
                className="preserve-3d"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Project Preview */}
                  <motion.div
                    className="relative aspect-video rounded-3xl overflow-hidden glass palette-surface-a group"
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
                        className="w-24 h-24 rounded-3xl glass flex items-center justify-center"
                        animate={{ 
                          y: [0, -8, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon className="w-12 h-12 text-primary" />
                      </motion.div>
                    </div>

                    {/* Featured badge */}
                    {activeProject.featured && (
                      <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="absolute top-4 left-4 px-3 py-1 rounded-full glass palette-chip-a text-xs font-medium"
                      >
                        Featured
                      </motion.div>
                    )}

                    {/* Hover overlay with links */}
                    <motion.div
                      className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <motion.a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </motion.a>
                      <motion.a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl glass font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  {/* Project Info */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-sm text-muted-foreground font-mono">
                        Project {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-3xl lg:text-4xl font-bold mt-2">{activeProject.title}</h3>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {activeProject.description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-2"
                    >
                      {activeProject.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="px-3 py-1.5 rounded-lg glass palette-surface-b text-sm font-medium"
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
                      className="flex gap-4"
                    >
                      <motion.a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl glass palette-surface-c font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`relative h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-10 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
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

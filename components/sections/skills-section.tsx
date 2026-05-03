"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & Others" },
];

const skills = [
  // Frontend
  { name: "HTML", level: 95, category: "frontend" },
  { name: "CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 88, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "Bootstrap", level: 85, category: "frontend" },
  // Backend
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Python", level: 70, category: "backend" },
  { name: "SQL", level: 75, category: "backend" },
  { name: "MongoDB", level: 72, category: "backend" },
  { name: "Mongoose", level: 70, category: "backend" },
  { name: "Axios", level: 80, category: "backend" },
  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "GitHub", level: 88, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Vercel", level: 85, category: "tools" },
  { name: "Vite", level: 82, category: "tools" },
  { name: "ERD Design", level: 75, category: "tools" },
  { name: "Project Management", level: 70, category: "tools" },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const getSkillVisuals = (level: number) => {
    if (level >= 90) {
      return {
        ring: "text-primary",
        glow: "from-primary/18 via-primary/6 to-transparent",
        badge: "Expert",
        badgeClass: "bg-primary/15 text-primary border border-primary/30",
      };
    }

    if (level >= 80) {
      return {
        ring: "text-accent",
        glow: "from-accent/18 via-accent/6 to-transparent",
        badge: "Advanced",
        badgeClass: "bg-accent/15 text-accent border border-accent/30",
      };
    }

    if (level >= 70) {
      return {
        ring: "text-primary/75",
        glow: "from-primary/12 via-accent/5 to-transparent",
        badge: "Proficient",
        badgeClass: "bg-secondary text-secondary-foreground border border-border",
      };
    }

    return {
      ring: "text-muted-foreground/65",
      glow: "from-muted/60 via-transparent to-transparent",
      badge: "Intermediate",
      badgeClass: "bg-muted text-muted-foreground border border-border",
    };
  };

  return (
    <div className="section-shell section-skills min-h-screen flex items-center justify-center px-6 py-24">
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
            Skills & Expertise
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "glass palette-surface-a text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const visuals = getSkillVisuals(skill.level);

              return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative group"
              >
                <motion.div
                  className="glass palette-surface-b rounded-2xl p-5 text-center cursor-pointer relative overflow-hidden border border-border/70"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${visuals.glow}`} />

                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${visuals.badgeClass} palette-chip-a`}>
                      {visuals.badge}
                    </span>
                  </div>

                  {/* Circular progress */}
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-muted/30"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className={visuals.ring}
                        initial={{ strokeDasharray: "0 176" }}
                        animate={{
                          strokeDasharray: `${(skill.level / 100) * 176} 176`,
                        }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                      />
                    </svg>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center font-bold text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {skill.level}%
                    </motion.div>
                  </div>

                  <h3 className="font-semibold text-sm text-foreground">{skill.name}</h3>
                  
                  {/* Category badge */}
                  <span className="text-xs text-muted-foreground/90 capitalize mt-1 block palette-chip-b w-fit mx-auto px-2 py-0.5 rounded-full">
                    {skill.category === "tools" ? "Tool" : skill.category}
                  </span>

                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${visuals.ring.replace("text-", "bg-")}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + index * 0.03 }}
                    />
                  </div>

                  {/* Hover glow effect */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Skill level legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-12 text-sm text-muted-foreground flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Expert (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span>Advanced (80-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/70" />
            <span>Proficient (70-79%)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

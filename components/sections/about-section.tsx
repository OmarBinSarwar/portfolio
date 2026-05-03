"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Heart, Camera, Video } from "lucide-react";
import { useState } from "react";

const interests = [
  { icon: Camera, label: "Photography", description: "Capturing moments" },
  { icon: Video, label: "Video Editing", description: "Creating stories" },
];

const timeline = [
  {
    year: "2020 - 2025",
    title: "BSc in Computer Science & Engineering",
    institution: "Independent University, Bangladesh",
    description: "Pursuing Bachelor's degree with focus on software development and modern web technologies",
    current: true,
  },
  {
    year: "2024",
    title: "Frontend Development Focus",
    institution: "Self Learning & Projects",
    description: "Building real-world projects with React, Next.js, and modern CSS frameworks",
    current: false,
  },
  {
    year: "2023",
    title: "Started Web Development Journey",
    institution: "Online Learning",
    description: "Began learning HTML, CSS, JavaScript and modern frontend frameworks",
    current: false,
  },
];

export function AboutSection() {
  const [flippedCard, setFlippedCard] = useState(false);

  return (
    <div className="section-shell section-about min-h-screen flex items-center justify-center px-6 py-24">
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
            About Me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-foreground">The Story </span>
            <span className="gradient-text">Behind the Code</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get to know the person behind the projects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="perspective-1000"
          >
            <motion.div
              className="relative w-full aspect-square max-w-md mx-auto cursor-pointer preserve-3d"
              animate={{ rotateY: flippedCard ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setFlippedCard(!flippedCard)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 rounded-3xl glass palette-surface-a p-8 flex flex-col justify-between"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
                      OB
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Omar Bin Sarwar</h3>
                      <p className="text-muted-foreground">Software Developer</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>BSc in CSE - Independent University</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>2020 - 2025</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    A passionate developer who loves turning complex problems into elegant solutions.
                    I specialize in building modern, responsive web applications using React, Next.js, 
                    and cutting-edge frontend technologies.
                  </p>
                </div>

                <div className="text-center text-sm text-muted-foreground/60 mt-4">
                  Click to see my interests
                </div>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 rounded-3xl glass palette-surface-b p-8 flex flex-col justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="text-center mb-8">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">My Hobbies</h3>
                  <p className="text-muted-foreground text-sm">What I love doing outside of coding</p>
                </div>

                <div className="space-y-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest.label}
                      className="flex items-center gap-4 p-4 rounded-2xl palette-surface-c transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <interest.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{interest.label}</h4>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center text-sm text-muted-foreground/60 mt-8">
                  Click to flip back
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">My Journey</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative pl-12 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      item.current
                        ? "bg-primary"
                        : "bg-muted border-2 border-border"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.current && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className={`text-xs font-bold ${item.current ? "text-primary-foreground" : "text-muted-foreground"}`}>
                      {item.year.slice(0, 2)}
                    </span>
                  </motion.div>

                  <motion.div
                    className="glass palette-surface-b rounded-2xl p-6 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-sm text-primary font-mono">{item.year}</span>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-accent mb-2">{item.institution}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { value: "3+", label: "Projects" },
                { value: "5+", label: "Technologies" },
                { value: "100%", label: "Dedication" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                className="text-center p-4 rounded-2xl glass palette-surface-c"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

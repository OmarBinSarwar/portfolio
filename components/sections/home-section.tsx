"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const identityLines = ["SYSTEMS.", "DESIGN.", "PRECISION."];

const rotatingTitles = [
  "Software Developer",
  "Creative Builder",
  "Digital Architect",
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/OmarBinSarwar",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/omar-bin-sarwar/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:omarbinsarwar50@gmail.com",
    label: "Email",
  },
];

export function HomeSection({
  onSectionChange,
}: {
  onSectionChange: (section: "projects" | "about") => void;
}) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const x = (e.clientX - window.innerWidth / 2) / 70;
    const y = (e.clientY - window.innerHeight / 2) / 70;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="
        relative w-full h-screen overflow-hidden
        bg-background text-foreground
        flex items-center justify-center
        py-8 sm:py-10 md:py-12 lg:py-0
        pb-20 sm:pb-24 md:pb-0
      "
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:22px_22px]" />
      </div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              style={{ x: smoothX, y: smoothY }}
              className="
                  w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[520px]
                  h-[35vh] sm:h-[42vh] md:h-[50vh] lg:h-[72vh]
                "
            >
              <div className="relative w-full h-full overflow-hidden rounded-3xl lg:rounded-[2.5rem]">
                {!imageError ? (
                  <motion.img
                    src="/cover-photo.png"
                    alt="Omar Bin Sarwar"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground border border-border">
                    Add image to public/cover-photo.png
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* TEXT */}
          <div
            className="
            order-2 lg:order-1
            flex flex-col gap-4 sm:gap-5 md:gap-6
          "
          >
            {/* MOBILE 2-COLUMN BLOCK */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:block">
              {/* LEFT COLUMN */}
              <div className="flex flex-col">
                <div className="leading-[0.85] text-center lg:text-left">
                  <h1 className="uppercase font-semibold tracking-[-0.06em] text-[clamp(2rem,7vw,8rem)]">
                    Omar
                  </h1>
                  <h1 className="uppercase font-semibold tracking-[-0.06em] text-muted-foreground text-[clamp(2rem,7vw,8rem)]">
                    Bin
                  </h1>
                  <h1 className="uppercase font-semibold tracking-[-0.06em] text-[clamp(2rem,7vw,8rem)]">
                    Sarwar
                  </h1>
                </div>

                <div className="flex gap-1.5 sm:gap-2 mt-2 flex-wrap justify-center lg:justify-start">
                  {identityLines.map((t) => (
                    <span
                      key={t}
                      className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col">
                {/* TITLE */}
                <div className="h-6 sm:h-7 md:h-9">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={rotatingTitles[titleIndex]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs sm:text-sm md:text-lg font-light"
                    >
                      {rotatingTitles[titleIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                  Crafting scalable systems and modern interfaces where design
                  and engineering merge seamlessly.
                </motion.p>

                {/* CTA */}
                <div className="mt-3 sm:mt-4 flex gap-3 sm:gap-5 flex-wrap">
                  <button
                    onClick={() => onSectionChange("projects")}
                    className="group inline-flex items-center gap-1.5 uppercase tracking-[0.25em] text-[10px] sm:text-xs hover:opacity-70 transition"
                  >
                    Enter Work
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition" />
                  </button>

                  <button
                    onClick={() => onSectionChange("about")}
                    className="uppercase tracking-[0.25em] text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition"
                  >
                    Manifesto
                  </button>
                </div>

                {/* SOCIAL */}
                <div className="flex gap-2.5 sm:gap-4 mt-3 sm:mt-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

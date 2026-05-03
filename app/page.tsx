"use client";

import { CommandHub } from "@/components/command-hub";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HomeSection } from "@/components/sections/home-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Section = "home" | "about" | "skills" | "projects" | "contact";

const sectionVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 40 : -40,
    scale: 0.99,
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 25,
      duration: 0.35,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -40 : 40,
    scale: 0.99,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 25,
      duration: 0.25,
    },
  }),
};

const sectionOrder: Section[] = [
  "home",
  "about",
  "skills",
  "projects",
  "contact",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(0);
  const sectionScrollRef = useRef<HTMLDivElement | null>(null);
  const edgeScrollCount = useRef(0);
  const lastEdgeDirection = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = useCallback(
    (newSection: Section) => {
      const currentIndex = sectionOrder.indexOf(activeSection);
      const newIndex = sectionOrder.indexOf(newSection);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveSection(newSection);
    },
    [activeSection],
  );

  // Reset scroll position when section changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionScrollRef.current) {
        sectionScrollRef.current.scrollTop = 0;
      }
    }, 50);
    edgeScrollCount.current = 0;
    lastEdgeDirection.current = 0;
    return () => clearTimeout(timer);
  }, [activeSection]);

  const canNavigateSection = useCallback((deltaY: number) => {
    const container = sectionScrollRef.current;
    if (!container) return true;

    const { scrollTop, clientHeight, scrollHeight } = container;
    // Content fits in viewport — no internal scroll needed
    const noScroll = scrollHeight <= clientHeight + 2;
    if (noScroll) return true;

    const threshold = 10;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    const isAtTop = scrollTop <= threshold;

    const dir = deltaY > 0 ? 1 : -1;
    const atEdge = dir > 0 ? isAtBottom : isAtTop;

    if (atEdge) {
      // Require 2 consecutive edge scrolls in the same direction
      if (lastEdgeDirection.current === dir) {
        edgeScrollCount.current += 1;
      } else {
        edgeScrollCount.current = 1;
        lastEdgeDirection.current = dir;
      }
      return edgeScrollCount.current >= 2;
    }

    // Not at edge — reset counter
    edgeScrollCount.current = 0;
    lastEdgeDirection.current = 0;
    return false;
  }, []);

  // Scroll navigation between sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Throttle scroll events - minimum 700ms between section changes
      if (now - lastScrollTime.current < 700) return;
      if (isScrollingRef.current) return;
      if (!canNavigateSection(e.deltaY)) return;

      const currentIndex = sectionOrder.indexOf(activeSection);

      // Check if scrolling down
      if (e.deltaY > 20) {
        const nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
        if (nextIndex !== currentIndex) {
          e.preventDefault();
          isScrollingRef.current = true;
          lastScrollTime.current = now;
          handleSectionChange(sectionOrder[nextIndex]);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 700);
        }
      }
      // Check if scrolling up
      else if (e.deltaY < -20) {
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          e.preventDefault();
          isScrollingRef.current = true;
          lastScrollTime.current = now;
          handleSectionChange(sectionOrder[prevIndex]);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 700);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, canNavigateSection, handleSectionChange]);

  // Touch swipe navigation for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const currentIndex = sectionOrder.indexOf(activeSection);

      if (Math.abs(diff) > 50) {
        if (!canNavigateSection(diff)) return;

        if (diff > 0) {
          // Swipe up - go to next section
          const nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
          if (nextIndex !== currentIndex) {
            handleSectionChange(sectionOrder[nextIndex]);
          }
        } else {
          // Swipe down - go to previous section
          const prevIndex = Math.max(currentIndex - 1, 0);
          if (prevIndex !== currentIndex) {
            handleSectionChange(sectionOrder[prevIndex]);
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, canNavigateSection, handleSectionChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIndex = sectionOrder.indexOf(activeSection);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
        handleSectionChange(sectionOrder[nextIndex]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        handleSectionChange(sectionOrder[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, handleSectionChange]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                className="relative w-20 h-20 mx-auto mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-xl border-2 border-accent/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-xl font-bold text-primary-foreground">
                    O
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-sm"
              >
                Loading portfolio...
              </motion.div>

              <motion.div
                className="w-48 h-1 bg-muted rounded-full mt-4 mx-auto overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      {/* Command Hub (Navigation) */}
      <CommandHub
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content with Transitions */}
      <main className="relative z-10 perspective-2000 h-screen w-screen overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full preserve-3d overflow-y-auto overflow-x-hidden"
            ref={sectionScrollRef}
          >
            {activeSection === "home" && (
              <HomeSection
                onSectionChange={
                  handleSectionChange as (section: "projects" | "about") => void
                }
              />
            )}
            {activeSection === "about" && <AboutSection />}
            {activeSection === "skills" && <SkillsSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "contact" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Section Indicator (Right side) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      >
        {sectionOrder.map((section) => (
          <motion.button
            key={section}
            onClick={() => handleSectionChange(section)}
            className="group relative"
            whileHover={{ scale: 1.3 }}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeSection === section
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground"
              }`}
            />
            {activeSection === section && (
              <motion.div
                layoutId="sectionDot"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="px-2 py-1 rounded-md bg-foreground text-background text-xs whitespace-nowrap capitalize font-medium">
                {section}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}

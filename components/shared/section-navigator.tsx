// components/shared/section-navigator.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "trust-indicators", label: "Trust", icon: "🛡️" },
  { id: "quranic-verse", label: "Verse", icon: "📖" },
  { id: "features", label: "Features", icon: "✨" },
  { id: "featured-courses", label: "Courses", icon: "📚" },
  { id: "learning-process", label: "Path", icon: "🗺️" },
  { id: "teachers", label: "Teachers", icon: "👨‍🏫" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "testimonials", label: "Reviews", icon: "⭐" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "cta", label: "Enroll", icon: "🎯" },
  { id: "contact", label: "Contact", icon: "📧" },
];

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigator after scrolling past hero
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.5);

      // Find active section
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
          <div className="bg-background/80 backdrop-blur-md rounded-full border border-purple-200 dark:border-purple-800 shadow-lg p-2">
            <div className="flex flex-col gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative group w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center",
                    activeSection === section.id
                      ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 hover:bg-purple-200 dark:hover:bg-purple-800/50",
                  )}
                  aria-label={`Go to ${section.label}`}
                >
                  <span className="text-sm">{section.icon}</span>

                  {/* Tooltip */}
                  <span
                    className={cn(
                      "absolute right-full mr-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap transition-all duration-200 pointer-events-none",
                      isHovered
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2",
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

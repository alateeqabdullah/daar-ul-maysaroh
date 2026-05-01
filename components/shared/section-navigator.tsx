// components/shared/section-navigator.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronUp } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Welcome", icon: "🏠" },
  { id: "trust", label: "Why Us", icon: "✓" },
  { id: "verse", label: "Quran", icon: "📖" },
  { id: "features", label: "Features", icon: "⭐" },
  { id: "courses", label: "Courses", icon: "📚" },
  { id: "process", label: "Process", icon: "🔄" },
  { id: "teachers", label: "Teachers", icon: "👨‍🏫" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "testimonials", label: "Reviews", icon: "💬" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "cta", label: "Enroll", icon: "🎯" },
  { id: "contact", label: "Contact", icon: "📞" },
];

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigator after scrolling past hero
      setIsVisible(window.scrollY > 400);

      // Find active section
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center lg:hidden"
        aria-label="Quick navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute bottom-24 right-6 w-64 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-border bg-gradient-to-r from-purple-600/10 to-amber-500/10">
              <p className="text-xs font-black uppercase tracking-wider">
                Jump to Section
              </p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-muted/30 transition-colors",
                    activeSection === section.id &&
                      "bg-purple-600/10 border-l-2 border-purple-600",
                  )}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigator */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-2 shadow-lg">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative group",
                activeSection === section.id
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                  : "hover:bg-muted/50",
              )}
            >
              <span className="text-sm">{section.icon}</span>
              <span className="absolute right-full mr-3 px-2 py-1 rounded-lg bg-card text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

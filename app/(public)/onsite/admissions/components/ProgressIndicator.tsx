// app/(marketing)/onsite/admissions/components/ProgressIndicator.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Section } from "../types";

interface ProgressIndicatorProps {
  sections: Section[];
  currentSection: number;
  setCurrentSection: (index: number) => void;
  isMobile: boolean;
}

export function ProgressIndicator({
  sections,
  currentSection,
  setCurrentSection,
  isMobile,
}: ProgressIndicatorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center gap-1 mb-2">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const isActive = idx === currentSection;
          const isCompleted = idx < currentSection;

          // Show fewer steps on mobile
          if (isMobile && idx % 2 !== 0 && idx !== sections.length - 1)
            return null;

          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(idx)}
              className="flex flex-col items-center min-w-[36px] md:min-w-[50px] group flex-1"
            >
              <div
                className={cn(
                  "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg scale-105"
                    : isCompleted
                      ? "bg-purple-600/40 text-purple-300"
                      : "bg-slate-800/50 text-slate-500",
                )}
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span
                className={cn(
                  "text-[5px] md:text-[6px] font-black uppercase mt-0.5 whitespace-nowrap",
                  isActive ? "text-amber-400" : "text-slate-500",
                )}
              >
                {isMobile
                  ? section.title.split(" ")[0].slice(0, 3)
                  : section.title.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Section Counter */}
      <div className="text-center mt-2">
        <p className="text-[10px] text-slate-500">
          {currentSection + 1} of {sections.length} •{" "}
          {sections[currentSection]?.title}
        </p>
      </div>
    </div>
  );
}

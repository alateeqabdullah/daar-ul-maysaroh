// // app/(marketing)/onsite/admissions/components/ProgressIndicator.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { Section } from "../types";

// interface ProgressIndicatorProps {
//   sections: Section[];
//   currentSection: number;
//   setCurrentSection: (index: number) => void;
//   isMobile: boolean;
// }

// export function ProgressIndicator({
//   sections,
//   currentSection,
//   setCurrentSection,
//   isMobile,
// }: ProgressIndicatorProps) {
//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Progress Steps */}
//       <div className="flex items-center gap-1 mb-2">
//         {sections.map((section, idx) => {
//           const Icon = section.icon;
//           const isActive = idx === currentSection;
//           const isCompleted = idx < currentSection;

//           // Show fewer steps on mobile
//           if (isMobile && idx % 2 !== 0 && idx !== sections.length - 1)
//             return null;

//           return (
//             <button
//               key={section.id}
//               onClick={() => setCurrentSection(idx)}
//               className="flex flex-col items-center min-w-[36px] md:min-w-[50px] group flex-1"
//             >
//               <div
//                 className={cn(
//                   "w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all",
//                   isActive
//                     ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg scale-105"
//                     : isCompleted
//                       ? "bg-purple-600/40 text-purple-300"
//                       : "bg-slate-800/50 text-slate-500",
//                 )}
//               >
//                 <Icon className="w-3 h-3 md:w-4 md:h-4" />
//               </div>
//               <span
//                 className={cn(
//                   "text-[5px] md:text-[6px] font-black uppercase mt-0.5 whitespace-nowrap",
//                   isActive ? "text-amber-400" : "text-slate-500",
//                 )}
//               >
//                 {isMobile
//                   ? section.title.split(" ")[0].slice(0, 3)
//                   : section.title.split(" ")[0]}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Progress Bar */}
//       <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
//         <motion.div
//           className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
//           initial={{ width: "0%" }}
//           animate={{
//             width: `${((currentSection + 1) / sections.length) * 100}%`,
//           }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>

//       {/* Section Counter */}
//       <div className="text-center mt-2">
//         <p className="text-[10px] text-slate-500">
//           {currentSection + 1} of {sections.length} •{" "}
//           {sections[currentSection]?.title}
//         </p>
//       </div>
//     </div>
//   );
// }












// app/(marketing)/onsite/admissions/components/ProgressIndicator.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Section } from "../types";
import { CheckCircle2, ChevronRight } from "lucide-react";

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
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center gap-1 mb-3">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const isActive = idx === currentSection;
          const isCompleted = idx < currentSection;

          // Show fewer steps on mobile
          if (isMobile && idx % 2 !== 0 && idx !== sections.length - 1)
            return null;

          return (
            <motion.button
              key={section.id}
              onClick={() => setCurrentSection(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center min-w-[36px] md:min-w-[50px] group flex-1"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 relative",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-500/20"
                    : isCompleted
                    ? "bg-purple-600/60 dark:bg-purple-600/40 text-purple-300 dark:text-purple-300"
                    : "bg-muted/50 dark:bg-slate-800/50 text-muted-foreground dark:text-slate-500"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                ) : (
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                )}
                
                {/* Active Pulse Ring */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
              
              <motion.span
                className={cn(
                  "text-[5px] md:text-[6px] font-black uppercase mt-1 whitespace-nowrap transition-colors duration-300",
                  isActive
                    ? "text-purple-600 dark:text-amber-400"
                    : isCompleted
                    ? "text-purple-500 dark:text-purple-400"
                    : "text-muted-foreground dark:text-slate-500"
                )}
              >
                {isMobile
                  ? section.title.split(" ")[0].slice(0, 3)
                  : section.title.split(" ")[0]}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress Bar - Premium */}
      <div className="relative w-full h-2 bg-muted/30 dark:bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Progress Glow Effect */}
        <motion.div
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Progress Info */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-muted-foreground dark:text-slate-400 uppercase tracking-wider">
            Step {currentSection + 1}
          </span>
          <span className="text-[9px] text-muted-foreground/50 dark:text-slate-600">/</span>
          <span className="text-[9px] text-muted-foreground/50 dark:text-slate-600">
            {sections.length}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-muted-foreground/30" />
            <span className="text-[9px] text-muted-foreground/50 dark:text-slate-600">
              {Math.round(progress)}% Complete
            </span>
          </span>
        </div>
        
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-medium text-muted-foreground dark:text-slate-400 truncate max-w-[120px] sm:max-w-[200px]">
            {sections[currentSection]?.title}
          </span>
        </motion.div>
      </div>

      {/* Mobile Hint */}
      {isMobile && (
        <div className="mt-2 text-center">
          <p className="text-[8px] text-muted-foreground/50 dark:text-slate-500">
            Tap any step to navigate
          </p>
        </div>
      )}
    </div>
  );
}
// // app/(marketing)/onsite/admissions/components/NavigationButtons.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Send } from "lucide-react";

// interface NavigationButtonsProps {
//   currentSection: number;
//   totalSections: number;
//   prevSection: () => void;
//   nextSection: () => void;
//   isSubmitting: boolean;
//   isLastSection: boolean;
//   canSubmit: boolean;
// }

// export function NavigationButtons({
//   currentSection,
//   totalSections,
//   prevSection,
//   nextSection,
//   isSubmitting,
//   isLastSection,
//   canSubmit,
// }: NavigationButtonsProps) {
//   return (
//     <>
//       {/* Spacer */}
//       <div className="h-8 md:h-12" />

//       <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 pt-6 border-t-2 border-purple-800/20">
//         <Button
//           type="button"
//           onClick={prevSection}
//           disabled={currentSection === 0}
//           className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-6 w-full sm:w-auto order-2 sm:order-1"
//         >
//           <ChevronLeft className="w-4 h-4 mr-2" />
//           <span>Previous</span>
//         </Button>

//         {isLastSection ? (
//           <Button
//             type="submit"
//             disabled={!canSubmit || isSubmitting}
//             className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
//           >
//             {isSubmitting ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 Submit Application
//                 <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </>
//             )}
//           </Button>
//         ) : (
//           <Button
//             type="button"
//             onClick={nextSection}
//             className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
//           >
//             <span>Next</span>
//             <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//           </Button>
//         )}
//       </div>
//     </>
//   );
// }






// app/(marketing)/onsite/admissions/components/NavigationButtons.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentSection: number;
  totalSections: number;
  prevSection: () => void;
  nextSection: () => void;
  isSubmitting: boolean;
  isLastSection: boolean;
  canSubmit: boolean;
}

export function NavigationButtons({
  currentSection,
  totalSections,
  prevSection,
  nextSection,
  isSubmitting,
  isLastSection,
  canSubmit,
}: NavigationButtonsProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <>
      {/* Progress Indicator */}
      <div className="mt-6 mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
            Progress
          </span>
          <span className="text-[10px] font-black text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-4 md:h-6" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row justify-between gap-4 mt-2 pt-6 border-t-2 border-purple-200/20 dark:border-purple-800/20"
      >
        {/* Previous Button */}
        <Button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 0}
          className={cn(
            "rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm min-h-[48px] px-6 w-full sm:w-auto order-2 sm:order-1 transition-all duration-300",
            currentSection === 0
              ? "bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
              : "bg-card/50 hover:bg-muted/30 text-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:shadow-lg"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Previous</span>
        </Button>

        {/* Next / Submit Button */}
        {isLastSection ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-8 relative overflow-hidden"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Submit Application
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    <Sparkles className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            <Button
              type="button"
              onClick={nextSection}
              className="w-full rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group min-h-[48px] px-8 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Next Section
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Section Counter */}
      <div className="text-center mt-3">
        <p className="text-[10px] text-muted-foreground">
          Section {currentSection + 1} of {totalSections}
        </p>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="hidden sm:block text-center mt-1">
        <p className="text-[8px] text-muted-foreground/50">
          ← / → arrow keys to navigate
        </p>
      </div>
    </>
  );
}
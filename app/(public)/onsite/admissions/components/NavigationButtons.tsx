// app/(marketing)/onsite/admissions/components/NavigationButtons.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

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
  return (
    <div className="flex justify-between gap-3 mt-6 pt-5 border-t border-slate-800/50 sticky bottom-0 bg-slate-950/80 backdrop-blur-sm py-3 -mx-4 px-4 md:static md:bg-transparent md:py-0 md:mx-0 md:px-0">
      <Button
        type="button"
        onClick={prevSection}
        disabled={currentSection === 0}
        className="rounded-xl py-2.5 md:py-3 font-black text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-11 px-4 flex-1 md:flex-none"
      >
        <ChevronLeft className="w-4 h-4 mr-1 md:mr-2" />
        <span className="hidden xs:inline">Previous</span>
        <span className="xs:hidden">Back</span>
      </Button>

      {isLastSection ? (
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="rounded-xl py-2.5 md:py-3 font-black text-xs md:text-sm bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed min-h-11 px-4 flex-1 md:flex-none"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              Submit
              <Send className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1.5 md:ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={nextSection}
          className="rounded-xl py-2.5 md:py-3 font-black text-xs md:text-sm bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group min-h-11 px-4 flex-1 md:flex-none"
        >
          <span className="hidden xs:inline">Next</span>
          <span className="xs:hidden">Next</span>
          <ChevronRight className="w-4 h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
    </div>
  );
}
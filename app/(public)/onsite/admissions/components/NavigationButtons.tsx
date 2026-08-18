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
    <>
      {/* Spacer */}
      <div className="h-8 md:h-12" />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 pt-6 border-t-2 border-purple-800/20">
        <Button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 0}
          className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-6 w-full sm:w-auto order-2 sm:order-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span>Previous</span>
        </Button>

        {isLastSection ? (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextSection}
            className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </>
  );
}

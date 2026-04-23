"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  UserCheck,
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Scholarly Assessment",
    desc: "Every student begins with a private 1-on-1 assessment by our Dean to evaluate makharij and hifz level.",
    icon: UserCheck,
    tag: "Tashkhis",
    color: "purple",
  },
  {
    title: "Scholar Matching",
    desc: "Based on your assessment, the Scholarly Council assigns a teacher best suited to your recitation style.",
    icon: BookOpen,
    tag: "Tawfiq",
    color: "amber",
  },
  {
    title: "Guided Majlis",
    desc: "Enter your private digital sanctuary for live sessions. Every ayah is tracked with precision in your portal.",
    icon: GraduationCap,
    tag: "Tarbiyah",
    color: "purple",
  },
  {
    title: "Ijazah Certification",
    desc: "Undergo the final exam (Ikhtibar) to receive your verified Sanad and certification of excellence.",
    icon: Award,
    tag: "Ijazah",
    color: "amber",
  },
];

const getColorClasses = (color: string) => {
  return {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "bg-purple-600/5",
      icon: "text-purple-600",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-500/5",
      icon: "text-amber-500",
    },
  }[color];
};

export function LearningProcess() {
  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
              <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                Your Journey
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
              The Scholarly <br />
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Path.
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-xl">
              Our standardized curriculum ensures a disciplined progression from
              the basics of phonetics to the mastery of the Ten Qira'at.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid - Responsive */}
        <div className="relative grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
          {/* Connector Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/20 to-transparent -z-10" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);
            const isEven = index % 2 === 0;

            return (
              <Reveal key={step.title} delay={index * 0.1}>
                <div className="group relative">
                  {/* Step Number Background */}
                  <div className="absolute -top-4 -right-2 xs:-right-4 text-5xl xs:text-6xl sm:text-7xl font-black text-purple-600/5 dark:text-purple-400/5 pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Icon Circle */}
                    <div className="relative">
                      <div
                        className={`absolute -inset-2 ${colors.light} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      <div
                        className={cn(
                          "relative w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl xs:rounded-3xl border-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 z-10",
                          colors.border,
                          "bg-white dark:bg-slate-900",
                          "group-hover:shadow-xl",
                        )}
                      >
                        <Icon
                          className={`w-6 h-6 xs:w-7 xs:h-7 md:w-8 md:h-8 ${colors.icon}`}
                        />
                      </div>

                      {/* Step Badge */}
                      <div className="absolute -bottom-2 -right-2 xs:-bottom-3 xs:-right-3">
                        <div
                          className={cn(
                            "w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center text-white text-[8px] xs:text-[9px] font-black",
                            `bg-gradient-to-r ${colors.gradient}`,
                          )}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 xs:space-y-2">
                      <p
                        className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${colors.text}`}
                      >
                        {step.tag}
                      </p>
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] xs:text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Decorative Line on Hover */}
                    <div
                      className={cn(
                        "w-12 h-0.5 rounded-full transition-all duration-300 group-hover:w-full",
                        `bg-gradient-to-r ${colors.gradient}`,
                      )}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="text-center mt-10 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 xs:p-5 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <p className="text-xs xs:text-sm text-muted-foreground font-medium">
                Ready to begin your scholarly journey?
              </p>
              
              <button className="inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-[10px] xs:text-xs transition-all group">
                Start Your Assessment
                <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

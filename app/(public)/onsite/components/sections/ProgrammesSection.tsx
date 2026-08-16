// app/(marketing)/physical/components/sections/ProgrammesSection.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sun,
  Moon,
  Home,
  Clock,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Heart,
  Crown,
  Bed,
  Utensils,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DAY_FEATURES = [
  { icon: BookOpen, label: "Tahfeedh (Memorization)" },
  { icon: Clock, label: "Structured Daily Schedule" },
  { icon: Users, label: "Group Learning" },
  { icon: Award, label: "Tajweed & Recitation" },
  { icon: Sun, label: "Day Programme Only" },
  { icon: Home, label: "Return Home Daily" },
];

const BOARDING_FEATURES = [
  { icon: BookOpen, label: "Intensive Tahfeedh" },
  { icon: Clock, label: "Full Day Structure" },
  { icon: Users, label: "Immersive Environment" },
  { icon: Award, label: "Advanced Qira'at" },
  { icon: Moon, label: "Boarding Programme" },
  { icon: Home, label: "Live on Campus" },
  { icon: Bed, label: "On-Campus Accommodation" },
  { icon: Utensils, label: "Three Meals Daily" },
  { icon: Shield, label: "24/7 Supervision" },
];

const DAY_SCHEDULE = [
  "Morning: Qur'an Recitation & Tahfeedh",
  "Midday: Tajweed & Islamic Studies",
  "Afternoon: Revision & Arabic",
  "Evening: Return Home",
];

const BOARDING_SCHEDULE = [
  "Fajr: Tahfeedh & Muraja'ah",
  "Morning: Qur'an Recitation & Islamic Studies",
  "Afternoon: Tajweed & Arabic",
  "Evening: Revision & Personal Study",
  "Night: Qur'an Review & Rest",
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "bg-purple-50/30 dark:bg-purple-950/20",
      ring: "ring-purple-500/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      ring: "ring-amber-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function ProgrammesSection() {
  const [activeProgramme, setActiveProgramme] = useState<"day" | "boarding">(
    "day",
  );

  const features = activeProgramme === "day" ? DAY_FEATURES : BOARDING_FEATURES;
  const schedule = activeProgramme === "day" ? DAY_SCHEDULE : BOARDING_SCHEDULE;

  const dayColors = getColorStyles("purple");
  const boardingColors = getColorStyles("amber");

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 xs:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Physical Campus • Ibadan, Nigeria
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Two{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Pathways
              </span>
              <br />
              <span className="text-2xl xs:text-3xl sm:text-4xl text-muted-foreground">
                One Sacred Mission
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
             {` Choose the learning environment that best fits your family's needs
              — both rooted in Qur'anic excellence.`}
            </p>
          </Reveal>
        </div>

        {/* Programme Toggle */}
        <div className="flex justify-center mb-10 xs:mb-12">
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-purple-200 dark:border-purple-800">
            <button
              onClick={() => setActiveProgramme("day")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all",
                activeProgramme === "day"
                  ? `bg-gradient-to-r ${dayColors.gradient} text-white shadow-lg`
                  : "text-muted-foreground hover:text-purple-600",
              )}
            >
              <Sun className="w-4 h-4" />
              Day Programme
            </button>
            <button
              onClick={() => setActiveProgramme("boarding")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all",
                activeProgramme === "boarding"
                  ? `bg-gradient-to-r ${boardingColors.gradient} text-white shadow-lg`
                  : "text-muted-foreground hover:text-amber-600",
              )}
            >
              <Moon className="w-4 h-4" />
              Boarding Programme
            </button>
          </div>
        </div>

        {/* Programme Content */}
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Features */}
          <Reveal>
            <div className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 p-6 xs:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                {activeProgramme === "day" ? (
                  <Sun className="w-8 h-8 text-purple-600" />
                ) : (
                  <Moon className="w-8 h-8 text-amber-500" />
                )}
                <h3 className="text-xl xs:text-2xl font-black">
                  {activeProgramme === "day"
                    ? "Day Programme"
                    : "Boarding Programme"}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {activeProgramme === "day"
                  ? "Students attend daily classes at Daar-ul-Maysaroh and return home in the evening. Perfect for families who want structured Qur'anic education while maintaining family life."
                  : "Students live on campus in a fully immersive Qur'anic environment. Daily routines are structured around Tahfeedh, revision, Islamic studies, and personal development."}
              </p>

              <div className="space-y-3">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isEmphasis =
                    feature.label === "Intensive Tahfeedh" ||
                    feature.label === "Immersive Environment";
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 ${isEmphasis ? "text-amber-500" : "text-purple-600"} shrink-0`}
                      />
                      <span
                        className={`text-xs xs:text-sm ${isEmphasis ? "font-black text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}
                      >
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right Column - Schedule & CTA */}
          <Reveal delay={0.2}>
            <div className="bg-card rounded-xl sm:rounded-2xl border border-amber-200 dark:border-amber-800 p-6 xs:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-amber-500" />
                <h3 className="text-xl xs:text-2xl font-black">Daily Rhythm</h3>
              </div>

              <div className="space-y-3 mb-8">
                {schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-[10px] font-black text-purple-600 shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs xs:text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/physical/admissions">
                <Button className="w-full rounded-xl py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-300 group">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom Comparison */}
        <Reveal delay={0.3}>
          <div className="mt-12 xs:mt-16 text-center max-w-3xl mx-auto">
            <div className="grid xs:grid-cols-2 gap-4 p-4 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-purple-600" />
                  <span className="font-black text-sm">Day Programme</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Structured learning • Return home daily • Family life
                  maintained
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Moon className="w-4 h-4 text-amber-500" />
                  <span className="font-black text-sm">Boarding Programme</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Immersive environment • Live on campus • Full-time focus
                </p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4">
              Both programmes include Tahfeedh, Tajweed, Islamic Studies,
              Arabic, and Tarbiyah.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

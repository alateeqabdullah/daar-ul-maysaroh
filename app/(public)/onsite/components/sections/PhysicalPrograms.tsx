// app/(marketing)/physical/components/sections/PhysicalPrograms.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mic,
  Crown,
  Globe,
  Heart,
  GraduationCap,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PROGRAMS = [
  {
    id: "tahfeedh",
    title: "Tahfeedh",
    subtitle: "Quran Memorization",
    icon: BookOpen,
    color: "purple",
    description:
      "Complete Quran memorization with structured daily revision and personalized pacing.",
    features: [
      "Sabq (New Memorization)",
      "Muraja'ah (Revision)",
      "1-on-1 Sessions",
    ],
    duration: "2-5 Years",
    href: "/physical/programs/tahfeedh",
  },
  {
    id: "tajweed",
    title: "Tajweed",
    subtitle: "Scientific Recitation",
    icon: Mic,
    color: "amber",
    description:
      "Master Makharij, Sifaat, and rules of recitation with practical application.",
    features: ["Makharij & Sifaat", "Applied Practice", "Audio Analysis"],
    duration: "1-2 Years",
    href: "/physical/programs/tajweed",
  },
  {
    id: "qiraat",
    title: "Qira'aat",
    subtitle: "The Ten Recitations",
    icon: Crown,
    color: "purple",
    description:
      "Study the ten authentic Qira'at with Sanad verification and Ijazah preparation.",
    features: ["Ten Qira'at", "Sanad Verification", "Ijazah Track"],
    duration: "2-3 Years",
    href: "/physical/programs/qiraat",
  },
  {
    id: "islamic-studies",
    title: "Islamic Studies",
    subtitle: "Comprehensive Education",
    icon: GraduationCap,
    color: "amber",
    description:
      "Study Aqeedah, Fiqh, Seerah, and Hadith with authentic sources.",
    features: ["Aqeedah & Fiqh", "Seerah", "Hadith Studies"],
    duration: "Ongoing",
    href: "/physical/programs/islamic-studies",
  },
  {
    id: "arabic",
    title: "Arabic Language",
    subtitle: "Quranic Arabic",
    icon: Globe,
    color: "purple",
    description:
      "Learn classical Arabic grammar and vocabulary to understand the Quran directly.",
    features: ["Grammar (Nahw)", "Morphology (Sarf)", "Tafsir Reading"],
    duration: "1-3 Years",
    href: "/physical/programs/arabic",
  },
  {
    id: "tarbiyah",
    title: "Tarbiyah",
    subtitle: "Character Development",
    icon: Heart,
    color: "amber",
    description:
      "Cultivate Islamic manners, responsibility, and spiritual growth.",
    features: ["Akhlaq & Manners", "Discipline", "Spiritual Development"],
    duration: "Ongoing",
    href: "/physical/programs/tarbiyah",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      glow: "shadow-purple-500/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalPrograms() {
  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Premium Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-5">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Academic Excellence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                Curriculum
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Full-time programs designed for serious Quranic education
            </p>
          </div>
        </Reveal>

        {/* Premium Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {PROGRAMS.map((program, index) => {
            const Icon = program.icon;
            const colors = getColorStyles(program.color);

            return (
              <Reveal key={program.id} delay={index * 0.08}>
                <Link href={program.href}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`group relative bg-card rounded-2xl border-2 ${colors.border} hover:border-${program.color === "purple" ? "purple" : "amber"}-400 transition-all duration-500 p-7 h-full flex flex-col shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden`}
                  >
                    {/* Premium Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`}
                    />

                    {/* Premium Glow */}
                    <div
                      className={`absolute -inset-2 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`}
                    />

                    {/* Premium Corner Accent */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`}
                    />

                    {/* Number Badge - Premium */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-[10px] font-black ${colors.text} opacity-20`}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Icon with Premium Ring */}
                    <div className="relative mb-5">
                      <div
                        className={`absolute inset-0 ${program.color === "purple" ? "ring-purple-500/30" : "ring-amber-500/30"} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 rounded-2xl`}
                      />
                      <div
                        className={`relative w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}
                      >
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-black text-xl mb-0.5 group-hover:text-purple-600 transition-colors">
                      {program.title}
                    </h3>
                    <p
                      className={`text-[11px] font-black uppercase tracking-wider mb-3 ${colors.text}`}
                    >
                      {program.subtitle}
                    </p>

                    <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Premium Feature Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {program.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-[9px] font-black px-3 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Premium Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-medium">{program.duration}</span>
                      </div>
                      <span
                        className={`text-[11px] font-black ${colors.text} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        Explore
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Premium Decorative Line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                    />
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Premium Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  All programs include Ijazah certification and authentic Sanad
                </span>
              </div>
              <Link href="/physical/admissions">
                <Button className="rounded-full px-6 py-2 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all">
                  Start Your Journey
                  <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// app/(marketing)/physical/components/sections/PhysicalStudentLife.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Heart,
  Users,
  Shield,
  Globe,
  Award,
  Sparkles,
  Activity,
  Star,
  BookOpen,
  Compass,
  Crown,
  Coffee,
  Gem,
  LucideIcon,
} from "lucide-react";

// Experience Pillars Data
const EXPERIENCE_PILLARS = [
  {
    icon: Heart,
    title: "Spiritual Atmosphere",
    description:
      "Constant reminder of your Quranic purpose. Daily congregational prayers, Quran circles, and spiritual gatherings.",
    color: "purple",
    stat: "5 Daily Prayers",
  },
  {
    icon: Users,
    title: "Community & Brotherhood",
    description:
      "A supportive family-like environment where students encourage and motivate each other.",
    color: "amber",
    stat: "50+ Students",
  },
  {
    icon: Shield,
    title: "Safe & Nurturing",
    description:
      "24/7 supervision by qualified staff. A secure campus where students focus completely on their Quranic journey.",
    color: "purple",
    stat: "24/7 Supervision",
  },
  {
    icon: Crown,
    title: "Excellence Culture",
    description:
      "A culture that celebrates every milestone. From completing a Juz to achieving Ijazah.",
    color: "amber",
    stat: "Ijazah Track",
  },
  {
    icon: Compass,
    title: "Guided Growth",
    description:
      "Personal mentorship from scholars who guide students spiritually, academically, and personally.",
    color: "purple",
    stat: "1-on-1 Mentorship",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Students from diverse backgrounds united in Quranic pursuit. A rich cultural environment.",
    color: "amber",
    stat: "4+ Nationalities",
  },
];

// Activity Data
const ACTIVITIES = [
  {
    icon: Star,
    title: "Quran Circles",
    description: "Group recitation and memorization circles",
    color: "purple",
    time: "Daily",
  },
  {
    icon: BookOpen,
    title: "Tajweed Workshops",
    description: "Practical recitation improvement sessions",
    color: "amber",
    time: "Weekly",
  },
  {
    icon: Users,
    title: "Peer Review",
    description: "Students review each other's progress",
    color: "purple",
    time: "Weekly",
  },
  {
    icon: Heart,
    title: "Tazkiyah Sessions",
    description: "Spiritual development and character building",
    color: "amber",
    time: "Weekly",
  },
  {
    icon: Award,
    title: "Quran Competitions",
    description: "Friendly competition to motivate excellence",
    color: "purple",
    time: "Monthly",
  },
  {
    icon: Coffee,
    title: "Community Time",
    description: "Meals, activities, and brotherhood",
    color: "amber",
    time: "Daily",
  },
];

// Quick Stats
const STATS = [
  { value: "50+", label: "Active Students", icon: Users, color: "purple" },
  { value: "100%", label: "Certified Teachers", icon: Award, color: "amber" },
  { value: "4+", label: "Nationalities", icon: Globe, color: "purple" },
  { value: "24/7", label: "Supervision", icon: Shield, color: "amber" },
];

// Get color styles
const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      linear: "from-purple-600 to-purple-700",
      light: "bg-purple-50/30 dark:bg-purple-950/20",
      glow: "shadow-purple-500/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      linear: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      glow: "shadow-amber-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

// Animated Stat Card Component
function AnimatedStat({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}) {
  const colors = getColorStyles(color);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="text-center p-4 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all shadow-sm hover:shadow-md"
    >
      <div
        className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mx-auto mb-2`}
      >
        <Icon className={`w-5 h-5 ${colors.text}`} />
      </div>
      <div className={`text-2xl font-black ${colors.text}`}>{value}</div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}

// Activity Card Component
function ActivityCard({ icon: Icon, title, description, color, time }: { icon: LucideIcon; title: string; description: string; color: string; time: string }) {
  const colors = getColorStyles(color);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative p-5 rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all duration-300 bg-card hover:shadow-xl overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
        >
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className={`font-black text-sm ${colors.text}`}>{title}</h4>
            <span className="text-[9px] font-black text-muted-foreground/50">
              {time}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PhysicalStudentLife() {
  const [activeView, setActiveView] = useState<"pillars" | "activities">(
    "pillars",
  );

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Premium Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Gem className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                The Student Experience
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              A Journey{" "}
              <span className="bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Beyond Memorization
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Spiritual growth, community, and character development — all woven
              into the fabric of daily student life
            </p>
          </div>
        </Reveal>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <AnimatedStat {...stat} />
            </Reveal>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-purple-200 dark:border-purple-800 shadow-lg">
            <button
              onClick={() => setActiveView("pillars")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all duration-300",
                activeView === "pillars"
                  ? "bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-purple-600",
              )}
            >
              <Compass className="w-4 h-4" />
              Experience Pillars
            </button>
            <button
              onClick={() => setActiveView("activities")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all duration-300",
                activeView === "activities"
                  ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-amber-600",
              )}
            >
              <Activity className="w-4 h-4" />
              Activities & Events
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeView === "pillars" ? (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            >
              {EXPERIENCE_PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;
                const colors = getColorStyles(pillar.color);
                return (
                  <Reveal key={index} delay={index * 0.08}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`group relative bg-card rounded-2xl border-2 ${colors.border} hover:border-${pillar.color === "purple" ? "purple" : "amber"}-400 transition-all duration-500 p-6 md:p-8 shadow-md hover:shadow-2xl overflow-hidden h-full`}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`absolute -inset-2 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`}
                      />

                      {/* Icon */}
                      <div className="relative mb-5">
                        <div
                          className={`relative w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}
                        >
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className={`font-black text-xl mb-2 ${colors.text}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {pillar.description}
                      </p>

                      {/* Stat Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black ${colors.bg} ${colors.text} border ${colors.border}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {pillar.stat}
                      </div>

                      {/* Decorative Line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${colors.linear} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                      />
                    </motion.div>
                  </Reveal>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
            >
              {ACTIVITIES.map((activity, idx) => (
                <Reveal key={idx} delay={idx * 0.06}>
                  <ActivityCard {...activity} />
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Callout */}
        <Reveal delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl bg-linear-to-r from-purple-600/5 to-amber-500/5 border border-purple-200 dark:border-purple-800 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Every student is supported, valued, and encouraged to excel
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Community • Growth • Excellence</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

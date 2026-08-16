// app/(marketing)/physical/components/sections/PhysicalBoarding.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Home,
  Moon,
  Sun,
  Clock,
  Users,
  Heart,
  Shield,
  Bed,
  Utensils,
  BookOpen,
  Sparkles,
  Check,
  ArrowRight,
  Crown,
  Wifi,
  Coffee,
  Star,
  Award,
  Calendar,
  Zap,
  Target,
  Compass,
  Bath,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const BOARDING_FEATURES = [
  {
    icon: Home,
    label: "On-Campus Accommodation",
    description: "live and learn in a safe, structured environment",
    color: "purple",
  },
  {
    icon: Clock,
    label: "Full-Day Structured Routine",
    description: "4:00 AM - 9:00 PM daily, every moment is purposeful",
    color: "amber",
  },
  {
    icon: Users,
    label: "Community Living",
    description: "Learn and grow together with fellow students",
    color: "purple",
  },
  {
    icon: Heart,
    label: "Spiritual Environment",
    description: "Constant reminder of your Quranic purpose",
    color: "amber",
  },
  {
    icon: Shield,
    label: "24/7 Supervision",
    description: "Quality supervision provide round-the-clock guidance",
    color: "purple",
  },
  {
    icon: Moon,
    label: "Night Revision",
    description: "Tahajjud and night revision for deeper retention",
    color: "amber",
  },
  {
    icon: Utensils,
    label: "Nutritious Meals",
    description: "Balanced meals daily prepared with care",
    color: "purple",
  },
  {
    icon: Bed,
    label: "Comfortable Rest",
    description: "Adequate rest periods for mental clarity",
    color: "amber",
  },
];

const DAY_FEATURES = [
  {
    icon: Sun,
    label: "Weekend Intensive",
    description: "Sat-Sun: 9:00 AM - 4:30 PM",
    color: "amber",
  },
  {
    icon: Clock,
    label: "Weekday Evening",
    description: "Mon-Wed: 4:30 PM - 6:30 PM",
    color: "purple",
  },
  {
    icon: Users,
    label: "Community Learning",
    description: "Study alongside boarding students",
    color: "amber",
  },
  {
    icon: BookOpen,
    label: "All Core Subjects",
    description: "Tahfeedh, Tajweed, Islamic Studies, Arabic",
    color: "purple",
  },
  {
    icon: Zap,
    label: "Flexible Options",
    description: "Custom schedules available upon request",
    color: "amber",
  },
  {
    icon: Target,
    label: "Progress Tracking",
    description: "Regular assessments and feedback",
    color: "purple",
  },
];

// ACCURATE BOARDING SCHEDULE - 4AM - 9PM DAILY
const BOARDING_SCHEDULE = [
  { time: "4:00 AM", activity: "Tahajjud Preparation", icon: Moon },
  { time: "4:30 AM", activity: "Tahajjud Prayer", icon: Moon },
  { time: "5:00 AM", activity: "Personal Hygiene", icon: Bath },
  { time: "5:30 AM", activity: "Fajr Prayer", icon: Moon },
  { time: "6:00 AM", activity: "Adhkaar & Qir'an Classes", icon: Sun },
  { time: "8:00 AM", activity: "Morning Prep, Breakfast & Rest", icon: Utensils },
  { time: "10:00 AM", activity: "Qur'an Classes", icon: BookOpen },
  { time: "1:00 PM", activity: "Dhuhr Prayer", icon: Sun },
  { time: "2:00 PM", activity: "Lunch & Rest", icon: Utensils },
  { time: "4:00 PM", activity: "Asr Prayer", icon: Sun },
  { time: "4:30 PM", activity: "Afternoon Session", icon: BookOpen },
  { time: "7:00 PM", activity: "Maghrib Prayer, Adhkaar & Dinner", icon: Utensils },
  { time: "8:00 PM", activity: "Isha Prayer & Night Revision", icon: Moon },
  { time: "8:20 PM", activity: "Evening Revision & Review", icon: BookOpen },
  { time: "9:00 PM", activity: "Rest & Sleep", icon: Bed },
];

// ACCURATE DAY SCHEDULE
const DAY_SCHEDULE = [
  {
    day: "Saturday",
    activity: "Full Day Session",
    time: "9:00 AM - 4:30 PM",
    icon: Sun,
  },
  {
    day: "Sunday",
    activity: "Full Day Session",
    time: "9:00 AM - 4:30 PM",
    icon: Sun,
  },
  {
    day: "Monday",
    activity: "Evening Session",
    time: "4:30 PM - 6:30 PM",
    icon: Clock,
  },
  {
    day: "Tuesday",
    activity: "Evening Session",
    time: "4:30 PM - 6:30 PM",
    icon: Clock,
  },
  {
    day: "Wednesday",
    activity: "Evening Session",
    time: "4:30 PM - 6:30 PM",
    icon: Clock,
  },
  {
    day: "Thursday",
    activity: "Day Off",
    time: "Rest & Personal Study",
    icon: Bed,
  },
  {
    day: "Friday",
    activity: "Jumu'ah Prep & Review",
    time: "Flexible",
    icon: Heart,
  },
];

const FLEXIBLE_OPTIONS = [
  {
    icon: Compass,
    label: "Custom Schedule",
    description: "Tailored attendance plan to fit your needs",
    color: "purple",
  },
  {
    icon: Calendar,
    label: "Flexible Days",
    description: "Choose specific days that work for you",
    color: "amber",
  },
  {
    icon: Zap,
    label: "Hybrid Learning",
    description: "Combine day and boarding elements",
    color: "purple",
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
      light: "hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/20",
      light: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalBoarding() {
  const [activeTab, setActiveTab] = useState<"boarding" | "day">("boarding");

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Premium Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Home className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Living & Learning
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Boarding &{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Day Programmes
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the learning environment that best fits your needs
            </p>
          </div>
        </Reveal>

        {/* Premium Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-purple-200 dark:border-purple-800 shadow-lg">
            <button
              onClick={() => setActiveTab("boarding")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all duration-300",
                activeTab === "boarding"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-purple-600",
              )}
            >
              <Home className="w-4 h-4" />
              Boarding
              <span className="text-[8px] opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                4AM - 9PM Daily
              </span>
            </button>
            <button
              onClick={() => setActiveTab("day")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm transition-all duration-300",
                activeTab === "day"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-amber-600",
              )}
            >
              <Sun className="w-4 h-4" />
              Day
              <span className="text-[8px] opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                Weekends + Evenings
              </span>
            </button>
          </div>
        </div>

        {/* Premium Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left - Features */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4">
              {(activeTab === "boarding"
                ? BOARDING_FEATURES
                : DAY_FEATURES
              ).map((feature, idx) => {
                const Icon = feature.icon;
                const colors = getColorStyles(feature.color);
                return (
                  <Reveal key={idx} delay={idx * 0.04}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`group bg-card rounded-xl border ${colors.border} hover:border-${feature.color === "purple" ? "purple" : "amber"}-400 transition-all duration-300 p-5 shadow-sm hover:shadow-xl`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <h4 className={`font-black text-sm ${colors.text}`}>
                        {feature.label}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right - Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-purple-200 dark:border-purple-800 p-6 shadow-lg sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-lg">
                  {activeTab === "boarding"
                    ? "Daily Schedule (4AM - 9PM)"
                    : "Weekly Schedule"}
                </h3>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {(activeTab === "boarding"
                  ? BOARDING_SCHEDULE
                  : DAY_SCHEDULE
                ).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20 border border-border/50 hover:border-purple-200 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[10px] font-black text-purple-600">
                            {activeTab === "boarding"
                              ? item.time
                              : (item as any).day}
                          </p>
                          <span className="text-[8px] text-muted-foreground">
                            •
                          </span>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.activity}
                          </p>
                        </div>
                        {activeTab === "day" && (item as any).time && (
                          <p className="text-[9px] text-amber-500 font-bold">
                            {(item as any).time}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Schedule CTA */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <Link href="/physical/schedule">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-2.5 font-black text-xs border-purple-300 text-purple-600 hover:bg-purple-50 transition-all group"
                  >
                    View Full Schedule
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Flexible Options */}
        <Reveal delay={0.3}>
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Flexible & Custom Options
              </h3>
              <p className="text-sm text-muted-foreground">
               {` Can't find what you're looking for? We offer flexible solutions`}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {FLEXIBLE_OPTIONS.map((option, idx) => {
                const Icon = option.icon;
                const colors = getColorStyles(option.color);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className={`bg-card rounded-xl border ${colors.border} p-5 text-center group hover:shadow-lg transition-all`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <p className="font-black text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Premium Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-14 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Both programmes include Tahfeedh, Tajweed, Islamic Studies,
                  Arabic, and Tarbiyah
                </span>
              </div>
              <Link href="/physical/admissions">
                <Button className="rounded-full px-6 py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all group">
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a78bfa;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

// app/(marketing)/onsite/boarding/onsite-boarding-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Home,
  Sun,
  Moon,
  Clock,
  Users,
  Heart,
  Shield,
  Bed,
  Utensils,
  BookOpen,
  Sparkles,
  Check,
  Crown,
  Wifi,
  Coffee,
  Star,
  Award,
  Calendar,
  Zap,
  Compass,
  GraduationCap,
  Target,
  Droplet,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BOARDING_FEATURES = [
  {
    icon: Home,
    label: "On-Campus Accommodation",
    description: "Live in a safe and supportive environment with peers",
    color: "purple",
  },
  {
    icon: Clock,
    label: "Structured Daily Routine",
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
    description: "Quality supervision ensuring safety and discipline",
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

const DAILY_RHYTHM = [
  {
    time: "4:00 AM",
    activity: "Tahajjud Preparation",
    icon: Moon,
    color: "purple",
  },
  {
    time: "4:30 AM",
    activity: "Tahajjud Prayer",
    icon: Star,
    color: "amber",
  },
  {
    time: "5:00 AM",
    activity: "Personal Hygiene",
    icon: Droplet,
    color: "purple",
  },
  {
    time: "5:30 AM",
    activity: "Fajr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "6:00 AM",
    activity: "Adhkaar & Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "8:00 AM",
    activity: "Morning Prep, Breakfast & Rest",
    icon: Coffee,
    color: "amber",
  },
  {
    time: "10:00 AM",
    activity: "Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "1:00 PM",
    activity: "Dhuhr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "2:00 PM",
    activity: "Lunch & Rest",
    icon: Utensils,
    color: "purple",
  },
  {
    time: "4:00 PM",
    activity: "Asr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "4:30 PM",
    activity: "Afternoon Session",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "7:00 PM",
    activity: "Maghrib Prayer, Adhkaar & Dinner",
    icon: Utensils,
    color: "amber",
  },
  {
    time: "8:00 PM",
    activity: "Isha Prayer & Night Revision",
    icon: Moon,
    color: "purple",
  },
  {
    time: "8:20 PM",
    activity: "Evening Revision & Review",
    icon: RefreshCw,
    color: "amber",
  },
  {
    time: "9:00 PM",
    activity: "Rest & Sleep",
    icon: Bed,
    color: "purple",
  },
];

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
  return {
    purple: {
      text: "text-purple-400",
      border: "border-purple-800/30",
      bg: "bg-purple-600/20",
      gradient: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/30",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-800/30",
      bg: "bg-amber-500/20",
      gradient: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/30",
    },
  }[color] ?? {
    // fallback styles to ensure callers never receive undefined
    text: "text-slate-300",
    border: "border-slate-800/30",
    bg: "bg-slate-800/20",
    gradient: "from-slate-500 to-slate-600",
    glow: "shadow-slate-500/20",
  };
};

export default function OnsiteBoardingClient() {
  const [activeTab, setActiveTab] = useState<"boarding" | "day">("boarding");

  const features = activeTab === "boarding" ? BOARDING_FEATURES : DAY_FEATURES;
  const schedule = activeTab === "boarding" ? BOARDING_SCHEDULE : DAY_SCHEDULE;

  return (
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-8 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">Boarding</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
                <Home className="w-4 h-4" />
                Living & Learning
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Boarding &{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Day Programmes
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
               {` Choose the learning environment that best fits your needs — both
                rooted in Qur'anic excellence.`}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== TAB TOGGLE ===== */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <button
              onClick={() => setActiveTab("boarding")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all flex items-center gap-2",
                activeTab === "boarding"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-slate-400 hover:text-white",
              )}
            >
              <Moon className="w-4 h-4" />
              Boarding
            </button>
            <button
              onClick={() => setActiveTab("day")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all flex items-center gap-2",
                activeTab === "day"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white",
              )}
            >
              <Sun className="w-4 h-4" />
              Day Programme
            </button>
          </div>
        </div>

        {/* ===== FEATURES GRID ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = getColorStyles(feature.color);
            return (
              <Reveal key={idx} delay={idx * 0.04}>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-900/30 transition-all group">
                  <div
                    className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h4 className={`font-black text-sm ${colors.text}`}>
                      {feature.label}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ===== SCHEDULE ===== */}
        <section className="py-6 md:py-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {activeTab === "boarding"
                    ? "Daily Schedule (4AM - 9PM)"
                    : "Weekly Schedule"}
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto">
            {schedule.map((item, idx) => {
              const Icon = item.icon;
              const isBoarding = activeTab === "boarding";
              return (
                <Reveal key={idx} delay={idx * 0.03}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/30 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[10px] font-black text-purple-400">
                          {isBoarding ? item.time : (item as any).day}
                        </p>
                        <span className="text-[8px] text-slate-500">•</span>
                        <p className="text-xs text-slate-300 truncate">
                          {item.activity}
                        </p>
                      </div>
                      {!isBoarding && (item as any).time && (
                        <p className="text-[9px] text-amber-400 font-bold">
                          {(item as any).time}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== FLEXIBLE OPTIONS ===== */}
        <section className="py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Flexible Options
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Need a Custom Schedule?
              </h2>
              <p className="text-slate-400 mt-2">
                We offer flexible solutions to fit your needs
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {FLEXIBLE_OPTIONS.map((option, idx) => {
              const Icon = option.icon;
              const colors = getColorStyles(option.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className={`font-black text-lg ${colors.text}`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {option.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/onsite/contact">
              <Button className="rounded-full px-6 py-3 font-black text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all">
                Contact Us for Custom Schedule
                <ArrowRight className="w-3.5 h-3.5 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ===== TRUST BADGE ===== */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Crown className="w-4 h-4 text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-purple-400" />
              Full-Time Program
            </span>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Ready to Begin?
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Choose your programme and start your journey to Quranic
                excellence.
              </p>
              <Link href="/onsite/admissions">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}

// app/(marketing)/onsite/student-life/onsite-student-life-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Award,
  Bed,
  BookOpen,
  Calendar,
  Clock,
  Coffee,
  Crown,
  Droplet,
  Globe,
  GraduationCap,
  Heart,
  Moon,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Sun,
  Users,
  Utensils
} from "lucide-react";
import Link from "next/link";

const DAILY_ROUTINE = [
  {
    icon: Moon,
    title: "Tahajjud Preparation",
    description: "Begin the day with spiritual preparation and night prayer",
    time: "4:00 AM",
    color: "purple",
  },
  {
    icon: Star,
    title: "Tahajjud Prayer",
    description: "Voluntary night prayer for spiritual elevation",
    time: "4:30 AM",
    color: "amber",
  },
  {
    icon: Droplet,
    title: "Personal Hygiene",
    description: "Purification and preparation for the day",
    time: "5:00 AM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Fajr Prayer",
    description: "Begin the day with dawn prayer and remembrance",
    time: "5:30 AM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Adhkaar & Qur'an Classes",
    description: "Morning supplications and focused Qur'an learning",
    time: "6:00 AM",
    color: "purple",
  },
  {
    icon: Coffee,
    title: "Prep, Breakfast & Rest",
    description: "Nutritious meal to fuel the day's learning",
    time: "8:00 AM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Qur'an Classes",
    description: "Deep dive into Qur'anic studies and guidance",
    time: "10:00 AM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Dhuhr Prayer",
    description: "Midday prayer and spiritual reset",
    time: "1:00 PM",
    color: "amber",
  },
  {
    icon: Utensils,
    title: "Lunch & Rest",
    description: "Recharge for the afternoon sessions",
    time: "2:00 PM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Asr Prayer",
    description: "Afternoon prayer and reflection",
    time: "4:00 PM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Afternoon Session",
    description: "Focused memorization and review",
    time: "4:30 PM",
    color: "purple",
  },
  {
    icon: Utensils,
    title: "Maghrib, Adhkaar & Dinner",
    description: "Evening prayer, remembrance, and meal",
    time: "7:00 PM",
    color: "amber",
  },
  {
    icon: Moon,
    title: "Isha Prayer & Night Revision",
    description: "Night prayer and evening review",
    time: "8:00 PM",
    color: "purple",
  },
  {
    icon: RefreshCw,
    title: "Evening Revision & Review",
    description: "Reinforce memorized portions with practice",
    time: "8:20 PM",
    color: "amber",
  },
  {
    icon: Bed,
    title: "Rest & Sleep",
    description: "Prepare for another day of learning",
    time: "9:00 PM",
    color: "purple",
  },
];

const CAMPUS_LIFE = [
  {
    icon: Users,
    title: "Community Living",
    description: "Brotherhood/sisterhood environment fostering mutual support",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Daily Tazkiyah sessions and character development",
    color: "amber",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "24/7 supervision and secure campus",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Diverse Community",
    description: "Students from various backgrounds united in Quranic pursuit",
    color: "amber",
  },
];

const ACTIVITIES = [
  { icon: Star, label: "Daily Congregational Prayers", color: "purple" },
  { icon: Users, label: "Quran Circles (Halaqaat)", color: "amber" },
  { icon: BookOpen, label: "Tajweed Practice Sessions", color: "purple" },
  { icon: Calendar, label: "Islamic Lectures & Workshops", color: "amber" },
  { icon: Activity, label: "Sports & Recreation", color: "purple" },
  { icon: Heart, label: "Community Service Projects", color: "amber" },
  { icon: Award, label: "Quran Competitions", color: "purple" },
  { icon: Globe, label: "Guest Scholar Visits", color: "amber" },
];

const getColorStyles = (color: string) => {
  return {
    purple: {
      text: "text-purple-400",
      border: "border-purple-800/30",
      bg: "bg-purple-600/20",
      linear: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/30",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-800/30",
      bg: "bg-amber-500/20",
      linear: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/30",
    },
  }[color];
};

export default function OnsiteStudentLifeClient() {
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
          <span className="text-amber-500">Student Life</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
                <Activity className="w-4 h-4" />
                Daily Life
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                A Day in the{" "}
                <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Life
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
                A structured daily routine designed for optimal learning,
                growth, and spiritual development in a supportive community.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== DAILY ROUTINE ===== */}
        <section className="py-6 md:py-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Daily Rhythm
                </span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                From Fajr to Isha
              </h2>
              <p className="text-slate-400 mt-2">Every moment is purposeful</p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {DAILY_ROUTINE.map((item, idx) => {
              const Icon = item.icon;
              const colors =
                getColorStyles(item.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
              const isPurple = item.color === "purple";
              return (
                <Reveal key={idx} delay={idx * 0.03}>
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-[10px] font-black ${colors.text}`}>
                          {item.time}
                        </p>
                        <span className="text-[8px] text-slate-500">•</span>
                        <h3 className="font-black text-sm text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== CAMPUS LIFE ===== */}
        <section className="py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Campus Life
                </span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                More Than Just Memorization
              </h2>
              <p className="text-slate-400 mt-2">
                A holistic environment for growth
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {CAMPUS_LIFE.map((feature, idx) => {
              const Icon = feature.icon;
              const colors =
                getColorStyles(feature.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className={`font-black text-lg ${colors.text}`}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== ACTIVITIES ===== */}
        <section className="py-12 md:py-16 border-t border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Activities & Events
                </span>
                <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Beyond the Classroom
              </h2>
              <p className="text-slate-400 mt-2">
                Building community through shared experiences
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {ACTIVITIES.map((activity, idx) => {
              const Icon = activity.icon;
              const colors = getColorStyles(activity.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">
                      {activity.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== TRUST BADGE ===== */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-purple-400" />
              Safe & Supervised
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Heart className="w-4 h-4 text-amber-400" />
              Spiritual Environment
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Users className="w-4 h-4 text-purple-400" />
              Supportive Community
            </span>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-linear-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Ready to Join Our Community?
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Experience the transformative power of immersive Quran
                memorization.
              </p>
              <Link href="/onsite/admissions">
                <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
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

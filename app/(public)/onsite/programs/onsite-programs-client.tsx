// app/(marketing)/onsite/programs/onsite-programs-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Crown,
    Globe,
    GraduationCap,
    Heart,
    Moon,
    Shield,
    Star,
    Sun,
    Target,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ATTENDANCE_OPTIONS = [
  {
    id: "part-time-day",
    title: "Part-Time Day",
    icon: Sun,
    color: "amber",
    schedule: "Sat - Sun",
    time: "9:00 AM - 4:30 PM",
    badge: "Weekend",
    description:
      "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments.",
    features: [
      "2 days per week",
      "Full academic program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
  },
  {
    id: "full-time-day",
    title: "Full-Time Day",
    icon: Sun,
    color: "purple",
    schedule: "Sat - Sun & Mon - Wed",
    time: "Sat-Sun: 9-4:30 • Mon-Wed: 4:30-6:30",
    badge: "Most Popular",
    description:
      "Ideal for students seeking a comprehensive program with extended learning hours.",
    features: [
      "5 days per week",
      "Extended learning hours",
      "Complete curriculum",
      "Accelerated progress",
    ],
  },
  {
    id: "part-time-boarding",
    title: "Part-Time Boarding",
    icon: Moon,
    color: "amber",
    schedule: "Fri - Sun",
    time: "Fri 4:30PM - Sun 4:30PM",
    badge: "Weekend Intensive",
    description:
      "Weekend immersion with on-campus accommodation, perfect for out-of-town students.",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community experience",
    ],
  },
  {
    id: "full-time-boarding",
    title: "Full-Time Boarding",
    icon: Moon,
    color: "purple",
    schedule: "Daily",
    time: "Full-time residential",
    badge: "Premium",
    description:
      "Complete immersion in the Quranic environment with 24/7 supervision and support.",
    features: [
      "Full-time campus living",
      "Immersive environment",
      "24/7 supervision",
      "Accelerated memorization",
    ],
  },
];

const FLEXIBLE_OPTIONS = [
  {
    title: "Custom Schedule",
    description: "Tailored attendance plan to fit your family's needs",
    icon: Calendar,
    color: "purple",
  },
  {
    title: "Flexible Days",
    description: "Choose specific days that work for you",
    icon: Zap,
    color: "amber",
  },
  {
    title: "Hybrid Learning",
    description: "Combine day and boarding elements",
    icon: Target,
    color: "purple",
  },
];

const CURRICULUM = [
  {
    title: "Tahfeedh",
    subtitle: "Quran Memorization",
    description:
      "Complete Quran memorization with structured daily revision (Muraja'ah) and personalized pacing.",
    icon: BookOpen,
    color: "purple",
    features: [
      "Sabq (New Memorization)",
      "Muraja'ah (Revision)",
      "1-on-1 Sessions",
    ],
    duration: "2-5 Years",
  },
  {
    title: "Tajweed",
    subtitle: "Scientific Recitation",
    description:
      "Master Makharij, Sifaat, and rules of recitation with practical application and audio analysis.",
    icon: Crown,
    color: "amber",
    features: ["Makharij & Sifaat", "Applied Practice", "Audio Analysis"],
    duration: "1-2 Years",
  },
  {
    title: "Qira'aat",
    subtitle: "The Ten Recitations",
    description:
      "Study the ten authentic Qira'at with Sanad verification and Ijazah preparation.",
    icon: Star,
    color: "purple",
    features: ["Ten Qira'at", "Sanad Verification", "Ijazah Track"],
    duration: "2-3 Years",
  },
  {
    title: "Islamic Studies",
    subtitle: "Comprehensive Education",
    description:
      "Study Aqeedah, Fiqh, Seerah, and Hadith with authentic sources and scholarly methodology.",
    icon: Shield,
    color: "amber",
    features: ["Aqeedah & Fiqh", "Seerah", "Hadith Studies"],
    duration: "Ongoing",
  },
  {
    title: "Arabic Language",
    subtitle: "Quranic Arabic",
    description:
      "Learn classical Arabic grammar and vocabulary to understand the Quran directly.",
    icon: Globe,
    color: "purple",
    features: ["Grammar (Nahw)", "Morphology (Sarf)", "Tafsir Reading"],
    duration: "1-3 Years",
  },
  {
    title: "Tarbiyah",
    subtitle: "Character Development",
    description:
      "Cultivate Islamic manners, responsibility, and spiritual growth through daily practice.",
    icon: Heart,
    color: "amber",
    features: ["Akhlaq & Manners", "Discipline", "Spiritual Development"],
    duration: "Ongoing",
  },
];

const getColorStyles = (color: string) => {
  const map = {
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
  } as const;

  // Return a safe default (purple) if an unknown color is provided
  return map[color as keyof typeof map] ?? map.purple;
};

export default function OnsiteProgramsClient() {
  const [activeTab, setActiveTab] = useState<"attendance" | "curriculum">(
    "attendance",
  );

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
          <span className="text-amber-500">Programs</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4" />
                Our Programs
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Your{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Path
                </span>{" "}
                to Memorization
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
                Choose from flexible attendance options and a comprehensive
                curriculum designed for full-time Quran memorization.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== TAB TOGGLE ===== */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <button
              onClick={() => setActiveTab("attendance")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeTab === "attendance"
                  ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white",
              )}
            >
              Attendance Options
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeTab === "curriculum"
                  ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white",
              )}
            >
              Curriculum
            </button>
          </div>
        </div>

        {/* ===== ATTENDANCE OPTIONS ===== */}
        {activeTab === "attendance" && (
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {ATTENDANCE_OPTIONS.map((option, index) => {
              const Icon = option.icon;
              const colors = getColorStyles(option.color);
              const isPurple = option.color === "purple";
              return (
                <Reveal key={option.id} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="font-black text-white text-lg">
                            {option.title}
                          </h3>
                          <p className={`text-xs font-black ${colors.text}`}>
                            {option.schedule}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[8px] font-black ${colors.bg} ${colors.text}`}
                      >
                        {option.badge}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 mb-4">
                      {option.description}
                    </p>
                    <p className={`text-xs font-bold ${colors.text} mb-3`}>
                      {option.time}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${colors.text} shrink-0`}
                          />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/onsite/admissions">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl py-2.5 font-black text-xs border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                      >
                        Apply Now
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
                      </Button>
                    </Link>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* ===== CURRICULUM ===== */}
        {activeTab === "curriculum" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {CURRICULUM.map((subject, index) => {
              const Icon = subject.icon;
              const colors = getColorStyles(subject.color);
              const isPurple = subject.color === "purple";
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 transition-all group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="font-black text-white text-lg">
                      {subject.title}
                    </h3>
                    <p
                      className={`text-xs font-black uppercase tracking-wider ${colors.text} mb-2`}
                    >
                      {subject.subtitle}
                    </p>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {subject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {subject.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-[8px] font-black px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{subject.duration}</span>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* ===== FLEXIBLE OPTIONS ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
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
                Can't find what you're looking for?
              </h2>
              <p className="text-slate-400 mt-2">
                We offer custom solutions to fit your needs
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
                      {option.title}
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

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Ready to Start Your Journey?
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Choose your attendance option and begin your path to Quranic
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

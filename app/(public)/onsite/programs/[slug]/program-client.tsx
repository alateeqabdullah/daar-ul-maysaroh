// app/(marketing)/onsite/programs/[slug]/program-client.tsx
"use client";

import { Button } from "@/components/ui/button";
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
  Users,
  Award,
  Sparkles,
  ChevronRight,
  Quote,
  ChevronDown,
  Check,
  Zap,
  Compass,
  BarChart3,
  MessageCircle,
  TrendingUp,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Map icon strings to components
const ICON_MAP: Record<string, any> = {
  Moon: Moon,
  Sun: Sun,
};

// ============================================================
// COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// ============================================================

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/30",
      bg: "bg-purple-100 dark:bg-purple-600/20",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
      gradient:
        "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
      glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
      ring: "ring-purple-500/30",
    },
    amber: {
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/30",
      bg: "bg-amber-100 dark:bg-amber-500/20",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      gradient:
        "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
      glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
      hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
      ring: "ring-amber-500/30",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

// ============================================================
// ANIMATED COUNTER
// ============================================================

function AnimatedCounter({ value, suffix = "", prefix = "" }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const target = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ============================================================
// STATIC PARTICLES - NO ANIMATION ISSUES
// ============================================================

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + i * 8}%`,
            animation: `float-particle ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-40px)
              translateX(${Math.random() > 0.5 ? "20px" : "-20px"});
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ProgramClient({ program }: { program: any }) {
  const Icon = ICON_MAP[program.icon] || BookOpen;
  const colors = getColorStyles(program.color);
  const isPurple = program.color === "purple";
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enrollment countdown (example)
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 18,
    minutes: 34,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll effect for sticky elements
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Program benefits data
  const PROGRAM_BENEFITS = [
    {
      icon: Users,
      title: "Personalized Attention",
      description:
        "Small class sizes ensure every student gets individual focus",
    },
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description:
        "Proven methodology for effective memorization and retention",
    },
    {
      icon: Award,
      title: "Ijazah Certification",
      description: "Formal certification with authentic Sanad chain",
    },
    {
      icon: Heart,
      title: "Spiritual Environment",
      description: "Nurturing atmosphere that fosters love for the Quran",
    },
  ];

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[150px]" />
        <FloatingParticles />
      </div>

      {/* Sticky Navigation */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-border shadow-lg"
            : "opacity-0 -translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg ${colors.lightBg} flex items-center justify-center`}
              >
                <Icon className={`w-4 h-4 ${colors.text}`} />
              </div>
              <span className="font-black text-sm text-foreground">
                {program.title}
              </span>
            </div>
            <Link href="/onsite/admissions">
              <Button className="rounded-full px-5 py-2 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 text-white">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div
        className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10"
        ref={containerRef}
      >
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-purple-600 dark:hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href="/onsite/programs"
            className="hover:text-purple-600 dark:hover:text-amber-500 transition-colors"
          >
            Programs
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600 dark:text-amber-500">
            {program.title}
          </span>
        </nav>

        {/* ===== HERO - ULTRA PREMIUM ===== */}
        <section className="py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Column */}
            <div className="space-y-8">
              {/* Badge Row */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-2xl ${colors.glow}`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black ${colors.lightBg} ${colors.text} border ${colors.border}`}
                >
                  {program.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                  🔥 Limited Slots
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.05] text-foreground"
              >
                {program.title}
                <span
                  className={`block text-2xl md:text-3xl font-bold ${colors.text} mt-2`}
                >
                  {program.subtitle}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {program.description}
              </motion.p>

              {/* Quick Info Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Clock className={`w-4 h-4 ${colors.text} mb-1`} />
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-black text-sm text-foreground">
                    {program.duration}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Target className={`w-4 h-4 ${colors.text} mb-1`} />
                  <p className="text-xs text-muted-foreground">Level</p>
                  <p className="font-black text-sm text-foreground">
                    {program.level}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <Calendar className={`w-4 h-4 ${colors.text} mb-1`} />
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p className="font-black text-sm text-foreground truncate">
                    {program.attendance}
                  </p>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-10 py-6 font-black text-base bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#overview">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 font-black text-base border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all group"
                  >
                    Explore Program
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Premium Cards */}
            <div className="space-y-5">
              {/* Enrollment Countdown - Premium */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 via-purple-600/10 to-amber-500/10 dark:from-purple-600/30 dark:via-purple-600/20 dark:to-amber-500/20 border border-purple-200 dark:border-purple-800/30"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-amber-500/10 rounded-full blur-2xl" />
                <p className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Enrollment Closes In
                </p>
                <div className="flex gap-4">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl md:text-3xl font-black text-foreground tabular-nums bg-card/50 px-3 py-1 rounded-lg min-w-[50px]">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[8px] font-black text-muted-foreground uppercase tracking-wider mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Who It's For */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                  <p className="font-black text-foreground text-sm">
                    Perfect For
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {program.whoIsItFor.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="w-3 h-3 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Outcomes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <p className="font-black text-foreground text-sm">
                    What You'll Achieve
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {program.outcomes.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="w-3 h-3 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Teacher-Student Ratio - Premium Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                      Teacher-Student Ratio
                    </p>
                    <p className="text-3xl font-black text-foreground">
                      1:{program.ratio || "4"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Personalized attention guaranteed
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-amber-500" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ===== OVERVIEW SECTION ===== */}
        <section id="overview" className="py-12 md:py-16 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 rounded-xl ${colors.lightBg} flex items-center justify-center`}
              >
                <Gem className={`w-5 h-5 ${colors.text}`} />
              </div>
              <h2 className="text-3xl font-black text-foreground">
                Program Overview
              </h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {program.detailedDescription.split("\n\n")[0]}
              </p>
            </div>
          </motion.div>
        </section>

        {/* ===== BENEFITS ===== */}
        <section className="py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <Zap
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-3xl font-black text-foreground">
                Why Choose This Program
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {PROGRAM_BENEFITS.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${colors.lightBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className="font-black text-foreground text-sm">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ===== DAILY SCHEDULE - Premium Timeline ===== */}
        {program.schedule && program.schedule.length > 0 && (
          <section className="py-12 md:py-16 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-8">
                <Clock
                  className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
                />
                <h2 className="text-3xl font-black text-foreground">
                  Typical Day
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 dark:from-purple-600 dark:via-amber-500 dark:to-purple-600 hidden sm:block" />
                <div className="space-y-4">
                  {program.schedule.map((item: string, i: number) => {
                    const [time, ...activityParts] = item.split(" - ");
                    const activity = activityParts.join(" - ");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4 sm:gap-6 pl-0 sm:pl-12 relative"
                      >
                        <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-2 border-purple-200 dark:border-purple-800/30 items-center justify-center z-10">
                          <div
                            className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-purple-600 dark:bg-purple-400" : "bg-amber-600 dark:bg-amber-400"}`}
                          />
                        </div>
                        <div className="sm:w-28 shrink-0 text-right hidden sm:block">
                          <p className="text-xs font-black text-amber-600 dark:text-amber-400">
                            {time}
                          </p>
                        </div>
                        <div className="flex-1 p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all">
                          <p className="text-sm text-foreground">{activity}</p>
                          <p className="text-[10px] text-muted-foreground/50 sm:hidden mt-1">
                            {time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ===== CURRICULUM ===== */}
        <section className="py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <BookOpen
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-3xl font-black text-foreground">
                Curriculum
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {program.curriculum.map((subject: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <span className="text-foreground font-medium">{subject}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-12 md:py-16 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-3xl font-black text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {(
                program.faqs || [
                  {
                    q: `What is the duration of the ${program.title} programme?`,
                    a: `The ${program.title} programme typically takes ${program.duration}. However, the duration can vary based on individual pace and commitment.`,
                  },
                  {
                    q: `What level of Quran knowledge is required?`,
                    a: `This programme is suitable for ${program.level}. Students of all levels are welcome and will be placed according to their current ability.`,
                  },
                  {
                    q: `How is progress measured in this programme?`,
                    a: `Progress is measured through regular assessments, milestone achievements, and teacher feedback. Students receive personalized guidance throughout their journey.`,
                  },
                ]
              ).map((faq: any, i: number) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-muted/20 dark:hover:bg-slate-800/30 transition"
                    >
                      <span className="font-black text-sm text-foreground">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ===== CTA - ULTRA PREMIUM ===== */}
        <section className="py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto text-center p-10 md:p-16 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/10 via-purple-600/5 to-amber-500/10 dark:from-purple-600/20 dark:via-purple-600/10 dark:to-amber-500/20 border border-purple-200 dark:border-purple-800/30"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Ready to Join {program.title}?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Begin your journey to Quranic excellence today. Limited spots
                available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-10 py-6 font-black text-lg bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/onsite/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-10 py-6 font-black text-lg border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all group"
                  >
                    Talk to Advisor
                    <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Free 20-minute assessment • No commitment • Limited slots
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

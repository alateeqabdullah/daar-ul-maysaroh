// app/(marketing)/onsite/programs/[slug]/program-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
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
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
// SIMPLE FLOATING PARTICLES - WITHOUT repeat: Infinity
// ============================================================

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
          animate={{
            y: [0, -80],
            x: [0, i % 2 === 0 ? 40 : -40],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 10}%`,
            top: `${20 + i * 8}%`,
          }}
        />
      ))}
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

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
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

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className={`w-14 h-14 rounded-2xl ${colors.lightBg} flex items-center justify-center shadow-lg ${colors.glow}`}
                >
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black ${colors.lightBg} ${colors.text}`}
                >
                  {program.badge}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.1] text-foreground">
                {program.title}
              </h1>
              <p className={`text-lg font-black ${colors.text}`}>
                {program.subtitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {program.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                  {program.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {program.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                  {program.attendance}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/onsite/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all group"
                  >
                    Contact Us
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-4">
              {/* Who It's For */}
              <div className="p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all">
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
              </div>

              {/* Outcomes */}
              <div className="p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all">
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
              </div>

              {/* Teacher-Student Ratio */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                      Teacher-Student Ratio
                    </p>
                    <p className="text-2xl font-black text-foreground">
                      1:{program.ratio || "4"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Personalized attention
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== PROGRAM HIGHLIGHTS ===== */}
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-2xl font-black text-foreground">
                Program Highlights
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {program.highlights?.map((highlight: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${colors.lightBg} flex items-center justify-center`}
                  >
                    <Star className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <span className="text-sm text-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== DETAILED DESCRIPTION ===== */}
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-black text-foreground mb-4">
              About This Programme
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {program.detailedDescription
                .split("\n\n")
                .map((paragraph: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
            </div>
          </motion.div>
        </section>

        {/* ===== DAILY SCHEDULE ===== */}
        {program.schedule && program.schedule.length > 0 && (
          <section className="py-8 md:py-12 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock
                  className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
                />
                <h2 className="text-2xl font-black text-foreground">
                  Typical Day
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 dark:from-purple-600 dark:via-amber-500 dark:to-purple-600 hidden md:block" />
                <div className="space-y-3">
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
                        className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pl-0 md:pl-12 relative"
                      >
                        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card border border-purple-200 dark:border-purple-800/30 flex items-center justify-center">
                          <div
                            className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-purple-600 dark:bg-purple-400" : "bg-amber-600 dark:bg-amber-400"}`}
                          />
                        </div>
                        <div className="md:w-32 shrink-0">
                          <p className="text-xs font-black text-amber-600 dark:text-amber-400">
                            {time}
                          </p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all">
                          <p className="text-sm text-foreground">{activity}</p>
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
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-2xl font-black text-foreground">
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
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${colors.lightBg} flex items-center justify-center`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <span className="text-foreground font-medium">{subject}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== LEARNING MILESTONES ===== */}
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-2xl font-black text-foreground">
                Learning Milestones
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.milestones?.map(
                (
                  milestone: { phase: string; description: string },
                  i: number,
                ) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 rounded-full ${colors.lightBg} flex items-center justify-center`}
                      >
                        <span
                          className={`text-[10px] font-black ${colors.text}`}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <p className="font-black text-foreground text-sm">
                        {milestone.phase}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground ml-8">
                      {milestone.description}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        {program.testimonials && program.testimonials.length > 0 && (
          <section className="py-8 md:py-12 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-6">
                <Quote
                  className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
                />
                <h2 className="text-2xl font-black text-foreground">
                  Student Stories
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.testimonials.map(
                  (
                    testimonial: {
                      name: string;
                      role: string;
                      content: string;
                    },
                    i: number,
                  ) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                    >
                      <Quote
                        className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"} opacity-30 mb-2`}
                      />
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="font-black text-foreground text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </section>
        )}

        {/* ===== FAQ ===== */}
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-2xl font-black text-foreground">
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
                      className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-muted/20 dark:hover:bg-slate-800/30 transition"
                    >
                      <span className="font-black text-sm text-foreground">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform shrink-0",
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
                        <div className="px-4 pb-4">
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

        {/* ===== APPLICATION PROCESS ===== */}
        <section className="py-8 md:py-12 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <Compass
                className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
              />
              <h2 className="text-2xl font-black text-foreground">
                How to Apply
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Submit Application",
                  desc: "Complete online application form",
                },
                {
                  step: "02",
                  title: "Assessment",
                  desc: "Level evaluation with scholars",
                },
                {
                  step: "03",
                  title: "Enrollment",
                  desc: "Complete registration process",
                },
                {
                  step: "04",
                  title: "Begin Journey",
                  desc: "Start your Quranic path",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${colors.lightBg} flex items-center justify-center mx-auto mb-2`}
                  >
                    <span className={`text-sm font-black ${colors.text}`}>
                      {item.step}
                    </span>
                  </div>
                  <p className="font-black text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== RELATED PROGRAMS ===== */}
        {program.relatedPrograms && program.relatedPrograms.length > 0 && (
          <section className="py-8 md:py-12 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp
                  className={`w-5 h-5 ${isPurple ? "text-purple-600 dark:text-purple-400" : "text-amber-600 dark:text-amber-400"}`}
                />
                <h2 className="text-2xl font-black text-foreground">
                  You Might Also Like
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.relatedPrograms.map(
                  (
                    related: {
                      title: string;
                      slug: string;
                      description: string;
                    },
                    i: number,
                  ) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/onsite/programs/${related.slug}`}>
                        <div className="p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group">
                          <h3 className="font-black text-foreground text-sm group-hover:text-purple-600 dark:group-hover:text-amber-500 transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {related.description}
                          </p>
                          <div className="mt-2 text-xs font-black text-amber-600 dark:text-amber-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Learn More
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </section>
        )}

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-black text-foreground mb-3">
              Ready to Join {program.title}?
            </h2>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Begin your journey to Quranic excellence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onsite/admissions">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/onsite/contact">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-4 font-black border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all group"
                >
                  Talk to Advisor
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

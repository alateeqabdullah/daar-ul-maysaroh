// app/(marketing)/onsite/programs/[slug]/program-client.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,

  Moon,  Star,
  Sun,
  Target,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  Quote,
  ChevronDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Map icon strings to components
const ICON_MAP: Record<string, any> = {
  Moon: Moon,
  Sun: Sun,
};

// ============================================================
// COLOR STYLES
// ============================================================

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/30",
      bg: "bg-purple-100 dark:bg-purple-600/20",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
      gradient:
        "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
      glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
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
// FLOATING PARTICLES - Fixed without repeat: Infinity
// ============================================================

function FloatingParticles({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
          animate={{
            y: [0, -80 + i * 5],
            x: [0, (i % 2 === 0 ? 40 : -40) + i * 2],
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen">
      {/* ===== HERO WITH ANIMATED BACKGROUND ===== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24 md:pt-28"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${isPurple ? "from-purple-600/20 via-purple-500/10 to-transparent" : "from-amber-500/20 via-amber-400/10 to-transparent"} dark:opacity-50`}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl ${isPurple ? "bg-purple-500/20" : "bg-amber-500/20"}`}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
            className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl ${isPurple ? "bg-purple-400/20" : "bg-amber-400/20"}`}
          />
        </div>

        {/* Floating Orbs - Fixed without repeat: Infinity */}
        <div
          className={`absolute top-20 left-10 w-4 h-4 rounded-full ${isPurple ? "bg-purple-500/30" : "bg-amber-500/30"} blur-sm`}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          />
        </div>
        <div
          className={`absolute top-40 right-20 w-6 h-6 rounded-full ${isPurple ? "bg-purple-400/20" : "bg-amber-400/20"} blur-md`}
        >
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="w-full h-full"
          />
        </div>
        <div
          className={`absolute bottom-32 left-1/4 w-3 h-3 rounded-full ${isPurple ? "bg-purple-600/20" : "bg-amber-600/20"} blur-sm`}
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="w-full h-full"
          />
        </div>

        <FloatingParticles count={6} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-12"
        >
          <div className="max-w-6xl mx-auto">
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

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-2xl ${colors.glow}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black ${colors.lightBg} ${colors.text} border ${colors.border}`}
                  >
                    {program.badge}
                  </motion.span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] text-foreground"
                >
                  {program.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xl font-black ${colors.text}`}
                >
                  {program.subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {program.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border">
                    <Clock className={`w-4 h-4 ${colors.text}`} />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border">
                    <Target className={`w-4 h-4 ${colors.text}`} />
                    {program.level}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border">
                    <Calendar className={`w-4 h-4 ${colors.text}`} />
                    {program.attendance}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3 pt-2"
                >
                  <Link href="/onsite/admissions">
                    <Button className="rounded-full px-10 py-6 font-black text-lg bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Apply Now
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </Button>
                  </Link>
                  <Link href="/onsite/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-10 py-6 font-black text-lg border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
                    >
                      <span className="flex items-center">
                        Contact Us
                        <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right - Sidebar Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-5"
              >
                {/* Who It's For */}
                <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${colors.lightBg} flex items-center justify-center`}
                      >
                        <Users className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <p className="font-black text-foreground">Perfect For</p>
                    </div>
                    <ul className="space-y-2">
                      {program.whoIsItFor.map((item: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            className={`w-4 h-4 ${colors.text} mt-0.5 shrink-0`}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outcomes */}
                <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-400/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <p className="font-black text-foreground">
                        What You'll Achieve
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {program.outcomes.map((item: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ratio - Glass Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative p-6 rounded-2xl bg-gradient-to-r from-purple-50/50 to-amber-50/50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-full blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                        Teacher-Student Ratio
                      </p>
                      <p className="text-3xl font-black text-foreground">
                        1:{program.ratio || "4"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Personalized attention
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-xl">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
              Explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-purple-300 dark:border-purple-600/30 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-1.5 h-1.5 rounded-full ${colors.text}`}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== PROGRAM HIGHLIGHTS ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
              />
              <h2 className="text-2xl font-black text-foreground">
                Program Highlights
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {program.highlights?.map((highlight: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Star className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {highlight}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== DETAILED DESCRIPTION ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
              />
              <h2 className="text-2xl font-black text-foreground">
                About This Programme
              </h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {program.detailedDescription
                .split("\n\n")
                .map((paragraph: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== DAILY SCHEDULE ===== */}
      {program.schedule && program.schedule.length > 0 && (
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 xs:px-5 sm:px-6"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
                />
                <h2 className="text-2xl font-black text-foreground">
                  Typical Day
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 dark:from-purple-600 dark:via-amber-500 dark:to-purple-600 hidden sm:block" />
                <div className="space-y-4">
                  {program.schedule.map((item: string, i: number) => {
                    const [time, ...activityParts] = item.split(" - ");
                    const activity = activityParts.join(" - ");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="relative pl-12 sm:pl-16"
                      >
                        <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border-2 border-purple-200 dark:border-purple-800/30 flex items-center justify-center shadow-lg">
                          <div
                            className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-purple-600 dark:bg-purple-400" : "bg-amber-600 dark:bg-amber-400"}`}
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all">
                          <span className="text-xs font-black text-amber-600 dark:text-amber-400 sm:w-28 shrink-0">
                            {time}
                          </span>
                          <span className="text-sm text-foreground">
                            {activity}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== CURRICULUM ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
                  whileHover={{ y: -2 }}
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
          </div>
        </motion.div>
      </section>

      {/* ===== LEARNING MILESTONES ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
                    whileHover={{ y: -4 }}
                    className="group relative p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all duration-300"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.lightBg} flex items-center justify-center`}
                        >
                          <span className={`text-sm font-black ${colors.text}`}>
                            {i + 1}
                          </span>
                        </div>
                        <p className="font-black text-foreground">
                          {milestone.phase}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground ml-11">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {program.testimonials && program.testimonials.length > 0 && (
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 xs:px-5 sm:px-6"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
                    >
                      <Quote
                        className={`w-6 h-6 ${colors.text} opacity-30 mb-3`}
                      />
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-4 pt-3 border-t border-border flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black shadow-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-foreground text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
          </div>
        </motion.div>
      </section>

      {/* ===== APPLICATION PROCESS ===== */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
                  icon: BookOpen,
                },
                {
                  step: "02",
                  title: "Assessment",
                  desc: "Level evaluation with scholars",
                  icon: Target,
                },
                {
                  step: "03",
                  title: "Enrollment",
                  desc: "Complete registration process",
                  icon: CheckCircle2,
                },
                {
                  step: "04",
                  title: "Begin Journey",
                  desc: "Start your Quranic path",
                  icon: Sparkles,
                },
              ].map((item, i) => {
                const StepIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="text-center p-5 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <StepIcon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <p className="text-xs font-black text-muted-foreground">
                      {item.step}
                    </p>
                    <p className="font-black text-foreground text-sm mt-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== RELATED PROGRAMS ===== */}
      {program.relatedPrograms && program.relatedPrograms.length > 0 && (
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 xs:px-5 sm:px-6"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}
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
                        <div className="group p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all hover:shadow-xl">
                          <h3 className="font-black text-foreground group-hover:text-purple-600 dark:group-hover:text-amber-400 transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {related.description}
                          </p>
                          <div className="mt-3 text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Learn More
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== ULTRA PREMIUM CTA ===== */}
      <section className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto relative">
            {/* Glow Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10 blur-3xl rounded-3xl`}
            />

            <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30 backdrop-blur-sm text-center overflow-hidden">
              {/* Simple Particles - No repeat: Infinity issues */}
              <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse" />
              <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-amber-500/30 animate-pulse delay-1000" />
              <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-purple-400/30 animate-pulse delay-2000" />
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-pulse delay-1500" />
              <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse delay-500" />

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
                Begin your journey to Quranic excellence today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-10 py-6 font-black text-lg bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Button>
                </Link>
                <Link href="/onsite/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-10 py-6 font-black text-lg border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
                  >
                    <span className="flex items-center">
                      Talk to Advisor
                      <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

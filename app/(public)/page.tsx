// app/(marketing)/page.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Building2,
  ShieldCheck,
  Users,
  Award,
  Sparkles,
  BookOpen,
  Crown,
  Mic,
  Heart,
  CheckCircle2,
  Compass,
  Target,
  Quote,
  Zap,
  Star,
  GraduationCap,
  Infinity,
  Gem,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/section-animation";

// ============================================================
// DATA
// ============================================================

const STATS = [
  { value: "500+", label: "Students Worldwide", icon: Users },
  { value: "94%", label: "Success Rate", icon: TrendingUp },
  { value: "15+", label: "Countries", icon: Globe },
  { value: "1400+", label: "Years of Sanad", icon: Infinity },
];

const PROGRAMS = [
  {
    id: "hifz",
    title: "Hifz Al-Quran",
    description: "Complete memorization with Ijazah certification",
    icon: Crown,
    color: "purple",
  },
  {
    id: "tajweed",
    title: "Tajweed Mastery",
    description: "Scientific recitation with precision",
    icon: Mic,
    color: "amber",
  },
  {
    id: "arabic",
    title: "Arabic Language",
    description: "Understand Quran in its original language",
    icon: Globe,
    color: "purple",
  },
  {
    id: "tafsir",
    title: "Tafsir Studies",
    description: "Deep Quranic understanding",
    icon: BookOpen,
    color: "amber",
  },
];

const TESTIMONIALS = [
  {
    name: "Zainab Bint Abdullah",
    role: "Hifz Graduate",
    content:
      "Alhamdulillah, I completed my Hifz in just 2 years. The teachers were patient, supportive, and the revision system made all the difference.",
    initials: "ZB",
  },
  {
    name: "Shaykh Dr. Ahmed",
    role: "Al-Azhar Scholar",
    content:
      "Al-Maysaroh represents the highest standard of Quranic education. Their commitment to authentic Sanad is truly inspiring.",
    initials: "أ",
  },
];

// ============================================================
// PAGE
// ============================================================

export default function Homepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-slate-950 overflow-hidden"
    >
      {/* ============================================================
           HERO - FULL SCREEN IMMERSIVE
           ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Premium Animated Background */}
        <div className="absolute inset-0">
          {/* Primary Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[150px] animate-pulse delay-1000" />

          {/* Secondary Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />

          {/* Islamic Pattern */}
          <div
            className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] bg-center bg-repeat"
            style={{ backgroundSize: "300px" }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#a78bfa" : "#f59e0b",
                opacity: 0.2 + Math.random() * 0.3,
              }}
              animate={{
                y: [0, -100 + Math.random() * 200, 0],
                x: [0, (Math.random() - 0.5) * 100, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-20">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div className="space-y-8">
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-600/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                    Since 2018 • Global Sanad
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[1.05] text-white"
                >
                  Your Path to
                  <span className="block bg-gradient-to-r from-purple-400 via-amber-500 to-purple-400 bg-clip-text text-transparent">
                    Quranic Mastery
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed"
                >
                  Join a community of seekers preserving the authentic
                  transmission of the Quran through an unbroken chain of
                  scholarship.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/assessment">
                    <Button className="rounded-full px-8 py-4 font-black text-base bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all group">
                      Start Your Journey
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 font-black text-base border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                    >
                      Explore Programs
                    </Button>
                  </Link>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-6 pt-4"
                >
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 border-2 border-slate-950 flex items-center justify-center text-white font-black text-xs shadow-lg"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">
                      500+ Students
                    </p>
                    <p className="text-xs text-slate-400">Trusted worldwide</p>
                  </div>
                </motion.div>
              </div>

              {/* Right - Premium Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Floating Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: ShieldCheck,
                      label: "Ijazah Certified",
                      color: "purple",
                    },
                    { icon: Crown, label: "Authentic Sanad", color: "amber" },
                    { icon: Users, label: "1-on-1 Learning", color: "purple" },
                    { icon: Globe, label: "Global Access", color: "amber" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    const isPurple = item.color === "purple";
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-600/30 transition-all group"
                      >
                        <div
                          className={`w-12 h-12 rounded-xl ${isPurple ? "bg-purple-600/20" : "bg-amber-500/20"} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                        >
                          <Icon
                            className={`w-6 h-6 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                          />
                        </div>
                        <p
                          className={`text-sm font-black ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                        >
                          {item.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
              Scroll
            </p>
            <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ============================================================
           STATS - SLIDING NUMBERS
           ============================================================ */}
      <section className="py-16 border-y border-slate-800/50 bg-slate-900/30">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
           TWO COLUMN - CAMPUSES
           ============================================================ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Choose Your Path
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white">
                Two{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Campuses
                </span>
                <br />
                <span className="text-2xl md:text-3xl text-slate-400">
                  One Mission
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Online Campus */}
            <Reveal delay={0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-600/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-5">
                    <Globe className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Online Campus
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Learn from anywhere with 1-on-1 sessions
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Flexible Scheduling",
                      "Global Access",
                      "Certified Teachers",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/online">
                    <Button className="w-full rounded-xl py-3 font-black bg-purple-600 hover:bg-purple-700 text-white">
                      Explore Online
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </Reveal>

            {/* Physical Campus */}
            <Reveal delay={0.2}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800/50 hover:border-amber-600/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-5">
                    <Building2 className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    Physical Campus
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Full-time residential Quran memorization
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Boarding Available",
                      "Structured Routine",
                      "Community",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/onsite">
                    <Button className="w-full rounded-xl py-3 font-black bg-amber-600 hover:bg-amber-700 text-white">
                      Explore Physical
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
           PROGRAMS - ICON GRID
           ============================================================ */}
      <section className="py-20 md:py-28 bg-slate-900/30">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Our Programs
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white">
                What We{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Offer
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {PROGRAMS.map((program, index) => {
              const Icon = program.icon;
              const isPurple = program.color === "purple";
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-600/30 transition-all group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${isPurple ? "bg-purple-600/20" : "bg-amber-500/20"} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon
                        className={`w-8 h-8 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                      />
                    </div>
                    <h3
                      className={`font-black text-lg ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                    >
                      {program.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2">
                      {program.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
           TESTIMONIALS - ELEGANT
           ============================================================ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Testimonials
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Students
                </span>{" "}
                Say
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-600/30 transition-all">
                  <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-black text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           CTA - BOLD
           ============================================================ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-600/20 via-purple-700/20 to-amber-600/20">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 mb-6 shadow-xl shadow-purple-500/30">
              <Gem className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Your Journey Starts Here
            </h2>

            <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
              Join thousands of students worldwide in preserving the authentic
              transmission of the Quran.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-10 py-4 font-black text-base bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all group">
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="rounded-full px-10 py-4 font-black text-base border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                >
                  Explore Programs
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              Free assessment • No commitment • All ages welcome
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
           FOOTER TRUST
           ============================================================ */}
      <div className="py-4 border-t border-slate-800/50 bg-slate-900/30">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              500+ Students
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              15+ Countries
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

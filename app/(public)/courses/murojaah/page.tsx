// app/courses/murojaah/page.tsx
"use client";

import { PricingCalculatorMurojaah } from "@/components/public/pricing/pricing-calculator-universal";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Crown,
  Quote,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
  RefreshCw,
  Gem,
  GraduationCap,
  Heart,
  TrendingUp,
  Zap,
  Infinity,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Program Data
const PROGRAM_DATA = {
  name: "Muroja'ah Program",
  tagline: "Preserve & Perfect Your Memorization",
  description:
    "A dedicated revision program designed to help Huffadh maintain, strengthen, and perfect their Quran memorization through structured revision schedules and expert guidance.",
  audience: "Huffadh • Advanced Students",
  duration: "Ongoing • Monthly commitment",
  sessionsPerWeek: "2-4 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 Private Sessions",
  level: "Advanced",
  priceRange: "$99",
  pricePeriod: "per month",
};

// Core Pillars of Muroja'ah
const PILLARS = [
  {
    icon: RefreshCw,
    title: "Structured Revision",
    description: "Systematic review plan for long-term retention",
    audience: "Foundation",
  },
  {
    icon: Target,
    title: "Weakness Identification",
    description: "Target and correct problematic areas",
    audience: "Precision",
  },
  {
    icon: Brain,
    title: "Memory Strengthening",
    description: "Techniques to solidify memorization",
    audience: "Retention",
  },
  {
    icon: Zap,
    title: "Fluency Building",
    description: "Achieve smooth, confident recitation",
    audience: "Mastery",
  },
  {
    icon: Infinity,
    title: "Lifelong Preservation",
    description: "Build habits for maintaining Quran",
    audience: "Sustainability",
  },
  {
    icon: Crown,
    title: "Ijazah Preparation",
    description: "Prepare for formal certification",
    audience: "Advanced",
  },
];

// Revision Journey
const REVISION_JOURNEY = [
  {
    stage: "Assessment Phase",
    duration: "First Month",
    focus: "Evaluate current memorization strength",
    topics: [
      "Complete Quran assessment",
      "Identify weak areas",
      "Set revision priorities",
      "Create personalized plan",
    ],
    icon: Target,
  },
  {
    stage: "Strengthening Phase",
    duration: "Months 2-6",
    focus: "Systematic revision and correction",
    topics: [
      "Daily revision targets",
      "Weak area focus",
      "Mistake elimination",
      "Fluency development",
    ],
    icon: TrendingUp,
  },
  {
    stage: "Mastery Phase",
    duration: "Months 6+",
    focus: "Long-term preservation",
    topics: [
      "Complete Quran fluency",
      "Teaching preparation",
      "Ijazah track",
      "Sustainable revision habits",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "New Huffadh",
    icon: User,
    pace: "Intensive & Supportive",
    duration: "6-12 months",
    features: [
      "Complete revision",
      "Weakness correction",
      "Fluency focus",
      "Confidence building",
    ],
    color: "from-rose-500 to-pink-500",
  },
  {
    audience: "Ijazah Candidates",
    icon: Crown,
    pace: "Rigorous & Precise",
    duration: "3-6 months",
    features: [
      "Perfect memorization",
      "Advanced tajweed",
      "Teaching methodology",
      "Final examination",
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    audience: "Busy Professionals",
    icon: Briefcase,
    pace: "Flexible & Sustainable",
    duration: "Ongoing",
    features: [
      "Custom schedule",
      "Efficient revision",
      "Weekend options",
      "Long-term maintenance",
    ],
    color: "from-rose-600 to-pink-600",
  },
  {
    audience: "Teachers/Mujawwid",
    icon: GraduationCap,
    pace: "Mastery & Teaching",
    duration: "6-12 months",
    features: [
      "Complete mastery",
      "Teaching techniques",
      "Student assessment",
      "Ijazah certification",
    ],
    color: "from-pink-600 to-rose-700",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Ahmed, 32",
    type: "Hafiz",
    story:
      "After completing Hifz, I struggled with retention. The Muroja'ah program gave me a structured plan that transformed my revision. Now I'm confident in my memorization.",
    duration: "8 months",
    icon: Crown,
  },
  {
    name: "Fatima, 28",
    type: "Ijazah Candidate",
    story:
      "The program prepared me perfectly for my Ijazah examination. The teachers identified my weak areas and helped me achieve mastery.",
    duration: "6 months",
    icon: GraduationCap,
  },
  {
    name: "Omar, 45",
    type: "Working Professional",
    story:
      "As a busy doctor, maintaining my Hifz was challenging. The flexible schedule and efficient revision system made it possible.",
    duration: "12 months",
    icon: Briefcase,
  },
  {
    name: "Aisha, 35",
    type: "Quran Teacher",
    story:
      "The program not only strengthened my memorization but also taught me how to help my students with their revision.",
    duration: "10 months",
    icon: Heart,
  },
];

// FAQ
const FAQS = [
  {
    q: "Who is this program for?",
    a: "This program is designed for students who have already completed Hifz (full Quran memorization) and need structured revision to maintain and perfect their memorization.",
  },
  {
    q: "How much Quran should I have memorized?",
    a: "Students should have completed memorization of the entire Quran or at least 15+ Juz to benefit from this program.",
  },
  {
    q: "What if I've forgotten some portions?",
    a: "That's exactly why we're here! Our assessment will identify weak areas, and we'll create a personalized plan to restore and strengthen your memorization.",
  },
  {
    q: "How much time should I dedicate daily?",
    a: "We recommend 30-60 minutes of daily revision outside of sessions. Consistency is key for long-term preservation.",
  },
  {
    q: "Can I get an Ijazah through this program?",
    a: "Yes! Advanced students can prepare for and receive Ijazah certification upon successful completion of the mastery track.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "We recommend a minimum of 3 months to see significant improvement. However, many students continue long-term for ongoing maintenance.",
  },
];

export default function MurojaahProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main
      ref={containerRef}
      className="relative pt-12 sm:pt-10 bg-background overflow-hidden"
    >
      {/* Background - Rose/Pink Theme for Revision */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 text-rose-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🔄 Preserve
              Your Memorization 🔄
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Muroja'ah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 whitespace-nowrap">
                Program
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Preserve, strengthen, and perfect your Quran memorization. A
              dedicated revision program for Huffadh who want to maintain their
              Quran with confidence.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    BEGIN REVISION
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-rose-600 text-rose-600"
                >
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Quran Revision", value: "100%", icon: RefreshCw },
                { label: "Retention Rate", value: "95%", icon: Target },
                { label: "Ijazah Graduates", value: "50+", icon: Award },
                { label: "Active Huffadh", value: "200+", icon: Users },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-100 dark:border-rose-800"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-rose-600">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-rose-50/5 to-pink-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of
              Revision
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master Your{" "}
              <span className="text-rose-600 italic">Memorization</span>{" "}
              Retention
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A comprehensive system to preserve and perfect your Quran
              memorization
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-rose-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {pillar.description}
                      </p>
                      <p className="text-[10px] sm:text-xs text-rose-600 font-black mt-1">
                        {pillar.audience}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Paths */}
      <section
        id="paths"
        className="py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey{" "}
              <span className="text-rose-600 italic">
                Tailored to Your Goals
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different revision needs - all leading to
              lasting preservation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-rose-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">
                      {path.audience}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-600 font-black mb-1.5 sm:mb-2">
                      {path.pace}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {path.duration}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revision Journey Timeline */}
      <section
        id="journey"
        className="py-12 sm:py-16 bg-gradient-to-b from-background via-rose-50/5 to-pink-50/5"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to
              Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-rose-600 italic">Revision</span>{" "}
              for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic approach to preserve and perfect your Quran
              memorization
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-rose-600" />
              <div className="space-y-6 sm:space-y-8">
                {REVISION_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-rose-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">
                                  {phase.stage}
                                </h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                                {phase.focus}
                              </p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 text-rose-700 text-[10px] sm:text-xs font-black"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-rose-100 dark:bg-rose-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-rose-600 to-pink-600 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your
              Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-rose-600 italic">Pricing</span>{" "}
              That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen revision intensity and frequency
            </p>
          </div>

          <PricingCalculatorMurojaah dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on teacher assignment and your specific
            revision needs
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-rose-50/5 to-pink-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of
              Preservation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-rose-600 italic">Huffadh</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who strengthened their memorization with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-rose-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">
                          {story.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-rose-600 font-black">
                          {story.type}
                        </p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-rose-200 dark:text-rose-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">
                      "{story.story}"
                    </p>
                    <p className="text-[10px] sm:text-xs text-rose-600 font-black mt-3">
                      ✓ Completed in {story.duration}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-rose-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common
              Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked{" "}
              <span className="text-rose-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-rose-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base mb-1 sm:mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-rose-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-rose-600/5 to-pink-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 mb-4 sm:mb-6 shadow-lg">
              <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">
              Preserve Your Quran Memorization Today
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Strengthen your revision and perfect your memorization. Start with
              a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-rose-600 text-rose-600"
                >
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                ✨ Free 20-minute assessment
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                •
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                🔄 Structured revision plan
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                •
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                🎓 Ijazah certification path
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

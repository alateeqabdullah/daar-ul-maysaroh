// app/courses/juz-tabarak/page.tsx
"use client";

import { PricingCalculatorJuzTabarak } from "@/components/public/pricing/pricing-calculator-universal";
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
  Gem,
  GraduationCap,
  Heart,
  TrendingUp,
  MessageCircle,
  Star,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Program Data
const PROGRAM_DATA = {
  name: "Juz Tabarak Group",
  tagline: "The Next Step in Your Memorization Journey",
  description:
    "A comprehensive group program designed to help students memorize the 29th Juz of the Quran (Surah Al-Mulk to Surah Al-Mursalat) with proper Tajweed, deep understanding, and consistent revision.",
  audience: "Ages 10+ • Intermediate Level",
  duration: "8-12 months",
  sessionsPerWeek: "2 sessions",
  sessionDuration: "50-60 minutes",
  format: "Small Groups (4-6 students)",
  level: "Intermediate",
  surahs: 14,
  verses: 431,
  priceRange: "$89",
  pricePeriod: "per month",
};

// Core Features
const FEATURES = [
  {
    icon: Shield,
    title: "Structured Progression",
    description: "Systematic memorization from shorter to longer surahs",
    audience: "All students",
  },
  {
    icon: Brain,
    title: "Meaning & Tafsir",
    description: "Understand the powerful messages of Juz Tabarak",
    audience: "Deep understanding",
  },
  {
    icon: Users,
    title: "Group Motivation",
    description: "Learn together in small, supportive groups",
    audience: "Peer learning",
  },
  {
    icon: Heart,
    title: "Revision System",
    description: "Built-in review to ensure long-term retention",
    audience: "All levels",
  },
  {
    icon: Award,
    title: "Progress Tracking",
    description: "Weekly assessments and milestone certificates",
    audience: "All students",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Multiple time slots to fit your routine",
    audience: "Everyone",
  },
];

// Surah Categories
const SURAH_CATEGORIES = [
  {
    name: "The Foundation Surahs",
    surahs: "Al-Mulk to Al-Insan (67-76)",
    count: 10,
    description:
      "Powerful surahs emphasizing Allah's sovereignty, the Hereafter, and spiritual reflection",
    icon: Crown,
    difficulty: "Building Phase",
    duration: "4-5 months",
  },
  {
    name: "The Concluding Surahs",
    surahs: "Al-Mursalat (77)",
    count: 1,
    description: "The concluding surah of Juz Tabarak, reinforcing key themes",
    icon: Star,
    difficulty: "Mastery Phase",
    duration: "1-2 months",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-4",
    focus: "Build strong memorization foundation",
    topics: [
      "Surah Al-Mulk mastery",
      "Surah Al-Qalam & Al-Haaqqa",
      "Surah Al-Ma'arij & Nuh",
      "Establish revision routine",
    ],
    icon: Moon,
  },
  {
    stage: "Building Phase",
    duration: "Months 5-8",
    focus: "Systematic memorization",
    topics: [
      "Surah Al-Jinn to Al-Qiyamah",
      "Surah Al-Insan",
      "Weekly group revision",
      "Meaning integration",
    ],
    icon: Sun,
  },
  {
    stage: "Mastery Phase",
    duration: "Months 9-12",
    focus: "Fluency and connection",
    topics: [
      "Surah Al-Mursalat completion",
      "Full Juz Tabarak revision",
      "Tajweed perfection",
      "Graduation preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Juz Amma Graduates",
    icon: Award,
    pace: "Progressive & Structured",
    duration: "8-10 months",
    features: [
      "Build on prior knowledge",
      "Consistent pace",
      "Group support",
      "Regular assessments",
    ],
    color: "from-purple-500 to-indigo-500",
  },
  {
    audience: "Intermediate Students",
    icon: TrendingUp,
    pace: "Focused & Efficient",
    duration: "9-12 months",
    features: [
      "New memorization",
      "Tajweed emphasis",
      "Meaning focus",
      "Peer motivation",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    audience: "Young Adults (13+)",
    icon: User,
    pace: "Engaging & Supportive",
    duration: "10-12 months",
    features: [
      "Age-appropriate pace",
      "Discussion-based",
      "Practical application",
      "Goal setting",
    ],
    color: "from-purple-600 to-indigo-600",
  },
  {
    audience: "Adults",
    icon: Briefcase,
    pace: "Flexible & Sustainable",
    duration: "10-14 months",
    features: [
      "Weekend options",
      "Efficient revision",
      "Work-life balance",
      "Long-term retention",
    ],
    color: "from-indigo-600 to-purple-700",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Aisha, 16",
    type: "Student",
    story:
      "After completing Juz Amma, Juz Tabarak was the perfect next step. The group setting kept me motivated, and I love understanding the meanings now!",
    duration: "10 months",
    icon: User,
  },
  {
    name: "Omar, 35",
    type: "Professional",
    story:
      "The flexible schedule allowed me to continue my memorization journey alongside work. The group revision sessions were incredibly helpful.",
    duration: "12 months",
    icon: Briefcase,
  },
  {
    name: "Fatima, 28",
    type: "Teacher",
    story:
      "The Tafsir component of Juz Tabarak has enriched my understanding immensely. I now teach these surahs with deeper insight.",
    duration: "11 months",
    icon: GraduationCap,
  },
  {
    name: "Yusuf, 42",
    type: "Parent",
    story:
      "Learning alongside my daughter has been a beautiful experience. The program is well-structured and the teachers are excellent.",
    duration: "12 months",
    icon: Heart,
  },
];

// FAQ
const FAQS = [
  {
    q: "What is the prerequisite for this program?",
    a: "Students should have completed Juz Amma memorization or have equivalent experience with 10+ surahs memorized.",
  },
  {
    q: "How is this different from Juz Amma?",
    a: "Juz Tabarak contains longer surahs with deeper themes. The program focuses more on understanding and connecting the meanings.",
  },
  {
    q: "How much time should I dedicate daily?",
    a: "We recommend 20-30 minutes of daily revision outside of class sessions.",
  },
  {
    q: "What if I miss a class?",
    a: "Recordings are available, and you can catch up through our portal. Group revision sessions help reinforce missed material.",
  },
  {
    q: "Can I join if I haven't completed Juz Amma?",
    a: "Students with equivalent memorization experience may join after an assessment with our scholars.",
  },
  {
    q: "Is there a certificate upon completion?",
    a: "Yes! Students receive a certificate of completion for Juz Tabarak memorization.",
  },
];

export default function JuzTabarakPage() {
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
      {/* Background - Purple/Indigo Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🌙 The Next
              Chapter of Your Quran Journey 🌙
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Juz{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 whitespace-nowrap">
                Tabarak
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Continue your memorization journey with the 29th Juz of the Quran.
              Master Surah Al-Mulk to Al-Mursalat with proper Tajweed,
              understanding, and group support.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    CONTINUE YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-purple-600 text-purple-600"
                >
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Surahs", value: "14", icon: BookOpen },
                { label: "Verses", value: "431", icon: Star },
                { label: "Success Rate", value: "92%", icon: Target },
                { label: "Graduates", value: "100+", icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-800"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-purple-600">
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

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Program Features
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Why Choose Our{" "}
              <span className="text-purple-600 italic">Juz Tabarak</span>{" "}
              Program
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A comprehensive approach to mastering the 29th Juz of the Quran
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-purple-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {feature.description}
                      </p>
                      <p className="text-[10px] sm:text-xs text-purple-600 font-black mt-1">
                        {feature.audience}
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
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey{" "}
              <span className="text-purple-600 italic">
                Tailored to Your Level
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different learners - all leading to Juz
              Tabarak mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">
                      {path.audience}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-600 font-black mb-1.5 sm:mb-2">
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

      {/* Surah Categories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Journey
              Through Juz Tabarak
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              What You'll{" "}
              <span className="text-purple-600 italic">Memorize</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A structured progression through the 14 surahs of Juz Tabarak
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600" />
              <div className="space-y-6 sm:space-y-8">
                {SURAH_CATEGORIES.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">
                                  {category.name}
                                </h3>
                              </div>
                              <p className="text-[10px] sm:text-xs text-purple-600 font-black mb-1.5 sm:mb-2 break-words">
                                {category.surahs}
                              </p>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] sm:text-[10px] font-black">
                                {category.difficulty} • {category.duration}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground break-words">
                                {category.description}
                              </p>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 50}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
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

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to
              Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured{" "}
              <span className="text-purple-600 italic">Learning</span> for
              Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 8-12 month journey to Juz Tabarak mastery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">
                                  {phase.stage}
                                </h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] sm:text-[10px] font-black">
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
                                    className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 text-purple-700 text-[10px] sm:text-xs font-black"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your
              Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-purple-600 italic">Pricing</span>{" "}
              That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen group and learning pace
            </p>
          </div>

          <PricingCalculatorJuzTabarak dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on group assignment and your specific
            requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of
              Progress
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-purple-600 italic">Students</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who continued their Quran journey with Juz Tabarak
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">
                          {story.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-purple-600 font-black">
                          {story.type}
                        </p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200 dark:text-purple-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">
                      "{story.story}"
                    </p>
                    <p className="text-[10px] sm:text-xs text-purple-600 font-black mt-3">
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common
              Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked{" "}
              <span className="text-purple-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600/5 to-indigo-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 sm:mb-6 shadow-lg">
              <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">
              Continue Your Quran Journey Today
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Take the next step from Juz Amma to Juz Tabarak. Start with a
              free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-purple-600 text-purple-600"
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
                📖 Build on Juz Amma
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                •
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                🎓 Certificate upon completion
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

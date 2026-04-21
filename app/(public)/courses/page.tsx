
// app/courses/tajweed/page.tsx
"use client";

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
  Mic,
  Quote,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
  Volume2,
  Headphones,
  Radio,
  Activity,
  TrendingUp,
  Gem,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FAQSection } from "./faq";
import { PricingCalculatorTajweed } from "@/components/public/pricing/pricing-calculator-universal";

// Program Data
const PROGRAM_DATA = {
  name: "Tajweed Al-Itqan",
  tagline: "Master the Science of Recitation",
  description:
    "A comprehensive, scientifically-structured program to master the rules of Tajweed with precision, enabling you to recite the Quran as it was revealed.",
  audience: "All Levels • Teens to Adults",
  duration: "6-12 months",
  sessionsPerWeek: "2-3 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 or Small Groups",
  level: "Beginner to Advanced",
  priceRange: "$89",
  pricePeriod: "per month",
};

// Core Pillars of Tajweed
const PILLARS = [
  {
    icon: Mic,
    title: "Makharij Al-Huruf",
    description: "Precise articulation points of every letter",
    audience: "Foundation",
  },
  {
    icon: Volume2,
    title: "Sifaat Al-Huruf",
    description: "Inherent and circumstantial characteristics of letters",
    audience: "Core Knowledge",
  },
  {
    icon: Activity,
    title: "Ahkam Al-Tajweed",
    description: "Rules of Noon, Meem, Madd, and Ghunnah",
    audience: "Application",
  },
  {
    icon: Headphones,
    title: "Audio Analysis",
    description: "Real-time spectral analysis of your recitation",
    audience: "Technology",
  },
  {
    icon: Target,
    title: "Live Correction",
    description: "Immediate feedback from certified scholars",
    audience: "Practice",
  },
  {
    icon: Award,
    title: "Ijazah Pathway",
    description: "Progress toward formal Tajweed certification",
    audience: "Advanced",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-3",
    focus: "Master Makharij and basic Sifaat",
    topics: [
      "17 articulation points",
      "Permanent characteristics",
      "Basic Noon & Meem rules",
      "Short Madd pronunciation",
    ],
    icon: Mic,
  },
  {
    stage: "Intermediate Phase",
    duration: "Months 4-7",
    focus: "Master all Tajweed rules",
    topics: [
      "Ghunnah (nasalization)",
      "Qalqalah (echo sound)",
      "Idgham (merging)",
      "Ikhfa (concealment)",
      "Advanced Madd rules",
    ],
    icon: Volume2,
  },
  {
    stage: "Advanced Phase",
    duration: "Months 8-12",
    focus: "Fluency and practical application",
    topics: [
      "Waqf (stopping) rules",
      "Complete Surah application",
      "Speed and fluency development",
      "Ijazah preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Beginners",
    icon: User,
    pace: "Gentle & Thorough",
    duration: "10-12 months",
    features: ["Foundational rules", "Slow progression", "Regular revision", "Building confidence"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    audience: "Intermediate",
    icon: TrendingUp,
    pace: "Structured & Efficient",
    duration: "7-9 months",
    features: ["Advanced rules", "Practical application", "Mistake correction", "Fluency focus"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    audience: "Advanced",
    icon: Crown,
    pace: "Intensive & Precision",
    duration: "5-7 months",
    features: ["Ijazah preparation", "Teaching methodology", "Master-level recitation", "Scholar feedback"],
    color: "from-teal-500 to-blue-500",
  },
  {
    audience: "Children (10+)",
    icon: Users,
    pace: "Engaging & Fun",
    duration: "10-12 months",
    features: ["Simplified rules", "Interactive games", "Audio visuals", "Progress rewards"],
    color: "from-sky-500 to-blue-500",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Aisha, 28",
    type: "Tajweed Graduate",
    story: "The audio analysis technology helped me correct mistakes I didn't even know I had. Now I recite with confidence.",
    duration: "8 months",
    icon: User,
  },
  {
    name: "Omar, 35",
    type: "Professional",
    story: "The flexible schedule and structured approach made learning Tajweed possible alongside my full-time job.",
    duration: "10 months",
    icon: Briefcase,
  },
  {
    name: "Fatima, 42",
    type: "Mother",
    story: "Learning Tajweed has transformed my Salah. The teachers are incredibly patient and knowledgeable.",
    duration: "9 months",
    icon: Heart,
  },
  {
    name: "Yusuf, 16",
    type: "Teen",
    story: "The interactive lessons and live correction kept me engaged. I've mastered all the rules and now help my siblings!",
    duration: "7 months",
    icon: User,
  },
];

// FAQ
const FAQS = [
  { q: "Do I need to know Arabic to start Tajweed?", a: "Basic Quran reading ability is required. If you can read Quranic text (even slowly), you're ready to start Tajweed." },
  { q: "How much practice is needed daily?", a: "We recommend 15-20 minutes of daily practice. Consistency matters more than quantity." },
  { q: "What technology do I need?", a: "A computer or tablet with a microphone. Headphones are recommended for better audio analysis." },
  { q: "What if I miss a class?", a: "All sessions are recorded and available in your portal. You can review and submit practice recordings for feedback." },
  { q: "Is there homework?", a: "Yes, structured practice exercises with audio submission for personalized feedback." },
  { q: "Do I get a certificate?", a: "Yes! Upon completion, you receive a Tajweed certification recognized by our scholarly council." },
];

export default function TajweedProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Scientific Blue Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🎙️ Scientific Phonetics Certification 🎙️
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Tajweed{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 whitespace-nowrap">
                Al-Itqan
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Master the science of Quranic recitation with precision. Learn Makharij, Sifaat, and Ahkam through evidence-based methodology and real-time phonetic analysis.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-800 hover:to-cyan-800 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    MASTER TAJWEED
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-blue-600 text-blue-600">
                  EXPLORE THE SCIENCE
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Tajweed Rules", value: "40+", icon: BookOpen },
                { label: "Articulation Points", value: "17", icon: Mic },
                { label: "Success Rate", value: "96%", icon: Target },
                { label: "Certified Graduates", value: "150+", icon: Award },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-100 dark:border-blue-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-blue-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of Recitation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master Every <span className="text-blue-600 italic">Aspect</span> of Tajweed
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Comprehensive coverage of all Tajweed rules with practical application
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-blue-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-blue-600 font-black mt-1">{pillar.audience}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Paths */}
      <section id="paths" className="py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-blue-600 italic">Tailored to Your Level</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different levels - all leading to mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-blue-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-blue-600 italic">Curriculum</span> for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 6-12 month journey to perfect Quranic recitation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
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
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-blue-600 italic">Pricing</span> That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen duration, frequency, and learning intensity
            </p>
          </div>

          <PricingCalculatorTajweed dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on scholar assignment and your specific requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-blue-600 italic">Graduates</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who perfected their recitation with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-blue-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 dark:text-blue-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">"{story.story}"</p>
                    <p className="text-[10px] sm:text-xs text-blue-600 font-black mt-3">✓ Completed in {story.duration}</p>
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
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-blue-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base mb-1 sm:mb-2">{faq.q}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-blue-600/5 to-cyan-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 sm:mb-6 shadow-lg">
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Perfect Your Recitation Today</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Master the science of Tajweed with expert guidance. Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-blue-600 text-blue-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 20-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🎙️ Audio analysis technology</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📖 Ijazah certification path</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


// import { prisma } from "@/lib/prisma";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   Landmark,
//   Sparkles,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";
// import { CourseListClient } from "@/components/public/courses/course-list-client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Suspense } from "react";
// import type { Metadata } from "next";


// // ==================== TYPES ====================
// // ==================== METADATA ====================
// export const metadata: Metadata = {
//   title: "Sacred Pathways | Quran, Tajweed & Arabic Courses | Al-Maysaroh",
//   description:
//     "Explore our Sanad-based Quranic programs: Hifz memorization, Tajweed mastery, Classical Arabic, and Ijazah certification. Learn 1-on-1 with certified scholars.",
//   keywords: [
//     "Quran courses",
//     "Hifz program",
//     "Tajweed classes",
//     "Arabic language",
//     "Ijazah certification",
//     "online Quran learning",
//     "Sanad",
//   ],
//   openGraph: {
//     title: "Sacred Pathways | Al-Maysaroh Course Catalog",
//     description:
//       "Sacred knowledge, made accessible. Browse our scholarly curriculum of Quran, Tajweed, Arabic, and Islamic Studies programs.",
//     url: "https://almaysaroh.com/courses",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Sacred Pathways | Al-Maysaroh",
//     description: "Browse our Sanad-based Quranic programs",
//   },
// };

// export const revalidate = 3600;

// // ==================== MOCK DATA ====================
// const MOCK_DATA = [
//   {
//     id: "hifz",
//     name: "Hifz Al-Quran",
//     description:
//       "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed.",
//     longDescription:
//       "A comprehensive 2-3 year journey to memorize the entire Quran with scholarly guidance. Students receive 1-on-1 instruction from Ijazah-certified scholars.",
//     basePrice: 2.25,
//     category: "QURAN",
//     subcategory: "Hifz",
//     duration: "2-3 years",
//     durationMonths: 30,
//     level: "All Levels",
//     format: "1-on-1",
//     nextStart: "All Year Round",
//     sessionsPerWeek: "2-4",
//     sessionDuration: "30-60 min",
//     students: 156,
//     rating: 4.9,
//     reviewCount: 87,
//     features: [
//       "Ijazah Certification",
//       "Daily Revision System",
//       "Progress Tracking",
//       "Audio Recordings",
//       "Weekly Assessments",
//       "Sanad Certificate",
//     ],
//     curriculum: [
//       "Juz 1-10 Foundation",
//       "Juz 11-20 Building",
//       "Juz 21-30 Mastery",
//       "Complete Revision",
//     ],
//     prerequisites: "Ability to read Quranic Arabic",
//     outcomes: [
//       "Complete Quran memorization",
//       "Ijazah certification",
//       "Proper Tajweed application",
//       "Teaching methodology",
//     ],
//     isMock: true,
//     popular: true,
//     badge: "Most Popular",
//     iconName: "BookOpen",
//     color: "from-primary-600 to-primary-800",
//   },
//   {
//     id: "qiroah",
//     name: "Qiro'ah Al-Quran",
//     description:
//       "Master the art of Quranic recitation with proper Tajweed. Learn to read with accuracy and beauty.",
//     longDescription:
//       "A detailed program focusing on the art of Quranic recitation. Students will learn proper recitation techniques and apply them in their daily practice.",
//     basePrice: 2,
//     category: "QURAN",
//     subcategory: "Recitation",
//     duration: "6 months",
//     durationMonths: 6,
//     level: "Beginner",
//     format: "1-on-1",
//     nextStart: "All Year Round",
//     sessionsPerWeek: "2-3",
//     sessionDuration: "30-60 min",
//     students: 89,
//     rating: 4.8,
//     reviewCount: 45,
//     features: [
//       "Nurul-bayaan",
//       "Arabic Phonetics",
//       "Letters and Sounds",
//       "Alphabet Mastery",
//       "Sound Recognition",
//       "Fluency Building",
//       "Tajweed Rules",
//       "Practice Exercises",
//       "Audio Resources",
//       "Progress Tracking",
//       "Certificate",
//     ],
//     curriculum: [ "Alphabet and Phonetics", "Tajweed Rules", "Fluency Practice", "Final Assessment",  ],
//     prerequisites: "No prior Quran reading ability",
//     outcomes: [
//       "Fluent Quranic recitation",
//       "Improve pronunciation",
//       "Build confidence in recitation",
//       "Understand Quranic recitation rules",
//       "Prepare for advanced study",
//     ],
//     isMock: true,
//     popular: true,
//     badge: "New",
//     iconName: "BookOpen",
//     color: "from-primary-600 to-primary-800",

//   },
//   {
//     id: "tajweed",
//     name: "Tajweed Al-Itqan",
//     description:
//       "Scientific mastery of Quranic recitation rules. Perfect your pronunciation with expert guidance.",
//     longDescription:
//       "A 6-month intensive program covering all Tajweed rules with practical application. Students learn Makharij, Sifaat, and Ahkam through live correction.",
//     basePrice: 2,
//     category: "TAJWEED",
//     subcategory: "Recitation",
//     duration: "6 months",
//     durationMonths: 6,
//     level: "Beginner to Advanced",
//     format: "Small Groups",
//     nextStart: "All Year Round",
//     sessionsPerWeek: "2-3",
//     sessionDuration: "30-60 min",
//     students: 203,
//     rating: 4.8,
//     reviewCount: 124,
//     features: [
//       "Live Tajweed Correction",
//       "Practical Application",
//       "Practice Exercises",

//       "Audio Analysis",
//       "Live Correction",
//       "Mistake Tracking",
//       "Practice Materials",
//       "Progress Reports",
//       "Certificate",
//     ],
//     curriculum: [
//       "Makharij Al-Huruf",
//       "Sifaat Al-Huruf",
//       "Ahkam Al-Tajweed",
//       "Practical Application",
//     ],
//     prerequisites: "Basic Quran reading ability",
//     outcomes: [
//       "Perfect pronunciation",
//       "Apply all Tajweed rules",
//       "Recite with confidence",
//       "Teach basic rules",
//     ],
//     isMock: true,
//     popular: false,
//     iconName: "Mic",
//     color: "from-accent to-accent/90",
//   },
//   {
//     id: "arabic",
//     name: "Quranic Arabic",
//     description:
//       "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
//     longDescription:
//       "A 1-year program designed to help students understand Quranic Arabic directly. Focus on Nahw (grammar), Sarf (morphology), and Quranic vocabulary.",
//     basePrice: 2,
//     category: "ARABIC",
//     subcategory: "Language",
//     duration: "1 year",
//     durationMonths: 12,
//     level: "Beginner",
//     format: "1-on-1",
//     nextStart: "All Year Round",
//     sessionsPerWeek: "2-3",
//     sessionDuration: "30-45 min",
//     students: 312,
//     rating: 4.7,
//     reviewCount: 156,
//     features: [
//       "Quranic Vocabulary",
//       "Grammar Foundation",
//       "Practice Exercises",
//       "Audio Resources",
//       "Progress Tracking",
//       "Certificate",
//     ],
//     curriculum: [
//       "Nahw (Syntax)",
//       "Sarf (Morphology)",
//       "Quranic Vocabulary",
//       "Tafsir Integration",
//     ],
//     prerequisites: "No prior Arabic needed",
//     outcomes: [
//       "Understand 80% of Quranic words",
//       "Read classical texts",
//       "Basic translation skills",
//       "Continue self-study",
//     ],
//     isMock: true,
//     popular: true,
//     badge: "Best Value",
//     iconName: "Globe",
//     color: "from-gold to-gold/90",
//   },
//   {
//     id: "tafsir",
//     name: "Tafsir Al-Mubin",
//     description:
//       "Deep Quranic understanding through classical exegesis. Study Tafsir from primary sources.",
//     longDescription:
//       "An advanced 1.5-year program exploring Quranic meanings through classical Tafsir works including Tabari, Ibn Kathir, and Qurtubi.",
//     basePrice: 2,
//     category: "TAFSIR",
//     subcategory: "Exegesis",
//     duration: "1.5 years",
//     durationMonths: 18,
//     level: "Advanced",
//     format: "1-on-1",
//     nextStart: "All Year Round",
//     sessionsPerWeek: "2-3",
//     sessionDuration: "30-60 min",
//     students: 78,
//     rating: 4.9,
//     reviewCount: 42,
//     features: [
//       "Classical Sources",
//       "Thematic Studies",
//       "Scholarly Mentorship",
//       "Research Guidance",
//       "Weekly Discussions",
//       "Ijazah Track",
//     ],
//     curriculum: [
//       "Tafsir Al-Tabari",
//       "Tafsir Ibn Kathir",
//       "Tafsir Al-Qurtubi",
//       "Thematic Tafsir",
//     ],
//     prerequisites: "Arabic reading ability",
//     outcomes: [
//       "Understand classical tafsir",
//       "Analyze Quranic themes",
//       "Independent research",
//       "Teaching capability",
//     ],
//     isMock: true,
//     popular: false,
//     iconName: "GraduationCap",
//     color: "from-primary-500 to-primary-700",
//   },
//   {
//     id: "group-qiroah",
//     name: "Group Qiro'ah",
//     description:
//       "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy.",
//     longDescription:
//       "A nurturing group program where children learn proper Quranic reading through games, activities, and positive reinforcement.",
//     basePrice: 6,
//     category: "CHILDREN",
//     subcategory: "Reading",
//     duration: "6 months",
//     durationMonths: 6,
//     level: "Beginner",
//     format: "Group (4-10)",
//     nextStart: "September 2026",
//     sessionsPerWeek: "2-4",
//     sessionDuration: "30-60 min",
//     students: 45,
//     rating: 4.8,
//     reviewCount: 28,
//     features: [
//       "Interactive Games",
//       "Reward System",
//       "Parent Portal",
//       "Progress Reports",
//       "Weekly Updates",
//       "Certificate",
//     ],
//     curriculum: [
//       "Arabic Alphabet",
//       "Basic Pronunciation",
//       "Short Surahs",
//       "Reading Fluency",
//     ],
//     prerequisites: "Ages 7-12",
//     outcomes: [
//       "Confident Quran reading",
//       "Love for Quran",
//       "Basic Tajweed",
//       "Short surah memorization",
//     ],
//     isMock: true,
//     popular: true,
//     badge: "Popular",
//     iconName: "Users",
//     color: "from-blue-500 to-blue-600",
//   },
//   {
//     id: "juz-amma",
//     name: "Juz Amma Group",
//     description:
//       "Memorize the last Juz with understanding. Perfect for children ages 6-12 starting their Hifz journey.",
//     longDescription:
//       "An 8-month program focused on memorizing Juz Amma with proper Tajweed and understanding of meanings through fun activities.",
//     basePrice: 6,
//     category: "CHILDREN",
//     subcategory: "Memorization",
//     duration: "8 months",
//     durationMonths: 8,
//     level: "Beginner",
//     format: "Group (4-10)",
//     nextStart: "October 2026",
//     sessionsPerWeek: "2-4",
//     sessionDuration: "30-60 min",
//     students: 38,
//     rating: 4.9,
//     reviewCount: 31,
//     features: [
//       "37 Surahs",
//       "Meaning Explained",
//       "Revision Games",
//       "Parent Updates",
//       "Progress Badges",
//       "Graduation",
//     ],
//     curriculum: [
//       "Short Surahs (An-Nas to Al-Falaq)",
//       "Middle Surahs (Al-Kafirun to Al-Qadr)",
//       "Long Surahs (Al-Qari'ah to An-Naba)",
//       "Complete Revision",
//     ],
//     prerequisites: "Ages 6-12",
//     outcomes: [
//       "Memorize Juz Amma",
//       "Understand meanings",
//       "Proper pronunciation",
//       "Love for Quran",
//     ],
//     isMock: true,
//     badge: "New",
//     iconName: "Star",
//     color: "from-purple-500 to-purple-600",
//   },
//   {
//     id: "ijazah-program",
//     name: "Ijazah Certification",
//     description:
//       "Complete your journey with formal Ijazah certification. For advanced students ready to receive Sanad.",
//     longDescription:
//       "A rigorous assessment program for students ready to receive Ijazah. Work directly with senior scholars to perfect your recitation.",
//     basePrice: 3,
//     category: "IJAZAH",
//     subcategory: "Certification",
//     duration: "3-6 months",
//     durationMonths: 4,
//     level: "Advanced",
//     format: "1-on-1",
//     nextStart: "Rolling Admission",
//     sessionsPerWeek: 2,
//     sessionDuration: "60 min",
//     students: 24,
//     rating: 5.0,
//     reviewCount: 18,
//     features: [
//       "Complete Sanad",
//       "Senior Scholars",
//       "Oral Examination",
//       "Written Certification",
//       "Public Recognition",
//       "Teaching Authorization",
//     ],
//     curriculum: [
//       "Recitation Assessment",
//       "Tajweed Mastery Check",
//       "Memorization Verification",
//       "Final Examination",
//     ],
//     prerequisites: "Complete Hifz or equivalent",
//     outcomes: [
//       "Formal Ijazah",
//       "Complete Sanad",
//       "Teaching authorization",
//       "Scholarly recognition",
//     ],
//     isMock: true,
//     popular: true,
//     badge: "Limited Seats",
//     iconName: "Award",
//     color: "from-amber-600 to-amber-800",
//   },
// ];

// // ==================== CATEGORIES (Icon names as strings, not components) ====================
// const CATEGORIES = [
//   { id: "all", name: "All Programs", iconName: "BookOpen", count: 0 },
//   { id: "QURAN", name: "Quran", iconName: "BookOpen", count: 0 },
//   { id: "TAJWEED", name: "Tajweed", iconName: "Mic", count: 0 },
//   { id: "ARABIC", name: "Arabic", iconName: "Globe", count: 0 },
//   { id: "TAFSIR", name: "Tafsir", iconName: "GraduationCap", count: 0 },
//   { id: "CHILDREN", name: "Children", iconName: "Heart", count: 0 },
//   { id: "IJAZAH", name: "Ijazah", iconName: "Award", count: 0 },
// ];


// // ==================== FILTER OPTIONS ====================
// const LEVELS = [
//   { id: "all", name: "All Levels" },
//   { id: "Beginner", name: "Beginner" },
//   { id: "Intermediate", name: "Intermediate" },
//   { id: "Advanced", name: "Advanced" },
// ];

// const FORMATS = [
//   { id: "all", name: "All Formats" },
//   { id: "1-on-1", name: "1-on-1" },
//   { id: "Group", name: "Group" },
//   { id: "Small Groups", name: "Small Groups" },
//   { id: "Group (4-6)", name: "Group (4-6)" },
//   { id: "Group Sessions", name: "Group Sessions" },
// ];

// const DURATIONS = [
//   { id: "all", name: "Any Duration" },
//   { id: "3-6", name: "3-6 months" },
//   { id: "6-12", name: "6-12 months" },
//   { id: "1-2", name: "1-2 years" },
//   { id: "2+", name: "2+ years" },
// ];


// // ==================== HELPER FUNCTIONS ====================
// function getIconNameForCategory(category: string): string {
//   const map: Record<string, string> = {
//     QURAN: "BookOpen",
//     TAJWEED: "Mic",
//     ARABIC: "Globe",
//     TAFSIR: "GraduationCap",
//     CHILDREN: "Heart",
//     IJAZAH: "Award",
//   };
//   return map[category] || "BookOpen";
// }

// function getColorForCategory(category: string): string {
//   const map: Record<string, string> = {
//     QURAN: "from-primary-600 to-primary-800",
//     TAJWEED: "from-accent to-accent/90",
//     ARABIC: "from-gold to-gold/90",
//     TAFSIR: "from-primary-500 to-primary-700",
//     CHILDREN: "from-blue-500 to-blue-600",
//     IJAZAH: "from-amber-600 to-amber-800",
//   };
//   return map[category] || "from-primary-600 to-primary-800";
// }

// // ==================== PROGRAM TYPE ====================
// type Program = {
//   id: string;
//   name: string;
//   description: string;
//   longDescription?: string;
//   basePrice: number;
//   category: string;
//   subcategory?: string;
//   duration?: string;
//   durationMonths?: number;
//   level?: string;
//   format?: string;
//   nextStart?: string;
//   sessionsPerWeek?: number;
//   sessionDuration?: string;
//   students?: number;
//   rating?: number;
//   reviewCount?: number;
//   features?: string[];
//   curriculum?: string[];
//   prerequisites?: string;
//   outcomes?: string[];
//   isMock?: boolean;
//   popular?: boolean;
//   badge?: string;
//   iconName?: string;
//   color?: string;
// };

// // ==================== MAIN PAGE COMPONENT ====================
// export default async function CoursesPage() {
//   let dbPrograms: any[] = [];

//   try {
//     const fetched = await prisma.pricingPlan.findMany({
//       where: { isActive: true },
//       orderBy: { orderIndex: "asc" },
//     });

//     dbPrograms = fetched.map((p) => ({
//       id: p.id,
//       name: p.name,
//       description: p.description,
//       longDescription: p.description || p.description,
//       basePrice: Number(p.basePrice),
//       category: p.category as string,
//       subcategory: p.category || "",
//       duration: p.minDuration ? `${p.minDuration}-${p.maxDuration || ""} months` : "Flexible",
//       durationMonths: p.minDuration || 0,
//       level: p.level || "All Levels",
//       format: (p as unknown as { format?: string }).format || "1-on-1",
//       nextStart: (p as any).nextStart || "Quarterly",
//       sessionsPerWeek: p.sessionsPerWeek || 0,
//       sessionDuration: "45 min",
//       students: (p as { students?: number }).students || 0,
//       rating: (p as { rating?: number }).rating || 4.8,
//       reviewCount: (p as any).reviewCount || 0,
//       features: p.features || [],
//       curriculum: (p as any).curriculum || [],
//       prerequisites: (p as any).prerequisites || "None",
//       // outcomes: p.outcomes || [],
//       outcomes: [],
//       isMock: false,
//       popular: (p as any).popular || false,
//       badge: (p as any).badge || "",
//       iconName: getIconNameForCategory(p.category) as string,
//       color: getColorForCategory(p.category) as string,
//     }));
//   } catch (error) {
//     console.error("DB connection error - using mock data");
//   }

//   const allPrograms: Program[] = [...dbPrograms, ...MOCK_DATA];

//   // Calculate counts for categories
//   const categoriesWithCounts = CATEGORIES.map((cat) => {
//     if (cat.id === "all") {
//       return { ...cat, count: allPrograms.length };
//     }
//     const count = allPrograms.filter((p) => p.category === cat.id).length;
//     return { ...cat, count };
//   });

//   // Calculate stats
//   const totalPrograms = allPrograms.length;
//   const totalStudents = allPrograms.reduce(
//     (acc, p) => acc + (p.students || 0),
//     0,
//   );
//   const averageRating =
//     allPrograms.reduce((acc, p) => acc + (p.rating || 0), 0) /
//     allPrograms.length;

//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
//       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />

//       {/* Floating particles */}
//       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
//       <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

//       <div className="container mx-auto px-4 sm:px-6">
//         {/* ==================== BREADCRUMB ==================== */}
//         <div className="text-xs sm:text-sm text-muted-foreground mb-6">
//           <Link href="/" className="hover:text-primary-700 transition-colors">
//             Home
//           </Link>
//           <span className="mx-2">/</span>
//           <span className="text-primary-700 font-medium">Courses</span>
//         </div>

//         {/* ==================== HERO SECTION ==================== */}
//         <div className="max-w-5xl mb-12 sm:mb-16 md:mb-20 lg:mb-24">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-6">
//               <Landmark className="w-3.5 h-3.5" /> Scholarly Curriculum 2026
//             </div>
//             <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-6">
//               Sacred <br />
//               <span className="text-primary-700 italic">Pathways.</span>
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 max-w-2xl">
//               Al-Maysaroh offers a rigorous, Sanad-based curriculum designed for
//               those seeking deep connection with the Divine Word through
//               scholarly tradition.
//             </p>
//           </Reveal>
//         </div>

//         {/* ==================== STATS OVERVIEW ==================== */}
//         {/* <Reveal delay={0.1}>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
//             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
//               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
//                 {totalPrograms}+
//               </div>
//               <div className="text-xs font-medium text-muted-foreground">
//                 Sacred Programs
//               </div>
//             </div>
//             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
//               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
//                 100%
//               </div>
//               <div className="text-xs font-medium text-muted-foreground">
//                 Sanad-Based
//               </div>
//             </div>
//             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
//               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
//                 {totalStudents}+
//               </div>
//               <div className="text-xs font-medium text-muted-foreground">
//                 Students Enrolled
//               </div>
//             </div>
//             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
//               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
//                 {averageRating.toFixed(1)}
//               </div>
//               <div className="text-xs font-medium text-muted-foreground">
//                 Average Rating
//               </div>
//             </div>
//           </div>
//         </Reveal> */}

//         {/* ==================== SEARCH & FILTERS ==================== */}
//         {/* <div className="mb-8 space-y-4">
     
//           <Reveal delay={0.15}>
//             <div className="relative max-w-md">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search programs..."
//                 className="pl-11 pr-4 py-6 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all"
//                 aria-label="Search courses"
//               />
//             </div>
//           </Reveal>

//           {/* Categories Pills - Horizontal Scroll on Mobile 
//           <Reveal delay={0.2}>
//             <div className="overflow-x-auto pb-2 scrollbar-hide">
//               <div className="flex items-center gap-2 min-w-max">
//                 <Filter className="w-4 h-4 text-muted-foreground mr-1" />
//                 {categoriesWithCounts.map((cat) => (
//                   <button
//                     key={cat.id}
//                     className={cn(
//                       "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2",
//                       "bg-muted/30 hover:bg-primary-700/10 border border-border",
//                     )}
//                   >
//                     {cat.name}
//                     <span className="text-primary-700">({cat.count})</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </Reveal>
//         </div> */}

//         {/* ==================== CLIENT CONTROLLER ==================== */}
//         <Suspense
//           fallback={
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
//             </div>
//           }
//         >
//           <CourseListClient
//             programs={allPrograms}
            
//             categories={categoriesWithCounts}
//             levels={LEVELS}
//             formats={FORMATS}
//             durations={DURATIONS}

//           />
//         </Suspense>

//         {/* ==================== BOTTOM CTA ==================== */}
//         <Reveal delay={0.3}>
//           <div className="mt-16 sm:mt-20 md:mt-24">
//             <div className="institutional-card p-8 sm:p-10 md:p-12 text-center max-w-3xl mx-auto border-2 border-primary-700/20 bg-linear-to-br from-primary-50/20 to-primary-100/10">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-700/10 mb-4">
//                 <Sparkles className="w-8 h-8 text-primary-700" />
//               </div>
//               <h2 className="text-2xl sm:text-3xl font-black tracking-tighter font-heading mb-3">
//                 Not Sure Where to Begin?
//               </h2>
//               <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
//               {`  Schedule a free assessment with our academic advisors. We'll
//                 help you find the perfect program for your journey.`}
//               </p>
//               <Link href="/assessment">
//                 <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 transition-all duration-300 group">
//                   <span className="flex items-center gap-2">
//                     BOOK FREE ASSESSMENT
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </Button>
//               </Link>
//               <p className="text-xs text-muted-foreground/60 mt-4">
//                 No obligation • 30-minute session • Meet a scholar
//               </p>
//             </div>
//           </div>
//         </Reveal>

//         {/* Last updated */}
//         <p className="text-xs text-center text-muted-foreground/30 mt-8">
//           Last updated:{" "}
//           {new Date().toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </p>
//       </div>
//     </main>
//   );
// }
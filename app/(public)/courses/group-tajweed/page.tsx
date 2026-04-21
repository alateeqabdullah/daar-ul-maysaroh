// app/courses/group-tajweed/page.tsx
"use client";

import { PricingCalculatorGroupTajweed } from "@/components/public/pricing/pricing-calculator-universal";
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
  Gem,
  GraduationCap,
  Heart,
  TrendingUp,
  MessageCircle,
  Radio,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";


// Program Data
const PROGRAM_DATA = {
  name: "Group Tajweed Program",
  tagline: "Learn Tajweed Together",
  description:
    "A collaborative group program designed to help students master the rules of Tajweed in a supportive, interactive environment. Perfect for those who prefer learning with peers.",
  audience: "Ages 12+ • Beginner to Intermediate",
  duration: "6-9 months",
  sessionsPerWeek: "2 sessions",
  sessionDuration: "50-60 minutes",
  format: "Small Groups (4-6 students)",
  level: "Beginner to Intermediate",
  priceRange: "$79",
  pricePeriod: "per month",
};

// Core Pillars
const PILLARS = [
  {
    icon: Mic,
    title: "Makharij Mastery",
    description: "Learn correct articulation points together",
    audience: "Foundation",
  },
  {
    icon: Volume2,
    title: "Sifaat Practice",
    description: "Group practice of letter characteristics",
    audience: "Core Skills",
  },
  {
    icon: Activity,
    title: "Ahkam Application",
    description: "Apply Tajweed rules in group recitation",
    audience: "Practical",
  },
  {
    icon: Users,
    title: "Peer Learning",
    description: "Learn from classmates' questions and corrections",
    audience: "Collaborative",
  },
  {
    icon: Headphones,
    title: "Audio Resources",
    description: "High-quality recitations for group practice",
    audience: "Technology",
  },
  {
    icon: Award,
    title: "Progress Tracking",
    description: "Individual progress within group setting",
    audience: "All students",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-3",
    focus: "Master basic Makharij and Sifaat",
    topics: [
      "17 articulation points",
      "Permanent characteristics",
      "Basic Noon & Meem rules",
      "Group pronunciation practice",
    ],
    icon: Mic,
  },
  {
    stage: "Application Phase",
    duration: "Months 4-7",
    focus: "Apply all Tajweed rules",
    topics: [
      "Ghunnah & Qalqalah",
      "Idgham & Ikhfa",
      "Madd rules",
      "Group recitation practice",
    ],
    icon: Volume2,
  },
  {
    stage: "Mastery Phase",
    duration: "Months 8-9",
    focus: "Fluency and confidence",
    topics: [
      "Complete surah application",
      "Waqf rules",
      "Group revision sessions",
      "Certificate preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Beginners",
    icon: User,
    pace: "Gentle & Supportive",
    duration: "8-9 months",
    features: [
      "Start from basics",
      "Patient instruction",
      "Group support",
      "Regular practice",
    ],
    color: "from-teal-500 to-cyan-500",
  },
  {
    audience: "Intermediate",
    icon: TrendingUp,
    pace: "Focused & Efficient",
    duration: "6-8 months",
    features: [
      "Build on prior knowledge",
      "Peer learning",
      "Advanced rules",
      "Fluency focus",
    ],
    color: "from-cyan-500 to-teal-500",
  },
  {
    audience: "Reverts",
    icon: Heart,
    pace: "Compassionate & Encouraging",
    duration: "7-9 months",
    features: [
      "Supportive environment",
      "Islamic context",
      "Practical focus",
      "Community connection",
    ],
    color: "from-teal-600 to-cyan-600",
  },
  {
    audience: "Young Adults",
    icon: GraduationCap,
    pace: "Engaging & Interactive",
    duration: "7-8 months",
    features: [
      "Discussion-based",
      "Peer motivation",
      "Regular assessments",
      "Goal setting",
    ],
    color: "from-cyan-600 to-teal-600",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Sarah, 28",
    type: "Revert",
    story:
      "Learning Tajweed in a group setting made all the difference. The peer support and encouragement kept me motivated throughout.",
    duration: "8 months",
    icon: Heart,
  },
  {
    name: "Ahmed, 35",
    type: "Professional",
    story:
      "The group format is perfect for my schedule and budget. I've learned so much from my classmates' questions and the teacher's corrections.",
    duration: "7 months",
    icon: Briefcase,
  },
  {
    name: "Amina, 19",
    type: "Student",
    story:
      "I love the interactive nature of the classes. Practicing with peers helped me gain confidence in my recitation.",
    duration: "6 months",
    icon: User,
  },
  {
    name: "Yusuf, 42",
    type: "Parent",
    story:
      "Learning Tajweed alongside my daughter has been a beautiful bonding experience. The teacher is excellent with all ages.",
    duration: "8 months",
    icon: GraduationCap,
  },
];

// FAQ
const FAQS = [
  {
    q: "What is the prerequisite for this program?",
    a: "Basic Quran reading ability is required. Students should be able to read Arabic text (even slowly) before joining.",
  },
  {
    q: "How is group Tajweed different from 1-on-1?",
    a: "Group classes offer peer learning, lower cost, and collaborative practice. 1-on-1 provides more personalized attention.",
  },
  {
    q: "How many students per class?",
    a: "We maintain small groups of 4-6 students to ensure each student receives individual attention.",
  },
  {
    q: "What if I miss a class?",
    a: "Recordings are available, and you can catch up through our portal. Group revision sessions help reinforce missed material.",
  },
  {
    q: "How much practice is needed daily?",
    a: "We recommend 10-15 minutes of daily practice. Consistency matters more than quantity.",
  },
  {
    q: "Is there a certificate upon completion?",
    a: "Yes! Students receive a certificate of completion for the Tajweed program.",
  },
];

export default function GroupTajweedPage() {
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
      {/* Background - Teal/Cyan Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-[200px]" />
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 text-teal-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🎙️ Master
              Tajweed Together 🎙️
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Group{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 whitespace-nowrap">
                Tajweed
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Master the rules of Tajweed in a supportive group environment.
              Learn proper pronunciation, practice with peers, and perfect your
              recitation together.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    JOIN A GROUP
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-teal-600 text-teal-600"
                >
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Tajweed Rules", value: "40+", icon: BookOpen },
                { label: "Class Size", value: "4-6", icon: Users },
                { label: "Success Rate", value: "94%", icon: Target },
                { label: "Happy Students", value: "200+", icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-100 dark:border-teal-800"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-teal-600">
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of
              Recitation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master <span className="text-teal-600 italic">Tajweed</span>{" "}
              Together
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Comprehensive coverage of all Tajweed rules in a collaborative
              setting
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-teal-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {pillar.description}
                      </p>
                      <p className="text-[10px] sm:text-xs text-teal-600 font-black mt-1">
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey{" "}
              <span className="text-teal-600 italic">
                Tailored to Your Level
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different learners - all leading to Tajweed
              mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">
                      {path.audience}
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-600 font-black mb-1.5 sm:mb-2">
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

      {/* Learning Journey Timeline */}
      <section
        id="journey"
        className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-cyan-50/5"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to
              Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-teal-600 italic">Learning</span>{" "}
              for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 6-9 month journey to Tajweed mastery in a group
              setting
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-600" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">
                                  {phase.stage}
                                </h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 text-[8px] sm:text-[10px] font-black">
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
                                    className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 text-teal-700 text-[10px] sm:text-xs font-black"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-teal-100 dark:bg-teal-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full"
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your
              Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Affordable <span className="text-teal-600 italic">Group</span>{" "}
              Pricing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Quality Tajweed education at an accessible price point
            </p>
          </div>

          <PricingCalculatorGroupTajweed dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Group placement based on assessment and availability
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of
              Progress
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-teal-600 italic">Students</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who mastered Tajweed in our group program
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">
                          {story.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-teal-600 font-black">
                          {story.type}
                        </p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200 dark:text-teal-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">
                      "{story.story}"
                    </p>
                    <p className="text-[10px] sm:text-xs text-teal-600 font-black mt-3">
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common
              Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked{" "}
              <span className="text-teal-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-teal-600/5 to-cyan-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 mb-4 sm:mb-6 shadow-lg">
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">
              Master Tajweed in a Group Setting
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Learn with peers, share the journey, and perfect your recitation
              together. Start with a free assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-teal-600 text-teal-600"
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
                👥 Small group setting
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

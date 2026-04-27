// app/methodology/methodology-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Crown,
  Database,
  Globe,
  GraduationCap,
  Headphones as HeadphonesIcon,
  Heart,
  Layers,
  Link as LinkIcon,
  Mic,
  Monitor,
  Repeat,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
  Scroll,
  Compass,
  Gem,
  Infinity,
  Zap,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Simple step data without complex animations
const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Sacred Assessment",
    description: "Begin your journey with a personalized evaluation by our Dean of Academic Affairs.",
    icon: Crown,
    duration: "30-45 min",
    milestone: "Personalized Roadmap",
    details: [
      "One-on-one session with Shaykh Abubakar",
      "Evaluation of current recitation level",
      "Identification of learning style and goals",
      "Discussion of spiritual objectives",
      "Creation of personalized learning roadmap",
    ],
  },
  {
    step: "02",
    title: "Divine Pairing",
    description: "Matched with an Ijazah-certified scholar who resonates with your learning style.",
    icon: Users,
    duration: "24-48 hours",
    milestone: "Teacher Assigned",
    details: [
      "Sanad lineage verification",
      "Teaching methodology compatibility",
      "Schedule and timezone alignment",
      "Free trial session with matched teacher",
      "Adjustment option if needed",
    ],
  },
  {
    step: "03",
    title: "Knowledge Architecture",
    description: "Follow a structured curriculum designed for optimal retention and mastery.",
    icon: Layers,
    duration: "Ongoing",
    milestone: "Phase Completion",
    details: [
      "Phased learning objectives",
      "Weekly personalized lesson plans",
      "Practice assignments and revision",
      "Regular progress assessments",
      "Adaptive pace adjustment",
    ],
  },
  {
    step: "04",
    title: "Living Transmission",
    description: "Engage in live, real-time sessions with your dedicated scholar.",
    icon: Mic,
    duration: "30-60 min/session",
    milestone: "Session Mastery",
    details: [
      "HD video conferencing",
      "Real-time pronunciation correction",
      "Screen sharing for materials",
      "Session recordings for review",
      "Instant feedback and guidance",
    ],
  },
  {
    step: "05",
    title: "Sacred Repetition",
    description: "Reinforce learning with structured practice between sessions.",
    icon: Repeat,
    duration: "10-15 min/day",
    milestone: "Consistency Achieved",
    details: [
      "Audio recording submissions",
      "Teacher feedback on practice",
      "Mobile app for on-the-go learning",
      "Daily revision reminders",
      "Mistake tracking and analysis",
    ],
  },
  {
    step: "06",
    title: "Celestial Certification",
    description: "Complete your journey with formal Ijazah certification.",
    icon: Award,
    duration: "Final Exam",
    milestone: "Ijazah Granted",
    details: [
      "Comprehensive final evaluation",
      "Live examination with scholarly council",
      "Error pattern analysis",
      "Ijazah certificate with Sanad chain",
      "Lifelong alumni benefits",
    ],
  },
];

const TEACHING_PILLARS = [
  {
    icon: Scroll,
    title: "Sanad Lineage",
    description: "Unbroken chain to Prophet Muhammad (ﷺ)",
    color: "purple",
  },
  {
    icon: Mic,
    title: "Phonetic Precision",
    description: "Scientific approach to Makharij and Sifaat",
    color: "amber",
  },
  {
    icon: Brain,
    title: "Cognitive Wisdom",
    description: "Memory science for optimal retention",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Spiritual Connection",
    description: "Tazkiyah and divine connection",
    color: "amber",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Track every milestone and mistake",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Learn from anywhere, anytime",
    color: "amber",
  },
];

const TECHNOLOGY_FEATURES = [
  { icon: Monitor, title: "Proprietary Portal", description: "All-in-one learning dashboard", badge: "Available" },
  { icon: HeadphonesIcon, title: "Audio Analysis", description: "Visual feedback on recitation", badge: "AI-Powered" },
  { icon: Smartphone, title: "Mobile App", description: "Practice on the go", badge: "Coming Soon" },
  { icon: BarChart3, title: "Progress Analytics", description: "Detailed insights", badge: "Real-time" },
  { icon: Video, title: "Session Recording", description: "Review past lessons", badge: "Cloud Storage" },
  { icon: Database, title: "Resource Library", description: "Access thousands of materials", badge: "24/7" },
];

// Stats data - made dynamic
const STATS_DATA = [
  { value: "1,400+", label: "Years of Heritage", icon: Shield, color: "purple" },
  { value: "100%", label: "Ijazah Track", icon: Award, color: "amber" },
  { value: "24/7", label: "Global Access", icon: Globe, color: "purple" },
  { value: "1-on-1", label: "Personal Attention", icon: Users, color: "amber" },
];

// Golden Chain data
const GOLDEN_CHAIN = [
  { name: "Allah ﷻ", icon: Gem, color: "amber" },
  { name: "Jibril (AS)", icon: Star, color: "amber" },
  { name: "Muhammad ﷺ", icon: Crown, color: "amber" },
  { name: "Companions", icon: Users, color: "purple" },
  { name: "Scholars", icon: GraduationCap, color: "purple" },
  { name: "Teachers", icon: Shield, color: "purple" },
  { name: "You", icon: Heart, color: "purple" },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      gradient: "from-amber-500 to-amber-600",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

// Structured data for JSON-LD
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Al-Maysaroh International Institute",
  "description": "A revolutionary approach to Quran learning that honors 1,400 years of scholarly tradition while embracing modern learning science.",
  "educationalProgram": {
    "@type": "EducationalProgram",
    "name": "Quran Memorization & Recitation Program",
    "educationalCredentialAwarded": "Ijazah Certification",
    "teaches": "Quran recitation, Tajweed, Hifz, Arabic language, Tafsir",
  },
};

export default function MethodologyClient() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative bg-background overflow-hidden min-h-screen pb-12 xs:pb-16 sm:pb-20">
        {/* Background */}
        <div className="hidden sm:block fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          {/* Breadcrumb */}
          <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32">
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
              <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-purple-600">Methodology</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-10 xs:mb-12 sm:mb-16 md:mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-700">The Al-Maysaroh Way</span>
              </div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4 sm:mb-6">
                Where{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Science
                </span>
                <br />
                Meets{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Sanctity
                </span>
              </h1>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                A revolutionary approach that honors 1,400 years of scholarly tradition
                while embracing cutting-edge learning science.
              </p>
            </Reveal>
          </div>

          {/* Stats Row - Fixed with dynamic data and proper responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-12 xs:mb-16 sm:mb-20">
            {STATS_DATA.map((stat, idx) => {
              const Icon = stat.icon;
              const colors = getColorStyles(stat.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center p-2 xs:p-3 sm:p-4 rounded-xl bg-card border border-purple-200 dark:border-purple-800">
                    <Icon className={`w-4 h-4 xs:w-5 xs:h-5 ${colors.text} mx-auto mb-1 xs:mb-2`} />
                    <div className={`text-lg xs:text-xl sm:text-2xl font-black ${colors.text}`}>{stat.value}</div>
                    <div className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* The Golden Chain - Fixed responsive layout */}
          <Reveal delay={0.2}>
            <div className="bg-card rounded-xl xs:rounded-2xl border border-purple-200 dark:border-purple-800 p-4 xs:p-5 sm:p-6 md:p-8 mb-12 xs:mb-16 sm:mb-20">
              <div className="text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tighter mb-1 xs:mb-2">The Golden Chain</h2>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">An unbroken lineage of light spanning 1,400 years</p>
              </div>
              
              {/* Responsive chain layout - Fixed */}
              <div className="flex flex-wrap justify-center items-center gap-1 xs:gap-2 sm:gap-3">
                {GOLDEN_CHAIN.map((node, idx) => {
                  const Icon = node.icon;
                  const colors = getColorStyles(node.color);
                  return (
                    <div key={idx} className="flex items-center">
                      <div className="text-center">
                        <div className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-0.5 xs:mb-1 sm:mb-2`}>
                          <Icon className={`w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 ${colors.text}`} />
                        </div>
                        <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-black whitespace-nowrap">{node.name}</span>
                      </div>
                      {/* Hide arrow on mobile, show on larger screens */}
                      {idx < GOLDEN_CHAIN.length - 1 && (
                        <ArrowRight className="hidden sm:inline w-3 h-3 xs:w-3.5 xs:h-3.5 text-muted-foreground mx-0.5 xs:mx-1" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-4 xs:mt-5 sm:mt-6">
                <span className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 text-[7px] xs:text-[8px] sm:text-[9px] font-black">
                  <Scroll className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                  Your voice connects to the Prophet (ﷺ)
                </span>
              </div>
            </div>
          </Reveal>

          {/* 6-Step Process */}
          <div className="mb-12 xs:mb-16 sm:mb-20">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tighter mb-1 xs:mb-2">Your Sacred Journey</h2>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">Six transformative phases to mastery</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
              {METHODOLOGY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isExpanded = expandedStep === idx;
                
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all overflow-hidden h-full flex flex-col group">
                      <div className="p-4 xs:p-5 sm:p-6 flex-1">
                        <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                          <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow-md shrink-0">
                            <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-black text-purple-600">Step {step.step}</span>
                            <h3 className="font-black text-sm xs:text-base sm:text-lg">{step.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-xs xs:text-sm text-muted-foreground mb-3 xs:mb-4">{step.description}</p>
                        
                        <div className="flex items-center justify-between text-[9px] xs:text-[10px] sm:text-xs mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-500" />
                            <span>{step.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-purple-600" />
                            <span className="line-clamp-1">{step.milestone}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setExpandedStep(isExpanded ? null : idx)}
                          className="text-[9px] xs:text-[10px] font-black text-purple-600 flex items-center gap-1"
                        >
                          {isExpanded ? "Show less" : "Show details"}
                          <ChevronRight className={`w-2.5 h-2.5 xs:w-3 xs:h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-purple-200 dark:border-purple-800 space-y-1.5 xs:space-y-2 overflow-hidden"
                            >
                              {step.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px]">
                                  <CheckCircle2 className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-green-500 shrink-0" />
                                  <span className="text-muted-foreground">{detail}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Teaching Pillars */}
          <div className="mb-12 xs:mb-16 sm:mb-20">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tighter mb-1 xs:mb-2">Our Sacred Pillars</h2>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">The foundations of our methodology</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
              {TEACHING_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const colors = getColorStyles(pillar.color);
                
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-4 xs:p-5 sm:p-6 text-center group h-full">
                      <div className={`w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 ${colors.text}`} />
                      </div>
                      <h3 className="font-black text-sm xs:text-base sm:text-lg mb-1 xs:mb-2">{pillar.title}</h3>
                      <p className="text-xs xs:text-sm text-muted-foreground">{pillar.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-12 xs:mb-16 sm:mb-20">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tighter mb-1 xs:mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">Technology</span> as a Vessel
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">Modern tools serving an ancient tradition</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
              {TECHNOLOGY_FEATURES.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-4 xs:p-5 sm:p-6 group h-full">
                      <div className="flex items-start justify-between mb-2 xs:mb-3">
                        <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-purple-600" />
                        </div>
                        <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 text-[6px] xs:text-[7px] sm:text-[8px] font-black">
                          {tech.badge}
                        </span>
                      </div>
                      <h3 className="font-black text-sm xs:text-base mb-0.5 xs:mb-1">{tech.title}</h3>
                      <p className="text-xs xs:text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <Reveal>
            <div className="mb-12 xs:mb-16 sm:mb-20 rounded-xl xs:rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-6 xs:p-8 sm:p-10 md:p-12 text-center">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 xs:mb-3 sm:mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 xs:mb-2 sm:mb-3">Ready to Become a Carrier?</h2>
                <p className="text-white/90 text-xs xs:text-sm sm:text-base mb-4 xs:mb-5 sm:mb-6 max-w-md mx-auto px-4">
                  Begin your journey with a complimentary assessment from our Dean.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center px-4">
                  <Link href="/assessment" className="w-full sm:w-auto">
                    <Button className="w-full rounded-full px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-white text-purple-600 hover:bg-gray-100 font-black text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
                      Start Free Assessment
                      <ArrowRight className="ml-1 xs:ml-1.5 sm:ml-2 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full rounded-full px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 border-white text-white hover:bg-white/20 font-black text-[9px] xs:text-[10px] sm:text-xs md:text-sm">
                      Speak to an Advisor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}

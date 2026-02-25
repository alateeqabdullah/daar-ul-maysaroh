"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Target,
  Sparkles,
  Shield,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  Layers,
  Crown,
  Star,
  Heart,
  Mic,
  Repeat,
  BarChart3,
  Sparkle,
  Database,
  Monitor,
  Smartphone,
  Video,
  Headphones as HeadphonesIcon,
  Brain,
} from "lucide-react";
import Link from "next/link";

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Initial Assessment",
    description:
      "Every student begins with a comprehensive evaluation of their current level, learning style, and goals.",
    icon: Target,
    color: "primary",
    details: [
      "Reading level assessment",
      "Tajweed proficiency check",
      "Learning style identification",
      "Goal setting session",
      "Personalized roadmap creation",
    ],
  },
  {
    step: "02",
    title: "Scholar Matching",
    description:
      "We pair you with an Ijazah-certified scholar who specializes in your specific learning needs.",
    icon: Users,
    color: "primary",
    details: [
      "Sanad lineage verification",
      "Teaching style compatibility",
      "Schedule alignment",
      "Gender preference respected",
      "Free trial session with match",
    ],
  },
  {
    step: "03",
    title: "Structured Curriculum",
    description:
      "Follow a proven, systematic approach to Quranic mastery with clear milestones and progress tracking.",
    icon: Layers,
    color: "primary",
    details: [
      "Phased learning objectives",
      "Weekly lesson plans",
      "Practice assignments",
      "Regular assessments",
      "Adaptive pace adjustment",
    ],
  },
  {
    step: "04",
    title: "Live 1-on-1 Sessions",
    description:
      "Engage in focused, real-time learning with your dedicated scholar through our proprietary platform.",
    icon: Mic,
    color: "primary",
    details: [
      "HD video conferencing",
      "Real-time correction",
      "Screen sharing for materials",
      "Session recordings",
      "Instant feedback",
    ],
  },
  {
    step: "05",
    title: "Continuous Practice",
    description:
      "Reinforce learning with structured practice, audio submissions, and progress tracking between sessions.",
    icon: Repeat,
    color: "primary",
    details: [
      "Practice recordings",
      "Teacher feedback loop",
      "Mobile app access",
      "Daily revision reminders",
      "Mistake tracking",
    ],
  },
  {
    step: "06",
    title: "Progress Validation",
    description:
      "Regular assessments and milestone celebrations ensure authentic advancement toward Ijazah certification.",
    icon: Award,
    color: "primary",
    details: [
      "Quarterly evaluations",
      "Milestone certificates",
      "Error pattern analysis",
      "Readiness assessment",
      "Ijazah preparation",
    ],
  },
];

const TEACHING_PILLARS = [
  {
    icon: Shield,
    title: "Sanad-Based Transmission",
    description:
      "Every lesson is taught with awareness of the unbroken chain of transmission back to the Prophet (ﷺ).",
  },
  {
    icon: Mic,
    title: "Phonetic Precision",
    description:
      "Makharij and Sifaat are taught with scientific accuracy using audio analysis technology.",
  },
  {
    icon: Brain,
    title: "Cognitive Learning",
    description:
      "Techniques based on memory science and cognitive psychology for optimal retention.",
  },
  {
    icon: Heart,
    title: "Spiritual Connection",
    description:
      "Lessons are infused with tazkiyah (purification) and love for the Quran.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Progress",
    description:
      "Every mistake, improvement, and milestone is tracked and analyzed.",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Learn from anywhere with flexible scheduling across all time zones.",
  },
];

const TECHNOLOGY_FEATURES = [
  {
    icon: Monitor,
    title: "Proprietary Portal",
    description:
      "All-in-one dashboard for lessons, materials, and progress tracking.",
  },
  {
    icon: HeadphonesIcon,
    title: "Audio Analysis",
    description:
      "Visual feedback on your recitation with spectrogram technology.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Practice anytime, anywhere with our mobile learning application.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description:
      "Detailed insights into your learning patterns and improvement areas.",
  },
  {
    icon: Video,
    title: "Session Recording",
    description: "Review all lessons with cloud-recorded sessions and notes.",
  },
  {
    icon: Database,
    title: "Resource Library",
    description:
      "Access to thousands of Quranic resources, recordings, and materials.",
  },
];

const SANAD_LINEAGE = [
  {
    generation: "Student",
    name: "You",
    icon: Users,
  },
  {
    generation: "Teacher",
    name: "Ijazah-Certified Scholar",
    icon: GraduationCap,
  },
  {
    generation: "Teacher's Teacher",
    name: "Master Scholar",
    icon: Award,
  },
  {
    generation: "Chain Continues",
    name: "1400+ Years of Transmission",
    icon: Link,
  },
  {
    generation: "Prophet",
    name: "Muhammad (ﷺ)",
    icon: Crown,
  },
  {
    generation: "Jibril",
    name: "Angel Jibril (AS)",
    icon: Star,
  },
  {
    generation: "Allah",
    name: "Allah (SWT)",
    icon: Sparkle,
  },
];

export default function Methodology() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
        style={{ backgroundSize: "400px" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-16 md:mb-20 lg:mb-24 space-y-4 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
                <Sparkles className="w-4 h-4" /> The Al-Maysaroh Methodology
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-tight">
                How We <span className="text-primary-700 italic">Teach</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl border-l-4 border-gold pl-4 sm:pl-6">
                A systematic approach combining traditional scholarly
                transmission with modern learning science.
              </p>
            </Reveal>
          </div>

          {/* Sanad Lineage - Visual Chain */}
          <Reveal delay={0.1}>
            <div className="institutional-card p-6 sm:p-8 md:p-10 mb-16 md:mb-20 lg:mb-24 border-2 border-primary-700/20">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-6 sm:mb-8 text-center">
                The Unbroken{" "}
                <span className="text-primary-700 italic">Chain</span>
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                {SANAD_LINEAGE.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-2 border-2 border-primary-700/30">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                        </div>
                        <div className="text-xs font-black uppercase tracking-tight">
                          {item.generation}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground max-w-[100px]">
                          {item.name}
                        </div>
                      </div>
                      {index < SANAD_LINEAGE.length - 1 && (
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700/50 mx-1 sm:mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs sm:text-sm text-center text-muted-foreground mt-6 sm:mt-8 max-w-2xl mx-auto">
                Your recitation connects directly to the Prophet (ﷺ) through an
                unbroken chain of certified scholars.
              </p>
            </div>
          </Reveal>

          {/* 6-Step Process */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <Reveal>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-center mb-12 sm:mb-16">
                Your <span className="text-primary-700 italic">Learning</span>{" "}
                Journey
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {METHODOLOGY_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="institutional-card p-5 sm:p-6 h-full flex flex-col hover:border-primary-700/30 transition-all duration-300 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-primary-700 mb-1">
                            {step.step}
                          </div>
                          <h4 className="font-black text-base sm:text-lg uppercase tracking-tight">
                            {step.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 grow">
                        {step.description}
                      </p>

                      <div className="space-y-2 mt-2">
                        {step.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary-700 shrink-0" />
                            <span className="text-muted-foreground">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Teaching Pillars */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <Reveal>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-center mb-12 sm:mb-16">
                Our <span className="text-primary-700 italic">Teaching</span>{" "}
                Pillars
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {TEACHING_PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="institutional-card p-5 sm:p-6 h-full flex flex-col items-center text-center hover:border-primary-700/30 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      </div>
                      <h4 className="font-black text-base sm:text-lg uppercase tracking-tight mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Technology Integration */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <Reveal>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-center mb-12 sm:mb-16">
                <span className="text-primary-700 italic">Technology</span> That
                Enhances
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {TECHNOLOGY_FEATURES.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="institutional-card p-5 sm:p-6 h-full flex items-start gap-4 hover:border-primary-700/30 transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm sm:text-base uppercase tracking-tight mb-1">
                          {tech.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-20 lg:mb-24">
            {[
              { value: "1400+", label: "Years of Sanad", icon: Shield },
              { value: "1-on-1", label: "Personal Attention", icon: Users },
              { value: "24/7", label: "Portal Access", icon: Globe },
              { value: "100%", label: "Ijazah Track", icon: Award },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center p-4 sm:p-6 rounded-xl bg-card border border-primary-700/10">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-primary-700" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary-700">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
              <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-primary-700" />

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-4">
                Ready to Begin Your{" "}
                <span className="text-primary-700 italic">Journey</span>?
              </h3>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                Experience the Al-Maysaroh methodology firsthand with a free
                trial session.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admissions">
                  <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11">
                    <span className="flex items-center gap-3">
                      START YOUR JOURNEY
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11"
                  >
                    SPEAK TO AN ADVISOR
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

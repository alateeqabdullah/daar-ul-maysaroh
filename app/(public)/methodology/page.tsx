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
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- FULL DATA PRESERVATION ---

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Initial Assessment",
    description:
      "Every student begins with a comprehensive evaluation of their current level, learning style, and goals.",
    icon: Target,
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

// Split the lineage for the "Map" design
const SACRED_LINEAGE = [
  { generation: "Allah", name: "Allah (SWT)", icon: Sparkle },
  { generation: "Jibril", name: "Angel Jibril (AS)", icon: Star },
  { generation: "Prophet", name: "Muhammad (ﷺ)", icon: Crown },
];

const HUMAN_LINEAGE = [
  { generation: "Chain", name: "1400+ Years", icon: LinkIcon },
  { generation: "Master", name: "Master Scholar", icon: Award },
  { generation: "Teacher", name: "Ijazah-Certified", icon: GraduationCap },
  { generation: "Student", name: "You", icon: Users },
];

export default function Methodology() {
  return (
    <section className="py-32 sm:py-32 bg-background relative overflow-hidden">
      {/* Visual Depth */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
        style={{ backgroundSize: "400px" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-4xl mb-20 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.4em] bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full border border-primary-700/10">
                <Sparkles className="w-4 h-4" /> The Al-Maysaroh Methodology
              </div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-tight italic">
                Modern Science. <br />
                <span className="text-primary-700 not-italic">
                  Ancient Chain.
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl border-l-4 border-gold pl-6 leading-relaxed">
                A systematic approach combining traditional scholarly
                transmission with modern learning science.
              </p>
            </Reveal>
          </div>

          {/* Sanad Lineage: THE MAP DESIGN */}
          <Reveal delay={0.2}>
            <div className="institutional-card p-8 md:p-12 mb-32 border-primary-700/10 bg-card/40 backdrop-blur-xl relative group">
              <div className="text-center mb-16">
                <h3 className="text-2xl font-black uppercase tracking-widest text-primary-700/40 mb-2">
                  The Unbroken Chain
                </h3>
                <div className="h-px w-24 bg-gold/30 mx-auto" />
              </div>

              <div className="flex flex-col gap-12 items-center">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {SACRED_LINEAGE.map((item, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col items-center group/item"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover/item:scale-110 transition-transform duration-500">
                        <item.icon className="w-8 h-8 text-gold" />
                      </div>
                      <span className="mt-4 text-[10px] font-black uppercase text-gold tracking-widest">
                        {item.generation}
                      </span>
                      <span className="text-xs font-bold">{item.name}</span>
                      {i < 2 && (
                        <ArrowRight className="hidden md:block absolute -right-12 top-10 w-6 h-6 text-gold/20" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center py-4">
                  <div className="w-px h-16 bg-linear-to-b from-gold to-primary-700 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                  <div className="px-4 py-1 rounded-full bg-primary-700 text-white text-[10px] font-black tracking-tighter">
                    1,400 YEARS OF TRANSMISSION
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {HUMAN_LINEAGE.map((item, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col items-center group/item"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-50 dark:bg-primary-950 border-2 border-primary-700/20 flex items-center justify-center group-hover/item:border-primary-700 group-hover/item:shadow-royal transition-all duration-500">
                        <item.icon className="w-6 h-6 text-primary-700" />
                      </div>
                      <span className="mt-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                        {item.generation}
                      </span>
                      <span className="text-xs font-bold">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-center text-muted-foreground mt-12 max-w-2xl mx-auto italic">
                Your recitation connects directly to the Prophet (ﷺ) through an
                unbroken chain of certified scholars.
              </p>
            </div>
          </Reveal>

          {/* 6-Step Process: THE ENGINE GRID */}
          <div className="mb-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter">
                  Your <span className="text-primary-700 italic">Learning</span>{" "}
                  Journey
                </h3>
                <div className="grow h-px bg-primary-700/10" />
              </div>
            </Reveal>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {METHODOLOGY_STEPS.map((step, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <li className="institutional-card p-0 overflow-hidden h-full group list-none">
                    <div className="p-8 space-y-6 flex flex-col h-full">
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-primary-700 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
                          <step.icon className="w-7 h-7" />
                        </div>
                        <span className="text-5xl font-black text-primary-700/5">
                          {step.step}
                        </span>
                      </div>

                      <div className="grow">
                        <h4 className="font-black text-xl uppercase tracking-tight mb-2 group-hover:text-primary-700 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {step.description}
                        </p>

                        <ul className="space-y-2.5 pt-6 border-t border-primary-700/5">
                          {step.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary-700" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Teaching Pillars: RESTORED FULLY */}
          <div className="mb-32">
            <Reveal>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-center mb-16">
                Our <span className="text-primary-700 italic">Teaching</span>{" "}
                Pillars
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEACHING_PILLARS.map((pillar, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-8 h-full flex flex-col items-center text-center group hover:border-primary-700/30 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-700 group-hover:text-white transition-all duration-500">
                      <pillar.icon className="w-8 h-8 text-primary-700 group-hover:text-white" />
                    </div>
                    <h4 className="font-black text-lg uppercase tracking-tight mb-3 italic">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Technology Integration */}
          <div className="mb-32 bg-primary-950 p-8 md:p-16 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/20 blur-[100px]" />
            <Reveal>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 text-center italic">
                <span className="text-gold">Technology</span> That Enhances
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {TECHNOLOGY_FEATURES.map((tech, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <tech.icon className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest mb-1">
                        {tech.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
            {[
              { value: "1400+", label: "Years of Heritage", icon: Shield },
              { value: "1-on-1", label: "Personal Attention", icon: Users },
              { value: "24/7", label: "Portal Access", icon: Globe },
              { value: "100%", label: "Ijazah Track", icon: Award },
            ].map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center p-8 rounded-[2rem] border border-primary-700/10 hover:shadow-royal hover:-translate-y-2 transition-all duration-500 bg-white dark:bg-white/5">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary-700" />
                  <div className="text-4xl font-black text-primary-700 tracking-tighter mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="relative rounded-[4rem] p-12 md:p-24 text-center overflow-hidden border-2 border-primary-700/10 bg-linear-to-br from-card to-primary-50/20">
              <div className="relative z-10 space-y-8">
                <div className="w-24 h-24 bg-primary-700 rounded-3xl flex items-center justify-center mx-auto shadow-royal shadow-primary-700/50 animate-shimmer">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]">
                  Ready to Begin Your{" "}
                  <span className="text-primary-700 italic">Journey</span>?
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto italic">
                  Experience the Al-Maysaroh methodology firsthand with a
                  complimentary placement assessment.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                  <Link href="/admissions">
                    <Button className="w-full sm:w-auto rounded-full px-16 py-8 bg-primary-700 hover:bg-primary-800 text-md font-black shadow-2xl transition-all">
                      START YOUR JOURNEY
                      <ChevronRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-12 py-8 text-md font-black border-2 transition-all"
                    >
                      SPEAK TO AN ADVISOR
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

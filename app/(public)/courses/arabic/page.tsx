import {
  Languages,
  BookOpen,
  MessageSquare,
  Globe,
  Sparkles,
  Target,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Brain,
  PenTool,
  FileText,
  Award,
  Shield,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function ArabicFluencyPage() {
  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-muted-foreground">
              <Link
                href="/courses"
                className="hover:text-gold transition-colors"
              >
                Programs
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold font-medium">Arabic Fluency</span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Quran-Centric Language
                    Mastery
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Al-Lughah{" "}
                    <span className="text-gold italic">Al-Arabiyyah</span>
                    <br />
                    Fluency Program
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    Understand the Quran in its divine language. Master
                    Classical Arabic through Quranic texts, not artificial
                    sentences. Read, comprehend, and appreciate the Quran in its
                    original form.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/admissions" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-gold hover:bg-gold/90 text-white text-sm sm:text-base min-h-[44px]">
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          START LANGUAGE JOURNEY
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#curriculum" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                      >
                        VIEW CURRICULUM
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Visual */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-gold/5 to-gold/10 border-2 border-gold/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {[
                      { value: "1", label: "Year", icon: Clock },
                      { value: "Group", label: "Sessions", icon: Users },
                      { value: "Beginner", label: "Level", icon: Target },
                      { value: "Quranic", label: "Focus", icon: BookOpen },
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-black text-gold">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-gold/10 border border-gold/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                        Quran-Centric Methodology
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn Arabic through authentic Quranic texts and classical
                      literature
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-gold/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Master Classical{" "}
                  <span className="text-gold italic">Arabic</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Comprehensive language skills for Quranic comprehension and
                  classical literature
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Quranic Vocabulary",
                  description:
                    "Master 80% of Quranic words through thematic study",
                },
                {
                  icon: Brain,
                  title: "Classical Grammar",
                  description:
                    "Nahw (syntax) and Sarf (morphology) fundamentals",
                },
                {
                  icon: MessageSquare,
                  title: "Comprehension Skills",
                  description: "Understand Quranic verses and classical texts",
                },
                {
                  icon: PenTool,
                  title: "Writing & Expression",
                  description: "Construct Arabic sentences and express ideas",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 text-center hover:border-gold/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="curriculum" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Structured{" "}
                  <span className="text-gold italic">Learning Path</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  One-year journey from absolute beginner to Quranic
                  comprehension
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  phase: "Trimester 1",
                  title: "Foundation & Basics (4 Months)",
                  description:
                    "Establish core language skills and Quranic reading",
                  points: [
                    "Arabic alphabet & pronunciation",
                    "Basic vocabulary (500+ Quranic words)",
                    "Simple sentence structure",
                    "Reading Quranic text with vowels",
                  ],
                },
                {
                  phase: "Trimester 2",
                  title: "Grammar & Structure (4 Months)",
                  description:
                    "Master classical Arabic grammar for comprehension",
                  points: [
                    "Nahw: Case endings (I'rab)",
                    "Sarf: Verb conjugation patterns",
                    "Intermediate vocabulary (1000+ words)",
                    "Quranic verse analysis",
                  ],
                },
                {
                  phase: "Trimester 3",
                  title: "Fluency & Application (4 Months)",
                  description:
                    "Develop reading fluency and comprehension skills",
                  points: [
                    "Advanced grammar topics",
                    "Classical text reading",
                    "Tafsir integration",
                    "Independent Quran reading",
                  ],
                },
              ].map((phase, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-gold/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-48 flex-shrink-0">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gold text-white flex items-center justify-center text-sm font-black">
                            {phase.phase}
                          </div>
                          <div className="font-black text-lg uppercase tracking-tight">
                            {phase.title}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {phase.description}
                        </p>
                      </div>

                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {phase.points.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-lg bg-gold/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                              <span className="text-sm font-medium">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-gold/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Immersive{" "}
                  <span className="text-gold italic">Methodology</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Learn Arabic the natural way through meaningful context and
                  application
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Languages,
                  title: "Quran-Centric Curriculum",
                  description:
                    "Learn vocabulary and grammar through actual Quranic verses. Every lesson connects directly to Quran comprehension.",
                },
                {
                  icon: Users,
                  title: "Interactive Group Learning",
                  description:
                    "Practice conversation and comprehension in small groups (max 6 students) with native Arabic instructors.",
                },
                {
                  icon: FileText,
                  title: "Comprehensive Resources",
                  description:
                    "Access to classical texts, modern materials, vocabulary builders, and comprehension exercises.",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 h-full hover:border-gold/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & Certification */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-gold/20">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-6">
                      Program <span className="text-gold italic">Outcomes</span>
                    </h2>

                    <div className="space-y-4">
                      {[
                        "Read Quranic Arabic with understanding",
                        "Comprehend 80% of Quranic vocabulary",
                        "Analyze basic Arabic grammar in texts",
                        "Read classical Arabic literature",
                        "Understand Tafsir in Arabic",
                        "Continue self-study in classical works",
                      ].map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                          <span className="font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                      Arabic Fluency Certification
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Upon successful completion, receive a recognized
                      certification verifying your Classical Arabic proficiency,
                      including reading comprehension and vocabulary mastery.
                    </p>

                    <Link href="/admissions">
                      <Button className="rounded-full px-8 py-4 font-black bg-gold hover:bg-gold/90 text-white min-h-[44px]">
                        ACHIEVE FLUENCY
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-gold/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-gold/20">
                <Globe className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-gold" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  Unlock the{" "}
                  <span className="text-gold italic">Quran's Language</span>
                </h2>

                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
                  Join students who now understand the Quran in its divine
                  language
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admissions">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-gold hover:bg-gold/90 text-white text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
                      <span className="flex items-center gap-3">
                        START LEARNING ARABIC
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
                    >
                      FREE PLACEMENT TEST
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      No Prior Arabic Required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      Group Learning Environment
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      Quran-Centric Materials
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Arabic Learning{" "}
                  <span className="text-gold italic">Questions</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  Common questions about Arabic fluency
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "I have no Arabic background. Can I really learn in one year?",
                  a: "Yes! Our curriculum is designed for absolute beginners. With consistent effort (5-7 hours weekly), students can achieve basic Quran comprehension within a year.",
                },
                {
                  q: "What's the difference between Classical and Modern Arabic?",
                  a: "Classical Arabic is the language of the Quran and classical literature. Modern Standard Arabic is used in media. We focus on Classical for Quran comprehension, with exposure to Modern for practical application.",
                },
                {
                  q: "How much daily practice is required?",
                  a: "We recommend 30-45 minutes daily for optimal progress. This includes vocabulary review, grammar exercises, and reading practice.",
                },
                {
                  q: "Can I join if I already know some Arabic?",
                  a: "Yes! We offer placement tests to determine your level. You can join at any trimester based on your current proficiency.",
                },
                {
                  q: "What materials are provided?",
                  a: "Digital textbooks, vocabulary apps, audio lessons, reading materials, and access to our Arabic learning portal with interactive exercises.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-6 sm:p-8 hover:border-gold/30 transition-all duration-300">
                    <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Ready to understand the Quran in Arabic?
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black border-gold text-gold hover:bg-gold/10"
                  >
                    SPEAK TO ARABIC INSTRUCTOR
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

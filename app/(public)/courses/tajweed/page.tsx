import {
  Mic,
  Headphones,
  Volume2,
  Music,
  Sparkles,
  Award,
  Target,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Zap,
  Users,
  Shield,
  Globe,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function TajweedMasteryPage() {
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
                className="hover:text-accent transition-colors"
              >
                Programs
              </Link>
              <span className="mx-2">/</span>
              <span className="text-accent font-medium">Tajweed Al-Itqan</span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Scientific Phonetics
                    Certification
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Tajweed <span className="text-accent italic">Al-Itqan</span>
                    <br />
                    Mastery Program
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    Master the science of Quranic recitation with precision.
                    Learn Makharij, Sifaat, and Ahkam through evidence-based
                    methodology and real-time phonetic analysis.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/admissions" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-accent hover:bg-accent/90 text-sm sm:text-base min-h-[44px]">
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          START PERFECTING RECITATION
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#methodology" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                      >
                        VIEW METHODOLOGY
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Visual */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {[
                      { value: "6", label: "Months", icon: Clock },
                      { value: "Small", label: "Groups", icon: Users },
                      { value: "Beginner+", label: "Level", icon: Target },
                      { value: "Live", label: "Correction", icon: Mic },
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-black text-accent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                        Audio Analysis Technology
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time spectral analysis of your recitation with
                      pinpoint feedback
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Master Every{" "}
                  <span className="text-accent italic">Aspect</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Comprehensive coverage of Tajweed rules with practical
                  application
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: Mic,
                  title: "Makharij Al-Huruf",
                  description: "Precise articulation points of each letter",
                },
                {
                  icon: Volume2,
                  title: "Sifaat Al-Huruf",
                  description: "Inherent characteristics of Arabic letters",
                },
                {
                  icon: Music,
                  title: "Ahkam Al-Tajweed",
                  description: "Rules of Noon, Meem, Madd, and Ghunnah",
                },
                {
                  icon: Headphones,
                  title: "Practical Application",
                  description: "Live recitation with instant correction",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 text-center hover:border-accent/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
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

      {/* Curriculum Structure */}
      <section id="curriculum" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Structured{" "}
                  <span className="text-accent italic">Curriculum</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  A systematic 6-month journey to perfect Quranic recitation
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  phase: "Phase 1",
                  title: "Foundation (2 Months)",
                  description: "Establish proper articulation and basic rules",
                  points: [
                    "Makharij Al-Huruf (17 articulation points)",
                    "Sifaat Lazimah (permanent characteristics)",
                    "Basic Noon & Meem rules",
                    "Short Madd pronunciation",
                  ],
                },
                {
                  phase: "Phase 2",
                  title: "Intermediate Rules (2 Months)",
                  description: "Master complex Tajweed regulations",
                  points: [
                    "Ghunnah (nasalization)",
                    "Qalqalah (echo sound)",
                    "Idgham (merging)",
                    "Ikhfa (concealment)",
                  ],
                },
                {
                  phase: "Phase 3",
                  title: "Advanced Application (2 Months)",
                  description: "Fluency and practical recitation mastery",
                  points: [
                    "Madd (lengthening) rules",
                    "Waqf (stopping) rules",
                    "Surah application",
                    "Speed and fluency development",
                  ],
                },
              ].map((phase, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-accent/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-48 flex-shrink-0">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-black">
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
                              className="flex items-center gap-3 p-3 rounded-lg bg-accent/5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Scientific{" "}
                  <span className="text-accent italic">Methodology</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Evidence-based approach combining traditional knowledge with
                  modern technology
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Mic,
                  title: "Live Correction Sessions",
                  description:
                    "Real-time feedback from Ijazah-certified Tajweed specialists during small group sessions (max 4 students).",
                },
                {
                  icon: Headphones,
                  title: "Audio Spectrum Analysis",
                  description:
                    "Visual feedback on pitch, tone, and pronunciation accuracy using advanced audio analysis software.",
                },
                {
                  icon: Zap,
                  title: "Progress Tracking",
                  description:
                    "Detailed analytics on error patterns, improvement rates, and mastery levels for each Tajweed rule.",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 h-full hover:border-accent/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
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

      {/* Certification */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-accent/20">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <div className="lg:w-1/3">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                      <Award className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                    </div>
                  </div>

                  <div className="lg:w-2/3 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-4">
                      Tajweed{" "}
                      <span className="text-accent italic">Certification</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground font-light mb-6">
                      Upon successful completion, receive a recognized Tajweed
                      certification verifying your mastery of Quranic recitation
                      rules. Includes assessment by multiple scholars and
                      practical recitation examination.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link href="/admissions">
                        <Button className="rounded-full px-8 py-4 font-black bg-accent hover:bg-accent/90 min-h-[44px]">
                          EARN CERTIFICATION
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-accent/20">
                <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-accent" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  Perfect Your{" "}
                  <span className="text-accent italic">Recitation</span>
                </h2>

                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
                  Join students who have transformed their Quranic recitation
                  through scientific Tajweed mastery
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admissions">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-accent hover:bg-accent/90 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
                      <span className="flex items-center gap-3">
                        ENROLL NOW
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
                    >
                      FREE ASSESSMENT
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Free Trial Session
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Small Group Learning
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Audio Analysis Tools
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
                  Frequently Asked{" "}
                  <span className="text-accent italic">Questions</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  Common questions about Tajweed mastery
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need prior Arabic knowledge?",
                  a: "Basic Arabic reading ability is required. If you can read Quranic text (even slowly), you're ready to start Tajweed. We also offer basic Arabic reading as a supplemental module.",
                },
                {
                  q: "How much time commitment is required?",
                  a: "3-5 hours weekly: 2 hours of live sessions and 1-3 hours of practice. The program is designed to fit alongside work or study commitments.",
                },
                {
                  q: "What if I miss a live session?",
                  a: "All sessions are recorded and available in your portal. You can review the material and submit practice recordings for feedback.",
                },
                {
                  q: "Is there homework or practice required?",
                  a: "Yes, daily practice is essential for mastery. We provide structured practice exercises with audio submission for feedback.",
                },
                {
                  q: "What technology do I need?",
                  a: "A computer or tablet with a microphone. We recommend headphones for better audio quality during analysis.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-6 sm:p-8 hover:border-accent/30 transition-all duration-300">
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
                  Still have questions about Tajweed mastery?
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black border-accent text-accent hover:bg-accent/10"
                  >
                    CONTACT OUR TAJWEED SPECIALISTS
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

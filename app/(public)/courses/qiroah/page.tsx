import {
  BookOpen,
  User,
  Clock,
  Target,
  Award,
  Shield,
  Star,
  Sparkles,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Heart,
  TrendingUp,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function IndividualQiroahPage() {
  return (
    <main className="pt-24 sm:pt-28 md:pt-32 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 space-y-8 sm:space-y-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/courses"
                className="hover:text-primary-700 transition-colors"
              >
                Programs
              </Link>
              <span>/</span>
              <Link
                href="/courses/children"
                className="hover:text-primary-700 transition-colors"
              >
                Children
              </Link>
              <span>/</span>
              <span className="text-primary-700 font-medium">
                Individual Qiro'ah
              </span>
            </div>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em]">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> 1-ON-1 • AGES
                    6-12
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85]">
                    Individual{" "}
                    <span className="text-primary-700 italic">Qiro'ah</span>
                    <br />
                    for Children
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
                    Personalized 1-on-1 Quran reading program for children ages
                    6-12. Each child receives undivided attention from a
                    certified scholar, ensuring faster progress and proper
                    pronunciation.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/admissions">
                      <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
                        <span className="flex items-center gap-3">
                          START YOUR JOURNEY
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#curriculum">
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
                      >
                        EXPLORE CURRICULUM
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Visual */}
              <Reveal delay={0.4}>
                <div className="relative">
                  <div className="institutional-card p-8 sm:p-10 md:p-12 bg-gradient-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          1-on-1
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Personalized
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          2-3x
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Faster Progress
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          45 min
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Sessions
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          Flexible
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Schedule
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10">
                      <div className="flex items-center gap-4 mb-3">
                        <User className="w-8 h-8 text-primary-700" />
                        <div className="font-black text-lg uppercase tracking-tight">
                          Individual Attention
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        100% focus on your child's unique learning needs and
                        pace
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  The <span className="text-primary-700 italic">1-on-1</span>{" "}
                  Advantage
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Why individual attention accelerates your child's Quran
                  journey
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: User,
                  title: "Individual Attention",
                  description: "100% focus on your child",
                },
                {
                  icon: TrendingUp,
                  title: "Faster Progress",
                  description: "2-3x faster than groups",
                },
                {
                  icon: Heart,
                  title: "Confidence Building",
                  description: "Safe environment to practice",
                },
                {
                  icon: Calendar,
                  title: "Flexible Schedule",
                  description: "Times that work for you",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 text-center hover:border-primary-700/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
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
                  <span className="text-primary-700 italic">Curriculum</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  A personalized learning path that adapts to your child's pace
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  phase: "Phase 1",
                  title: "Foundations (1-3 Months)",
                  description:
                    "Establish proper pronunciation and reading basics",
                  points: [
                    "Arabic alphabet recognition",
                    "Makharij (pronunciation points)",
                    "Short vowels (Fatha, Kasra, Damma)",
                    "Connecting letters practice",
                  ],
                },
                {
                  phase: "Phase 2",
                  title: "Building Fluency (3-6 Months)",
                  description: "Develop reading speed and confidence",
                  points: [
                    "Long vowels (Madd) mastery",
                    "Sukoon and Shadda rules",
                    "Basic Tajweed for children",
                    "Reading short Surahs",
                  ],
                },
                {
                  phase: "Phase 3",
                  title: "Advanced Reading (6-9 Months)",
                  description: "Fluent Quranic reading and certification",
                  points: [
                    "Fluent Quran recitation",
                    "Juz Amma mastery",
                    "Public recitation practice",
                    "Certificate of completion",
                  ],
                },
              ].map((phase, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-primary-700/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-48 flex-shrink-0">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-700 text-white flex items-center justify-center text-sm font-black">
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
                              className="flex items-center gap-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/20"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary-700 flex-shrink-0" />
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Our{" "}
                  <span className="text-primary-700 italic">Methodology</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  The proven approach that builds confident Quran readers
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Personalized Instruction",
                  description:
                    "1-on-1 sessions with certified scholars who tailor each lesson to your child's learning style and pace.",
                },
                {
                  icon: Users,
                  title: "Progress Tracking",
                  description:
                    "Comprehensive tracking of reading progress, pronunciation accuracy, and areas needing improvement.",
                },
                {
                  icon: Calendar,
                  title: "Flexible Schedule",
                  description:
                    "Choose times that work around your family's routine. Rescheduling is easy with 24-hour notice.",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 h-full hover:border-primary-700/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
                <User className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-primary-700" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  Give Your Child{" "}
                  <span className="text-primary-700 italic">Individual</span>{" "}
                  Attention
                </h2>

                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
                  Every child deserves personalized guidance on their Quran
                  journey. Start with a free assessment today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admissions">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
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
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Free Assessment Session
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Flexible Scheduling
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Progress Reports
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Frequently Asked{" "}
                  <span className="text-primary-700 italic">Questions</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  Everything parents need to know about 1-on-1 Quran reading
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "Is 1-on-1 better than group classes?",
                  a: "Both have benefits! 1-on-1 offers personalized attention and faster progress. The teacher adapts completely to your child's pace and learning style. Children typically progress 2-3x faster in individual settings.",
                },
                {
                  q: "What age is appropriate to start?",
                  a: "Our program is designed for children ages 6-12. Younger children (6-7) focus on alphabet recognition, while older children (8-12) work on reading fluency.",
                },
                {
                  q: "How many sessions per week?",
                  a: "We recommend 2-3 sessions per week for optimal progress. Each session is 45 minutes, designed to match children's attention spans.",
                },
                {
                  q: "Can we schedule around school?",
                  a: "Absolutely! We offer flexible scheduling including after-school hours, evenings, and weekends. Choose times that work best for your family.",
                },
                {
                  q: "What if my child has no prior knowledge?",
                  a: "Perfect! Our program starts from absolute beginner. Level 1 assumes no prior Arabic knowledge and builds from the alphabet.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
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
                  Still have questions about our Individual Qiro'ah program?
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black"
                  >
                    CONTACT OUR ADMISSIONS TEAM
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

import {
  BookOpen,
  Users,
  Clock,
  Target,
  Award,
  Star,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Mic,
  TrendingUp,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function QiroahProgramPage() {
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
              <span className="text-primary-700 font-medium">
               {` Qiro'ah Program`}
              </span>
            </div>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em]">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Quran Reading
                    Mastery
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85]">
                   {` Qiro'ah `}
                    <span className="text-primary-700 italic">Al-Quran</span>
                    <br />
                    Program
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
                    Learn to read the Quran fluently and correctly with proper
                    pronunciation. Perfect for beginners, those needing to
                    improve their reading, or anyone wanting to strengthen their
                    Quran recitation skills.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Users className="w-3.5 h-3.5" />
                      Group or 1-on-1
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Clock className="w-3.5 h-3.5" />
                      Flexible Schedule
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Target className="w-3.5 h-3.5" />
                      All Levels Welcome
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/admissions">
                      <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11 w-full sm:w-auto">
                        <span className="flex items-center gap-3">
                          START YOUR JOURNEY
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#curriculum">
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto"
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
                  <div className="institutional-card p-8 sm:p-10 md:p-12 bg-linear-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          All
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Age Groups
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          Flex
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Schedule
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          8-12
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Months
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-black text-primary-700">
                          Fluency
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Guaranteed
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10">
                      <div className="flex items-center gap-4 mb-3">
                        <Volume2 className="w-8 h-8 text-primary-700" />
                        <div className="font-black text-lg uppercase tracking-tight">
                          Correct Pronunciation
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Master Makharij and Sifaat for beautiful, accurate
                        recitation
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
      <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  The{" "}
                  <span className="text-primary-700 italic">Al-Maysaroh</span>{" "}
                  Difference
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                {`  Why our Qiro'ah program is the ideal choice for Quran reading
                  mastery`}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: Mic,
                  title: "Correct Pronunciation",
                  description:
                    "Master Makharij (articulation points) from day one",
                },
                {
                  icon: Users,
                  title: "Flexible Format",
                  description:
                    "Choose between group classes or 1-on-1 instruction",
                },
                {
                  icon: Target,
                  title: "Personalized Pace",
                  description:
                    "Progress at your own speed with customized plans",
                },
                {
                  icon: Award,
                  title: "Progressive Levels",
                  description: "From beginner to fluent reader, step by step",
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

      {/* Who Is This For? */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Who Is This{" "}
                  <span className="text-primary-700 italic">For?</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  {`Our Qiro'ah program welcomes students from all backgrounds and
                  levels`}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Star,
                  title: "Complete Beginners",
                  description:
                    "No prior Arabic or Quran reading experience needed. Start from the very basics.",
                },
                {
                  icon: TrendingUp,
                  title: "Intermediate Readers",
                  description:
                    "Already know some letters? Build fluency and correct common mistakes.",
                },
                {
                  icon: Crown,
                  title: "Advanced Reciters",
                  description:
                    "Perfect your pronunciation, learn rules, and achieve beautiful recitation.",
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

      {/* Curriculum Structure */}
      <section
        id="curriculum"
        className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Structured{" "}
                  <span className="text-primary-700 italic">Curriculum</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  A clear pathway from beginner to confident Quran reader
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  level: "1",
                  title: "Foundations (2-3 Months)",
                  description: "Master the Arabic alphabet and basic reading",
                  points: [
                    "Arabic alphabet recognition (all 28 letters)",
                    "Letter pronunciation (Makharij)",
                    "Short vowels (Fatha, Kasra, Damma)",
                    "Connecting letters to form words",
                  ],
                },
                {
                  level: "2",
                  title: "Building Fluency (3-4 Months)",
                  description: "Develop reading speed and accuracy",
                  points: [
                    "Long vowels (Madd)",
                    "Sukoon (silence) and Shadda (emphasis)",
                    "Basic Tajweed rules",
                    "Reading short Surahs",
                  ],
                },
                {
                  level: "3",
                  title: "Fluent Reading (3-4 Months)",
                  description: "Read Quran with confidence and proper rhythm",
                  points: [
                    "Fluent Quranic reading",
                    "Advanced Tajweed application",
                    "Common mistake correction",
                    "Beautiful recitation practice",
                  ],
                },
              ].map((level, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-primary-700/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-56 shrink-0">
                        <div className="inline-flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-700 text-white p-4 flex items-center justify-center text-sm font-black">
                            {level.level}
                          </div>
                          <div className="font-black text-lg uppercase tracking-tight">
                            {level.title}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {level.description}
                        </p>
                      </div>

                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {level.points.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/20"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
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
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Our{" "}
                  <span className="text-primary-700 italic">
                    Teaching Approach
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  A proven methodology that ensures steady progress and lasting
                  results
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Mic,
                  title: "Live Pronunciation Practice",
                  description:
                    "Real-time correction from qualified instructors who listen to every word you recite.",
                },
                {
                  icon: Users,
                  title: "Interactive Learning",
                  description:
                    "Engaging lessons with audio examples, visual aids, and plenty of practice opportunities.",
                },
                {
                  icon: Calendar,
                  title: "Flexible Scheduling",
                  description:
                    "Choose class times that fit your routine. Weekly sessions with recorded reviews.",
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

      {/* Program Options */}
      <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Choose Your{" "}
                  <span className="text-primary-700 italic">Learning Path</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Flexible options to match your learning preferences
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Group Classes */}
              <Reveal delay={0.1}>
                <div className="institutional-card p-8 hover:border-primary-700/30 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary-700/10 flex items-center justify-center">
                      <Users className="w-7 h-7 text-primary-700" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">
                      Group Classes
                    </h3>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Class Size</span>
                      <span className="font-black">4-10 students</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-black">30-60 minutes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="font-black">2-4x per week</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Monthly</span>
                      <span className="font-black text-primary-700 text-xl">
                        $6
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Peer learning environment
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Group practice sessions
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Motivational community
                    </li>
                  </ul>
                  <Link href="/courses/group-qiroah">
                    <Button className="w-full rounded-full font-black">
                      SELECT GROUP
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* Private 1-on-1 */}
              <Reveal delay={0.2}>
                <div className="institutional-card p-8 border-2 border-primary-700/30 hover:border-primary-700/50 transition-all duration-300 h-full relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-700 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                  <div className="flex items-center gap-4 mb-6 mt-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-700/10 flex items-center justify-center">
                      <Star className="w-7 h-7 text-primary-700" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">
                      Private 1-on-1
                    </h3>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Focus</span>
                      <span className="font-black">Complete attention</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-black">30-60 minutes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="font-black">Flexible</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Monthly</span>
                      <span className="font-black text-primary-700 text-xl">
                        $2+
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Personalized curriculum
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Flexible scheduling
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Faster progress
                    </li>
                  </ul>
                  <Link href="/admissions">
                    <Button className="w-full rounded-full font-black bg-primary-700 hover:bg-primary-800">
                      SELECT PRIVATE
                    </Button>
                  </Link>
                </div>
              </Reveal>
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
                <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-primary-700" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  Begin Your{" "}
                  <span className="text-primary-700 italic">Quran Reading</span>{" "}
                  Journey
                </h2>

                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
                  Join students who have transformed their Quran recitation
                  through our proven program
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admissions/qiroah">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11 w-full sm:w-auto">
                      <span className="flex items-center gap-3">
                        ENROLL NOW
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto"
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
                      Flexible Payment Plans
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Satisfaction Guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Frequently Asked{" "}
                  <span className="text-primary-700 italic">Questions</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  {`Everything you need to know about our Qiro'ah program`}
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "I have absolutely no Arabic knowledge. Can I join?",
                  a: "Absolutely! Our Level 1 curriculum is designed specifically for complete beginners. We start from the Arabic alphabet and build your reading skills step by step.",
                },
                {
                  q: "How long will it take to read the Quran fluently?",
                  a: "Most students achieve fluent Quran reading within 4-6 months with consistent practice. However, progress depends on your dedication and practice time.",
                },
                {
                  q: "What's the difference between Qiro'ah and Tajweed?",
                  a: "Qiro'ah focuses on learning to read the Quran correctly, while Tajweed is the advanced science of perfecting every letter's pronunciation. Our Qiro'ah program includes basic Tajweed rules needed for correct reading.",
                },
                {
                  q: "Can I switch between group and private classes?",
                  a: "Yes! You can change your learning format at any time. Many students start with group classes and switch to private for advanced levels.",
                },
                {
                  q: "What technology do I need?",
                  a: "A computer, tablet, or smartphone with internet connection and a microphone. We use Zoom, Meet for live sessions and provide access to our learning portal.",
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
                 {` Still have questions about our Qiro'ah program?`}
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

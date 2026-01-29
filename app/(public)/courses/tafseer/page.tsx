import {
  BookOpen,
  Scroll,
  Brain,
  Users,
  Sparkles,
  Award,
  Target,
  Clock,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Shield,
  Globe,
  Star,
  FileText,
  Library,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function TafsirStudiesPage() {
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
                className="hover:text-primary-700 transition-colors"
              >
                Programs
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-700 font-medium">
                Tafsir Studies
              </span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Classical Exegesis
                    Certification
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Tafsir{" "}
                    <span className="text-primary-700 italic">Al-Mubin</span>
                    <br />
                    Studies Program
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    Deep dive into Quranic meanings with classical methodology.
                    Study authentic Tafsir from primary sources under the
                    guidance of scholars with Ijazah in classical works.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/admissions" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          BEGIN TAFSIR STUDIES
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#curriculum" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                      >
                        EXPLORE CURRICULUM
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Visual */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {[
                      { value: "1.5", label: "Years", icon: Clock },
                      { value: "1-on-1", label: "Sessions", icon: Users },
                      { value: "Advanced", label: "Level", icon: Target },
                      { value: "Classical", label: "Sources", icon: Scroll },
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-black text-primary-700">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                        Scholarly Mentorship
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Direct guidance from Tafsir specialists with Ijazah in
                      classical works
                    </p>
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
                  Study Classical{" "}
                  <span className="text-primary-700 italic">Tafsir</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Engage with authentic exegesis works in their original context
                  and language
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Primary Sources",
                  description:
                    "Study directly from classical Tafsir manuscripts",
                },
                {
                  icon: Brain,
                  title: "Methodology",
                  description: "Learn principles of Quranic interpretation",
                },
                {
                  icon: Users,
                  title: "Scholar Guidance",
                  description: "1-on-1 mentorship with Tafsir specialists",
                },
                {
                  icon: Scroll,
                  title: "Contextual Understanding",
                  description:
                    "Historical and linguistic context of revelation",
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
                  Comprehensive{" "}
                  <span className="text-primary-700 italic">Curriculum</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  18-month systematic study of classical Tafsir methodology and
                  works
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  phase: "Semester 1",
                  title: "Foundations of Tafsir (6 Months)",
                  description: "Establish principles of Quranic interpretation",
                  points: [
                    "Usul al-Tafsir (principles of exegesis)",
                    "Asbab al-Nuzul (occasions of revelation)",
                    "Nasikh wa Mansukh (abrogation)",
                    "Quranic sciences introduction",
                  ],
                },
                {
                  phase: "Semester 2",
                  title: "Classical Tafsir Works (6 Months)",
                  description: "Study major classical Tafsir literature",
                  points: [
                    "Tafsir al-Tabari (جامع البيان)",
                    "Tafsir Ibn Kathir (تفسير القرآن العظيم)",
                    "Tafsir al-Qurtubi (الجامع لأحكام القرآن)",
                    "Comparative analysis methodology",
                  ],
                },
                {
                  phase: "Semester 3",
                  title: "Advanced Studies & Application (6 Months)",
                  description: "Thematic studies and contemporary application",
                  points: [
                    "Thematic Tafsir (التفسير الموضوعي)",
                    "Contemporary issues in light of Tafsir",
                    "Research methodology in Tafsir",
                    "Teaching Tafsir principles",
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
                              className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-950/20"
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

      {/* Classical Works Focus */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Study{" "}
                  <span className="text-primary-700 italic">Classical</span>{" "}
                  Tafsir Works
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Engage with the great Tafsir works that have shaped Islamic
                  scholarship
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  title: "Tafsir al-Tabari",
                  author: "Abu Ja'far al-Tabari (d. 310 AH)",
                  description:
                    "The foundational comprehensive Tafsir, combining linguistic analysis, historical context, and early narrations.",
                  focus: "Historical & linguistic analysis",
                },
                {
                  title: "Tafsir Ibn Kathir",
                  author: "Ibn Kathir (d. 774 AH)",
                  description:
                    "Hadith-based interpretation focusing on authentic narrations and rejecting weak interpretations.",
                  focus: "Hadith-based interpretation",
                },
                {
                  title: "Tafsir al-Qurtubi",
                  author: "Al-Qurtubi (d. 671 AH)",
                  description:
                    "Comprehensive work focusing on jurisprudential rulings derived from Quranic verses.",
                  focus: "Jurisprudential insights",
                },
                {
                  title: "Tafsir al-Sa'di",
                  author: "Abd al-Rahman al-Sa'di (d. 1376 AH)",
                  description:
                    "Modern classical work focusing on spiritual guidance and practical application.",
                  focus: "Spiritual & practical guidance",
                },
              ].map((work, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                        <Library className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-1">
                          {work.title}
                        </h3>
                        <p className="text-sm text-primary-700 font-medium mb-2">
                          {work.author}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {work.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-700/10">
                          <span className="text-xs font-black text-primary-700 uppercase">
                            Focus:
                          </span>
                          <span className="text-xs font-medium">
                            {work.focus}
                          </span>
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
                  Traditional{" "}
                  <span className="text-primary-700 italic">Methodology</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Learn Tafsir through the traditional scholarly approach with
                  modern accessibility
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Users,
                  title: "1-on-1 Scholarly Guidance",
                  description:
                    "Personal mentorship from Tafsir specialists who hold Ijazah in classical works. Weekly sessions focusing on close reading and analysis.",
                },
                {
                  icon: BookOpen,
                  title: "Textual Analysis Sessions",
                  description:
                    "Detailed study of classical Tafsir texts in their original Arabic. Analysis of methodology, arguments, and scholarly debates.",
                },
                {
                  icon: PenTool,
                  title: "Research & Application",
                  description:
                    "Develop research skills in Tafsir studies. Learn to apply classical principles to contemporary questions and produce scholarly work.",
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

      {/* Certification & Outcomes */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-primary-700/20">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-6">
                      Program{" "}
                      <span className="text-primary-700 italic">Outcomes</span>
                    </h2>

                    <div className="space-y-4">
                      {[
                        "Master principles of Quranic interpretation (Usul al-Tafsir)",
                        "Analyze major classical Tafsir works critically",
                        "Understand historical context of revelation",
                        "Apply Tafsir methodology to contemporary issues",
                        "Read and comprehend classical Tafsir in Arabic",
                        "Develop scholarly research skills in Tafsir studies",
                      ].map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
                          <span className="font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-700/10 flex items-center justify-center mb-6">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                      Tafsir Studies Certification
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Upon successful completion, receive a recognized
                      certification in Classical Tafsir Studies, verifying your
                      mastery of Quranic interpretation principles and classical
                      works.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary-700" />
                        <span className="text-sm font-medium">
                          Ijazah-holding instructors
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary-700" />
                        <span className="text-sm font-medium">
                          Comprehensive final research paper
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary-700" />
                        <span className="text-sm font-medium">
                          Oral examination on classical texts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prerequisites & Requirements */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6">
                  Program{" "}
                  <span className="text-primary-700 italic">Requirements</span>
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-black text-lg uppercase tracking-tight text-primary-700">
                      Prerequisites
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Advanced Arabic reading ability
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Completion of basic Islamic studies
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Familiarity with Quranic text
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-black text-lg uppercase tracking-tight text-primary-700">
                      Time Commitment
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">6-8 hours weekly study</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Weekly 1-on-1 sessions (90 min)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <PenTool className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Research paper in final semester
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
                <Scroll className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-primary-700" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  Understand the{" "}
                  <span className="text-primary-700 italic">Quran's</span>{" "}
                  Depths
                </h2>

                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
                  Join serious students of knowledge in mastering classical
                  Quranic interpretation
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/admissions">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
                      <span className="flex items-center gap-3">
                        BEGIN TAFSIR STUDIES
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
                    >
                      SCHOLAR CONSULTATION
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Advanced Arabic Required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      1-on-1 Scholarly Mentorship
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Classical Texts Focus
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
                  Tafsir Studies{" "}
                  <span className="text-primary-700 italic">Questions</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  Common questions about classical Tafsir studies
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What level of Arabic is required?",
                  a: "Advanced reading proficiency is required. You should be able to read classical Arabic texts with dictionary assistance. We recommend completing our Arabic Fluency program first or equivalent.",
                },
                {
                  q: "Is this program suitable for beginners in Islamic studies?",
                  a: "This is an advanced program. Students should have basic knowledge of Islamic sciences, Quranic studies, and familiarity with major classical works.",
                },
                {
                  q: "What texts will we study?",
                  a: "Primary focus on Tafsir al-Tabari, Ibn Kathir, and al-Qurtubi. Supplementary study of other classical works and modern academic studies on Tafsir.",
                },
                {
                  q: "Is there a research component?",
                  a: "Yes, the final semester includes a research paper on a Tafsir-related topic under scholarly supervision. This develops academic research skills.",
                },
                {
                  q: "Can I teach Tafsir after completing this program?",
                  a: "While this provides strong foundation, teaching authorization (Ijazah) requires additional study and testing. This program prepares you for advanced Tafsir studies.",
                },
                {
                  q: "What's the difference between Tafsir and translation?",
                  a: "Translation conveys meaning in another language. Tafsir involves interpretation, contextual analysis, linguistic study, and understanding of rulings and wisdom behind verses.",
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
                  Ready to dive deep into Quranic interpretation?
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black"
                  >
                    CONSULT WITH TAFSIR SCHOLAR
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

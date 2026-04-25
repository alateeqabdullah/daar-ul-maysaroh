// app/courses/courses-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Award,
  GraduationCap,
  Heart,
  Mic,
  Globe,
  CheckCircle2,
  ChevronRight,
  Scroll,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    id: "hifz",
    name: "Hifz Al-Quran",
    tagline: "Complete Memorization",
    description:
      "Master the entire Quran with proper Tajweed and receive Ijazah certification with complete Sanad to Prophet Muhammad (ﷺ).",
    duration: "2-3 years",
    format: "1-on-1",
    students: "200+",
    icon: Crown,
    color: "purple",
    href: "/courses/hifz",
    features: ["Ijazah Certification", "Daily Revision", "Sanad Chain"],
  },
  {
    id: "tajweed",
    name: "Tajweed Al-Itqan",
    tagline: "Scientific Recitation",
    description:
      "Master the science of Quranic recitation with precision. Learn Makharij, Sifaat, and Ahkam through evidence-based methodology.",
    duration: "6-12 months",
    format: "1-on-1",
    students: "300+",
    icon: Mic,
    color: "amber",
    href: "/courses/tajweed",
    features: ["Live Correction", "Audio Analysis", "Certificate"],
  },
  {
    id: "arabic",
    name: "Al-Lughah Al-Arabiyyah",
    tagline: "Quranic Language",
    description:
      "Understand the Quran in its original language. Master classical Arabic grammar, vocabulary, and comprehension.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "150+",
    icon: Globe,
    color: "purple",
    href: "/courses/arabic",
    features: ["Grammar Mastery", "Vocabulary", "Tafsir Reading"],
  },
  {
    id: "group-qiroah",
    name: "Group Qiro'ah",
    tagline: "Children's Reading",
    description:
      "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy in a supportive group environment.",
    duration: "6-9 months",
    format: "Group (4-6)",
    students: "100+",
    icon: Heart,
    color: "amber",
    href: "/courses/group-qiroah",
    features: ["Fun Activities", "Parent Portal", "Certificate"],
  },
  {
    id: "juz-amma",
    name: "Juz Amma",
    tagline: "Children's Memorization",
    description:
      "Memorize the 30th Juz with fun, engaging methods designed specifically for young learners ages 5-12.",
    duration: "6-12 months",
    format: "Group",
    students: "80+",
    icon: Star,
    color: "purple",
    href: "/courses/juz-amma",
    features: ["Fun Memorization", "Reward System", "Certificate"],
  },
  {
    id: "tafsir",
    name: "Tafsir Al-Mubin",
    tagline: "Quranic Exegesis",
    description:
      "Deep dive into Quranic meanings with classical methodology. Understand context, revelation reasons, and scholarly interpretations.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "80+",
    icon: BookOpen,
    color: "amber",
    href: "/courses/tafsir",
    features: ["Classical Sources", "Scholar Mentorship", "Certificate"],
  },
];

// Structured data for JSON-LD
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Al-Maysaroh Quran Courses",
  description:
    "Comprehensive Quran courses with Ijazah certification and authentic Sanad chains.",
  numberOfItems: COURSES.length,
  itemListElement: COURSES.map((course, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: {
        "@type": "Organization",
        name: "Al-Maysaroh International Institute",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: course.format,
        duration: course.duration,
      },
    },
  })),
};

export default function CoursesClient() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative bg-background overflow-hidden">
        {/* Background */}
        <div className="hidden sm:block fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
            style={{ backgroundSize: "300px" }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          {/* Breadcrumb */}
          <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <span className="opacity-30">/</span>
              <span className="text-purple-600">Courses</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
            <div className="max-w-2xl space-y-3 xs:space-y-4 sm:space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  <Shield className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  Sacred Knowledge
                </div>
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                    Path.
                  </span>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/assessment">
                <Button
                  variant="outline"
                  className="rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-black text-[10px] xs:text-xs tracking-widest uppercase border-2 border-purple-300 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  Need Guidance? Take Assessment
                  <ArrowRight className="ml-1.5 w-3 h-3 xs:w-3.5 xs:h-3.5" />
                </Button>
              </Link>
            </Reveal>
          </div>

          {/* Stats Bar */}
          <div className="mb-10 xs:mb-12 sm:mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
              {[
                {
                  label: "Total Programs",
                  value: COURSES.length,
                  icon: BookOpen,
                  color: "purple",
                  suffix: "",
                },
                {
                  label: "Active Students",
                  value: "900+",
                  icon: Users,
                  color: "amber",
                  suffix: "",
                },
                {
                  label: "Certified Scholars",
                  value: "15+",
                  icon: GraduationCap,
                  color: "purple",
                  suffix: "",
                },
                {
                  label: "Student Rating",
                  value: "4.9",
                  icon: Star,
                  color: "amber",
                  suffix: "/5",
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                const isPurple = stat.color === "purple";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card rounded-xl p-3 xs:p-4 text-center border border-border hover:border-purple-300 transition-all group"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 rounded-lg ${isPurple ? "bg-purple-100 dark:bg-purple-950/40" : "bg-amber-100 dark:bg-amber-950/40"} mb-2 group-hover:scale-110 transition-transform`}
                    >
                      <Icon
                        className={`w-4 h-4 xs:w-5 xs:h-5 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                      />
                    </div>
                    <div
                      className={`text-xl xs:text-2xl sm:text-3xl font-black ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                    >
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Course Cards - Same as before */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {COURSES.map((course, index) => {
              const Icon = course.icon;
              const isPurple = course.color === "purple";

              return (
                <Reveal key={course.id} delay={index * 0.1}>
                  <Link
                    href={course.href}
                    className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
                  >
                    <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all duration-500 p-5 sm:p-6 md:p-8 lg:p-10 relative cursor-pointer h-full shadow-sm hover:shadow-xl">
                      {/* Click Indicator */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md">
                          <ChevronRight className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>

                      {/* Sanad Badge */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
                        <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                          <Scroll className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                          Ijazah Track
                        </div>
                      </div>

                      {/* Student Count Badge */}
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[6px] sm:text-[7px] font-black text-white">
                          <Users className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          {course.students}
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8 items-start mt-6 sm:mt-8">
                        {/* Icon Container */}
                        <div className="w-full lg:w-40 h-44 sm:h-48 md:h-52 lg:h-56 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 rounded-xl sm:rounded-2xl overflow-hidden relative border border-border group-hover:border-purple-300 transition-all shrink-0 flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                            <Icon
                              className={`w-10 h-10 sm:w-12 sm:h-12 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl sm:text-5xl font-black text-purple-600/10">
                              {course.name.charAt(0)}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                          <div>
                            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tight group-hover:text-purple-600 transition-colors uppercase">
                              {course.name}
                            </h3>
                            <p className="text-purple-600 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
                              {course.tagline}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock
                              className={`w-3.5 h-3.5 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                            />
                            <p className="text-xs sm:text-sm font-bold text-foreground">
                              {course.duration} • {course.format}
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm italic font-medium text-muted-foreground/80 leading-relaxed border-l-2 border-purple-300 pl-3">
                            {course.description}
                          </p>

                          <div className="flex flex-wrap gap-3 pt-2">
                            {course.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5"
                              >
                                <CheckCircle2
                                  className={`w-3 h-3 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                                />
                                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] sm:text-xs font-black text-purple-600 flex items-center gap-1.5">
                              View Program Details
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Bottom Line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${isPurple ? "purple-600" : "amber-500"} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Trust Message */}
          <Reveal delay={0.3}>
            <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 text-center max-w-2xl mx-auto">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                    Ijazah Certified
                  </span>
                </div>
                <div className="w-px h-3 bg-border hidden xs:block" />
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                    Authentic Sanad
                  </span>
                </div>
                <div className="w-px h-3 bg-border hidden xs:block" />
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                    Certified Scholars
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Final CTA */}
          <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 mb-12 xs:mb-16 sm:mb-20">
            <div className="bg-gradient-to-br from-purple-600/5 to-amber-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto border border-purple-200 dark:border-purple-800">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950/40 mb-4">
                <Sparkles className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2">
                Not sure where to start?
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                Take our free assessment to find the perfect program for your
                level and goals. Our scholars will guide you to the right path.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/assessment">
                  <Button className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    Start Free Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300"
                  >
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

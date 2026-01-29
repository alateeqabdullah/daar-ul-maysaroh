"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  BookOpen,
  Star,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED_COURSES = [
  {
    title: "Hifz Program",
    subtitle: "Quran Memorization",
    description: "Complete Quran memorization with Ijazah certification.",
    icon: BookOpen,
    duration: "2-3 Years",
    students: "1-on-1",
    level: "All Levels",
    href: "/courses/hifz",
    features: ["Ijazah", "24/7 Portal", "Analytics"],
  },
  {
    title: "Tajweed Mastery",
    subtitle: "Scientific Recitation",
    description:
      "Perfect your Quranic pronunciation with rules-based methodology.",
    icon: Star,
    duration: "6 Months",
    students: "Small Groups",
    level: "Beginner+",
    href: "/courses/tajweed",
    features: ["Live Correction", "Audio Analysis"],
  },
  {
    title: "Arabic Fluency",
    subtitle: "Quranic Language",
    description: "Understand Quran in its original language.",
    icon: Users,
    duration: "1 Year",
    students: "Group Sessions",
    level: "Beginner",
    href: "/courses/arabic",
    features: ["Grammar", "Vocabulary", "Tafsir"],
  },
  {
    title: "Tafsir Studies",
    subtitle: "Quranic Exegesis",
    description: "Deep dive into Quranic meanings with classical methodology.",
    icon: Clock,
    duration: "1.5 Years",
    students: "1-on-1",
    level: "Advanced",
    href: "/courses/tafsir",
    features: ["Classical Sources", "Scholar Mentorship"],
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-xs sm:text-[10px] uppercase tracking-widest sm:tracking-[0.3em]">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" /> Featured Programs
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
              Sacred <span className="text-primary-700 italic">Knowledge</span>
              <br />
              Paths
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-4 sm:pl-6">
              Choose your journey into Quranic mastery with structured,
              sanad-based programs.
            </p>
          </Reveal>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {FEATURED_COURSES.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative z-10 institutional-card p-6 sm:p-8 md:p-10 h-full flex flex-col border border-transparent group-hover:border-primary-700/30">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-6 sm:mb-8 md:mb-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                        <course.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-700" />
                      </div>

                      <div>
                        <div className="text-xs sm:text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1 sm:mb-2">
                          {course.subtitle}
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary-700/10 border border-primary-700/20">
                      <span className="text-xs sm:text-sm font-black text-primary-700">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8 grow">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 sm:mb-8 md:mb-10">
                    <div className="text-xs font-black text-primary-700 uppercase tracking-widest mb-3 sm:mb-4">
                      PROGRAM FEATURES
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {course.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/10"
                        >
                          <span className="text-xs sm:text-sm font-medium text-primary-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="space-y-1">
                        <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                          FORMAT
                        </div>
                        <div className="text-base sm:text-lg font-black">
                          {course.students}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                          LEVEL
                        </div>
                        <div className="text-base sm:text-lg font-black">
                          {course.level}
                        </div>
                      </div>
                    </div>

                    <Link href={course.href} className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base group/btn">
                        <span className="flex items-center gap-2 sm:gap-3">
                          EXPLORE
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-2" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <Reveal>
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-6 sm:gap-8">
              <div className="text-base sm:text-lg text-muted-foreground font-light max-w-md px-4">
                Each program includes Ijazah certification and scholarly
                mentorship.
              </div>

              <Link href="/courses">
                <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 text-base sm:text-lg md:text-xl font-black bg-primary-700 hover:bg-primary-800 transition-all duration-500 group min-h-11 min-w-11">
                  <span className="flex items-center gap-3 sm:gap-4">
                    VIEW ALL PROGRAMS
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

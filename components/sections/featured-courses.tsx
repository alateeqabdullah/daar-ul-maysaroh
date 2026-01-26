"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  BookOpen,
  Star,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED_COURSES = [
  {
    title: "Hifz Al-Quran",
    subtitle: "Sanad-Based Memorization",
    description:
      "Complete memorization with Ijazah certification. Unbroken chain to Prophet Muhammad (ﷺ).",
    icon: BookOpen,
    duration: "2-3 Years",
    students: "1-on-1",
    level: "All Levels",
    href: "/courses/hifz",
    features: [
      "Ijazah Certification",
      "24/7 Portal Access",
      "Progress Analytics",
    ],
    color: "primary",
  },
  {
    title: "Tajweed Al-Itqan",
    subtitle: "Scientific Recitation",
    description:
      "Master Quranic phonetics with rules-based methodology. Perfect your Makharij & Sifaat.",
    icon: Star,
    duration: "6 Months",
    students: "Small Groups",
    level: "Beginner+",
    href: "/courses/tajweed",
    features: ["Live Correction", "Audio Analysis", "Mistake Tracking"],
    color: "accent",
  },
  {
    title: "Al-Lughah Al-Arabiyyah",
    subtitle: "Quranic Linguistics",
    description:
      "Understand the Quran in its divine language. Classical Arabic with Quranic vocabulary.",
    icon: Users,
    duration: "1 Year",
    students: "Group Sessions",
    level: "Beginner",
    href: "/courses/arabic",
    features: ["Quranic Grammar", "Vocabulary Builder", "Tafsir Integration"],
    color: "gold",
  },
  {
    title: "Tafsir Al-Mubin",
    subtitle: "Quranic Exegesis",
    description:
      "Deep dive into Quranic meanings with classical tafsir methodology and modern application.",
    icon: Clock,
    duration: "1.5 Years",
    students: "1-on-1",
    level: "Advanced",
    href: "/courses/tafsir",
    features: ["Classical Sources", "Thematic Studies", "Scholar Mentorship"],
    color: "purple",
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-32 lg:py-48 bg-gradient-to-b from-background via-background to-primary-50/10 dark:to-primary-950/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="max-w-4xl mb-24 space-y-8">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent" />
              <div className="inline-flex items-center gap-3 text-primary-700 font-black text-[11px] uppercase tracking-[0.4em]">
                <Sparkles className="w-4 h-4" /> ACADEMIC PROGRAMS
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent" />
            </div>

            <div className="relative">
              <h2 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85]">
                <span className="text-foreground">Paths to</span>
                <br />
                <span className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent italic">
                  Perfection.
                </span>
              </h2>

              {/* Decorative Arabic Calligraphy */}
              <div className="absolute -top-8 -right-8 opacity-5">
                <span className="font-quran text-[200px] leading-none">
                  ﻊﻠﻣ
                </span>
              </div>
            </div>

            <p className="text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed border-l-4 border-gold/50 pl-8 py-2">
              Structured journeys into Quranic mastery, each with sanad-based
              certification and scholarly mentorship.
            </p>
          </Reveal>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {FEATURED_COURSES.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative z-10 institutional-card p-10 h-full flex flex-col border-2 border-transparent group-hover:border-primary-700/30 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div
                        className={`
                        w-20 h-20 rounded-3xl flex items-center justify-center
                        relative overflow-hidden
                        ${
                          course.color === "gold"
                            ? "bg-gradient-to-br from-gold/20 to-gold/10"
                            : course.color === "accent"
                              ? "bg-gradient-to-br from-accent/20 to-accent/10"
                              : "bg-gradient-to-br from-primary-700/20 to-primary-700/10"
                        }
                      `}
                      >
                        {/* Icon Background Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary-500/30 to-transparent blur-md" />
                        <course.icon className="w-10 h-10 text-primary-700 relative z-10" />
                      </div>

                      <div>
                        <div className="text-[10px] font-black text-primary-700 uppercase tracking-[0.3em] mb-2">
                          {course.subtitle}
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tight">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="px-4 py-2 rounded-full bg-primary-700/10 border border-primary-700/20">
                      <span className="text-sm font-black text-primary-700">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 flex-grow">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="mb-10">
                    <div className="text-xs font-black text-primary-700 uppercase tracking-widest mb-4">
                      PROGRAM FEATURES
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {course.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/10"
                        >
                          <span className="text-sm font-medium text-primary-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-8 border-t border-border/50">
                    <div className="space-y-2">
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        FORMAT
                      </div>
                      <div className="text-lg font-black">
                        {course.students}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        LEVEL
                      </div>
                      <div className="text-lg font-black">{course.level}</div>
                    </div>

                    <Link href={course.href}>
                      <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-600 hover:to-primary-700 group/btn">
                        <span className="flex items-center gap-3">
                          EXPLORE
                          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-700/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <Reveal>
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-8">
              <div className="text-lg text-muted-foreground font-light max-w-md">
                Each program includes Ijazah certification, scholarly
                mentorship, and lifetime access to resources.
              </div>

              <Link href="/courses">
                <Button className="rounded-full px-12 py-7 text-xl font-black bg-gradient-to-r from-primary-700 to-primary-800 hover:shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 group">
                  <span className="flex items-center gap-4">
                    VIEW COMPLETE CURRICULUM
                    <ArrowRight className="w-6 h-6 transition-all duration-500 group-hover:translate-x-3" />
                  </span>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

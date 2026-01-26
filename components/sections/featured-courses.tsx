"use client";

import { Reveal } from "@/components/shared/section-animation";
import { BookOpen, Star, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FEATURED_COURSES = [
  {
    title: "Hifz Program",
    subtitle: "Quran Memorization",
    description:
      "Complete Quran memorization with Ijazah certification. Sanad-linked to Prophet Muhammad (ﷺ).",
    icon: BookOpen,
    duration: "2-3 Years",
    students: "1-on-1",
    level: "All Levels",
    href: "/courses/hifz",
    color: "from-primary-600 to-primary-800",
  },
  {
    title: "Tajweed Mastery",
    subtitle: "Scientific Recitation",
    description:
      "Perfect your Quranic pronunciation with rules-based methodology. Makharij & Sifaat focus.",
    icon: Star,
    duration: "6 Months",
    students: "Small Groups",
    level: "Beginner+",
    href: "/courses/tajweed",
    color: "from-accent to-accent/90",
  },
  {
    title: "Arabic Fluency",
    subtitle: "Quranic Language",
    description:
      "Understand Quran in its original language. Classical Arabic with Quranic vocabulary focus.",
    icon: Users,
    duration: "1 Year",
    students: "Group Sessions",
    level: "Beginner",
    href: "/courses/arabic",
    color: "from-gold/90 to-gold",
  },
  {
    title: "Tafsir Studies",
    subtitle: "Quranic Exegesis",
    description:
      "Deep dive into Quranic meanings. Classical tafsir methodology with modern application.",
    icon: Clock,
    duration: "1.5 Years",
    students: "1-on-1",
    level: "Advanced",
    href: "/courses/tafsir",
    color: "from-primary-400 to-primary-600",
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
              <BookOpen className="w-4 h-4" /> Featured Programs
            </div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
              Sacred <span className="text-primary-700 italic">Knowledge</span>
              <br />
              Paths
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-6">
              Choose your journey into Quranic mastery with our structured,
              sanad-based programs.
            </p>
          </Reveal>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {FEATURED_COURSES.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.1}>
              <div className="group h-full">
                {/* Card */}
                <div className="institutional-card p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
                    >
                      <course.icon className="w-7 h-7 text-primary-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grow">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-primary-700 font-black uppercase tracking-widest mb-3">
                      {course.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {course.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-black">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Format</span>
                      <span className="font-black">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-black">{course.level}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={course.href}>
                    <Button variant="ghost" className="w-full group/btn">
                      <span className="flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest">
                        Explore Program
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Button */}
        <Reveal>
          <div className="text-center">
            <Link href="/courses">
              <Button className="rounded-full px-8 py-6 text-lg font-black bg-primary-700 hover:bg-primary-800">
                <span className="flex items-center gap-3">
                  View All Programs
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

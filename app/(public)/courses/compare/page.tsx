// app/(public)/courses/compare/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Award,
  Shield,
  GraduationCap,
  Star,
  Calendar,
  Globe,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Course Data for Comparison
const COURSES = [
  {
    id: "hifz",
    name: "Hifz Al-Quran",
    category: "Quran",
    duration: "2-3 years",
    format: "1-on-1",
    sessionsPerWeek: 3,
    sessionDuration: "45 min",
    price: "$200-300/mo",
    features: [
      "Complete Quran memorization",
      "Ijazah certification",
      "Daily revision system",
      "Sanad chain tracking",
      "Progress analytics",
      "Weekly assessments",
    ],
    requirements: "Ability to read Quranic Arabic",
    outcome: "Full memorization + Ijazah",
    popular: true,
    icon: BookOpen,
    color: "from-primary-600 to-primary-800",
    badge: "Most Popular",
  },
  {
    id: "tajweed",
    name: "Tajweed Mastery",
    category: "Quran",
    duration: "6 months",
    format: "Small Groups",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    price: "$150-200/mo",
    features: [
      "Complete Tajweed rules",
      "Audio analysis technology",
      "Live correction sessions",
      "Mistake tracking",
      "Practice materials",
      "Certificate of completion",
    ],
    requirements: "Basic Quran reading ability",
    outcome: "Master all Tajweed rules",
    popular: false,
    icon: Star,
    color: "from-accent to-accent/90",
    badge: "",
  },
  {
    id: "arabic",
    name: "Quranic Arabic",
    category: "Language",
    duration: "1 year",
    format: "Group Sessions",
    sessionsPerWeek: 2,
    sessionDuration: "75 min",
    price: "$100-150/mo",
    features: [
      "Quranic vocabulary (80%+)",
      "Grammar foundations (Nahw)",
      "Morphology (Sarf)",
      "Reading comprehension",
      "Translation practice",
      "Certificate of completion",
    ],
    requirements: "No prior Arabic needed",
    outcome: "Understand Quran directly",
    popular: false,
    icon: Globe,
    color: "from-gold to-gold/90",
    badge: "Best Value",
  },
  {
    id: "tafsir",
    name: "Tafsir Studies",
    category: "Quran",
    duration: "1.5 years",
    format: "1-on-1",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    price: "$250-350/mo",
    features: [
      "Classical Tafsir works",
      "Thematic studies",
      "Scholarly mentorship",
      "Research guidance",
      "Weekly discussions",
      "Ijazah track available",
    ],
    requirements: "Arabic reading ability",
    outcome: "Independent Tafsir analysis",
    popular: false,
    icon: GraduationCap,
    color: "from-primary-500 to-primary-700",
    badge: "",
  },
  {
    id: "qiroah",
    name: "Group Qiro'ah",
    category: "Children",
    duration: "6 months",
    format: "Group (4-6)",
    sessionsPerWeek: 2,
    sessionDuration: "45 min",
    price: "$79/mo",
    features: [
      "Interactive games",
      "Reward system",
      "Parent portal access",
      "Progress reports",
      "Weekly updates",
      "Certificate",
    ],
    requirements: "Ages 7-12",
    outcome: "Confident Quran reading",
    popular: true,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    badge: "Popular",
  },
  {
    id: "juz-amma",
    name: "Juz Amma Group",
    category: "Children",
    duration: "8 months",
    format: "Group (4-6)",
    sessionsPerWeek: 2,
    sessionDuration: "50 min",
    price: "$79/mo",
    features: [
      "37 Surahs memorization",
      "Meaning explained",
      "Revision games",
      "Parent updates",
      "Progress badges",
      "Graduation ceremony",
    ],
    requirements: "Ages 6-12",
    outcome: "Complete Juz Amma memorization",
    popular: true,
    icon: Award,
    color: "from-purple-500 to-purple-600",
    badge: "New",
  },
];

const COMPARE_FIELDS = [
  { key: "duration", label: "Duration", icon: Clock },
  { key: "format", label: "Format", icon: Users },
  { key: "sessionsPerWeek", label: "Sessions/Week", icon: Calendar },
  { key: "sessionDuration", label: "Session Length", icon: Clock },
  { key: "price", label: "Monthly Tuition", icon: TrendingUp },
];

export default function CompareCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    "hifz",
    "tajweed",
  ]);
  const [expandedView, setExpandedView] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      if (selectedCourses.length > 2) {
        setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
      }
    } else {
      if (selectedCourses.length < 4) {
        setSelectedCourses([...selectedCourses, courseId]);
      }
    }
  };

  const selectedCourseData = COURSES.filter((c) =>
    selectedCourses.includes(c.id),
  );
  const availableCourses = COURSES.filter(
    (c) => !selectedCourses.includes(c.id),
  );

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/courses" className="hover:text-primary-700">
            Courses
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-medium">Compare</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" /> Find Your Perfect Path
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-tight mb-4">
              Compare <span className="text-primary-700 italic">Programs</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Select up to 4 programs to compare side-by-side and find the
              perfect fit for your journey.
            </p>
          </Reveal>
        </div>

        {/* Course Selector */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-muted/20 border border-border/50">
          <h2 className="text-sm font-black uppercase tracking-wider mb-4 text-center">
            Select Programs to Compare
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {COURSES.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const Icon = course.icon;
              return (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  disabled={!isSelected && selectedCourses.length >= 4}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
                    isSelected
                      ? "bg-primary-700 text-white shadow-md"
                      : "bg-muted/30 hover:bg-primary-700/10 border border-border",
                    !isSelected &&
                      selectedCourses.length >= 4 &&
                      "opacity-50 cursor-not-allowed",
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {course.name}
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            {selectedCourses.length}/4 programs selected
          </p>
        </div>

        {/* Comparison Table */}
        {selectedCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="p-4 font-black text-sm uppercase tracking-wider text-muted-foreground">
                  Program
                </div>
                {selectedCourseData.map((course) => (
                  <div key={course.id} className="relative">
                    <div
                      className={cn(
                        "p-4 rounded-xl text-center relative overflow-hidden",
                        "bg-gradient-to-br",
                        course.color,
                      )}
                    >
                      {course.badge && (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[8px] font-black uppercase">
                          {course.badge}
                        </div>
                      )}
                      <course.icon className="w-6 h-6 mx-auto mb-2 text-white" />
                      <h3 className="font-black text-sm text-white">
                        {course.name}
                      </h3>
                      <button
                        onClick={() => toggleCourse(course.id)}
                        className="absolute top-2 left-2 text-white/70 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Basic Info Rows */}
              {COMPARE_FIELDS.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className="grid grid-cols-5 gap-4 mb-2">
                    <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary-700" />
                      <span className="font-black text-xs uppercase tracking-wider">
                        {field.label}
                      </span>
                    </div>
                    {selectedCourseData.map((course) => (
                      <div
                        key={course.id}
                        className="p-4 rounded-xl bg-card border border-border/50 flex items-center justify-center text-center"
                      >
                        <span className="font-medium text-sm">
                          {field.key === "sessionsPerWeek"
                            ? `${course[field.key as keyof typeof course]}x/week`
                            : (course[
                                field.key as keyof typeof course
                              ] as string)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Features Row (Expandable) */}
              <div className="grid grid-cols-5 gap-4 mb-2">
                <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary-700" />
                  <span className="font-black text-xs uppercase tracking-wider">
                    Key Features
                  </span>
                </div>
                {selectedCourseData.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl bg-card border border-border/50"
                  >
                    <ul className="space-y-2">
                      {course.features
                        .slice(0, expandedView ? undefined : 3)
                        .map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 text-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary-700 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      {!expandedView && course.features.length > 3 && (
                        <button
                          onClick={() => setExpandedView(true)}
                          className="text-xs text-primary-700 font-black mt-1 flex items-center gap-1"
                        >
                          +{course.features.length - 3} more{" "}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      )}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Requirements Row */}
              <div className="grid grid-cols-5 gap-4 mb-2">
                <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-700" />
                  <span className="font-black text-xs uppercase tracking-wider">
                    Requirements
                  </span>
                </div>
                {selectedCourseData.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl bg-card border border-border/50 flex items-center justify-center text-center"
                  >
                    <span className="text-xs text-muted-foreground">
                      {course.requirements}
                    </span>
                  </div>
                ))}
              </div>

              {/* Outcome Row */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary-700" />
                  <span className="font-black text-xs uppercase tracking-wider">
                    Outcome
                  </span>
                </div>
                {selectedCourseData.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl bg-card border border-border/50 flex items-center justify-center text-center"
                  >
                    <span className="text-xs font-medium">
                      {course.outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="grid grid-cols-5 gap-4">
                <div className="p-4" />
                {selectedCourseData.map((course) => (
                  <div key={course.id} className="text-center">
                    <Link href={`/admissions?program=${course.id}`}>
                      <Button className="w-full rounded-full py-2 text-xs font-black bg-primary-700 hover:bg-primary-800">
                        Enroll Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Select at least 2 programs to compare.
            </p>
          </div>
        )}

        {/* Recommendation Section */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-50/20 to-primary-100/10 border border-primary-700/20 text-center max-w-3xl mx-auto">
          <h3 className="font-black text-xl mb-3">
            Not sure which program is right for you?
          </h3>
          <p className="text-muted-foreground mb-6">
          {`  Schedule a free assessment with our scholars. They'll evaluate your
            level and recommend the perfect program.`}
          </p>
          <Link href="/assessment">
            <Button className="rounded-full px-8 py-3 font-black bg-accent hover:bg-accent/90">
              Book Free Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

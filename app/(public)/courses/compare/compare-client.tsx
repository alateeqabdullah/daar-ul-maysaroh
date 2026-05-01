// app/compare/compare-client.tsx
"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  X,
  Clock,
  Users,
  Award,
  Crown,
  Star,
  BookOpen,
  Mic,
  Globe,
  Heart,
  TrendingUp,
  Shield,
  GraduationCap,
  Sparkles,
  Filter,
  ChevronDown,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Complete Course Data
const ALL_COURSES = [
  {
    id: "hifz",
    name: "Hifz Al-Quran",
    tagline: "Complete Memorization",
    description:
      "Master the entire Quran with proper Tajweed and receive Ijazah certification with complete Sanad.",
    duration: "2-3 years",
    format: "1-on-1",
    students: "200+",
    rating: 4.9,
    level: "All Levels",
    price: "$200-300/month",
    features: [
      "Ijazah Certification",
      "Daily Revision System",
      "Progress Tracking",
      "Sanad Chain",
      "Teacher 1-on-1",
      "Flexible Scheduling",
    ],
    prerequisites: "Basic reading ability recommended",
    bestFor: "Complete Quran memorization seekers",
    icon: Crown,
    color: "purple",
    category: "memorization",
    href: "/courses/hifz",
  },
  {
    id: "tajweed",
    name: "Tajweed Al-Itqan",
    tagline: "Scientific Recitation",
    description:
      "Master the science of Quranic recitation with precision. Learn Makharij, Sifaat, and Ahkam.",
    duration: "6-12 months",
    format: "1-on-1",
    students: "300+",
    rating: 4.8,
    level: "Intermediate",
    price: "$150-200/month",
    features: [
      "Live Correction",
      "Audio Analysis",
      "Certificate",
      "Practice Sessions",
      "Teacher 1-on-1",
      "Flexible Scheduling",
    ],
    prerequisites: "Ability to read Quran",
    bestFor: "Perfecting recitation and Tajweed rules",
    icon: Mic,
    color: "amber",
    category: "recitation",
    href: "/courses/tajweed",
  },
  {
    id: "arabic",
    name: "Al-Lughah Al-Arabiyyah",
    tagline: "Quranic Language",
    description:
      "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "150+",
    rating: 4.7,
    level: "Beginner",
    price: "$100-150/month",
    features: [
      "Grammar Mastery",
      "Vocabulary Building",
      "Tafsir Reading",
      "Certificate",
      "Teacher 1-on-1",
      "Flexible Scheduling",
    ],
    prerequisites: "None",
    bestFor: "Understanding Quran without translation",
    icon: Globe,
    color: "purple",
    category: "language",
    href: "/courses/arabic",
  },
  {
    id: "group-tajweed",
    name: "Group Tajweed",
    tagline: "Learn Together",
    description:
      "Learn Tajweed in a supportive group environment. Perfect for those who thrive with peer learning.",
    duration: "6-9 months",
    format: "Group (4-6)",
    students: "100+",
    rating: 4.8,
    level: "Beginner",
    price: "$79/month",
    features: [
      "Peer Learning",
      "Lower Cost",
      "Group Activities",
      "Certificate",
      "Group Sessions",
      "Fixed Schedule",
    ],
    prerequisites: "Ability to read Arabic letters",
    bestFor: "Budget-conscious learners who enjoy group settings",
    icon: Users,
    color: "amber",
    category: "group",
    href: "/courses/group-tajweed",
  },
  {
    id: "group-qiroah",
    name: "Group Qiro'ah",
    tagline: "Children's Reading",
    description:
      "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy.",
    duration: "6-9 months",
    format: "Group (4-6)",
    students: "100+",
    rating: 4.9,
    level: "Children",
    price: "$69/month",
    features: [
      "Fun Activities",
      "Parent Portal",
      "Progress Reports",
      "Certificate",
      "Group Sessions",
      "Fixed Schedule",
    ],
    prerequisites: "None",
    bestFor: "Children learning to read Quran",
    icon: Heart,
    color: "purple",
    category: "children",
    href: "/courses/group-qiroah",
  },
  {
    id: "tafsir",
    name: "Tafsir Al-Mubin",
    tagline: "Quranic Exegesis",
    description:
      "Deep dive into Quranic meanings with classical methodology. Understand context and interpretations.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "80+",
    rating: 4.8,
    level: "Advanced",
    price: "$150-200/month",
    features: [
      "Classical Sources",
      "Scholar Mentorship",
      "Research Skills",
      "Certificate",
      "Teacher 1-on-1",
      "Flexible Scheduling",
    ],
    prerequisites: "Arabic reading and basic Tajweed",
    bestFor: "Deep understanding of Quranic meanings",
    icon: BookOpen,
    color: "amber",
    category: "studies",
    href: "/courses/tafsir",
  },
];

const CATEGORIES = [
  { id: "all", name: "All Programs", count: ALL_COURSES.length },
  {
    id: "memorization",
    name: "Memorization",
    count: ALL_COURSES.filter((c) => c.category === "memorization").length,
  },
  {
    id: "recitation",
    name: "Recitation",
    count: ALL_COURSES.filter((c) => c.category === "recitation").length,
  },
  {
    id: "language",
    name: "Arabic",
    count: ALL_COURSES.filter((c) => c.category === "language").length,
  },
  {
    id: "group",
    name: "Group Programs",
    count: ALL_COURSES.filter((c) => c.category === "group").length,
  },
  {
    id: "children",
    name: "Children",
    count: ALL_COURSES.filter((c) => c.category === "children").length,
  },
  {
    id: "studies",
    name: "Quranic Studies",
    count: ALL_COURSES.filter((c) => c.category === "studies").length,
  },
];

const COMPARE_FEATURES = [
  { id: "duration", label: "Duration", icon: Clock },
  { id: "format", label: "Format", icon: Users },
  { id: "level", label: "Level", icon: GraduationCap },
  { id: "price", label: "Price", icon: Award },
  { id: "rating", label: "Rating", icon: Star },
  { id: "students", label: "Students", icon: TrendingUp },
];

const getColorStyles = (color: string) =>
  ({
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
    },
  })[color];

export default function CompareClient() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    "hifz",
    "tajweed",
  ]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  const availableCourses = ALL_COURSES.filter(
    (course) => activeCategory === "all" || course.category === activeCategory,
  );

  const selectedCourseData = selectedCourses
    .map((id) => ALL_COURSES.find((c) => c.id === id))
    .filter(Boolean);

  const addCourse = (courseId: string) => {
    if (selectedCourses.length < 4 && !selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
    setShowDropdown(false);
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
  };

  return (
    <main className="relative bg-background overflow-hidden min-h-screen">
      {/* Background */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-purple-600">Compare Courses</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 xs:mb-12 sm:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-purple-700">
                Find Your Perfect Path
              </span>
            </div>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Compare{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Programs
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Select up to 4 courses to compare side-by-side and find the
              perfect program for your goals.
            </p>
          </Reveal>
        </div>

        {/* Course Selection Bar */}
        <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-4 xs:p-5 mb-8 xs:mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Comparing:
            </span>

            {/* Selected Course Chips */}
            <div className="flex flex-wrap gap-2">
              {selectedCourseData.map((course) => {
                if (!course) return null;
                const colors = getColorStyles(course.color);
                return (
                  <div
                    key={course.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}
                  >
                    <course.icon className={`w-3.5 h-3.5 ${colors.text}`} />
                    <span className={`text-xs font-black ${colors.text}`}>
                      {course.name}
                    </span>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="hover:opacity-70 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add Course Dropdown */}
            {selectedCourses.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-dashed border-purple-300 text-purple-600 text-xs font-black hover:bg-purple-50 transition"
                >
                  + Add Course
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card border border-purple-200 rounded-xl shadow-lg z-20"
                    >
                      {/* Category Filter inside dropdown */}
                      <div className="p-2 border-b border-purple-200">
                        <select
                          value={activeCategory}
                          onChange={(e) => setActiveCategory(e.target.value)}
                          className="w-full text-xs font-black bg-transparent border-none focus:outline-none"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name} ({cat.count})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {availableCourses.map((course) => {
                          const isSelected = selectedCourses.includes(
                            course.id,
                          );
                          const colors = getColorStyles(course.color);
                          return (
                            <button
                              key={course.id}
                              onClick={() => addCourse(course.id)}
                              disabled={isSelected}
                              className={cn(
                                "w-full text-left px-3 py-2 text-xs hover:bg-purple-50 transition flex items-center gap-2",
                                isSelected && "opacity-50 cursor-not-allowed",
                              )}
                            >
                              <course.icon
                                className={`w-3.5 h-3.5 ${colors.text}`}
                              />
                              <span className="flex-1">{course.name}</span>
                              {isSelected && (
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedCourseData.length === 0 ? (
          <div className="text-center py-12 xs:py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Select at least one course to compare
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header Row */}
              <thead>
                <tr>
                  <th className="text-left p-4 bg-muted/20 rounded-l-xl w-32">
                    Feature
                  </th>
                  {selectedCourseData.map((course) => (
                    <th
                      key={course.id}
                      className="text-center p-4 min-w-[200px]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getColorStyles(course.color).gradient} flex items-center justify-center`}
                        >
                          <course.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-black text-sm">
                            {course.name}
                          </div>
                          <div className="text-[9px] text-muted-foreground">
                            {course.tagline}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Monthly Tuition
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      <span
                        className={`font-black ${getColorStyles(course.color).text}`}
                      >
                        {course.price}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Duration Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      Duration
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      {course.duration}
                    </td>
                  ))}
                </tr>

                {/* Format Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      Format
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      {course.format}
                    </td>
                  ))}
                </tr>

                {/* Level Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      Level
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      {course.level}
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      Student Rating
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-black">{course.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Students Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Active Students
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      {course.students}
                    </td>
                  ))}
                </tr>

                {/* Prerequisites Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-500" />
                      Prerequisites
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center text-sm">
                      {course.prerequisites}
                    </td>
                  ))}
                </tr>

                {/* Best For Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      Best For
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center text-sm">
                      {course.bestFor}
                    </td>
                  ))}
                </tr>

                {/* Features Row - Merged */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 font-black text-sm bg-muted/10 rounded-l-lg align-top">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Key Features
                    </div>
                  </td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {course.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-1.5 text-xs"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr className="border-t border-purple-200 dark:border-purple-800">
                  <td className="p-4 bg-muted/10 rounded-l-lg"></td>
                  {selectedCourseData.map((course) => (
                    <td key={course.id} className="p-4 text-center">
                      <Link href={course.href}>
                        <Button className="w-full rounded-lg py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                          Learn More
                          <ArrowRight className="w-3 h-3 ml-1.5" />
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Recommendation Section */}
        {selectedCourseData.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-10 xs:mt-12 sm:mt-16 p-5 xs:p-6 rounded-xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 border border-purple-200 dark:border-purple-800">
              <h3 className="font-black text-base mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Not sure which to choose?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Still have questions about which program fits your goals? Take
                our free assessment or speak with an advisor.
              </p>
              <div className="flex flex-col xs:flex-row gap-3">
                <Link href="/assessment">
                  <Button className="rounded-full px-5 py-2 font-black text-xs bg-purple-600 hover:bg-purple-700 text-white">
                    Start Free Assessment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-5 py-2 font-black text-xs border-purple-300 text-purple-600"
                  >
                    Talk to an Advisor
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* Back to Courses */}
        <div className="text-center mt-10 xs:mt-12 sm:mt-16 mb-12">
          <Link href="/courses">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2.5 font-black text-xs border-purple-300 text-purple-600"
            >
              ← Back to All Courses
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// app/(public)/courses/compare/page.tsx
"use client";

import { useState, useEffect } from "react";
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
  Zap,
  Heart,
  Crown,
  Diamond,
  Target,
  Layers,
  FileText,
  Video,
  Headphones,
  Mic,
  Monitor,
  Wifi,
  Coffee,
  Moon,
  Sun,
  Trophy,
  Medal,
  Gem,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    id: "hifz",
    name: "Hifz Al-Quran",
    subtitle: "Complete Memorization",
    category: "Quran",
    duration: "2-3 years",
    format: "1-on-1",
    sessionsPerWeek: 3,
    sessionDuration: "45 min",
    price: "$200-300",
    pricePeriod: "/mo",
    rating: 4.9,
    students: 156,
    features: [
      "Complete Quran memorization",
      "Ijazah certification with Sanad",
      "Daily revision system",
      "Advanced progress tracking",
      "Weekly assessments",
      "Teacher matching",
      "Parent portal access",
      "24/7 practice portal",
    ],
    requirements: "Ability to read Quranic Arabic",
    outcome: "Full memorization + Ijazah",
    popular: true,
    icon: BookOpen,
    color: "from-primary-600 to-primary-800",
    badge: "Most Popular",
    bgGlow: "from-primary-600/20 to-primary-800/10",
    highlightColor: "primary",
  },
  {
    id: "tajweed",
    name: "Tajweed Al-Itqan",
    subtitle: "Scientific Recitation",
    category: "Quran",
    duration: "6 months",
    format: "Small Groups",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    price: "$150-200",
    pricePeriod: "/mo",
    rating: 4.8,
    students: 203,
    features: [
      "Complete Tajweed rules mastery",
      "Audio analysis technology",
      "Live correction sessions",
      "Mistake tracking system",
      "Practice materials library",
      "Certificate of completion",
      "Monthly progress reports",
      "Recorded session access",
    ],
    requirements: "Basic Quran reading ability",
    outcome: "Master all Tajweed rules",
    popular: false,
    icon: Mic,
    color: "from-accent to-accent/90",
    badge: "",
    bgGlow: "from-accent/20 to-accent/10",
    highlightColor: "accent",
  },
  {
    id: "arabic",
    name: "Al-Lughah Al-Arabiyyah",
    subtitle: "Quranic Linguistics",
    category: "Language",
    duration: "1 year",
    format: "Group Sessions",
    sessionsPerWeek: 2,
    sessionDuration: "75 min",
    price: "$100-150",
    pricePeriod: "/mo",
    rating: 4.7,
    students: 312,
    features: [
      "80%+ Quranic vocabulary mastery",
      "Complete grammar (Nahw & Sarf)",
      "Reading comprehension",
      "Translation practice",
      "Tafsir integration",
      "Certificate of completion",
      "Interactive exercises",
      "Audio resources",
    ],
    requirements: "No prior Arabic needed",
    outcome: "Understand Quran directly",
    popular: false,
    icon: Globe,
    color: "from-gold to-gold/90",
    badge: "Best Value",
    bgGlow: "from-gold/20 to-gold/10",
    highlightColor: "gold",
  },
  {
    id: "tafsir",
    name: "Tafsir Al-Mubin",
    subtitle: "Quranic Exegesis",
    category: "Quran",
    duration: "1.5 years",
    format: "1-on-1",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    price: "$250-350",
    pricePeriod: "/mo",
    rating: 4.9,
    students: 78,
    features: [
      "Classical Tafsir works study",
      "Thematic Quranic studies",
      "Scholarly mentorship",
      "Research guidance",
      "Weekly discussions",
      "Ijazah track available",
      "Primary source analysis",
      "Academic writing support",
    ],
    requirements: "Arabic reading ability",
    outcome: "Independent Tafsir analysis",
    popular: false,
    icon: GraduationCap,
    color: "from-primary-500 to-primary-700",
    badge: "",
    bgGlow: "from-primary-500/20 to-primary-700/10",
    highlightColor: "primary",
  },
  {
    id: "qiroah",
    name: "Group Qiro'ah",
    subtitle: "Children's Reading",
    category: "Children",
    duration: "6 months",
    format: "Group (4-6)",
    sessionsPerWeek: 2,
    sessionDuration: "45 min",
    price: "$79",
    pricePeriod: "/mo",
    rating: 4.8,
    students: 45,
    features: [
      "Interactive learning games",
      "Reward system with prizes",
      "Parent portal access",
      "Weekly progress reports",
      "Fun Quran competitions",
      "Certificate of completion",
      "Child-friendly materials",
      "Progress badges",
    ],
    requirements: "Ages 7-12",
    outcome: "Confident Quran reading",
    popular: true,
    icon: Heart,
    color: "from-blue-500 to-blue-600",
    badge: "Popular",
    bgGlow: "from-blue-500/20 to-blue-600/10",
    highlightColor: "blue",
  },
  {
    id: "juz-amma",
    name: "Juz Amma Group",
    subtitle: "Children's Memorization",
    category: "Children",
    duration: "8 months",
    format: "Group (4-6)",
    sessionsPerWeek: 2,
    sessionDuration: "50 min",
    price: "$79",
    pricePeriod: "/mo",
    rating: 4.9,
    students: 38,
    features: [
      "37 Surahs memorization",
      "Meaning explained simply",
      "Revision games",
      "Parent updates",
      "Progress badges",
      "Graduation ceremony",
      "Audio recordings",
      "Certificate of excellence",
    ],
    requirements: "Ages 6-12",
    outcome: "Complete Juz Amma memorization",
    popular: true,
    icon: Trophy,
    color: "from-purple-500 to-purple-600",
    badge: "New",
    bgGlow: "from-purple-500/20 to-purple-600/10",
    highlightColor: "purple",
  },
];

const COMPARE_ATTRIBUTES = [
  { key: "duration", label: "Duration", icon: Clock, description: "Time to complete" },
  { key: "format", label: "Format", icon: Users, description: "Class structure" },
  { key: "sessionsPerWeek", label: "Weekly Sessions", icon: Calendar, description: "Classes per week" },
  { key: "sessionDuration", label: "Session Length", icon: Clock, description: "Minutes per class" },
  { key: "price", label: "Monthly Tuition", icon: TrendingUp, description: "USD per month" },
];

export default function CompareCoursesPage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(["hifz", "tajweed"]);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      if (selectedCourses.length > 2) {
        setSelectedCourses(selectedCourses.filter(id => id !== courseId));
      }
    } else {
      if (selectedCourses.length < 4) {
        setSelectedCourses([...selectedCourses, courseId]);
      }
    }
  };

  const toggleFeatures = (courseId: string) => {
    setExpandedFeatures(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const selectedCourseData = COURSES.filter(c => selectedCourses.includes(c.id));
  const availableCourses = COURSES.filter(c => !selectedCourses.includes(c.id));

  const getHighlightStyles = (color: string) => {
    const styles = {
      primary: "border-primary-700/50 bg-primary-700/5 shadow-primary-700/20",
      accent: "border-accent/50 bg-accent/5 shadow-accent/20",
      gold: "border-gold/50 bg-gold/5 shadow-gold/20",
      blue: "border-blue-500/50 bg-blue-500/5 shadow-blue-500/20",
      purple: "border-purple-500/50 bg-purple-500/5 shadow-purple-500/20",
    };
    return styles[color as keyof typeof styles] || styles.primary;
  };

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-700/5 rounded-full blur-[150px] -z-10" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-gold/20 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary-700/20 rounded-full blur-md animate-pulse delay-300" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent/20 rounded-full blur-sm animate-pulse delay-700" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary-700 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/courses" className="hover:text-primary-700 transition-colors">Courses</Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-medium">Compare Programs</span>
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
              Select up to 4 programs to compare side-by-side and find the perfect fit for your journey.
            </p>
          </Reveal>
        </div>

        {/* Course Selector - Premium */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-sm font-black uppercase tracking-wider">Select Programs to Compare</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{selectedCourses.length}/4 selected</span>
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-700 rounded-full transition-all duration-300"
                  style={{ width: `${(selectedCourses.length / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {COURSES.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const Icon = course.icon;
              return (
                <motion.button
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCourse(course.id)}
                  disabled={!isSelected && selectedCourses.length >= 4}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
                    isSelected
                      ? "bg-primary-700 text-white shadow-lg"
                      : "bg-muted/30 hover:bg-primary-700/10 border border-border",
                    !isSelected && selectedCourses.length >= 4 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {course.name}
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 ml-1" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Comparison View - Premium Cards */}
        {selectedCourses.length > 0 ? (
          <>
            {/* View Toggle */}
            <div className="flex justify-end mb-6">
              <div className="inline-flex rounded-full border border-border p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-black transition-all",
                    viewMode === "grid" ? "bg-primary-700 text-white" : "hover:bg-muted/30"
                  )}
                >
                  Card View
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-black transition-all",
                    viewMode === "table" ? "bg-primary-700 text-white" : "hover:bg-muted/30"
                  )}
                >
                  Table View
                </button>
              </div>
            </div>

            {/* Grid View - Premium Cards */}
            {viewMode === "grid" && (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {selectedCourseData.map((course, idx) => {
                    const isHovered = hoveredCourse === course.id;
                    const Icon = course.icon;
                    const isExpanded = expandedFeatures[course.id];
                    const featuresToShow = isExpanded ? course.features : course.features.slice(0, 4);
                    
                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        onMouseEnter={() => setHoveredCourse(course.id)}
                        onMouseLeave={() => setHoveredCourse(null)}
                        className="relative"
                      >
                        {/* Animated Border Glow */}
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "absolute -inset-0.5 rounded-3xl blur-xl opacity-0 transition-opacity duration-500",
                            `bg-gradient-to-r ${course.bgGlow}`
                          )}
                        />
                        
                        {/* Card */}
                        <div className={cn(
                          "relative rounded-3xl border-2 p-6 h-full flex flex-col transition-all duration-500 bg-gradient-to-br from-background to-primary-50/5",
                          isHovered && "shadow-2xl",
                          getHighlightStyles(course.highlightColor)
                        )}>
                          {/* Badge */}
                          {course.badge && (
                            <div className="absolute -top-3 left-6">
                              <div className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg",
                                course.popular ? "bg-gradient-to-r from-primary-700 to-primary-800 text-white" : "bg-gold text-black"
                              )}>
                                {course.badge}
                              </div>
                            </div>
                          )}

                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={cn(
                              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                              course.color
                            )}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-gold text-gold" />
                                <span className="text-sm font-black">{course.rating}</span>
                                <span className="text-xs text-muted-foreground">({course.students})</span>
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-black mb-1">{course.name}</h3>
                          <p className="text-xs text-primary-700 font-black uppercase tracking-wider mb-4">{course.subtitle}</p>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-muted/30 text-center">
                              <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-primary-700" />
                              <p className="text-[10px] font-black uppercase tracking-wider">Duration</p>
                              <p className="text-xs font-medium">{course.duration}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-muted/30 text-center">
                              <Users className="w-3.5 h-3.5 mx-auto mb-1 text-primary-700" />
                              <p className="text-[10px] font-black uppercase tracking-wider">Format</p>
                              <p className="text-xs font-medium">{course.format}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-muted/30 text-center">
                              <Calendar className="w-3.5 h-3.5 mx-auto mb-1 text-primary-700" />
                              <p className="text-[10px] font-black uppercase tracking-wider">Weekly</p>
                              <p className="text-xs font-medium">{course.sessionsPerWeek}x {course.sessionDuration}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-muted/30 text-center">
                              <TrendingUp className="w-3.5 h-3.5 mx-auto mb-1 text-primary-700" />
                              <p className="text-[10px] font-black uppercase tracking-wider">Tuition</p>
                              <p className="text-xs font-black text-primary-700">{course.price}{course.pricePeriod}</p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4 flex-grow">
                            <p className="text-[10px] font-black uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Award className="w-3 h-3" /> Key Features
                            </p>
                            <ul className="space-y-2">
                              {featuresToShow.map((feature, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.02 }}
                                  className="flex items-start gap-2 text-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-700 shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                            {course.features.length > 4 && (
                              <button
                                onClick={() => toggleFeatures(course.id)}
                                className="text-xs text-primary-700 font-black mt-3 flex items-center gap-1 hover:gap-2 transition-all"
                              >
                                {isExpanded ? (
                                  <>Show less <ChevronUp className="w-3 h-3" /></>
                                ) : (
                                  <>+{course.features.length - 4} more features <ChevronDown className="w-3 h-3" /></>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Requirements & Outcome */}
                          <div className="mb-4 p-3 rounded-xl bg-muted/20">
                            <div className="flex items-start gap-2 mb-2 text-xs">
                              <Shield className="w-3.5 h-3.5 text-primary-700 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-wider">Requirements</p>
                                <p className="text-xs text-muted-foreground">{course.requirements}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-xs">
                              <GraduationCap className="w-3.5 h-3.5 text-primary-700 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-wider">Outcome</p>
                                <p className="text-xs text-muted-foreground">{course.outcome}</p>
                              </div>
                            </div>
                          </div>

                          {/* CTA */}
                          <Link href={`/admissions?program=${course.id}`}>
                            <Button className="w-full rounded-xl py-3 font-black text-xs uppercase tracking-wider bg-primary-700 hover:bg-primary-800 group">
                              Choose {course.name.split(' ')[0]}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Table View - Premium */}
            {viewMode === "table" && (
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header */}
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="p-4 font-black text-sm uppercase tracking-wider text-muted-foreground bg-muted/20 rounded-xl">
                      Program
                    </div>
                    {selectedCourseData.map((course) => (
                      <div key={course.id} className={cn(
                        "p-4 rounded-xl text-center relative overflow-hidden bg-gradient-to-br",
                        course.color
                      )}>
                        {course.badge && (
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[8px] font-black uppercase">
                            {course.badge}
                          </div>
                        )}
                        <course.icon className="w-6 h-6 mx-auto mb-2 text-white" />
                        <h3 className="font-black text-sm text-white">{course.name}</h3>
                        <p className="text-[10px] text-white/80 mt-1">{course.subtitle}</p>
                        <button
                          onClick={() => toggleCourse(course.id)}
                          className="absolute top-2 left-2 text-white/70 hover:text-white text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Comparison Rows */}
                  {COMPARE_ATTRIBUTES.map((attr) => {
                    const Icon = attr.icon;
                    return (
                      <div key={attr.key} className="grid grid-cols-5 gap-4 mb-2">
                        <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary-700" />
                          <div>
                            <span className="font-black text-xs uppercase tracking-wider">{attr.label}</span>
                            <p className="text-[9px] text-muted-foreground">{attr.description}</p>
                          </div>
                        </div>
                        {selectedCourseData.map((course) => (
                          <div key={course.id} className="p-4 rounded-xl bg-card border border-border/50 flex items-center justify-center text-center">
                            <span className="font-medium text-sm">
                              {attr.key === "sessionsPerWeek" 
                                ? `${course[attr.key as keyof typeof course]}x/week`
                                : course[attr.key as keyof typeof course] as string}
                              {attr.key === "price" && course.pricePeriod}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* Features Row */}
                  <div className="grid grid-cols-5 gap-4 mb-2">
                    <div className="p-4 rounded-xl bg-muted/20 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary-700" />
                      <div>
                        <span className="font-black text-xs uppercase tracking-wider">Key Features</span>
                        <p className="text-[9px] text-muted-foreground">Program inclusions</p>
                      </div>
                    </div>
                    {selectedCourseData.map((course) => (
                      <div key={course.id} className="p-4 rounded-xl bg-card border border-border/50">
                        <ul className="space-y-2">
                          {course.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs">
                              <CheckCircle2 className="w-3 h-3 text-primary-700 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                          {course.features.length > 4 && (
                            <p className="text-xs text-primary-700 font-black mt-1">+{course.features.length - 4} more</p>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* CTA Row */}
                  <div className="grid grid-cols-5 gap-4">
                    <div className="p-4" />
                    {selectedCourseData.map((course) => (
                      <div key={course.id} className="text-center">
                        <Link href={`/admissions?program=${course.id}`}>
                          <Button className="w-full rounded-xl py-2.5 text-xs font-black bg-primary-700 hover:bg-primary-800">
                            Enroll Now
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
              <Layers className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-black mb-2">No programs selected</h3>
            <p className="text-muted-foreground">Select at least 2 programs above to start comparing.</p>
          </div>
        )}

        {/* Recommendation CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary-50/20 to-primary-100/10 border border-primary-700/20 text-center max-w-3xl mx-auto">
          <Rocket className="w-12 h-12 text-primary-700 mx-auto mb-4" />
          <h3 className="font-black text-xl mb-3">Not sure which program is right for you?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Schedule a free assessment with our scholars. They'll evaluate your level and recommend the perfect program.
          </p>
          <Link href="/assessment">
            <Button className="rounded-full px-8 py-3 font-black bg-accent hover:bg-accent/90 group">
              Book Free Assessment
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      </main>
  );
}
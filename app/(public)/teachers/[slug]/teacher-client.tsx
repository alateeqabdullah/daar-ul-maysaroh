// app/teachers/[slug]/teacher-client.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Verified,
  Crown,
  Scroll,
  Globe,
  Award,
  Star,
  Calendar,
  BookOpen,
  Quote,
  Clock,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherClientProps {
  teacher: {
    id: string;
    name: string;
    rank: string;
    shortRank: string;
    credentials: string;
    philosophy: string;
    fullBio: string;
    students: string;
    experience: string;
    sanad: string;
    featured: boolean;
    specialties: string[];
    rating: number;
    languages: string[];
    availability: string;
    education: string[];
    publications: string[];
    schedule: {
      timezone: string;
      availability: string;
    };
  };
}

const getAvailabilityStyles = (availability: string) => {
  switch (availability) {
    case "Accepting":
      return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800";
    case "Limited Slots":
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    case "Waitlist":
      return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-200 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TeacherClient({ teacher }: TeacherClientProps) {
  const [activeTab, setActiveTab] = useState<
    "bio" | "education" | "publications"
  >("bio");

  return (
    <main className="relative bg-background overflow-hidden min-h-screen">
      {/* Premium Background Effects */}
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
        <div className="pt-30 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href="/teachers"
              className="hover:text-purple-600 transition-colors"
            >
              Our Scholars
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-purple-600">
              {teacher.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <Reveal>
          <div className="max-w-5xl mx-auto mb-12 xs:mb-16">
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden shadow-xl">
              {/* Availability Badge */}
              <div
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase ${getAvailabilityStyles(teacher.availability)}`}
              >
                {teacher.availability}
              </div>

              {/* Sanad Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                  <Scroll className="w-2.5 h-2.5" />
                  {teacher.sanad}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 items-center lg:items-start mt-8 sm:mt-10">
                {/* Portrait */}
                <div className="shrink-0">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-2 bg-linear-to-r from-purple-600 to-amber-500 rounded-full blur-xl opacity-30" />
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-linear-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 flex items-center justify-center border-4 border-purple-200 group-hover:border-purple-400 transition-all shadow-2xl">
                      <span className="text-5xl sm:text-6xl md:text-7xl font-black text-purple-600/30">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    {/* Rating */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-[10px] font-black text-white">
                        {teacher.rating}.0
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <p className="text-purple-600 font-black text-xs uppercase tracking-wider">
                      {teacher.shortRank}
                    </p>
                  </div>

                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-2">
                    {teacher.name}
                  </h1>
                  <p className="text-purple-600 font-black text-sm sm:text-base uppercase tracking-wider mb-4">
                    {teacher.rank}
                  </p>

                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                    <Verified className="w-4 h-4 text-amber-500" />
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      {teacher.credentials}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    {teacher.specialties.map(
                      (specialty: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[9px] sm:text-[10px] font-black"
                        >
                          {specialty}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mb-4">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-black">
                        {teacher.students}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-black">
                        {teacher.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-black">
                        {teacher.languages.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="italic border-l-2 border-amber-500 pl-4 mb-6">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                     {` "${teacher.philosophy}"`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-border">
              {[
                { id: "bio", label: "Biography", icon: BookOpen },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "publications", label: "Publications", icon: Award },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-wider transition-all",
                      isActive
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-muted-foreground hover:text-purple-600",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              {activeTab === "bio" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Biography
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {teacher.fullBio}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <blockquote className="italic text-muted-foreground border-l-2 border-amber-500 pl-4">
                      <Quote className="w-4 h-4 text-amber-500 mb-2" />
                      <p className="text-sm">{`"${teacher.philosophy}"`}</p>
                      <p className="text-xs font-black text-purple-600 mt-2">
                        — {teacher.name}
                      </p>
                    </blockquote>
                  </div>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-500" />
                    Education & Certifications
                  </h2>
                  <div className="space-y-4">
                    {teacher.education.map((edu: string, idx: number) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <p className="text-sm">{edu}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "publications" &&
                teacher.publications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Publications & Works
                    </h2>
                    <div className="space-y-4">
                      {teacher.publications.map((pub: string, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <BookOpen className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">{pub}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              {activeTab === "publications" &&
                teacher.publications.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No publications listed at this time.
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Schedule Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-base font-black mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="font-black">
                    {teacher.schedule.timezone}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Hours:</span>
                  <span className="font-black">
                    {teacher.schedule.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Book Session Card */}
            <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-6 bg-linear-to-br from-purple-50/30 to-amber-50/30">
              <h3 className="text-base font-black mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-500" />
                Book a Session
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Ready to start your journey with {teacher.name.split(" ")[0]}?
                Begin with a free assessment session.
              </p>
              <div className="space-y-3">
                <Link href="/assessment">
                  <Button className="w-full rounded-lg py-2.5 font-black text-xs bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                    Book Free Assessment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full rounded-lg py-2.5 font-black text-xs border-purple-300 text-purple-600"
                  >
                    Contact Admissions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-base font-black mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Students Taught
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.students}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Years Experience
                  </span>
                  <span className="text-sm font-black text-amber-600">
                    {teacher.experience}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Languages
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.languages.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Sanad Status
                  </span>
                  <span className="text-sm font-black text-green-600">
                    ✓ Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to All Scholars */}
        <div className="text-center mt-12 xs:mt-16">
          <Link href="/teachers">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2.5 font-black text-xs border-purple-300 text-purple-600 hover:bg-purple-50 group"
            >
              ← Back to All Scholars
            </Button>
          </Link>
        </div>

        {/* Trust Message */}
        <div className="mt-12 xs:mt-16 text-center max-w-2xl mx-auto">
          <p className="text-xs xs:text-sm text-muted-foreground font-medium border-t border-border/50 pt-6 xs:pt-8">
            Our Dean personally matches each student with the perfect teacher
            after their assessment based on their learning style, goals, and
            spiritual journey.
          </p>
        </div>
      </div>
    </main>
  );
}

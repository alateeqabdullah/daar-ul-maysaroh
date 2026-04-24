// app/teachers/teachers-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  GraduationCap,
  Verified,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Crown,
  Scroll,
  Users,
  Globe,
  Award,
  Star,
  Mail,
  MessageCircle,
  Calendar,
  BookOpen,
  Sparkles,
  Filter,
  Search,
  X,
  Quote,
  Clock,
  MapPin,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Teacher Data
const TEACHERS = [
  {
    id: "sheikh-abubakar-abdurrozzaaq",
    name: "Shaykh Abubakar Abdurrozzaaq Al-Maysari",
    rank: "Dean of Academic Affairs & Chief Scholar",
    credentials: "Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
    slug: "abubakar-abdurrozzaaq-al-maysari",
    fullBio:
      "With over 25 years of teaching experience, Shaykh Abubakar holds ijazah in all ten Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 200 certified Qurra worldwide.",
    students: "100+ certified Qurra",
    experience: "25+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: true,
    specialties: ["Qira'at", "Hifz", "Sanad"],
    rating: 5,
    languages: ["Arabic", "English"],
    availability: "Limited Slots",
  },
  {
    id: "ustadha-fatimah-zahrah-alagbada",
    name: "Ustadha Fatimah Zahrah Alagbada",
    rank: "Head of Female Hifz Department",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
    slug: "fatimah-zahrah-alagbada",
    fullBio:
      "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij.",
    students: "50+ female graduates",
    experience: "15+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: true,
    specialties: ["Hifz", "Tajweed", "Women's Education"],
    rating: 5,
    languages: ["Arabic", "English", "Hausa"],
    availability: "Accepting",
  },
  {
    id: "sheikh-umar-al-hasan",
    name: "Shaykh Umar Al-Hasan",
    rank: "Senior Tajweed Instructor",
    credentials: "Ijazah in Hafs & Shu'bah",
    philosophy: "Each letter carries a light that illuminates the heart.",
    slug: "umar-al-hasan",
    fullBio:
      "Shaykh Umar is a master of Tajweed sciences with special focus on makharij and sifaat. He has authored several works on Quranic phonetics.",
    students: "80+ certified",
    experience: "20+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: false,
    specialties: ["Tajweed", "Phonetics"],
    rating: 5,
    languages: ["Arabic", "English"],
    availability: "Waitlist",
  },
  {
    id: "ustadha-maryam-bint-yusuf",
    name: "Ustadha Maryam Bint Yusuf",
    rank: "Arabic & Quranic Studies",
    credentials: "MA in Arabic Linguistics, Ijazah",
    philosophy:
      "Understanding the Quran transforms your relationship with Allah.",
    slug: "maryam-bint-yusuf",
    fullBio:
      "Ustadha Maryam combines classical Arabic instruction with deep Quranic understanding. Her students develop not just language skills but a profound connection to the divine message.",
    students: "60+ graduates",
    experience: "12+ years",
    sanad: "Ijazah in Recitation",
    featured: false,
    specialties: ["Arabic", "Tafsir"],
    rating: 5,
    languages: ["Arabic", "English", "French"],
    availability: "Accepting",
  },
];

const CATEGORIES = [
  "All",
  "Qira'at",
  "Hifz",
  "Tajweed",
  "Arabic",
  "Tafsir",
  "Women",
];

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

export default function TeachersClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTeachers = TEACHERS.filter((teacher) => {
    const matchesSearch =
      searchQuery === "" ||
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      activeCategory === "All" || teacher.specialties.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredTeachers = TEACHERS.filter((t) => t.featured);
  const regularTeachers = filteredTeachers.filter((t) => !t.featured);

  // Structured data for JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Al-Maysaroh Faculty Scholars",
    description: "Our distinguished faculty of Ijazah-certified scholars",
    itemListElement: TEACHERS.map((teacher, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: teacher.name,
        jobTitle: teacher.rank,
        description: teacher.fullBio,
        knowsAbout: teacher.specialties,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

   
  
    <main className="relative bg-background overflow-hidden">
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
        <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-purple-600">Our Scholars</span>
          </nav>
        </div>

        {/* Enhanced Header with Stats */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 mb-12 xs:mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-3 xs:space-y-4 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                <ShieldCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> 
                Unbroken Scholarly Lineage
              </div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                Carriers of <br />
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  The Sanad.
                </span>
              </h1>
            </Reveal>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <p className="text-2xl sm:text-3xl font-black text-purple-600">14</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">Generations</p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <p className="text-2xl sm:text-3xl font-black text-amber-600">6</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">Scholars</p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <p className="text-2xl sm:text-3xl font-black text-purple-600">200+</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">Graduates</p>
            </div>
          </div>
        </div>

        {/* Featured Teachers - Enhanced with more details */}
        <div className="mb-12 xs:mb-16">
          <div className="flex items-center gap-2 mb-5 xs:mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm xs:text-base font-black uppercase tracking-wider text-purple-600">Dean's Council</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-600/20 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {featuredTeachers.map((teacher, index) => (
              <Reveal key={teacher.id} delay={index * 0.1}>
                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
                >
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all duration-500 p-5 sm:p-6 md:p-8 lg:p-10 relative cursor-pointer h-full shadow-sm hover:shadow-xl">
                    
                    {/* Click Indicator */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>

                    {/* Sanad Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
                      <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                        <Scroll className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                        {teacher.sanad}
                      </div>
                    </div>

                    {/* Availability Badge */}
                    <div className={`absolute top-4 right-20 sm:top-6 sm:right-24 md:top-8 md:right-28 px-1.5 py-0.5 rounded-full text-[6px] sm:text-[7px] font-black uppercase ${getAvailabilityStyles(teacher.availability)}`}>
                      {teacher.availability}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8 items-start mt-6 sm:mt-8">
                      {/* Portrait */}
                      <div className="w-full lg:w-40 h-44 sm:h-48 md:h-52 lg:h-56 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 rounded-xl sm:rounded-2xl overflow-hidden relative border border-border group-hover:border-purple-300 transition-all shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                          <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl sm:text-5xl font-black text-purple-600/10">
                            {teacher.name.charAt(0)}
                          </span>
                        </div>
                        {/* Rating Badge */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span className="text-[8px] font-black text-white">{teacher.rating}.0</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tight group-hover:text-purple-600 transition-colors uppercase">
                            {teacher.name}
                          </h3>
                          <p className="text-purple-600 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
                            {teacher.rank}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Crown className="w-3.5 h-3.5 text-amber-500" />
                          <p className="text-xs sm:text-sm font-bold text-foreground">
                            {teacher.credentials}
                          </p>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1.5">
                          {teacher.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[8px] font-black">
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm italic font-medium text-muted-foreground/80 leading-relaxed border-l-2 border-purple-300 pl-3">
                          "{teacher.philosophy}"
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                          <div className="flex items-center gap-1.5">
                            <Verified className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-amber-600">
                              Ijazah Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <GraduationCap className="w-3 h-3" />
                            <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider">
                              {teacher.students}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ShieldCheck className="w-3 h-3" />
                            <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider">
                              {teacher.experience}
                            </span>
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[7px] font-black text-muted-foreground">
                            {teacher.languages.join(" • ")}
                          </span>
                        </div>

                        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] sm:text-xs font-black text-purple-600 flex items-center gap-1.5">
                            View Full Profile
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Enhanced Search & Filter Section */}
        <div className="mb-10 xs:mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between items-center">
            {/* Search Bar with Animation */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, title, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
              />
              {searchQuery && (
                <AnimatePresence>
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-purple-600 transition-colors" />
                  </motion.button>
                </AnimatePresence>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] xs:text-[10px] font-black uppercase tracking-wider transition-all",
                    activeCategory === cat
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                      : "bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800"
                  )}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === "grid" ? "bg-purple-600 text-white" : "text-muted-foreground"
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-all",
                  viewMode === "list" ? "bg-purple-600 text-white" : "text-muted-foreground"
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filteredTeachers.length}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 xs:mb-8"
          >
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-black text-purple-600">{regularTeachers.length}</span> of{" "}
              <span className="font-black">{TEACHERS.length}</span> scholars
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Teachers Grid/List */}
        {regularTeachers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 xs:py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No scholars found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="text-purple-600 font-black text-sm mt-2 hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
            {regularTeachers.map((teacher, index) => (
              <Reveal key={teacher.id} delay={index * 0.05}>
                <Link
                  href={`/teachers/${teacher.slug}`}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-xl border border-border hover:border-purple-300 transition-all duration-500 p-5 sm:p-6 relative cursor-pointer h-full shadow-sm hover:shadow-xl"
                  >
                    {/* Click Indicator */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                    </div>

                    {/* Sanad Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-[6px] font-black uppercase tracking-wider shadow-md">
                        <Scroll className="w-2 h-2" />
                        Sanad
                      </div>
                    </div>

                    {/* Availability Dot */}
                    <div className={`absolute top-3 right-12 w-2 h-2 rounded-full animate-pulse ${
                      teacher.availability === "Accepting" ? "bg-green-500" :
                      teacher.availability === "Limited Slots" ? "bg-amber-500" : "bg-red-500"
                    }`} />

                    <div className="flex flex-col items-center text-center pt-4 sm:pt-6">
                      {/* Avatar with Ring */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 flex items-center justify-center mb-3 border-2 border-purple-200 group-hover:border-purple-400 transition-all">
                          <span className="text-2xl font-black text-purple-600/40">
                            {teacher.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-black text-base sm:text-lg group-hover:text-purple-600 transition-colors">
                        {teacher.name.split(' ').slice(0, 2).join(' ')}
                      </h3>
                      <p className="text-[8px] text-purple-600 font-black uppercase tracking-wider mt-0.5">
                        {teacher.rank.split(' ').slice(0, 3).join(' ')}...
                      </p>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 mt-2">
                        <Crown className="w-3 h-3 text-amber-500" />
                        <p className="text-[8px] font-bold truncate max-w-[150px]">
                          {teacher.credentials.split(' ').slice(0, 3).join(' ')}...
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {teacher.specialties.slice(0, 2).map((specialty, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 text-[6px] font-black">
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[8px] font-black text-purple-600 flex items-center gap-1">
                          View Profile
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {regularTeachers.map((teacher, index) => (
              <Reveal key={teacher.id} delay={index * 0.05}>
                <Link href={`/teachers/${teacher.slug}`} className="block group">
                  <div className="bg-card rounded-xl border border-border hover:border-purple-300 transition-all p-5 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 flex items-center justify-center shrink-0">
                      <span className="text-xl font-black text-purple-600/40">{teacher.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-black group-hover:text-purple-600 transition-colors">{teacher.name}</h3>
                      <p className="text-xs text-purple-600 font-black">{teacher.rank}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{teacher.credentials}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-[8px] font-black ${getAvailabilityStyles(teacher.availability)}`}>
                        {teacher.availability}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Enhanced Trust Message */}
        <Reveal delay={0.3}>
          <div className="mt-12 xs:mt-16 sm:mt-20 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 xs:gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-500" />
                <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider">Authentic Sanad</span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider">Ijazah Certified</span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider">Global Faculty</span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-600" />
                <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider">100% Dedicated</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Final CTA */}
        <div className="mt-12 xs:mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/10 to-amber-500/10 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-black mb-2">Find Your Perfect Guide</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Our Dean personally matches each student with the ideal teacher based on your learning style, goals, and schedule.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-5 xs:px-6 py-2 xs:py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  Start Free Assessment
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-5 xs:px-6 py-2 xs:py-2.5 font-black text-xs border-purple-300 text-purple-600">
                  Contact Admissions
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

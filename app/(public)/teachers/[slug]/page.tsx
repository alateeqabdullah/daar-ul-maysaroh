// app/teachers/[slug]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Verified,
  ShieldCheck,
  ArrowRight,
  Crown,
  Scroll,
  Users,
  Globe,
  Award,
  Star,
  BookOpen,
  Quote,
  Clock,
  Heart,
  CheckCircle2,
  Calendar,
  Mail,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Teacher {
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
  schedule: string;
  studentsTaught: number;
  certificationLevel: string;
  sanadChain: number;
}

// Complete Teacher Data - Gold Standard
const TEACHERS_DATA: Record<string, Teacher> = {
  "abubakar-abdurrozzaaq-al-maysari": {
    name: "Shaykh Abubakar Abdurrozzaaq Al-Maysari",
    rank: "Dean of Academic Affairs & Chief Scholar",
    shortRank: "Dean of Faculty",
    credentials: "Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
    fullBio:
      "With over 25 years of teaching experience, Shaykh Abubakar holds ijazah in all ten Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 200 certified Qurra worldwide and serves on multiple international scholarly councils. His expertise spans the science of Qira'at, Hifz methodology, and Sanad preservation.",
    students: "100+ certified Qurra",
    experience: "25+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: true,
    specialties: ["Qira'at", "Hifz", "Sanad", "Ijazah"],
    rating: 5,
    languages: ["Arabic", "English"],
    availability: "Limited Slots",
    education: [
      "Ijazah in 10 Qira'at from Shaykh Al-Misri",
      "Advanced Studies at Al-Azhar University",
      "Sanad Certification from Umm Al-Qura University",
    ],
    publications: [
      "The Science of Qira'at: A Comprehensive Guide",
      "Preserving the Sanad in the Digital Age",
    ],
    schedule: "Monday - Saturday, 9 AM - 9 PM (WAT)",
    studentsTaught: 500,
    certificationLevel: "Master Scholar",
    sanadChain: 14,
  },
  "fatimah-zahrah-alagbada": {
    name: "Ustadha Fatimah Zahrah Alagbada",
    rank: "Head of Female Hifz Department",
    shortRank: "Head of Female Hifz",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
    fullBio:
      "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij and strong memorization. She has developed innovative teaching methods specifically for women and children, making Quran memorization accessible and joyful.",
    students: "50+ female graduates",
    experience: "15+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: true,
    specialties: ["Hifz", "Tajweed", "Women's Education", "Children's Hifz"],
    rating: 5,
    languages: ["Arabic", "English", "Hausa"],
    availability: "Accepting",
    education: [
      "Ijazah in Hafs 'an 'Asim",
      "Bachelor's in Islamic Studies",
      "Certificate in Child Education",
    ],
    publications: [],
    schedule: "Saturday - Thursday, 8 AM - 8 PM (WAT)",
    studentsTaught: 350,
    certificationLevel: "Senior Scholar",
    sanadChain: 14,
  },
  "umar-al-hasan": {
    name: "Shaykh Umar Al-Hasan",
    rank: "Senior Tajweed Instructor",
    shortRank: "Tajweed Master",
    credentials: "Ijazah in Hafs & Shu'bah",
    philosophy: "Each letter carries a light that illuminates the heart.",
    fullBio:
      "Shaykh Umar is a master of Tajweed sciences with special focus on makharij and sifaat. He has authored several works on Quranic phonetics and has trained over 80 teachers in advanced recitation methodologies. His students consistently achieve excellence in Quranic recitation.",
    students: "80+ certified",
    experience: "20+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: false,
    specialties: ["Tajweed", "Phonetics", "Qira'at", "Teacher Training"],
    rating: 5,
    languages: ["Arabic", "English"],
    availability: "Waitlist",
    education: [
      "Ijazah in Hafs & Shu'bah",
      "PhD in Quranic Sciences",
      "Advanced Tajweed Certification",
    ],
    publications: [
      "The Art of Quranic Recitation",
      "Makharij: A Practical Guide",
    ],
    schedule: "Sunday - Thursday, 2 PM - 10 PM (WAT)",
    studentsTaught: 400,
    certificationLevel: "Master Scholar",
    sanadChain: 14,
  },
  "maryam-bint-yusuf": {
    name: "Ustadha Maryam Bint Yusuf",
    rank: "Arabic & Quranic Studies",
    shortRank: "Arabic Scholar",
    credentials: "MA in Arabic Linguistics, Ijazah",
    philosophy:
      "Understanding the Quran transforms your relationship with Allah.",
    fullBio:
      "Ustadha Maryam combines classical Arabic instruction with deep Quranic understanding. Her students develop not just language skills but a profound connection to the divine message. She specializes in making Arabic accessible to non-native speakers through innovative teaching methods.",
    students: "60+ graduates",
    experience: "12+ years",
    sanad: "Ijazah in Recitation",
    featured: false,
    specialties: ["Arabic", "Tafsir", "Quranic Sciences", "Linguistics"],
    rating: 5,
    languages: ["Arabic", "English", "French"],
    availability: "Accepting",
    education: [
      "MA in Arabic Linguistics",
      "Ijazah in Quranic Recitation",
      "BA in Islamic Studies",
    ],
    publications: [],
    schedule: "Monday - Friday, 10 AM - 6 PM (WAT)",
    studentsTaught: 250,
    certificationLevel: "Senior Scholar",
    sanadChain: 14,
  },
};

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

export default function TeacherPage() {
  const params = useParams();
  const slug = params.slug as string;
  const teacher = TEACHERS_DATA[slug];
  const [activeTab, setActiveTab] = useState<
    "bio" | "education" | "publications"
  >("bio");

  if (!teacher) {
    notFound();
  }

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 sm:mb-8 flex-wrap">
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

        {/* Hero Section - Premium Card */}
        <Reveal>
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden shadow-xl"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/5 to-amber-500/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/5 to-purple-600/5 rounded-full blur-2xl" />

              {/* Badges */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
                <div
                  className={`px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase ${getAvailabilityStyles(teacher.availability)} shadow-sm`}
                >
                  {teacher.availability}
                </div>
              </div>

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                  <Scroll className="w-2.5 h-2.5" />
                  {teacher.sanad}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 items-center lg:items-start mt-8 sm:mt-10">
                {/* Portrait with Ring Effect */}
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full blur-xl opacity-30 animate-pulse" />
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 flex items-center justify-center border-4 border-purple-200 group-hover:border-purple-400 transition-all shadow-2xl">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-purple-600/30">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <p className="text-purple-600 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                      {teacher.shortRank}
                    </p>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-2">
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

                  {/* Specialties Tags */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
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

                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
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
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-black">
                        {teacher.studentsTaught}+ taught
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Left Column - Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
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
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all",
                      isActive
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-muted-foreground hover:text-purple-600",
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg sm:text-xl font-black">Biography</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {teacher.fullBio}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-amber-500/20" />
                      <p className="text-sm italic text-muted-foreground pl-6">
                        "{teacher.philosophy}"
                      </p>
                      <p className="text-xs font-black text-purple-600 mt-2 pl-6">
                        — {teacher.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg sm:text-xl font-black">
                      Education & Certifications
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {teacher.education.map((edu: string, idx: number) => (
                      <div key={idx} className="flex gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <p className="text-sm">{edu}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "publications" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg sm:text-xl font-black">
                      Publications & Works
                    </h2>
                  </div>
                  {teacher.publications.length > 0 ? (
                    <div className="space-y-4">
                      {teacher.publications.map((pub: string, idx: number) => (
                        <div key={idx} className="flex gap-3 group">
                          <BookOpen className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <p className="text-sm font-medium">{pub}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No publications listed at this time.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Availability Card */}
            <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
              <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-black">{teacher.schedule}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  *All times in WAT (West Africa Time)
                </div>
              </div>
            </div>

            {/* Book Session Card */}
            <div className="bg-card rounded-xl border-2 border-purple-200 dark:border-purple-800 p-5 sm:p-6 bg-gradient-to-br from-purple-50/30 to-amber-50/30">
              <h3 className="text-sm font-black mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-500" />
                Begin Your Journey
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Start with a free, no-obligation assessment to find your perfect
                learning path.
              </p>
              <div className="space-y-3">
                <Link href="/assessment">
                  <Button className="w-full rounded-xl py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md transition-all group">
                    Book Free Assessment
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-2.5 font-black text-xs border-purple-300 text-purple-600 hover:bg-purple-50 transition-all"
                  >
                    Contact Admissions
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
              <h3 className="text-sm font-black mb-4">Scholar Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
                    Sanad Chain
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.sanadChain} Generations
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
                    Certification
                  </span>
                  <span className="text-sm font-black text-amber-600">
                    {teacher.certificationLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
                    Students Impacted
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.studentsTaught}+
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
              <h3 className="text-sm font-black mb-4">Connect</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>admissions@almaysaroh.org</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <MessageCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>+234 911 016 3930 (WhatsApp)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="text-center mt-12 sm:mt-16">
          <Link href="/teachers">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2.5 font-black text-xs border-purple-300 text-purple-600 hover:bg-purple-50 transition-all group"
            >
              ← Back to All Scholars
            </Button>
          </Link>
        </div>

        {/* Trust Message */}
        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <Scroll className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                Authentic Sanad
              </span>
            </div>
            <div className="w-px h-3 bg-border hidden xs:block" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                Ijazah Certified
              </span>
            </div>
            <div className="w-px h-3 bg-border hidden xs:block" />
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                Global Access
              </span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 sm:mt-10 text-center pb-8 sm:pb-10">
          <p className="text-[9px] sm:text-[10px] text-muted-foreground">
            Our Dean personally matches each student with the perfect teacher
            based on learning style, goals, and schedule.
          </p>
        </div>
      </div>
    </main>
  );
}

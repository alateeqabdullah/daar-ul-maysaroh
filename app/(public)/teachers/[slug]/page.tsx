// app/teachers/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
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
  BookOpen,
  Sparkles,
  Quote,
  Clock,
  Heart,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Teacher Data - Same structure as homepage
const TEACHERS_DATA: Record<string, any> = {
  "abubakar-abdurrozzaaq-al-maysari": {
    name: "Shaykh Abubakar Abdurrozzaaq Al-Maysari",
    rank: "Dean of Academic Affairs & Chief Scholar",
    shortRank: "Dean of Faculty",
    credentials: "Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
    fullBio:
      "With over 13 years of teaching experience, Shaykh Abubakar holds ijazah in Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 100 certified Qurra worldwide and serves on multiple international scholarly councils.",
    students: "100+ certified Qurra",
    experience: "13+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    specialties: ["Qira'at", "Hifz", "Sanad"],
    rating: 5,
    languages: ["Arabic", "English", "Hausa", "Yoruba"],
    availability: "Limited Slots",
    education: [
      "Ijazah in Qira'at from Shaykh",
      "Advanced Studies",
      "Sanad Certification",
    ],
    schedule: "Monday - Saturday, 9 AM - 9 PM (WAT)",
  },
  "fatimah-zahrah-alagbada": {
    name: "Ustadha Fatimah Zahrah Alagbada",
    rank: "Head of Female Hifz Department",
    shortRank: "Head of Female Hifz",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
    fullBio:
      "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij and strong memorization.",
    students: "50+ graduates",
    experience: "15+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    specialties: ["Hifz", "Tajweed", "Women's Education"],
    rating: 5,
    languages: ["Arabic", "English", "Hausa"],
    availability: "Accepting",
    education: [
      "Ijazah in Hafs 'an 'Asim",
      "Bachelor's",
      "Certificate in Child Education",
    ],
    schedule: "Saturday - Thursday, 8 AM - 8 PM (WAT)",
  },
  "umar-al-hasan": {
    name: "Shaykh Umar Al-Hasan",
    rank: "Senior Tajweed Instructor",
    shortRank: "Tajweed Master",
    credentials: "Ijazah in Hafs & Shu'bah",
    philosophy: "Each letter carries a light that illuminates the heart.",
    fullBio:
      "Shaykh Umar is a master of Tajweed sciences with special focus on makharij and sifaat. He has authored several works on Quranic phonetics and has trained over 80 teachers.",
    students: "80+ certified",
    experience: "20+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    specialties: ["Tajweed", "Phonetics", "Qira'at"],
    rating: 5,
    languages: ["Arabic", "English"],
    availability: "Waitlist",
    education: [
      "Ijazah in Hafs & Shu'bah",
      "PhD in Quranic Sciences",
      "Advanced Tajweed Certification",
    ],
    schedule: "Sunday - Thursday, 2 PM - 10 PM (WAT)",
  },
  "maryam-bint-yusuf": {
    name: "Ustadha Maryam Bint Yusuf",
    rank: "Arabic & Quranic Studies",
    shortRank: "Arabic Scholar",
    credentials: "MA in Arabic Linguistics, Ijazah",
    philosophy:
      "Understanding the Quran transforms your relationship with Allah.",
    fullBio:
      "Ustadha Maryam combines classical Arabic instruction with deep Quranic understanding. Her students develop not just language skills but a profound connection to the divine message.",
    students: "60+ graduates",
    experience: "12+ years",
    sanad: "Ijazah in Recitation",
    specialties: ["Arabic", "Tafsir", "Linguistics"],
    rating: 5,
    languages: ["Arabic", "English", "French"],
    availability: "Accepting",
    education: [
      "MA in Arabic Linguistics",
      "Ijazah in Quranic Recitation",
      "BA in Islamic Studies",
    ],
    schedule: "Monday - Friday, 10 AM - 6 PM (WAT)",
  },
};

const getAvailabilityStyles = (availability: string) => {
  switch (availability) {
    case "Accepting":
      return "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400";
    case "Limited Slots":
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
    case "Waitlist":
      return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TeacherPage() {
  const params = useParams();
  const slug = params.slug as string;
  const teacher = TEACHERS_DATA[slug];

  if (!teacher) {
    return (
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Scholar Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The scholar you're looking for doesn't exist.
          </p>
          <Link href="/teachers">
            <Button className="rounded-full px-6 py-3 font-black bg-purple-600 hover:bg-purple-700">
              Back to Scholars
            </Button>
          </Link>
        </div>
      </main>
    );
  }

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

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-24 sm:pt-28 md:pt-32">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
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

        {/* Hero Card - Same style as homepage teacher cards */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-10 relative">
            {/* Badges */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div
                className={`px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase ${getAvailabilityStyles(teacher.availability)}`}
              >
                {teacher.availability}
              </div>
            </div>

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                <Scroll className="w-2.5 h-2.5" />
                {teacher.sanad}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-8 sm:mt-10">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 flex items-center justify-center border-4 border-purple-200 shadow-xl">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-purple-600/30">
                    {teacher.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <p className="text-purple-600 font-black text-xs uppercase tracking-wider">
                    {teacher.shortRank}
                  </p>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-2">
                  {teacher.name}
                </h1>
                <p className="text-purple-600 font-black text-sm uppercase tracking-wider mb-4">
                  {teacher.rank}
                </p>

                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <Verified className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-bold">{teacher.credentials}</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {teacher.specialties.map((s: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[10px] font-black"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left - Bio */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Biography
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {teacher.fullBio}
              </p>
              <div className="italic border-l-2 border-amber-500 pl-4">
                <Quote className="w-4 h-4 text-amber-500 mb-1" />
                <p className="text-sm text-muted-foreground">
                  "{teacher.philosophy}"
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-500" />
                Education & Certifications
              </h2>
              <div className="space-y-3">
                {teacher.education.map((edu: string, i: number) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm">{edu}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-base font-black mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                Availability
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-black">{teacher.schedule}</span>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-6 bg-gradient-to-br from-purple-50/30 to-amber-50/30">
              <h3 className="text-base font-black mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-500" />
                Book a Session
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Ready to start your journey? Begin with a free assessment.
              </p>
              <div className="space-y-3">
                <Link href="/assessment">
                  <Button className="w-full rounded-lg py-2.5 font-black text-xs bg-purple-600 hover:bg-purple-700 text-white">
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

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-base font-black mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Students
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.students}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Experience
                  </span>
                  <span className="text-sm font-black text-amber-600">
                    {teacher.experience}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Languages
                  </span>
                  <span className="text-sm font-black text-purple-600">
                    {teacher.languages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link href="/teachers">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2.5 font-black text-xs border-purple-300 text-purple-600"
            >
              ← Back to All Scholars
            </Button>
          </Link>
        </div>

        {/* Trust Message */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground border-t border-border/50 pt-6">
            Our Dean personally matches each student with the perfect teacher
            after their assessment.
          </p>
        </div>
      </div>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/section-animation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  Award,
  GraduationCap,
  Mic,
  Globe,
  Heart,
  Sparkles,
  ArrowRight,
  Share2,
  Bookmark,
  PlayCircle,
  FileText,
  MessageSquare,
  Shield,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

// ==================== METADATA ====================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Find course from mock data (replace with DB query)
  const MOCK_COURSES = {
    "hifz-program": {
      name: "Hifz Al-Quran",
      description:
        "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed.",
    },
    "tajweed-mastery": {
      name: "Tajweed Al-Itqan",
      description:
        "Scientific mastery of Quranic recitation rules. Perfect your pronunciation with expert guidance.",
    },
    "arabic-fluency": {
      name: "Quranic Arabic",
      description:
        "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
    },
  };

  const course = MOCK_COURSES[params.slug as keyof typeof MOCK_COURSES];

  if (!course) {
    return {
      title: "Course Not Found | Al-Maysaroh",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.name} | Online Quran Course | Al-Maysaroh`,
    description: course.description,
    keywords: [course.name, "Quran course", "Islamic studies", "online learning"],
    openGraph: {
      title: `${course.name} | Al-Maysaroh`,
      description: course.description,
      type: "website",
      url: `https://almaysaroh.org/courses/${params.slug}`,
    },
    alternates: {
      canonical: `https://almaysaroh.org/courses/${params.slug}`,
    },
  };
}

// ==================== MOCK COURSE DATA ====================
const COURSE_DATA: Record<string, any> = {
  "hifz-program": {
    id: "hifz-program",
    name: "Hifz Al-Quran",
    tagline: "Complete Quran Memorization with Ijazah Certification",
    description:
      "A comprehensive 2-3 year journey to memorize the entire Quran with scholarly guidance. Students receive 1-on-1 instruction from Ijazah-certified scholars, with weekly progress tracking and revision sessions.",
    longDescription: `
      <p>The Hifz Al-Quran program is a structured, Sanad-based journey designed to help students memorize the entire Quran with proper Tajweed and understanding. This program is ideal for students who are committed to preserving the Quran in their hearts.</p>
      
      <h3>Program Highlights:</h3>
      <ul>
        <li>1-on-1 instruction with Ijazah-certified scholars</li>
        <li>Daily revision system to ensure retention</li>
        <li>Weekly progress tracking and assessments</li>
        <li>Audio recording of your recitation for review</li>
        <li>Complete Sanad certification upon completion</li>
      </ul>
      
      <h3>What You'll Achieve:</h3>
      <p>By the end of this program, you will have memorized the entire Quran with proper Tajweed, understand the meanings of the verses you've memorized, and receive formal Ijazah certification with an unbroken chain to Prophet Muhammad (ﷺ).</p>
    `,
    basePrice: 149,
    category: "QURAN",
    duration: "2-3 years",
    durationMonths: 30,
    level: "All Levels",
    format: "1-on-1",
    nextStart: "September 2026",
    sessionsPerWeek: 3,
    sessionDuration: "45 min",
    students: 156,
    rating: 4.9,
    reviewCount: 87,
    features: [
      "Ijazah Certification",
      "Daily Revision System",
      "Progress Tracking",
      "Audio Recordings",
      "Weekly Assessments",
      "Sanad Certificate",
      "1-on-1 Instruction",
      "Flexible Scheduling",
    ],
    curriculum: [
      { title: "Foundation Phase", description: "Juz 1-10 with emphasis on proper pronunciation and memorization techniques", duration: "8-10 months" },
      { title: "Building Phase", description: "Juz 11-20 with focus on fluency and connection", duration: "8-10 months" },
      { title: "Mastery Phase", description: "Juz 21-30 with advanced revision techniques", duration: "8-10 months" },
      { title: "Complete Revision", description: "Full Quran revision and Ijazah preparation", duration: "3-4 months" },
    ],
    prerequisites: "Ability to read Quranic Arabic fluently",
    outcomes: [
      "Complete memorization of the Holy Quran",
      "Formal Ijazah certification with complete Sanad",
      "Proper application of Tajweed rules",
      "Teaching methodology and confidence",
      "Lifelong connection with the Quran",
    ],
    instructors: [
      { name: "Sheikh Abubakar Al-Maysari", role: "Senior Hifz Scholar", experience: "25+ years" },
      { name: "Ustadha Fatima Zahra", role: "Head of Female Hifz", experience: "18+ years" },
    ],
    testimonials: [
      { name: "Ahmed R.", rating: 5, text: "This program changed my life. The scholars are patient and dedicated. I completed my Hifz in 2.5 years and received my Ijazah." },
      { name: "Sarah M.", rating: 5, text: "Alhamdulillah, the best decision I ever made. The structured approach and daily revision system made memorization achievable." },
    ],
    faqs: [
      { q: "How much time should I dedicate daily?", a: "We recommend 1-2 hours daily for memorization and revision. Consistency is key to success." },
      { q: "What if I forget what I've memorized?", a: "Our revision system ensures you regularly review previously memorized portions. Your teacher will guide you through a structured revision schedule." },
      { q: "Do I get a certificate?", a: "Yes! Upon successful completion, you receive an Ijazah certification with complete Sanad to Prophet Muhammad (ﷺ)." },
    ],
    iconName: "BookOpen",
    color: "from-primary-600 to-primary-800",
    popular: true,
    badge: "Most Popular",
  },
  "tajweed-mastery": {
    id: "tajweed-mastery",
    name: "Tajweed Al-Itqan",
    tagline: "Scientific Mastery of Quranic Recitation",
    description:
      "A 6-month intensive program covering all Tajweed rules with practical application. Students learn Makharij, Sifaat, and Ahkam through live correction and audio analysis technology.",
    longDescription: `
      <p>The Tajweed Al-Itqan program is designed for students who want to perfect their Quranic recitation with scientific precision. Using audio analysis technology and live correction from certified scholars, you'll master every rule of Tajweed.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Makharij Al-Huruf (Articulation points of letters)</li>
        <li>Sifaat Al-Huruf (Characteristics of letters)</li>
        <li>Ahkam Al-Tajweed (Rules of Noon, Meem, and Madd)</li>
        <li>Practical application in Quranic recitation</li>
      </ul>
    `,
    basePrice: 89,
    category: "TAJWEED",
   
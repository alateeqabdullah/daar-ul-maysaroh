import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/section-animation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle2,
  Calendar,
  Globe,
  Mic,
  GraduationCap,
  Heart,
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  Video,
  Headphones,
  Download,
  MessageSquare,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

// Mock data - will be replaced with DB data
const MOCK_COURSES: Record<string, any> = {
  "hifz-program": {
    id: "hifz-program",
    name: "Hifz Al-Quran",
    description:
      "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed and understanding.",
    longDescription: `A comprehensive 2-3 year journey to memorize the entire Quran with scholarly guidance. This program is designed for students who are committed to becoming Huffaz with authentic Sanad.

    Our Hifz program combines traditional memorization techniques with modern tracking tools. Each student works 1-on-1 with an Ijazah-certified scholar who guides them through the memorization process with personalized attention.

    The program emphasizes not just memorization, but also proper Tajweed, understanding of the verses, and regular revision to ensure long-term retention. Students receive weekly assessments, progress reports, and access to our proprietary tracking system.`,
    basePrice: 149,
    category: "QURAN",
    subcategory: "Hifz",
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
      "Ijazah Certification with Complete Sanad",
      "Daily Revision System with Audio Tracking",
      "Progress Tracking Dashboard",
      "Audio Recordings for Practice",
      "Weekly Assessments with Feedback",
      "Lifetime Access to Revision Materials",
    ],
    curriculum: [
      {
        phase: "Foundation",
        months: "Months 1-6",
        surahs: "Juz 1-5",
        topics: [
          "Memorization techniques",
          "Tajweed fundamentals",
          "Daily revision system",
          "Juz 1-5 memorization",
        ],
      },
      {
        phase: "Building",
        months: "Months 7-18",
        surahs: "Juz 6-20",
        topics: [
          "Consistent memorization",
          "Advanced Tajweed",
          "Revision integration",
          "Juz 6-20 memorization",
        ],
      },
      {
        phase: "Mastery",
        months: "Months 19-30",
        surahs: "Juz 21-30",
        topics: [
          "Complete memorization",
          "Full Quran revision",
          "Ijazah preparation",
          "Teaching methodology",
        ],
      },
    ],
    prerequisites: "Ability to read Quranic Arabic fluently",
    outcomes: [
      "Complete memorization of the entire Quran",
      "Formal Ijazah certification with complete Sanad",
      "Proper Tajweed application in all recitation",
      "Ability to teach and guide others",
      "Lifetime connection with the Quran",
    ],
    includes: [
      "1-on-1 sessions with Ijazah-certified scholar",
      "Personalized memorization plan",
      "Progress tracking dashboard",
      "Audio recording library",
      "Weekly revision sessions",
      "Ijazah examination and certification",
    ],
    sampleSchedule: [
      { day: "Monday", time: "Memorization: 30 min", duration: "30 min" },
      { day: "Tuesday", time: "Revision: 30 min", duration: "30 min" },
      { day: "Wednesday", time: "New Lesson: 30 min", duration: "30 min" },
      { day: "Thursday", time: "Revision: 30 min", duration: "30 min" },
      { day: "Friday", time: "Assessment: 30 min", duration: "30 min" },
    ],
    reviews: [
      {
        id: "1",
        name: "Ahmed M.",
        rating: 5,
        date: "March 2026",
        text: "This program changed my relationship with the Quran. My teacher was patient and knowledgeable. I completed my Hifz in 2.5 years and received my Ijazah. Alhamdulillah!",
      },
      {
        id: "2",
        name: "Fatima K.",
        rating: 5,
        date: "January 2026",
        text: "The structured approach and consistent revision schedule made memorization achievable. The tracking dashboard kept me motivated throughout the journey.",
      },
    ],
    isMock: true,
    popular: true,
    badge: "Most Popular",
    iconName: "BookOpen",
    color: "from-primary-600 to-primary-800",
  },
  "tajweed-mastery": {
    id: "tajweed-mastery",
    name: "Tajweed Al-Itqan",
    description:
      "Scientific mastery of Quranic recitation rules. Perfect your pronunciation and flow with expert guidance.",
    longDescription: `A 6-month intensive program covering all Tajweed rules with practical application. This program is designed for students who want to perfect their Quranic recitation.

    You'll learn Makharij (articulation points), Sifaat (characteristics of letters), and Ahkam (rules of recitation) through live correction and audio analysis technology. Each session includes practice, correction, and application in Surah recitation.

    The program uses our proprietary audio analysis tool that provides visual feedback on your pronunciation, helping you identify and correct mistakes quickly.`,
    basePrice: 89,
    category: "TAJWEED",
    subcategory: "Recitation",
    duration: "6 months",
    durationMonths: 6,
    level: "Beginner to Advanced",
    format: "Small Groups",
    nextStart: "October 2026",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    students: 203,
    rating: 4.8,
    reviewCount: 124,
    features: [
      "Audio Analysis Technology",
      "Live Correction Sessions",
      "Mistake Tracking Dashboard",
      "Practice Materials & Audio",
      "Weekly Progress Reports",
      "Tajweed Certification",
    ],
    curriculum: [
      {
        phase: "Makharij",
        months: "Months 1-2",
        topics: [
          "Articulation points of letters",
          "Letter characteristics",
          "Common mistakes correction",
          "Practical application",
        ],
      },
      {
        phase: "Sifaat",
        months: "Months 3-4",
        topics: [
          "Permanent characteristics",
          "Temporary characteristics",
          "Advanced pronunciation",
          "Surah practice",
        ],
      },
      {
        phase: "Ahkam",
        months: "Months 5-6",
        topics: [
          "Noon and Meem rules",
          "Madd rules",
          "Waqf and Ibtida",
          "Full recitation mastery",
        ],
      },
    ],
    prerequisites: "Basic Quran reading ability",
    outcomes: [
      "Perfect pronunciation of all Arabic letters",
      "Apply all Tajweed rules correctly",
      "Recite Quran with confidence and beauty",
      "Identify and correct own mistakes",
      "Teach basic Tajweed rules",
    ],
    includes: [
      "Small group sessions (max 4 students)",
      "Audio analysis software access",
      "Practice recordings library",
      "Progress tracking dashboard",
      "Certificate of completion",
    ],
    sampleSchedule: [
      { day: "Monday", time: "Live Session: 60 min", duration: "60 min" },
      { day: "Wednesday", time: "Practice & Recording", duration: "30 min" },
    ],
    reviews: [
      {
        id: "1",
        name: "Omar H.",
        rating: 5,
        date: "February 2026",
        text: "The audio analysis tool was incredible. I could see exactly where I was making mistakes and correct them immediately. My recitation improved dramatically in just 6 months.",
      },
    ],
    isMock: true,
    popular: false,
    iconName: "Mic",
    color: "from-accent to-accent/90",
  },
  // Add more courses as needed
};

// ==================== METADATA ====================
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const course = MOCK_COURSES[params.id];

  if (!course) {
    return {
      title: "Course Not Found | Al-Maysaroh",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.name} | ${course.category} Program | Al-Maysaroh`,
    description: course.description,
    keywords: [
      course.name,
      course.category,
      course.subcategory,
      "Quran Course",
      "Online Learning",
    ],
    openGraph: {
      title: `${course.name} | Al-Maysaroh`,
      description: course.description,
      type: "website",
      images: course.image ? [{ url: course.image }] : undefined,
    },
    alternates: {
      canonical: `https://almaysaroh.org/courses/${params.id}`,
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "Al-Maysaroh Institute",
        },
        educationalLevel: course.level,
        timeRequired: course.duration,
        offers: {
          "@type": "Offer",
          price: course.basePrice,
          priceCurrency: "USD",
        },
      }),
    },
  };
}

// ==================== MAIN PAGE COMPONENT ====================
export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = MOCK_COURSES[params.id];

  if (!course) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-700/5 blur-[80px] rounded-full -z-10" />
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Back Navigation */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>

        {/* ==================== HERO SECTION ==================== */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Course Badge & Title */}
          <div className="lg:w-2/3 space-y-6">
            <Reveal>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-black uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  {course.category}
                </span>
                {course.badge && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    {course.badge}
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
                {course.name}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {course.longDescription.split("\n\n")[0]}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="font-black">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({course.reviewCount} reviews)
                  </span>
                </div>
                <div className="w-px h-6 bg-border" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary-700" />
                  <span className="font-black">{course.students}+</span>
                  <span className="text-sm text-muted-foreground">
                    students
                  </span>
                </div>
                <div className="w-px h-6 bg-border" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-700" />
                  <span className="font-black">{course.duration}</span>
                </div>
              </div>
            </Reveal>

            {/* Price & CTA */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="text-3xl sm:text-4xl font-black text-primary-700">
                  {formatPrice(course.basePrice)}
                  <span className="text-base text-muted-foreground font-medium">
                    /month
                  </span>
                </div>
                <Link href="/admissions">
                  <Button className="rounded-full px-8 py-4 font-black bg-primary-700 hover:bg-primary-800 shadow-lg group">
                    <span className="flex items-center gap-2">
                      ENROLL NOW
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      ASK QUESTIONS
                    </span>
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Quick Stats Card */}
          <Reveal delay={0.2} className="lg:w-1/3">
            <div className="glass-surface p-6 rounded-2xl border border-primary-700/20">
              <h3 className="font-black text-lg uppercase tracking-tight mb-4">
                Program Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Format</span>
                  <span className="font-black">{course.format}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <span className="font-black">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sessions/Week
                  </span>
                  <span className="font-black">{course.sessionsPerWeek}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Session Length
                  </span>
                  <span className="font-black">{course.sessionDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Next Start
                  </span>
                  <span className="font-black">{course.nextStart}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <span className="font-black">{course.level}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-primary-700">
                  <Shield className="w-4 h-4" />
                  <span className="font-black">
                    Ijazah Certification Available
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ==================== CURRICULUM SECTION ==================== */}
        <Reveal delay={0.3}>
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary-700" />
              Curriculum Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {course.curriculum.map((phase: any, idx: number) => (
                <div
                  key={idx}
                  className="institutional-card p-6 hover:border-primary-700/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-lg uppercase tracking-tight">
                      {phase.phase}
                    </h3>
                    <span className="text-xs text-primary-700 font-black">
                      {phase.months}
                    </span>
                  </div>
                  {phase.surahs && (
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-black">{phase.surahs}</span>
                    </p>
                  )}
                  <ul className="space-y-2">
                    {phase.topics.map((topic: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ==================== FEATURES SECTION ==================== */}
        <Reveal delay={0.4}>
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary-700" />
              What's Included
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.includes.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary-50/30 dark:bg-primary-950/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ==================== OUTCOMES SECTION ==================== */}
        <Reveal delay={0.5}>
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary-700" />
              Learning Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {course.outcomes.map((outcome: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary-50/30 dark:bg-primary-950/20"
                >
                  <Star className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm font-medium">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ==================== PREREQUISITES SECTION ==================== */}
        <Reveal delay={0.55}>
          <div className="mb-12 lg:mb-16">
            <div className="institutional-card p-6 bg-primary-50/30 dark:bg-primary-950/20">
              <h3 className="font-black text-lg uppercase tracking-tight mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary-700" />
                Prerequisites
              </h3>
              <p className="text-muted-foreground">{course.prerequisites}</p>
            </div>
          </div>
        </Reveal>

        {/* ==================== SAMPLE SCHEDULE ==================== */}
        {course.sampleSchedule && (
          <Reveal delay={0.6}>
            <div className="mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-700" />
                Sample Weekly Schedule
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-black">Day</th>
                      <th className="text-left py-3 px-4 font-black">
                        Activity
                      </th>
                      <th className="text-left py-3 px-4 font-black">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.sampleSchedule.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-3 px-4 font-black">{item.day}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item.time}
                        </td>
                        <td className="py-3 px-4">{item.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        )}

        {/* ==================== REVIEWS SECTION ==================== */}
        {course.reviews && course.reviews.length > 0 && (
          <Reveal delay={0.65}>
            <div className="mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-gold fill-gold" />
                Student Reviews
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {course.reviews.map((review: any) => (
                  <div key={review.id} className="institutional-card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary-700/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-700" />
                        </div>
                        <div>
                          <p className="font-black">{review.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < review.rating
                                ? "text-gold fill-gold"
                                : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ==================== CTA SECTION ==================== */}
        <Reveal delay={0.7}>
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex flex-col items-center gap-6 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary-50/30 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border border-primary-700/20 max-w-2xl mx-auto">
              <Heart className="w-12 h-12 text-primary-700" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                Join {course.students}+ students who have transformed their
                relationship with the Quran.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions">
                  <Button className="rounded-full px-8 py-4 font-black bg-primary-700 hover:bg-primary-800">
                    ENROLL IN {course.name}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black"
                  >
                    SPEAK WITH ADVISOR
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60">
                Free assessment session available • No commitment
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

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
    keywords: [
      course.name,
      "Quran course",
      "Islamic studies",
      "online learning",
    ],
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
      {
        title: "Foundation Phase",
        description:
          "Juz 1-10 with emphasis on proper pronunciation and memorization techniques",
        duration: "8-10 months",
      },
      {
        title: "Building Phase",
        description: "Juz 11-20 with focus on fluency and connection",
        duration: "8-10 months",
      },
      {
        title: "Mastery Phase",
        description: "Juz 21-30 with advanced revision techniques",
        duration: "8-10 months",
      },
      {
        title: "Complete Revision",
        description: "Full Quran revision and Ijazah preparation",
        duration: "3-4 months",
      },
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
      {
        name: "Sheikh Abubakar Al-Maysari",
        role: "Senior Hifz Scholar",
        experience: "25+ years",
      },
      {
        name: "Ustadha Fatima Zahra",
        role: "Head of Female Hifz",
        experience: "18+ years",
      },
    ],
    testimonials: [
      {
        name: "Ahmed R.",
        rating: 5,
        text: "This program changed my life. The scholars are patient and dedicated. I completed my Hifz in 2.5 years and received my Ijazah.",
      },
      {
        name: "Sarah M.",
        rating: 5,
        text: "Alhamdulillah, the best decision I ever made. The structured approach and daily revision system made memorization achievable.",
      },
    ],
    faqs: [
      {
        q: "How much time should I dedicate daily?",
        a: "We recommend 1-2 hours daily for memorization and revision. Consistency is key to success.",
      },
      {
        q: "What if I forget what I've memorized?",
        a: "Our revision system ensures you regularly review previously memorized portions. Your teacher will guide you through a structured revision schedule.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes! Upon successful completion, you receive an Ijazah certification with complete Sanad to Prophet Muhammad (ﷺ).",
      },
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
      "Mistake Tracking System",
      "Practice Materials",
      "Progress Reports",
      "Certificate of Completion",
    ],
    curriculum: [
      {
        title: "Makharij Al-Huruf",
        description: "Master the articulation points of all Arabic letters",
        duration: "2 months",
      },
      {
        title: "Sifaat Al-Huruf",
        description: "Learn the inherent characteristics of letters",
        duration: "2 months",
      },
      {
        title: "Ahkam Al-Tajweed",
        description: "Rules of Noon, Meem, and Madd",
        duration: "2 months",
      },
    ],
    prerequisites: "Basic Quran reading ability",
    outcomes: [
      "Perfect pronunciation of all Arabic letters",
      "Apply all Tajweed rules correctly",
      "Recite Quran with confidence and fluency",
      "Ability to teach basic Tajweed rules",
    ],
    instructors: [
      {
        name: "Ustadh Aliyy ibn Abdurrozzaaq",
        role: "Senior Tajweed Scholar",
        experience: "15+ years",
      },
    ],
    testimonials: [
      {
        name: "Omar K.",
        rating: 5,
        text: "The audio analysis feature is amazing! I could see exactly where I was making mistakes and improve.",
      },
    ],
    faqs: [
      {
        q: "Do I need prior Tajweed knowledge?",
        a: "No, this program is designed for beginners as well as those who want to refine their recitation.",
      },
      {
        q: "How does the audio analysis work?",
        a: "You'll record your recitation, and our system provides visual feedback on your pronunciation, helping you identify areas for improvement.",
      },
    ],
    iconName: "Mic",
    color: "from-accent to-accent/90",
  },
  "arabic-fluency": {
    id: "arabic-fluency",
    name: "Quranic Arabic",
    tagline: "Understand the Quran in Its Original Language",
    description:
      "A 1-year program designed to help students understand Quranic Arabic directly. Focus on Nahw (grammar), Sarf (morphology), and Quranic vocabulary.",
    longDescription: `
      <p>Unlock the beauty of the Quran by understanding it in its original language. This program focuses on classical Arabic grammar (Nahw), morphology (Sarf), and Quranic vocabulary to help you comprehend the Quran directly.</p>
    `,
    basePrice: 69,
    category: "ARABIC",
    duration: "1 year",
    durationMonths: 12,
    level: "Beginner",
    format: "Group Sessions",
    nextStart: "September 2026",
    sessionsPerWeek: 2,
    sessionDuration: "75 min",
    students: 312,
    rating: 4.7,
    reviewCount: 156,
    features: [
      "Quranic Vocabulary Builder",
      "Grammar Foundation",
      "Practice Exercises",
      "Audio Resources",
      "Progress Tracking",
      "Certificate",
    ],
    curriculum: [
      {
        title: "Nahw (Syntax)",
        description: "Understanding sentence structure and grammar",
        duration: "4 months",
      },
      {
        title: "Sarf (Morphology)",
        description: "Verb conjugations and word patterns",
        duration: "4 months",
      },
      {
        title: "Quranic Vocabulary",
        description: "Master the most common Quranic words",
        duration: "4 months",
      },
    ],
    prerequisites: "No prior Arabic needed",
    outcomes: [
      "Understand 80% of Quranic words",
      "Read classical Arabic texts",
      "Basic translation skills",
      "Continue self-study with confidence",
    ],
    instructors: [
      {
        name: "Shaykh Abdullah Al-Madani",
        role: "Arabic Language Scholar",
        experience: "20+ years",
      },
    ],
    testimonials: [
      {
        name: "Leila H.",
        rating: 5,
        text: "After just 6 months, I can understand the Quran in Arabic! This program is truly transformative.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know Arabic alphabet?",
        a: "Basic alphabet knowledge is helpful but not required. We start from the fundamentals.",
      },
      {
        q: "Will I be able to speak Arabic?",
        a: "This program focuses on Quranic comprehension, not conversational Arabic. However, you'll gain a strong foundation for further study.",
      },
    ],
    iconName: "Globe",
    color: "from-gold to-gold/90",
  },
  "tafsir-studies": {
    id: "tafsir-studies",
    name: "Tafsir Al-Mubin",
    tagline: "Deep Quranic Understanding Through Classical Exegesis",
    description:
      "An advanced 1.5-year program exploring Quranic meanings through classical Tafsir works including Tabari, Ibn Kathir, and Qurtubi.",
    basePrice: 129,
    category: "TAFSIR",
    duration: "1.5 years",
    durationMonths: 18,
    level: "Advanced",
    format: "1-on-1",
    nextStart: "January 2027",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    students: 78,
    rating: 4.9,
    reviewCount: 42,
    features: [
      "Classical Tafsir Sources",
      "Thematic Studies",
      "Scholarly Mentorship",
      "Research Guidance",
      "Weekly Discussions",
      "Ijazah Track",
    ],
    curriculum: [
      {
        title: "Tafsir Al-Tabari",
        description: "Historical and linguistic analysis",
        duration: "5 months",
      },
      {
        title: "Tafsir Ibn Kathir",
        description: "Hadith-based interpretation",
        duration: "5 months",
      },
      {
        title: "Tafsir Al-Qurtubi",
        description: "Jurisprudential insights",
        duration: "5 months",
      },
    ],
    prerequisites: "Arabic reading ability",
    outcomes: [
      "Understand classical tafsir methodology",
      "Analyze Quranic themes critically",
      "Independent research skills",
      "Teaching capability",
    ],
    instructors: [
      {
        name: "Ustadh Yusuf Al-Qurtubi",
        role: "Tafsir Scholar",
        experience: "12+ years",
      },
    ],
    testimonials: [
      {
        name: "Dr. Ibrahim M.",
        rating: 5,
        text: "A profound journey into the depths of Quranic interpretation. Highly recommended for serious students.",
      },
    ],
    faqs: [
      {
        q: "Is this program suitable for beginners?",
        a: "This is an advanced program. Students should have prior knowledge of Arabic and Quranic studies.",
      },
      {
        q: "Will I receive Ijazah?",
        a: "Yes, upon successful completion, students can receive Ijazah in Tafsir studies.",
      },
    ],
    iconName: "GraduationCap",
    color: "from-primary-500 to-primary-700",
  },
  "group-qiroah": {
    id: "group-qiroah",
    name: "Group Qiro'ah",
    tagline: "Fun, Interactive Quran Reading for Children",
    description:
      "A nurturing group program where children ages 7-12 learn proper Quranic reading through games, activities, and positive reinforcement.",
    basePrice: 79,
    category: "CHILDREN",
    duration: "6 months",
    durationMonths: 6,
    level: "Beginner",
    format: "Group (4-6)",
    nextStart: "September 2026",
    sessionsPerWeek: 2,
    sessionDuration: "45 min",
    students: 45,
    rating: 4.8,
    reviewCount: 28,
    features: [
      "Interactive Games",
      "Reward System",
      "Parent Portal",
      "Progress Reports",
      "Weekly Updates",
      "Certificate",
    ],
    curriculum: [
      {
        title: "Arabic Alphabet",
        description: "Learn letters with fun activities",
        duration: "2 months",
      },
      {
        title: "Basic Pronunciation",
        description: "Simple words and phrases",
        duration: "2 months",
      },
      {
        title: "Short Surahs",
        description: "Memorize and understand short surahs",
        duration: "2 months",
      },
    ],
    prerequisites: "Ages 7-12",
    outcomes: [
      "Confident Quran reading",
      "Love for the Quran",
      "Basic Tajweed rules",
      "Short surah memorization",
    ],
    instructors: [
      {
        name: "Ustadha Fatima Zahra",
        role: "Children's Program Specialist",
        experience: "10+ years",
      },
    ],
    testimonials: [
      {
        name: "Parent of Aisha",
        rating: 5,
        text: "My daughter looks forward to every class! The games and rewards keep her motivated.",
      },
    ],
    faqs: [
      {
        q: "What if my child has no prior Quran knowledge?",
        a: "Perfect! This program is designed for beginners.",
      },
      {
        q: "How do you keep children engaged online?",
        a: "We use interactive games, visual aids, and frequent positive reinforcement.",
      },
    ],
    iconName: "Heart",
    color: "from-blue-500 to-blue-600",
  },
  "juz-amma": {
    id: "juz-amma",
    name: "Juz Amma Group",
    tagline: "Memorize the Last Juz with Understanding",
    description:
      "An 8-month program focused on memorizing Juz Amma with proper Tajweed and understanding of meanings through fun activities.",
    basePrice: 79,
    category: "CHILDREN",
    duration: "8 months",
    durationMonths: 8,
    level: "Beginner",
    format: "Group (4-6)",
    nextStart: "October 2026",
    sessionsPerWeek: 2,
    sessionDuration: "50 min",
    students: 38,
    rating: 4.9,
    reviewCount: 31,
    features: [
      "37 Surahs",
      "Meaning Explained",
      "Revision Games",
      "Parent Updates",
      "Progress Badges",
      "Graduation",
    ],
    curriculum: [
      {
        title: "Short Surahs",
        description: "An-Nas to Al-Falaq (Surah 114-105)",
        duration: "3 months",
      },
      {
        title: "Middle Surahs",
        description: "Al-Kafirun to Al-Qadr (Surah 104-97)",
        duration: "3 months",
      },
      {
        title: "Long Surahs",
        description: "Al-Qari'ah to An-Naba (Surah 96-78)",
        duration: "2 months",
      },
    ],
    prerequisites: "Ages 6-12",
    outcomes: [
      "Memorize all 37 surahs of Juz Amma",
      "Understand the meanings",
      "Proper pronunciation",
      "Love for the Quran",
    ],
    instructors: [
      {
        name: "Ustadha Khadija Al-Misriyyah",
        role: "Children's Hifz Specialist",
        experience: "8+ years",
      },
    ],
    testimonials: [
      {
        name: "Parent of Yusuf",
        rating: 5,
        text: "My son completed Juz Amma in 8 months and now loves reciting at home!",
      },
    ],
    faqs: [
      {
        q: "Will my child learn the meanings?",
        a: "Yes! Each surah is taught with simple, age-appropriate explanations.",
      },
      {
        q: "What if my child already knows some surahs?",
        a: "We'll assess their level and place them appropriately.",
      },
    ],
    iconName: "Star",
    color: "from-purple-500 to-purple-600",
  },
  "ijazah-program": {
    id: "ijazah-program",
    name: "Ijazah Certification Track",
    tagline: "Complete Your Journey with Formal Ijazah Certification",
    description:
      "A rigorous assessment program for students ready to receive Ijazah. Work directly with senior scholars to perfect your recitation and receive formal certification with complete Sanad.",
    basePrice: 299,
    category: "IJAZAH",
    duration: "3-6 months",
    durationMonths: 4,
    level: "Advanced",
    format: "1-on-1",
    nextStart: "Rolling Admission",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    students: 24,
    rating: 5.0,
    reviewCount: 18,
    features: [
      "Complete Sanad",
      "Senior Scholars",
      "Oral Examination",
      "Written Certification",
      "Public Recognition",
      "Teaching Authorization",
    ],
    curriculum: [
      {
        title: "Recitation Assessment",
        description: "Comprehensive evaluation of Quranic recitation",
        duration: "1-2 months",
      },
      {
        title: "Tajweed Mastery Check",
        description: "Verification of all Tajweed rules",
        duration: "1-2 months",
      },
      {
        title: "Memorization Verification",
        description: "Complete Quran memorization check",
        duration: "1-2 months",
      },
    ],
    prerequisites: "Complete Hifz or equivalent",
    outcomes: [
      "Formal Ijazah certification",
      "Complete Sanad to Prophet Muhammad (ﷺ)",
      "Teaching authorization",
      "Scholarly recognition",
    ],
    instructors: [
      {
        name: "Sheikh Abubakar Al-Maysari",
        role: "Senior Scholar",
        experience: "25+ years",
      },
      {
        name: "Ustadh Aliyy ibn Abdurrozzaaq",
        role: "Ijazah Specialist",
        experience: "15+ years",
      },
    ],
    testimonials: [
      {
        name: "Hafiz Ibrahim",
        rating: 5,
        text: "Receiving my Ijazah from Al-Maysaroh was the culmination of years of study. The scholars were thorough and supportive.",
      },
    ],
    faqs: [
      {
        q: "What is Ijazah?",
        a: "Ijazah is a formal certification authorizing you to teach the Quran with an unbroken chain of transmission to Prophet Muhammad (ﷺ).",
      },
      {
        q: "How long does it take?",
        a: "The program duration depends on your current level and readiness. Most students complete within 3-6 months.",
      },
    ],
    iconName: "Award",
    color: "from-amber-600 to-amber-800",
  },
};

// ==================== MAIN PAGE COMPONENT ====================
export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const course = COURSE_DATA[params.slug];

  if (!course) {
    notFound();
  }

  const IconComponent =
    {
      BookOpen: BookOpen,
      Mic: Mic,
      Globe: Globe,
      GraduationCap: GraduationCap,
      Heart: Heart,
      Star: Star,
      Award: Award,
    }[course.iconName] || BookOpen;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary-700/5 blur-[100px] lg:blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] bg-gold/5 blur-[80px] lg:blur-[120px] rounded-full -z-10" />

      {/* Islamic Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Back Link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>

        {/* ==================== HEADER SECTION ==================== */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left Column - Course Icon & Badge */}
          <div className="lg:w-1/3">
            <div className="relative group">
              <div
                className={cn(
                  "absolute -inset-1 bg-gradient-to-r rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-opacity",
                  course.color,
                )}
              />
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center shadow-2xl">
                <IconComponent className="w-32 h-32 sm:w-40 sm:h-40 text-white/30" />
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              {course.popular && (
                <span className="px-4 py-2 rounded-full bg-primary-700 text-white text-xs font-black uppercase tracking-wider">
                  {course.badge || "Most Popular"}
                </span>
              )}
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-wider">
                {course.format}
              </span>
              <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-xs font-black uppercase tracking-wider">
                {course.level}
              </span>
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className="lg:w-2/3 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                {course.category} Program
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
                {course.name}
              </h1>
              <p className="text-lg sm:text-xl text-primary-700 font-black mt-2">
                {course.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </Reveal>

            {/* Stats Grid */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  {
                    icon: Calendar,
                    label: "Next Start",
                    value: course.nextStart,
                  },
                  {
                    icon: Users,
                    label: "Students",
                    value: `${course.students}+`,
                  },
                  {
                    icon: Star,
                    label: "Rating",
                    value: `${course.rating} (${course.reviewCount} reviews)`,
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-3 rounded-xl bg-muted/30"
                  >
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-sm font-black">{stat.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Price & CTA */}
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary-50/30 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border border-primary-700/20">
                <div>
                  <p className="text-xs text-muted-foreground">Starting at</p>
                  <p className="text-3xl sm:text-4xl font-black text-primary-700">
                    ${course.basePrice}
                    <span className="text-sm font-medium text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No hidden fees • Cancel anytime
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/admissions">
                    <Button className="rounded-full px-8 py-4 font-black bg-primary-700 hover:bg-primary-800 group">
                      <span className="flex items-center gap-2">
                        ENROLL NOW
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/contact?course=assessment">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 py-4 font-black"
                    >
                      FREE ASSESSMENT
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ==================== MAIN CONTENT GRID ==================== */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Overview */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary-700" />
                  Program Overview
                </h2>
                <div
                  className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: course.longDescription }}
                />
              </div>
            </Reveal>

            {/* Curriculum */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-6 sm:p-8">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary-700" />
                  Curriculum
                </h2>
                <div className="space-y-4">
                  {course.curriculum.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-700/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-black text-primary-700">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-xs text-primary-700 font-black mt-2">
                          {item.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* What You'll Achieve */}
            <Reveal delay={0.3}>
              <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-primary-700/5 to-primary-700/10">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary-700" />
                  What You'll Achieve
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.outcomes.map((outcome: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={0.4}>
              <div className="institutional-card p-6 sm:p-8">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary-700" />
                  Program Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.features.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/20"
                    >
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="space-y-6">
            {/* Instructors */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-6">
                <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-700" />
                  Your Instructors
                </h3>
                <div className="space-y-4">
                  {course.instructors.map((instructor: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-700/10 flex items-center justify-center">
                        <span className="text-sm font-black text-primary-700">
                          {instructor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-black text-sm">{instructor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {instructor.role}
                        </p>
                        <p className="text-xs text-primary-700">
                          {instructor.experience} experience
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Prerequisites */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-6">
                <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary-700" />
                  Prerequisites
                </h3>
                <p className="text-sm text-muted-foreground">
                  {course.prerequisites}
                </p>
              </div>
            </Reveal>

            {/* Testimonials */}
            {course.testimonials && course.testimonials.length > 0 && (
              <Reveal delay={0.3}>
                <div className="institutional-card p-6">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary-700" />
                    Student Testimonials
                  </h3>
                  <div className="space-y-4">
                    {course.testimonials.map(
                      (testimonial: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-xl bg-muted/30">
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < testimonial.rating
                                    ? "text-gold fill-gold"
                                    : "text-muted-foreground/30",
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm italic text-muted-foreground">
                            "{testimonial.text}"
                          </p>
                          <p className="text-xs font-black mt-2">
                            — {testimonial.name}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            )}

            {/* FAQ */}
            {course.faqs && course.faqs.length > 0 && (
              <Reveal delay={0.4}>
                <div className="institutional-card p-6">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary-700" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {course.faqs.map((faq: any, idx: number) => (
                      <div key={idx}>
                        <p className="font-black text-sm">{faq.q}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {faq.a}
                        </p>
                        {idx < course.faqs.length - 1 && (
                          <div className="border-t border-border/50 mt-3 pt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* CTA Sticky */}
            <div className="sticky top-32">
              <Reveal delay={0.5}>
                <div className="institutional-card p-6 bg-primary-700 text-white text-center">
                  <h3 className="font-black text-xl uppercase tracking-tight mb-2">
                    Ready to Begin?
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Start your journey with {course.name}
                  </p>
                  <Link href="/admissions">
                    <Button className="w-full rounded-full bg-white text-primary-700 hover:bg-white/90 font-black">
                      ENROLL NOW
                    </Button>
                  </Link>
                  <p className="text-xs text-white/60 mt-3">
                    Free assessment available
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}



// // // import { prisma } from "@/lib/prisma";
// // // import { Reveal } from "@/components/shared/section-animation";
// // // import {
// // //   Landmark,
// // //   Sparkles,
// // //   ArrowRight,
// // //   Loader2,
// // // } from "lucide-react";
// // // import { CourseListClient } from "@/components/public/courses/course-list-client";
// // // import { Button } from "@/components/ui/button";
// // // import Link from "next/link";
// // // import { Suspense } from "react";
// // // import type { Metadata } from "next";


// // // // ==================== TYPES ====================
// // // // ==================== METADATA ====================
// // // export const metadata: Metadata = {
// // //   title: "Sacred Pathways | Quran, Tajweed & Arabic Courses | Al-Maysaroh",
// // //   description:
// // //     "Explore our Sanad-based Quranic programs: Hifz memorization, Tajweed mastery, Classical Arabic, and Ijazah certification. Learn 1-on-1 with certified scholars.",
// // //   keywords: [
// // //     "Quran courses",
// // //     "Hifz program",
// // //     "Tajweed classes",
// // //     "Arabic language",
// // //     "Ijazah certification",
// // //     "online Quran learning",
// // //     "Sanad",
// // //   ],
// // //   openGraph: {
// // //     title: "Sacred Pathways | Al-Maysaroh Course Catalog",
// // //     description:
// // //       "Sacred knowledge, made accessible. Browse our scholarly curriculum of Quran, Tajweed, Arabic, and Islamic Studies programs.",
// // //     url: "https://almaysaroh.com/courses",
// // //     type: "website",
// // //   },
// // //   twitter: {
// // //     card: "summary_large_image",
// // //     title: "Sacred Pathways | Al-Maysaroh",
// // //     description: "Browse our Sanad-based Quranic programs",
// // //   },
// // // };

// // // export const revalidate = 3600;

// // // // ==================== MOCK DATA ====================
// // // const MOCK_DATA = [
// // //   {
// // //     id: "hifz",
// // //     name: "Hifz Al-Quran",
// // //     description:
// // //       "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed.",
// // //     longDescription:
// // //       "A comprehensive 2-3 year journey to memorize the entire Quran with scholarly guidance. Students receive 1-on-1 instruction from Ijazah-certified scholars.",
// // //     basePrice: 2.25,
// // //     category: "QURAN",
// // //     subcategory: "Hifz",
// // //     duration: "2-3 years",
// // //     durationMonths: 30,
// // //     level: "All Levels",
// // //     format: "1-on-1",
// // //     nextStart: "All Year Round",
// // //     sessionsPerWeek: "2-4",
// // //     sessionDuration: "30-60 min",
// // //     students: 156,
// // //     rating: 4.9,
// // //     reviewCount: 87,
// // //     features: [
// // //       "Ijazah Certification",
// // //       "Daily Revision System",
// // //       "Progress Tracking",
// // //       "Audio Recordings",
// // //       "Weekly Assessments",
// // //       "Sanad Certificate",
// // //     ],
// // //     curriculum: [
// // //       "Juz 1-10 Foundation",
// // //       "Juz 11-20 Building",
// // //       "Juz 21-30 Mastery",
// // //       "Complete Revision",
// // //     ],
// // //     prerequisites: "Ability to read Quranic Arabic",
// // //     outcomes: [
// // //       "Complete Quran memorization",
// // //       "Ijazah certification",
// // //       "Proper Tajweed application",
// // //       "Teaching methodology",
// // //     ],
// // //     isMock: true,
// // //     popular: true,
// // //     badge: "Most Popular",
// // //     iconName: "BookOpen",
// // //     color: "from-primary-600 to-primary-800",
// // //   },
// // //   {
// // //     id: "qiroah",
// // //     name: "Qiro'ah Al-Quran",
// // //     description:
// // //       "Master the art of Quranic recitation with proper Tajweed. Learn to read with accuracy and beauty.",
// // //     longDescription:
// // //       "A detailed program focusing on the art of Quranic recitation. Students will learn proper recitation techniques and apply them in their daily practice.",
// // //     basePrice: 2,
// // //     category: "QURAN",
// // //     subcategory: "Recitation",
// // //     duration: "6 months",
// // //     durationMonths: 6,
// // //     level: "Beginner",
// // //     format: "1-on-1",
// // //     nextStart: "All Year Round",
// // //     sessionsPerWeek: "2-3",
// // //     sessionDuration: "30-60 min",
// // //     students: 89,
// // //     rating: 4.8,
// // //     reviewCount: 45,
// // //     features: [
// // //       "Nurul-bayaan",
// // //       "Arabic Phonetics",
// // //       "Letters and Sounds",
// // //       "Alphabet Mastery",
// // //       "Sound Recognition",
// // //       "Fluency Building",
// // //       "Tajweed Rules",
// // //       "Practice Exercises",
// // //       "Audio Resources",
// // //       "Progress Tracking",
// // //       "Certificate",
// // //     ],
// // //     curriculum: [ "Alphabet and Phonetics", "Tajweed Rules", "Fluency Practice", "Final Assessment",  ],
// // //     prerequisites: "No prior Quran reading ability",
// // //     outcomes: [
// // //       "Fluent Quranic recitation",
// // //       "Improve pronunciation",
// // //       "Build confidence in recitation",
// // //       "Understand Quranic recitation rules",
// // //       "Prepare for advanced study",
// // //     ],
// // //     isMock: true,
// // //     popular: true,
// // //     badge: "New",
// // //     iconName: "BookOpen",
// // //     color: "from-primary-600 to-primary-800",

// // //   },
// // //   {
// // //     id: "tajweed",
// // //     name: "Tajweed Al-Itqan",
// // //     description:
// // //       "Scientific mastery of Quranic recitation rules. Perfect your pronunciation with expert guidance.",
// // //     longDescription:
// // //       "A 6-month intensive program covering all Tajweed rules with practical application. Students learn Makharij, Sifaat, and Ahkam through live correction.",
// // //     basePrice: 2,
// // //     category: "TAJWEED",
// // //     subcategory: "Recitation",
// // //     duration: "6 months",
// // //     durationMonths: 6,
// // //     level: "Beginner to Advanced",
// // //     format: "Small Groups",
// // //     nextStart: "All Year Round",
// // //     sessionsPerWeek: "2-3",
// // //     sessionDuration: "30-60 min",
// // //     students: 203,
// // //     rating: 4.8,
// // //     reviewCount: 124,
// // //     features: [
// // //       "Live Tajweed Correction",
// // //       "Practical Application",
// // //       "Practice Exercises",

// // //       "Audio Analysis",
// // //       "Live Correction",
// // //       "Mistake Tracking",
// // //       "Practice Materials",
// // //       "Progress Reports",
// // //       "Certificate",
// // //     ],
// // //     curriculum: [
// // //       "Makharij Al-Huruf",
// // //       "Sifaat Al-Huruf",
// // //       "Ahkam Al-Tajweed",
// // //       "Practical Application",
// // //     ],
// // //     prerequisites: "Basic Quran reading ability",
// // //     outcomes: [
// // //       "Perfect pronunciation",
// // //       "Apply all Tajweed rules",
// // //       "Recite with confidence",
// // //       "Teach basic rules",
// // //     ],
// // //     isMock: true,
// // //     popular: false,
// // //     iconName: "Mic",
// // //     color: "from-accent to-accent/90",
// // //   },
// // //   {
// // //     id: "arabic",
// // //     name: "Quranic Arabic",
// // //     description:
// // //       "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
// // //     longDescription:
// // //       "A 1-year program designed to help students understand Quranic Arabic directly. Focus on Nahw (grammar), Sarf (morphology), and Quranic vocabulary.",
// // //     basePrice: 2,
// // //     category: "ARABIC",
// // //     subcategory: "Language",
// // //     duration: "1 year",
// // //     durationMonths: 12,
// // //     level: "Beginner",
// // //     format: "1-on-1",
// // //     nextStart: "All Year Round",
// // //     sessionsPerWeek: "2-3",
// // //     sessionDuration: "30-45 min",
// // //     students: 312,
// // //     rating: 4.7,
// // //     reviewCount: 156,
// // //     features: [
// // //       "Quranic Vocabulary",
// // //       "Grammar Foundation",
// // //       "Practice Exercises",
// // //       "Audio Resources",
// // //       "Progress Tracking",
// // //       "Certificate",
// // //     ],
// // //     curriculum: [
// // //       "Nahw (Syntax)",
// // //       "Sarf (Morphology)",
// // //       "Quranic Vocabulary",
// // //       "Tafsir Integration",
// // //     ],
// // //     prerequisites: "No prior Arabic needed",
// // //     outcomes: [
// // //       "Understand 80% of Quranic words",
// // //       "Read classical texts",
// // //       "Basic translation skills",
// // //       "Continue self-study",
// // //     ],
// // //     isMock: true,
// // //     popular: true,
// // //     badge: "Best Value",
// // //     iconName: "Globe",
// // //     color: "from-gold to-gold/90",
// // //   },
// // //   {
// // //     id: "tafsir",
// // //     name: "Tafsir Al-Mubin",
// // //     description:
// // //       "Deep Quranic understanding through classical exegesis. Study Tafsir from primary sources.",
// // //     longDescription:
// // //       "An advanced 1.5-year program exploring Quranic meanings through classical Tafsir works including Tabari, Ibn Kathir, and Qurtubi.",
// // //     basePrice: 2,
// // //     category: "TAFSIR",
// // //     subcategory: "Exegesis",
// // //     duration: "1.5 years",
// // //     durationMonths: 18,
// // //     level: "Advanced",
// // //     format: "1-on-1",
// // //     nextStart: "All Year Round",
// // //     sessionsPerWeek: "2-3",
// // //     sessionDuration: "30-60 min",
// // //     students: 78,
// // //     rating: 4.9,
// // //     reviewCount: 42,
// // //     features: [
// // //       "Classical Sources",
// // //       "Thematic Studies",
// // //       "Scholarly Mentorship",
// // //       "Research Guidance",
// // //       "Weekly Discussions",
// // //       "Ijazah Track",
// // //     ],
// // //     curriculum: [
// // //       "Tafsir Al-Tabari",
// // //       "Tafsir Ibn Kathir",
// // //       "Tafsir Al-Qurtubi",
// // //       "Thematic Tafsir",
// // //     ],
// // //     prerequisites: "Arabic reading ability",
// // //     outcomes: [
// // //       "Understand classical tafsir",
// // //       "Analyze Quranic themes",
// // //       "Independent research",
// // //       "Teaching capability",
// // //     ],
// // //     isMock: true,
// // //     popular: false,
// // //     iconName: "GraduationCap",
// // //     color: "from-primary-500 to-primary-700",
// // //   },
// // //   {
// // //     id: "group-qiroah",
// // //     name: "Group Qiro'ah",
// // //     description:
// // //       "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy.",
// // //     longDescription:
// // //       "A nurturing group program where children learn proper Quranic reading through games, activities, and positive reinforcement.",
// // //     basePrice: 6,
// // //     category: "CHILDREN",
// // //     subcategory: "Reading",
// // //     duration: "6 months",
// // //     durationMonths: 6,
// // //     level: "Beginner",
// // //     format: "Group (4-10)",
// // //     nextStart: "September 2026",
// // //     sessionsPerWeek: "2-4",
// // //     sessionDuration: "30-60 min",
// // //     students: 45,
// // //     rating: 4.8,
// // //     reviewCount: 28,
// // //     features: [
// // //       "Interactive Games",
// // //       "Reward System",
// // //       "Parent Portal",
// // //       "Progress Reports",
// // //       "Weekly Updates",
// // //       "Certificate",
// // //     ],
// // //     curriculum: [
// // //       "Arabic Alphabet",
// // //       "Basic Pronunciation",
// // //       "Short Surahs",
// // //       "Reading Fluency",
// // //     ],
// // //     prerequisites: "Ages 7-12",
// // //     outcomes: [
// // //       "Confident Quran reading",
// // //       "Love for Quran",
// // //       "Basic Tajweed",
// // //       "Short surah memorization",
// // //     ],
// // //     isMock: true,
// // //     popular: true,
// // //     badge: "Popular",
// // //     iconName: "Users",
// // //     color: "from-blue-500 to-blue-600",
// // //   },
// // //   {
// // //     id: "juz-amma",
// // //     name: "Juz Amma Group",
// // //     description:
// // //       "Memorize the last Juz with understanding. Perfect for children ages 6-12 starting their Hifz journey.",
// // //     longDescription:
// // //       "An 8-month program focused on memorizing Juz Amma with proper Tajweed and understanding of meanings through fun activities.",
// // //     basePrice: 6,
// // //     category: "CHILDREN",
// // //     subcategory: "Memorization",
// // //     duration: "8 months",
// // //     durationMonths: 8,
// // //     level: "Beginner",
// // //     format: "Group (4-10)",
// // //     nextStart: "October 2026",
// // //     sessionsPerWeek: "2-4",
// // //     sessionDuration: "30-60 min",
// // //     students: 38,
// // //     rating: 4.9,
// // //     reviewCount: 31,
// // //     features: [
// // //       "37 Surahs",
// // //       "Meaning Explained",
// // //       "Revision Games",
// // //       "Parent Updates",
// // //       "Progress Badges",
// // //       "Graduation",
// // //     ],
// // //     curriculum: [
// // //       "Short Surahs (An-Nas to Al-Falaq)",
// // //       "Middle Surahs (Al-Kafirun to Al-Qadr)",
// // //       "Long Surahs (Al-Qari'ah to An-Naba)",
// // //       "Complete Revision",
// // //     ],
// // //     prerequisites: "Ages 6-12",
// // //     outcomes: [
// // //       "Memorize Juz Amma",
// // //       "Understand meanings",
// // //       "Proper pronunciation",
// // //       "Love for Quran",
// // //     ],
// // //     isMock: true,
// // //     badge: "New",
// // //     iconName: "Star",
// // //     color: "from-purple-500 to-purple-600",
// // //   },
// // //   {
// // //     id: "ijazah-program",
// // //     name: "Ijazah Certification",
// // //     description:
// // //       "Complete your journey with formal Ijazah certification. For advanced students ready to receive Sanad.",
// // //     longDescription:
// // //       "A rigorous assessment program for students ready to receive Ijazah. Work directly with senior scholars to perfect your recitation.",
// // //     basePrice: 3,
// // //     category: "IJAZAH",
// // //     subcategory: "Certification",
// // //     duration: "3-6 months",
// // //     durationMonths: 4,
// // //     level: "Advanced",
// // //     format: "1-on-1",
// // //     nextStart: "Rolling Admission",
// // //     sessionsPerWeek: 2,
// // //     sessionDuration: "60 min",
// // //     students: 24,
// // //     rating: 5.0,
// // //     reviewCount: 18,
// // //     features: [
// // //       "Complete Sanad",
// // //       "Senior Scholars",
// // //       "Oral Examination",
// // //       "Written Certification",
// // //       "Public Recognition",
// // //       "Teaching Authorization",
// // //     ],
// // //     curriculum: [
// // //       "Recitation Assessment",
// // //       "Tajweed Mastery Check",
// // //       "Memorization Verification",
// // //       "Final Examination",
// // //     ],
// // //     prerequisites: "Complete Hifz or equivalent",
// // //     outcomes: [
// // //       "Formal Ijazah",
// // //       "Complete Sanad",
// // //       "Teaching authorization",
// // //       "Scholarly recognition",
// // //     ],
// // //     isMock: true,
// // //     popular: true,
// // //     badge: "Limited Seats",
// // //     iconName: "Award",
// // //     color: "from-amber-600 to-amber-800",
// // //   },
// // // ];

// // // // ==================== CATEGORIES (Icon names as strings, not components) ====================
// // // const CATEGORIES = [
// // //   { id: "all", name: "All Programs", iconName: "BookOpen", count: 0 },
// // //   { id: "QURAN", name: "Quran", iconName: "BookOpen", count: 0 },
// // //   { id: "TAJWEED", name: "Tajweed", iconName: "Mic", count: 0 },
// // //   { id: "ARABIC", name: "Arabic", iconName: "Globe", count: 0 },
// // //   { id: "TAFSIR", name: "Tafsir", iconName: "GraduationCap", count: 0 },
// // //   { id: "CHILDREN", name: "Children", iconName: "Heart", count: 0 },
// // //   { id: "IJAZAH", name: "Ijazah", iconName: "Award", count: 0 },
// // // ];


// // // // ==================== FILTER OPTIONS ====================
// // // const LEVELS = [
// // //   { id: "all", name: "All Levels" },
// // //   { id: "Beginner", name: "Beginner" },
// // //   { id: "Intermediate", name: "Intermediate" },
// // //   { id: "Advanced", name: "Advanced" },
// // // ];

// // // const FORMATS = [
// // //   { id: "all", name: "All Formats" },
// // //   { id: "1-on-1", name: "1-on-1" },
// // //   { id: "Group", name: "Group" },
// // //   { id: "Small Groups", name: "Small Groups" },
// // //   { id: "Group (4-6)", name: "Group (4-6)" },
// // //   { id: "Group Sessions", name: "Group Sessions" },
// // // ];

// // // const DURATIONS = [
// // //   { id: "all", name: "Any Duration" },
// // //   { id: "3-6", name: "3-6 months" },
// // //   { id: "6-12", name: "6-12 months" },
// // //   { id: "1-2", name: "1-2 years" },
// // //   { id: "2+", name: "2+ years" },
// // // ];


// // // // ==================== HELPER FUNCTIONS ====================
// // // function getIconNameForCategory(category: string): string {
// // //   const map: Record<string, string> = {
// // //     QURAN: "BookOpen",
// // //     TAJWEED: "Mic",
// // //     ARABIC: "Globe",
// // //     TAFSIR: "GraduationCap",
// // //     CHILDREN: "Heart",
// // //     IJAZAH: "Award",
// // //   };
// // //   return map[category] || "BookOpen";
// // // }

// // // function getColorForCategory(category: string): string {
// // //   const map: Record<string, string> = {
// // //     QURAN: "from-primary-600 to-primary-800",
// // //     TAJWEED: "from-accent to-accent/90",
// // //     ARABIC: "from-gold to-gold/90",
// // //     TAFSIR: "from-primary-500 to-primary-700",
// // //     CHILDREN: "from-blue-500 to-blue-600",
// // //     IJAZAH: "from-amber-600 to-amber-800",
// // //   };
// // //   return map[category] || "from-primary-600 to-primary-800";
// // // }

// // // // ==================== PROGRAM TYPE ====================
// // // type Program = {
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   longDescription?: string;
// // //   basePrice: number;
// // //   category: string;
// // //   subcategory?: string;
// // //   duration?: string;
// // //   durationMonths?: number;
// // //   level?: string;
// // //   format?: string;
// // //   nextStart?: string;
// // //   sessionsPerWeek?: number;
// // //   sessionDuration?: string;
// // //   students?: number;
// // //   rating?: number;
// // //   reviewCount?: number;
// // //   features?: string[];
// // //   curriculum?: string[];
// // //   prerequisites?: string;
// // //   outcomes?: string[];
// // //   isMock?: boolean;
// // //   popular?: boolean;
// // //   badge?: string;
// // //   iconName?: string;
// // //   color?: string;
// // // };

// // // // ==================== MAIN PAGE COMPONENT ====================
// // // export default async function CoursesPage() {
// // //   let dbPrograms: any[] = [];

// // //   try {
// // //     const fetched = await prisma.pricingPlan.findMany({
// // //       where: { isActive: true },
// // //       orderBy: { orderIndex: "asc" },
// // //     });

// // //     dbPrograms = fetched.map((p) => ({
// // //       id: p.id,
// // //       name: p.name,
// // //       description: p.description,
// // //       longDescription: p.description || p.description,
// // //       basePrice: Number(p.basePrice),
// // //       category: p.category as string,
// // //       subcategory: p.category || "",
// // //       duration: p.minDuration ? `${p.minDuration}-${p.maxDuration || ""} months` : "Flexible",
// // //       durationMonths: p.minDuration || 0,
// // //       level: p.level || "All Levels",
// // //       format: (p as unknown as { format?: string }).format || "1-on-1",
// // //       nextStart: (p as any).nextStart || "Quarterly",
// // //       sessionsPerWeek: p.sessionsPerWeek || 0,
// // //       sessionDuration: "45 min",
// // //       students: (p as { students?: number }).students || 0,
// // //       rating: (p as { rating?: number }).rating || 4.8,
// // //       reviewCount: (p as any).reviewCount || 0,
// // //       features: p.features || [],
// // //       curriculum: (p as any).curriculum || [],
// // //       prerequisites: (p as any).prerequisites || "None",
// // //       // outcomes: p.outcomes || [],
// // //       outcomes: [],
// // //       isMock: false,
// // //       popular: (p as any).popular || false,
// // //       badge: (p as any).badge || "",
// // //       iconName: getIconNameForCategory(p.category) as string,
// // //       color: getColorForCategory(p.category) as string,
// // //     }));
// // //   } catch (error) {
// // //     console.error("DB connection error - using mock data");
// // //   }

// // //   const allPrograms: Program[] = [...dbPrograms, ...MOCK_DATA];

// // //   // Calculate counts for categories
// // //   const categoriesWithCounts = CATEGORIES.map((cat) => {
// // //     if (cat.id === "all") {
// // //       return { ...cat, count: allPrograms.length };
// // //     }
// // //     const count = allPrograms.filter((p) => p.category === cat.id).length;
// // //     return { ...cat, count };
// // //   });

// // //   // Calculate stats
// // //   const totalPrograms = allPrograms.length;
// // //   const totalStudents = allPrograms.reduce(
// // //     (acc, p) => acc + (p.students || 0),
// // //     0,
// // //   );
// // //   const averageRating =
// // //     allPrograms.reduce((acc, p) => acc + (p.rating || 0), 0) /
// // //     allPrograms.length;

// // //   return (
// // //     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
// // //       {/* Background Decor */}
// // //       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
// // //       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />

// // //       {/* Floating particles */}
// // //       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
// // //       <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

// // //       <div className="container mx-auto px-4 sm:px-6">
// // //         {/* ==================== BREADCRUMB ==================== */}
// // //         <div className="text-xs sm:text-sm text-muted-foreground mb-6">
// // //           <Link href="/" className="hover:text-primary-700 transition-colors">
// // //             Home
// // //           </Link>
// // //           <span className="mx-2">/</span>
// // //           <span className="text-primary-700 font-medium">Courses</span>
// // //         </div>

// // //         {/* ==================== HERO SECTION ==================== */}
// // //         <div className="max-w-5xl mb-12 sm:mb-16 md:mb-20 lg:mb-24">
// // //           <Reveal>
// // //             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-6">
// // //               <Landmark className="w-3.5 h-3.5" /> Scholarly Curriculum 2026
// // //             </div>
// // //             <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-6">
// // //               Sacred <br />
// // //               <span className="text-primary-700 italic">Pathways.</span>
// // //             </h1>
// // //             <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 max-w-2xl">
// // //               Al-Maysaroh offers a rigorous, Sanad-based curriculum designed for
// // //               those seeking deep connection with the Divine Word through
// // //               scholarly tradition.
// // //             </p>
// // //           </Reveal>
// // //         </div>

// // //         {/* ==================== STATS OVERVIEW ==================== */}
// // //         {/* <Reveal delay={0.1}>
// // //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
// // //             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
// // //               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
// // //                 {totalPrograms}+
// // //               </div>
// // //               <div className="text-xs font-medium text-muted-foreground">
// // //                 Sacred Programs
// // //               </div>
// // //             </div>
// // //             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
// // //               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
// // //                 100%
// // //               </div>
// // //               <div className="text-xs font-medium text-muted-foreground">
// // //                 Sanad-Based
// // //               </div>
// // //             </div>
// // //             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
// // //               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
// // //                 {totalStudents}+
// // //               </div>
// // //               <div className="text-xs font-medium text-muted-foreground">
// // //                 Students Enrolled
// // //               </div>
// // //             </div>
// // //             <div className="institutional-card p-4 sm:p-5 text-center group hover:border-primary-700/30 transition-all">
// // //               <div className="text-2xl sm:text-3xl font-black text-primary-700 mb-1">
// // //                 {averageRating.toFixed(1)}
// // //               </div>
// // //               <div className="text-xs font-medium text-muted-foreground">
// // //                 Average Rating
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </Reveal> */}

// // //         {/* ==================== SEARCH & FILTERS ==================== */}
// // //         {/* <div className="mb-8 space-y-4">
     
// // //           <Reveal delay={0.15}>
// // //             <div className="relative max-w-md">
// // //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// // //               <Input
// // //                 placeholder="Search programs..."
// // //                 className="pl-11 pr-4 py-6 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all"
// // //                 aria-label="Search courses"
// // //               />
// // //             </div>
// // //           </Reveal>

// // //           {/* Categories Pills - Horizontal Scroll on Mobile 
// // //           <Reveal delay={0.2}>
// // //             <div className="overflow-x-auto pb-2 scrollbar-hide">
// // //               <div className="flex items-center gap-2 min-w-max">
// // //                 <Filter className="w-4 h-4 text-muted-foreground mr-1" />
// // //                 {categoriesWithCounts.map((cat) => (
// // //                   <button
// // //                     key={cat.id}
// // //                     className={cn(
// // //                       "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2",
// // //                       "bg-muted/30 hover:bg-primary-700/10 border border-border",
// // //                     )}
// // //                   >
// // //                     {cat.name}
// // //                     <span className="text-primary-700">({cat.count})</span>
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </Reveal>
// // //         </div> */}

// // //         {/* ==================== CLIENT CONTROLLER ==================== */}
// // //         <Suspense
// // //           fallback={
// // //             <div className="flex justify-center items-center py-20">
// // //               <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
// // //             </div>
// // //           }
// // //         >
// // //           <CourseListClient
// // //             programs={allPrograms}
            
// // //             categories={categoriesWithCounts}
// // //             levels={LEVELS}
// // //             formats={FORMATS}
// // //             durations={DURATIONS}

// // //           />
// // //         </Suspense>

// // //         {/* ==================== BOTTOM CTA ==================== */}
// // //         <Reveal delay={0.3}>
// // //           <div className="mt-16 sm:mt-20 md:mt-24">
// // //             <div className="institutional-card p-8 sm:p-10 md:p-12 text-center max-w-3xl mx-auto border-2 border-primary-700/20 bg-linear-to-br from-primary-50/20 to-primary-100/10">
// // //               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-700/10 mb-4">
// // //                 <Sparkles className="w-8 h-8 text-primary-700" />
// // //               </div>
// // //               <h2 className="text-2xl sm:text-3xl font-black tracking-tighter font-heading mb-3">
// // //                 Not Sure Where to Begin?
// // //               </h2>
// // //               <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-6">
// // //               {`  Schedule a free assessment with our academic advisors. We'll
// // //                 help you find the perfect program for your journey.`}
// // //               </p>
// // //               <Link href="/assessment">
// // //                 <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 transition-all duration-300 group">
// // //                   <span className="flex items-center gap-2">
// // //                     BOOK FREE ASSESSMENT
// // //                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //                   </span>
// // //                 </Button>
// // //               </Link>
// // //               <p className="text-xs text-muted-foreground/60 mt-4">
// // //                 No obligation • 30-minute session • Meet a scholar
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </Reveal>

// // //         {/* Last updated */}
// // //         <p className="text-xs text-center text-muted-foreground/30 mt-8">
// // //           Last updated:{" "}
// // //           {new Date().toLocaleDateString("en-US", {
// // //             month: "long",
// // //             day: "numeric",
// // //             year: "numeric",
// // //           })}
// // //         </p>
// // //       </div>
// // //     </main>
// // //   );
// // // }














// // // app/(public)/courses/page.tsx
// // "use client";

// // import { useState, useMemo } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   Search,
// //   Filter,
// //   X,
// //   Sparkles,
// //   ArrowRight,
// //   Loader2,
// //   BookOpen,
// //   Mic,
// //   Globe,
// //   GraduationCap,
// //   Heart,
// //   Users,
// //   Star,
// //   Shield,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Reveal } from "@/components/shared/section-animation";
// // import Link from "next/link";
// // import { cn } from "@/lib/utils";
// // import { CourseCard } from "@/components/public/courses/course-card";

// // // Course Data - Updated to match the CourseCard props
// // const ALL_COURSES = [
// //   {
// //     id: "hifz",
// //     name: "Hifz Al-Quran",
// //     description: "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed.",
// //     category: "QURAN",
// //     subcategory: "Hifz",
// //     duration: "2-3 years",
// //     level: "All Levels",
// //     format: "1-on-1",
// //     basePrice: 2.25,
// //     price: "$2.25+",
// //     rating: 4.9,
// //     students: 156,
// //     features: ["Ijazah Certification", "Daily Revision", "Progress Tracking", "Sanad Chain"],
// //     popular: true,
// //     badge: "Most Popular",
// //     iconName: "BookOpen",
// //     color: "from-purple-600 to-indigo-700",
// //     href: "/courses/hifz",
// //     isMock: false,
// //   },
// //   {
// //     id: "tajweed",
// //     name: "Tajweed Al-Itqan",
// //     description: "Scientific mastery of Quranic recitation rules. Perfect your pronunciation with expert guidance.",
// //     category: "TAJWEED",
// //     subcategory: "Recitation",
// //     duration: "6 months",
// //     level: "Beginner to Advanced",
// //     format: "1-on-1",
// //     basePrice: 2,
// //     price: "$2+",
// //     rating: 4.8,
// //     students: 203,
// //     features: ["Audio Analysis", "Live Correction", "Mistake Tracking", "Certificate"],
// //     popular: false,
// //     iconName: "Mic",
// //     color: "from-blue-600 to-cyan-600",
// //     href: "/courses/tajweed",
// //     isMock: false,
// //   },
// //   {
// //     id: "group-tajweed",
// //     name: "Group Tajweed",
// //     description: "Master Tajweed rules in a supportive group environment. Learn with peers and share the journey.",
// //     category: "TAJWEED",
// //     subcategory: "Group",
// //     duration: "6-9 months",
// //     level: "Beginner to Intermediate",
// //     format: "Group (4-6)",
// //     basePrice: 6,
// //     price: "$6",
// //     rating: 4.7,
// //     students: 89,
// //     features: ["Peer Learning", "Group Practice", "Lower Cost", "Community Support"],
// //     popular: true,
// //     badge: "Best Value",
// //     iconName: "Users",
// //     color: "from-teal-600 to-cyan-600",
// //     href: "/courses/group-tajweed",
// //     isMock: false,
// //   },
// //   {
// //     id: "arabic",
// //     name: "Quranic Arabic",
// //     description: "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
// //     category: "ARABIC",
// //     subcategory: "Language",
// //     duration: "1 year",
// //     level: "Beginner",
// //     format: "Group Sessions",
// //     basePrice: 2,
// //     price: "$2+",
// //     rating: 4.7,
// //     students: 312,
// //     features: ["Quranic Vocabulary", "Grammar Foundation", "Tafsir Integration", "Certificate"],
// //     popular: false,
// //     iconName: "Globe",
// //     color: "from-amber-600 to-orange-600",
// //     href: "/courses/arabic",
// //     isMock: false,
// //   },
// //   {
// //     id: "tafsir",
// //     name: "Tafsir Al-Mubin",
// //     description: "Deep Quranic understanding through classical exegesis. Study Tafsir from primary sources.",
// //     category: "TAFSIR",
// //     subcategory: "Exegesis",
// //     duration: "1.5 years",
// //     level: "Advanced",
// //     format: "1-on-1",
// //     basePrice: 2,
// //     price: "$2+",
// //     rating: 4.9,
// //     students: 78,
// //     features: ["Classical Sources", "Thematic Studies", "Scholarly Mentorship", "Research Paper"],
// //     popular: false,
// //     iconName: "GraduationCap",
// //     color: "from-slate-600 to-gray-700",
// //     href: "/courses/tafsir",
// //     isMock: false,
// //   },
// //   {
// //     id: "qiroah",
// //     name: "Qiro'ah Program",
// //     description: "Learn to read the Quran with confidence. Perfect for beginners and those who want to improve.",
// //     category: "QURAN",
// //     subcategory: "Reading",
// //     duration: "6-12 months",
// //     level: "Beginner",
// //     format: "1-on-1",
// //     basePrice: 2,
// //     price: "$2+",
// //     rating: 4.8,
// //     students: 156,
// //     features: ["Letter Recognition", "Fluency Practice", "Patient Instruction", "Progress Tracking"],
// //     popular: true,
// //     badge: "Popular",
// //     iconName: "BookOpen",
// //     color: "from-teal-600 to-emerald-600",
// //     href: "/courses/qiroah",
// //     isMock: false,
// //   },
// //   {
// //     id: "group-qiroah",
// //     name: "Group Qiro'ah",
// //     description: "Fun, interactive Quran reading for children and beginners. Learn with peers in a supportive environment.",
// //     category: "CHILDREN",
// //     subcategory: "Reading",
// //     duration: "6-9 months",
// //     level: "Beginner",
// //     format: "Group (4-10)",
// //     basePrice: 6,
// //     price: "$6",
// //     rating: 4.8,
// //     students: 89,
// //     features: ["Interactive Games", "Reward System", "Parent Portal", "Weekly Updates"],
// //     popular: true,
// //     badge: "For Kids",
// //     iconName: "Users",
// //     color: "from-emerald-600 to-teal-600",
// //     href: "/courses/group-qiroah",
// //     isMock: false,
// //   },
// //   {
// //     id: "juz-amma",
// //     name: "Juz Amma",
// //     description: "Memorize the 30th Juz with proper Tajweed and understanding. Perfect for beginners starting their Hifz journey.",
// //     category: "QURAN",
// //     subcategory: "Memorization",
// //     duration: "6-12 months",
// //     level: "Beginner",
// //     format: "1-on-1",
// //     basePrice: 7,
// //     price: "$7+",
// //     rating: 4.9,
// //     students: 112,
// //     features: ["37 Surahs", "Meaning Explained", "Progress Badges", "Certificate"],
// //     popular: true,
// //     badge: "Popular",
// //     iconName: "Star",
// //     color: "from-amber-600 to-orange-600",
// //     href: "/courses/juz-amma",
// //     isMock: false,
// //   },
// //   {
// //     id: "juz-tabarak",
// //     name: "Juz Tabarak",
// //     description: "Continue your memorization journey with the 29th Juz. Build on Juz Amma with longer surahs.",
// //     category: "QURAN",
// //     subcategory: "Memorization",
// //     duration: "8-12 months",
// //     level: "Intermediate",
// //     format: "Group (4-10)",
// //     basePrice: 8,
// //     price: "$8",
// //     rating: 4.8,
// //     students: 67,
// //     features: ["14 Surahs", "Deep Meanings", "Group Support", "Certificate"],
// //     popular: false,
// //     iconName: "Moon",
// //     color: "from-purple-600 to-indigo-600",
// //     href: "/courses/juz-tabarak",
// //     isMock: false,
// //   },
// //   {
// //     id: "murojaah",
// //     name: "Muroja'ah",
// //     description: "Preserve and perfect your Quran memorization. Structured revision for Huffadh.",
// //     category: "QURAN",
// //     subcategory: "Revision",
// //     duration: "Ongoing",
// //     level: "Advanced",
// //     format: "1-on-1",
// //     basePrice: 9,
// //     price: "$9+",
// //     rating: 4.9,
// //     students: 89,
// //     features: ["Structured Revision", "Weakness Identification", "Ijazah Prep", "Lifelong Preservation"],
// //     popular: false,
// //     iconName: "RefreshCw",
// //     color: "from-rose-600 to-pink-600",
// //     href: "/courses/murojaah",
// //     isMock: false,
// //   },
// // ];

// // // Categories
// // const CATEGORIES = [
// //   { id: "all", name: "All Programs", icon: BookOpen, count: 0 },
// //   { id: "QURAN", name: "Quran", icon: BookOpen, count: 0 },
// //   { id: "TAJWEED", name: "Tajweed", icon: Mic, count: 0 },
// //   { id: "ARABIC", name: "Arabic", icon: Globe, count: 0 },
// //   { id: "TAFSIR", name: "Tafsir", icon: GraduationCap, count: 0 },
// //   { id: "CHILDREN", name: "Children", icon: Heart, count: 0 },
// // ];

// // // Sort Options
// // const SORT_OPTIONS = [
// //   { id: "popular", name: "Most Popular" },
// //   { id: "rating", name: "Highest Rated" },
// //   { id: "price-low", name: "Price: Low to High" },
// //   { id: "price-high", name: "Price: High to Low" },
// //   { id: "students", name: "Most Students" },
// // ];

// // export default function CoursesPage() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [sortBy, setSortBy] = useState("popular");
// //   const [visibleCount, setVisibleCount] = useState(6);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [viewType, setViewType] = useState<"grid" | "list">("grid");

// //   // Calculate category counts
// //   const categoriesWithCounts = CATEGORIES.map((cat) => ({
// //     ...cat,
// //     count: cat.id === "all" 
// //       ? ALL_COURSES.length 
// //       : ALL_COURSES.filter((c) => c.category === cat.id).length,
// //   }));

// //   // Filter and sort courses
// //   const filteredCourses = useMemo(() => {
// //     let filtered = ALL_COURSES.filter((course) => {
// //       const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
// //       const matchesSearch = searchQuery === "" || 
// //         course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         course.description.toLowerCase().includes(searchQuery.toLowerCase());
// //       return matchesCategory && matchesSearch;
// //     });

// //     // Sort
// //     switch (sortBy) {
// //       case "popular":
// //         filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
// //         break;
// //       case "rating":
// //         filtered.sort((a, b) => b.rating - a.rating);
// //         break;
// //       case "price-low":
// //         filtered.sort((a, b) => a.basePrice - b.basePrice);
// //         break;
// //       case "price-high":
// //         filtered.sort((a, b) => b.basePrice - a.basePrice);
// //         break;
// //       case "students":
// //         filtered.sort((a, b) => b.students - a.students);
// //         break;
// //     }
// //     return filtered;
// //   }, [selectedCategory, searchQuery, sortBy]);

// //   const visibleCourses = filteredCourses.slice(0, visibleCount);
// //   const hasMore = visibleCount < filteredCourses.length;

// //   const clearFilters = () => {
// //     setSearchQuery("");
// //     setSelectedCategory("all");
// //     setSortBy("popular");
// //   };

// //   const activeFilterCount = [
// //     selectedCategory !== "all" ? 1 : 0,
// //     searchQuery ? 1 : 0,
// //     sortBy !== "popular" ? 1 : 0,
// //   ].reduce((a, b) => a + b, 0);

// //   const loadMore = () => {
// //     setIsLoading(true);
// //     setTimeout(() => {
// //       setVisibleCount((prev) => prev + 6);
// //       setIsLoading(false);
// //     }, 500);
// //   };

// //   return (
// //     <main className="pt-30 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
// //       {/* Background Elements - Hidden on mobile for performance */}
// //       <div className="hidden sm:block absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
// //       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
// //       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />

// //       <div className="container mx-auto px-4 sm:px-6">
// //         {/* Hero Section - Mobile Optimized */}
// //         <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
// //           <Reveal>
// //             <div className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-700 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
// //               <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Scholarly Curriculum {new Date().getFullYear()}
// //             </div>
// //             <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
// //               Sacred <span className="text-primary-700 italic">Pathways</span>
// //             </h1>
// //             <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto px-4">
// //               Al-Maysaroh offers a rigorous, Sanad-based curriculum designed for
// //               those seeking deep connection with the Divine Word through scholarly tradition.
// //             </p>
// //           </Reveal>
// //         </div>

// //         {/* Stats Bar - Mobile First Grid */}
// //         <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
// //           {[
// //             { label: "Sacred Programs", value: ALL_COURSES.length, icon: BookOpen },
// //             { label: "Sanad-Based", value: "100%", icon: Shield },
// //             { label: "Students Enrolled", value: "100+", icon: Users },
// //             { label: "Avg Rating", value: "4.8", icon: Star },
// //           ].map((stat, i) => (
// //             <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary-50/50 to-indigo-50/50 dark:from-primary-950/20 dark:to-indigo-950/20 border border-primary-100 dark:border-primary-800 text-center">
// //               <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-600 mx-auto mb-1 sm:mb-1.5 md:mb-2" />
// //               <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-primary-600">{stat.value}</div>
// //               <div className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* Search & Filters - Mobile Optimized */}
// //         <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
// //           {/* Search Bar */}
// //           <div className="relative max-w-full sm:max-w-md">
// //             <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
// //             <Input
// //               type="text"
// //               placeholder="Search programs..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="pl-9 sm:pl-11 pr-8 sm:pr-12 py-3.5 sm:py-5 md:py-6 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all bg-background text-sm sm:text-base"
// //             />
// //             {searchQuery && (
// //               <button
// //                 onClick={() => setSearchQuery("")}
// //                 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 touch-target"
// //               >
// //                 <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground hover:text-primary-700 transition-colors" />
// //               </button>
// //             )}
// //           </div>

// //           {/* Category Pills - Horizontal Scroll on Mobile with better UX */}
// //           <div className="overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
// //             <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
// //               <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 mr-0.5 sm:mr-1 shrink-0" />
// //               {categoriesWithCounts.map((cat) => {
// //                 const Icon = cat.icon;
// //                 return (
// //                   <button
// //                     key={cat.id}
// //                     onClick={() => setSelectedCategory(cat.id)}
// //                     className={cn(
// //                       "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap touch-target",
// //                       selectedCategory === cat.id
// //                         ? "bg-primary-700 text-white shadow-md"
// //                         : "bg-primary-50 dark:bg-primary-950/40 text-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/60 border border-primary-100 dark:border-primary-800"
// //                     )}
// //                   >
// //                     <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// //                     {cat.name}
// //                     <span className={cn(
// //                       "text-[8px] sm:text-[10px]",
// //                       selectedCategory === cat.id ? "text-white/70" : "text-primary-700/70"
// //                     )}>
// //                       ({cat.count})
// //                     </span>
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Sort, View Toggle & Clear Filters - Stack on mobile */}
// //           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
// //             <div className="flex items-center gap-2 sm:gap-3">
// //               <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-muted-foreground">Sort by:</span>
// //               <select
// //                 value={sortBy}
// //                 onChange={(e) => setSortBy(e.target.value)}
// //                 className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
// //               >
// //                 {SORT_OPTIONS.map((opt) => (
// //                   <option key={opt.id} value={opt.id}>{opt.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* View Toggle - Better touch targets on mobile */}
// //             <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-muted/30 border border-border self-start sm:self-auto">
// //               <button
// //                 onClick={() => setViewType("grid")}
// //                 className={cn(
// //                   "px-3 sm:px-3 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all touch-target",
// //                   viewType === "grid" ? "bg-primary-700 text-white" : "hover:bg-primary-100"
// //                 )}
// //               >
// //                 Grid
// //               </button>
// //               <button
// //                 onClick={() => setViewType("list")}
// //                 className={cn(
// //                   "px-3 sm:px-3 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all touch-target",
// //                   viewType === "list" ? "bg-primary-700 text-white" : "hover:bg-primary-100"
// //                 )}
// //               >
// //                 List
// //               </button>
// //             </div>

// //             {activeFilterCount > 0 && (
// //               <Button
// //                 variant="ghost"
// //                 onClick={clearFilters}
// //                 className="text-[10px] sm:text-xs text-primary-700 hover:text-primary-800 gap-1 px-2 sm:px-3 py-1.5 h-auto self-start sm:self-auto"
// //               >
// //                 <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// //                 Clear ({activeFilterCount})
// //               </Button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Results Count */}
// //         <div className="flex items-center justify-between mb-4 sm:mb-6">
// //           <p className="text-[11px] sm:text-sm text-muted-foreground">
// //             Showing <span className="font-black text-primary-700">{visibleCourses.length}</span> of{" "}
// //             <span className="font-black text-primary-700">{filteredCourses.length}</span> programs
// //           </p>
// //         </div>

// //         {/* Course Grid/List */}
// //         {filteredCourses.length === 0 ? (
// //           <div className="text-center py-12 sm:py-16 md:py-20">
// //             <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-3 sm:mb-4">
// //               <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700/50" />
// //             </div>
// //             <h3 className="text-xl sm:text-2xl font-black tracking-tighter mb-2">No programs found</h3>
// //             <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Try adjusting your filters or search query</p>
// //             <Button onClick={clearFilters} variant="outline" className="rounded-full text-sm sm:text-base">Clear all filters</Button>
// //           </div>
// //         ) : (
// //           <>
// //             <div className={cn(
// //               "grid gap-3 sm:gap-4 md:gap-6 lg:gap-8",
// //               viewType === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
// //             )}>
// //               {visibleCourses.map((course) => (
// //                 <CourseCard key={course.id} program={course} viewType={viewType} />
// //               ))}
// //             </div>

// //             {/* Load More */}
// //             {hasMore && (
// //               <div className="text-center mt-8 sm:mt-10 md:mt-12">
// //                 <Button
// //                   onClick={loadMore}
// //                   disabled={isLoading}
// //                   variant="outline"
// //                   className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base group"
// //                 >
// //                   {isLoading ? (
// //                     <Loader2 className="w-4 h-4 animate-spin" />
// //                   ) : (
// //                     <>
// //                       Load More Programs
// //                       <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             )}
// //           </>
// //         )}

// //         {/* Bottom CTA - Mobile Optimized */}
// //         <div className="mt-12 sm:mt-16 md:mt-20 text-center">
// //           <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-primary-300 transition-all p-6 sm:p-8 md:p-10 max-w-2xl mx-auto">
// //             <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3">Not Sure Where to Begin?</h3>
// //             <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
// //              {` Schedule a free assessment with our academic advisors. We'll help you find the perfect program for your journey.`}
// //             </p>
// //             <Link href="/assessment">
// //               <Button className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-primary-700 hover:bg-primary-800">
// //                 BOOK FREE ASSESSMENT
// //                 <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }


















// // app/(public)/courses/page.tsx
// import { prisma } from "@/lib/prisma";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   Landmark,

//   ArrowRight,
//   Loader2,
//   BookOpen,
//   Shield,
//   Users,
//   Star,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Suspense } from "react";
// import type { Metadata } from "next";
// import { CoursesClient } from "./courses-client";

// // ==================== METADATA ====================
// export const metadata: Metadata = {
//   title: "Sacred Pathways | Quran, Tajweed & Arabic Courses | Al-Maysaroh",
//   description:
//     "Explore our Sanad-based Quranic programs: Hifz memorization, Tajweed mastery, Classical Arabic, and Ijazah certification. Learn 1-on-1 with certified scholars.",
//   keywords: [
//     "Quran courses",
//     "Hifz program",
//     "Tajweed classes",
//     "Arabic language",
//     "Ijazah certification",
//     "online Quran learning",
//     "Sanad",
//   ],
//   openGraph: {
//     title: "Sacred Pathways | Al-Maysaroh Course Catalog",
//     description:
//       "Sacred knowledge, made accessible. Browse our scholarly curriculum of Quran, Tajweed, Arabic, and Islamic Studies programs.",
//     url: "https://almaysaroh.com/courses",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Sacred Pathways | Al-Maysaroh",
//     description: "Browse our Sanad-based Quranic programs",
//   },
// };

// export const revalidate = 3600;

// // ==================== MOCK DATA (Fallback) ====================
// const MOCK_DATA = [
//   {
//     id: "hifz",
//     name: "Hifz Al-Quran",
//     description: "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed.",
//     category: "QURAN",
//     subcategory: "Hifz",
//     duration: "2-3 years",
//     level: "All Levels",
//     format: "1-on-1",
//     basePrice: 2.25,
//     price: "$2.25+",
//     rating: 4.9,
//     students: 156,
//     features: ["Ijazah Certification", "Daily Revision", "Progress Tracking", "Sanad Chain"],
//     popular: true,
//     badge: "Most Popular",
//     iconName: "BookOpen",
//     color: "from-purple-600 to-indigo-700",
//     href: "/courses/hifz",
//     isMock: true,
//   },
//   {
//     id: "tajweed",
//     name: "Tajweed Al-Itqan",
//     description: "Scientific mastery of Quranic recitation rules. Perfect your pronunciation with expert guidance.",
//     category: "TAJWEED",
//     subcategory: "Recitation",
//     duration: "6 months",
//     level: "Beginner to Advanced",
//     format: "1-on-1",
//     basePrice: 2,
//     price: "$2+",
//     rating: 4.8,
//     students: 203,
//     features: ["Audio Analysis", "Live Correction", "Mistake Tracking", "Certificate"],
//     popular: false,
//     iconName: "Mic",
//     color: "from-blue-600 to-cyan-600",
//     href: "/courses/tajweed",
//     isMock: true,
//   },
//   {
//     id: "group-tajweed",
//     name: "Group Tajweed",
//     description: "Master Tajweed rules in a supportive group environment. Learn with peers and share the journey.",
//     category: "TAJWEED",
//     subcategory: "Group",
//     duration: "6-9 months",
//     level: "Beginner to Intermediate",
//     format: "Group (4-6)",
//     basePrice: 6,
//     price: "$6",
//     rating: 4.7,
//     students: 89,
//     features: ["Peer Learning", "Group Practice", "Lower Cost", "Community Support"],
//     popular: true,
//     badge: "Best Value",
//     iconName: "Users",
//     color: "from-teal-600 to-cyan-600",
//     href: "/courses/group-tajweed",
//     isMock: true,
//   },
//   {
//     id: "arabic",
//     name: "Quranic Arabic",
//     description: "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
//     category: "ARABIC",
//     subcategory: "Language",
//     duration: "1 year",
//     level: "Beginner",
//     format: "Group Sessions",
//     basePrice: 2,
//     price: "$2+",
//     rating: 4.7,
//     students: 312,
//     features: ["Quranic Vocabulary", "Grammar Foundation", "Tafsir Integration", "Certificate"],
//     popular: false,
//     iconName: "Globe",
//     color: "from-amber-600 to-orange-600",
//     href: "/courses/arabic",
//     isMock: true,
//   },
//   {
//     id: "tafsir",
//     name: "Tafsir Al-Mubin",
//     description: "Deep Quranic understanding through classical exegesis. Study Tafsir from primary sources.",
//     category: "TAFSIR",
//     subcategory: "Exegesis",
//     duration: "1.5 years",
//     level: "Advanced",
//     format: "1-on-1",
//     basePrice: 2,
//     price: "$2+",
//     rating: 4.9,
//     students: 78,
//     features: ["Classical Sources", "Thematic Studies", "Scholarly Mentorship", "Research Paper"],
//     popular: false,
//     iconName: "GraduationCap",
//     color: "from-slate-600 to-gray-700",
//     href: "/courses/tafsir",
//     isMock: true,
//   },
//   {
//     id: "qiroah",
//     name: "Qiro'ah Program",
//     description: "Learn to read the Quran with confidence. Perfect for beginners and those who want to improve.",
//     category: "QURAN",
//     subcategory: "Reading",
//     duration: "6-12 months",
//     level: "Beginner",
//     format: "1-on-1",
//     basePrice: 2,
//     price: "$2+",
//     rating: 4.8,
//     students: 156,
//     features: ["Letter Recognition", "Fluency Practice", "Patient Instruction", "Progress Tracking"],
//     popular: true,
//     badge: "Popular",
//     iconName: "BookOpen",
//     color: "from-teal-600 to-emerald-600",
//     href: "/courses/qiroah",
//     isMock: true,
//   },
//   {
//     id: "group-qiroah",
//     name: "Group Qiro'ah",
//     description: "Fun, interactive Quran reading for children and beginners. Learn with peers in a supportive environment.",
//     category: "CHILDREN",
//     subcategory: "Reading",
//     duration: "6-9 months",
//     level: "Beginner",
//     format: "Group (4-10)",
//     basePrice: 6,
//     price: "$6",
//     rating: 4.8,
//     students: 89,
//     features: ["Interactive Games", "Reward System", "Parent Portal", "Weekly Updates"],
//     popular: true,
//     badge: "For Kids",
//     iconName: "Users",
//     color: "from-emerald-600 to-teal-600",
//     href: "/courses/group-qiroah",
//     isMock: true,
//   },
//   {
//     id: "juz-amma",
//     name: "Juz Amma",
//     description: "Memorize the 30th Juz with proper Tajweed and understanding. Perfect for beginners starting their Hifz journey.",
//     category: "QURAN",
//     subcategory: "Memorization",
//     duration: "6-12 months",
//     level: "Beginner",
//     format: "1-on-1",
//     basePrice: 7,
//     price: "$7+",
//     rating: 4.9,
//     students: 112,
//     features: ["37 Surahs", "Meaning Explained", "Progress Badges", "Certificate"],
//     popular: true,
//     badge: "Popular",
//     iconName: "Star",
//     color: "from-amber-600 to-orange-600",
//     href: "/courses/juz-amma",
//     isMock: true,
//   },
//   {
//     id: "juz-tabarak",
//     name: "Juz Tabarak",
//     description: "Continue your memorization journey with the 29th Juz. Build on Juz Amma with longer surahs.",
//     category: "QURAN",
//     subcategory: "Memorization",
//     duration: "8-12 months",
//     level: "Intermediate",
//     format: "Group (4-10)",
//     basePrice: 8,
//     price: "$8",
//     rating: 4.8,
//     students: 67,
//     features: ["14 Surahs", "Deep Meanings", "Group Support", "Certificate"],
//     popular: false,
//     iconName: "Moon",
//     color: "from-purple-600 to-indigo-600",
//     href: "/courses/juz-tabarak",
//     isMock: true,
//   },
//   {
//     id: "murojaah",
//     name: "Muroja'ah",
//     description: "Preserve and perfect your Quran memorization. Structured revision for Huffadh.",
//     category: "QURAN",
//     subcategory: "Revision",
//     duration: "Ongoing",
//     level: "Advanced",
//     format: "1-on-1",
//     basePrice: 9,
//     price: "$9+",
//     rating: 4.9,
//     students: 89,
//     features: ["Structured Revision", "Weakness Identification", "Ijazah Prep", "Lifelong Preservation"],
//     popular: false,
//     iconName: "RefreshCw",
//     color: "from-rose-600 to-pink-600",
//     href: "/courses/murojaah",
//     isMock: true,
//   },
// ];

// // ==================== HELPER FUNCTIONS ====================
// function getIconNameForCategory(category: string): string {
//   const map: Record<string, string> = {
//     QURAN: "BookOpen",
//     TAJWEED: "Mic",
//     ARABIC: "Globe",
//     TAFSIR: "GraduationCap",
//     CHILDREN: "Heart",
//   };
//   return map[category] || "BookOpen";
// }

// function getColorForCategory(category: string): string {
//   const map: Record<string, string> = {
//     QURAN: "from-purple-600 to-indigo-700",
//     TAJWEED: "from-blue-600 to-cyan-600",
//     ARABIC: "from-amber-600 to-orange-600",
//     TAFSIR: "from-slate-600 to-gray-700",
//     CHILDREN: "from-emerald-600 to-teal-600",
//   };
//   return map[category] || "from-primary-600 to-primary-800";
// }

// // ==================== TYPES ====================
// type Program = {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   subcategory: string;
//   duration: string;
//   level: string;
//   format: string;
//   basePrice: number;
//   price: string;
//   rating: number;
//   students: number;
//   features: string[];
//   popular: boolean;
//   badge?: string;
//   iconName: string;
//   color: string;
//   href: string;
//   isMock: boolean;
// };

// // ==================== MAIN PAGE COMPONENT ====================
// export default async function CoursesPage() {
//   let dbPrograms: Program[] = [];

//   try {
//     const fetched = await prisma.pricingPlan.findMany({
//       where: { isActive: true },
//       orderBy: { orderIndex: "asc" },
//     });

//     dbPrograms = fetched.map((p) => ({
//       id: p.id,
//       name: p.name,
//       description: p.description || "",
//       category: p.category as string,
//       subcategory: p.category || "",
//       duration: p.minDuration ? `${p.minDuration}-${p.maxDuration || ""} months` : "Flexible",
//       level: p.level || "All Levels",
//       format: (p as any).format || "1-on-1",
//       basePrice: Number(p.basePrice),
//       price: `$${Number(p.basePrice)}+`,
//       rating: (p as any).rating || 4.8,
//       students: (p as any).students || 0,
//       features: p.features || [],
//       popular: (p as any).popular || false,
//       badge: (p as any).badge || "",
//       iconName: getIconNameForCategory(p.category),
//       color: getColorForCategory(p.category),
//       href: `/courses/${p.id}`,
//       isMock: false,
//     }));
//   } catch (error) {
//     console.error("DB connection error - using mock data");
//   }

//   // Merge DB programs with mock data (DB takes precedence)
//   const dbIds = new Set(dbPrograms.map(p => p.id));
//   const additionalMock = MOCK_DATA.filter(m => !dbIds.has(m.id));
//   const allPrograms: Program[] = [...dbPrograms, ...additionalMock];

//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
//       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
//       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />

//       <div className="container mx-auto px-4 sm:px-6">
      

//         {/* Hero Section */}
//         <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
//           <Reveal>
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-700 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
//               <Landmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Scholarly Curriculum {new Date().getFullYear()}
//             </div>
//             <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
//               Sacred <span className="text-primary-700 italic">Pathways</span>
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto px-4">
//               Al-Maysaroh offers a rigorous, Sanad-based curriculum designed for
//               those seeking deep connection with the Divine Word through scholarly tradition.
//             </p>
//           </Reveal>
//         </div>

//         {/* Stats Bar */}
//         <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
//           {[
//             { label: "Sacred Programs", value: allPrograms.length, icon: BookOpen },
//             { label: "Sanad-Based", value: "100%", icon: Shield },
//             { label: "Students Enrolled", value: "100+", icon: Users },
//             { label: "Avg Rating", value: "4.8", icon: Star },
//           ].map((stat, i) => (
//             <div key={i} className="p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary-50/50 to-indigo-50/50 dark:from-primary-950/20 dark:to-indigo-950/20 border border-primary-100 dark:border-primary-800 text-center">
//               <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-600 mx-auto mb-1 sm:mb-1.5 md:mb-2" />
//               <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-primary-600">{stat.value}</div>
//               <div className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Client Component with all interactive features */}
//         <Suspense
//           fallback={
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
//             </div>
//           }
//         >
//           <CoursesClient  initialPrograms={allPrograms} />
//         </Suspense>

//         {/* Bottom CTA */}
//         <div className="mt-12 sm:mt-16 md:mt-20 text-center">
//           <div className="institutional-card p-6 sm:p-8 md:p-10 max-w-2xl mx-auto">
//             <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3">Not Sure Where to Begin?</h3>
//             <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
//              {` Schedule a free assessment with our academic advisors. We'll help you find the perfect program for your journey.`}
//             </p>
//             <Link href="/assessment">
//               <Button className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-primary-700 hover:bg-primary-800">
//                 BOOK FREE ASSESSMENT
//                 <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }







// app/courses/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Award,
  GraduationCap,
  Heart,
  Mic,
  Globe,
  CheckCircle2,
  ChevronRight,
  Scroll,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    id: "hifz",
    name: "Hifz Al-Quran",
    tagline: "Complete Memorization",
    description: "Master the entire Quran with proper Tajweed and receive Ijazah certification with complete Sanad to Prophet Muhammad (ﷺ).",
    duration: "2-3 years",
    format: "1-on-1",
    students: "200+",
    icon: Crown,
    color: "purple",
    href: "/courses/hifz",
    features: ["Ijazah Certification", "Daily Revision", "Sanad Chain"],
  },
  {
    id: "tajweed",
    name: "Tajweed Al-Itqan",
    tagline: "Scientific Recitation",
    description: "Master the science of Quranic recitation with precision. Learn Makharij, Sifaat, and Ahkam through evidence-based methodology.",
    duration: "6-12 months",
    format: "1-on-1",
    students: "300+",
    icon: Mic,
    color: "amber",
    href: "/courses/tajweed",
    features: ["Live Correction", "Audio Analysis", "Certificate"],
  },
  {
    id: "arabic",
    name: "Al-Lughah Al-Arabiyyah",
    tagline: "Quranic Language",
    description: "Understand the Quran in its original language. Master classical Arabic grammar, vocabulary, and comprehension.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "150+",
    icon: Globe,
    color: "purple",
    href: "/courses/arabic",
    features: ["Grammar Mastery", "Vocabulary", "Tafsir Reading"],
  },
  {
    id: "group-qiroah",
    name: "Group Qiro'ah",
    tagline: "Children's Reading",
    description: "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy in a supportive group environment.",
    duration: "6-9 months",
    format: "Group (4-6)",
    students: "100+",
    icon: Heart,
    color: "amber",
    href: "/courses/group-qiroah",
    features: ["Fun Activities", "Parent Portal", "Certificate"],
  },
  {
    id: "juz-amma",
    name: "Juz Amma",
    tagline: "Children's Memorization",
    description: "Memorize the 30th Juz with fun, engaging methods designed specifically for young learners ages 5-12.",
    duration: "6-12 months",
    format: "Group",
    students: "80+",
    icon: Star,
    color: "purple",
    href: "/courses/juz-amma",
    features: ["Fun Memorization", "Reward System", "Certificate"],
  },
  {
    id: "tafsir",
    name: "Tafsir Al-Mubin",
    tagline: "Quranic Exegesis",
    description: "Deep dive into Quranic meanings with classical methodology. Understand context, revelation reasons, and scholarly interpretations.",
    duration: "12-18 months",
    format: "1-on-1",
    students: "80+",
    icon: BookOpen,
    color: "amber",
    href: "/courses/tafsir",
    features: ["Classical Sources", "Scholar Mentorship", "Certificate"],
  },
];

export default function CoursesPage() {
  return (
    <main className="relative bg-background overflow-hidden">
      {/* Background */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-purple-600">Courses</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
          <div className="max-w-2xl space-y-3 xs:space-y-4 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                <Shield className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> 
                Sacred Knowledge
              </div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Path.
                </span>
              </h1>
            
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link href="/assessment">
              <Button
                variant="outline"
                className="rounded-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-black text-[10px] xs:text-xs tracking-widest uppercase border-2 border-purple-300 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Need Guidance? Take Assessment
                <ArrowRight className="ml-1.5 w-3 h-3 xs:w-3.5 xs:h-3.5" />
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* ===== STATUS BAR - NEW ===== */}
        <div className="mb-10 xs:mb-12 sm:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
            {[
              { label: "Total Programs", value: COURSES.length, icon: BookOpen, color: "purple", suffix: "" },
              { label: "Active Students", value: "900+", icon: Users, color: "amber", suffix: "" },
              { label: "Certified Scholars", value: "15+", icon: GraduationCap, color: "purple", suffix: "" },
              { label: "Student Rating", value: "4.9", icon: Star, color: "amber", suffix: "/5" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const isPurple = stat.color === "purple";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-3 xs:p-4 text-center border border-border hover:border-purple-300 transition-all group"
                >
                  <div className={`inline-flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 xs:w-5 xs:h-5 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                  </div>
                  <div className={`text-xl xs:text-2xl sm:text-3xl font-black ${isPurple ? 'text-purple-600' : 'text-amber-500'}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {COURSES.map((course, index) => {
            const Icon = course.icon;
            const isPurple = course.color === "purple";
            
            return (
              <Reveal key={course.id} delay={index * 0.1}>
                <Link
                  href={course.href}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
                >
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all duration-500 p-5 sm:p-6 md:p-8 lg:p-10 relative cursor-pointer h-full shadow-sm hover:shadow-xl">
                    
                    {/* Click Indicator */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-md">
                        <ChevronRight className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>

                    {/* Sanad Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
                      <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                        <Scroll className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                        Ijazah Track
                      </div>
                    </div>

                    {/* Student Count Badge */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[6px] sm:text-[7px] font-black text-white">
                        <Users className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8 items-start mt-6 sm:mt-8">
                      {/* Icon Container */}
                      <div className="w-full lg:w-40 h-44 sm:h-48 md:h-52 lg:h-56 bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 rounded-xl sm:rounded-2xl overflow-hidden relative border border-border group-hover:border-purple-300 transition-all shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                          <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl sm:text-5xl font-black text-purple-600/10">
                            {course.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tight group-hover:text-purple-600 transition-colors uppercase">
                            {course.name}
                          </h3>
                          <p className="text-purple-600 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
                            {course.tagline}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                          <p className="text-xs sm:text-sm font-bold text-foreground">
                            {course.duration} • {course.format}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm italic font-medium text-muted-foreground/80 leading-relaxed border-l-2 border-purple-300 pl-3">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3 h-3 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                              <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] sm:text-xs font-black text-purple-600 flex items-center gap-1.5">
                            View Program Details
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-${isPurple ? 'purple-600' : 'amber-500'} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Trust Message */}
        <Reveal delay={0.3}>
          <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 text-center max-w-2xl mx-auto">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Ijazah Certified</span>
              </div>
              <div className="w-px h-3 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Authentic Sanad</span>
              </div>
              <div className="w-px h-3 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Certified Scholars</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Final CTA */}
        <div className="mt-12 xs:mt-16 sm:mt-20 lg:mt-24 mb-12 xs:mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-purple-600/5 to-amber-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto border border-purple-200 dark:border-purple-800">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950/40 mb-4">
              <Sparkles className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2">Not sure where to start?</h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
              Take our free assessment to find the perfect program for your level and goals.
              Our scholars will guide you to the right path.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300">
                  Talk to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
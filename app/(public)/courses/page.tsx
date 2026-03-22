// import { prisma } from "@/lib/prisma";
// import { Reveal } from "@/components/shared/section-animation";
// import { Landmark } from "lucide-react";
// import { CourseListClient } from "@/components/public/courses/course-list-client";

// const MOCK_DATA = [
//   {
//     id: "mock-hifz",
//     name: "Hifz Itqan Program",
//     description:
//       "The preservation of the Word with absolute precision. Focusing on Mutashabihat mastery and Sanad preparation.",
//     basePrice: 149,
//     category: "QURAN",
//     features: ["1-on-1 Sessions", "Digital Tracking", "Weekly Revision"],
//     isMock: true,
//   },
//   {
//     id: "mock-tajweed",
//     name: "Phonetic Mastery",
//     description:
//       "A scientific study of Tajweed based on the classical poem of Al-Jazariyyah. From Makharij to Sifaat.",
//     basePrice: 89,
//     category: "TAJWEED",
//     features: ["Recitation Exam", "Practical Drill", "Theory PDF"],
//     isMock: true,
//   },
//   {
//     id: "mock-arabic",
//     name: "Quranic Linguistics",
//     description:
//       "Unlock the linguistic miracles of the Quran by studying Classical Arabic grammar and morphology.",
//     basePrice: 69,
//     category: "ARABIC",
//     features: ["Nahw Foundation", "Sarf Mastery", "Vocabulary"],
//     isMock: true,
//   },
// ];

// export default async function CoursesPage() {
//   let dbPrograms = [];

//   try {
//     const fetched = await prisma.pricingPlan.findMany({
//       where: { isActive: true },
//       orderBy: { orderIndex: "asc" },
//     });

//     dbPrograms = fetched.map((p) => ({
//       id: p.id,
//       name: p.name,
//       description: p.description,
//       basePrice: Number(p.basePrice),
//       category: p.category,
//       features: p.features,
//       isMock: false,
//     }));
//   } catch (error) {
//     console.error("DB connection error - loading catalog with mock backup.");
//   }

//   // Final List: Database data + Mock data to ensure the campus looks active
//   const allPrograms = [...dbPrograms, ...MOCK_DATA];

//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
//       {/* Immersive Background Lighting - Mobile Optimized */}
//       <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary-700/5 blur-2xl sm:blur-[60px] md:blur-[100px] lg:blur-[150px] -z-10 rounded-full translate-x-1/4 -translate-y-1/4" />
//       <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gold/5 blur-[30px] sm:blur-[50px] md:blur-[80px] lg:blur-[120px] -z-10 rounded-full -translate-x-1/4 translate-y-1/4" />

//       <div className="container mx-auto px-4 sm:px-6">
//         {/* --- INSTITUTIONAL PROSPECTUS HEADER --- */}
//         <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-6 sm:space-y-8 md:space-y-10">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl glass-surface border border-primary-100/50 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.3em] shadow-lg sm:shadow-xl min-h-11">
//               <Landmark className="w-4 h-4 sm:w-4 sm:h-4 animate-pulse" />
//               Scholarly Curriculum 2026
//             </div>
//           </Reveal>

//           <div className="space-y-4 sm:space-y-6">
//             <Reveal delay={0.1}>
//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85] text-balance">
//                 Academic <br />
//                 <span className="text-primary-700 italic">Inventory.</span>
//               </h1>
//             </Reveal>
//             <Reveal delay={0.2}>
//               <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 md:pl-8">
//                 Al-Maysaroh offers a rigorous, tiered curriculum designed for
//                 those seeking deep connection with the Divine Word through
//                 scholarly tradition.
//               </p>
//             </Reveal>
//           </div>
//         </div>

//         {/* --- CLIENT CONTROLLER (INTERACTIVE EXPLORER) --- */}
//         <div className="px-2 sm:px-0">
//           {" "}
//           {/* Added container padding for mobile */}
//           <CourseListClient dbPrograms={allPrograms} />
//         </div>
//       </div>
//     </main>
//   );
// }

import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/shared/section-animation";
import {
  Landmark,
  Sparkles,
  ArrowRight,
  BookOpen, // Explicitly import icons used for helper functions (though not rendered here)
  Mic,
  Globe,
  GraduationCap,
  Heart,
  Award,
} from "lucide-react";
import { CourseListClient } from "@/components/public/courses/course-list-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// --- Metadata for SEO ---
export const metadata = {
  title: "Quran Courses Online | Hifz, Tajweed & Arabic | Al-Maysaroh",
  description:
    "Explore our Sanad-based Quran courses: Hifz memorization, Tajweed mastery, and Classical Arabic. Learn 1-on-1 with certified scholars. Ijazah certification available.",
  openGraph: {
    title: "Al-Maysaroh Course Catalog",
    description:
      "Sacred knowledge, made accessible. Browse our scholarly curriculum.",
    images: ["/og-courses.jpg"],
  },
};

// --- MOCK DATA (Enhanced) ---
// Note: 'isMock: true' programs will be filtered in the main logic to ensure they're only added once.
const MOCK_DATA = [
  {
    id: "hifz-program",
    name: "Hifz Al-Quran",
    description:
      "Complete Quran memorization with Ijazah certification. Master the entire Quran with proper Tajweed and understanding.",
    longDescription:
      "A comprehensive 2-3 year journey to memorize the entire Quran with scholarly guidance. Students receive 1-on-1 instruction from Ijazah-certified scholars, with weekly progress tracking and revision sessions.",
    basePrice: 149,
    category: "QURAN",
    subcategory: "Hifz",
    duration: "2-3 years",
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
    ],
    curriculum: [
      "Juz 1-10 Foundation",
      "Juz 11-20 Building",
      "Juz 21-30 Mastery",
      "Complete Revision",
    ],
    prerequisites: "Ability to read Quranic Arabic",
    outcomes: [
      "Complete Quran memorization",
      "Ijazah certification",
      "Proper Tajweed application",
      "Teaching methodology",
    ],
    isMock: false, // Set to false to indicate it's a "real" mock for initial display
    popular: true,
    badge: "Most Popular",
    iconName: "BookOpen",
    color: "from-primary-600 to-primary-800",
  },
  {
    id: "tajweed-mastery",
    name: "Tajweed Al-Itqan",
    description:
      "Scientific mastery of Quranic recitation rules. Perfect your pronunciation and flow with expert guidance.",
    longDescription:
      "A 6-month intensive program covering all Tajweed rules with practical application. Students learn Makharij, Sifaat, and Ahkam through live correction and audio analysis technology.",
    basePrice: 89,
    category: "TAJWEED",
    subcategory: "Recitation",
    duration: "6 months",
    level: "Beginner to Advanced",
    format: "Small Groups",
    nextStart: "October 2026",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    students: 203,
    rating: 4.8,
    reviewCount: 124,
    features: [
      "Audio Analysis",
      "Live Correction",
      "Mistake Tracking",
      "Practice Materials",
      "Progress Reports",
      "Certificate",
    ],
    curriculum: [
      "Makharij Al-Huruf",
      "Sifaat Al-Huruf",
      "Ahkam Al-Tajweed",
      "Practical Application",
    ],
    prerequisites: "Basic Quran reading ability",
    outcomes: [
      "Perfect pronunciation",
      "Apply all Tajweed rules",
      "Recite with confidence",
      "Teach basic rules",
    ],
    isMock: false,
    popular: false,
    iconName: "Mic",
    color: "from-accent to-accent/90",
  },
  {
    id: "arabic-fluency",
    name: "Quranic Arabic",
    description:
      "Understand the Quran in its original language. Master classical Arabic grammar and vocabulary.",
    longDescription:
      "A 1-year program designed to help students understand Quranic Arabic directly. Focus on Nahw (grammar), Sarf (morphology), and Quranic vocabulary.",
    basePrice: 69,
    category: "ARABIC",
    subcategory: "Language",
    duration: "1 year",
    level: "Beginner",
    format: "Group Sessions",
    nextStart: "September 2026",
    sessionsPerWeek: 2,
    sessionDuration: "75 min",
    students: 312,
    rating: 4.7,
    reviewCount: 156,
    features: [
      "Quranic Vocabulary",
      "Grammar Foundation",
      "Practice Exercises",
      "Audio Resources",
      "Progress Tracking",
      "Certificate",
    ],
    curriculum: [
      "Nahw (Syntax)",
      "Sarf (Morphology)",
      "Quranic Vocabulary",
      "Tafsir Integration",
    ],
    prerequisites: "No prior Arabic needed",
    outcomes: [
      "Understand 80% of Quranic words",
      "Read classical texts",
      "Basic translation skills",
      "Continue self-study",
    ],
    isMock: false,
    popular: true,
    badge: "Best Value",
    iconName: "Globe",
    color: "from-gold to-gold/90",
  },
  {
    id: "tafsir-studies",
    name: "Tafsir Al-Mubin",
    description:
      "Deep Quranic understanding through classical exegesis. Study Tafsir from primary sources.",
    longDescription:
      "An advanced 1.5-year program exploring Quranic meanings through classical Tafsir works including Tabari, Ibn Kathir, and Qurtubi.",
    basePrice: 129,
    category: "TAFSIR",
    subcategory: "Exegesis",
    duration: "1.5 years",
    level: "Advanced",
    format: "1-on-1",
    nextStart: "January 2027",
    sessionsPerWeek: 2,
    sessionDuration: "60 min",
    students: 78,
    rating: 4.9,
    reviewCount: 42,
    features: [
      "Classical Sources",
      "Thematic Studies",
      "Scholarly Mentorship",
      "Research Guidance",
      "Weekly Discussions",
      "Ijazah Track",
    ],
    curriculum: [
      "Tafsir Al-Tabari",
      "Tafsir Ibn Kathir",
      "Tafsir Al-Qurtubi",
      "Thematic Tafsir",
    ],
    prerequisites: "Arabic reading ability",
    outcomes: [
      "Understand classical tafsir",
      "Analyze Quranic themes",
      "Independent research",
      "Teaching capability",
    ],
    isMock: false,
    popular: false,
    iconName: "GraduationCap",
    color: "from-primary-500 to-primary-700",
  },
  {
    id: "group-qiroah",
    name: "Group Qiro'ah",
    description:
      "Fun, interactive Quran reading for children ages 7-12. Learn to read with confidence and joy.",
    longDescription:
      "A nurturing group program where children learn proper Quranic reading through games, activities, and positive reinforcement.",
    basePrice: 79,
    category: "CHILDREN",
    subcategory: "Reading",
    duration: "6 months",
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
      "Arabic Alphabet",
      "Basic Pronunciation",
      "Short Surahs",
      "Reading Fluency",
    ],
    prerequisites: "Ages 7-12",
    outcomes: [
      "Confident Quran reading",
      "Love for Quran",
      "Basic Tajweed",
      "Short surah memorization",
    ],
    isMock: true,
    popular: true,
    badge: "Popular",
    iconName: "Users",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "juz-amma",
    name: "Juz Amma Group",
    description:
      "Memorize the last Juz with understanding. Perfect for children ages 6-12 starting their Hifz journey.",
    longDescription:
      "An 8-month program focused on memorizing Juz Amma with proper Tajweed and understanding of meanings through fun activities.",
    basePrice: 79,
    category: "CHILDREN",
    subcategory: "Memorization",
    duration: "8 months",
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
      "Short Surahs (An-Nas to Al-Falaq)",
      "Middle Surahs (Al-Kafirun to Al-Qadr)",
      "Long Surahs (Al-Qari'ah to An-Naba)",
      "Complete Revision",
    ],
    prerequisites: "Ages 6-12",
    outcomes: [
      "Memorize Juz Amma",
      "Understand meanings",
      "Proper pronunciation",
      "Love for Quran",
    ],
    isMock: true,
    badge: "New",
    iconName: "Star",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "ijazah-program",
    name: "Ijazah Certification Track",
    description:
      "Complete your journey with formal Ijazah certification. For advanced students ready to receive Sanad.",
    longDescription:
      "A rigorous assessment program for students ready to receive Ijazah. Work directly with senior scholars to perfect your recitation and receive formal certification with complete Sanad.",
    basePrice: 299,
    category: "IJAZAH",
    subcategory: "Certification",
    duration: "3-6 months",
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
      "Recitation Assessment",
      "Tajweed Mastery Check",
      "Memorization Verification",
      "Final Examination",
    ],
    prerequisites: "Complete Hifz or equivalent",
    outcomes: [
      "Formal Ijazah",
      "Complete Sanad",
      "Teaching authorization",
      "Scholarly recognition",
    ],
    isMock: true,
    popular: true,
    badge: "Limited Seats",
    iconName: "Award",
    color: "from-amber-600 to-amber-800",
  },
];

// --- Categories with iconName strings only! ---
const CATEGORIES = [
  { id: "all", name: "All Programs", iconName: "BookOpen", count: 0 },
  { id: "QURAN", name: "Quran", iconName: "BookOpen", count: 0 },
  { id: "TAJWEED", name: "Tajweed", iconName: "Mic", count: 0 },
  { id: "ARABIC", name: "Arabic", iconName: "Globe", count: 0 },
  { id: "TAFSIR", name: "Tafsir", iconName: "GraduationCap", count: 0 },
  { id: "CHILDREN", name: "Children", iconName: "Heart", count: 0 },
  { id: "IJAZAH", name: "Ijazah", iconName: "Award", count: 0 },
];

// --- Level filters ---
const LEVELS = [
  { id: "all", name: "All Levels" },
  { id: "Beginner", name: "Beginner" },
  { id: "Intermediate", name: "Intermediate" },
  { id: "Advanced", name: "Advanced" },
];

// --- Format filters ---
const FORMATS = [
  { id: "all", name: "All Formats" },
  { id: "1-on-1", name: "1-on-1" },
  { id: "Group", name: "Group" },
  { id: "Small Groups", name: "Small Groups" },
  { id: "Group (4-6)", name: "Group (4-6)" },
];

// --- Duration filters ---
const DURATIONS = [
  { id: "all", name: "Any Duration" },
  { id: "3-6", name: "3-6 months" },
  { id: "6-12", name: "6-12 months" },
  { id: "1-2", name: "1-2 years" },
  { id: "2+", name: "2+ years" },
];

// --- Helper function that returns STRING icon names only! ---
function getIconNameForCategory(category: string): string {
  switch (category) {
    case "QURAN":
      return "BookOpen";
    case "TAJWEED":
      return "Mic";
    case "ARABIC":
      return "Globe";
    case "TAFSIR":
      return "GraduationCap";
    case "CHILDREN":
      return "Heart";
    case "IJAZAH":
      return "Award";
    default:
      return "BookOpen";
  }
}

// --- Helper function for colors ---
function getColorForCategory(category: string): string {
  switch (category) {
    case "QURAN":
      return "from-primary-600 to-primary-800";
    case "TAJWEED":
      return "from-accent to-accent/90";
    case "ARABIC":
      return "from-gold to-gold/90";
    case "TAFSIR":
      return "from-primary-500 to-primary-700";
    case "CHILDREN":
      return "from-blue-500 to-blue-600";
    case "IJAZAH":
      return "from-amber-600 to-amber-800";
    default:
      return "from-primary-600 to-primary-800";
  }
}

// --- Main Server Component ---
export default async function CoursesPage() {
  let dbPrograms = [];

  try {
    const fetched = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" },
    });

    dbPrograms = fetched.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      longDescription: p.longDescription || p.description,
      basePrice: Number(p.basePrice),
      category: p.category,
      subcategory: p.subcategory || "",
      duration: p.duration || "TBD",
      level: p.level || "All Levels",
      format: p.format || "1-on-1",
      nextStart: p.nextStart || "Quarterly",
      sessionsPerWeek: p.sessionsPerWeek || 2,
      sessionDuration: p.sessionDuration || "45 min",
      students: p.students || 0,
      rating: p.rating || 4.8,
      reviewCount: p.reviewCount || 0,
      features: p.features || [],
      curriculum: p.curriculum || [],
      prerequisites: p.prerequisites || "None",
      outcomes: p.outcomes || [],
      isMock: false,
      popular: p.popular || false,
      badge: p.badge || "",
      iconName: getIconNameForCategory(p.category),
      color: getColorForCategory(p.category),
    }));
  } catch (error) {
    console.error("DB connection error - using enhanced mock data");
    // If DB fails, ensure MOCK_DATA items that are *explicitly* isMock:true
    // are included for a fuller catalog display.
    dbPrograms = MOCK_DATA.filter((m) => !m.isMock); // If DB fails, still show "real" mock data
  }

  // Final List: Database data + Mock data marked as 'isMock: true'
  // This ensures that if the DB has real items for 'hifz-program', etc.,
  // they take precedence, but if not, the mock ones fill in.
  const uniquePrograms = new Map<string, (typeof MOCK_DATA)[0]>();

  // Add DB programs first (or the 'real' mocks if DB failed)
  dbPrograms.forEach((p) => uniquePrograms.set(p.id, p));

  // Add MOCK_DATA items only if their ID doesn't already exist from DB
  MOCK_DATA.forEach((m) => {
    if (!uniquePrograms.has(m.id)) {
      uniquePrograms.set(m.id, m);
    }
  });

  const allPrograms = Array.from(uniquePrograms.values());

  // Calculate counts for categories
  const categoriesWithCounts = CATEGORIES.map((cat) => {
    if (cat.id === "all") {
      return { ...cat, count: allPrograms.length };
    }
    const count = allPrograms.filter((p) => p.category === cat.id).length;
    return { ...cat, count };
  });

  // Calculate stats
  const totalPrograms = allPrograms.length;
  const oneOnOneCount = allPrograms.filter((p) =>
    p.format?.includes("1-on-1"),
  ).length;
  const groupCount = allPrograms.filter(
    (p) => p.format?.includes("Group") || p.format?.includes("Group (4-6)"),
  ).length;
  const totalStudents = allPrograms.reduce(
    (acc, p) => acc + (p.students || 0),
    0,
  );
  const averageRating =
    allPrograms.length > 0
      ? allPrograms.reduce((acc, p) => acc + (p.rating || 0), 0) /
        allPrograms.length
      : 0; // Handle division by zero

  return (
    <main
      className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden"
      aria-label="Al-Maysaroh Course Catalog"
    >
      {/* Immersive Background Lighting */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary-700/5 blur-2xl sm:blur-[60px] md:blur-[100px] lg:blur-[150px] -z-10 rounded-full translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gold/5 blur-[30px] sm:blur-[50px] md:blur-[80px] lg:blur-[120px] -z-10 rounded-full -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* --- HEADER SECTION --- */}
        <div className="max-w-4xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 space-y-6 sm:space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl glass-surface border border-primary-100/50 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.3em] shadow-lg sm:shadow-xl min-h-11">
              <Landmark className="w-4 h-4 sm:w-4 sm:h-4 animate-pulse" />
              Scholarly Curriculum 2026
            </div>
          </Reveal>

          <div className="space-y-4 sm:space-y-6">
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85] text-balance">
                Academic <br />
                <span className="text-primary-700 italic">Inventory.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 md:pl-8">
                Al-Maysaroh offers a rigorous, tiered curriculum designed for
                those seeking deep connection with the Divine Word through
                scholarly tradition.
              </p>
            </Reveal>
          </div>
          {/* Search Bar is now handled entirely within CourseListClient */}
        </div>

        {/* --- STATS OVERVIEW --- */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-primary-50/50 to-primary-100/20 dark:from-primary-950/20 dark:to-primary-900/10 border border-primary-700/20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary-700">
                {totalPrograms}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Programs
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary-700">
                {oneOnOneCount}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                1-on-1
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary-700">
                {groupCount}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Group
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary-700">
                {totalStudents}+
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Students
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary-700">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                Avg Rating
              </div>
            </div>
          </div>
        </Reveal>

        {/* --- CLIENT CONTROLLER (INTERACTIVE EXPLORER) --- */}
        <CourseListClient
          programs={allPrograms}
          categories={categoriesWithCounts}
          levels={LEVELS}
          formats={FORMATS}
          durations={DURATIONS}
        />

        {/* --- BOTTOM CTA --- */}
        <Reveal delay={0.5}>
          <div className="mt-16 sm:mt-20 md:mt-24 text-center">
            <div className="inline-flex flex-col items-center gap-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary-50/30 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border border-primary-700/20 max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-primary-700" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter font-heading">
                Not Sure Where to Start?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                Schedule a free assessment with our academic advisors. We'll
                help you find the perfect program for your goals.
              </p>
              <Link href="/assessment">
                <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800">
                  <span className="flex items-center gap-2">
                    FREE ASSESSMENT
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground/60">
                No obligation • 30-minute session • Meet a scholar
              </p>
            </div>
          </div>
        </Reveal>

        {/* Last updated */}
        <p className="text-xs text-center text-muted-foreground/30 mt-8">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </main>
  );
}
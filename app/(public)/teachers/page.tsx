// import { prisma } from "@/lib/prisma";
// import { Reveal } from "@/components/shared/section-animation";
// import { Verified, GraduationCap } from "lucide-react";
// import { FacultyListClient } from "@/components/public/teachers/faculty-list-client";

// export default async function FacultyPage() {
//   let dbTeachers = [];

//   try {
//     const fetched = await prisma.teacher.findMany({
//       include: { user: true },
//       where: { isAvailable: true },
//     });

//     // Clean data for React 19 Serialization
//     dbTeachers = fetched.map((t) => ({
//       id: t.id,
//       name: t.user.name,
//       rank: t.specialization || "Faculty Member",
//       credentials: t.expertise || [],
//       philosophy: t.bio || "Dedicated to preserving the Divine Word.",
//       availability: t.contractType,
//       isMock: false,
//       department: "General Studies", // You can add a department field to Schema later
//     }));
//   } catch (e) {
//     console.error("Teacher fetch failed, using mock catalog.");
//   }

//   return (
//     <main className="pt-40 pb-20 bg-background relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/5 blur-[120px] -z-10 rounded-full" />

//       <div className="container mx-auto px-6">
//         <div className="max-w-4xl mb-24">
//           <Reveal>
//             <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-surface border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl mb-8">
//               <Verified className="w-5 h-5 animate-pulse" /> Scholarly Council
//               Authenticated
//             </div>
//             <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85] mb-10">
//               The Noble <br />{" "}
//               <span className="text-primary-700 italic">Faculty.</span>
//             </h1>
//             <p className="text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-8 max-w-2xl">
//               Each educator is a verified carrier of the{" "}
//               <span className="text-foreground font-bold">Divine Sanad</span>,
//               ensuring the preservation of the Quran's authentic recitation.
//             </p>
//           </Reveal>
//         </div>

//         {/* This handles the merging and filtering logic */}
//         <FacultyListClient dbTeachers={dbTeachers} />
//       </div>
//     </main>
//   );
// }







import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/shared/section-animation";
import { Verified, Users, ArrowLeft, ArrowRight, Search, X, Sparkles } from "lucide-react";
import { FacultyListClient } from "@/components/public/teachers/faculty-list-client";
import { Suspense } from "react";
import type { Metadata } from "next";
import { FacultyListSkeleton } from "@/components/skeletons/faculty-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Prisma } from "@/app/generated/prisma/client";

// Generate static metadata for faculty listing page
export const metadata: Metadata = {
  title: "Our Noble Faculty | Ijazah-Certified Quran Scholars",
  description:
    "Meet our distinguished faculty of Ijazah-certified scholars with unbroken chains of transmission to Prophet Muhammad (ﷺ). Learn from authentic carriers of the Divine Sanad.",
  keywords: [
    "Quran teachers",
    "Quran scholars",
    "Quran professors",
    "Ijazah scholars",
    "Quran instructors",
    "Tajweed experts",
    "Hifz experts",
    "Tahfiz teachers",
    "Sanad holders",
    "Tajweed teachers",
    "Hifz instructors",
    "Islamic scholars",
    "Quranic education",
    "Online Quran classes",
    "Certified Quran teachers",
    "Authentic Quran teachers",

  ],
  openGraph: {
    title: "Al-Maysaroh Faculty | Ijazah-Certified Scholars",
    description:
      "Learn from verified carriers of Divine Sanad. Each scholar has an unbroken chain to Prophet Muhammad (ﷺ).",
    url: "https://almaysaroh.com/teachers",
  },
  alternates: {
    canonical: "https://almaysaroh.com/teachers",
  },


};

export const revalidate = 3600;

// Specializations from existing Teacher model
const SPECIALIZATIONS = [
  { id: "all", name: "All Scholars", searchTerm: null },
  { id: "hifz", name: "Hifz & Memorization", searchTerm: "Hifz" },
  { id: "tajweed", name: "Tajweed & Recitation", searchTerm: "Tajweed" },
  { id: "arabic", name: "Classical Arabic", searchTerm: "Arabic" },
  { id: "tafsir", name: "Tafsir Studies", searchTerm: "Tafsir" },
  { id: "qiraat", name: "Qira'at", searchTerm: "Qira'at" },
];

interface PageProps {
  searchParams?: {
    specialization?: string;
    page?: string;
    search?: string;
  };
}

interface TeacherDisplayData {
  id: string;
  name: string;
  image: string | null;
  rank: string;
  credentials: string[];
  philosophy: string;
  availability: string;
  isMock: boolean;
  yearsOfExperience: number;
  teacherId: string;
}

export default async function FacultyPage({ searchParams }: PageProps) {
  const page = Number(searchParams?.page) || 1;
  const activeSpecialization = searchParams?.specialization || "all";
  const searchQuery = searchParams?.search || "";
  const TEACHERS_PER_PAGE = 12;

  let dbTeachers: TeacherDisplayData[] = [];
  let totalCount = 0;

  try {
    // Build where clause - simpler approach
    const whereClause: Prisma.TeacherWhereInput = { 
      isAvailable: true 
    };
    
    // Filter by specialization (case-insensitive)
    if (activeSpecialization !== "all") {
      const spec = SPECIALIZATIONS.find(s => s.id === activeSpecialization);
      if (spec && spec.searchTerm) {
        whereClause.specialization = {
          contains: spec.searchTerm,
          mode: "insensitive"
        };
      }
    }
    
    // Search by name or specialization
    if (searchQuery && searchQuery.trim() !== "") {
      whereClause.OR = [
        {
          user: {
            name: {
              contains: searchQuery,
              mode: "insensitive"
            }
          }
        },
        {
          specialization: {
            contains: searchQuery,
            mode: "insensitive"
          }
        }
      ];
      // Note: expertise field might need a different approach if it's a JSON array
    }

    const [fetched, count] = await Promise.all([
      prisma.teacher.findMany({
        include: { 
          user: {
            select: {
              name: true,
              image: true,
              email: true,
            }
          }
        },
        where: whereClause,
        skip: (page - 1) * TEACHERS_PER_PAGE,
        take: TEACHERS_PER_PAGE,
        orderBy: { createdAt: "desc" },
      }),
      prisma.teacher.count({ where: whereClause }),
    ]);

    dbTeachers = fetched.map((t) => ({
      id: t.id,
      name: t.user.name,
      image: t.user.image,
      rank: t.specialization || "Faculty Member",
      credentials: t.expertise || [],
      philosophy: t.bio || "Dedicated to preserving the Divine Word.",
      availability: t.contractType,
      isMock: false,
      yearsOfExperience: t.experienceYears || 0,
      teacherId: t.teacherId,
    }));

    totalCount = count;
  } catch (e) {
    console.error("Teacher fetch failed, using mock catalog:", e);
    dbTeachers = getMockTeachers();
    // Filter mock data based on search and specialization
    let filtered = [...dbTeachers];
    
    if (activeSpecialization !== "all") {
      const spec = SPECIALIZATIONS.find(s => s.id === activeSpecialization);
      if (spec && spec.searchTerm) {
        filtered = filtered.filter(t => 
          t.rank?.toLowerCase().includes(spec.searchTerm?.toLowerCase() || "")
        );
      }
    }
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.rank?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    dbTeachers = filtered;
    totalCount = filtered.length;
  }

  const totalPages = Math.ceil(totalCount / TEACHERS_PER_PAGE);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const startItem = (page - 1) * TEACHERS_PER_PAGE + 1;
  const endItem = Math.min(page * TEACHERS_PER_PAGE, totalCount);
  
  const activeSpecName = activeSpecialization === "all" 
    ? "All Scholars" 
    : SPECIALIZATIONS.find(s => s.id === activeSpecialization)?.name || "Scholars";

  // Build pagination URLs
  const buildUrl = (newPage: number, newSpec?: string, newSearch?: string) => {
    const params = new URLSearchParams();
    if (newPage && newPage > 1) params.set("page", newPage.toString());
    if (newSpec && newSpec !== "all") params.set("specialization", newSpec);
    if (newSearch) params.set("search", newSearch);
    const queryString = params.toString();
    return `/teachers${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* ==================== HERO SECTION ==================== */}
        <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl glass-surface border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-xl mb-6 sm:mb-8">
              <Verified className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" /> 
              Scholarly Council Authenticated
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-10">
              The Noble <br />{" "}
              <span className="text-primary-700 italic">Faculty.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 md:pl-8 max-w-2xl">
              Each educator is a verified carrier of the{" "}
              <span className="text-foreground font-bold">Divine Sanad</span>{`,
              ensuring the preservation of the Quran's authentic recitation.`}
            </p>
            
            {/* Teacher Count */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-700" />
                {totalCount + 4} verified scholars
              </p>
              <div className="w-px h-4 bg-border hidden sm:block" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? `Search: "${searchQuery}" • ` : ""}
                <span className="font-black text-primary-700">{activeSpecName}</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* ==================== SEARCH & FILTER SECTION ==================== */}
        <div className="mb-8 sm:mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <form action="/teachers" method="GET">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search by name or specialization..."
                className="w-full pl-10 pr-12 py-3 rounded-full bg-background border border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
              {searchQuery && (
                <Link
                  href={buildUrl(1, activeSpecialization, "")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-primary-700 transition-colors" />
                </Link>
              )}
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-primary-700" />
              </button>
            </form>
          </div>

          {/* Specialization Filters */}
          {/* <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-muted-foreground mr-2 sticky left-0 bg-background pr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Specialization:</span>
              </div>
              {SPECIALIZATIONS.map((spec) => (
                <Link
                  key={spec.id}
                  href={buildUrl(1, spec.id, searchQuery)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap",
                    activeSpecialization === spec.id
                      ? "bg-primary-700 text-white shadow-md"
                      : "bg-muted/30 hover:bg-primary-700/10 border border-border"
                  )}
                >
                  {spec.name}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Active Filters Display */}
          {(activeSpecialization !== "all" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {activeSpecialization !== "all" && (
                <Link
                  href={buildUrl(1, "all", searchQuery)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black"
                >
                  {SPECIALIZATIONS.find(s => s.id === activeSpecialization)?.name}
                  <X className="w-3 h-3" />
                </Link>
              )}
              {searchQuery && (
                <Link
                  href={buildUrl(1, activeSpecialization, "")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black"
                >
                  Search: {`"${searchQuery}"`}
                  <X className="w-3 h-3" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* ==================== FACULTY GRID ==================== */}
        <Suspense fallback={<FacultyListSkeleton />}>
          <FacultyListClient
            dbTeachers={dbTeachers}
            totalCount={totalCount}
          />
        </Suspense>

        {/* ==================== EMPTY STATE ==================== */}
        {dbTeachers.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-black mb-2">No scholars found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any scholars matching "${searchQuery}" in ${activeSpecName}. Try a different search term or clear filters.`
                : "We couldn't find any scholars in this specialization. Please check back later."}
            </p>
            <Link href="/faculty">
              <Button variant="outline" className="rounded-full">
                Clear All Filters
              </Button>
            </Link>
          </div>
        )}

        {/* ==================== PAGINATION ==================== */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground order-2 sm:order-1">
              Showing {startItem} - {endItem} of {totalCount} scholars
            </p>
            
            <div className="flex items-center gap-3 order-1 sm:order-2">
              {hasPrevPage && (
                <Link href={buildUrl(page - 1, activeSpecialization, searchQuery)}>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                </Link>
              )}
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <Link
                      key={pageNum}
                      href={buildUrl(pageNum, activeSpecialization, searchQuery)}
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all",
                        pageNum === page
                          ? "bg-primary-700 text-white shadow-md"
                          : "hover:bg-primary-700/10"
                      )}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
              
              {hasNextPage && (
                <Link href={buildUrl(page + 1, activeSpecialization, searchQuery)}>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ==================== CALL TO ACTION ==================== */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-black uppercase tracking-wider text-accent">Limited Spots Available</span>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground">
              Ready to begin your journey with our scholars?
            </p>
            <Link href="/admissions">
              <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg shadow-xl group">
                <span className="flex items-center gap-2">
                  SCHEDULE FREE ASSESSMENT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              Not sure? <Link href="/contact" className="text-primary-700 font-black hover:underline">Speak with our admissions team</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Mock teachers fallback data
function getMockTeachers(): TeacherDisplayData[] {
  return [
    {
      id: "mock-1",
    name: "Ustadh Shu'ayb Al-Hifzi",
      image: null,
      rank: "Hifz Specialist",
      credentials: ["Ijazah in Hifz", "7+ Years Experience"],
      philosophy: "Preserving the chain of transmission for future generations.",
      availability: "FULL_TIME",
      isMock: true,
      yearsOfExperience: 7,
      teacherId: "MOCK-001",
    },
  //   {
  //     id: "mock-2",
  //     name: "Ustadha Fatima Al-Misriyyah",
  //     image: null,
  //     rank: "Tajweed Specialist",
  //     credentials: ["Ijazah in Tajweed", "Child Psychology Certification", "10+ Years Experience"],
  //     philosophy: "Making Tajweed accessible and enjoyable for all ages.",
  //     availability: "PART_TIME",
  //     isMock: true,
  //     yearsOfExperience: 10,
  //     teacherId: "MOCK-002",
  //   },
  //   {
  //     id: "mock-3",
  //     name: "Shaykh Abdullah Al-Madani",
  //     image: null,
  //     rank: "Arabic Language Scholar",
  //     credentials: ["PhD in Classical Arabic", "Ijazah in Arabic Literature", "20+ Years Experience"],
  //     philosophy: "The Quran is best understood in its original language.",
  //     availability: "FULL_TIME",
  //     isMock: true,
  //     yearsOfExperience: 20,
  //     teacherId: "MOCK-003",
  //   },
  //   {
  //     id: "mock-4",
  //     name: "Ustadh Yusuf Al-Qurtubi",
  //     image: null,
  //     rank: "Tafsir Scholar",
  //     credentials: ["Ijazah in Tafsir", "Master's in Islamic Studies", "12+ Years Experience"],
  //     philosophy: "Understanding context brings the Quran to life.",
  //     availability: "FULL_TIME",
  //     isMock: true,
  //     yearsOfExperience: 12,
  //     teacherId: "MOCK-004",
  //   },
  ];
}

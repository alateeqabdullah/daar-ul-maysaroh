// // import { prisma } from "@/lib/prisma";
// // import { Reveal } from "@/components/shared/section-animation";
// // import { Verified, GraduationCap } from "lucide-react";
// // import { FacultyListClient } from "@/components/public/teachers/faculty-list-client";

// // export default async function FacultyPage() {
// //   let dbTeachers = [];

// //   try {
// //     const fetched = await prisma.teacher.findMany({
// //       include: { user: true },
// //       where: { isAvailable: true },
// //     });

// //     // Clean data for React 19 Serialization
// //     dbTeachers = fetched.map((t) => ({
// //       id: t.id,
// //       name: t.user.name,
// //       rank: t.specialization || "Faculty Member",
// //       credentials: t.expertise || [],
// //       philosophy: t.bio || "Dedicated to preserving the Divine Word.",
// //       availability: t.contractType,
// //       isMock: false,
// //       department: "General Studies", // You can add a department field to Schema later
// //     }));
// //   } catch (e) {
// //     console.error("Teacher fetch failed, using mock catalog.");
// //   }

// //   return (
// //     <main className="pt-40 pb-20 bg-background relative overflow-hidden">
// //       {/* Background Decor */}
// //       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/5 blur-[120px] -z-10 rounded-full" />

// //       <div className="container mx-auto px-6">
// //         <div className="max-w-4xl mb-24">
// //           <Reveal>
// //             <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-surface border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl mb-8">
// //               <Verified className="w-5 h-5 animate-pulse" /> Scholarly Council
// //               Authenticated
// //             </div>
// //             <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85] mb-10">
// //               The Noble <br />{" "}
// //               <span className="text-primary-700 italic">Faculty.</span>
// //             </h1>
// //             <p className="text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-8 max-w-2xl">
// //               Each educator is a verified carrier of the{" "}
// //               <span className="text-foreground font-bold">Divine Sanad</span>,
// //               ensuring the preservation of the Quran's authentic recitation.
// //             </p>
// //           </Reveal>
// //         </div>

// //         {/* This handles the merging and filtering logic */}
// //         <FacultyListClient dbTeachers={dbTeachers} />
// //       </div>
// //     </main>
// //   );
// // }







// import { prisma } from "@/lib/prisma";
// import { Reveal } from "@/components/shared/section-animation";
// import { Verified, Users, ArrowLeft, ArrowRight, Search, X, Sparkles } from "lucide-react";
// import { FacultyListClient } from "@/components/public/teachers/faculty-list-client";
// import { Suspense } from "react";
// import type { Metadata } from "next";
// import { FacultyListSkeleton } from "@/components/skeletons/faculty-skeleton";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { Prisma } from "@/app/generated/prisma/client";

// // Generate static metadata for faculty listing page
// export const metadata: Metadata = {
//   title: "Our Noble Faculty | Ijazah-Certified Quran Scholars",
//   description:
//     "Meet our distinguished faculty of Ijazah-certified scholars with unbroken chains of transmission to Prophet Muhammad (ﷺ). Learn from authentic carriers of the Divine Sanad.",
//   keywords: [
//     "Quran teachers",
//     "Quran scholars",
//     "Quran professors",
//     "Ijazah scholars",
//     "Quran instructors",
//     "Tajweed experts",
//     "Hifz experts",
//     "Tahfiz teachers",
//     "Sanad holders",
//     "Tajweed teachers",
//     "Hifz instructors",
//     "Islamic scholars",
//     "Quranic education",
//     "Online Quran classes",
//     "Certified Quran teachers",
//     "Authentic Quran teachers",

//   ],
//   openGraph: {
//     title: "Al-Maysaroh Faculty | Ijazah-Certified Scholars",
//     description:
//       "Learn from verified carriers of Divine Sanad. Each scholar has an unbroken chain to Prophet Muhammad (ﷺ).",
//     url: "https://almaysaroh.com/teachers",
//   },
//   alternates: {
//     canonical: "https://almaysaroh.com/teachers",
//   },


// };

// export const revalidate = 3600;

// // Specializations from existing Teacher model
// const SPECIALIZATIONS = [
//   { id: "all", name: "All Scholars", searchTerm: null },
//   { id: "hifz", name: "Hifz & Memorization", searchTerm: "Hifz" },
//   { id: "tajweed", name: "Tajweed & Recitation", searchTerm: "Tajweed" },
//   { id: "arabic", name: "Classical Arabic", searchTerm: "Arabic" },
//   { id: "tafsir", name: "Tafsir Studies", searchTerm: "Tafsir" },
//   { id: "qiraat", name: "Qira'at", searchTerm: "Qira'at" },
// ];

// interface PageProps {
//   searchParams?: {
//     specialization?: string;
//     page?: string;
//     search?: string;
//   };
// }

// interface TeacherDisplayData {
//   id: string;
//   name: string;
//   image: string | null;
//   rank: string;
//   credentials: string[];
//   philosophy: string;
//   availability: string;
//   isMock: boolean;
//   yearsOfExperience: number;
//   teacherId: string;
// }

// export default async function FacultyPage({ searchParams }: PageProps) {
//   const page = Number(searchParams?.page) || 1;
//   const activeSpecialization = searchParams?.specialization || "all";
//   const searchQuery = searchParams?.search || "";
//   const TEACHERS_PER_PAGE = 12;

//   let dbTeachers: TeacherDisplayData[] = [];
//   let totalCount = 0;

//   try {
//     // Build where clause - simpler approach
//     const whereClause: Prisma.TeacherWhereInput = { 
//       isAvailable: true 
//     };
    
//     // Filter by specialization (case-insensitive)
//     if (activeSpecialization !== "all") {
//       const spec = SPECIALIZATIONS.find(s => s.id === activeSpecialization);
//       if (spec && spec.searchTerm) {
//         whereClause.specialization = {
//           contains: spec.searchTerm,
//           mode: "insensitive"
//         };
//       }
//     }
    
//     // Search by name or specialization
//     if (searchQuery && searchQuery.trim() !== "") {
//       whereClause.OR = [
//         {
//           user: {
//             name: {
//               contains: searchQuery,
//               mode: "insensitive"
//             }
//           }
//         },
//         {
//           specialization: {
//             contains: searchQuery,
//             mode: "insensitive"
//           }
//         }
//       ];
//       // Note: expertise field might need a different approach if it's a JSON array
//     }

//     const [fetched, count] = await Promise.all([
//       prisma.teacher.findMany({
//         include: { 
//           user: {
//             select: {
//               name: true,
//               image: true,
//               email: true,
//             }
//           }
//         },
//         where: whereClause,
//         skip: (page - 1) * TEACHERS_PER_PAGE,
//         take: TEACHERS_PER_PAGE,
//         orderBy: { createdAt: "desc" },
//       }),
//       prisma.teacher.count({ where: whereClause }),
//     ]);

//     dbTeachers = fetched.map((t) => ({
//       id: t.id,
//       name: t.user.name,
//       image: t.user.image,
//       rank: t.specialization || "Faculty Member",
//       credentials: t.expertise || [],
//       philosophy: t.bio || "Dedicated to preserving the Divine Word.",
//       availability: t.contractType,
//       isMock: false,
//       yearsOfExperience: t.experienceYears || 0,
//       teacherId: t.teacherId,
//     }));

//     totalCount = count;
//   } catch (e) {
//     console.error("Teacher fetch failed, using mock catalog:", e);
//     dbTeachers = getMockTeachers();
//     // Filter mock data based on search and specialization
//     let filtered = [...dbTeachers];
    
//     if (activeSpecialization !== "all") {
//       const spec = SPECIALIZATIONS.find(s => s.id === activeSpecialization);
//       if (spec && spec.searchTerm) {
//         filtered = filtered.filter(t => 
//           t.rank?.toLowerCase().includes(spec.searchTerm?.toLowerCase() || "")
//         );
//       }
//     }
    
//     if (searchQuery) {
//       filtered = filtered.filter(t => 
//         t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         t.rank?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     dbTeachers = filtered;
//     totalCount = filtered.length;
//   }

//   const totalPages = Math.ceil(totalCount / TEACHERS_PER_PAGE);
//   const hasPrevPage = page > 1;
//   const hasNextPage = page < totalPages;
//   const startItem = (page - 1) * TEACHERS_PER_PAGE + 1;
//   const endItem = Math.min(page * TEACHERS_PER_PAGE, totalCount);
  
//   const activeSpecName = activeSpecialization === "all" 
//     ? "All Scholars" 
//     : SPECIALIZATIONS.find(s => s.id === activeSpecialization)?.name || "Scholars";

//   // Build pagination URLs
//   const buildUrl = (newPage: number, newSpec?: string, newSearch?: string) => {
//     const params = new URLSearchParams();
//     if (newPage && newPage > 1) params.set("page", newPage.toString());
//     if (newSpec && newSpec !== "all") params.set("specialization", newSpec);
//     if (newSearch) params.set("search", newSearch);
//     const queryString = params.toString();
//     return `/teachers${queryString ? `?${queryString}` : ""}`;
//   };

//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
//       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
      
//       {/* Floating particles */}
//       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
//       <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

//       <div className="container mx-auto px-4 sm:px-6">
//         {/* ==================== HERO SECTION ==================== */}
//         <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20 lg:mb-24">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl glass-surface border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-xl mb-6 sm:mb-8">
//               <Verified className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" /> 
//               Scholarly Council Authenticated
//             </div>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-10">
//               The Noble <br />{" "}
//               <span className="text-primary-700 italic">Faculty.</span>
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 md:pl-8 max-w-2xl">
//               Each educator is a verified carrier of the{" "}
//               <span className="text-foreground font-bold">Divine Sanad</span>{`,
//               ensuring the preservation of the Quran's authentic recitation.`}
//             </p>
            
//             {/* Teacher Count */}
//             <div className="flex flex-wrap items-center gap-4 mt-6">
//               <p className="text-sm text-muted-foreground flex items-center gap-2">
//                 <Users className="w-4 h-4 text-primary-700" />
//                 {totalCount + 4} verified scholars
//               </p>
//               <div className="w-px h-4 bg-border hidden sm:block" />
//               <p className="text-sm text-muted-foreground">
//                 {searchQuery ? `Search: "${searchQuery}" • ` : ""}
//                 <span className="font-black text-primary-700">{activeSpecName}</span>
//               </p>
//             </div>
//           </Reveal>
//         </div>

//         {/* ==================== SEARCH & FILTER SECTION ==================== */}
//         <div className="mb-8 sm:mb-12 space-y-4">
//           {/* Search Bar */}
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <form action="/teachers" method="GET">
//               <input
//                 type="text"
//                 name="search"
//                 defaultValue={searchQuery}
//                 placeholder="Search by name or specialization..."
//                 className="w-full pl-10 pr-12 py-3 rounded-full bg-background border border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
//               />
//               {searchQuery && (
//                 <Link
//                   href={buildUrl(1, activeSpecialization, "")}
//                   className="absolute right-4 top-1/2 -translate-y-1/2"
//                 >
//                   <X className="w-4 h-4 text-muted-foreground hover:text-primary-700 transition-colors" />
//                 </Link>
//               )}
//               <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
//                 <Search className="w-4 h-4 text-primary-700" />
//               </button>
//             </form>
//           </div>

//           {/* Specialization Filters */}
//           {/* <div className="overflow-x-auto pb-2 scrollbar-hide">
//             <div className="flex items-center gap-2 sm:gap-3 min-w-max">
//               <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-muted-foreground mr-2 sticky left-0 bg-background pr-2">
//                 <Filter className="w-3.5 h-3.5" />
//                 <span>Specialization:</span>
//               </div>
//               {SPECIALIZATIONS.map((spec) => (
//                 <Link
//                   key={spec.id}
//                   href={buildUrl(1, spec.id, searchQuery)}
//                   className={cn(
//                     "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap",
//                     activeSpecialization === spec.id
//                       ? "bg-primary-700 text-white shadow-md"
//                       : "bg-muted/30 hover:bg-primary-700/10 border border-border"
//                   )}
//                 >
//                   {spec.name}
//                 </Link>
//               ))}
//             </div>
//           </div> */}

//           {/* Active Filters Display */}
//           {(activeSpecialization !== "all" || searchQuery) && (
//             <div className="flex flex-wrap items-center gap-2 pt-2">
//               <span className="text-xs text-muted-foreground">Active filters:</span>
//               {activeSpecialization !== "all" && (
//                 <Link
//                   href={buildUrl(1, "all", searchQuery)}
//                   className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black"
//                 >
//                   {SPECIALIZATIONS.find(s => s.id === activeSpecialization)?.name}
//                   <X className="w-3 h-3" />
//                 </Link>
//               )}
//               {searchQuery && (
//                 <Link
//                   href={buildUrl(1, activeSpecialization, "")}
//                   className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black"
//                 >
//                   Search: {`"${searchQuery}"`}
//                   <X className="w-3 h-3" />
//                 </Link>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ==================== FACULTY GRID ==================== */}
//         <Suspense fallback={<FacultyListSkeleton />}>
//           <FacultyListClient
//             dbTeachers={dbTeachers}
//             totalCount={totalCount}
//           />
//         </Suspense>

//         {/* ==================== EMPTY STATE ==================== */}
//         {dbTeachers.length === 0 && (
//           <div className="text-center py-16 sm:py-20">
//             <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
//               <Users className="w-10 h-10 text-muted-foreground/50" />
//             </div>
//             <h3 className="text-xl font-black mb-2">No scholars found</h3>
//             <p className="text-muted-foreground mb-6 max-w-md mx-auto">
//               {searchQuery 
//                 ? `We couldn't find any scholars matching "${searchQuery}" in ${activeSpecName}. Try a different search term or clear filters.`
//                 : "We couldn't find any scholars in this specialization. Please check back later."}
//             </p>
//             <Link href="/faculty">
//               <Button variant="outline" className="rounded-full">
//                 Clear All Filters
//               </Button>
//             </Link>
//           </div>
//         )}

//         {/* ==================== PAGINATION ==================== */}
//         {totalPages > 1 && (
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50">
//             <p className="text-sm text-muted-foreground order-2 sm:order-1">
//               Showing {startItem} - {endItem} of {totalCount} scholars
//             </p>
            
//             <div className="flex items-center gap-3 order-1 sm:order-2">
//               {hasPrevPage && (
//                 <Link href={buildUrl(page - 1, activeSpecialization, searchQuery)}>
//                   <Button variant="outline" size="sm" className="rounded-full gap-2">
//                     <ArrowLeft className="w-4 h-4" />
//                     Previous
//                   </Button>
//                 </Link>
//               )}
              
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum: number;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (page <= 3) {
//                     pageNum = i + 1;
//                   } else if (page >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = page - 2 + i;
//                   }
                  
//                   return (
//                     <Link
//                       key={pageNum}
//                       href={buildUrl(pageNum, activeSpecialization, searchQuery)}
//                       className={cn(
//                         "w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all",
//                         pageNum === page
//                           ? "bg-primary-700 text-white shadow-md"
//                           : "hover:bg-primary-700/10"
//                       )}
//                     >
//                       {pageNum}
//                     </Link>
//                   );
//                 })}
//               </div>
              
//               {hasNextPage && (
//                 <Link href={buildUrl(page + 1, activeSpecialization, searchQuery)}>
//                   <Button variant="outline" size="sm" className="rounded-full gap-2">
//                     Next
//                     <ArrowRight className="w-4 h-4" />
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ==================== CALL TO ACTION ==================== */}
//         <div className="mt-16 sm:mt-20 md:mt-24 text-center">
//           <div className="inline-flex flex-col items-center gap-4">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
//               <Sparkles className="w-4 h-4 text-accent" />
//               <span className="text-xs font-black uppercase tracking-wider text-accent">Limited Spots Available</span>
//             </div>
//             <p className="text-base sm:text-lg text-muted-foreground">
//               Ready to begin your journey with our scholars?
//             </p>
//             <Link href="/admissions">
//               <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg shadow-xl group">
//                 <span className="flex items-center gap-2">
//                   SCHEDULE FREE ASSESSMENT
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </Button>
//             </Link>
//             <p className="text-xs text-muted-foreground">
//               Not sure? <Link href="/contact" className="text-primary-700 font-black hover:underline">Speak with our admissions team</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// // Mock teachers fallback data
// function getMockTeachers(): TeacherDisplayData[] {
//   return [
//     {
//       id: "mock-1",
//     name: "Ustadh Shu'ayb Al-Hifzi",
//       image: null,
//       rank: "Hifz Specialist",
//       credentials: ["Ijazah in Hifz", "7+ Years Experience"],
//       philosophy: "Preserving the chain of transmission for future generations.",
//       availability: "FULL_TIME",
//       isMock: true,
//       yearsOfExperience: 7,
//       teacherId: "MOCK-001",
//     },
 





// app/teachers/page.tsx
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
  Globe,
  Star,
  Sparkles,
  Search,
  X,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";





// Enhanced Teacher Data
const TEACHERS = [
  {
    id: "sheikh-abubakar-abdurrozzaaq",
    name: "Shaykh Abubakar Abdurrozzaaq Al-Maysari",
    rank: "Dean of Academic Affairs & Chief Scholar",
    credentials: "Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
    slug: "abubakar-abdurrozzaaq-al-maysari",
    fullBio: "With over 13 years of teaching experience, Shaykh Abubakar holds ijazah in all ten Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 100 certified Qurra worldwide.",
    students: "100+ certified Qurra",
    experience: "13+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
    featured: true,
    specialties: ["Qira'at", "Hifz", "Sanad"],
    rating: 5,
    languages: ["Arabic", "English", "Hausa", "Yoruba"],
    availability: "Limited Slots",
  },
  {
    id: "ustadha-fatimah-zahrah-alagbada",
    name: "Ustadha Fatimah Zahrah Alagbada",
    rank: "Head of Female Hifz Department",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
    slug: "fatimah-zahrah-alagbada",
    fullBio: "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij.",
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
    fullBio: "Shaykh Umar is a master of Tajweed sciences with special focus on makharij and sifaat. He has authored several works on Quranic phonetics.",
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
    philosophy: "Understanding the Quran transforms your relationship with Allah.",
    slug: "maryam-bint-yusuf",
    fullBio: "Ustadha Maryam combines classical Arabic instruction with deep Quranic understanding. Her students develop not just language skills but a profound connection to the divine message.",
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

const CATEGORIES = ["All", "Qira'at", "Hifz", "Tajweed", "Arabic", "Tafsir", "Women"];

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

export default function TeachersPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTeachers = TEACHERS.filter((teacher) => {
    const matchesSearch = searchQuery === "" ||
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || teacher.specialties.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredTeachers = TEACHERS.filter(t => t.featured);
  const regularTeachers = filteredTeachers.filter(t => !t.featured);

  return (
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
  );
}
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import {
//   GraduationCap,
//   Verified,
//   ShieldCheck,
//   ArrowRight,
//   ChevronRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // Function to create URL-friendly slugs
// const createSlug = (name: string) => {
//   return name
//     .toLowerCase()
//     .replace(/sheikh|ustadha|dr\.?|prof\.?/gi, "")
//     .replace(/[^\w\s-]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// };

// const PREVIEW_TEACHERS = [
//   {
//     id: "sheikh-abubakar-abdurrozzaaq",
//     name: "Sheikh Abubakar Abdurrozzaaq Al-Maysari",
//     rank: "Dean of Faculty",
//     credentials: "Ijazah in 10 Qira'at",
//     philosophy: "Preserving the trust of the Divine Word.",
//     slug: "abubakar-abdurrozzaaq-al-maysari",
//     fullBio:
//       "With over 25 years of teaching experience, Sheikh Abubakar holds ijazah in all ten Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 200 certified Qurra worldwide.",
//     students: "100+ certified Qurra",
//     experience: "15+ years",
//     sanad: "Active Sanad to Prophet (ﷺ)",
//   },
//   {
//     id: "ustadha-fatimah-zahrah-alagbada",
//     name: "Ustadha Fatimah Zahrah Alagbada",
//     rank: "Head of Female Hifz",
//     credentials: "Verified Sanad in Hafs 'an 'Asim",
//     philosophy: "Nurturing hearts through the Quranic Sunnah.",
//     slug: "fatimah-zahrah-alagbada",
//     fullBio:
//       "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij.",
//     students: "50+ female graduates",
//     experience: "10+ years",
//     sanad: "Active Sanad to Prophet (ﷺ)",
//   },
// ];

// export function Teachers() {
//   return (
//     <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
//           <div className="max-w-2xl space-y-4 sm:space-y-6">
//             <Reveal>
//               <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
//                 <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Unbroken
//                 Scholarly Lineage
//               </div>
//               <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-tight">
//                 Carriers of <br />
//                 <span className="text-primary-700 italic">The Sanad.</span>
//               </h2>
//             </Reveal>
//           </div>
//           <Reveal delay={0.2}>
//             <Link href="/teachers">
//               <Button
//                 variant="outline"
//                 className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl border-2 font-black text-xs tracking-widest uppercase hover:bg-primary-700 hover:text-white transition-all min-h-11"
//               >
//                 View Full Faculty{" "}
//                 <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </Button>
//             </Link>
//           </Reveal>
//         </div>

//         {/* Teacher Cards - Clickable */}
//         <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
//           {PREVIEW_TEACHERS.map((teacher, index) => (
//             <Reveal key={teacher.id} delay={index * 0.1}>
//               {/* <Link
//                 href={`/teachers/${createSlug(teacher.name)}`}
//                 className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-3xl"
//               > */}
//                 <div className="institutional-card p-6 sm:p-8 md:p-10 lg:p-12 relative bg-card hover:border-primary-700/50 transition-all duration-700 cursor-pointer h-full">
//                   {/* Click Indicator - Subtle arrow that appears on hover */}
//                   <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
//                     <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
//                   </div>

//                   <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
//                     {/* Portrait Placeholder - will be replaced with actual images */}
//                     <div className="w-full lg:w-40 h-48 sm:h-52 lg:h-56 bg-linear-to-br from-primary-700/5 to-primary-900/10 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden relative border border-border group-hover:border-primary-700/30 transition-all">
//                       <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
//                         <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12" />
//                       </div>

//                       {/* Sanad Badge */}
//                       <div className="absolute bottom-3 left-3 bg-primary-700/90 text-white px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider">
//                         {teacher.sanad}
//                       </div>
//                     </div>

//                     <div className="flex-1 space-y-3 sm:space-y-4">
//                       <div>
//                         <h3 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-primary-700 transition-colors uppercase">
//                           {teacher.name}
//                         </h3>
//                         <p className="text-primary-700 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
//                           {teacher.rank}
//                         </p>
//                       </div>

//                       <p className="text-sm sm:text-base font-bold text-muted-foreground">
//                         {teacher.credentials}
//                       </p>

//                       <p className="text-xs sm:text-sm italic font-medium text-muted-foreground opacity-80 leading-relaxed">
//                        {` "${teacher.philosophy}"`}
//                       </p>

//                       <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
//                         <div className="flex items-center gap-2">
//                           <Verified className="w-4 h-4 text-accent" />
//                           <span className="text-[8px] sm:text-[8px] font-black uppercase tracking-widest text-accent">
//                             Ijazah Verified
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <GraduationCap className="w-3.5 h-3.5" />
//                           <span className="text-[8px] font-black uppercase tracking-widest">
//                             {teacher.students}
//                           </span>
//                         </div>
//                       </div>

//                       {/* View Profile Link - Appears on hover */}
//                       <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <span className="text-xs font-black text-primary-700 flex items-center gap-2">
//                           View Full Profile
//                           <ArrowRight className="w-3 h-3" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               {/* </Link> */}
//             </Reveal>
//           ))}
//         </div>

//         {/* Trust Message */}
//         <Reveal delay={0.3}>
//           <div className="mt-16 sm:mt-20 md:mt-24 text-center max-w-2xl mx-auto">
//             <p className="text-sm sm:text-base text-muted-foreground font-medium border-t border-border/50 pt-8">
//               Our Dean personally matches each student with the perfect teacher after their assessment
//               based on their learning style, goals, and spiritual journey.
//             </p>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Function to create URL-friendly slugs
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/sheikh|ustadha|dr\.?|prof\.?/gi, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const PREVIEW_TEACHERS = [
  {
    id: "sheikh-abubakar-abdurrozzaaq",
    name: "Sheikh Abubakar Abdurrozzaaq Al-Maysari",
    rank: "Dean of Faculty",
    credentials: "Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
    slug: "abubakar-abdurrozzaaq-al-maysari",
    fullBio:
      "With over 25 years of teaching experience, Sheikh Abubakar holds ijazah in all ten Qira'at with an unbroken chain reaching back to Prophet Muhammad (ﷺ). He has trained over 200 certified Qurra worldwide.",
    students: "100+ certified Qurra",
    experience: "15+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
  },
  {
    id: "ustadha-fatimah-zahrah-alagbada",
    name: "Ustadha Fatimah Zahrah Alagbada",
    rank: "Head of Female Hifz",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
    slug: "fatimah-zahrah-alagbada",
    fullBio:
      "Ustadha Fatimah specializes in female Hifz instruction with a focus on tajweed perfection and spiritual development. Her students consistently achieve mastery with proper makharij.",
    students: "50+ female graduates",
    experience: "10+ years",
    sanad: "Active Sanad to Prophet (ﷺ)",
  },
];

export function Teachers() {
  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Header - Mobile First */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4 xs:gap-6 sm:gap-8 mb-10 xs:mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-2xl space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
                <ShieldCheck className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                Unbroken Scholarly Lineage
              </div>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                Carriers of <br className="hidden xs:block" />
                <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  The Sanad.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link href="/teachers" className="w-full lg:w-auto">
              <Button
                variant="outline"
                className="w-full lg:w-auto h-11 xs:h-12 sm:h-12 md:h-14 px-5 xs:px-6 sm:px-6 md:px-8 rounded-xl border-2 border-purple-300 text-purple-600 font-black text-[10px] xs:text-xs tracking-widest uppercase hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
              >
                View Full Faculty{" "}
                <ArrowRight className="ml-1.5 w-3 h-3 xs:w-3.5 xs:h-3.5" />
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* Teacher Cards - Mobile First (Column on mobile, Row on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xs:gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {PREVIEW_TEACHERS.map((teacher, index) => (
            <Reveal key={teacher.id} delay={index * 0.1}>
              <Link
                href={`/teachers/${createSlug(teacher.name)}`}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl xs:rounded-2xl"
              >
                <div className="bg-card rounded-xl xs:rounded-2xl border border-border hover:border-purple-300 transition-all duration-500 p-5 xs:p-6 sm:p-6 md:p-7 lg:p-8 xl:p-10 relative cursor-pointer h-full shadow-sm hover:shadow-xl">
                  {/* Click Indicator - Mobile friendly position */}
                  <div className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-purple-600" />
                    </div>
                  </div>

                  {/* Sanad Badge - Responsive positioning */}
                  <div className="absolute top-3 left-3 xs:top-4 xs:left-4 sm:top-5 sm:left-5 md:top-6 md:left-6">
                    <div className="flex items-center gap-1 bg-purple-600/90 backdrop-blur-sm text-white px-1.5 py-0.5 xs:px-2 xs:py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[6px] xs:text-[7px] sm:text-[8px] font-black uppercase tracking-wider shadow-md">
                      <Scroll className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                      <span className="truncate max-w-20 xs:max-w-none">
                        {teacher.sanad}
                      </span>
                    </div>
                  </div>

                  {/* Content - Column on mobile, Row on desktop */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 xs:gap-5 sm:gap-6 lg:gap-5 xl:gap-8 items-start mt-8 xs:mt-10 sm:mt-12">
                    {/* Portrait - Full width on mobile, fixed on desktop */}
                    <div className="w-full sm:w-36 md:w-40 lg:w-full xl:w-44 h-40 xs:h-44 sm:h-44 md:h-48 lg:h-52 xl:h-56 bg-linear-to-br from-purple-100 to-amber-100 dark:from-purple-950/30 dark:to-amber-950/30 rounded-xl xs:rounded-2xl overflow-hidden relative border border-border group-hover:border-purple-300 transition-all shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                        <GraduationCap className="w-10 h-10 xs:w-12 xs:h-12 sm:w-12 sm:h-12 text-purple-600" />
                      </div>

                      {/* Teacher Initial */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl xs:text-5xl sm:text-5xl font-black text-purple-600/10">
                          {teacher.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Teacher Info */}
                    <div className="flex-1 space-y-2 xs:space-y-2.5 sm:space-y-3 lg:space-y-3 xl:space-y-4 w-full">
                      <div>
                        <h3 className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-black tracking-tight group-hover:text-purple-600 transition-colors uppercase leading-tight">
                          {teacher.name}
                        </h3>
                        <p className="text-purple-600 font-black text-[7px] xs:text-[8px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.15em] mt-0.5 xs:mt-1">
                          {teacher.rank}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 xs:gap-2">
                        <Crown className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
                        <p className="text-[10px] xs:text-xs sm:text-xs font-bold text-foreground leading-tight">
                          {teacher.credentials}
                        </p>
                      </div>

                      <p className="text-[10px] xs:text-xs sm:text-xs italic font-medium text-muted-foreground/80 leading-relaxed border-l-2 border-purple-300 pl-2 xs:pl-2.5 sm:pl-3">
                        {`"${teacher.philosophy}"`}
                      </p>

                      {/* Metadata - Wrap on mobile */}
                      <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 pt-1 xs:pt-1.5 sm:pt-2">
                        <div className="flex items-center gap-1">
                          <Verified className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-500" />
                          <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-amber-600 whitespace-nowrap">
                            Ijazah Verified
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-muted-foreground">
                          <GraduationCap className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                          <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-black uppercase tracking-wider whitespace-nowrap">
                            {teacher.students}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ShieldCheck className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                          <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-black uppercase tracking-wider whitespace-nowrap">
                            {teacher.experience}
                          </span>
                        </div>
                      </div>

                      {/* View Profile Link - Mobile friendly */}
                      <div className="pt-1 xs:pt-1.5 sm:pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black text-purple-600 flex items-center gap-1">
                          View Full Profile
                          <ArrowRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Trust Message - Mobile First */}
        <Reveal delay={0.3}>
          <div className="mt-10 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24 text-center max-w-3xl mx-auto">
            <div className="bg-linear-to-r from-purple-50 to-amber-50 dark:from-purple-950/20 dark:to-amber-950/20 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 border border-purple-100 dark:border-purple-800">
              <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed px-2 xs:px-3">
                Our Dean personally matches each student with the perfect
                teacher after their assessment based on their learning style,
                goals, and spiritual journey.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
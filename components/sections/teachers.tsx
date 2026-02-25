// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { GraduationCap, Verified, ShieldCheck, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const PREVIEW_TEACHERS = [
//   {
//     name: "Sheikh Abubakar Abdurrozzaaq Al-Maysari",
//     rank: "Dean of Faculty",
//     credentials: "Ijazah in 10 Qira'at",
//     philosophy: "Preserving the trust of the Divine Word.",
//   },
//   {
//     name: "Ustadha Fatimah Zahrah Alagbada",
//     rank: "Head of Female Hifz",
//     credentials: "Verified Sanad in Hafs 'an 'Asim",
//     philosophy: "Nurturing hearts through the Quranic Sunnah.",
//   },
// ];

// export function Teachers() {
//   return (
//     <section className="py-32 bg-background relative overflow-hidden">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-24">
//           <div className="max-w-2xl space-y-6">
//             <Reveal>
//               <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-[0.3em]">
//                 <ShieldCheck className="w-4 h-4" /> Unbroken Scholarly Lineage
//               </div>
//               <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
//                 Carriers of <br />
//                 <span className="text-primary-700 italic">The Sanad.</span>
//               </h2>
//             </Reveal>
//           </div>
//           <Reveal delay={0.2}>
//             <Link href="/teachers">
//               <Button
//                 variant="outline"
//                 className="h-16 px-10 rounded-2xl border-2 font-black text-xs tracking-widest uppercase hover:bg-primary-700 hover:text-white transition-all"
//               >
//                 View Full Faculty <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Link>
//           </Reveal>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12">
//           {PREVIEW_TEACHERS.map((t, i) => (
//             <Reveal key={t.name} delay={i * 0.1}>
//               <div className="institutional-card p-12 relative group bg-card hover:border-primary-700/50 transition-all duration-700">
//                 <div className="flex flex-col lg:flex-row gap-8 items-start">
//                   {/* Portrait Placeholder */}
//                   <div className="w-full p-8 lg:w-40 h-56 bg-muted/50 rounded-8xl overflow-hidden relative border border-border group-hover:border-primary-700/20">
//                     <div className="absolute inset-0 flex items-center justify-center opacity-10">
//                       <GraduationCap className="w-12 h-12" />
//                     </div>
//                   </div>

//                   <div className="flex-1 space-y-4">
//                     <div>
//                       <h3 className="text-2xl font-black tracking-tight group-hover:text-primary-700 transition-colors uppercase">
//                         {t.name}
//                       </h3>
//                       <p className="text-primary-700 font-black text-[9px] uppercase tracking-[0.2em] mt-1">
//                         {t.rank}
//                       </p>
//                     </div>
//                     <p className="text-sm font-bold text-muted-foreground">
//                       {t.credentials}
//                     </p>
//                     <p className="text-xs italic font-medium text-muted-foreground opacity-80 leading-relaxed">
//                      {` "${t.philosophy}"`}
//                     </p>
//                     <div className="pt-4 flex items-center gap-2">
//                       <Verified className="w-4 h-4 text-accent" />
//                       <span className="text-[8px] font-black uppercase tracking-widest text-accent">
//                         Ijazah Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
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
    students: "200+ certified Qurra",
    experience: "25+ years",
    sanad: "32 generations to Prophet (ﷺ)",
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
    students: "150+ female graduates",
    experience: "15+ years",
    sanad: "28 generations to Prophet (ﷺ)",
  },
];

export function Teachers() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Unbroken
                Scholarly Lineage
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-tight">
                Carriers of <br />
                <span className="text-primary-700 italic">The Sanad.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link href="/teachers">
              <Button
                variant="outline"
                className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl border-2 font-black text-xs tracking-widest uppercase hover:bg-primary-700 hover:text-white transition-all min-h-[44px]"
              >
                View Full Faculty{" "}
                <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* Teacher Cards - Clickable */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {PREVIEW_TEACHERS.map((teacher, index) => (
            <Reveal key={teacher.id} delay={index * 0.1}>
              <Link
                href={`/teachers/${createSlug(teacher.name)}`}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-3xl"
              >
                <div className="institutional-card p-6 sm:p-8 md:p-10 lg:p-12 relative bg-card hover:border-primary-700/50 transition-all duration-700 cursor-pointer h-full">
                  {/* Click Indicator - Subtle arrow that appears on hover */}
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                    {/* Portrait Placeholder - will be replaced with actual images */}
                    <div className="w-full lg:w-40 h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-primary-700/5 to-primary-900/10 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden relative border border-border group-hover:border-primary-700/30 transition-all">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                        <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12" />
                      </div>

                      {/* Sanad Badge */}
                      <div className="absolute bottom-3 left-3 bg-primary-700/90 text-white px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider">
                        {teacher.sanad}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-primary-700 transition-colors uppercase">
                          {teacher.name}
                        </h3>
                        <p className="text-primary-700 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
                          {teacher.rank}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-muted-foreground">
                        {teacher.credentials}
                      </p>

                      <p className="text-xs sm:text-sm italic font-medium text-muted-foreground opacity-80 leading-relaxed">
                        "{teacher.philosophy}"
                      </p>

                      <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <div className="flex items-center gap-2">
                          <Verified className="w-4 h-4 text-accent" />
                          <span className="text-[8px] sm:text-[8px] font-black uppercase tracking-widest text-accent">
                            Ijazah Verified
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-black uppercase tracking-widest">
                            {teacher.students}
                          </span>
                        </div>
                      </div>

                      {/* View Profile Link - Appears on hover */}
                      <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-black text-primary-700 flex items-center gap-2">
                          View Full Profile
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Trust Message */}
        <Reveal delay={0.3}>
          <div className="mt-16 sm:mt-20 md:mt-24 text-center max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-muted-foreground font-medium border-t border-border/50 pt-8">
              Our Dean personally matches each student with the perfect teacher
              based on their learning style, goals, and spiritual journey.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
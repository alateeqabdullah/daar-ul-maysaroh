// // "use client";

// // import { Reveal } from "@/components/shared/section-animation";
// // import {
// //   ShieldCheck,
// //   Clock,
// //   Users,
// //   Zap,
// //   Globe,
// //   ChevronRight,
// // } from "lucide-react";
// // import Link from "next/link";

// // const PILLARS = [
// //   {
// //     title: "Sanad Preservation",
// //     desc: "Connect your voice to a lineage of scholars reaching back 1,400 years to the Prophet (ﷺ).",
// //     icon: ShieldCheck,
// //     tag: "Traditional",
// //     href: "/methodology#sanad",
// //   },
// //   {
// //     title: "1-on-1 Academic Rigor",
// //     desc: "Personalized sessions with Ijazah-certified scholars. Undivided attention to your phonetics.",
// //     icon: Users,
// //     tag: "Exclusive",
// //     href: "/methodology#rigor",
// //   },
// //   {
// //     title: "Digital Sanctuary",
// //     desc: "A proprietary portal designed for scholarly focus. Track every surah, ayah, and mistake live.",
// //     icon: Globe,
// //     tag: "Modern",
// //     href: "/methodology#portal",
// //   },
// //   {
// //     title: "Adaptive Scheduling",
// //     desc: "Access scholars across multiple timezones. Structure your path around your professional life.",
// //     icon: Clock,
// //     tag: "Flexible",
// //     href: "/methodology#scheduling",
// //   },
// // ];

// // export function Features() {
// //   return (
// //     <section className="py-32 bg-background relative">
// //       <div className="container mx-auto px-6">
// //         {/* Section Header */}
// //         <div className="max-w-4xl mb-24 space-y-6">
// //           <Reveal>
// //             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
// //               <Zap className="w-4 h-4" /> The Al-Maysaroh Advantage
// //             </div>
// //             <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
// //               Pillars of <br />
// //               <span className="text-primary-700 italic">Excellence.</span>
// //             </h2>
// //             <p className="text-xl text-muted-foreground font-medium max-w-xl border-l-4 border-gold pl-6">
// //               Our methodology combines the spiritual depth of traditional
// //               madrasahs with the efficiency of modern technology.
// //             </p>
// //           </Reveal>
// //         </div>

// //         {/* Pillars Grid */}
// //         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {PILLARS.map((p, i) => (
// //             <Reveal key={p.title} delay={i * 0.1}>
// //               <div className="institutional-card p-10 h-full flex flex-col group hover:border-primary-700/50 transition-all duration-500 relative">
// //                 {/* Simple Hover Light Effect */}
// //                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary-500/5 to-transparent pointer-events-none" />

// //                 <div className="mb-8">
// //                   <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner relative">
// //                     {/* Icon Glow */}
// //                     <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-500/10 blur-sm" />
// //                     <p.icon className="w-7 h-7 text-primary-700 relative z-10" />
// //                   </div>
// //                 </div>

// //                 <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-2 opacity-50">
// //                   {p.tag}
// //                 </p>
// //                 <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
// //                   {p.title}
// //                 </h3>
// //                 <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8 grow">
// //                   {p.desc}
// //                 </p>

// //                 <div className="pt-6 border-t border-border/50">
// //                   <Link
// //                     href={p.href}
// //                     className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// //                   >
// //                     Learn More <ChevronRight className="w-3 h-3" />
// //                   </Link>
// //                 </div>
// //               </div>
// //             </Reveal>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import {
//   ShieldCheck,
//   Clock,
//   Users,
//   Zap,
//   Globe,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";

// const PILLARS = [
//   {
//     title: "Sanad Preservation",
//     desc: "Connect your voice to a lineage of scholars reaching back 1,400 years to the Prophet (ﷺ).",
//     icon: ShieldCheck,
//     tag: "Traditional",
//     href: "/methodology#sanad",
//   },
//   {
//     title: "1-on-1 Academic Rigor",
//     desc: "Personalized sessions with Ijazah-certified scholars. Undivided attention to your phonetics.",
//     icon: Users,
//     tag: "Exclusive",
//     href: "/methodology#rigor",
//   },
//   {
//     title: "Digital Sanctuary",
//     desc: "A proprietary portal designed for scholarly focus. Track every surah, ayah, and mistake live.",
//     icon: Globe,
//     tag: "Modern",
//     href: "/methodology#portal",
//   },
//   {
//     title: "Adaptive Scheduling",
//     desc: "Access scholars across multiple timezones. Structure your path around your professional life.",
//     icon: Clock,
//     tag: "Flexible",
//     href: "/methodology#scheduling",
//   },
// ];

// export function Features() {
//   return (
//     <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background relative">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Section Header */}
//         <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-4 sm:space-y-6">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
//               <Zap className="w-4 h-4" /> The Al-Maysaroh Advantage
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-tight">
//               Pillars of <br />
//               <span className="text-primary-700 italic">Excellence.</span>
//             </h2>
//             <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-xl border-l-4 border-gold pl-4 sm:pl-6">
//               Our methodology combines the spiritual depth of traditional
//               madrasahs with the efficiency of modern technology.
//             </p>
//           </Reveal>
//         </div>

//         {/* Pillars Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           {PILLARS.map((p, i) => (
//             <Reveal key={p.title} delay={i * 0.1}>
//               <div className="institutional-card p-6 sm:p-8 lg:p-10 h-full flex flex-col group hover:border-primary-700/50 transition-all duration-500 relative">
//                 {/* Simple Hover Light Effect */}
//                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary-500/5 to-transparent pointer-events-none" />

//                 <div className="mb-6 sm:mb-8">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner relative">
//                     {/* Icon Glow */}
//                     <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-500/10 blur-sm" />
//                     <p.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700 relative z-10" />
//                   </div>
//                 </div>

//                 <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-2 opacity-50">
//                   {p.tag}
//                 </p>
//                 <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 sm:mb-4">
//                   {p.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6 sm:mb-8 grow">
//                   {p.desc}
//                 </p>

//                 <div className="pt-4 sm:pt-6 border-t border-border/50">
//                   <Link
//                     href={p.href}
//                     className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   >
//                     Learn More <ChevronRight className="w-3 h-3" />
//                   </Link>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// components/sections/features.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldCheck,
  Clock,
  Users,
  Zap,
  Globe,
  ChevronRight,

} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Sanad Preservation",
    desc: "Connect your voice to a lineage of scholars reaching back 1,400 years to the Prophet (ﷺ).",
    icon: ShieldCheck,
    tag: "Traditional",
    href: "/methodology#sanad",
    color: "purple",
  },
  {
    title: "1-on-1 Academic Rigor",
    desc: "Personalized sessions with Ijazah-certified scholars. Undivided attention to your phonetics.",
    icon: Users,
    tag: "Exclusive",
    href: "/methodology#rigor",
    color: "amber",
  },
  {
    title: "Digital Sanctuary",
    desc: "A proprietary portal designed for scholarly focus. Track every surah, ayah, and mistake live.",
    icon: Globe,
    tag: "Modern",
    href: "/methodology#portal",
    color: "purple",
  },
  {
    title: "Adaptive Scheduling",
    desc: "Access scholars across multiple timezones. Structure your path around your professional life.",
    icon: Clock,
    tag: "Flexible",
    href: "/methodology#scheduling",
    color: "amber",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:border-purple-300",
      glow: "bg-purple-500/10",
      link: "text-purple-600",
      via: "via-purple-600",
    },
    amber: {
      text: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      hover: "hover:border-amber-300",
      glow: "bg-amber-500/10",
      link: "text-amber-600",
      via: "via-amber-500",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function Features() {
  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 xs:mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-3 xs:space-y-4 sm:space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              <Zap className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
              The Al-Maysaroh Advantage
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
              Pillars of <br />
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Excellence.
              </span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-xl border-l-4 border-amber-500 pl-3 xs:pl-4 sm:pl-6">
              Our methodology combines the spiritual depth of traditional
              madrasahs with the efficiency of modern technology.
            </p>
          </Reveal>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const colors = getColorStyles(pillar.color);

            return (
              <Reveal key={pillar.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group h-full"
                >
                  <div
                    className={cn(
                      "bg-card rounded-xl xs:rounded-2xl border border-border transition-all duration-500 p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 h-full flex flex-col relative shadow-sm hover:shadow-xl",
                      colors.hover
                    )}
                  >
                    {/* Hover Light Effect */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-xl xs:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none"
                      )}
                    />

                    {/* Icon */}
                    <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                      <div
                        className={cn(
                          "w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl xs:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner relative",
                          colors.bg
                        )}
                      >
                        {/* Icon Glow */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-xl xs:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm",
                            colors.glow
                          )}
                        />
                        <Icon
                          className={cn(
                            "w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10",
                            colors.text
                          )}
                        />
                      </div>
                    </div>

                    {/* Tag */}
                    <p
                      className={cn(
                        "text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1.5 xs:mb-2 opacity-70",
                        colors.text
                      )}
                    >
                      {pillar.tag}
                    </p>

                    {/* Title */}
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight mb-2 xs:mb-3 sm:mb-4">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs xs:text-sm text-muted-foreground font-medium leading-relaxed mb-5 xs:mb-6 sm:mb-7 md:mb-8 grow">
                      {pillar.desc}
                    </p>

                    {/* Learn More Link */}
                    <div className="pt-3 xs:pt-4 sm:pt-5 md:pt-6 border-t border-border/50">
                      <Link
                        href={pillar.href}
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:gap-2",
                          colors.link
                        )}
                      >
                        Learn More
                        <ChevronRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Decorative Bottom Line - FIXED */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500",
                        colors.via
                      )}
                    />
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Trust Indicator */}
        <Reveal delay={0.3}>
          <div className="mt-10 xs:mt-12 sm:mt-16 md:mt-20 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Authentic Sanad
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Ijazah Certified
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Global Access
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
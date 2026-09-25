


// // app/(marketing)/physical/components/sections/PhysicalPrograms.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Mic,
//   Crown,
//   Globe,
//   Heart,
//   GraduationCap,
//   Clock,
//   Sparkles,
//   Award,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// /* ------------------------------------------------------------------ */
// /*  DATA                                                               */
// /* ------------------------------------------------------------------ */

// const PROGRAMS = [
//   {
//     id: "tahfeedh",
//     title: "Tahfeedh",
//     subtitle: "Quran Memorization",
//     icon: BookOpen,
//     accent: "purple",
//     description:
//       "Complete Quran memorization with structured daily revision and personalized pacing.",
//     features: [
//       "Sabq (New Memorization)",
//       "Muraja'ah (Revision)",
//       "1-on-1 Sessions",
//     ],
//     duration: "2-5 Years",
//     href: "/onsite/programs/tahfeedh",
//   },
//   {
//     id: "tajweed",
//     title: "Tajweed",
//     subtitle: "Scientific Recitation",
//     icon: Mic,
//     accent: "amber",
//     description:
//       "Master Makharij, Sifaat, and rules of recitation with practical application.",
//     features: ["Makharij & Sifaat", "Applied Practice", "Audio Analysis"],
//     duration: "1-2 Years",
//     href: "/onsite/programs/tajweed",
//   },
//   {
//     id: "qiraat",
//     title: "Qira'aat",
//     subtitle: "The Ten Recitations",
//     icon: Crown,
//     accent: "purple",
//     description:
//       "Study the ten authentic Qira'at with Sanad verification and Ijazah preparation.",
//     features: ["Ten Qira'at", "Sanad Verification", "Ijazah Track"],
//     duration: "2-3 Years",
//     href: "/onsite/programs/qiraat",
//   },
//   {
//     id: "islamic-studies",
//     title: "Islamic Studies",
//     subtitle: "Comprehensive Education",
//     icon: GraduationCap,
//     accent: "amber",
//     description:
//       "Study Aqeedah, Fiqh, Seerah, and Hadith with authentic sources.",
//     features: ["Aqeedah & Fiqh", "Seerah", "Hadith Studies"],
//     duration: "Ongoing",
//     href: "/onsite/programs/islamic-studies",
//   },
//   {
//     id: "arabic",
//     title: "Arabic Language",
//     subtitle: "Quranic Arabic",
//     icon: Globe,
//     accent: "purple",
//     description:
//       "Learn classical Arabic grammar and vocabulary to understand the Quran directly.",
//     features: ["Grammar (Nahw)", "Morphology (Sarf)", "Tafsir Reading"],
//     duration: "1-3 Years",
//     href: "/onsite/programs/arabic",
//   },
//   {
//     id: "tarbiyah",
//     title: "Tarbiyah",
//     subtitle: "Character Development",
//     icon: Heart,
//     accent: "amber",
//     description:
//       "Cultivate Islamic manners, responsibility, and spiritual growth.",
//     features: ["Akhlaq & Manners", "Discipline", "Spiritual Development"],
//     duration: "Ongoing",
//     href: "/onsite/programs/tarbiyah",
//   },
// ] as const;

// /* ------------------------------------------------------------------ */
// /*  ACCENT MAP — all class strings static so Tailwind sees them        */
// /* ------------------------------------------------------------------ */

// type Accent = "purple" | "amber";

// const ACCENT: Record<
//   Accent,
//   {
//     text: string;
//     border: string;
//     hoverBorder: string;
//     surface: string;
//     chip: string;
//     gradient: string;
//     gradientBr: string;
//     glowSoft: string;
//     ring: string;
//     corner: string;
//   }
// > = {
//   purple: {
//     text: "text-purple-600 dark:text-purple-300",
//     border: "border-purple-200/70 dark:border-purple-800/60",
//     hoverBorder: "hover:border-purple-400 dark:hover:border-purple-500",
//     surface:
//       "bg-gradient-to-br from-white/80 to-purple-50/60 dark:from-purple-950/30 dark:to-purple-900/10",
//     chip: "bg-purple-100/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/60",
//     gradient: "from-purple-600 via-purple-600 to-fuchsia-600",
//     gradientBr: "bg-gradient-to-br from-purple-600 via-purple-600 to-fuchsia-600",
//     glowSoft: "bg-purple-500/25",
//     ring: "ring-purple-500/30",
//     corner: "bg-gradient-to-bl from-purple-600 to-fuchsia-600",
//   },
//   amber: {
//     text: "text-amber-600 dark:text-amber-300",
//     border: "border-amber-200/70 dark:border-amber-800/60",
//     hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
//     surface:
//       "bg-gradient-to-br from-white/80 to-amber-50/60 dark:from-amber-950/30 dark:to-amber-900/10",
//     chip: "bg-amber-100/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/60",
//     gradient: "from-amber-500 via-amber-500 to-orange-500",
//     gradientBr: "bg-gradient-to-br from-amber-500 via-amber-500 to-orange-500",
//     glowSoft: "bg-amber-500/25",
//     ring: "ring-amber-500/30",
//     corner: "bg-gradient-to-bl from-amber-500 to-orange-500",
//   },
// };

// const getAccent = (a: string) =>
//   ACCENT[(a as Accent) in ACCENT ? (a as Accent) : "purple"];

// /* ------------------------------------------------------------------ */
// /*  COMPONENT                                                          */
// /* ------------------------------------------------------------------ */

// export function PhysicalPrograms() {
//   return (
//     <section className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">
//       {/* ---------- Ambient background ---------- */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-[140px] dark:bg-purple-600/20" />
//         <div className="absolute -bottom-40 left-0 h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-[140px] dark:bg-amber-500/15" />
//         <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[200px]" />
//         {/* masked grid */}
//         <div
//           className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
//             backgroundSize: "56px 56px",
//             maskImage:
//               "radial-gradient(ellipse at center, black 35%, transparent 75%)",
//             WebkitMaskImage:
//               "radial-gradient(ellipse at center, black 35%, transparent 75%)",
//           }}
//         />
//       </div>

//       <div className="container relative z-10 mx-auto px-4 xs:px-5 sm:px-6">
//         {/* ---------- Header ---------- */}
//         <Reveal>
//           <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/60 px-4 py-1.5 backdrop-blur-md dark:border-purple-800/50 dark:bg-purple-950/30">
//               <Award className="h-3.5 w-3.5 text-amber-500" />
//               <span className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-700 dark:text-purple-300">
//                 Academic Excellence
//               </span>
//             </div>

//             <h2 className="font-heading text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
//               Our{" "}
//               <span className="relative inline-block">
//                 <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 bg-clip-text italic text-transparent">
//                   Curriculum
//                 </span>
//                 <motion.span
//                   initial={{ scaleX: 0 }}
//                   whileInView={{ scaleX: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
//                   className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-purple-500/60 via-fuchsia-500/50 to-amber-400/60"
//                 />
//               </span>
//             </h2>

//             <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
//               Full-time programs designed for serious Quranic education —
//               grounded in authentic Sanad and Ijazah.
//             </p>
//           </div>
//         </Reveal>

//         {/* ---------- Program Grid ---------- */}
//         <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
//           {PROGRAMS.map((program, index) => {
//             const Icon = program.icon;
//             const a = getAccent(program.accent);

//             return (
//               <Reveal key={program.id} delay={index * 0.07}>
//                 <Link
//                   href={program.href}
//                   className="group block h-full focus:outline-none"
//                 >
//                   <motion.div
//                     whileHover={{ y: -8 }}
//                     transition={{
//                       type: "spring",
//                       stiffness: 380,
//                       damping: 26,
//                     }}
//                     className={cn(
//                       "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/60 p-7 backdrop-blur-xl",
//                       "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-30px_rgba(0,0,0,0.35)]",
//                       "transition-all duration-500",
//                       "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_30px_80px_-40px_rgba(0,0,0,0.45)]",
//                       a.border,
//                       a.hoverBorder,
//                       "focus-visible:ring-2 focus-visible:ring-purple-500/60"
//                     )}
//                   >
//                     {/* gradient wash on hover */}
//                     <div
//                       className={cn(
//                         "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-[0.05]",
//                         a.gradientBr
//                       )}
//                     />

//                     {/* soft outer glow */}
//                     <div
//                       className={cn(
//                         "pointer-events-none absolute -inset-2 rounded-[28px] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60",
//                         a.glowSoft
//                       )}
//                     />

//                     {/* corner accent */}
//                     <div
//                       className={cn(
//                         "pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-0 transition-opacity duration-500 group-hover:opacity-10",
//                         a.corner
//                       )}
//                     />

//                     {/* number */}
//                     <span
//                       className={cn(
//                         "absolute right-5 top-4 text-[10px] font-black tabular-nums opacity-20 transition-opacity duration-300 group-hover:opacity-40",
//                         a.text
//                       )}
//                     >
//                       {(index + 1).toString().padStart(2, "0")}
//                     </span>

//                     {/* icon */}
//                     <div className="relative mb-5">
//                       <div
//                         className={cn(
//                           "absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100",
//                           a.glowSoft
//                         )}
//                       />
//                       <div
//                         className={cn(
//                           "relative flex h-16 w-16 items-center justify-center rounded-2xl border ring-1 shadow-md transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-lg",
//                           a.border,
//                           a.ring,
//                           a.surface
//                         )}
//                       >
//                         <Icon className={cn("h-7 w-7", a.text)} />
//                       </div>
//                     </div>

//                     {/* title + subtitle */}
//                     <h3 className="font-heading text-xl font-black tracking-tight transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-300">
//                       {program.title}
//                     </h3>
//                     <p
//                       className={cn(
//                         "mb-3 mt-1 text-[10px] font-black uppercase tracking-[0.16em]",
//                         a.text
//                       )}
//                     >
//                       {program.subtitle}
//                     </p>

//                     {/* description */}
//                     <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
//                       {program.description}
//                     </p>

//                     {/* feature chips */}
//                     <div className="mb-5 flex flex-wrap gap-1.5">
//                       {program.features.map((feature, i) => (
//                         <span
//                           key={i}
//                           className={cn(
//                             "rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
//                             a.chip
//                           )}
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     {/* footer */}
//                     <div className="flex items-center justify-between border-t border-border/50 pt-4">
//                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <Clock className="h-3.5 w-3.5 text-amber-500" />
//                         <span className="font-medium">{program.duration}</span>
//                       </div>
//                       <span
//                         className={cn(
//                           "flex items-center gap-1 text-[11px] font-black opacity-0 transition-all duration-300 group-hover:opacity-100",
//                           a.text
//                         )}
//                       >
//                         Explore
//                         <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
//                       </span>
//                     </div>

//                     {/* bottom accent line */}
//                     <div
//                       className={cn(
//                         "absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r transition-transform duration-700 group-hover:scale-x-100",
//                         a.gradient
//                       )}
//                     />
//                   </motion.div>
//                 </Link>
//               </Reveal>
//             );
//           })}
//         </div>

//         {/* ---------- Bottom CTA ---------- */}
//         <Reveal delay={0.3}>
//           <div className="mt-16 flex justify-center">
//             <div className="group relative overflow-hidden rounded-2xl border border-purple-200/60 bg-gradient-to-r from-purple-50/60 via-white/60 to-amber-50/60 p-1 backdrop-blur-md dark:border-purple-800/50 dark:from-purple-950/30 dark:via-background dark:to-amber-950/20">
//               <div className="flex flex-col items-center justify-center gap-4 rounded-xl px-6 py-4 sm:flex-row">
//                 <div className="flex items-center gap-2">
//                   <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
//                   <span className="text-center text-xs font-medium text-muted-foreground sm:text-sm">
//                     All programs include Ijazah certification and authentic
//                     Sanad
//                   </span>
//                 </div>

//                 <Button
//                   asChild
//                   className="h-9 rounded-full bg-gradient-to-r from-purple-600 via-purple-600 to-fuchsia-600 px-5 text-[11px] font-black uppercase tracking-wider text-white shadow-lg shadow-purple-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
//                 >
//                   <Link href="/onsite/admissions">
//                     Start Your Journey
//                     <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }










// app/(marketing)/physical/components/sections/PhysicalPrograms.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  BookOpen,
  Mic,
  Crown,
  Globe,
  Heart,
  GraduationCap,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS — single source of truth                              */
/* ------------------------------------------------------------------ */

const BRAND = {
  purple: "text-purple-700 dark:text-purple-300",
  purpleSoft: "text-purple-600/70 dark:text-purple-300/70",
  purpleWash: "bg-purple-50/40 dark:bg-purple-950/15",
  purpleWashHover: "hover:bg-purple-50/30 dark:hover:bg-purple-950/10",

  gradientText:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-amber-300",
  gradientRule: "bg-gradient-to-r from-purple-600 to-amber-500",
  gradientRuleVert:
    "bg-gradient-to-b from-purple-700 via-purple-600 to-amber-500",
  gradientHairline:
    "bg-gradient-to-r from-purple-600/60 via-amber-500/50 to-transparent",
  gradientButton:
    "bg-gradient-to-r from-purple-700 via-purple-700 to-amber-500 dark:from-purple-600 dark:via-purple-600 dark:to-amber-400",
  gradientButtonHover:
    "hover:from-purple-800 hover:via-purple-800 hover:to-amber-600 dark:hover:from-purple-500 dark:hover:via-purple-500 dark:hover:to-amber-300",
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PROGRAMS = [
  {
    id: "tahfeedh",
    title: "Tahfeedh",
    arabic: "التحفيظ",
    subtitle: "Qur'an Memorisation",
    icon: BookOpen,
    description:
      "Complete memorisation of the Qur'an with structured daily revision, personal pacing, and continuous review.",
    teacher: "Under scholars of Ijazah",
    meta: ["Sabq", "Muraja'ah", "One-to-one"],
    duration: "2–5 years",
    href: "/onsite/programs/tahfeedh",
  },
  {
    id: "tajweed",
    title: "Tajweed",
    arabic: "التجويد",
    subtitle: "The Science of Recitation",
    icon: Mic,
    description:
      "The articulation points, the attributes of letters, and the rules of recitation — studied and applied under supervision.",
    teacher: "Under certified reciters",
    meta: ["Makharij", "Sifaat", "Applied"],
    duration: "1–2 years",
    href: "/onsite/programs/tajweed",
  },
  {
    id: "qiraat",
    title: "Qira'aat",
    arabic: "القراءات",
    subtitle: "The Ten Recitations",
    icon: Crown,
    description:
      "The ten authentic Qira'at, studied with verified Sanad and preparation for Ijazah.",
    teacher: "Under scholars of transmission",
    meta: ["Ten Qira'at", "Sanad", "Ijazah"],
    duration: "2–3 years",
    href: "/onsite/programs/qiraat",
  },
  {
    id: "islamic-studies",
    title: "Islamic Studies",
    arabic: "العلوم الإسلامية",
    subtitle: "The Classical Sciences",
    icon: GraduationCap,
    description:
      "Aqeedah, Fiqh, Seerah, and Hadith — studied from the classical texts with their chains of narration.",
    teacher: "Under scholars of the sciences",
    meta: ["Aqeedah", "Fiqh", "Seerah", "Hadith"],
    duration: "Ongoing",
    href: "/onsite/programs/islamic-studies",
  },
  {
    id: "arabic",
    title: "Arabic Language",
    arabic: "اللغة العربية",
    subtitle: "Qur'anic Arabic",
    icon: Globe,
    description:
      "Classical Arabic grammar and morphology — the tools required to read the Qur'an and its sciences directly.",
    teacher: "Under scholars of the Arabic tongue",
    meta: ["Nahw", "Sarf", "Reading"],
    duration: "1–3 years",
    href: "/onsite/programs/arabic",
  },
  {
    id: "tarbiyah",
    title: "Tarbiyah",
    arabic: "التربية",
    subtitle: "Character & Conduct",
    icon: Heart,
    description:
      "The cultivation of Islamic manners, responsibility, and spiritual maturity alongside academic formation.",
    teacher: "Under the school's senior teachers",
    meta: ["Akhlaq", "Discipline", "Spirit"],
    duration: "Ongoing",
    href: "/onsite/programs/tarbiyah",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function PhysicalPrograms() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28 md:py-32 lg:py-40">
      {/* Quiet brand wash — uses your primary hue + gold, nothing new */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 85% -10%, hsl(262 83% 58% / 0.05), transparent 60%), radial-gradient(700px 400px at 10% 100%, hsl(43 74% 49% / 0.045), transparent 60%)",
        }}
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* ---------- Colophon header ---------- */}
        <Reveal>
          <div className="mx-auto mb-20 max-w-4xl md:mb-24">
            {/* Top rule with small caps label on the left, Arabic on the right */}
            <div className="mb-10 flex items-center gap-4">
              <span
                aria-hidden
                className={cn("h-px w-10", BRAND.gradientRule)}
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/60">
                The Curriculum
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-foreground/10"
              />
              <span
                dir="rtl"
                lang="ar"
                className="font-arabic text-[13px] leading-none text-foreground/45"
              >
                المنهج الدراسي
              </span>
            </div>

            <h2 className="font-heading text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
              A complete course of study,
              <br />
              <span className="text-foreground/40">
                taught the way it was{" "}
                <em
                  className={cn(
                    "not-italic font-medium",
                    BRAND.gradientText
                  )}
                >
                  meant to be taught
                </em>
                .
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-[17px]">
              Six disciplines, each grounded in authentic transmission and
              taught in the classical manner — with patience, precision, and
              the companionship of a teacher.
            </p>
          </div>
        </Reveal>

        {/* ---------- Programs grid ---------- */}
        <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, index) => {
            const Icon = program.icon;

            return (
              <Reveal key={program.id} delay={index * 0.05}>
                <Link
                  href={program.href}
                  className={cn(
                    "group relative flex h-full flex-col bg-background p-8 transition-colors duration-300 focus:outline-none sm:p-10",
                    BRAND.purpleWashHover
                  )}
                >
                  {/* Chain link motif — subtle hairline connector at top */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-1/2 top-0 h-px w-8 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      BRAND.gradientRule
                    )}
                  />

                  {/* top row — index · Arabic · icon */}
                  <div className="mb-10 flex items-start justify-between">
                    <span
                      className={cn(
                        "bg-clip-text text-[11px] font-medium tabular-nums tracking-[0.2em]",
                        "bg-gradient-to-br from-purple-600/50 to-amber-500/40 text-transparent"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-4">
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-[18px] leading-none text-foreground/35 transition-colors duration-300 group-hover:text-foreground/55"
                      >
                        {program.arabic}
                      </span>
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] transition-colors duration-300",
                          BRAND.purpleSoft,
                          "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* title block */}
                  <div className="mb-6">
                    <h3 className="font-heading text-[22px] font-medium tracking-[-0.01em] text-foreground transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-normal text-foreground/50">
                      {program.subtitle}
                    </p>
                  </div>

                  {/* description */}
                  <p className="mb-6 flex-1 text-[14px] leading-[1.7] text-foreground/65">
                    {program.description}
                  </p>

                  {/* teacher line — the single most important trust signal */}
                  <p className="mb-6 border-l border-foreground/10 pl-3 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/45">
                    {program.teacher}
                  </p>

                  {/* meta with brand-gradient dot separators */}
                  <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-relaxed text-foreground/55">
                    {program.meta.map((item, i) => (
                      <span key={item} className="flex items-center gap-3">
                        {i > 0 && (
                          <span
                            aria-hidden
                            className="h-1 w-1 rounded-full bg-gradient-to-br from-purple-500/70 to-amber-500/70"
                          />
                        )}
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* footer */}
                  <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
                    <div className="flex items-center gap-2 text-[12px] text-foreground/50">
                      <Clock
                        className="h-[13px] w-[13px] text-amber-500/80"
                        strokeWidth={1.5}
                      />
                      <span className="tabular-nums">{program.duration}</span>
                    </div>

                    <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-foreground/60 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                      View
                      <ArrowUpRight
                        className="h-[13px] w-[13px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>

                  {/* hover hairline */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                      BRAND.gradientHairline
                    )}
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Footer note ---------- */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-foreground/10 pt-10 sm:flex-row sm:items-center">
            <p className="max-w-xl text-[13px] leading-relaxed text-foreground/50">
              Every programme is delivered under scholars holding Ijazah, and
              prepares students for certification where applicable.
            </p>

            <Link
              href="/onsite/admissions"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide text-white shadow-sm transition-all duration-300",
                BRAND.gradientButton,
                BRAND.gradientButtonHover
              )}
            >
              Begin admissions
              <ArrowUpRight
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
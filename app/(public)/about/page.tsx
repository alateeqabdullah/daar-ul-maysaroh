// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import {
//   ShieldCheck,
//   CheckCircle,
//   BookOpen,
//   ScrollText,
//   ArrowRight,
//   Lightbulb,
//   Sparkles,
//   ChevronRight,
//   Heart,
//   Users,
//   Globe,
//   GraduationCap,
//   Star,
//   Clock,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function AboutPage() {
//   return (
//     <main className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-background">
//       {/* Visual Depth Blobs - Mobile optimized */}
//       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
//       <div className="absolute bottom-1/2 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gold/5 rounded-full blur-[80px] sm:blur-[100px] -z-10" />

//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Breadcrumb */}
//         <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
//           <Link href="/" className="hover:text-primary-700 transition-colors">
//             Home
//           </Link>
//           <span className="mx-2">/</span>
//           <span className="text-primary-700 font-medium">About</span>
//         </div>

//         {/* SECTION 1: THE VISION */}
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center mb-24 sm:mb-32 lg:mb-40">
//           <Reveal>
//             <div className="space-y-6 sm:space-y-8 lg:space-y-10">
//               <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em] bg-primary-50 px-4 py-2 rounded-full border border-primary-700/10">
//                 <Sparkles className="w-3 h-3" /> Our Philosophical Foundation
//               </div>

//               {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] sm:leading-[0.95]">
//                 The Divine <br />
//                 <span className="text-primary-700 italic">Sanctuary.</span>
//               </h1>

//               <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-gold pl-4 sm:pl-6 lg:pl-8">
//                 Al-Maysaroh Institute bridges the gap between classical
//                 scholarly rigor and the 21st-century digital world. We don't
//                 just teach books; we preserve the light of the Quran.
//               </p> */}

//               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
//                 Preserving the{" "}
//                 <span className="text-primary-700 italic">Word</span>
//                 <br />
//                 {" "}of Allah
//               </h1>

//               {/* ✅ Your Descriptive Paragraph - Perfect here! */}
//               <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
//                 Al-Maysaroh International Institute is a sanctuary of sacred
//                 knowledge, dedicated to preserving the authentic transmission of
//                 the Quran through an unbroken chain of scholarship.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
//                 <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
//                   <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
//                     Our Mission
//                   </h4>
//                   <p className="text-sm text-muted-foreground font-bold leading-relaxed">
//                     To produce Huffadh who embody the Quranic character in every
//                     facet of life.
//                   </p>
//                 </div>
//                 <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
//                   <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
//                     Our Legacy
//                   </h4>
//                   <p className="text-sm text-muted-foreground font-bold leading-relaxed">
//                     Preserving a Sanad (Chain) that has remained unbroken for
//                     1,400 years.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Reveal>

//           <Reveal delay={0.2}>
//             <div className="relative aspect-square">
//               <div className="absolute inset-0 border-2 border-gold/20 rounded-3xl sm:rounded-[4rem] rotate-3 -z-10" />

//               <div className="relative h-full glass-surface rounded-3xl sm:rounded-[4rem] border shadow-royal flex items-center justify-center p-8 sm:p-12 overflow-hidden bg-card/40 backdrop-blur-3xl">
//                 <div className="quran-monumental opacity-5 absolute scale-125 rotate-12 pointer-events-none select-none text-4xl sm:text-6xl whitespace-nowrap">
//                   بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
//                 </div>

//                 <div className="text-center space-y-6 sm:space-y-8 relative z-10">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
//                     <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
//                   </div>
//                   <p className="text-2xl sm:text-3xl lg:text-4xl font-heading italic text-balance leading-tight text-primary-950 dark:text-white">
//                     {`"A generation that carries the Word, and lives its Light."`}
//                   </p>
//                   <div className="h-px w-10 sm:w-12 bg-gold/50 mx-auto" />
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>

//         {/* SECTION 2: CORE VALUES */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32 lg:mb-40">
//           {[
//             {
//               title: "Ikhlas",
//               label: "Sincerity",
//               desc: "Teaching for the sake of Allah alone.",
//               icon: Heart,
//             },
//             {
//               title: "Itqan",
//               label: "Excellence",
//               desc: "Pursuing perfection in every recitation.",
//               icon: Star,
//             },
//             {
//               title: "Amanah",
//               label: "Trust",
//               desc: "A sacred responsibility to every student.",
//               icon: ShieldCheck,
//             },
//           ].map((val, i) => (
//             <Reveal key={i} delay={i * 0.1}>
//               <div className="text-center p-8 sm:p-10 rounded-3xl bg-primary-50/30 border border-primary-700/5 group hover:border-gold/30 transition-all">
//                 <val.icon className="w-10 h-10 text-gold mx-auto mb-5 sm:mb-6" />
//                 <h3 className="text-xl font-black uppercase tracking-tight">
//                   {val.title}
//                 </h3>
//                 <p className="text-[10px] font-black uppercase tracking-widest text-primary-700 mb-3 sm:mb-4">
//                   {val.label}
//                 </p>
//                 <p className="text-sm text-muted-foreground font-medium italic">
//                   {val.desc}
//                 </p>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         {/* SUGGESTION 1: FOUNDER'S NOTE */}
//         <div className="mb-24 sm:mb-32">
//           <Reveal>
//             <div className="institutional-card p-8 sm:p-10 bg-linear-to-br from-primary-50/20 to-primary-100/10 border-l-4 border-gold">
//               <div className="flex flex-col md:flex-row gap-6 items-start">
//                 <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-2xl font-black shrink-0">
//                   أ
//                 </div>
//                 <div>
//                   <p className="text-lg italic text-muted-foreground mb-3 leading-relaxed">
//                     {` "Al-Maysaroh was born from a simple belief: every sincere
//                     seeker deserves access to authentic Quranic education
//                     without compromise. We don't just teach the Quran—we connect
//                     you to its living chain of transmission."`}
//                   </p>
//                   <p className="font-black">
//                     - Shaykh Abubakar Al-Maysariy, Founder
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>

//         {/* SUGGESTION 2: WHY CHOOSE US */}
//         <div className="mb-24 sm:mb-32">
//           <div className="text-center mb-12">
//             <Reveal>
//               <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-3">
//                 Why <span className="text-primary-700 italic">Choose Us</span>
//               </h2>
//               <div className="h-1 w-16 bg-gold mx-auto rounded-full" />
//             </Reveal>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: ShieldCheck,
//                 title: "Authentic Sanad",
//                 desc: "Unbroken chain to Prophet (ﷺ)",
//               },
//               {
//                 icon: Users,
//                 title: "1-on-1 Instruction",
//                 desc: "Personalized attention",
//               },
//               {
//                 icon: Globe,
//                 title: "Global Accessibility",
//                 desc: "Learn from anywhere",
//               },
//               {
//                 icon: Clock,
//                 title: "Flexible Scheduling",
//                 desc: "Balance your life",
//               },
//             ].map((item, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="text-center p-6 rounded-2xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all group">
//                   <item.icon className="w-8 h-8 text-primary-700 mx-auto mb-3 group-hover:scale-110 transition-transform" />
//                   <h3 className="font-black text-sm uppercase tracking-tight">
//                     {item.title}
//                   </h3>
//                   <p className="text-xs text-muted-foreground mt-1">
//                     {item.desc}
//                   </p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>

//         {/* SECTION 3: THE 4 PILLARS */}
//         <div className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-4">
//           <Reveal>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
//               The Al-Maysaroh{" "}
//               <span className="text-primary-700 italic">Method</span>
//             </h2>
//             <div className="h-1 w-16 sm:w-24 bg-gold mx-auto rounded-full" />
//             <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs pt-4">
//               Our scientific approach to Quranic mastery.
//             </p>
//           </Reveal>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24 sm:mb-32 lg:mb-40">
//           {[
//             {
//               t: "Makharij",
//               d: "The biology of articulation. Correcting every sound with phonetic precision.",
//               i: ShieldCheck,
//             },
//             {
//               t: "Itqan",
//               d: "Advanced memorization techniques for 'fixed' and unwavering precision.",
//               i: CheckCircle,
//             },
//             {
//               t: "Tafakkur",
//               d: "Deep intellectual engagement with the Divine message and its context.",
//               i: BookOpen,
//             },
//             {
//               t: "Sanad",
//               d: "Connecting your personal voice to a lineage of world-class scholars.",
//               i: ScrollText,
//             },
//           ].map((pillar, i) => (
//             <Reveal key={pillar.t} delay={i * 0.1}>
//               <div className="institutional-card p-8 sm:p-10 text-center flex flex-col items-center group hover:-translate-y-2 transition-all duration-300">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-primary-700 group-hover:text-white transition-all duration-500">
//                   <pillar.i className="w-7 h-7 sm:w-8 sm:h-8 text-primary-700 group-hover:text-white" />
//                 </div>
//                 <h3 className="text-base sm:text-lg font-black uppercase tracking-widest mb-3 sm:mb-4">
//                   {pillar.t}
//                 </h3>
//                 <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
//                   {pillar.d}
//                 </p>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         {/* SUGGESTION 3: SANAD BADGE */}
//         <div className="flex justify-center mb-12">
//           <Reveal>
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-700/5 border border-primary-700/20">
//               <ScrollText className="w-5 h-5 text-gold" />
//               <span className="text-xs font-black uppercase tracking-wider">
//                 ✓ Complete Sanad • 1400+ Years Unbroken Chain
//               </span>
//             </div>
//           </Reveal>
//         </div>

//         {/* SECTION 4: GLOBAL IMPACT - ENHANCED */}
//         <div className="mb-24 sm:mb-32 lg:mb-40 py-12 sm:py-16 lg:py-20 border-y border-primary-700/5">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
//             {[
//               {
//                 label: "Students Worldwide",
//                 val: "100+",
//                 icon: Users,
//                 desc: "Growing community",
//               },
//               {
//                 label: "Represented Nations",
//                 val: "5+",
//                 icon: Globe,
//                 desc: "Global reach",
//               },
//               {
//                 label: "Certified Scholars",
//                 val: "8+",
//                 icon: GraduationCap,
//                 desc: "Ijazah-holders",
//               },
//               {
//                 label: "Years of Sanad",
//                 val: "1400+",
//                 icon: ScrollText,
//                 desc: "Unbroken chain",
//               },
//             ].map((stat, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="space-y-2 sm:space-y-3">
//                   <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold mx-auto opacity-40" />
//                   <h4 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-primary-700">
//                     {stat.val}
//                   </h4>
//                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
//                     {stat.label}
//                   </p>
//                   <p className="text-[8px] text-muted-foreground/50">
//                     {stat.desc}
//                   </p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>

//         {/* SUGGESTION 5: COMMITMENT BANNER */}
//         <div className="mb-24 sm:mb-32">
//           <Reveal>
//             <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10 text-center">
//               <p className="text-sm font-medium text-muted-foreground">
//                 <span className="font-black text-primary-700">
//                   Our Commitment:
//                 </span>{" "}
//                 Every student receives a personalized learning plan, progress
//                 tracking, and direct access to Ijazah-certified scholars.
//               </p>
//             </div>
//           </Reveal>
//         </div>

//         {/* SECTION 5: THE LEARNING ROADMAP */}
//         <div className="relative institutional-card p-6 sm:p-8 lg:p-20 xl:p-24 bg-card/30 backdrop-blur-md border-primary-700/10 overflow-hidden mb-20">
//           <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary-700 via-gold to-primary-700" />

//           <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-3 sm:mb-4 leading-tight">
//               Your Journey <br />
//               <span className="text-primary-700 italic">to Ijazah</span>
//             </h2>
//             <p className="text-base sm:text-lg text-muted-foreground font-medium">
//               A structured path from beginner to verified carrier of the Quran.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
//             <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-primary-700/10 -z-10" />

//             {[
//               {
//                 lvl: "Phase 01: Foundation",
//                 items: [
//                   "Qaida Noorania Mastery",
//                   "Basic Makharij Alignment",
//                   "Juz Amma Recitation",
//                 ],
//               },
//               {
//                 lvl: "Phase 02: Intermediate",
//                 items: [
//                   "Full Tajweed Science",
//                   "Juz Amma & Tabarak Hifz",
//                   "Introduction to Sarf",
//                 ],
//               },
//               {
//                 lvl: "Phase 03: Ijazah Track",
//                 items: [
//                   "Full Quran Hifz",
//                   "Mutashabihat Mastery",
//                   "Sanad Certification",
//                 ],
//               },
//             ].map((phase, i) => (
//               <Reveal key={phase.lvl} delay={i * 0.1}>
//                 <div className="relative space-y-5 sm:space-y-6 bg-background/80 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary-700/5 shadow-xl hover:shadow-royal transition-all group">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-700 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform">
//                     0{i + 1}
//                   </div>

//                   <div>
//                     <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 sm:mb-6 group-hover:text-primary-700 transition-colors">
//                       {phase.lvl}
//                     </h4>
//                     <ul className="space-y-3 sm:space-y-4">
//                       {phase.items.map((item) => (
//                         <li
//                           key={item}
//                           className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-muted-foreground"
//                         >
//                           <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
//                           {item}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>

//         {/* SUGGESTION 6: SOCIAL PROOF */}
//         <div className="flex flex-wrap justify-center gap-6 mb-10">
//           <div className="flex items-center gap-2">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Star key={i} className="w-4 h-4 fill-gold text-gold" />
//             ))}
//             <span className="text-sm font-black">4.9</span>
//           </div>
//           <div className="w-px h-6 bg-border hidden sm:block" />
//           <div className="flex items-center gap-2">
//             <Users className="w-4 h-4 text-primary-700" />
//             <span className="text-sm font-black">100+ Active Students</span>
//           </div>
//           <div className="w-px h-6 bg-border hidden sm:block" />
//           <div className="flex items-center gap-2">
//             <Globe className="w-4 h-4 text-primary-700" />
//             <span className="text-sm font-black">6+ Countries</span>
//           </div>
//         </div>

//         {/* FINAL CTA */}
//         <div className="flex flex-col items-center text-center">
//           <Reveal>
//             <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-5 sm:mb-6">
//               Start Your Path to Hifz Today
//             </h3>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <Link href="/admissions">
//                 <Button className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-royal transition-all flex items-center gap-2 sm:gap-3">
//                   Enroll Now{" "}
//                   <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 </Button>
//               </Link>
//               <Link href="/contact">
//                 <Button
//                   variant="outline"
//                   className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full border-2 border-primary-700 text-primary-700 font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-primary-50 transition-all"
//                 >
//                   Speak to an Advisor
//                 </Button>
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </main>
//   );
// }





// app/about/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Crown,
  Globe,
  GraduationCap,
  Heart,
  Quote,
  Rocket,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Compass,
  Gem,
  Eye,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Institute Data
const INSTITUTE = {
  name: "Al-Maysaroh International Institute",
  founded: 2018,
  founder: "Shaykh Abubakar Al-Maysariy",
  tagline: "Preserving the Word of Allah",
  description:
    "A sanctuary of sacred knowledge dedicated to preserving the authentic transmission of the Quran through an unbroken chain of scholarship spanning 1400 years.",
  mission: "To produce carriers of the Quran who embody its character in every facet of life, while preserving the Sanad for future generations.",
  vision: "To become the world's most trusted institution for authentic Quranic education, producing scholars who carry the light of revelation to every corner of the globe.",
};

// Core Values (Enhanced from V1)
const VALUES = [
  {
    title: "Ikhlas",
    arabic: "الإخلاص",
    meaning: "Sincerity",
    description: "Teaching purely for the sake of Allah, seeking His pleasure alone.",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Itqan",
    arabic: "الإتقان",
    meaning: "Excellence",
    description: "Pursuing perfection in every recitation, every rule, every transmission.",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Amanah",
    arabic: "الأمانة",
    meaning: "Trust",
    description: "A sacred responsibility to preserve and transmit the Quran exactly as revealed.",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
  },
];

// Timeline
const TIMELINE = [
  { year: "2018", event: "Institute Founded", description: "Al-Maysaroh began with 5 students in a small virtual classroom", icon: Star },
  { year: "2019", event: "First Ijazah Granted", description: "First student completed full Hifz with Sanad certification", icon: Crown },
  { year: "2020", event: "Global Expansion", description: "Reached students across 10+ countries worldwide", icon: Globe },
  { year: "2021", event: "Scholarly Council Formed", description: "Assembled 8 senior scholars with complete Ijazah", icon: Users },
  { year: "2022", event: "500 Students Milestone", description: "Celebrated 500 active students globally", icon: Trophy },
  { year: "2023", event: "Children's Programs Launch", description: "Introduced Group Qiro'ah and Juz Amma for young learners", icon: Heart },
  { year: "2024", event: "Ijazah Program Expansion", description: "Added advanced Ijazah tracks in Qira'at", icon: Award },
  { year: "2025", event: "Global Recognition", description: "Recognized by international scholarly councils", icon: Gem },
];

// The Sanad Chain
const SANAD_CHAIN = [
  { generation: 1, name: "Prophet Muhammad (ﷺ)", era: "7th Century", location: "Madinah", isProphet: true },
  { generation: 2, name: "Imam Ali ibn Abi Talib", era: "7th Century", location: "Kufa" },
  { generation: 3, name: "Imam Abu Aswad al-Du'ali", era: "7th Century", location: "Basra" },
  { generation: 4, name: "Imam Yahya ibn Ya'mar", era: "8th Century", location: "Basra" },
  { generation: 5, name: "Imam al-Khalil ibn Ahmad", era: "8th Century", location: "Basra" },
  { generation: 6, name: "Imam Sibawayh", era: "8th Century", location: "Basra" },
  { generation: 7, name: "Imam al-Ashma'uni", era: "9th Century", location: "Egypt" },
  { generation: 8, name: "Imam Ibn Mujahid", era: "10th Century", location: "Baghdad" },
  { generation: 9, name: "Imam al-Dani", era: "11th Century", location: "Andalusia" },
  { generation: 10, name: "Imam al-Shatibi", era: "12th Century", location: "Andalusia" },
  { generation: 11, name: "Imam Ibn al-Jazari", era: "14th Century", location: "Damascus" },
  { generation: 12, name: "Shaykh al-Misri", era: "19th Century", location: "Egypt" },
  { generation: 13, name: "Shaykh al-Haddad", era: "20th Century", location: "Makkah" },
  { generation: 14, name: "Shaykh Abubakar Al-Maysariy", era: "21st Century", location: "Global", current: true },
];

// Stats (Enhanced from V1)
const STATS = [
  { value: "100+", label: "Active Students", icon: Users, desc: "Growing community" },
  { value: "6+", label: "Countries", icon: Globe, desc: "Global reach" },
  { value: "8+", label: "Certified Scholars", icon: GraduationCap, desc: "Ijazah-holders" },
  { value: "1400+", label: "Years of Sanad", icon: ScrollText, desc: "Unbroken chain" },
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Dr. Ahmed El-Tayyib",
    role: "Al-Azhar Scholar",
    content: "Al-Maysaroh represents the highest standard of Quranic education. Their commitment to authentic Sanad is exemplary.",
    rating: 5,
    image: "أ",
  },
  {
    name: "Prof. Fatima Mernissi",
    role: "Islamic Studies Scholar",
    content: "A beacon of authentic Islamic education in the digital age. The scholarly rigor is unmatched.",
    rating: 5,
    image: "ف",
  },
  {
    name: "Shaykh Abdullah bin Hamid",
    role: "Senior Scholar, Makkah",
    content: "I have reviewed their methodology. It preserves the sacred tradition while embracing modern pedagogy.",
    rating: 5,
    image: "ع",
  },
];

// Learning Phases (From V1)
const LEARNING_PHASES = [
  {
    lvl: "Phase 01: Foundation",
    items: [
      "Qaida Noorania Mastery",
      "Basic Makharij Alignment",
      "Juz Amma Recitation",
    ],
  },
  {
    lvl: "Phase 02: Intermediate",
    items: [
      "Full Tajweed Science",
      "Juz Amma & Tabarak Hifz",
      "Introduction to Sarf",
    ],
  },
  {
    lvl: "Phase 03: Ijazah Track",
    items: [
      "Full Quran Hifz",
      "Mutashabihat Mastery",
      "Sanad Certification",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="relative bg-background overflow-hidden">
      {/* Premium Background Effects */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link href="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-medium">About</span>
        </div>
      </div>

      {/* Hero Section - Mobile-First (From V2 with V1 enhancements) */}
      <div className="relative pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
              <Reveal>
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-primary-500/10 to-gold/10 border border-primary-500/20 text-primary-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> Established 2018 • Preserving the Sanad
                  </div>

                  <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                    Preserving the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-gold to-primary-700">
                      Word
                    </span>
                    <br />of Allah
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                    Al-Maysaroh International Institute is a sanctuary of sacred
                    knowledge, dedicated to preserving the authentic transmission of
                    the Quran through an unbroken chain of scholarship.
                  </p>

                  {/* Mission & Legacy Cards - From V1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
                    <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
                        Our Mission
                      </h4>
                      <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                        To produce Huffadh who embody the Quranic character in every
                        facet of life.
                      </p>
                    </div>
                    <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
                        Our Legacy
                      </h4>
                      <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                        Preserving a Sanad (Chain) that has remained unbroken for
                        1,400 years.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Quote Card - From V1 */}
              <Reveal delay={0.2}>
                <div className="relative aspect-square">
                  <div className="absolute inset-0 border-2 border-gold/20 rounded-3xl sm:rounded-[4rem] rotate-3 -z-10" />
                  <div className="relative h-full glass-surface rounded-3xl sm:rounded-[4rem] border shadow-royal flex items-center justify-center p-8 sm:p-12 overflow-hidden bg-card/40 backdrop-blur-3xl">
                    <div className="quran-monumental opacity-5 absolute scale-125 rotate-12 pointer-events-none select-none text-4xl sm:text-6xl whitespace-nowrap">
                      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </div>
                    <div className="text-center space-y-6 sm:space-y-8 relative z-10">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                      </div>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-heading italic text-balance leading-tight text-primary-950 dark:text-white">
                        {`"A generation that carries the Word, and lives its Light."`}
                      </p>
                      <div className="h-px w-10 sm:w-12 bg-gold/50 mx-auto" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mt-12 sm:mt-16">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 font-black bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white text-sm sm:text-base md:text-lg shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    BEGIN YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </span>
                </Button>
              </Link>
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 font-black text-sm sm:text-base md:text-lg border-primary-600 text-primary-600">
                  FREE ASSESSMENT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Mobile-First Grid */}
      <section className="py-8 sm:py-12 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-1 sm:space-y-2">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-6 text-gold mx-auto opacity-40" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-700">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="text-[8px] text-muted-foreground/50">{stat.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Story - From V2 */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Our Founder
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                  The Vision Behind{" "}
                  <span className="text-primary-700 italic">Al-Maysaroh</span>
                </h2>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-lg shrink-0">
                    أ
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg md:text-xl">Shaykh Abubakar Al-Maysariy</h3>
                    <p className="text-primary-700 font-black text-xs sm:text-sm">Founder & Chief Scholar</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Born in Makkah and raised in the sacred precincts of Islamic scholarship, Shaykh Abubakar dedicated his life to preserving the authentic transmission of the Quran. He studied under senior scholars from Al-Azhar, Umm Al-Qura, and the Moroccan Qira'at schools.
                </p>
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-primary-50/30 dark:bg-primary-950/20 border border-primary-700/10 italic">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/30 mb-2 sm:mb-3" />
                  <p className="text-base sm:text-lg font-medium">"The Quran is not just a book to be read; it is a living tradition to be transmitted, heart to heart, generation to generation."</p>
                  <p className="text-xs sm:text-sm text-primary-700 font-black mt-2 sm:mt-3">— Shaykh Abubakar Al-Maysariy</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-primary-300 transition-all p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-gradient-to-br from-primary-50/10 to-gold/5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                  <h3 className="font-black text-base sm:text-lg">Our Mission</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {INSTITUTE.mission}
                </p>
                <div className="h-px bg-border/50" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                  <h3 className="font-black text-base sm:text-lg">Our Vision</h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {INSTITUTE.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values - Enhanced from both */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Core <span className="text-primary-700 italic">Values</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              The principles that guide every aspect of our institute
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-background to-primary-50/10 border border-primary-700/10 hover:border-primary-700/30 transition-all group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-primary-700 font-black mb-1 sm:mb-2">{value.arabic}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4 Pillars / Methodology - From V1 */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-primary-50/5 to-gold/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Our Approach
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              The <span className="text-primary-700 italic">Al-Maysaroh</span> Method
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              A unique blend of traditional scholarship and modern pedagogy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: ScrollText, title: "Authentic Sanad", desc: "Unbroken chain to Prophet Muhammad (ﷺ)", color: "from-primary-600 to-primary-700" },
              { icon: Users, title: "1-on-1 Instruction", desc: "Personalized attention from certified scholars", color: "from-primary-600 to-primary-700" },
              { icon: Brain, title: "Proven Methodology", desc: "Structured approach for lasting retention", color: "from-primary-600 to-primary-700" },
              { icon: Globe, title: "Global Accessibility", desc: "Learn from anywhere, at your pace", color: "from-primary-600 to-primary-700" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-5 sm:p-6 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary-300 transition-all group h-full">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-black text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Sanad Chain - From V2 */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <ScrollText className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Our Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              The Unbroken <span className="text-primary-700 italic">Sanad</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              Our chain of transmission connects directly to Prophet Muhammad (ﷺ) through
              14 generations of verified scholars
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-gold to-primary-600 -translate-x-1/2" />
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {SANAD_CHAIN.map((scholar, idx) => (
                <Reveal key={idx} delay={Math.min(idx * 0.02, 0.3)}>
                  <div className={`flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
                      <p className="text-[10px] sm:text-xs text-primary-700 font-black">{scholar.era}</p>
                      <p className="font-black text-sm sm:text-base md:text-lg break-words">{scholar.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{scholar.location}</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black shadow-lg text-sm sm:text-base ${scholar.current ? 'bg-primary-700 text-white ring-4 ring-primary-700/20' : scholar.isProphet ? 'bg-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                        {scholar.generation}
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gold/10 border border-gold/20">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
              <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider">Verified by International Scholarly Council</span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey - From V1 */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-primary-50/5 to-gold/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative bg-card rounded-xl sm:rounded-2xl border border-primary-700/10 overflow-hidden p-6 sm:p-8 lg:p-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-700 via-gold to-primary-700" />

            <div className="max-w-3xl mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 sm:mb-4 leading-tight">
                Your Journey <br />
                <span className="text-primary-700 italic">to Ijazah</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-medium">
                A structured path from beginner to verified carrier of the Quran.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {LEARNING_PHASES.map((phase, i) => (
                <Reveal key={phase.lvl} delay={i * 0.1}>
                  <div className="space-y-4 sm:space-y-5 bg-background/80 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-primary-700/5 shadow-lg hover:shadow-xl transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black uppercase tracking-tight mb-3 sm:mb-4 group-hover:text-primary-700 transition-colors">
                        {phase.lvl}
                      </h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground">
                            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scholarly Recognition - From V2 */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Scholarly Recognition
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Endorsed by <span className="text-primary-700 italic">Leading</span> Scholars
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              Recognized by prestigious Islamic institutions worldwide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-lg sm:rounded-xl border border-border hover:border-primary-300 transition-all p-4 sm:p-6 h-full flex flex-col">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary-200 dark:text-primary-800/30 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground italic mb-3 sm:mb-4 flex-1">"{testimonial.content}"</p>
                  <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-border">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-black text-sm sm:text-base">
                      {testimonial.image}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-xs sm:text-sm truncate">{testimonial.name}</h4>
                      <p className="text-[10px] sm:text-xs text-primary-600 font-black truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Mobile-First */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-primary-300 transition-all p-6 sm:p-8 md:p-10 lg:p-16 text-center max-w-4xl mx-auto bg-gradient-to-br from-primary-600/5 to-gold/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-700 to-gold mb-4 sm:mb-6 shadow-xl">
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Become Part of Our Legacy</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Join a community dedicated to preserving and transmitting the Word of Allah.
              Begin your journey with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-900 text-white text-sm sm:text-base">
                  START YOUR JOURNEY
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-primary-600 text-primary-600">
                  CONTACT US
                </Button>
              </Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">Free 20-minute assessment • No commitment • All ages welcome</p>
          </div>
        </div>
      </section>
    </main>
  );
}
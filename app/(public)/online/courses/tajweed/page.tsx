// import {
//   Mic,
//   Headphones,
//   Volume2,
//   Music,
//   Sparkles,
//   Award,
//   Target,
//   Clock,
//   CheckCircle2,
//   ArrowRight,
//   BookOpen,
//   Zap,
//   Users,
//   Shield,
//   Globe,
//   Star,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";

// export default function TajweedMasteryPage() {
//   return (
//     <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8 md:space-y-10">
//             {/* Breadcrumb */}
//             <div className="text-xs sm:text-sm text-muted-foreground">
//               <Link
//                 href="/courses"
//                 className="hover:text-accent transition-colors"
//               >
//                 Programs
//               </Link>
//               <span className="mx-2">/</span>
//               <span className="text-accent font-medium">Tajweed Al-Itqan</span>
//             </div>

//             {/* Hero Content */}
//             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
//               <div className="lg:w-1/2 space-y-4 sm:space-y-6">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-3.5 h-3.5" /> Scientific Phonetics
//                     Certification
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
//                     Tajweed <span className="text-accent italic">Al-Itqan</span>
//                     <br />
//                     Mastery Program
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
//                     Master the science of Quranic recitation with precision.
//                     Learn Makharij, Sifaat, and Ahkam through evidence-based
//                     methodology and real-time phonetic analysis.
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                     <Link href="/admissions" className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-accent hover:bg-accent/90 text-sm sm:text-base min-h-[44px]">
//                         <span className="flex items-center justify-center gap-2 sm:gap-3">
//                           START PERFECTING RECITATION
//                           <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </span>
//                       </Button>
//                     </Link>
//                     <Link href="#methodology" className="w-full sm:w-auto">
//                       <Button
//                         variant="outline"
//                         className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
//                       >
//                         VIEW METHODOLOGY
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Visual */}
//               <Reveal delay={0.4} className="lg:w-1/2">
//                 <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
//                   <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
//                     {[
//                       { value: "6", label: "Months", icon: Clock },
//                       { value: "Small", label: "Groups", icon: Users },
//                       { value: "Beginner+", label: "Level", icon: Target },
//                       { value: "Live", label: "Correction", icon: Mic },
//                     ].map((stat, idx) => (
//                       <div key={idx} className="space-y-1">
//                         <div className="text-2xl sm:text-3xl font-black text-accent">
//                           {stat.value}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {stat.label}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-4 sm:p-6 rounded-xl bg-accent/10 border border-accent/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
//                       <div className="font-black text-base sm:text-lg uppercase tracking-tight">
//                         Audio Analysis Technology
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Real-time spectral analysis of your recitation with
//                       pinpoint feedback
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Program Highlights */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Master Every{" "}
//                   <span className="text-accent italic">Aspect</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Comprehensive coverage of Tajweed rules with practical
//                   application
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Mic,
//                   title: "Makharij Al-Huruf",
//                   description: "Precise articulation points of each letter",
//                 },
//                 {
//                   icon: Volume2,
//                   title: "Sifaat Al-Huruf",
//                   description: "Inherent characteristics of Arabic letters",
//                 },
//                 {
//                   icon: Music,
//                   title: "Ahkam Al-Tajweed",
//                   description: "Rules of Noon, Meem, Madd, and Ghunnah",
//                 },
//                 {
//                   icon: Headphones,
//                   title: "Practical Application",
//                   description: "Live recitation with instant correction",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 text-center hover:border-accent/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       {item.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Curriculum Structure */}
//       <section id="curriculum" className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Structured{" "}
//                   <span className="text-accent italic">Curriculum</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   A systematic 6-month journey to perfect Quranic recitation
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-6 sm:space-y-8">
//               {[
//                 {
//                   phase: "Phase 1",
//                   title: "Foundation (2 Months)",
//                   description: "Establish proper articulation and basic rules",
//                   points: [
//                     "Makharij Al-Huruf (17 articulation points)",
//                     "Sifaat Lazimah (permanent characteristics)",
//                     "Basic Noon & Meem rules",
//                     "Short Madd pronunciation",
//                   ],
//                 },
//                 {
//                   phase: "Phase 2",
//                   title: "Intermediate Rules (2 Months)",
//                   description: "Master complex Tajweed regulations",
//                   points: [
//                     "Ghunnah (nasalization)",
//                     "Qalqalah (echo sound)",
//                     "Idgham (merging)",
//                     "Ikhfa (concealment)",
//                   ],
//                 },
//                 {
//                   phase: "Phase 3",
//                   title: "Advanced Application (2 Months)",
//                   description: "Fluency and practical recitation mastery",
//                   points: [
//                     "Madd (lengthening) rules",
//                     "Waqf (stopping) rules",
//                     "Surah application",
//                     "Speed and fluency development",
//                   ],
//                 },
//               ].map((phase, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-accent/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-6">
//                       <div className="md:w-48 flex-shrink-0">
//                         <div className="inline-flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-black">
//                             {phase.phase}
//                           </div>
//                           <div className="font-black text-lg uppercase tracking-tight">
//                             {phase.title}
//                           </div>
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           {phase.description}
//                         </p>
//                       </div>

//                       <div className="flex-1">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           {phase.points.map((point, idx) => (
//                             <div
//                               key={idx}
//                               className="flex items-center gap-3 p-3 rounded-lg bg-accent/5"
//                             >
//                               <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
//                               <span className="text-sm font-medium">
//                                 {point}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Teaching Methodology */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Scientific{" "}
//                   <span className="text-accent italic">Methodology</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Evidence-based approach combining traditional knowledge with
//                   modern technology
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Mic,
//                   title: "Live Correction Sessions",
//                   description:
//                     "Real-time feedback from Ijazah-certified Tajweed specialists during small group sessions (max 4 students).",
//                 },
//                 {
//                   icon: Headphones,
//                   title: "Audio Spectrum Analysis",
//                   description:
//                     "Visual feedback on pitch, tone, and pronunciation accuracy using advanced audio analysis software.",
//                 },
//                 {
//                   icon: Zap,
//                   title: "Progress Tracking",
//                   description:
//                     "Detailed analytics on error patterns, improvement rates, and mastery levels for each Tajweed rule.",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 h-full hover:border-accent/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-3">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Certification */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-accent/20">
//                 <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//                   <div className="lg:w-1/3">
//                     <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
//                       <Award className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
//                     </div>
//                   </div>

//                   <div className="lg:w-2/3 text-center lg:text-left">
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-4">
//                       Tajweed{" "}
//                       <span className="text-accent italic">Certification</span>
//                     </h2>
//                     <p className="text-lg sm:text-xl text-muted-foreground font-light mb-6">
//                       Upon successful completion, receive a recognized Tajweed
//                       certification verifying your mastery of Quranic recitation
//                       rules. Includes assessment by multiple scholars and
//                       practical recitation examination.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                       <Link href="/admissions">
//                         <Button className="rounded-full px-8 py-4 font-black bg-accent hover:bg-accent/90 min-h-[44px]">
//                           EARN CERTIFICATION
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-accent/20">
//                 <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-accent" />

//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
//                   Perfect Your{" "}
//                   <span className="text-accent italic">Recitation</span>
//                 </h2>

//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
//                   Join students who have transformed their Quranic recitation
//                   through scientific Tajweed mastery
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link href="/admissions">
//                     <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-accent hover:bg-accent/90 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
//                       <span className="flex items-center gap-3">
//                         ENROLL NOW
//                         <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </span>
//                     </Button>
//                   </Link>

//                   <Link href="/contact">
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
//                     >
//                       FREE ASSESSMENT
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-border/50">
//                   <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-accent" />
//                       Free Trial Session
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-accent" />
//                       Small Group Learning
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-accent" />
//                       Audio Analysis Tools
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Frequently Asked{" "}
//                   <span className="text-accent italic">Questions</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light">
//                   Common questions about Tajweed mastery
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "Do I need prior Arabic knowledge?",
//                   a: "Basic Arabic reading ability is required. If you can read Quranic text (even slowly), you're ready to start Tajweed. We also offer basic Arabic reading as a supplemental module.",
//                 },
//                 {
//                   q: "How much time commitment is required?",
//                   a: "3-5 hours weekly: 2 hours of live sessions and 1-3 hours of practice. The program is designed to fit alongside work or study commitments.",
//                 },
//                 {
//                   q: "What if I miss a live session?",
//                   a: "All sessions are recorded and available in your portal. You can review the material and submit practice recordings for feedback.",
//                 },
//                 {
//                   q: "Is there homework or practice required?",
//                   a: "Yes, daily practice is essential for mastery. We provide structured practice exercises with audio submission for feedback.",
//                 },
//                 {
//                   q: "What technology do I need?",
//                   a: "A computer or tablet with a microphone. We recommend headphones for better audio quality during analysis.",
//                 },
//               ].map((faq, index) => (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <div className="institutional-card p-6 sm:p-8 hover:border-accent/30 transition-all duration-300">
//                     <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-3">
//                       {faq.q}
//                     </h3>
//                     <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
//                       {faq.a}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>

//             <Reveal delay={0.3}>
//               <div className="mt-12 text-center">
//                 <p className="text-lg text-muted-foreground mb-6">
//                   Still have questions about Tajweed mastery?
//                 </p>
//                 <Link href="/contact">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 font-black border-accent text-accent hover:bg-accent/10"
//                   >
//                     CONTACT OUR TAJWEED SPECIALISTS
//                   </Button>
//                 </Link>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }











// app/courses/tajweed/page.tsx
"use client";

import { PricingCalculatorTajweed } from "@/components/public/pricing/pricing-calculator-universal";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  Crown,
  Gem,
  Headphones,
  Heart,
  MessageCircle,
  Mic,
  Quote,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  Volume2
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Program Data
const PROGRAM_DATA = {
  name: "Tajweed Al-Itqan",
  tagline: "Master the Science of Recitation",
  description:
    "A comprehensive, scientifically-structured program to master the rules of Tajweed with precision, enabling you to recite the Quran as it was revealed.",
  audience: "All Levels • Teens to Adults",
  duration: "6-12 months",
  sessionsPerWeek: "2-3 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 or Small Groups",
  level: "Beginner to Advanced",
  priceRange: "$89",
  pricePeriod: "per month",
};

// Core Pillars of Tajweed
const PILLARS = [
  {
    icon: Mic,
    title: "Makharij Al-Huruf",
    description: "Precise articulation points of every letter",
    audience: "Foundation",
  },
  {
    icon: Volume2,
    title: "Sifaat Al-Huruf",
    description: "Inherent and circumstantial characteristics of letters",
    audience: "Core Knowledge",
  },
  {
    icon: Activity,
    title: "Ahkam Al-Tajweed",
    description: "Rules of Noon, Meem, Madd, and Ghunnah",
    audience: "Application",
  },
  {
    icon: Headphones,
    title: "Audio Analysis",
    description: "Real-time spectral analysis of your recitation",
    audience: "Technology",
  },
  {
    icon: Target,
    title: "Live Correction",
    description: "Immediate feedback from certified scholars",
    audience: "Practice",
  },
  {
    icon: Award,
    title: "Ijazah Pathway",
    description: "Progress toward formal Tajweed certification",
    audience: "Advanced",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-3",
    focus: "Master Makharij and basic Sifaat",
    topics: [
      "17 articulation points",
      "Permanent characteristics",
      "Basic Noon & Meem rules",
      "Short Madd pronunciation",
    ],
    icon: Mic,
  },
  {
    stage: "Intermediate Phase",
    duration: "Months 4-7",
    focus: "Master all Tajweed rules",
    topics: [
      "Ghunnah (nasalization)",
      "Qalqalah (echo sound)",
      "Idgham (merging)",
      "Ikhfa (concealment)",
      "Advanced Madd rules",
    ],
    icon: Volume2,
  },
  {
    stage: "Advanced Phase",
    duration: "Months 8-12",
    focus: "Fluency and practical application",
    topics: [
      "Waqf (stopping) rules",
      "Complete Surah application",
      "Speed and fluency development",
      "Ijazah preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Beginners",
    icon: User,
    pace: "Gentle & Thorough",
    duration: "10-12 months",
    features: ["Foundational rules", "Slow progression", "Regular revision", "Building confidence"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    audience: "Intermediate",
    icon: TrendingUp,
    pace: "Structured & Efficient",
    duration: "7-9 months",
    features: ["Advanced rules", "Practical application", "Mistake correction", "Fluency focus"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    audience: "Advanced",
    icon: Crown,
    pace: "Intensive & Precision",
    duration: "5-7 months",
    features: ["Ijazah preparation", "Teaching methodology", "Master-level recitation", "Scholar feedback"],
    color: "from-teal-500 to-blue-500",
  },
  {
    audience: "Children (10+)",
    icon: Users,
    pace: "Engaging & Fun",
    duration: "10-12 months",
    features: ["Simplified rules", "Interactive games", "Audio visuals", "Progress rewards"],
    color: "from-sky-500 to-blue-500",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Aisha, 28",
    type: "Tajweed Graduate",
    story: "The audio analysis technology helped me correct mistakes I didn't even know I had. Now I recite with confidence.",
    duration: "8 months",
    icon: User,
  },
  {
    name: "Omar, 35",
    type: "Professional",
    story: "The flexible schedule and structured approach made learning Tajweed possible alongside my full-time job.",
    duration: "10 months",
    icon: Briefcase,
  },
  {
    name: "Fatima, 42",
    type: "Mother",
    story: "Learning Tajweed has transformed my Salah. The teachers are incredibly patient and knowledgeable.",
    duration: "9 months",
    icon: Heart,
  },
  {
    name: "Yusuf, 16",
    type: "Teen",
    story: "The interactive lessons and live correction kept me engaged. I've mastered all the rules and now help my siblings!",
    duration: "7 months",
    icon: User,
  },
];

// FAQ
const FAQS = [
  { q: "Do I need to know Arabic to start Tajweed?", a: "Basic Quran reading ability is required. If you can read Quranic text (even slowly), you're ready to start Tajweed." },
  { q: "How much practice is needed daily?", a: "We recommend 15-20 minutes of daily practice. Consistency matters more than quantity." },
  { q: "What technology do I need?", a: "A computer or tablet with a microphone. Headphones are recommended for better audio analysis." },
  { q: "What if I miss a class?", a: "All sessions are recorded and available in your portal. You can review and submit practice recordings for feedback." },
  { q: "Is there homework?", a: "Yes, structured practice exercises with audio submission for personalized feedback." },
  { q: "Do I get a certificate?", a: "Yes! Upon completion, you receive a Tajweed certification recognized by our scholarly council." },
];

export default function TajweedProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Scientific Blue Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🎙️ Scientific Phonetics Certification 🎙️
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Tajweed{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-600 whitespace-nowrap">
                Al-Itqan
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Master the science of Quranic recitation with precision. Learn Makharij, Sifaat, and Ahkam through evidence-based methodology and real-time phonetic analysis.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-800 hover:to-cyan-800 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    MASTER TAJWEED
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-blue-600 text-blue-600">
                  EXPLORE THE SCIENCE
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Tajweed Rules", value: "40+", icon: BookOpen },
                { label: "Articulation Points", value: "17", icon: Mic },
                { label: "Success Rate", value: "96%", icon: Target },
                { label: "Certified Graduates", value: "150+", icon: Award },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-100 dark:border-blue-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-blue-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of Recitation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master Every <span className="text-blue-600 italic">Aspect</span> of Tajweed
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Comprehensive coverage of all Tajweed rules with practical application
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-blue-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-blue-600 font-black mt-1">{pillar.audience}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Paths */}
      <section id="paths" className="py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-blue-600 italic">Tailored to Your Level</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different levels - all leading to mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-blue-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-blue-600 italic">Curriculum</span> for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 6-12 month journey to perfect Quranic recitation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-blue-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-blue-600 italic">Pricing</span> That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen duration, frequency, and learning intensity
            </p>
          </div>

          <PricingCalculatorTajweed dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on scholar assignment and your specific requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-blue-50/5 to-cyan-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-blue-600 italic">Graduates</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who perfected their recitation with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-blue-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 dark:text-blue-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">"{story.story}"</p>
                    <p className="text-[10px] sm:text-xs text-blue-600 font-black mt-3">✓ Completed in {story.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-blue-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base mb-1 sm:mb-2">{faq.q}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-blue-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-blue-600/5 to-cyan-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 sm:mb-6 shadow-lg">
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Perfect Your Recitation Today</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Master the science of Tajweed with expert guidance. Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-blue-600 text-blue-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 20-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🎙️ Audio analysis technology</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📖 Ijazah certification path</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

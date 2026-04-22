// import {
//   Languages,
//   BookOpen,
//   MessageSquare,
//   Globe,
//   Sparkles,
//   Target,
//   Clock,
//   Users,
//   CheckCircle2,
//   ArrowRight,
//   Brain,
//   PenTool,
//   FileText,
//   Award,

// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";

// export default function ArabicFluencyPage() {
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
//                 className="hover:text-gold transition-colors"
//               >
//                 Programs
//               </Link>
//               <span className="mx-2">/</span>
//               <span className="text-gold font-medium">Arabic Fluency</span>
//             </div>

//             {/* Hero Content */}
//             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
//               <div className="lg:w-1/2 space-y-4 sm:space-y-6">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-3.5 h-3.5" /> Quran-Centric Language
//                     Mastery
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
//                     Al-Lughah{" "}
//                     <span className="text-gold italic">Al-Arabiyyah</span>
//                     <br />
//                     Fluency Program
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
//                     Understand the Quran in its divine language. Master
//                     Classical Arabic through Quranic texts, not artificial
//                     sentences. Read, comprehend, and appreciate the Quran in its
//                     original form.
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                     <Link href="/admissions" className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-gold hover:bg-gold/90 text-white text-sm sm:text-base min-h-11">
//                         <span className="flex items-center justify-center gap-2 sm:gap-3">
//                           START LANGUAGE JOURNEY
//                           <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </span>
//                       </Button>
//                     </Link>
//                     <Link href="#curriculum" className="w-full sm:w-auto">
//                       <Button
//                         variant="outline"
//                         className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11"
//                       >
//                         VIEW CURRICULUM
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Visual */}
//               <Reveal delay={0.4} className="lg:w-1/2">
//                 <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-gold/5 to-gold/10 border-2 border-gold/20">
//                   <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
//                     {[
//                       { value: "1", label: "Year", icon: Clock },
//                       { value: "1-1", label: "Sessions", icon: Users },
//                       { value: "All Levels", label: "Level", icon: Target },
//                       { value: "Quranic", label: "Focus", icon: BookOpen },
//                     ].map((stat, idx) => (
//                       <div key={idx} className="space-y-1">
//                         <div className="text-2xl sm:text-3xl font-black text-gold">
//                           {stat.value}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {stat.label}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-4 sm:p-6 rounded-xl bg-gold/10 border border-gold/20">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
//                       <div className="font-black text-base sm:text-lg uppercase tracking-tight">
//                         Quran-Centric Methodology
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Learn Arabic through authentic Quranic texts and classical
//                       literature
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Program Highlights */}
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-gold/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Master Classical{" "}
//                   <span className="text-gold italic">Arabic</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Comprehensive language skills for Quranic comprehension and
//                   classical literature
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: BookOpen,
//                   title: "Quranic Vocabulary",
//                   description:
//                     "Master 80% of Quranic words through thematic study",
//                 },
//                 {
//                   icon: Brain,
//                   title: "Classical Grammar",
//                   description:
//                     "Nahw (syntax) and Sarf (morphology) fundamentals",
//                 },
//                 {
//                   icon: MessageSquare,
//                   title: "Comprehension Skills",
//                   description: "Understand Quranic verses and classical texts",
//                 },
//                 {
//                   icon: PenTool,
//                   title: "Writing & Expression",
//                   description: "Construct Arabic sentences and express ideas",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 text-center hover:border-gold/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
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

//       {/* Learning Path */}
//       <section id="curriculum" className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Structured{" "}
//                   <span className="text-gold italic">Learning Path</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   One-year journey from absolute beginner to Quranic
//                   comprehension
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-6 sm:space-y-8">
//               {[
//                 {
//                   phase: "1",
//                   title: "Foundation & Basics (4 Months)",
//                   description:
//                     "Establish core language skills and Quranic reading",
//                   points: [
//                     "Arabic alphabet & pronunciation",
//                     "Basic vocabulary (500+ Quranic words)",
//                     "Simple sentence structure",
//                     "Reading Quranic text with vowels",
//                   ],
//                 },
//                 {
//                   phase: "2",
//                   title: "Grammar & Structure (4 Months)",
//                   description:
//                     "Master classical Arabic grammar for comprehension",
//                   points: [
//                     "Nahw: Case endings (I'rab)",
//                     "Sarf: Verb conjugation patterns",
//                     "Intermediate vocabulary (1000+ words)",
//                     "Quranic verse analysis",
//                   ],
//                 },
//                 {
//                   phase: "3",
//                   title: "Fluency & Application (4 Months)",
//                   description:
//                     "Develop reading fluency and comprehension skills",
//                   points: [
//                     "Advanced grammar topics",
//                     "Classical text reading",
//                     "Tafsir integration",
//                     "Independent Quran reading",
//                   ],
//                 },
//               ].map((phase, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-gold/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-6">
//                       <div className="md:w-48 shrink-0">
//                         <div className="inline-flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 p-4 rounded-lg bg-gold text-white flex items-center justify-center text-sm font-black">
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
//                               className="flex items-center gap-3 p-3 rounded-lg bg-gold/5"
//                             >
//                               <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
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
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-gold/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Immersive{" "}
//                   <span className="text-gold italic">Methodology</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Learn Arabic the natural way through meaningful context and
//                   application
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Languages,
//                   title: "Quran-Centric Curriculum",
//                   description:
//                     "Learn vocabulary and grammar through actual Quranic verses. Every lesson connects directly to Quran comprehension.",
//                 },
//                 {
//                   icon: Users,
//                   title: "Interactive Group Learning",
//                   description:
//                     "Practice conversation and comprehension in small groups (max 6 students) with native Arabic instructors.",
//                 },
//                 {
//                   icon: FileText,
//                   title: "Comprehensive Resources",
//                   description:
//                     "Access to classical texts, modern materials, vocabulary builders, and comprehension exercises.",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 h-full hover:border-gold/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
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

//       {/* Outcomes & Certification */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-gold/20">
//                 <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//                   <div>
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-6">
//                       Program <span className="text-gold italic">Outcomes</span>
//                     </h2>

//                     <div className="space-y-4">
//                       {[
//                         "Read Quranic Arabic with understanding",
//                         "Comprehend 80% of Quranic vocabulary",
//                         "Analyze basic Arabic grammar in texts",
//                         "Read classical Arabic literature",
//                         "Understand Tafsir in Arabic",
//                         "Continue self-study in classical works",
//                       ].map((outcome, idx) => (
//                         <div key={idx} className="flex items-center gap-3">
//                           <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
//                           <span className="font-medium">{outcome}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
//                       <Award className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
//                     </div>

//                     <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
//                       Arabic Fluency Certification
//                     </h3>

//                     <p className="text-muted-foreground mb-6">
//                       Upon successful completion, receive a recognized
//                       certification verifying your Classical Arabic proficiency,
//                       including reading comprehension and vocabulary mastery.
//                     </p>

//                     <Link href="/admissions">
//                       <Button className="rounded-full px-8 py-4 font-black bg-gold hover:bg-gold/90 text-white min-h-11">
//                         ACHIEVE FLUENCY
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-gold/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-gold/20">
//                 <Globe className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-gold" />

//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
//                   Unlock the{" "}
//                   <span className="text-gold italic">{`Quran's Language`}</span>
//                 </h2>

//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
//                   Join students who now understand the Quran in its divine
//                   language
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link href="/admissions">
//                     <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-gold hover:bg-gold/90 text-white text-base sm:text-lg min-h-11 w-full sm:w-auto">
//                       <span className="flex items-center gap-3">
//                         START LEARNING ARABIC
//                         <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </span>
//                     </Button>
//                   </Link>

//                   <Link href="/assessment">
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto"
//                     >
//                       FREE ASSESSMENT SESSION
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-border/50">
//                   <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-gold" />
//                       No Prior Arabic Required
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-gold" />
//                       1 Year to Quranic Comprehension
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-gold" />
//                       Quran-Centric Materials
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
//                   Arabic Learning{" "}
//                   <span className="text-gold italic">Questions</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light">
//                   Common questions about Arabic fluency
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "I have no Arabic background. Can I really learn in one year?",
//                   a: "Yes! Our curriculum is designed for absolute beginners. With consistent effort (5-7 hours weekly), students can achieve basic Quran comprehension within a year.",
//                 },
//                 {
//                   q: "What's the difference between Classical and Modern Arabic?",
//                   a: "Classical Arabic is the language of the Quran and classical literature. Modern Standard Arabic is used in media. We focus on Classical for Quran comprehension, with exposure to Modern for practical application.",
//                 },
//                 {
//                   q: "How much daily practice is required?",
//                   a: "We recommend 30-45 minutes daily for optimal progress. This includes vocabulary review, grammar exercises, and reading practice.",
//                 },
//                 {
//                   q: "Can I join if I already know some Arabic?",
//                   a: "Yes! We offer assessment session to determine your level. You can join at any trimester based on your current proficiency.",
//                 },
//                 {
//                   q: "What materials are provided?",
//                   a: "Digital textbooks, vocabulary apps, audio lessons, reading materials, and access to our Arabic learning portal with interactive exercises.",
//                 },
//               ].map((faq, index) => (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <div className="institutional-card p-6 sm:p-8 hover:border-gold/30 transition-all duration-300">
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
//                   Ready to understand the Quran in Arabic?
//                 </p>
//                 <Link href="/contact">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 font-black border-gold text-gold hover:bg-gold/10"
//                   >
//                     SPEAK TO ARABIC INSTRUCTOR
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




// app/courses/arabic/page.tsx
"use client";

import { PricingCalculatorArabic } from "@/components/public/pricing/pricing-calculator-universal";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Compass,
  Crown,
  Gem,
  Globe,
  Languages,
  MessageCircle,
  PenTool,
  Quote,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
// import { FAQSection } from "./faq";

// Program Data
const PROGRAM_DATA = {
  name: "Al-Lughah Al-Arabiyyah",
  tagline: "Unlock the Language of the Quran",
  description:
    "A comprehensive program to master Classical Arabic, enabling you to understand the Quran directly, read classical texts, and develop fluency in the language of revelation.",
  audience: "All Levels • Teens to Adults",
  duration: "12-18 months",
  sessionsPerWeek: "2-3 sessions",
  sessionDuration: "60-75 minutes",
  format: "1-on-1 or Small Groups",
  level: "Beginner to Advanced",
  priceRange: "$79",
  pricePeriod: "per month",
};

// Core Pillars of Arabic
const PILLARS = [
  {
    icon: PenTool,
    title: "Nahw (Grammar)",
    description: "Master sentence structure and syntax rules",
    audience: "Foundation",
  },
  {
    icon: BookOpen,
    title: "Sarf (Morphology)",
    description: "Understand verb conjugation and word patterns",
    audience: "Core Knowledge",
  },
  {
    icon: Languages,
    title: "Quranic Vocabulary",
    description: "Master 80% of Quranic words through thematic study",
    audience: "Application",
  },
  {
    icon: Globe,
    title: "Classical Literature",
    description: "Read authentic Arabic texts and poetry",
    audience: "Advanced",
  },
  {
    icon: MessageCircle,
    title: "Conversation Skills",
    description: "Practice speaking and comprehension",
    audience: "Practical",
  },
  {
    icon: Brain,
    title: "Tafsir Integration",
    description: "Understand Quranic verses in original Arabic",
    audience: "Spiritual Connection",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-6",
    focus: "Build strong grammar and vocabulary foundation",
    topics: [
      "Arabic alphabet & pronunciation",
      "Basic sentence structure",
      "500+ Quranic words",
      "Simple reading comprehension",
    ],
    icon: PenTool,
  },
  {
    stage: "Intermediate Phase",
    duration: "Months 7-12",
    focus: "Master grammar rules and expand vocabulary",
    topics: [
      "Advanced Nahw (I'rab)",
      "Sarf conjugation patterns",
      "1000+ Quranic words",
      "Quranic verse analysis",
    ],
    icon: BookOpen,
  },
  {
    stage: "Advanced Phase",
    duration: "Months 13-18",
    focus: "Fluency and classical text reading",
    topics: [
      "Classical literature reading",
      "Tafsir integration",
      "Independent translation",
      "Teaching methodology",
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
    duration: "16-18 months",
    features: ["Alphabet mastery", "Basic grammar", "Simple vocabulary", "Reading practice"],
    color: "from-amber-500 to-orange-500",
  },
  {
    audience: "Intermediate",
    icon: TrendingUp,
    pace: "Structured & Efficient",
    duration: "12-15 months",
    features: ["Advanced grammar", "Extensive vocabulary", "Text analysis", "Conversation"],
    color: "from-orange-500 to-amber-500",
  },
  {
    audience: "Advanced",
    icon: Crown,
    pace: "Intensive & Scholarly",
    duration: "10-12 months",
    features: ["Classical texts", "Tafsir study", "Research skills", "Teaching prep"],
    color: "from-amber-600 to-orange-600",
  },
  {
    audience: "Professionals",
    icon: Briefcase,
    pace: "Flexible & Practical",
    duration: "14-16 months",
    features: ["Weekend options", "Practical focus", "Modern Arabic", "Business terms"],
    color: "from-orange-600 to-amber-700",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Abdullah, 35",
    type: "Beginner",
    story: "I started with no Arabic knowledge. Now I can read the Quran and understand its meanings. The structured approach made it easy to follow.",
    duration: "18 months",
    icon: User,
  },
  {
    name: "Abdullah, 22",
    type: "Intermediate",
    story: "I had some basic Arabic but struggled with grammar. The program's focus on classical texts helped me gain confidence and fluency.",
    duration: "14 months",
    icon: TrendingUp,
  },
    {
      name: "Mariam, 30",
      type: "Advanced",
      story: "I wanted to deepen my understanding of the Quran. The advanced phase challenged me but ultimately allowed me to read classical literature and tafsir in Arabic.",
      duration: "12 months",
      icon: Crown,
    },

  {
    name: "Mubarak, 28",
    type: "Professional",
    story: "The flexible schedule and patient teachers helped me balance work and learning. I can now understand Quranic Arabic directly!",
    duration: "16 months",
    icon: Briefcase,
  },

  // {
  //   name: "Yusuf, 19",
  //   type: "University Student",
  //   story: "The program gave me a strong foundation in Arabic grammar. I'm now able to read classical texts with confidence.",
  //   duration: "12 months",
  //   icon: GraduationCap,
  // },
];

// FAQ
const FAQS = [
  { q: "Do I need any prior Arabic knowledge?", a: "No! Our program is designed for absolute beginners. We start from the alphabet and build gradually." },
  { q: "How much time should I dedicate daily?", a: "We recommend 15-30 minutes of daily practice. Consistency is more important than quantity." },
  { q: "What's the difference between Classical and Modern Arabic?", a: "We focus on Classical Arabic for Quran comprehension, with exposure to Modern Arabic for practical application." },
  { q: "Can I join if I already know some Arabic?", a: "Yes! We offer placement tests to determine your level. You can join at any stage." },
  { q: "What materials are provided?", a: "Digital textbooks, vocabulary apps, audio lessons, reading materials, and access to our Arabic learning portal." },
  { q: "Will I be able to understand the Quran?", a: "Yes! By the end of the program, you'll be able to understand 80% of Quranic vocabulary and basic sentence structures." },
];

export default function ArabicProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Warm Amber/Orange Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 📖 Unlock the Language of the Quran 📖
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Al-Lughah{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-700 via-orange-600 to-gold whitespace-nowrap">
                Al-Arabiyyah
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              {`Master the language of the Quran. Understand Allah's words directly, read classical texts, and connect deeply with Islamic heritage.`}
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-linear-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    BEGIN YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-amber-600 text-amber-600">
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Quranic Words", value: "80%", icon: BookOpen },
                { label: "Grammar Rules", value: "100+", icon: PenTool },
                { label: "Success Rate", value: "94%", icon: Target },
                { label: "Active Students", value: "100+", icon: Users },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-amber-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-linear-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Languages className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of Arabic
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master Every <span className="text-amber-600 italic">Aspect</span> of Arabic
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Comprehensive coverage of grammar, vocabulary, and comprehension
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-amber-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground wrap-break-word">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-amber-600 font-black mt-1">{pillar.audience}</p>
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
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-amber-600 italic">Tailored to Your Level</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different levels - all leading to Arabic fluency
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-linear-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-amber-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-linear-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Fluency
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-amber-600 italic">Curriculum</span> for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 12-18 month journey to Arabic mastery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-500 via-orange-500 to-gold" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-amber-600 to-orange-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 text-amber-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-linear-to-r from-amber-600 to-orange-600 rounded-full"
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
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-amber-600 italic">Pricing</span> That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen duration, frequency, and learning intensity
            </p>
          </div>

          <PricingCalculatorArabic dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on scholar assignment and your specific requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-linear-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-amber-600 italic">Graduates</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who unlocked the language of the Quran with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-amber-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-amber-200 dark:text-amber-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed wrap-break-word">{`"${story.story}"`}</p>
                    <p className="text-[10px] sm:text-xs text-amber-600 font-black mt-3">✓ Completed in {story.duration}</p>
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
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-amber-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-linear-to-br from-amber-600/5 to-orange-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-600 to-orange-600 mb-4 sm:mb-6 shadow-lg">
              <Languages className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Unlock the Language of the Quran</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Master Classical Arabic with expert guidance. Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-amber-600 text-amber-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 20-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📖 80% Quranic vocabulary mastery</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🎓 Certificate upon completion</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
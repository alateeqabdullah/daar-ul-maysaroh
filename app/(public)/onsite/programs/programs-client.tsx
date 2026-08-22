// // app/(marketing)/onsite/programs/programs-client.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   BookOpen,
//   CheckCircle2,
//   Clock,
//   Crown,
//   Globe,
//   GraduationCap,
//   Heart,
//   Moon,
//   Shield,
//   Star,
//   Sun,
//   Sparkles,
//   TrendingUp,
// } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// // ============================================================
// // PROGRAM DATA
// // ============================================================

// const PROGRAMS = [
//   {
//     slug: "full-time-boarding",
//     title: "Full-Time Boarding",
//     subtitle: "Complete Immersion",
//     icon: Moon,
//     color: "purple",
//     badge: "Premium",
//     description:
//       "Complete immersion in the Quranic environment with 24/7 supervision, support, and accelerated memorization.",
//     features: [
//       "Full-time campus living",
//       "Immersive environment",
//       "24/7 supervision",
//       "Accelerated memorization",
//       "Complete curriculum",
//     ],
//     duration: "2-5 Years",
//     level: "All Levels",
//     attendance: "Daily",
//   },
//   {
//     slug: "part-time-boarding",
//     title: "Part-Time Boarding",
//     subtitle: "Weekend Intensive",
//     icon: Moon,
//     color: "amber",
//     badge: "Weekend Intensive",
//     description:
//       "Weekend immersion with on-campus accommodation, perfect for out-of-town students seeking focused memorization.",
//     features: [
//       "Weekend immersion",
//       "On-campus accommodation",
//       "Full supervision",
//       "Community experience",
//       "Accelerated progress",
//     ],
//     duration: "Ongoing",
//     level: "All Levels",
//     attendance: "Fri - Sun",
//   },
//   {
//     slug: "full-time-day",
//     title: "Full-Time Day",
//     subtitle: "Comprehensive Learning",
//     icon: Sun,
//     color: "purple",
//     badge: "Most Popular",
//     description:
//       "Ideal for students seeking a comprehensive program with extended learning hours and accelerated progress.",
//     features: [
//       "5 days per week",
//       "Extended learning hours",
//       "Complete curriculum",
//       "Accelerated progress",
//       "Regular assessments",
//     ],
//     duration: "Ongoing",
//     level: "All Levels",
//     attendance: "Sat-Sun (9-4:30) • Mon-Wed (4:30-6:30)",
//   },
//   {
//     slug: "part-time-day",
//     title: "Part-Time Day",
//     subtitle: "Weekend Focus",
//     icon: Sun,
//     color: "amber",
//     badge: "Weekend",
//     description:
//       "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments.",
//     features: [
//       "2 days per week",
//       "Full academic program",
//       "Tahfeedh & Tajweed",
//       "Islamic Studies",
//     ],
//     duration: "Ongoing",
//     level: "All Levels",
//     attendance: "Sat - Sun (9:00 AM - 4:30 PM)",
//   },
// ];

// const CURRICULUM_SUBJECTS = [
//   {
//     title: "Tahfeedh",
//     subtitle: "Quran Memorization",
//     description:
//       "Complete Quran memorization with structured daily revision (Muraja'ah) and personalized pacing.",
//     icon: BookOpen,
//     color: "purple",
//     features: [
//       "Sabq (New Memorization)",
//       "Muraja'ah (Revision)",
//       "1-on-1 Sessions",
//     ],
//     duration: "2-5 Years",
//   },
//   {
//     title: "Tajweed",
//     subtitle: "Scientific Recitation",
//     description:
//       "Master Makharij, Sifaat, and rules of recitation with practical application and audio analysis.",
//     icon: Crown,
//     color: "amber",
//     features: ["Makharij & Sifaat", "Applied Practice", "Audio Analysis"],
//     duration: "1-2 Years",
//   },
//   {
//     title: "Qira'aat",
//     subtitle: "The Ten Recitations",
//     description:
//       "Study the ten authentic Qira'at with Sanad verification and Ijazah preparation.",
//     icon: Star,
//     color: "purple",
//     features: ["Ten Qira'at", "Sanad Verification", "Ijazah Track"],
//     duration: "2-3 Years",
//   },
//   {
//     title: "Islamic Studies",
//     subtitle: "Comprehensive Education",
//     description:
//       "Study Aqeedah, Fiqh, Seerah, and Hadith with authentic sources and scholarly methodology.",
//     icon: Shield,
//     color: "amber",
//     features: ["Aqeedah & Fiqh", "Seerah", "Hadith Studies"],
//     duration: "Ongoing",
//   },
//   {
//     title: "Arabic Language",
//     subtitle: "Quranic Arabic",
//     description:
//       "Learn classical Arabic grammar and vocabulary to understand the Quran directly.",
//     icon: Globe,
//     color: "purple",
//     features: ["Grammar (Nahw)", "Morphology (Sarf)", "Tafsir Reading"],
//     duration: "1-3 Years",
//   },
//   {
//     title: "Tarbiyah",
//     subtitle: "Character Development",
//     description:
//       "Cultivate Islamic manners, responsibility, and spiritual growth through daily practice.",
//     icon: Heart,
//     color: "amber",
//     features: ["Akhlaq & Manners", "Discipline", "Spiritual Development"],
//     duration: "Ongoing",
//   },
// ];

// const getColorStyles = (color: string) => {
//   const map = {
//     purple: {
//       text: "text-purple-400",
//       border: "border-purple-800/30",
//       bg: "bg-purple-600/20",
//       linear: "from-purple-500 to-purple-600",
//       glow: "shadow-purple-500/30",
//     },
//     amber: {
//       text: "text-amber-400",
//       border: "border-amber-800/30",
//       bg: "bg-amber-500/20",
//       linear: "from-amber-500 to-amber-600",
//       glow: "shadow-amber-500/30",
//     },
//   } as const;
//   return map[color as keyof typeof map] ?? map.purple;
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function ProgramsClient() {
//   const [activeTab, setActiveTab] = useState<"attendance" | "curriculum">(
//     "attendance",
//   );

//   return (
//     <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
//           style={{ backgroundSize: "300px" }}
//         />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
//       </div>

//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
//         {/* Breadcrumb */}
//         <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-8 flex-wrap">
//           <Link
//             href="/onsite"
//             className="hover:text-amber-500 transition-colors"
//           >
//             Home
//           </Link>
//           <span className="opacity-30">/</span>
//           <span className="text-amber-500">Programs</span>
//         </nav>

//         {/* ===== HERO ===== */}
//         <section className="py-8 md:py-12">
//           <Reveal>
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
//                 <GraduationCap className="w-4 h-4" />
//                 Our Programs
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
//                 Your{" "}
//                 <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
//                   Path
//                 </span>{" "}
//                 to Memorization
//               </h1>
//               <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
//                 Choose from flexible attendance options and a comprehensive
//                 curriculum designed for full-time Quran memorization.
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* ===== TAB TOGGLE ===== */}
//         <div className="flex justify-center mb-10">
//           <div className="flex gap-1 p-1 rounded-xl bg-slate-900/50 border border-slate-800/50">
//             <button
//               onClick={() => setActiveTab("attendance")}
//               className={cn(
//                 "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
//                 activeTab === "attendance"
//                   ? "bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg"
//                   : "text-slate-400 hover:text-white",
//               )}
//             >
//               Attendance Options
//             </button>
//             <button
//               onClick={() => setActiveTab("curriculum")}
//               className={cn(
//                 "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
//                 activeTab === "curriculum"
//                   ? "bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg"
//                   : "text-slate-400 hover:text-white",
//               )}
//             >
//               Curriculum
//             </button>
//           </div>
//         </div>

//         {/* ===== ATTENDANCE OPTIONS ===== */}
//         {activeTab === "attendance" && (
//           <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
//             {PROGRAMS.map((program, index) => {
//               const Icon = program.icon;
//               const colors = getColorStyles(program.color);
//               return (
//                 <Reveal key={program.slug} delay={index * 0.08}>
//                   <Link href={`/onsite/programs/${program.slug}`}>
//                     <motion.div
//                       whileHover={{ y: -4 }}
//                       className="p-6 rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 transition-all group cursor-pointer"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
//                           >
//                             <Icon className={`w-6 h-6 ${colors.text}`} />
//                           </div>
//                           <div>
//                             <h3 className="font-black text-white text-lg">
//                               {program.title}
//                             </h3>
//                             <p className={`text-xs font-black ${colors.text}`}>
//                               {program.subtitle}
//                             </p>
//                           </div>
//                         </div>
//                         <span
//                           className={`px-2 py-0.5 rounded-full text-[8px] font-black ${colors.bg} ${colors.text}`}
//                         >
//                           {program.badge}
//                         </span>
//                       </div>

//                       <p className="text-sm text-slate-400 mb-4">
//                         {program.description}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         <span className="text-xs text-slate-500 flex items-center gap-1">
//                           <Clock className="w-3.5 h-3.5 text-amber-500" />
//                           {program.attendance}
//                         </span>
//                         <span className="text-xs text-slate-500 flex items-center gap-1">
//                           <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
//                           {program.level}
//                         </span>
//                       </div>

//                       <div className="space-y-1.5 mb-4">
//                         {program.features.slice(0, 3).map((feature, idx) => (
//                           <div
//                             key={idx}
//                             className="flex items-center gap-2 text-xs"
//                           >
//                             <CheckCircle2
//                               className={`w-3.5 h-3.5 ${colors.text} shrink-0`}
//                             />
//                             <span className="text-slate-300">{feature}</span>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
//                         <span className={`text-xs font-black ${colors.text}`}>
//                           {program.duration}
//                         </span>
//                         <span className="text-xs font-black text-amber-500 flex items-center gap-1 group-hover:gap-2 transition-all">
//                           Learn More
//                           <ArrowRight className="w-3.5 h-3.5" />
//                         </span>
//                       </div>
//                     </motion.div>
//                   </Link>
//                 </Reveal>
//               );
//             })}
//           </div>
//         )}

//         {/* ===== CURRICULUM ===== */}
//         {activeTab === "curriculum" && (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
//             {CURRICULUM_SUBJECTS.map((subject, index) => {
//               const Icon = subject.icon;
//               const colors = getColorStyles(subject.color);
//               return (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <motion.div
//                     whileHover={{ y: -4 }}
//                     className="p-6 rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 transition-all group"
//                   >
//                     <div
//                       className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className={`w-6 h-6 ${colors.text}`} />
//                     </div>
//                     <h3 className="font-black text-white text-lg">
//                       {subject.title}
//                     </h3>
//                     <p
//                       className={`text-xs font-black uppercase tracking-wider ${colors.text} mb-2`}
//                     >
//                       {subject.subtitle}
//                     </p>
//                     <p className="text-sm text-slate-400 mb-4 leading-relaxed">
//                       {subject.description}
//                     </p>
//                     <div className="flex flex-wrap gap-1.5 mb-4">
//                       {subject.features.map((feature, idx) => (
//                         <span
//                           key={idx}
//                           className={`text-[8px] font-black px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-slate-500">
//                       <Clock className="w-3.5 h-3.5 text-amber-500" />
//                       <span>{subject.duration}</span>
//                     </div>
//                   </motion.div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         )}

//         {/* ===== BOTTOM CTA ===== */}
//         <section className="py-12 md:py-16">
//           <Reveal>
//             <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-linear-to-br from-purple-600/10 to-amber-500/10">
//               <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-black text-white mb-3">
//                 Ready to Start Your Journey?
//               </h2>
//               <p className="text-slate-300 mb-5 max-w-md mx-auto">
//                 Choose your program and begin your path to Quranic excellence.
//               </p>
//               <Link href="/onsite/admissions">
//                 <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
//                   Apply Now
//                   <ArrowRight className="w-4 h-4 ml-2 inline" />
//                 </Button>
//               </Link>
//             </div>
//           </Reveal>
//         </section>
//       </div>
//     </main>
//   );
// }











// app/(marketing)/onsite/programs/programs-client.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Crown,
  Globe,
  GraduationCap,
  Heart,
  Moon,
  Shield,
  Star,
  Sun,
  Target,
  Sparkles,
  Users,
 
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// ============================================================
// PROGRAM DATA
// ============================================================

const PROGRAMS = [
  {
    slug: "full-time-boarding",
    title: "Full-Time Boarding",
    subtitle: "Complete Immersion",
    icon: Moon,
    color: "purple",
    badge: "Premium",
    description:
      "Complete immersion in the Quranic environment with 24/7 supervision, support, and accelerated memorization.",
    features: [
      "Full-time campus living",
      "Immersive environment",
      "24/7 supervision",
      "Accelerated memorization",
      "Complete curriculum",
    ],
    duration: "1-3 Years",
    level: "All Levels",
    attendance: "Daily",
  },
  {
    slug: "part-time-boarding",
    title: "Part-Time Boarding",
    subtitle: "Weekend Intensive",
    icon: Moon,
    color: "amber",
    badge: "Weekend Intensive",
    description:
      "Weekend immersion with on-campus accommodation, perfect for out-of-town students seeking focused memorization.",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community experience",
      "Accelerated progress",
    ],
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Fri - Sun",
  },
  {
    slug: "full-time-day",
    title: "Full-Time Day",
    subtitle: "Comprehensive Learning",
    icon: Sun,
    color: "purple",
    badge: "Most Popular",
    description:
      "Ideal for students seeking a comprehensive program with extended learning hours and accelerated progress.",
    features: [
      "5 days per week",
      "Extended learning hours",
      "Complete curriculum",
      "Accelerated progress",
      "Regular assessments",
    ],
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Sat-Sun (9-4:30) • Mon-Wed (4:30-6:30)",
  },
  {
    slug: "part-time-day",
    title: "Part-Time Day",
    subtitle: "Weekend Focus",
    icon: Sun,
    color: "amber",
    badge: "Weekend",
    description:
      "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments.",
    features: [
      "2 days per week",
      "Full academic program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Sat - Sun (9:00 AM - 4:30 PM)",
  },
];

const CURRICULUM_SUBJECTS = [
  {
    title: "Tahfeedh",
    subtitle: "Quran Memorization",
    description:
      "Complete Quran memorization with structured daily revision (Muraja'ah) and personalized pacing.",
    icon: BookOpen,
    color: "purple",
    features: ["Sabq (New Memorization)", "Muraja'ah (Revision)", "1-on-1 Sessions"],
    duration: "1-5 Years",
  },
  {
    title: "Tajweed",
    subtitle: "Scientific Recitation",
    description:
      "Master Makharij, Sifaat, and rules of recitation with practical application and audio analysis.",
    icon: Crown,
    color: "amber",
    features: ["Makharij & Sifaat", "Applied Practice", "Audio Analysis"],
    duration: "1-2 Years",
  },
  {
    title: "Qira'aat",
    subtitle: "The Ten Recitations",
    description:
      "Study the ten authentic Qira'at with Sanad verification and Ijazah preparation.",
    icon: Star,
    color: "purple",
    features: ["Ten Qira'at", "Sanad Verification", "Ijazah Track"],
    duration: "2-3 Years",
  },
  {
    title: "Islamic Studies",
    subtitle: "Comprehensive Education",
    description:
      "Study Aqeedah, Fiqh, Seerah, and Hadith with authentic sources and scholarly methodology.",
    icon: Shield,
    color: "amber",
    features: ["Aqeedah & Fiqh", "Seerah", "Hadith Studies"],
    duration: "Ongoing",
  },
  {
    title: "Arabic Language",
    subtitle: "Quranic Arabic",
    description:
      "Learn classical Arabic grammar and vocabulary to understand the Quran directly.",
    icon: Globe,
    color: "purple",
    features: ["Grammar (Nahw)", "Morphology (Sarf)", "Tafsir Reading"],
    duration: "1-4 Years",
  },
  {
    title: "Tarbiyah",
    subtitle: "Character Development",
    description:
      "Cultivate Islamic manners, responsibility, and spiritual growth through daily practice.",
    icon: Heart,
    color: "amber",
    features: ["Akhlaq & Manners", "Discipline", "Spiritual Development"],
    duration: "Ongoing",
  },
];

// ============================================================
// COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// ============================================================

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/30",
      bg: "bg-purple-100 dark:bg-purple-600/20",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
      glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
      card: "bg-white dark:bg-slate-900/30",
    },
    amber: {
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/30",
      bg: "bg-amber-100 dark:bg-amber-500/20",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
      glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
      hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
      card: "bg-white dark:bg-slate-900/30",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

// ============================================================
// ANIMATED COUNTER
// ============================================================

function AnimatedCounter({ value, suffix = "", prefix = "" }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const target = parseInt(value.replace(/[^0-9]/g, ""));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ProgramsClient() {
  const [activeTab, setActiveTab] = useState<"attendance" | "curriculum">("attendance");

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background Effects - Light/Dark aware */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-[200px]" />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
            animate={{
              y: [0, -60 - Math.random() * 100, 0],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
          <Link href="/onsite" className="hover:text-purple-600 dark:hover:text-amber-500 transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600 dark:text-amber-500">Programs</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              Our Programs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-foreground">
              Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Path
              </span>{" "}
              to Memorization
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Choose from flexible attendance options and a comprehensive
              curriculum designed for full-time Quran memorization.
            </p>
          </motion.div>
        </section>

        {/* ===== STATS ROW ===== */}
        <section className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "4", label: "Programs", icon: GraduationCap, color: "purple" },
              { value: "50+", label: "Active Students", icon: Users, color: "amber" },
              { value: "1:1", label: "Teacher Ratio", icon: Users, color: "purple" },
              { value: "1400+", label: "Years of Sanad", icon: Shield, color: "amber" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              const colors = getColorStyles(stat.color);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===== TAB TOGGLE ===== */}
        <div className="flex justify-center mb-10 mt-8">
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 dark:bg-slate-900/50 border border-border dark:border-slate-800/50">
            <button
              onClick={() => setActiveTab("attendance")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeTab === "attendance"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg"
                  : "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
              )}
            >
              Attendance Options
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeTab === "curriculum"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg"
                  : "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
              )}
            >
              Curriculum
            </button>
          </div>
        </div>

        {/* ===== ATTENDANCE OPTIONS ===== */}
        {activeTab === "attendance" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PROGRAMS.map((program, index) => {
              const Icon = program.icon;
              const colors = getColorStyles(program.color);
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/onsite/programs/${program.slug}`}>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group cursor-pointer shadow-lg hover:shadow-2xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <div>
                            <h3 className="font-black text-foreground text-lg">
                              {program.title}
                            </h3>
                            <p className={`text-xs font-black ${colors.text}`}>
                              {program.subtitle}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black ${colors.lightBg} ${colors.text}`}
                        >
                          {program.badge}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {program.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                          {program.attendance}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          {program.level}
                        </span>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        {program.features.slice(0, 3).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${colors.text} shrink-0`}
                            />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className={`text-xs font-black ${colors.text}`}>
                          {program.duration}
                        </span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== CURRICULUM ===== */}
        {activeTab === "curriculum" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CURRICULUM_SUBJECTS.map((subject, index) => {
              const Icon = subject.icon;
              const colors = getColorStyles(subject.color);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group shadow-lg hover:shadow-2xl"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-black text-foreground text-lg">
                    {subject.title}
                  </h3>
                  <p
                    className={`text-xs font-black uppercase tracking-wider ${colors.text} mb-2`}
                  >
                    {subject.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {subject.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`text-[8px] font-black px-2.5 py-1 rounded-full ${colors.lightBg} ${colors.text}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                    <span>{subject.duration}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ===== CTA ===== */}
        <section className="py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-black text-foreground mb-3">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Choose your program and begin your path to Quranic excellence.
            </p>
            <Link href="/onsite/admissions">
              <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
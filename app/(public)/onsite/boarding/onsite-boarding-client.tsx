// // app/(marketing)/onsite/boarding/onsite-boarding-client.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   ArrowRight,
//   Bed,
//   BookOpen,
//   Calendar,
//   Clock,
//   Coffee,
//   Compass,
//   Crown,
//   Droplet,
//   GraduationCap,
//   Heart,
//   Home,
//   Moon,
//   RefreshCw,
//   Shield,
//   Star,
//   Sun,
//   Target,
//   Users,
//   Utensils,
//   Zap
// } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// const BOARDING_FEATURES = [
//   {
//     icon: Home,
//     label: "On-Campus Accommodation",
//     description: "Live in a safe and supportive environment with peers",
//     color: "purple",
//   },
//   {
//     icon: Clock,
//     label: "Structured Daily Routine",
//     description: "4:00 AM - 9:00 PM daily, every moment is purposeful",
//     color: "amber",
//   },
//   {
//     icon: Users,
//     label: "Community Living",
//     description: "Learn and grow together with fellow students",
//     color: "purple",
//   },
//   {
//     icon: Heart,
//     label: "Spiritual Environment",
//     description: "Constant reminder of your Quranic purpose",
//     color: "amber",
//   },
//   {
//     icon: Shield,
//     label: "24/7 Supervision",
//     description: "Quality supervision ensuring safety and discipline",
//     color: "purple",
//   },
//   {
//     icon: Moon,
//     label: "Night Revision",
//     description: "Tahajjud and night revision for deeper retention",
//     color: "amber",
//   },
//   {
//     icon: Utensils,
//     label: "Nutritious Meals",
//     description: "Balanced meals daily prepared with care",
//     color: "purple",
//   },
//   {
//     icon: Bed,
//     label: "Comfortable Rest",
//     description: "Adequate rest periods for mental clarity",
//     color: "amber",
//   },
// ];

// const DAY_FEATURES = [
//   {
//     icon: Sun,
//     label: "Weekend Intensive",
//     description: "Sat-Sun: 9:00 AM - 4:30 PM",
//     color: "amber",
//   },
//   {
//     icon: Clock,
//     label: "Weekday Evening",
//     description: "Mon-Wed: 4:30 PM - 6:30 PM",
//     color: "purple",
//   },
//   {
//     icon: Users,
//     label: "Community Learning",
//     description: "Study alongside boarding students",
//     color: "amber",
//   },
//   {
//     icon: BookOpen,
//     label: "All Core Subjects",
//     description: "Tahfeedh, Tajweed, Islamic Studies, Arabic",
//     color: "purple",
//   },
//   {
//     icon: Zap,
//     label: "Flexible Options",
//     description: "Custom schedules available upon request",
//     color: "amber",
//   },
//   {
//     icon: Target,
//     label: "Progress Tracking",
//     description: "Regular assessments and feedback",
//     color: "purple",
//   },
// ];
// const BOARDING_SCHEDULE = [
//   { time: "4:00 AM", activity: "Tahajjud Preparation", icon: Moon },
//   { time: "4:30 AM", activity: "Tahajjud Prayer", icon: Star },
//   { time: "5:00 AM", activity: "Personal Hygiene", icon: Droplet },
//   { time: "5:30 AM", activity: "Fajr Prayer", icon: Sun },
//   { time: "6:00 AM", activity: "Adhkaar & Qur'an Classes", icon: BookOpen },
//   { time: "8:00 AM", activity: "Morning Prep, Breakfast & Rest", icon: Coffee },
//   { time: "10:00 AM", activity: "Qur'an Classes", icon: BookOpen },
//   { time: "1:00 PM", activity: "Dhuhr Prayer", icon: Sun },
//   { time: "2:00 PM", activity: "Lunch & Rest", icon: Utensils },
//   { time: "4:00 PM", activity: "Asr Prayer", icon: Sun },
//   { time: "4:30 PM", activity: "Afternoon Session", icon: BookOpen },
//   {
//     time: "7:00 PM",
//     activity: "Maghrib Prayer, Adhkaar & Dinner",
//     icon: Utensils,
//   },
//   { time: "8:00 PM", activity: "Isha Prayer & Night Revision", icon: Moon },
//   { time: "8:20 PM", activity: "Evening Revision & Review", icon: RefreshCw },
//   { time: "9:00 PM", activity: "Rest & Sleep", icon: Bed },
// ];

// const DAY_SCHEDULE = [
//   {
//     day: "Saturday",
//     activity: "Full Day Session",
//     time: "9:00 AM - 4:30 PM",
//     icon: Sun,
//   },
//   {
//     day: "Sunday",
//     activity: "Full Day Session",
//     time: "9:00 AM - 4:30 PM",
//     icon: Sun,
//   },
//   {
//     day: "Monday",
//     activity: "Evening Session",
//     time: "4:30 PM - 6:30 PM",
//     icon: Clock,
//   },
//   {
//     day: "Tuesday",
//     activity: "Evening Session",
//     time: "4:30 PM - 6:30 PM",
//     icon: Clock,
//   },
//   {
//     day: "Wednesday",
//     activity: "Evening Session",
//     time: "4:30 PM - 6:30 PM",
//     icon: Clock,
//   },
//   {
//     day: "Thursday",
//     activity: "Day Off",
//     time: "Rest & Personal Study",
//     icon: Bed,
//   },
//   {
//     day: "Friday",
//     activity: "Jumu'ah Prep & Review",
//     time: "Flexible",
//     icon: Heart,
//   },
// ];

// const FLEXIBLE_OPTIONS = [
//   {
//     icon: Compass,
//     label: "Custom Schedule",
//     description: "Tailored attendance plan to fit your needs",
//     color: "purple",
//   },
//   {
//     icon: Calendar,
//     label: "Flexible Days",
//     description: "Choose specific days that work for you",
//     color: "amber",
//   },
//   {
//     icon: Zap,
//     label: "Hybrid Learning",
//     description: "Combine day and boarding elements",
//     color: "purple",
//   },
// ];

// const getColorStyles = (color: string) => {
//   return {
//     purple: {
//       text: "text-purple-400",
//       border: "border-purple-800/30",
//       bg: "bg-purple-600/20",
//       gradient: "from-purple-500 to-purple-600",
//       glow: "shadow-purple-500/30",
//     },
//     amber: {
//       text: "text-amber-400",
//       border: "border-amber-800/30",
//       bg: "bg-amber-500/20",
//       gradient: "from-amber-500 to-amber-600",
//       glow: "shadow-amber-500/30",
//     },
//   }[color] ?? {
//     // fallback styles to ensure callers never receive undefined
//     text: "text-slate-300",
//     border: "border-slate-800/30",
//     bg: "bg-slate-800/20",
//     gradient: "from-slate-500 to-slate-600",
//     glow: "shadow-slate-500/20",
//   };
// };

// export default function OnsiteBoardingClient() {
//   const [activeTab, setActiveTab] = useState<"boarding" | "day">("boarding");

//   const features = activeTab === "boarding" ? BOARDING_FEATURES : DAY_FEATURES;
//   const schedule = activeTab === "boarding" ? BOARDING_SCHEDULE : DAY_SCHEDULE;

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
//           <span className="text-amber-500">Boarding</span>
//         </nav>

//         {/* ===== HERO ===== */}
//         <section className="py-8 md:py-12">
//           <Reveal>
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
//                 <Home className="w-4 h-4" />
//                 Living & Learning
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
//                 Boarding &{" "}
//                 <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
//                   Day Programmes
//                 </span>
//               </h1>
//               <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
//                {` Choose the learning environment that best fits your needs — both
//                 rooted in Qur'anic excellence.`}
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* ===== TAB TOGGLE ===== */}
//         <div className="flex justify-center mb-10">
//           <div className="flex gap-1 p-1 rounded-xl bg-slate-900/50 border border-slate-800/50">
//             <button
//               onClick={() => setActiveTab("boarding")}
//               className={cn(
//                 "px-6 py-2.5 rounded-lg font-black text-sm transition-all flex items-center gap-2",
//                 activeTab === "boarding"
//                   ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
//                   : "text-slate-400 hover:text-white",
//               )}
//             >
//               <Moon className="w-4 h-4" />
//               Boarding
//             </button>
//             <button
//               onClick={() => setActiveTab("day")}
//               className={cn(
//                 "px-6 py-2.5 rounded-lg font-black text-sm transition-all flex items-center gap-2",
//                 activeTab === "day"
//                   ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
//                   : "text-slate-400 hover:text-white",
//               )}
//             >
//               <Sun className="w-4 h-4" />
//               Day Programme
//             </button>
//           </div>
//         </div>

//         {/* ===== FEATURES GRID ===== */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
//           {features.map((feature, idx) => {
//             const Icon = feature.icon;
//             const colors = getColorStyles(feature.color);
//             return (
//               <Reveal key={idx} delay={idx * 0.04}>
//                 <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-900/30 transition-all group">
//                   <div
//                     className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
//                   >
//                     <Icon className={`w-5 h-5 ${colors.text}`} />
//                   </div>
//                   <div>
//                     <h4 className={`font-black text-sm ${colors.text}`}>
//                       {feature.label}
//                     </h4>
//                     <p className="text-xs text-slate-400">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             );
//           })}
//         </div>

//         {/* ===== SCHEDULE ===== */}
//         <section className="py-6 md:py-10">
//           <div className="text-center max-w-2xl mx-auto mb-8">
//             <Reveal>
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
//                 <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Clock className="w-3 h-3" />
//                   {activeTab === "boarding"
//                     ? "Daily Schedule (4AM - 9PM)"
//                     : "Weekly Schedule"}
//                 </span>
//                 <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
//               </div>
//             </Reveal>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto">
//             {schedule.map((item, idx) => {
//               const Icon = item.icon;
//               const isBoarding = activeTab === "boarding";
//               return (
//                 <Reveal key={idx} delay={idx * 0.03}>
//                   <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/30 transition-all group">
//                     <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//                       <Icon className="w-4 h-4 text-purple-400" />
//                     </div>
//                     <div className="min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <p className="text-[10px] font-black text-purple-400">
//                           {isBoarding ? item.time : (item as any).day}
//                         </p>
//                         <span className="text-[8px] text-slate-500">•</span>
//                         <p className="text-xs text-slate-300 truncate">
//                           {item.activity}
//                         </p>
//                       </div>
//                       {!isBoarding && (item as any).time && (
//                         <p className="text-[9px] text-amber-400 font-bold">
//                           {(item as any).time}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </section>

//         {/* ===== FLEXIBLE OPTIONS ===== */}
//         <section className="py-12 md:py-16">
//           <div className="text-center max-w-2xl mx-auto mb-8">
//             <Reveal>
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
//                 <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Zap className="w-3 h-3" />
//                   Flexible Options
//                 </span>
//                 <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-black text-white">
//                 Need a Custom Schedule?
//               </h2>
//               <p className="text-slate-400 mt-2">
//                 We offer flexible solutions to fit your needs
//               </p>
//             </Reveal>
//           </div>

//           <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
//             {FLEXIBLE_OPTIONS.map((option, idx) => {
//               const Icon = option.icon;
//               const colors = getColorStyles(option.color);
//               return (
//                 <Reveal key={idx} delay={idx * 0.1}>
//                   <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
//                     <div
//                       className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className={`w-7 h-7 ${colors.text}`} />
//                     </div>
//                     <h3 className={`font-black text-lg ${colors.text}`}>
//                       {option.label}
//                     </h3>
//                     <p className="text-sm text-slate-400 mt-1">
//                       {option.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>

//           <div className="text-center mt-8">
//             <Link href="/onsite/contact">
//               <Button className="rounded-full px-6 py-3 font-black text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all">
//                 Contact Us for Custom Schedule
//                 <ArrowRight className="w-3.5 h-3.5 ml-2 inline" />
//               </Button>
//             </Link>
//           </div>
//         </section>

//         {/* ===== TRUST BADGE ===== */}
//         <div className="text-center">
//           <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Shield className="w-4 h-4 text-purple-400" />
//               Ijazah Certified
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Crown className="w-4 h-4 text-amber-400" />
//               Authentic Sanad
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Clock className="w-4 h-4 text-purple-400" />
//               Full-Time Program
//             </span>
//           </div>
//         </div>

//         {/* ===== CTA ===== */}
//         <section className="py-12 md:py-16">
//           <Reveal>
//             <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
//               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
//                 <GraduationCap className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-black text-white mb-3">
//                 Ready to Begin?
//               </h2>
//               <p className="text-slate-300 mb-5 max-w-md mx-auto">
//                 Choose your programme and start your journey to Quranic
//                 excellence.
//               </p>
//               <Link href="/onsite/admissions">
//                 <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
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













// app/(marketing)/onsite/boarding/boarding-client.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Home,
  Sun,
  Moon,
  Clock,
  Users,
  Heart,
  Shield,
  Bed,
  Utensils,
  BookOpen,
  Sparkles,
  Check,
  Crown,
  Wifi,
  Coffee,
  Star,
  Award,
  Calendar,
  Zap,
  Compass,
  GraduationCap,
  ChevronRight,
  Quote,
  Target,
  Droplet,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// DATA
// ============================================================

const BOARDING_FEATURES = [
    {
      icon: Home,
      label: "On-Campus Accommodation",
      description: "Live in a safe and supportive environment with peers",
      color: "purple",
    },
    {
      icon: Clock,
      label: "Structured Daily Routine",
      description: "4:00 AM - 9:00 PM daily, every moment is purposeful",
      color: "amber",
    },
    {
      icon: Users,
      label: "Community Living",
      description: "Learn and grow together with fellow students",
      color: "purple",
    },
    {
      icon: Heart,
      label: "Spiritual Environment",
      description: "Constant reminder of your Quranic purpose",
      color: "amber",
    },
    {
      icon: Shield,
      label: "24/7 Supervision",
      description: "Quality supervision ensuring safety and discipline",
      color: "purple",
    },
    {
      icon: Moon,
      label: "Night Revision",
      description: "Tahajjud and night revision for deeper retention",
      color: "amber",
    },
    {
      icon: Utensils,
      label: "Nutritious Meals",
      description: "Balanced meals daily prepared with care",
      color: "purple",
    },
    {
      icon: Bed,
      label: "Comfortable Rest",
      description: "Adequate rest periods for mental clarity",
      color: "amber",
    },
  ];
  

const BOARDING_SCHEDULE = [
  {
    time: "4:00 AM",
    activity: "Tahajjud Preparation",
    icon: Moon,
    color: "purple",
  },
  { time: "4:30 AM", activity: "Tahajjud Prayer", icon: Star, color: "amber" },
  {
    time: "5:00 AM",
    activity: "Personal Hygiene",
    icon: Droplet,
    color: "purple",
  },
  { time: "5:30 AM", activity: "Fajr Prayer", icon: Sun, color: "amber" },
  {
    time: "6:00 AM",
    activity: "Adhkaar & Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "8:00 AM",
    activity: "Morning Prep, Breakfast & Rest",
    icon: Coffee,
    color: "amber",
  },
  {
    time: "10:00 AM",
    activity: "Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  { time: "1:00 PM", activity: "Dhuhr Prayer", icon: Sun, color: "amber" },
  {
    time: "2:00 PM",
    activity: "Lunch & Rest",
    icon: Utensils,
    color: "purple",
  },
  { time: "4:00 PM", activity: "Asr Prayer", icon: Sun, color: "amber" },
  {
    time: "4:30 PM",
    activity: "Afternoon Session",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "7:00 PM",
    activity: "Maghrib Prayer, Adhkaar & Dinner",
    icon: Utensils,
    color: "amber",
  },
  {
    time: "8:00 PM",
    activity: "Isha Prayer & Night Revision",
    icon: Moon,
    color: "purple",
  },
  {
    time: "8:20 PM",
    activity: "Evening Revision & Review",
    icon: RefreshCw,
    color: "amber",
  },
  { time: "9:00 PM", activity: "Rest & Sleep", icon: Bed, color: "purple" },
];

const DAY_SCHEDULE = [
  { day: "Saturday", activity: "Full Day Session", time: "9:00 AM - 4:30 PM", icon: Sun },
  { day: "Sunday", activity: "Full Day Session", time: "9:00 AM - 4:30 PM", icon: Sun },
  { day: "Monday", activity: "Evening Session", time: "4:30 PM - 6:30 PM", icon: Clock },
  { day: "Tuesday", activity: "Evening Session", time: "4:30 PM - 6:30 PM", icon: Clock },
  { day: "Wednesday", activity: "Evening Session", time: "4:30 PM - 6:30 PM", icon: Clock },
  { day: "Thursday", activity: "Day Off", time: "Rest & Personal Study", icon: Bed },
  { day: "Friday", activity: "Jumu'ah Prep & Review", time: "Flexible", icon: Heart },
];

const FLEXIBLE_OPTIONS = [
  {
    icon: Compass,
    label: "Custom Schedule",
    description: "Tailored attendance plan to fit your needs",
    color: "purple",
  },
  {
    icon: Calendar,
    label: "Flexible Days",
    description: "Choose specific days that work for you",
    color: "amber",
  },
  {
    icon: Zap,
    label: "Hybrid Learning",
    description: "Combine day and boarding elements",
    color: "purple",
  },
];

const TESTIMONIALS = [
  {
    name: "Abdulrahman",
    role: "Day Programme",
    content:
      "The structured environment transformed my memorization. In 18 months. Ustaz's guidance was invaluable.",
    initials: "ع",
  },
  {
    name: "Hafidh",
    role: "Day Programme",
    content:
      "Balancing school and memorization seemed impossible until we joined. The revision system kept me consistent.",
    initials: "ف",
  },
];

// ============================================================
// COLOR STYLES
// ============================================================

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/30",
      bg: "bg-purple-100 dark:bg-purple-600/20",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
      glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/30",
      bg: "bg-amber-100 dark:bg-amber-500/20",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
      glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
      hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

// ============================================================
// SAFE FLOATING PARTICLES
// ============================================================

function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20 animate-float"
          style={{
            left: `${5 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + i}s`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function OnsiteBoardingClient() {
  const [activeTab, setActiveTab] = useState<"boarding" | "day">("boarding");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);

  const features = activeTab === "boarding" ? BOARDING_FEATURES : DAY_FEATURES;
  const schedule = activeTab === "boarding" ? BOARDING_SCHEDULE : DAY_SCHEDULE;

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* ===== HERO WITH ANIMATED BACKGROUND ===== */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 md:pt-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-amber-500/10 to-transparent dark:opacity-50" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-500/20 animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl bg-amber-500/20 animate-pulse-slower" />
        </div>

        <FloatingParticles count={6} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-12"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-600/20 dark:to-amber-600/20 border border-purple-200 dark:border-purple-600/30 mb-6"
            >
              <Home className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-amber-500">
                Living & Learning • Boarding & Day
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] text-foreground"
            >
              Boarding &{" "}
              <span className="bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600 dark:from-purple-400 dark:via-amber-500 dark:to-purple-400 bg-clip-text text-transparent">
                Day Programmes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              Choose the learning environment that best fits your needs —
              both rooted in Qur'anic excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Home className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Boarding Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Day Programme</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Flexible Scheduling</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
              Explore Options
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-purple-300 dark:border-purple-600/30 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== TAB TOGGLE ===== */}
      <section className="py-8">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="flex justify-center">
            <div className="flex gap-1 p-1 rounded-xl bg-muted/30 dark:bg-slate-900/50 border border-border dark:border-slate-800/50 shadow-lg">
              <button
                onClick={() => setActiveTab("boarding")}
                className={cn(
                  "px-6 py-3 rounded-lg font-black text-sm transition-all flex items-center gap-2",
                  activeTab === "boarding"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 text-white shadow-lg"
                    : "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
                )}
              >
                <Moon className="w-4 h-4" />
                Boarding
                <span className="text-[8px] opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                  Full Immersion
                </span>
              </button>
              <button
                onClick={() => setActiveTab("day")}
                className={cn(
                  "px-6 py-3 rounded-lg font-black text-sm transition-all flex items-center gap-2",
                  activeTab === "day"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white shadow-lg"
                    : "text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400"
                )}
              >
                <Sun className="w-4 h-4" />
                Day
                <span className="text-[8px] opacity-70 bg-white/20 px-2 py-0.5 rounded-full">
                  Flexible
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const colors = getColorStyles(feature.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className={`font-black text-sm ${colors.text}`}>{feature.label}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-transparent via-purple-50/5 to-amber-50/5 dark:via-purple-950/5 dark:to-amber-950/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {activeTab === "boarding" ? "Daily Schedule (4AM - 9PM)" : "Weekly Schedule"}
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {schedule.map((item, idx) => {
              const Icon = item.icon;
              const isBoarding = activeTab === "boarding";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[10px] font-black text-purple-600 dark:text-purple-400">
                        {isBoarding ? item.time : (item as any).day}
                      </p>
                      <span className="text-[8px] text-muted-foreground">•</span>
                      <p className="text-xs text-foreground truncate">{item.activity}</p>
                    </div>
                    {!isBoarding && (item as any).time && (
                      <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">
                        {(item as any).time}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== FLEXIBLE OPTIONS ===== */}
      <section className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-3 h-3" />
                Flexible Options
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              Need a Custom Schedule?
            </h2>
            <p className="text-muted-foreground mt-2">We offer flexible solutions to fit your needs</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {FLEXIBLE_OPTIONS.map((option, idx) => {
              const Icon = option.icon;
              const colors = getColorStyles(option.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${colors.lightBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className={`font-black text-lg ${colors.text}`}>{option.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/onsite/contact">
              <Button className="rounded-full px-6 py-3 font-black text-sm bg-slate-800 hover:bg-slate-700 text-white transition-all group">
                Contact Us for Custom Schedule
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-transparent via-purple-50/5 to-amber-50/5 dark:via-purple-950/5 dark:to-amber-950/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-3 h-3" />
                Student Stories
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              What Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Students
              </span>{" "}
              Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all"
              >
                <Quote className="w-8 h-8 text-amber-300 dark:text-amber-500/30 mb-3" />
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black shadow-lg">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== TRUST BADGE ===== */}
      <section className="py-8">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-foreground font-medium">Ijazah Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs text-foreground font-medium">Authentic Sanad</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-foreground font-medium">Full-Time Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ULTRA PREMIUM CTA ===== */}
      <section className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-amber-500/10 blur-3xl rounded-3xl" />
            
            <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30 backdrop-blur-sm text-center overflow-hidden">
              <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse" />
              <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-amber-500/30 animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-purple-400/30 animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-pulse" style={{ animationDelay: "1.5s" }} />
              <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-purple-500/30 animate-pulse" style={{ animationDelay: "0.5s" }} />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30"
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Ready to Begin?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Choose your programme and start your journey to Quranic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-10 py-6 font-black text-lg bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </Button>
                </Link>
                <Link href="/onsite/contact">
                  <Button variant="outline" className="rounded-full px-10 py-6 font-black text-lg border-purple-300 dark:border-slate-700 text-purple-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all duration-300 group">
                    <span className="flex items-center">
                      Contact Us
                      <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== ANIMATED CSS ===== */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 0.6;
          }
          75% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-60px) translateX(20px);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
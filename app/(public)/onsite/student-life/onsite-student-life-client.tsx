// // app/(marketing)/onsite/student-life/onsite-student-life-client.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import {
//   Activity,
//   ArrowRight,
//   Award,
//   Bed,
//   BookOpen,
//   Calendar,
//   Clock,
//   Coffee,
//   Crown,
//   Droplet,
//   Globe,
//   GraduationCap,
//   Heart,
//   Moon,
//   RefreshCw,
//   Shield,
//   Sparkles,
//   Star,
//   Sun,
//   Users,
//   Utensils
// } from "lucide-react";
// import Link from "next/link";

// const DAILY_ROUTINE = [
//   {
//     icon: Moon,
//     title: "Tahajjud Preparation",
//     description: "Begin the day with spiritual preparation and night prayer",
//     time: "4:00 AM",
//     color: "purple",
//   },
//   {
//     icon: Star,
//     title: "Tahajjud Prayer",
//     description: "Voluntary night prayer for spiritual elevation",
//     time: "4:30 AM",
//     color: "amber",
//   },
//   {
//     icon: Droplet,
//     title: "Personal Hygiene",
//     description: "Purification and preparation for the day",
//     time: "5:00 AM",
//     color: "purple",
//   },
//   {
//     icon: Sun,
//     title: "Fajr Prayer",
//     description: "Begin the day with dawn prayer and remembrance",
//     time: "5:30 AM",
//     color: "amber",
//   },
//   {
//     icon: BookOpen,
//     title: "Adhkaar & Qur'an Classes",
//     description: "Morning supplications and focused Qur'an learning",
//     time: "6:00 AM",
//     color: "purple",
//   },
//   {
//     icon: Coffee,
//     title: "Prep, Breakfast & Rest",
//     description: "Nutritious meal to fuel the day's learning",
//     time: "8:00 AM",
//     color: "amber",
//   },
//   {
//     icon: BookOpen,
//     title: "Qur'an Classes",
//     description: "Deep dive into Qur'anic studies and guidance",
//     time: "10:00 AM",
//     color: "purple",
//   },
//   {
//     icon: Sun,
//     title: "Dhuhr Prayer",
//     description: "Midday prayer and spiritual reset",
//     time: "1:00 PM",
//     color: "amber",
//   },
//   {
//     icon: Utensils,
//     title: "Lunch & Rest",
//     description: "Recharge for the afternoon sessions",
//     time: "2:00 PM",
//     color: "purple",
//   },
//   {
//     icon: Sun,
//     title: "Asr Prayer",
//     description: "Afternoon prayer and reflection",
//     time: "4:00 PM",
//     color: "amber",
//   },
//   {
//     icon: BookOpen,
//     title: "Afternoon Session",
//     description: "Focused memorization and review",
//     time: "4:30 PM",
//     color: "purple",
//   },
//   {
//     icon: Utensils,
//     title: "Maghrib, Adhkaar & Dinner",
//     description: "Evening prayer, remembrance, and meal",
//     time: "7:00 PM",
//     color: "amber",
//   },
//   {
//     icon: Moon,
//     title: "Isha Prayer & Night Revision",
//     description: "Night prayer and evening review",
//     time: "8:00 PM",
//     color: "purple",
//   },
//   {
//     icon: RefreshCw,
//     title: "Evening Revision & Review",
//     description: "Reinforce memorized portions with practice",
//     time: "8:20 PM",
//     color: "amber",
//   },
//   {
//     icon: Bed,
//     title: "Rest & Sleep",
//     description: "Prepare for another day of learning",
//     time: "9:00 PM",
//     color: "purple",
//   },
// ];

// const CAMPUS_LIFE = [
//   {
//     icon: Users,
//     title: "Community Living",
//     description: "Brotherhood/sisterhood environment fostering mutual support",
//     color: "purple",
//   },
//   {
//     icon: Heart,
//     title: "Spiritual Growth",
//     description: "Daily Tazkiyah sessions and character development",
//     color: "amber",
//   },
//   {
//     icon: Shield,
//     title: "Safe Environment",
//     description: "24/7 supervision and secure campus",
//     color: "purple",
//   },
//   {
//     icon: Globe,
//     title: "Diverse Community",
//     description: "Students from various backgrounds united in Quranic pursuit",
//     color: "amber",
//   },
// ];

// const ACTIVITIES = [
//   { icon: Star, label: "Daily Congregational Prayers", color: "purple" },
//   { icon: Users, label: "Quran Circles (Halaqaat)", color: "amber" },
//   { icon: BookOpen, label: "Tajweed Practice Sessions", color: "purple" },
//   { icon: Calendar, label: "Islamic Lectures & Workshops", color: "amber" },
//   { icon: Activity, label: "Sports & Recreation", color: "purple" },
//   { icon: Heart, label: "Community Service Projects", color: "amber" },
//   { icon: Award, label: "Quran Competitions", color: "purple" },
//   { icon: Globe, label: "Guest Scholar Visits", color: "amber" },
// ];

// const getColorStyles = (color: string) => {
//   return {
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
//   }[color];
// };

// export default function OnsiteStudentLifeClient() {
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
//           <span className="text-amber-500">Student Life</span>
//         </nav>

//         {/* ===== HERO ===== */}
//         <section className="py-8 md:py-12">
//           <Reveal>
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
//                 <Activity className="w-4 h-4" />
//                 Daily Life
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
//                 A Day in the{" "}
//                 <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
//                   Life
//                 </span>
//               </h1>
//               <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
//                 A structured daily routine designed for optimal learning,
//                 growth, and spiritual development in a supportive community.
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* ===== DAILY ROUTINE ===== */}
//         <section className="py-6 md:py-10">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <Reveal>
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
//                 <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Clock className="w-3 h-3" />
//                   Daily Rhythm
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-black text-white">
//                 From Fajr to Isha
//               </h2>
//               <p className="text-slate-400 mt-2">Every moment is purposeful</p>
//             </Reveal>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
//             {DAILY_ROUTINE.map((item, idx) => {
//               const Icon = item.icon;
//               const colors =
//                 getColorStyles(item.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
//               const isPurple = item.color === "purple";
//               return (
//                 <Reveal key={idx} delay={idx * 0.03}>
//                   <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-900/30 transition-all group">
//                     <div
//                       className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className={`w-5 h-5 ${colors.text}`} />
//                     </div>
//                     <div className="min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <p className={`text-[10px] font-black ${colors.text}`}>
//                           {item.time}
//                         </p>
//                         <span className="text-[8px] text-slate-500">•</span>
//                         <h3 className="font-black text-sm text-white">
//                           {item.title}
//                         </h3>
//                       </div>
//                       <p className="text-xs text-slate-400">
//                         {item.description}
//                       </p>
//                     </div>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </section>

//         {/* ===== CAMPUS LIFE ===== */}
//         <section className="py-12 md:py-16">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <Reveal>
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
//                 <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Shield className="w-3 h-3" />
//                   Campus Life
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-black text-white">
//                 More Than Just Memorization
//               </h2>
//               <p className="text-slate-400 mt-2">
//                 A holistic environment for growth
//               </p>
//             </Reveal>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
//             {CAMPUS_LIFE.map((feature, idx) => {
//               const Icon = feature.icon;
//               const colors =
//                 getColorStyles(feature.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
//               return (
//                 <Reveal key={idx} delay={idx * 0.1}>
//                   <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-900/30 transition-all group">
//                     <div
//                       className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className={`w-6 h-6 ${colors.text}`} />
//                     </div>
//                     <div>
//                       <h3 className={`font-black text-lg ${colors.text}`}>
//                         {feature.title}
//                       </h3>
//                       <p className="text-sm text-slate-400 mt-1">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </section>

//         {/* ===== ACTIVITIES ===== */}
//         <section className="py-12 md:py-16 border-t border-slate-800/50">
//           <div className="text-center max-w-2xl mx-auto mb-10">
//             <Reveal>
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
//                 <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Sparkles className="w-3 h-3" />
//                   Activities & Events
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-black text-white">
//                 Beyond the Classroom
//               </h2>
//               <p className="text-slate-400 mt-2">
//                 Building community through shared experiences
//               </p>
//             </Reveal>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
//             {ACTIVITIES.map((activity, idx) => {
//               const Icon = activity.icon;
//               const colors = getColorStyles(activity.color) || { bg: "bg-purple-600/20", text: "text-purple-400" };
//               return (
//                 <Reveal key={idx} delay={idx * 0.05}>
//                   <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900/30 transition-all group">
//                     <div
//                       className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className={`w-4 h-4 ${colors.text}`} />
//                     </div>
//                     <span className="text-xs text-slate-300 font-medium">
//                       {activity.label}
//                     </span>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </section>

//         {/* ===== TRUST BADGE ===== */}
//         <div className="text-center">
//           <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Shield className="w-4 h-4 text-purple-400" />
//               Safe & Supervised
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Heart className="w-4 h-4 text-amber-400" />
//               Spiritual Environment
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Users className="w-4 h-4 text-purple-400" />
//               Supportive Community
//             </span>
//           </div>
//         </div>

//         {/* ===== CTA ===== */}
//         <section className="py-12 md:py-16">
//           <Reveal>
//             <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-linear-to-br from-purple-600/10 to-amber-500/10">
//               <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
//                 <GraduationCap className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-black text-white mb-3">
//                 Ready to Join Our Community?
//               </h2>
//               <p className="text-slate-300 mb-5 max-w-md mx-auto">
//                 Experience the transformative power of immersive Quran
//                 memorization.
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












// app/(marketing)/onsite/student-life/student-life-client.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sun,
  Moon,
  BookOpen,
  Users,
  Heart,
  Clock,
  Coffee,
  Sparkles,
  Activity,
  Shield,
  Globe,
  Award,
  Utensils,
  Bed,
  GraduationCap,
  Calendar,
  Star,
  Quote,
  Target,
  Infinity,
  ChevronRight,
  Droplet,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ============================================================
// DATA
// ============================================================


const DAILY_ROUTINE = [
  {
    icon: Moon,
    title: "Tahajjud Preparation",
    description: "Begin the day with spiritual preparation and night prayer",
    time: "4:00 AM",
    color: "purple",
  },
  {
    icon: Star,
    title: "Tahajjud Prayer",
    description: "Voluntary night prayer for spiritual elevation",
    time: "4:30 AM",
    color: "amber",
  },
  {
    icon: Droplet,
    title: "Personal Hygiene",
    description: "Purification and preparation for the day",
    time: "5:00 AM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Fajr Prayer",
    description: "Begin the day with dawn prayer and remembrance",
    time: "5:30 AM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Adhkaar & Qur'an Classes",
    description: "Morning supplications and focused Qur'an learning",
    time: "6:00 AM",
    color: "purple",
  },
  {
    icon: Coffee,
    title: "Prep, Breakfast & Rest",
    description: "Nutritious meal to fuel the day's learning",
    time: "8:00 AM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Qur'an Classes",
    description: "Deep dive into Qur'anic studies and guidance",
    time: "10:00 AM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Dhuhr Prayer",
    description: "Midday prayer and spiritual reset",
    time: "1:00 PM",
    color: "amber",
  },
  {
    icon: Utensils,
    title: "Lunch & Rest",
    description: "Recharge for the afternoon sessions",
    time: "2:00 PM",
    color: "purple",
  },
  {
    icon: Sun,
    title: "Asr Prayer",
    description: "Afternoon prayer and reflection",
    time: "4:00 PM",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Afternoon Session",
    description: "Focused memorization and review",
    time: "4:30 PM",
    color: "purple",
  },
  {
    icon: Utensils,
    title: "Maghrib, Adhkaar & Dinner",
    description: "Evening prayer, remembrance, and meal",
    time: "7:00 PM",
    color: "amber",
  },
  {
    icon: Moon,
    title: "Isha Prayer & Night Revision",
    description: "Night prayer and evening review",
    time: "8:00 PM",
    color: "purple",
  },
  {
    icon: RefreshCw,
    title: "Evening Revision & Review",
    description: "Reinforce memorized portions with practice",
    time: "8:20 PM",
    color: "amber",
  },
  {
    icon: Bed,
    title: "Rest & Sleep",
    description: "Prepare for another day of learning",
    time: "9:00 PM",
    color: "purple",
  },
];

const CAMPUS_LIFE = [
  {
    icon: Users,
    title: "Community Living",
    description: "Brotherhood/sisterhood environment fostering mutual support",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Daily Tazkiyah sessions and character development",
    color: "amber",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "24/7 supervision and secure campus",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Diverse Community",
    description: "Students from various backgrounds united in Quranic pursuit",
    color: "amber",
  },
];

const ACTIVITIES = [
  { icon: Star, label: "Daily Congregational Prayers", color: "purple" },
  { icon: Users, label: "Quran Circles (Halaqaat)", color: "amber" },
  { icon: BookOpen, label: "Tajweed Practice Sessions", color: "purple" },
  { icon: Calendar, label: "Islamic Lectures & Workshops", color: "amber" },
  { icon: Activity, label: "Sports & Recreation", color: "purple" },
  { icon: Heart, label: "Community Service Projects", color: "amber" },
  { icon: Award, label: "Quran Competitions", color: "purple" },
  { icon: Globe, label: "Guest Scholar Visits", color: "amber" },
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
// SAFE FLOATING PARTICLES - WITHOUT repeat: Infinity issues
// ============================================================

function FloatingParticles({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20 animate-float"
          style={{
            left: `${5 + i * 11}%`,
            top: `${10 + i * 8}%`,
            animationDelay: `${i * 0.5}s`,
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

export default function StudentLifeClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* ===== HERO WITH ANIMATED BACKGROUND ===== */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 md:pt-12">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-amber-500/10 to-transparent dark:opacity-50" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-500/20 animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl bg-amber-500/20 animate-pulse-slower" />
        </div>

        <FloatingParticles count={8} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-12"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-600/20 dark:to-amber-600/20 border border-purple-200 dark:border-purple-600/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-amber-500">
                Student Life • Daily Experience
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] text-foreground"
            >
              A Day in the{" "}
              <span className="bg-gradient-to-r from-purple-600 via-amber-600 to-purple-600 dark:from-purple-400 dark:via-amber-500 dark:to-purple-400 bg-clip-text text-transparent">
                Life
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              A structured daily routine designed for optimal learning, growth,
              and spiritual development in a supportive community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>4:00 AM Start</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Structured Learning</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border">
                <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Community Living</span>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex justify-center mt-12"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
                  Discover Daily Life
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
          </div>
        </motion.div>
      </section>

      {/* ===== DAILY ROUTINE ===== */}
      <section className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Daily Rhythm
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
              From Fajr to{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Isha
              </span>
            </h2>
            <p className="text-muted-foreground mt-2">Every moment is purposeful</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {DAILY_ROUTINE.map((item, idx) => {
              const Icon = item.icon;
              const colors = getColorStyles(item.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative p-5 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-[10px] font-black ${colors.text}`}>{item.time}</p>
                        <span className="text-[8px] text-muted-foreground">•</span>
                        <h3 className="font-black text-sm text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== CAMPUS LIFE ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/5 to-amber-50/5 dark:via-purple-950/5 dark:to-amber-950/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-600 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Campus Life
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
              More Than Just{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Memorization
              </span>
            </h2>
            <p className="text-muted-foreground mt-2">A holistic environment for growth</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {CAMPUS_LIFE.map((feature, idx) => {
              const Icon = feature.icon;
              const colors = getColorStyles(feature.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all duration-300 text-center"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl ${colors.lightBg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className={`font-black text-lg ${colors.text}`}>{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== ACTIVITIES ===== */}
      <section className="py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Activities & Events
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
              Beyond the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Classroom
              </span>
            </h2>
            <p className="text-muted-foreground mt-2">Building community through shared experiences</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {ACTIVITIES.map((activity, idx) => {
              const Icon = activity.icon;
              const colors = getColorStyles(activity.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <span className="text-sm text-foreground font-medium">{activity.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/5 to-amber-50/5 dark:via-purple-950/5 dark:to-amber-950/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 xs:px-5 sm:px-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Quote className="w-3 h-3" />
                Student Stories
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
              Voices from Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => {
              const colors = getColorStyles(testimonial.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-purple-300 dark:hover:border-purple-600/30 transition-all flex flex-col"
                >
                  <Quote className={`w-8 h-8 ${colors.text} opacity-30 mb-3`} />
                  <p className="text-sm text-muted-foreground italic mb-4 flex-1 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-black text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== TRUST BADGE ===== */}
      <section className="py-8">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-foreground font-medium">Safe & Supervised</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs text-foreground font-medium">Spiritual Environment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-foreground font-medium">Supportive Community</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs text-foreground font-medium">Ijazah Track</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ULTRA PREMIUM CTA ===== */}
      <section className="py-16 md:py-24">
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
              {/* Simple CSS Animations - No repeat: Infinity issues */}
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
                Ready to Join Our Community?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Experience the transformative power of immersive Quran memorization.
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
                      Visit Campus
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
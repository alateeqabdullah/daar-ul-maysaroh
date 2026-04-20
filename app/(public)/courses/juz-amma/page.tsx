// // app/courses/juz-amma/page.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
// } from "framer-motion";
// import {
//   BookOpen,
//   Star,
//   Clock,
//   Calendar,
//   Award,
//   Shield,
//   Users,
//   Sparkles,
//   ArrowRight,
//   CheckCircle2,
//   Heart,
//   Moon,
//   Sun,
//   Cloud,
//   Flower,
//   Leaf,
//   Gem,
//   Crown,
//   Target,
//   TrendingUp,
//   Zap,
//   Play,
//   Headphones,
//   Mic,
//   Volume2,
//   Quote,
//   ChevronRight,
//   MapPin,
//   GraduationCap,
//   BadgeCheck,
//   Trophy,
//   Medal,
//   Diamond,
//   Compass,
//   Feather,
//   PenTool,
//   Brain,
//   Eye,
//   Ear,
//   MessageCircle,
//   Gift,
//   Rocket,
//   Infinity,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";


// // Juz Amma Program Data - Premium Teal/Sapphire Theme
// const PROGRAM_DATA = {
//   name: "Juz Amma Memorization",
//   tagline: "Where Every Child's Quranic Journey Begins",
//   description:
//     "A transformative program designed to help children and beginners memorize the 30th Juz of the Quran with precision, understanding, and a deep, lasting love for the Book of Allah.",
//   ageGroup: "6-14 years",
//   duration: "8-12 months",
//   sessionsPerWeek: 2,
//   sessionDuration: "45-60 minutes",
//   classSize: "4-6 students (group) or 1-on-1",
//   surahs: 37,
//   verses: 564,
//   priceRange: "$79 - $149/month",
//   colors: {
//     primary: "from-cyan-600 to-teal-600",
//     secondary: "from-teal-500 to-cyan-500",
//     accent: "from-emerald-500 to-cyan-500",
//     light: "cyan-50",
//     dark: "cyan-950",
//     border: "cyan-200",
//     text: "cyan-700",
//   },
// };

// // Surah Categories with enhanced details
// const SURAH_CATEGORIES = [
//   {
//     name: "The Illuminated Path",
//     surahs: "Surah An-Nas to Al-Asr (114-103)",
//     count: 12,
//     description:
//       "Short, powerful surahs that establish the foundation of faith and daily remembrance",
//     icon: Star,
//     difficulty: "Gentle Start",
//     duration: "3-4 months",
//     color: "from-cyan-400 to-teal-400",
//   },
//   {
//     name: "The Rising Light",
//     surahs: "Surah At-Takathur to Al-Qadr (102-97)",
//     count: 6,
//     description:
//       "Deeper spiritual concepts that connect the child's heart to the divine message",
//     icon: TrendingUp,
//     difficulty: "Building Momentum",
//     duration: "2-3 months",
//     color: "from-teal-400 to-emerald-400",
//   },
//   {
//     name: "The Crown of Achievement",
//     surahs: "Surah Al-Alaq to An-Naba (96-78)",
//     count: 19,
//     description:
//       "Extended surahs that develop memorization stamina and profound understanding",
//     icon: Crown,
//     difficulty: "Advanced Mastery",
//     duration: "4-5 months",
//     color: "from-emerald-400 to-cyan-400",
//   },
// ];

// // Program Pillars
// const PILLARS = [
//   {
//     icon: Shield,
//     title: "Authentic Sanad",
//     description:
//       "Learn through an unbroken chain of transmission reaching back 1400 years",
//     color: "cyan",
//   },
//   {
//     icon: Mic,
//     title: "Live Recitation",
//     description: "Real-time correction from Ijazah-certified scholars",
//     color: "teal",
//   },
//   {
//     icon: Heart,
//     title: "Meaningful Learning",
//     description: "Understand the message, not just memorize the words",
//     color: "emerald",
//   },
//   {
//     icon: Award,
//     title: "Progress Recognition",
//     description: "Earn badges, certificates, and celebrate every milestone",
//     color: "cyan",
//   },
// ];

// // Learning Milestones
// const MILESTONES = [
//   {
//     level: "Seedling",
//     surahs: "1-5 Surahs",
//     badge: "🌱",
//     description: "First steps into Quranic memorization",
//     color: "from-emerald-400 to-teal-400",
//   },
//   {
//     level: "Blooming",
//     surahs: "6-15 Surahs",
//     badge: "🌸",
//     description: "Building confidence and fluency",
//     color: "from-teal-400 to-cyan-400",
//   },
//   {
//     level: "Flourishing",
//     surahs: "16-25 Surahs",
//     badge: "🌿",
//     description: "Developing memorization stamina",
//     color: "from-cyan-400 to-sky-400",
//   },
//   {
//     level: "Guardian",
//     surahs: "26-37 Surahs",
//     badge: "🏆",
//     description: "Complete Juz Amma mastery",
//     color: "from-emerald-500 to-cyan-500",
//   },
// ];

// // Student Journey
// const JOURNEY_STAGES = [
//   {
//     stage: "Discovery",
//     icon: Compass,
//     description: "Introduction to the beauty of Quranic memorization",
//     duration: "First 2 months",
//   },
//   {
//     stage: "Growth",
//     icon: TrendingUp,
//     description: "Building memorization skills and confidence",
//     duration: "Months 3-6",
//   },
//   {
//     stage: "Mastery",
//     icon: Crown,
//     description: "Achieving fluency and deep understanding",
//     duration: "Months 7-12",
//   },
//   {
//     stage: "Celebration",
//     icon: Gift,
//     description: "Completing Juz Amma with Ijazah preparation",
//     duration: "Final month",
//   },
// ];

// // Schedule Options
// const SCHEDULE_OPTIONS = [
//   { day: "Monday & Wednesday", time: "4:00 PM - 5:00 PM (EST)", icon: Sun },
//   { day: "Tuesday & Thursday", time: "5:00 PM - 6:00 PM (EST)", icon: Moon },
//   { day: "Saturday", time: "10:00 AM - 11:30 AM (EST)", icon: Sun },
//   { day: "Sunday", time: "11:00 AM - 12:30 PM (EST)", icon: Sun },
//   { day: "Flexible", time: "Custom schedule available", icon: Clock },
// ];

// // FAQ Data
// const FAQS = [
//   {
//     q: "What if my child has never memorized before?",
//     a: "Perfect! This program is designed for absolute beginners. We start with foundational techniques and build gradually, ensuring your child never feels overwhelmed.",
//   },
//   {
//     q: "How much parent involvement is needed?",
//     a: "Parents receive weekly progress reports and are encouraged to support revision at home (15-20 minutes daily). Our teachers provide structured guidance for parents too.",
//   },
//   {
//     q: "What happens after completing Juz Amma?",
//     a: "Graduates receive a certificate and can advance to our Juz Tabarak program or transition to the full Hifz track with Ijazah preparation.",
//   },
//   {
//     q: "Can siblings join the same class?",
//     a: "Yes! Siblings can join together, and we offer a 15% family discount for 3 or more enrollments from the same household.",
//   },
//   {
//     q: "What technology is required?",
//     a: "A computer or tablet with a camera and microphone, stable internet connection, and Zoom (free version works perfectly).",
//   },
//   {
//     q: "Is there a trial period?",
//     a: "We offer a free 20-minute assessment session where your child can experience our teaching style before committing.",
//   },
// ];

// // Helper function
// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function JuzAmmaPage() {
//   const [selectedSchedule, setSelectedSchedule] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");
//   const containerRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <main ref={containerRef} className="relative bg-background overflow-hidden">
//       {/* Premium Background Effects */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
//           style={{ backgroundSize: "300px" }}
//         />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[200px]" />
//       </div>

//       {/* Hero Section with Parallax */}
//       <motion.div
//         style={{ y: heroY, opacity }}
//         className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24"
//       >
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-6 sm:space-y-8">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 text-cyan-700 text-[11px] font-black uppercase tracking-wider">
//                 <Sparkles className="w-3.5 h-3.5" /> Award-Winning Children's
//                 Program
//               </div>

//               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
//                 Juz{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600">
//                   Amma
//                 </span>
//                 <br />
//                 Memorization
//               </h1>

//               <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
//                 {PROGRAM_DATA.description}
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 text-xs font-black">
//                   <Users className="w-3.5 h-3.5" />
//                   {PROGRAM_DATA.classSize}
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 text-xs font-black">
//                   <Clock className="w-3.5 h-3.5" />
//                   {PROGRAM_DATA.sessionsPerWeek}x week •{" "}
//                   {PROGRAM_DATA.sessionDuration}
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 text-xs font-black">
//                   <BookOpen className="w-3.5 h-3.5" />
//                   {PROGRAM_DATA.surahs} Surahs
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Link href="/assessment">
//                   <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
//                     <span className="flex items-center gap-2">
//                       START FREE ASSESSMENT
//                       <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </span>
//                   </Button>
//                 </Link>
//                 <Link href="#curriculum">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg border-cyan-600 text-cyan-600 hover:bg-cyan-50"
//                   >
//                     VIEW CURRICULUM
//                   </Button>
//                 </Link>
//               </div>
//             </div>

//             {/* Right Hero Visual */}
//             <div className="relative">
//               <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
//               <div className="relative institutional-card p-8 bg-gradient-to-br from-cyan-50/30 to-teal-50/30 dark:from-cyan-950/20 dark:to-teal-950/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-3xl">
//                 <div className="grid grid-cols-2 gap-6 mb-8">
//                   {[
//                     {
//                       label: "Duration",
//                       value: PROGRAM_DATA.duration,
//                       icon: Calendar,
//                     },
//                     {
//                       label: "Surahs",
//                       value: PROGRAM_DATA.surahs,
//                       icon: BookOpen,
//                     },
//                     { label: "Verses", value: PROGRAM_DATA.verses, icon: Star },
//                     {
//                       label: "Age Group",
//                       value: PROGRAM_DATA.ageGroup,
//                       icon: Users,
//                     },
//                   ].map((stat, i) => (
//                     <div
//                       key={i}
//                       className="text-center p-3 rounded-xl bg-white/50 dark:bg-black/20"
//                     >
//                       <stat.icon className="w-5 h-5 text-cyan-600 mx-auto mb-2" />
//                       <div className="text-2xl font-black text-cyan-600">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         {stat.label}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
//                   <div className="flex items-center gap-3 mb-2">
//                     <Gem className="w-6 h-6 text-cyan-600" />
//                     <span className="font-black text-sm uppercase tracking-tight">
//                       The Gateway to Quranic Memorization
//                     </span>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     Perfect your recitation of Juz Amma with proper Tajweed and
//                     understanding of meanings
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Stats Bar */}
//       <div className="border-y border-border/50 bg-muted/20 py-6 mb-16">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
//             {[
//               { label: "Active Students", value: "500+", icon: Users },
//               { label: "Completion Rate", value: "94%", icon: Target },
//               { label: "Parent Satisfaction", value: "98%", icon: Heart },
//               { label: "Certified Graduates", value: "200+", icon: Award },
//             ].map((stat, i) => (
//               <div key={i}>
//                 <div className="text-2xl sm:text-3xl font-black text-cyan-600">
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-1">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Program Pillars */}
//       <section className="mb-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
//               <Shield className="w-3.5 h-3.5" /> Our Foundation
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
//               The{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
//                 Al-Maysaroh
//               </span>{" "}
//               Difference
//             </h2>
//             <p className="text-muted-foreground">
//               What makes our Juz Amma program truly exceptional
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {PILLARS.map((pillar, i) => {
//               const Icon = pillar.icon;
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-50/30 to-teal-50/30 border border-cyan-100 dark:border-cyan-800 group hover:-translate-y-2 transition-all duration-300">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <Icon className="w-8 h-8 text-cyan-600" />
//                     </div>
//                     <h3 className="font-black text-lg mb-2">{pillar.title}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {pillar.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Surah Journey - Interactive Timeline */}
//       <section id="curriculum" className="mb-24 scroll-mt-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
//               <Compass className="w-3.5 h-3.5" /> Your Child's Path
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
//               A Journey Through{" "}
//               <span className="text-cyan-600 italic">Juz Amma</span>
//             </h2>
//             <p className="text-muted-foreground">
//               A carefully structured progression from beginner to confident
//               reciter
//             </p>
//           </div>

//           <div className="relative">
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 hidden md:block" />
//             <div className="space-y-8">
//               {SURAH_CATEGORIES.map((category, idx) => {
//                 const Icon = category.icon;
//                 return (
//                   <Reveal key={idx} delay={idx * 0.1}>
//                     <div className="relative pl-0 md:pl-16">
//                       <div className="hidden md:block absolute left-0 top-6 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-sm font-black shadow-lg">
//                         {idx + 1}
//                       </div>
//                       <div className="institutional-card p-6 md:p-8 hover:border-cyan-300 transition-all">
//                         <div className="flex flex-col md:flex-row gap-6">
//                           <div className="md:w-64 shrink-0">
//                             <div className="flex items-center gap-3 mb-3">
//                               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 flex items-center justify-center">
//                                 <Icon className="w-6 h-6 text-cyan-600" />
//                               </div>
//                               <div>
//                                 <h3 className="font-black text-xl">
//                                   {category.name}
//                                 </h3>
//                                 <p className="text-xs text-cyan-600 font-black">
//                                   {category.surahs}
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="inline-flex px-2 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 text-[10px] font-black">
//                               {category.difficulty} • {category.duration}
//                             </div>
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-muted-foreground mb-4">
//                               {category.description}
//                             </p>
//                             <div className="h-1.5 w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-full overflow-hidden">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 whileInView={{ width: `${(idx + 1) * 33}%` }}
//                                 transition={{ duration: 1, delay: 0.3 }}
//                                 className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Milestones & Recognition */}
//       <section className="mb-24 bg-gradient-to-r from-cyan-50/20 to-teal-50/20 py-16">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
//               <Trophy className="w-3.5 h-3.5" /> Celebrate Progress
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
//               Every Step{" "}
//               <span className="text-cyan-600 italic">Deserves Recognition</span>
//             </h2>
//             <p className="text-muted-foreground">
//               Motivating milestones that make memorization exciting
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {MILESTONES.map((milestone, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="text-center p-6 rounded-2xl bg-white dark:bg-black/20 border border-cyan-100 dark:border-cyan-800 hover:shadow-xl transition-all">
//                   <div className="text-5xl mb-3">{milestone.badge}</div>
//                   <h3 className="font-black text-xl mb-1">{milestone.level}</h3>
//                   <p className="text-sm text-cyan-600 font-black mb-2">
//                     {milestone.surahs}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {milestone.description}
//                   </p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Learning Journey */}
//       <section className="mb-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
//               <Infinity className="w-3.5 h-3.5" /> The Experience
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
//               Your Child's{" "}
//               <span className="text-cyan-600 italic">Transformative</span>{" "}
//               Journey
//             </h2>
//             <p className="text-muted-foreground">
//               From first recitation to confident mastery
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-6">
//             {JOURNEY_STAGES.map((stage, i) => {
//               const Icon = stage.icon;
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center relative">
//                     {i < 3 && (
//                       <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-300 to-teal-300" />
//                     )}
//                     <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
//                       <Icon className="w-7 h-7" />
//                     </div>
//                     <h3 className="font-black text-lg mb-2">{stage.stage}</h3>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       {stage.description}
//                     </p>
//                     <p className="text-xs text-cyan-600 font-black">
//                       {stage.duration}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Schedule & Pricing */}
//       <section className="mb-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Schedule */}
//             <Reveal>
//               <div className="institutional-card p-8">
//                 <h3 className="font-black text-2xl mb-6 flex items-center gap-3">
//                   <Calendar className="w-6 h-6 text-cyan-600" />
//                   Class Schedule
//                 </h3>
//                 <div className="space-y-3">
//                   {SCHEDULE_OPTIONS.map((slot, i) => {
//                     const Icon = slot.icon;
//                     return (
//                       <div
//                         key={i}
//                         className="flex justify-between items-center p-3 rounded-xl bg-muted/30 border border-border hover:border-cyan-300 transition-all"
//                       >
//                         <div className="flex items-center gap-3">
//                           <Icon className="w-4 h-4 text-cyan-600" />
//                           <span className="font-black text-sm">{slot.day}</span>
//                         </div>
//                         <span className="text-sm text-muted-foreground">
//                           {slot.time}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-4 text-center">
//                   All times in EST • Flexible scheduling available
//                 </p>
//               </div>
//             </Reveal>

//             {/* Pricing */}
//             <Reveal delay={0.2}>
//               <div className="institutional-card p-8 bg-gradient-to-br from-cyan-50/20 to-teal-50/20">
//                 <h3 className="font-black text-2xl mb-6 flex items-center gap-3">
//                   <Diamond className="w-6 h-6 text-cyan-600" />
//                   Investment & Value
//                 </h3>
//                 <div className="space-y-4 mb-8">
//                   <div className="flex justify-between items-center pb-3 border-b border-border">
//                     <span className="font-black">Monthly Tuition</span>
//                     <span className="text-2xl font-black text-cyan-600">
//                       {PROGRAM_DATA.priceRange}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center pb-3 border-b border-border">
//                     <span className="font-black">Family Discount</span>
//                     <span className="font-black text-cyan-600">
//                       15% off (3+ members)
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center pb-3 border-b border-border">
//                     <span className="font-black">Sibling Discount</span>
//                     <span className="font-black text-cyan-600">10% off</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-black">Free Assessment</span>
//                     <span className="font-black text-cyan-600">✓ Included</span>
//                   </div>
//                 </div>
//                 <Link href="/assessment">
//                   <Button className="w-full rounded-full py-4 font-black bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white">
//                     BOOK FREE ASSESSMENT
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Button>
//                 </Link>
//                 <p className="text-xs text-center text-muted-foreground mt-3">
//                   20-minute session • No commitment
//                 </p>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Testimonial Spotlight */}
//       <section className="mb-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="relative">
//             <Quote className="absolute -top-6 -left-6 w-16 h-16 text-cyan-200 dark:text-cyan-800/30" />
//             <div className="institutional-card p-8 md:p-12 text-center max-w-4xl mx-auto">
//               <p className="text-xl md:text-2xl italic text-muted-foreground mb-6">
//                 "My daughter was hesitant to start memorization, but the
//                 teachers at Al-Maysaroh made it so engaging and fun. She now
//                 looks forward to her classes and has memorized 15 surahs in just
//                 4 months!"
//               </p>
//               <div className="flex items-center justify-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center text-white font-black text-lg">
//                   S
//                 </div>
//                 <div className="text-left">
//                   <h4 className="font-black">Sarah Johnson</h4>
//                   <p className="text-sm text-muted-foreground">Parent, USA</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="mb-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-2 text-cyan-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
//               <MessageCircle className="w-3.5 h-3.5" /> Common Questions
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
//               Frequently Asked{" "}
//               <span className="text-cyan-600 italic">Questions</span>
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {FAQS.map((faq, i) => (
//               <Reveal key={i} delay={i * 0.05}>
//                 <div className="institutional-card p-6 hover:border-cyan-300 transition-all">
//                   <h3 className="font-black text-base mb-2">{faq.q}</h3>
//                   <p className="text-sm text-muted-foreground">{faq.a}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="pb-20">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="institutional-card p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-cyan-600/5 to-teal-600/5">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 mb-6 shadow-lg">
//               <Rocket className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-black mb-4">
//               Ready to Begin Your Child's Journey?
//             </h2>
//             <p className="text-muted-foreground mb-8 max-w-md mx-auto">
//               Join hundreds of families who have chosen Al-Maysaroh for their
//               child's Quranic education
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/assessment">
//                 <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white">
//                   START FREE ASSESSMENT
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/contact">
//                 <Button
//                   variant="outline"
//                   className="rounded-full px-8 py-4 font-black border-cyan-600 text-cyan-600 hover:bg-cyan-50"
//                 >
//                   TALK TO ADVISOR
//                 </Button>
//               </Link>
//             </div>
//             <p className="text-xs text-muted-foreground mt-4">
//               Limited spots available for next cohort
//             </p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }













// app/courses/juz-amma/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Crown,
  Flower,
  Globe,
  GraduationCap,
  Heart,
  Leaf,
  MessageCircle,
  Mic,
  Quote,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FAQSection } from "./faq";

// Universal Program Data - Timeless Design
const PROGRAM_DATA = {
  name: "Juz Amma Memorization",
  tagline: "The Gateway to Quranic Mastery",
  description:
    "A comprehensive program designed for anyone seeking to memorize the 30th Juz of the Quran with proper Tajweed, deep understanding, and a lasting connection to the Divine Word.",
  audience: "All Ages • All Levels",
  duration: "Flexible (6-18 months)",
  sessionsPerWeek: "1-5 sessions",
  sessionDuration: "30-60 minutes",
  format: "1-on-1 or Small Groups",
  surahs: 37,
  verses: 564,
  priceRange: "$2+/month",
  colors: {
    primary: "from-amber-600 to-orange-600",
    secondary: "from-orange-500 to-amber-500",
    accent: "from-gold to-amber-600",
    light: "amber-50",
    dark: "amber-950",
    border: "amber-200",
    text: "amber-700",
  },
};

// Universal Benefits - For Everyone
const BENEFITS = [
  {
    icon: Shield,
    title: "Authentic Sanad",
    description:
      "Learn through an unbroken chain of transmission reaching 1400 years",
    audience: "All students",
  },
  {
    icon: Brain,
    title: "Cognitive Development",
    description: "Enhance memory, focus, and mental discipline",
    audience: "Children & Adults",
  },
  {
    icon: Briefcase,
    title: "Flexible Scheduling",
    description: "Balance Quran with work, school, and family",
    audience: "Professionals & Students",
  },
  {
    icon: Heart,
    title: "Spiritual Connection",
    description: "Deepen your relationship with Allah's words",
    audience: "Everyone",
  },
  {
    icon: Mic,
    title: "Live Correction",
    description: "Real-time feedback from certified scholars",
    audience: "All levels",
  },
  {
    icon: Award,
    title: "Ijazah Pathway",
    description: "Progress toward formal certification",
    audience: "Advanced students",
  },
];

// Journey Paths - Different for Different Audiences
const JOURNEY_PATHS = [
  {
    audience: "Children (6-12)",
    icon: Baby,
    pace: "Gentle & Engaging",
    duration: "10-14 months",
    features: [
      "Fun activities",
      "Reward system",
      "Parent involvement",
      "Tajweed basics",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    audience: "Teens (13-17)",
    icon: User,
    pace: "Structured & Motivating",
    duration: "8-12 months",
    features: [
      "Peer learning",
      "Progress tracking",
      "Meaningful tafsir",
      "Goal setting",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    audience: "Adults (18+)",
    icon: GraduationCap,
    pace: "Flexible & Consistent",
    duration: "6-12 months",
    features: [
      "1-on-1 attention",
      "Custom pacing",
      "Deep understanding",
      "Ijazah prep",
    ],
    color: "from-amber-500 to-orange-500",
  },
  {
    audience: "Professionals",
    icon: Briefcase,
    pace: "Efficient & Sustainable",
    duration: "10-16 months",
    features: [
      "Early morning slots",
      "Weekend options",
      "Revision focus",
      "Practical approach",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

// Surah Categories - Universal Progression
const SURAH_CATEGORIES = [
  {
    name: "The Foundation",
    surahs: "Surah An-Nas to Al-Asr (114-103)",
    count: 12,
    description:
      "Short, powerful surahs that establish daily remembrance and spiritual grounding",
    icon: Leaf,
    difficulty: "Beginner-Friendly",
    duration: "3-5 months",
  },
  {
    name: "The Growth",
    surahs: "Surah At-Takathur to Al-Qadr (102-97)",
    count: 6,
    description:
      "Deeper concepts that build understanding and memorization stamina",
    icon: Flower,
    difficulty: "Intermediate",
    duration: "2-4 months",
  },
  {
    name: "The Mastery",
    surahs: "Surah Al-Alaq to An-Naba (96-78)",
    count: 19,
    description: "Extended surahs that develop fluency and profound connection",
    icon: Crown,
    difficulty: "Advanced",
    duration: "4-6 months",
  },
];

// Universal Milestones
const MILESTONES = [
  {
    level: "Foundation Level",
    surahs: "1-10",
    badge: "🌱",
    description: "Building confidence",
  },
  {
    level: "Intermediate Level",
    surahs: "11-20",
    badge: "🌿",
    description: "Developing fluency",
  },
  {
    level: "Advanced Level",
    surahs: "21-30",
    badge: "🌳",
    description: "Strengthening retention",
  },
  {
    level: "Master Level",
    surahs: "31-37",
    badge: "🏆",
    description: "Complete Juz Amma",
  },
];

// Success Stories - Diverse Representation
const SUCCESS_STORIES = [
  {
    name: "Zainab, 9",
    type: "Child",
    story:
      "I used to struggle with reading, now I can recite 20 surahs from memory! My teacher makes learning so much fun.",
    duration: "8 months",
    icon: Baby,
  },
  {
    name: "Adewale, 28",
    type: "Professional",
    story:
      "Balancing work and memorization seemed impossible. Al-Maysaroh's flexible scheduling made it possible. I'm halfway through Juz Amma!",
    duration: "6 months",
    icon: Briefcase,
  },
  {
    name: "Fateema, 45",
    type: "Mother",
    story:
      "Learning alongside my children has been a beautiful journey.",
    duration: "10 months",
    icon: Heart,
  },
  {
    name: "Yusuf, 16",
    type: "Teen",
    story:
      "I've completed Juz Amma and moving to Juz Tabarak!",
    duration: "9 months",
    icon: User,
  },
];

// FAQ - Universal Questions
const FAQS = [
  {
    q: "Can I join if I have no prior Arabic knowledge?",
    a: "Absolutely! We have students starting from absolute zero. Our teachers are experienced in guiding beginners of all ages.",
  },
  {
    q: "How much time do I need to dedicate daily?",
    a: "We recommend 15-30 minutes of daily revision. Consistency matters more than quantity. Our teachers help you build sustainable habits.",
  },
  {
    q: "What if I have a busy schedule?",
    a: "We offer flexible scheduling with sessions available 7 days a week, including early morning and evening slots for working professionals.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes! Every student has a personalized learning plan. You can accelerate or take more time based on your goals and availability.",
  },
  {
    q: "Is this program only for children?",
    a: "Not at all! We have students ranging from 6 to 65+. The program is tailored to each individual's learning style and goals.",
  },
  {
    q: "What's the difference between group and 1-on-1?",
    a: "Group classes (4-6 students) offer peer motivation and lower cost. 1-on-1 provides personalized attention and flexible pacing. Both are highly effective.",
  },
];

export default function JuzAmmaPage() {
  const [selectedFormat, setSelectedFormat] = useState("flexible");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Reduced for mobile
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Universal Background - Hidden on mobile for performance */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section - Mobile-First */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> For Everyone • All Ages • All Levels
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Memorize{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-gold whitespace-nowrap">
                Juz Amma
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              The most comprehensive, flexible, and effective program for memorizing the 30th Juz of the Quran, designed for anyone and everyone.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    START YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#paths" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-amber-600 text-amber-600"
                >
                  FIND YOUR PATH
                </Button>
              </Link>
            </div>

            {/* Universal Stats - Mobile-First Grid */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Students of All Ages", value: "50+", icon: Users },
                { label: "Success Rate", value: "94%", icon: Target },
                { label: "Countries", value: "15+", icon: Globe },
                { label: "Certified Graduates", value: "20+", icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-600">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}


               {/* Stats - Mobile-First Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
                          {[
                            { label: "Students of All Ages ", value: "50+", icon: Users },
                            { label: "Success Rate", value: "90%", icon: Target },
                            { label: "Global Reach", value: "6+", icon: Globe },
                            { label: "Certified Graduates", value: "20+", icon: Calendar },
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

      {/* Universal Benefits - Mobile-First */}
      <section className="py-12 sm:py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Benefits For All
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Designed for{" "}
              <span className="text-amber-600 italic">Every Learner</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
            {`  Whether you're a beginner or advanced, child or adult -- this
              program works for you. Here's how we make memorization accessible, effective, and transformative for everyone.`}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-amber-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">
                        {benefit.description}
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-600 font-black mt-1">
                        {benefit.audience}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Paths - Mobile-First Grid */}
      <section id="paths" className="py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey{" "}
              <span className="text-amber-600 italic">Tailored to You</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different needs - all leading to the same
              destination
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-linear-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-amber-600 font-black mb-1.5 sm:mb-2">
                      {path.pace}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {path.duration}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You'll Learn - Surah Progression */}
      <section className="py-12 sm:py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Journey
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              What You'll <span className="text-amber-600 italic">Achieve</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A clear progression from start to mastery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line - hidden on mobile */}
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-400 via-orange-400 to-gold" />
              <div className="space-y-6 sm:space-y-8">
                {SURAH_CATEGORIES.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-amber-500 to-orange-500 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">
                                  {category.name}
                                </h3>
                              </div>
                              <p className="text-[10px] sm:text-xs text-amber-600 font-black mb-1.5 sm:mb-2 break-words">
                                {category.surahs}
                              </p>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-[8px] sm:text-[10px] font-black">
                                {category.difficulty} • {category.duration}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm text-muted-foreground break-words">
                                {category.description}
                              </p>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
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

      {/* Universal Milestones - Mobile-First Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Celebrate Progress
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Every <span className="text-amber-600 italic">Milestone</span>{" "}
              Matters
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Recognition at every stage keeps you motivated
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {MILESTONES.map((milestone, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-4 sm:p-6 rounded-xl bg-linear-to-br from-amber-50/30 to-orange-50/30 border border-amber-100 dark:border-amber-800">
                  <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">{milestone.badge}</div>
                  <h3 className="font-black text-sm sm:text-lg mb-0.5 sm:mb-1">{milestone.level}</h3>
                  <p className="text-xs sm:text-sm text-amber-600 font-black mb-1 sm:mb-2">
                    {milestone.surahs} surahs
                  </p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories - Mobile-First Grid */}
      <section className="py-12 sm:py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Real Stories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-amber-600 italic">Community</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Students of all ages and backgrounds who found success
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-amber-600 font-black">
                          {story.type}
                        </p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-amber-200 dark:text-amber-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">
                      {`"${story.story}"`}
                    </p>
                    <p className="text-[10px] sm:text-xs text-amber-600 font-black mt-3">
                      Completed in {story.duration}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flexible Format Options - Mobile-First Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Format
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Learn Your <span className="text-amber-600 italic">Way</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Flexible options to fit your lifestyle and learning preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "1-on-1 Private",
                price: "$2+/month",
                features: [
                  "Personalized attention",
                  "Flexible scheduling",
                  "Custom pacing",
                  "Direct feedback",
                ],
                icon: User,
                popular: false,
              },
              {
                title: "Small Group",
                price: "$7/month",
                features: [
                  "Peer motivation",
                  "4-10 students",
                  "Collaborative learning",
                  "Lower cost",
                ],
                icon: Users,
                popular: true,
              },
              {
                title: "Self-Paced",
                price: "$2+/month",
                features: [
                  "Recorded lessons",
                  "Weekly check-ins",
                  "Flexible timing",
                  "Progress tracking",
                ],
                icon: Clock,
                popular: false,
              },
            ].map((format, i) => {
              const Icon = format.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div
                    className={`bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-5 sm:p-6 text-center h-full ${format.popular ? "border-2 border-amber-500 relative" : ""}`}
                  >
                    {format.popular && (
                      <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-linear-to-r from-amber-600 to-orange-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-1 sm:mb-2">{format.title}</h3>
                    <div className="text-xl sm:text-2xl font-black text-amber-600 mb-3 sm:mb-4">
                      {format.price}
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-left mb-5 sm:mb-6">
                      {format.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                          <span className="break-words">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/admissions">
                      <Button className="w-full rounded-full py-2.5 sm:py-3 font-black text-xs sm:text-sm bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <MessageCircle className="w-3.5 h-3.5" /> Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4">
              Your <span className="text-amber-600 italic">Questions</span>
             {`, Answered`}
            </h2>
          </div>
{/* 
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="institutional-card p-6 hover:border-amber-300 transition-all">
                  <h3 className="font-black text-base mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div> */}
      <FAQSection />
        </div>
      </section>
     

      {/* Final Universal CTA - Mobile-First */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-amber-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-linear-to-br from-amber-600/5 to-orange-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-500 to-orange-500 mb-4 sm:mb-6 shadow-lg">
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">
              Start Your Juz Amma Journey Today
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              No matter your age, background, or schedule — we have a path for
              you. Begin with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-amber-600 text-amber-600"
                >
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">
              Free 20-minute session • No commitment • All ages welcome
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
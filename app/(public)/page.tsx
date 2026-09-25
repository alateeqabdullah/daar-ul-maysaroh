// // app/(marketing)/page.tsx
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Globe,
//   Building2,
//   ShieldCheck,
//   Users,
//   Award,
//   Sparkles,
//   BookOpen,
//   Crown,
//   Mic,
//   Heart,
//   CheckCircle2,
//   Compass,
//   Target,
//   Infinity,
//   Quote,
//   GraduationCap,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Reveal } from "@/components/shared/section-animation";

// // ============================================================
// // DATA
// // ============================================================

// const TRUST_SEALS = [
//   { label: "Ijazah Authenticated", icon: ShieldCheck, color: "purple" },
//   { label: "Authentic Sanad Chain", icon: Crown, color: "amber" },
//   { label: "1-on-1 Instruction", icon: Users, color: "purple" },
//   { label: "Global Reach", icon: Globe, color: "amber" },
// ];

// const PROGRAMS = [
//   {
//     id: "tahfeedh",
//     title: "Tahfeedh",
//     subtitle: "Quran Memorization",
//     description:
//       "Complete memorization of the Quran with proper Tajweed and revision system.",
//     icon: BookOpen,
//     color: "purple",
//     features: ["Personalized Plan", "Daily Revision", "Ijazah Track"],
//     audience: "All Ages",
//   },
//   {
//     id: "tajweed",
//     title: "Tajweed",
//     subtitle: "Scientific Recitation",
//     description:
//       "Master the rules of Quranic recitation with precision and proper pronunciation.",
//     icon: Mic,
//     color: "amber",
//     features: ["Makharij Mastery", "Sifaat Practice", "Audio Analysis"],
//     audience: "All Levels",
//   },
//   {
//     id: "qiraat",
//     title: "Qira'aat",
//     subtitle: "The Ten Recitations",
//     description:
//       "Study the ten authentic Qira'at with certified scholars and Sanad chains.",
//     icon: Crown,
//     color: "purple",
//     features: ["Ten Qira'at", "Sanad Verification", "Advanced Study"],
//     audience: "Advanced",
//   },
//   {
//     id: "arabic",
//     title: "Arabic Language",
//     subtitle: "Quranic Arabic",
//     description:
//       "Learn classical Arabic to understand the Quran in its original language.",
//     icon: Globe,
//     color: "amber",
//     features: ["Grammar", "Vocabulary", "Tafsir Reading"],
//     audience: "Beginner+",
//   },
//   {
//     id: "tafsir",
//     title: "Tafsir",
//     subtitle: "Quranic Exegesis",
//     description:
//       "Deep dive into Quranic meaning with classical and contemporary scholarship.",
//     icon: BookOpen,
//     color: "purple",
//     features: [
//       "Classical Sources",
//       "Scholarly Analysis",
//       "Practical Application",
//     ],
//     audience: "Intermediate+",
//   },
//   {
//     id: "children",
//     title: "Children's Program",
//     subtitle: "Foundation & Juz Amma",
//     description:
//       "Fun, engaging Quran learning for children aged 5-12 with structured progression.",
//     icon: Heart,
//     color: "amber",
//     features: ["Juz Amma", "Fun Activities", "Parent Portal"],
//     audience: "Ages 5-12",
//   },
// ];

// const FEATURES = [
//   {
//     icon: ShieldCheck,
//     title: "Authentic Sanad",
//     description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
//     color: "purple",
//   },
//   {
//     icon: Award,
//     title: "Ijazah Certification",
//     description:
//       "Formal certification recognized by Islamic scholarly councils",
//     color: "amber",
//   },
//   {
//     icon: Users,
//     title: "1-on-1 Instruction",
//     description: "Personalized attention from certified teachers",
//     color: "purple",
//   },
//   {
//     icon: Globe,
//     title: "Flexible Learning",
//     description: "Online or in-person, at your own pace",
//     color: "amber",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     name: "Isa",
//     role: "Online",
//     content:
//       "I am grateful for the comprehensive curriculum and dedicated teachers at Al-Maysaroh.",
//     initials: "I",
//   },
//   {
//     name: "Yusuf",
//     role: "Boarding Student",
//     content:
//       "The boarding program at Al-Maysaroh has been a transformative experience for my spiritual growth.",
//     initials: "Y",
//   },
// ];

// const STATS = [
//   { value: "50+", label: "Active Students", icon: Users, color: "purple" },
//   { value: "94%", label: "Success Rate", icon: Award, color: "amber" },
//   { value: "5+", label: "Countries", icon: Globe, color: "purple" },
//   {
//     value: "1400+",
//     label: "Years of Sanad",
//     icon: ShieldCheck,
//     color: "amber",
//   },
// ];

// // ============================================================
// // COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// // ============================================================

// const getColorStyles = (color: string) => {
//   const styles = {
//     purple: {
//       text: "text-purple-700 dark:text-purple-400",
//       border: "border-purple-200 dark:border-purple-800/30",
//       bg: "bg-purple-100 dark:bg-purple-600/20",
//       lightBg: "bg-purple-50 dark:bg-purple-950/40",
//       linear:
//         "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
//       glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
//       hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
//     },
//     amber: {
//       text: "text-amber-700 dark:text-amber-400",
//       border: "border-amber-200 dark:border-amber-800/30",
//       bg: "bg-amber-100 dark:bg-amber-500/20",
//       lightBg: "bg-amber-50 dark:bg-amber-950/40",
//       linear:
//         "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
//       glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
//       hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
//     },
//   };
//   return styles[color as keyof typeof styles] || styles.purple;
// };

// // ============================================================
// // COMPONENTS
// // ============================================================

// function PremiumStatCard({ value, label, icon, delay, color }: any) {
//   const Icon = icon;
//   const colors = getColorStyles(color);
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: delay || 0 }}
//       className="text-center group"
//     >
//       <div
//         className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
//       >
//         <Icon className={`w-7 h-7 ${colors.text}`} />
//       </div>
//       <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>
//         {value}
//       </div>
//       <div className="text-xs text-muted-foreground">{label}</div>
//     </motion.div>
//   );
// }

// function PremiumCampusCard({
//   href,
//   title,
//   description,
//   features,
//   icon,
//   color,
//   buttonText,
// }: any) {
//   const colors = getColorStyles(color);

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       className="h-full"
//     >
//       <Link href={href} className="block h-full">
//         <div
//           className={cn(
//             "group relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl h-full flex flex-col bg-card hover:bg-muted/30 dark:bg-slate-900/50 dark:hover:bg-slate-900/70",
//             colors.border,
//           )}
//         >
//           {/* Glow Effect */}
//           <div
//             className={`absolute -inset-0.5 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}
//           />

//           {/* Icon */}
//           <div
//             className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 ${colors.bg}`}
//           >
//             <div className={colors.text}>{icon}</div>
//           </div>

//           <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">
//             {title}
//           </h3>
//           <p className="text-muted-foreground text-sm mb-4">{description}</p>

//           <ul className="space-y-2 mb-6 flex-1">
//             {features.map((feature: string, i: number) => (
//               <li
//                 key={i}
//                 className="flex items-center gap-2 text-sm text-muted-foreground"
//               >
//                 <CheckCircle2 className={cn("w-4 h-4", colors.text)} />
//                 {feature}
//               </li>
//             ))}
//           </ul>

//           <Button
//             className={cn(
//               "w-full font-black group/btn rounded-xl py-3 text-white",
//               `bg-linear-to-r ${colors.linear} shadow-lg ${colors.glow} hover:shadow-xl transition-all`,
//             )}
//           >
//             {buttonText}
//             <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//           </Button>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

// // ============================================================
// // PAGE
// // ============================================================

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen bg-background overflow-hidden">
//       {/* ============================================================
//            HERO SECTION
//            ============================================================ */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">
//         {/* Background Effects - Light/Dark aware */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-1/4 right-1/2 w-[800px] h-[800px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
//           <div
//             className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] dark:opacity-[0.02] bg-center bg-repeat"
//             style={{ backgroundSize: "300px" }}
//           />
//           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-3xl" />
//         </div>

//         <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-5xl mx-auto"
//           >
//             <div className="text-center">
//               {/* Badge - Light/Dark aware */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-600/30 mb-6">
//                 <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-500" />
//                 <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-amber-500">
//                   {`Al-Maysaroh Institute • Ijazah Certified`}
//                 </span>
//               </div>

//               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[1.1] mb-6 text-foreground">
//                 Your Journey to
//                 <span className="block bg-linear-to-r from-purple-600 via-amber-600 to-purple-600 dark:from-purple-400 dark:via-amber-500 dark:to-purple-400 bg-clip-text text-transparent">
//                   Quranic Excellence
//                 </span>
//               </h1>

//               <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
//                 Choose your learning path. Whether online from anywhere or
//                 in-person at our physical campus, start your Sanad today.
//               </p>

//               {/* Stats Row */}
//               <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
//                 {STATS.map((stat, i) => (
//                   <PremiumStatCard
//                     key={i}
//                     value={stat.value}
//                     label={stat.label}
//                     icon={stat.icon}
//                     color={stat.color}
//                     delay={0.2 + i * 0.1}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Campus Cards */}
//             <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               <PremiumCampusCard
//                 href="/online"
//                 title="Online Campus"
//                 description="Learn from anywhere with 1-on-1 sessions"
//                 features={[
//                   "Flexible Scheduling",
//                   "Global Access",
//                   "Certified Teachers",
//                 ]}
//                 icon={<Globe className="w-8 h-8" />}
//                 color="purple"
//                 buttonText="Explore Online"
//               />
//               <PremiumCampusCard
//                 href="/onsite"
//                 title="Physical Campus"
//                 description="Full-time residential Quran memorization"
//                 features={[
//                   "Boarding Available",
//                   "Structured Routine",
//                   "Community",
//                 ]}
//                 icon={<Building2 className="w-8 h-8" />}
//                 color="amber"
//                 buttonText="Explore Physical"
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2"
//         >
//           <div className="w-6 h-10 rounded-full border-2 border-purple-300 dark:border-purple-600/30 flex items-start justify-center p-1">
//             <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-bounce" />
//           </div>
//         </motion.div>
//       </section>

//       {/* ============================================================
//            TRUST SEALS
//            ============================================================ */}
//       <section className="py-12 md:py-16 border-y border-border bg-muted/20 dark:bg-slate-900/30">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
//             {TRUST_SEALS.map((item, i) => {
//               const Icon = item.icon;
//               const colors = getColorStyles(item.color);
//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   className="text-center group"
//                 >
//                   <div
//                     className={cn(
//                       "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
//                       colors.lightBg,
//                     )}
//                   >
//                     <Icon className={cn("w-7 h-7", colors.text)} />
//                   </div>
//                   <p className={cn("text-xs font-black", colors.text)}>
//                     {item.label}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//            PROGRAMS SECTION
//            ============================================================ */}
//       <section className="py-16 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <Reveal>
//             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
//                 <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Compass className="w-4 h-4" />
//                   Our Programs
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
//               </div>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
//                 Comprehensive{" "}
//                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
//                   Quranic Education
//                 </span>
//               </h2>
//               <p className="text-lg text-muted-foreground">
//               {`  Whether you're beginning your journey or seeking advanced
//                 certification, we have a program tailored for you.`}
//               </p>
//             </div>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {PROGRAMS.map((program, index) => {
//               const Icon = program.icon;
//               const colors = getColorStyles(program.color);
//               return (
//                 <Reveal key={program.id} delay={index * 0.05}>
//                   <motion.div
//                     whileHover={{ y: -6 }}
//                     className="bg-card rounded-2xl border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all p-6 h-full flex flex-col group"
//                   >
//                     <div
//                       className={cn(
//                         "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
//                         colors.lightBg,
//                       )}
//                     >
//                       <Icon className={cn("w-7 h-7", colors.text)} />
//                     </div>

//                     <h3 className="font-black text-lg text-foreground mb-0.5">
//                       {program.title}
//                     </h3>
//                     <p
//                       className={cn(
//                         "text-xs font-black uppercase tracking-wider mb-2",
//                         colors.text,
//                       )}
//                     >
//                       {program.subtitle}
//                     </p>

//                     <p className="text-sm text-muted-foreground mb-4 flex-1">
//                       {program.description}
//                     </p>

//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {program.features.map((feature, idx) => (
//                         <span
//                           key={idx}
//                           className={cn(
//                             "text-[10px] font-black px-2.5 py-1 rounded-full",
//                             colors.lightBg,
//                             colors.text,
//                           )}
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     {/* <div className="text-xs text-muted-foreground">
//                       🎯 {program.audience}
//                     </div> */}
//                   </motion.div>
//                 </Reveal>
//               );
//             })}
//           </div>

//           <Reveal delay={0.3}>
//             <div className="text-center mt-12">
//               <Link href="/online/courses">
//                 <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
//                   View All Programs
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ============================================================
//            FEATURES SECTION
//            ============================================================ */}
//       <section className="py-16 md:py-24 bg-linear-to-b from-transparent via-purple-50/50 to-amber-50/50 dark:via-purple-600/5 dark:to-amber-600/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <Reveal>
//             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
//                 <span className="text-purple-700 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Target className="w-4 h-4" />
//                   Why Choose Us
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
//               </div>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
//                 The{" "}
//                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
//                   Al-Maysaroh
//                 </span>{" "}
//                 Advantage
//               </h2>
//               <p className="text-lg text-muted-foreground">
//                 What sets our Quranic education apart
//               </p>
//             </div>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
//             {FEATURES.map((feature, index) => {
//               const Icon = feature.icon;
//               const colors = getColorStyles(feature.color);
//               return (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all group">
//                     <div
//                       className={cn(
//                         "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
//                         colors.lightBg,
//                       )}
//                     >
//                       <Icon className={cn("w-8 h-8", colors.text)} />
//                     </div>
//                     <h3
//                       className={cn(
//                         "font-black text-base text-foreground mb-2",
//                         colors.text,
//                       )}
//                     >
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//            TESTIMONIALS SECTION
//            ============================================================ */}
//       <section className="py-16 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <Reveal>
//             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
//                 <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Quote className="w-4 h-4" />
//                   Testimonials
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
//               </div>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
//                 What Our{" "}
//                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
//                   Students
//                 </span>{" "}
//                 Say
//               </h2>
//             </div>
//           </Reveal>

//           <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {TESTIMONIALS.map((testimonial, index) => (
//               <Reveal key={index} delay={index * 0.1}>
//                 <div className="bg-card rounded-2xl border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all p-6 h-full flex flex-col">
//                   <Quote className="w-8 h-8 text-amber-300 dark:text-amber-500/30 mb-3" />
//                   <p className="text-sm text-muted-foreground italic mb-4 flex-1 leading-relaxed">
//                     {`"${testimonial.content}"`}
//                   </p>
//                   <div className="flex items-center gap-3 pt-3 border-t border-border">
//                     <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black text-sm">
//                       {testimonial.initials}
//                     </div>
//                     <div>
//                       <p className="font-black text-sm text-foreground">
//                         {testimonial.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {testimonial.role}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//            ADDITIONAL DETAILS SECTION - NEW
//            ============================================================ */}
//       <section className="py-16 md:py-24 bg-linear-to-b from-transparent via-purple-50/50 to-amber-50/50 dark:via-purple-600/5 dark:to-amber-600/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <Reveal>
//             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
//                 <span className="text-purple-700 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
//                   <Zap className="w-4 h-4" />
//                   Why Al-Maysaroh
//                 </span>
//                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
//               </div>
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
//                 Built on{" "}
//                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
//                   Tradition
//                 </span>
//                 , Powered by{" "}
//                 <span className="bg-linear-to-r from-amber-600 to-purple-600 dark:from-amber-400 dark:to-purple-400 bg-clip-text text-transparent italic">
//                   Innovation
//                 </span>
//               </h2>
//               <p className="text-lg text-muted-foreground">
//                 Combining 1,400 years of scholarly tradition with modern
//                 pedagogy for optimal learning.
//               </p>
//             </div>
//           </Reveal>

//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {[
//               {
//                 icon: ShieldCheck,
//                 title: "Authentic Sanad",
//                 desc: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
//                 color: "purple",
//               },
//               {
//                 icon: Users,
//                 title: "Personalized Learning",
//                 desc: "1-on-1 instruction tailored to each student's pace",
//                 color: "amber",
//               },
//               {
//                 icon: GraduationCap,
//                 title: "Ijazah Certification",
//                 desc: "Formal certification recognized by scholarly councils",
//                 color: "purple",
//               },
//             ].map((item, index) => {
//               const Icon = item.icon;
//               const colors = getColorStyles(item.color);
//               return (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all group">
//                     <div
//                       className={cn(
//                         "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
//                         colors.lightBg,
//                       )}
//                     >
//                       <Icon className={cn("w-8 h-8", colors.text)} />
//                     </div>
//                     <h3
//                       className={cn(
//                         "font-black text-lg text-foreground mb-2",
//                         colors.text,
//                       )}
//                     >
//                       {item.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground">{item.desc}</p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//            CTA SECTION
//            ============================================================ */}
//       <section className="py-16 md:py-24 bg-linear-to-br from-purple-600/10 via-purple-700/10 to-amber-600/10 dark:from-purple-600/20 dark:via-purple-700/20 dark:to-amber-600/20">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-purple-600 to-amber-500 mb-6 shadow-xl shadow-purple-500/30">
//               <Sparkles className="w-10 h-10 text-white" />
//             </div>

//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
//               Ready to Begin Your Journey?
//             </h2>

//             <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
//               Choose your learning path and start your Sanad today. Your journey
//               to Quranic excellence begins here.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/online">
//                 <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all group">
//                   Start Online
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <Link href="/onsite">
//                 <Button
//                   variant="outline"
//                   className="rounded-full px-8 py-4 font-black border-amber-500 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
//                 >
//                   Visit Physical Campus
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </Link>
//             </div>

//             <p className="text-muted-foreground text-sm mt-6">
//               Free assessment • No commitment • All ages welcome
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================================================
//            FOOTER TRUST BADGE
//            ============================================================ */}
//       <div className="py-4 border-t border-border bg-muted/20 dark:bg-slate-900/30">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
//             <span className="flex items-center gap-1.5">
//               <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
//               Ijazah Certified
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
//               Authentic Sanad
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
//               50+ Students
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
//               5+ Countries
//             </span>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }









// app/(marketing)/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Building2,
  ShieldCheck,
  Users,
  Award,
  BookOpen,
  Crown,
  Mic,
  Heart,
  Check,
  GraduationCap,
  Compass,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/section-animation";

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS                                                       */
/* ------------------------------------------------------------------ */

const BRAND = {
  purple: "text-primary-700 dark:text-primary-300",

  // Gradient — appears in exactly 3 forms page-wide
  gradientText:
    "bg-gradient-to-r from-primary-700 via-primary-600 to-[--color-gold] bg-clip-text text-transparent",
  gradientRule: "bg-gradient-to-r from-primary-600 to-[--color-gold]",
  gradientButton:
    "bg-gradient-to-r from-primary-700 via-primary-600 to-[--color-gold]",
  gradientWashHero:
    "radial-gradient(1400px 700px at 70% -10%, hsl(262 83% 58% / 0.11), transparent 55%), radial-gradient(1100px 600px at 10% 110%, #d4af37 / 0.10, transparent 55%)",
  gradientWashSection:
    "radial-gradient(1000px 500px at 90% -10%, hsl(262 83% 58% / 0.06), transparent 60%), radial-gradient(900px 500px at 0% 110%, #d4af37 / 0.06, transparent 60%)",
};

/* ------------------------------------------------------------------ */
/*  MOTION — slow and deliberate                                       */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.9, delay: i * 0.07, ease: EASE },
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "50+", label: "Students in residence" },
  { value: "5", label: "Countries represented" },
  { value: "1,400", label: "Years of Sanad" },
  { value: "94%", label: "Completion rate" },
] as const;

const TRUST = [
  { label: "Ijazah Authenticated", icon: ShieldCheck },
  { label: "Authentic Sanad", icon: Crown },
  { label: "One-to-One Instruction", icon: Users },
  { label: "Global Reach", icon: Globe },
] as const;

const CAMPUSES = [
  {
    href: "/onsite",
    title: "Physical Campus",
    arabic: "الحَرَم",
    subtitle: "Residential study",
    description:
      "Full-time memorisation and recitation at our residential campus — boarding, structured daily routine, and community life.",
    features: [
      "Boarding available",
      "Structured daily routine",
      "Community and brotherhood",
      "Supervised study",
    ],
    icon: Building2,
    primary: true,
    cta: "Enter the campus",
  },
  {
    href: "/online",
    title: "Online Campus",
    arabic: "عَنْ بُعْد",
    subtitle: "Study from anywhere",
    description:
      "One-to-one instruction from certified teachers, scheduled around your life, delivered from anywhere in the world.",
    features: [
      "Flexible scheduling",
      "One-to-one sessions",
      "Certified teachers",
      "Global access",
    ],
    icon: Globe,
    primary: false,
    cta: "Study online",
  },
] as const;

const PROGRAMS = [
  {
    id: "tahfeedh",
    title: "Tahfeedh",
    arabic: "التحفيظ",
    subtitle: "Qur'an Memorisation",
    icon: BookOpen,
    description:
      "Complete memorisation of the Qur'an with structured daily revision and personal pacing.",
    teacher: "Under scholars of Ijazah",
    meta: ["Sabq", "Muraja'ah", "One-to-one"],
  },
  {
    id: "tajweed",
    title: "Tajweed",
    arabic: "التجويد",
    subtitle: "The Science of Recitation",
    icon: Mic,
    description:
      "The articulation points, the attributes of letters, and the rules of recitation — studied and applied.",
    teacher: "Under certified reciters",
    meta: ["Makharij", "Sifaat", "Applied"],
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
  },
  {
    id: "arabic",
    title: "Arabic Language",
    arabic: "اللغة العربية",
    subtitle: "Qur'anic Arabic",
    icon: Globe,
    description:
      "Classical Arabic grammar and morphology — the tools to read the Qur'an and its sciences.",
    teacher: "Under scholars of the Arabic tongue",
    meta: ["Nahw", "Sarf", "Reading"],
  },
  {
    id: "tafsir",
    title: "Tafsir",
    arabic: "التفسير",
    subtitle: "Qur'anic Exegesis",
    icon: Compass,
    description:
      "Classical and contemporary exegesis of the Qur'an, studied from the primary sources.",
    teacher: "Under scholars of Tafsir",
    meta: ["Classical", "Analysis", "Applied"],
  },
  {
    id: "children",
    title: "Children's Programme",
    arabic: "برنامج الأطفال",
    subtitle: "Foundation & Juz 'Amma",
    icon: Heart,
    description:
      "Careful, unhurried grounding in Qur'anic recitation and character for children aged five to twelve.",
    teacher: "Under primary-stage teachers",
    meta: ["Juz 'Amma", "Manners", "Family portal"],
  },
] as const;

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Authentic Sanad",
    description:
      "An unbroken chain of transmission to the Prophet ﷺ, preserved teacher to student for fourteen centuries.",
  },
  {
    icon: Users,
    title: "One-to-One Instruction",
    description:
      "Every student is taught individually — paced, corrected, and encouraged by a qualified teacher.",
  },
  {
    icon: GraduationCap,
    title: "Ijazah Certification",
    description:
      "Formal certification in recitation and memorisation, recognised by scholarly councils.",
  },
] as const;

const TESTIMONIALS = [
  {
    name: "Isā",
    role: "Online student",
    content:
      "I am grateful for the comprehensive curriculum and the dedication of the teachers at Al-Maysaroh.",
  },
  {
    name: "Yūsuf",
    role: "Boarding student",
    content:
      "The boarding programme has been a transformative experience for my spiritual growth and my memorisation.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  SHARED COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span aria-hidden className={cn("h-px w-12", BRAND.gradientRule)} />
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
        {children}
      </span>
      <span aria-hidden className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* ============================================================
          HERO — one large gradient wash, everything else calm
          ============================================================ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: BRAND.gradientWashHero }}
        />

        <div className="container relative z-10 mx-auto px-6 py-28 sm:py-32 md:py-40 lg:px-8 lg:py-48">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="mx-auto max-w-5xl"
          >
            {/* Wordmark — the gradient moment */}
            <div className="mb-10 flex items-center gap-5">
              <span
                dir="rtl"
                lang="ar"
                className={cn(
                  "font-quran text-[26px] leading-none sm:text-[32px]",
                  BRAND.gradientText
                )}
              >
                دار الميسرة
              </span>
              <span aria-hidden className="h-px w-10 bg-foreground/15" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/60">
                Al-Maysaroh Institute
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-heading text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Your journey to
              <br />
              <span className="text-foreground/35">Qur&apos;anic</span>{" "}
              <span className={BRAND.gradientText}>excellence</span>,
              <br />
              <span className="text-foreground/35">
                transmitted as it was{" "}
              </span>
              <span className={BRAND.purple}>received</span>.
            </h1>

            {/* Lead */}
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-[18px]">
              A traditional madrasah for the memorisation and recitation of
              the Qur&apos;an — grounded in authentic Sanad, taught one
              student at a time, and offered both online and at our
              residential campus.
            </p>

            {/* CTAs — one gradient, one flat */}
            <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/onsite"
                className={cn(
                  "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-xl shadow-primary-700/25 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-700/30",
                  BRAND.gradientButton
                )}
              >
                Enter the Physical Campus
                <ArrowRight
                  className="h-[15px] w-[15px] transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>

              <Link
                href="/online"
                className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground/85 transition-all duration-500 hover:border-primary-700/50 hover:text-primary-700 dark:hover:border-primary-300/50 dark:hover:text-primary-300"
              >
                Study Online
                <ArrowRight
                  className="h-[15px] w-[15px] transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          STATS — flat numbers, generous grid
          ============================================================ */}
      <section className="border-y border-foreground/10 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-foreground/10 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} {...reveal(i)}>
                <div className="flex flex-col bg-background px-8 py-12 sm:px-10">
                  <span className="font-heading text-[2.75rem] font-bold tabular-nums leading-none tracking-[-0.03em] text-primary-700 dark:text-primary-300 sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-foreground/55">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST SEALS — quiet, no decoration
          ============================================================ */}
      <section className="border-b border-foreground/10 bg-background py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">
            {TRUST.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} {...reveal(i)}>
                  <div className="flex flex-col items-start">
                    <Icon
                      className="mb-6 h-[22px] w-[22px] text-primary-700 dark:text-primary-300"
                      strokeWidth={1.5}
                    />
                    <span className="text-[14px] font-semibold leading-snug text-foreground/85">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          TWO CAMPUSES
          ============================================================ */}
      <section className="relative bg-background py-28 sm:py-32 md:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: BRAND.gradientWashSection }}
        />

        <div className="container relative mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-20 max-w-4xl">
              <SectionLabel>Two Campuses</SectionLabel>

              <h2 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.75rem]">
                The same curriculum,
                <br />
                <span className="text-foreground/35">wherever you </span>
                <span className={BRAND.gradientText}>study</span>.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
                Study with us in residence at the campus, or one-to-one from
                wherever you are. The teaching, the Sanad, and the standards
                are the same.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {CAMPUSES.map((campus, i) => {
              const Icon = campus.icon;
              return (
                <motion.div key={campus.href} {...reveal(i)}>
                  <Link
                    href={campus.href}
                    className={cn(
                      "group relative flex h-full flex-col rounded-2xl border bg-background p-10 transition-all duration-700 sm:p-12",
                      campus.primary
                        ? "border-primary-700/30 shadow-xl shadow-primary-700/5 hover:shadow-2xl hover:shadow-primary-700/10 dark:border-primary-300/30"
                        : "border-foreground/10 hover:border-primary-700/30 dark:hover:border-primary-300/30"
                    )}
                  >
                    <div className="mb-10 flex items-start justify-between">
                      <Icon
                        className="h-7 w-7 text-primary-700 dark:text-primary-300"
                        strokeWidth={1.5}
                      />
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-quran text-[20px] leading-none text-foreground/45"
                      >
                        {campus.arabic}
                      </span>
                    </div>

                    <h3 className="font-heading text-[28px] font-bold tracking-[-0.02em] text-foreground sm:text-[32px]">
                      {campus.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-foreground/55">
                      {campus.subtitle}
                    </p>

                    <p className="mt-8 mb-10 flex-1 text-[15px] leading-[1.75] text-foreground/70">
                      {campus.description}
                    </p>

                    <ul className="mb-10 space-y-3">
                      {campus.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-[14px] leading-relaxed text-foreground/70"
                        >
                          <Check
                            className="mt-[3px] h-[14px] w-[14px] shrink-0 text-primary-700 dark:text-primary-300"
                            strokeWidth={2.25}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between border-t border-foreground/10 pt-6">
                      <span className="text-[13px] font-semibold tracking-wide text-foreground/75 transition-colors duration-500 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                        {campus.cta}
                      </span>
                      <ArrowRight
                        className="h-[15px] w-[15px] text-foreground/45 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                        strokeWidth={2}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROGRAMS
          ============================================================ */}
      <section className="bg-background pb-28 sm:pb-32 md:pb-40">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-20 max-w-4xl">
              <SectionLabel>The Curriculum</SectionLabel>

              <h2 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.75rem]">
                A complete course of study,
                <br />
                <span className="text-foreground/35">
                  taught the way it was{" "}
                </span>
                <span className={BRAND.gradientText}>meant to be taught</span>.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
                Six disciplines, each grounded in authentic transmission and
                taught in the classical manner — with patience, precision, and
                the companionship of a teacher.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {PROGRAMS.map((program, i) => {
              const Icon = program.icon;
              return (
                <motion.div key={program.id} {...reveal(i % 3)}>
                  <Link
                    href={`/onsite/programs/${program.id}`}
                    className="group relative flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-8 transition-all duration-700 hover:border-primary-700/30 hover:shadow-xl hover:shadow-primary-700/5 dark:hover:border-primary-300/30 sm:p-9"
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <Icon
                        className="h-6 w-6 text-primary-700 dark:text-primary-300"
                        strokeWidth={1.5}
                      />
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-quran text-[18px] leading-none text-foreground/40"
                      >
                        {program.arabic}
                      </span>
                    </div>

                    <h3 className="font-heading text-[22px] font-bold tracking-[-0.015em] text-foreground transition-colors duration-500 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                      {program.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.1em] text-foreground/50">
                      {program.subtitle}
                    </p>

                    <p className="mt-6 mb-6 flex-1 text-[14px] leading-[1.7] text-foreground/70">
                      {program.description}
                    </p>

                    <p className="mb-6 border-l-2 border-primary-700/40 pl-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/55 dark:border-primary-300/40">
                      {program.teacher}
                    </p>

                    <div className="mb-6 text-[12px] leading-relaxed text-foreground/50">
                      {program.meta.join("  ·  ")}
                    </div>

                    <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
                      <span className="text-[12px] font-semibold tracking-wide text-foreground/70 transition-colors duration-500 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                        Read more
                      </span>
                      <ArrowRight
                        className="h-[14px] w-[14px] text-foreground/45 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                        strokeWidth={2}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-foreground/10 pt-12 sm:flex-row sm:items-center">
              <p className="max-w-xl text-[14px] leading-relaxed text-foreground/60">
                Every programme is delivered under scholars holding Ijazah, and
                prepares students for certification where applicable.
              </p>
              <Link
                href="/onsite/programs"
                className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-[13px] font-semibold tracking-wide text-foreground/80 transition-all duration-500 hover:border-primary-700/50 hover:text-primary-700 dark:hover:border-primary-300/50 dark:hover:text-primary-300"
              >
                See all programmes
                <ArrowRight
                  className="h-[14px] w-[14px] transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PRINCIPLES
          ============================================================ */}
      <section className="relative border-y border-foreground/10 bg-background py-28 sm:py-32 md:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: BRAND.gradientWashSection }}
        />

        <div className="container relative mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-20 max-w-4xl">
              <SectionLabel>Why Al-Maysaroh</SectionLabel>

              <h2 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.75rem]">
                Built on tradition,
                <br />
                <span className="text-foreground/35">held to the </span>
                <span className={BRAND.gradientText}>standards of it</span>.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {PRINCIPLES.map((principle, i) => {
              const Icon = principle.icon;
              return (
                <motion.div key={principle.title} {...reveal(i)}>
                  <div className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-background/80 p-10 backdrop-blur-sm">
                    <Icon
                      className="mb-8 h-7 w-7 text-primary-700 dark:text-primary-300"
                      strokeWidth={1.5}
                    />

                    <h3 className="font-heading text-[22px] font-bold tracking-[-0.01em] text-foreground">
                      {principle.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-[1.75] text-foreground/70">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section className="bg-background py-28 sm:py-32 md:py-40">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-20 max-w-4xl">
              <SectionLabel>From the Students</SectionLabel>

              <h2 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.75rem]">
                In their own{" "}
                <span className={BRAND.gradientText}>words</span>.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...reveal(i)}>
                <figure className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-10 sm:p-12">
                  <Quote
                    className="mb-8 h-7 w-7 text-primary-700/30 dark:text-primary-300/30"
                    strokeWidth={1.5}
                  />
                  <blockquote className="flex-1 font-heading text-[20px] font-normal leading-[1.55] tracking-[-0.005em] text-foreground/90 sm:text-[22px]">
                    {t.content}
                  </blockquote>
                  <figcaption className="mt-10 border-t border-foreground/10 pt-6">
                    <p className="text-[14px] font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="mt-1 text-[13px] text-foreground/55">
                      {t.role}
                    </p>
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CLOSING CTA
          ============================================================ */}
      <section className="relative overflow-hidden border-t border-foreground/10 bg-background py-28 sm:py-32 md:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: BRAND.gradientWashHero }}
        />

        <div className="container relative mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-10 flex items-center justify-center gap-4">
                <span
                  aria-hidden
                  className={cn("h-px w-12", BRAND.gradientRule)}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  Admissions
                </span>
                <span
                  aria-hidden
                  className={cn("h-px w-12", BRAND.gradientRule)}
                />
              </div>

              <h2 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl md:text-[4rem]">
                The next step is
                <br />
                <span className={BRAND.gradientText}>a conversation</span>.
              </h2>

              <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
                Every admission begins with a short conversation — so we can
                place you with the right teacher, on the right path, at the
                right pace.
              </p>

              <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/onsite/admissions"
                  className={cn(
                    "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-xl shadow-primary-700/25 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-700/30",
                    BRAND.gradientButton
                  )}
                >
                  Begin admissions
                  <ArrowRight
                    className="h-[15px] w-[15px] transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
                <Link
                  href="/physical/contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground/85 transition-all duration-500 hover:border-primary-700/50 hover:text-primary-700 dark:hover:border-primary-300/50 dark:hover:text-primary-300"
                >
                  Speak with the administration
                  <ArrowRight
                    className="h-[15px] w-[15px] transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </div>

              <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.14em] text-foreground/45">
                Free assessment · No commitment · All ages welcome
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          FOOTNOTE STRIP
          ============================================================ */}
      <div className="border-t border-foreground/10 bg-background py-8">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[12px] font-medium uppercase tracking-[0.12em] text-foreground/55">
            <span className="flex items-center gap-2.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-primary-700 dark:text-primary-300"
                strokeWidth={1.75}
              />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2.5">
              <Crown
                className="h-3.5 w-3.5 text-[--color-gold]"
                strokeWidth={1.75}
              />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2.5">
              <Users
                className="h-3.5 w-3.5 text-primary-700 dark:text-primary-300"
                strokeWidth={1.75}
              />
              50+ Students
            </span>
            <span className="flex items-center gap-2.5">
              <Globe
                className="h-3.5 w-3.5 text-[--color-gold]"
                strokeWidth={1.75}
              />
              5+ Countries
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
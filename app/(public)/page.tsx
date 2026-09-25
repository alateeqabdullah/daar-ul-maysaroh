// // // app/(marketing)/page.tsx
// // "use client";

// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import {
// //   ArrowRight,
// //   Globe,
// //   Building2,
// //   ShieldCheck,
// //   Users,
// //   Award,
// //   Sparkles,
// //   BookOpen,
// //   Crown,
// //   Mic,
// //   Heart,
// //   CheckCircle2,
// //   Compass,
// //   Target,
// //   Infinity,
// //   Quote,
// //   GraduationCap,
// //   Zap,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { cn } from "@/lib/utils";
// // import { Reveal } from "@/components/shared/section-animation";

// // // ============================================================
// // // DATA
// // // ============================================================

// // const TRUST_SEALS = [
// //   { label: "Ijazah Authenticated", icon: ShieldCheck, color: "purple" },
// //   { label: "Authentic Sanad Chain", icon: Crown, color: "amber" },
// //   { label: "1-on-1 Instruction", icon: Users, color: "purple" },
// //   { label: "Global Reach", icon: Globe, color: "amber" },
// // ];

// // const PROGRAMS = [
// //   {
// //     id: "tahfeedh",
// //     title: "Tahfeedh",
// //     subtitle: "Quran Memorization",
// //     description:
// //       "Complete memorization of the Quran with proper Tajweed and revision system.",
// //     icon: BookOpen,
// //     color: "purple",
// //     features: ["Personalized Plan", "Daily Revision", "Ijazah Track"],
// //     audience: "All Ages",
// //   },
// //   {
// //     id: "tajweed",
// //     title: "Tajweed",
// //     subtitle: "Scientific Recitation",
// //     description:
// //       "Master the rules of Quranic recitation with precision and proper pronunciation.",
// //     icon: Mic,
// //     color: "amber",
// //     features: ["Makharij Mastery", "Sifaat Practice", "Audio Analysis"],
// //     audience: "All Levels",
// //   },
// //   {
// //     id: "qiraat",
// //     title: "Qira'aat",
// //     subtitle: "The Ten Recitations",
// //     description:
// //       "Study the ten authentic Qira'at with certified scholars and Sanad chains.",
// //     icon: Crown,
// //     color: "purple",
// //     features: ["Ten Qira'at", "Sanad Verification", "Advanced Study"],
// //     audience: "Advanced",
// //   },
// //   {
// //     id: "arabic",
// //     title: "Arabic Language",
// //     subtitle: "Quranic Arabic",
// //     description:
// //       "Learn classical Arabic to understand the Quran in its original language.",
// //     icon: Globe,
// //     color: "amber",
// //     features: ["Grammar", "Vocabulary", "Tafsir Reading"],
// //     audience: "Beginner+",
// //   },
// //   {
// //     id: "tafsir",
// //     title: "Tafsir",
// //     subtitle: "Quranic Exegesis",
// //     description:
// //       "Deep dive into Quranic meaning with classical and contemporary scholarship.",
// //     icon: BookOpen,
// //     color: "purple",
// //     features: [
// //       "Classical Sources",
// //       "Scholarly Analysis",
// //       "Practical Application",
// //     ],
// //     audience: "Intermediate+",
// //   },
// //   {
// //     id: "children",
// //     title: "Children's Program",
// //     subtitle: "Foundation & Juz Amma",
// //     description:
// //       "Fun, engaging Quran learning for children aged 5-12 with structured progression.",
// //     icon: Heart,
// //     color: "amber",
// //     features: ["Juz Amma", "Fun Activities", "Parent Portal"],
// //     audience: "Ages 5-12",
// //   },
// // ];

// // const FEATURES = [
// //   {
// //     icon: ShieldCheck,
// //     title: "Authentic Sanad",
// //     description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
// //     color: "purple",
// //   },
// //   {
// //     icon: Award,
// //     title: "Ijazah Certification",
// //     description:
// //       "Formal certification recognized by Islamic scholarly councils",
// //     color: "amber",
// //   },
// //   {
// //     icon: Users,
// //     title: "1-on-1 Instruction",
// //     description: "Personalized attention from certified teachers",
// //     color: "purple",
// //   },
// //   {
// //     icon: Globe,
// //     title: "Flexible Learning",
// //     description: "Online or in-person, at your own pace",
// //     color: "amber",
// //   },
// // ];

// // const TESTIMONIALS = [
// //   {
// //     name: "Isa",
// //     role: "Online",
// //     content:
// //       "I am grateful for the comprehensive curriculum and dedicated teachers at Al-Maysaroh.",
// //     initials: "I",
// //   },
// //   {
// //     name: "Yusuf",
// //     role: "Boarding Student",
// //     content:
// //       "The boarding program at Al-Maysaroh has been a transformative experience for my spiritual growth.",
// //     initials: "Y",
// //   },
// // ];

// // const STATS = [
// //   { value: "50+", label: "Active Students", icon: Users, color: "purple" },
// //   { value: "94%", label: "Success Rate", icon: Award, color: "amber" },
// //   { value: "5+", label: "Countries", icon: Globe, color: "purple" },
// //   {
// //     value: "1400+",
// //     label: "Years of Sanad",
// //     icon: ShieldCheck,
// //     color: "amber",
// //   },
// // ];

// // // ============================================================
// // // COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// // // ============================================================

// // const getColorStyles = (color: string) => {
// //   const styles = {
// //     purple: {
// //       text: "text-purple-700 dark:text-purple-400",
// //       border: "border-purple-200 dark:border-purple-800/30",
// //       bg: "bg-purple-100 dark:bg-purple-600/20",
// //       lightBg: "bg-purple-50 dark:bg-purple-950/40",
// //       linear:
// //         "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
// //       glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
// //       hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
// //     },
// //     amber: {
// //       text: "text-amber-700 dark:text-amber-400",
// //       border: "border-amber-200 dark:border-amber-800/30",
// //       bg: "bg-amber-100 dark:bg-amber-500/20",
// //       lightBg: "bg-amber-50 dark:bg-amber-950/40",
// //       linear:
// //         "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
// //       glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
// //       hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
// //     },
// //   };
// //   return styles[color as keyof typeof styles] || styles.purple;
// // };

// // // ============================================================
// // // COMPONENTS
// // // ============================================================

// // function PremiumStatCard({ value, label, icon, delay, color }: any) {
// //   const Icon = icon;
// //   const colors = getColorStyles(color);
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: delay || 0 }}
// //       className="text-center group"
// //     >
// //       <div
// //         className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
// //       >
// //         <Icon className={`w-7 h-7 ${colors.text}`} />
// //       </div>
// //       <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>
// //         {value}
// //       </div>
// //       <div className="text-xs text-muted-foreground">{label}</div>
// //     </motion.div>
// //   );
// // }

// // function PremiumCampusCard({
// //   href,
// //   title,
// //   description,
// //   features,
// //   icon,
// //   color,
// //   buttonText,
// // }: any) {
// //   const colors = getColorStyles(color);

// //   return (
// //     <motion.div
// //       whileHover={{ y: -8 }}
// //       transition={{ type: "spring", stiffness: 300 }}
// //       className="h-full"
// //     >
// //       <Link href={href} className="block h-full">
// //         <div
// //           className={cn(
// //             "group relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl h-full flex flex-col bg-card hover:bg-muted/30 dark:bg-slate-900/50 dark:hover:bg-slate-900/70",
// //             colors.border,
// //           )}
// //         >
// //           {/* Glow Effect */}
// //           <div
// //             className={`absolute -inset-0.5 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}
// //           />

// //           {/* Icon */}
// //           <div
// //             className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 ${colors.bg}`}
// //           >
// //             <div className={colors.text}>{icon}</div>
// //           </div>

// //           <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">
// //             {title}
// //           </h3>
// //           <p className="text-muted-foreground text-sm mb-4">{description}</p>

// //           <ul className="space-y-2 mb-6 flex-1">
// //             {features.map((feature: string, i: number) => (
// //               <li
// //                 key={i}
// //                 className="flex items-center gap-2 text-sm text-muted-foreground"
// //               >
// //                 <CheckCircle2 className={cn("w-4 h-4", colors.text)} />
// //                 {feature}
// //               </li>
// //             ))}
// //           </ul>

// //           <Button
// //             className={cn(
// //               "w-full font-black group/btn rounded-xl py-3 text-white",
// //               `bg-linear-to-r ${colors.linear} shadow-lg ${colors.glow} hover:shadow-xl transition-all`,
// //             )}
// //           >
// //             {buttonText}
// //             <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
// //           </Button>
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }

// // // ============================================================
// // // PAGE
// // // ============================================================

// // export default function LandingPage() {
// //   return (
// //     <main className="min-h-screen bg-background overflow-hidden">
// //       {/* ============================================================
// //            HERO SECTION
// //            ============================================================ */}
// //       <section className="relative min-h-screen flex items-center overflow-hidden">
// //         {/* Background Effects - Light/Dark aware */}
// //         <div className="absolute inset-0">
// //           <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
// //           <div className="absolute bottom-1/4 right-1/2 w-[800px] h-[800px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
// //           <div
// //             className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] dark:opacity-[0.02] bg-center bg-repeat"
// //             style={{ backgroundSize: "300px" }}
// //           />
// //           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/5 rounded-full blur-3xl" />
// //           <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-3xl" />
// //         </div>

// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-20">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="max-w-5xl mx-auto"
// //           >
// //             <div className="text-center">
// //               {/* Badge - Light/Dark aware */}
// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-600/30 mb-6">
// //                 <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-500" />
// //                 <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-amber-500">
// //                   {`Al-Maysaroh Institute • Ijazah Certified`}
// //                 </span>
// //               </div>

// //               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[1.1] mb-6 text-foreground">
// //                 Your Journey to
// //                 <span className="block bg-linear-to-r from-purple-600 via-amber-600 to-purple-600 dark:from-purple-400 dark:via-amber-500 dark:to-purple-400 bg-clip-text text-transparent">
// //                   Quranic Excellence
// //                 </span>
// //               </h1>

// //               <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
// //                 Choose your learning path. Whether online from anywhere or
// //                 in-person at our physical campus, start your Sanad today.
// //               </p>

// //               {/* Stats Row */}
// //               <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
// //                 {STATS.map((stat, i) => (
// //                   <PremiumStatCard
// //                     key={i}
// //                     value={stat.value}
// //                     label={stat.label}
// //                     icon={stat.icon}
// //                     color={stat.color}
// //                     delay={0.2 + i * 0.1}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Campus Cards */}
// //             <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
// //               <PremiumCampusCard
// //                 href="/online"
// //                 title="Online Campus"
// //                 description="Learn from anywhere with 1-on-1 sessions"
// //                 features={[
// //                   "Flexible Scheduling",
// //                   "Global Access",
// //                   "Certified Teachers",
// //                 ]}
// //                 icon={<Globe className="w-8 h-8" />}
// //                 color="purple"
// //                 buttonText="Explore Online"
// //               />
// //               <PremiumCampusCard
// //                 href="/onsite"
// //                 title="Physical Campus"
// //                 description="Full-time residential Quran memorization"
// //                 features={[
// //                   "Boarding Available",
// //                   "Structured Routine",
// //                   "Community",
// //                 ]}
// //                 icon={<Building2 className="w-8 h-8" />}
// //                 color="amber"
// //                 buttonText="Explore Physical"
// //               />
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* Scroll Indicator */}
// //         <motion.div
// //           animate={{ y: [0, 10, 0] }}
// //           transition={{ duration: 1.5, repeat: Infinity }}
// //           className="absolute bottom-8 left-1/2 -translate-x-1/2"
// //         >
// //           <div className="w-6 h-10 rounded-full border-2 border-purple-300 dark:border-purple-600/30 flex items-start justify-center p-1">
// //             <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-bounce" />
// //           </div>
// //         </motion.div>
// //       </section>

// //       {/* ============================================================
// //            TRUST SEALS
// //            ============================================================ */}
// //       <section className="py-12 md:py-16 border-y border-border bg-muted/20 dark:bg-slate-900/30">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
// //             {TRUST_SEALS.map((item, i) => {
// //               const Icon = item.icon;
// //               const colors = getColorStyles(item.color);
// //               return (
// //                 <motion.div
// //                   key={i}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ delay: i * 0.1 }}
// //                   className="text-center group"
// //                 >
// //                   <div
// //                     className={cn(
// //                       "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
// //                       colors.lightBg,
// //                     )}
// //                   >
// //                     <Icon className={cn("w-7 h-7", colors.text)} />
// //                   </div>
// //                   <p className={cn("text-xs font-black", colors.text)}>
// //                     {item.label}
// //                   </p>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            PROGRAMS SECTION
// //            ============================================================ */}
// //       <section className="py-16 md:py-24">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <Reveal>
// //             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
// //               <div className="flex items-center justify-center gap-3 mb-4">
// //                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
// //                 <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
// //                   <Compass className="w-4 h-4" />
// //                   Our Programs
// //                 </span>
// //                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
// //               </div>
// //               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
// //                 Comprehensive{" "}
// //                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
// //                   Quranic Education
// //                 </span>
// //               </h2>
// //               <p className="text-lg text-muted-foreground">
// //               {`  Whether you're beginning your journey or seeking advanced
// //                 certification, we have a program tailored for you.`}
// //               </p>
// //             </div>
// //           </Reveal>

// //           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
// //             {PROGRAMS.map((program, index) => {
// //               const Icon = program.icon;
// //               const colors = getColorStyles(program.color);
// //               return (
// //                 <Reveal key={program.id} delay={index * 0.05}>
// //                   <motion.div
// //                     whileHover={{ y: -6 }}
// //                     className="bg-card rounded-2xl border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all p-6 h-full flex flex-col group"
// //                   >
// //                     <div
// //                       className={cn(
// //                         "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
// //                         colors.lightBg,
// //                       )}
// //                     >
// //                       <Icon className={cn("w-7 h-7", colors.text)} />
// //                     </div>

// //                     <h3 className="font-black text-lg text-foreground mb-0.5">
// //                       {program.title}
// //                     </h3>
// //                     <p
// //                       className={cn(
// //                         "text-xs font-black uppercase tracking-wider mb-2",
// //                         colors.text,
// //                       )}
// //                     >
// //                       {program.subtitle}
// //                     </p>

// //                     <p className="text-sm text-muted-foreground mb-4 flex-1">
// //                       {program.description}
// //                     </p>

// //                     <div className="flex flex-wrap gap-2 mb-3">
// //                       {program.features.map((feature, idx) => (
// //                         <span
// //                           key={idx}
// //                           className={cn(
// //                             "text-[10px] font-black px-2.5 py-1 rounded-full",
// //                             colors.lightBg,
// //                             colors.text,
// //                           )}
// //                         >
// //                           {feature}
// //                         </span>
// //                       ))}
// //                     </div>

// //                     {/* <div className="text-xs text-muted-foreground">
// //                       🎯 {program.audience}
// //                     </div> */}
// //                   </motion.div>
// //                 </Reveal>
// //               );
// //             })}
// //           </div>

// //           <Reveal delay={0.3}>
// //             <div className="text-center mt-12">
// //               <Link href="/online/courses">
// //                 <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
// //                   View All Programs
// //                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
// //                 </Button>
// //               </Link>
// //             </div>
// //           </Reveal>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            FEATURES SECTION
// //            ============================================================ */}
// //       <section className="py-16 md:py-24 bg-linear-to-b from-transparent via-purple-50/50 to-amber-50/50 dark:via-purple-600/5 dark:to-amber-600/5">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <Reveal>
// //             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
// //               <div className="flex items-center justify-center gap-3 mb-4">
// //                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
// //                 <span className="text-purple-700 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
// //                   <Target className="w-4 h-4" />
// //                   Why Choose Us
// //                 </span>
// //                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
// //               </div>
// //               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
// //                 The{" "}
// //                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
// //                   Al-Maysaroh
// //                 </span>{" "}
// //                 Advantage
// //               </h2>
// //               <p className="text-lg text-muted-foreground">
// //                 What sets our Quranic education apart
// //               </p>
// //             </div>
// //           </Reveal>

// //           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
// //             {FEATURES.map((feature, index) => {
// //               const Icon = feature.icon;
// //               const colors = getColorStyles(feature.color);
// //               return (
// //                 <Reveal key={index} delay={index * 0.1}>
// //                   <div className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all group">
// //                     <div
// //                       className={cn(
// //                         "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
// //                         colors.lightBg,
// //                       )}
// //                     >
// //                       <Icon className={cn("w-8 h-8", colors.text)} />
// //                     </div>
// //                     <h3
// //                       className={cn(
// //                         "font-black text-base text-foreground mb-2",
// //                         colors.text,
// //                       )}
// //                     >
// //                       {feature.title}
// //                     </h3>
// //                     <p className="text-sm text-muted-foreground">
// //                       {feature.description}
// //                     </p>
// //                   </div>
// //                 </Reveal>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            TESTIMONIALS SECTION
// //            ============================================================ */}
// //       <section className="py-16 md:py-24">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <Reveal>
// //             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
// //               <div className="flex items-center justify-center gap-3 mb-4">
// //                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-500" />
// //                 <span className="text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
// //                   <Quote className="w-4 h-4" />
// //                   Testimonials
// //                 </span>
// //                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-500" />
// //               </div>
// //               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
// //                 What Our{" "}
// //                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
// //                   Students
// //                 </span>{" "}
// //                 Say
// //               </h2>
// //             </div>
// //           </Reveal>

// //           <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
// //             {TESTIMONIALS.map((testimonial, index) => (
// //               <Reveal key={index} delay={index * 0.1}>
// //                 <div className="bg-card rounded-2xl border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all p-6 h-full flex flex-col">
// //                   <Quote className="w-8 h-8 text-amber-300 dark:text-amber-500/30 mb-3" />
// //                   <p className="text-sm text-muted-foreground italic mb-4 flex-1 leading-relaxed">
// //                     {`"${testimonial.content}"`}
// //                   </p>
// //                   <div className="flex items-center gap-3 pt-3 border-t border-border">
// //                     <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black text-sm">
// //                       {testimonial.initials}
// //                     </div>
// //                     <div>
// //                       <p className="font-black text-sm text-foreground">
// //                         {testimonial.name}
// //                       </p>
// //                       <p className="text-xs text-muted-foreground">
// //                         {testimonial.role}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Reveal>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            ADDITIONAL DETAILS SECTION - NEW
// //            ============================================================ */}
// //       <section className="py-16 md:py-24 bg-linear-to-b from-transparent via-purple-50/50 to-amber-50/50 dark:via-purple-600/5 dark:to-amber-600/5">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <Reveal>
// //             <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
// //               <div className="flex items-center justify-center gap-3 mb-4">
// //                 <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-purple-500" />
// //                 <span className="text-purple-700 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
// //                   <Zap className="w-4 h-4" />
// //                   Why Al-Maysaroh
// //                 </span>
// //                 <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-purple-500" />
// //               </div>
// //               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-foreground mb-4">
// //                 Built on{" "}
// //                 <span className="bg-linear-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent italic">
// //                   Tradition
// //                 </span>
// //                 , Powered by{" "}
// //                 <span className="bg-linear-to-r from-amber-600 to-purple-600 dark:from-amber-400 dark:to-purple-400 bg-clip-text text-transparent italic">
// //                   Innovation
// //                 </span>
// //               </h2>
// //               <p className="text-lg text-muted-foreground">
// //                 Combining 1,400 years of scholarly tradition with modern
// //                 pedagogy for optimal learning.
// //               </p>
// //             </div>
// //           </Reveal>

// //           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
// //             {[
// //               {
// //                 icon: ShieldCheck,
// //                 title: "Authentic Sanad",
// //                 desc: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
// //                 color: "purple",
// //               },
// //               {
// //                 icon: Users,
// //                 title: "Personalized Learning",
// //                 desc: "1-on-1 instruction tailored to each student's pace",
// //                 color: "amber",
// //               },
// //               {
// //                 icon: GraduationCap,
// //                 title: "Ijazah Certification",
// //                 desc: "Formal certification recognized by scholarly councils",
// //                 color: "purple",
// //               },
// //             ].map((item, index) => {
// //               const Icon = item.icon;
// //               const colors = getColorStyles(item.color);
// //               return (
// //                 <Reveal key={index} delay={index * 0.1}>
// //                   <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 dark:border-slate-800/50 dark:hover:border-purple-600/50 transition-all group">
// //                     <div
// //                       className={cn(
// //                         "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
// //                         colors.lightBg,
// //                       )}
// //                     >
// //                       <Icon className={cn("w-8 h-8", colors.text)} />
// //                     </div>
// //                     <h3
// //                       className={cn(
// //                         "font-black text-lg text-foreground mb-2",
// //                         colors.text,
// //                       )}
// //                     >
// //                       {item.title}
// //                     </h3>
// //                     <p className="text-sm text-muted-foreground">{item.desc}</p>
// //                   </div>
// //                 </Reveal>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            CTA SECTION
// //            ============================================================ */}
// //       <section className="py-16 md:py-24 bg-linear-to-br from-purple-600/10 via-purple-700/10 to-amber-600/10 dark:from-purple-600/20 dark:via-purple-700/20 dark:to-amber-600/20">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             className="max-w-3xl mx-auto text-center"
// //           >
// //             <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-purple-600 to-amber-500 mb-6 shadow-xl shadow-purple-500/30">
// //               <Sparkles className="w-10 h-10 text-white" />
// //             </div>

// //             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
// //               Ready to Begin Your Journey?
// //             </h2>

// //             <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
// //               Choose your learning path and start your Sanad today. Your journey
// //               to Quranic excellence begins here.
// //             </p>

// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Link href="/online">
// //                 <Button className="rounded-full px-8 py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all group">
// //                   Start Online
// //                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
// //                 </Button>
// //               </Link>
// //               <Link href="/onsite">
// //                 <Button
// //                   variant="outline"
// //                   className="rounded-full px-8 py-4 font-black border-amber-500 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
// //                 >
// //                   Visit Physical Campus
// //                   <ArrowRight className="w-4 h-4 ml-2" />
// //                 </Button>
// //               </Link>
// //             </div>

// //             <p className="text-muted-foreground text-sm mt-6">
// //               Free assessment • No commitment • All ages welcome
// //             </p>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* ============================================================
// //            FOOTER TRUST BADGE
// //            ============================================================ */}
// //       <div className="py-4 border-t border-border bg-muted/20 dark:bg-slate-900/30">
// //         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
// //           <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
// //             <span className="flex items-center gap-1.5">
// //               <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
// //               Ijazah Certified
// //             </span>
// //             <span className="flex items-center gap-1.5">
// //               <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
// //               Authentic Sanad
// //             </span>
// //             <span className="flex items-center gap-1.5">
// //               <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
// //               50+ Students
// //             </span>
// //             <span className="flex items-center gap-1.5">
// //               <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
// //               5+ Countries
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }









// // app/(marketing)/page.tsx
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   Globe,
//   Building2,
//   ShieldCheck,
//   Users,
//   BookOpen,
//   Crown,
//   Mic,
//   Heart,
//   Check,
//   GraduationCap,
//   Compass,
//   Quote,
// } from "lucide-react";
// import { Reveal } from "@/components/shared/section-animation";
// import { cn } from "@/lib/utils";

// /* ------------------------------------------------------------------ */
// /*  BRAND TOKENS — saturated purple→gold, used confidently             */
// /* ------------------------------------------------------------------ */

// const G = "from-purple-700 via-purple-600 to-amber-500";
// const G_DARK = "dark:from-purple-400 dark:via-purple-400 dark:to-amber-400";

// const BRAND = {
//   // Solid brand colors
//   purple: "text-purple-700 dark:text-purple-300",
//   purpleSoft: "text-purple-600/70 dark:text-purple-300/70",

//   // Wash surfaces
//   wash: "bg-purple-50/40 dark:bg-purple-950/15",
//   washHover: "hover:bg-purple-50/30 dark:hover:bg-purple-950/10",

//   // --- Gradient TEXT (headlines, accents) ---
//   gradientText: `bg-gradient-to-r ${G} ${G_DARK} bg-clip-text text-transparent`,

//   // --- Gradient RULES (label hairlines) ---
//   gradientRule: `bg-gradient-to-r ${G} ${G_DARK}`,

//   // --- Gradient FILL (buttons, icon tiles, chips) ---
//   gradientFill: `bg-gradient-to-r ${G} ${G_DARK}`,
//   gradientFillHover: `hover:from-purple-800 hover:via-purple-700 hover:to-amber-600 dark:hover:from-purple-300 dark:hover:via-purple-300 dark:hover:to-amber-300`,

//   // --- Gradient HAIRLINE (hover underlines) ---
//   gradientHairline: `bg-gradient-to-r from-purple-600/60 via-amber-500/50 to-transparent`,
// };

// /* ------------------------------------------------------------------ */
// /*  MOTION — quiet, single-speed, no springs                          */
// /* ------------------------------------------------------------------ */

// const EASE = [0.22, 1, 0.36, 1] as const;

// const fadeUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.8, ease: EASE },
// };

// const stagger = (i: number) => ({
//   initial: { opacity: 0, y: 16 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, margin: "-60px" },
//   transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
// });

// /* ------------------------------------------------------------------ */
// /*  DATA                                                               */
// /* ------------------------------------------------------------------ */

// const STATS = [
//   { value: "50+", label: "Students in residence" },
//   { value: "5", label: "Countries represented" },
//   { value: "1,400", label: "Years of Sanad" },
//   { value: "94%", label: "Completion rate" },
// ] as const;

// const TRUST_SEALS = [
//   { label: "Ijazah Authenticated", icon: ShieldCheck },
//   { label: "Authentic Sanad", icon: Crown },
//   { label: "One-to-One Instruction", icon: Users },
//   { label: "Global Reach", icon: Globe },
// ] as const;

// const CAMPUSES = [
//   {
//     href: "/onsite",
//     title: "Physical Campus",
//     arabic: "الحَرَم",
//     subtitle: "Residential study",
//     description:
//       "Full-time memorisation and recitation at our residential campus — with boarding, a structured daily routine, and community life.",
//     features: [
//       "Boarding available",
//       "Structured daily routine",
//       "Community and brotherhood",
//       "Supervised study",
//     ],
//     icon: Building2,
//     primary: true,
//     cta: "Enter the campus",
//   },
//   {
//     href: "/online",
//     title: "Online Campus",
//     arabic: "عَنْ بُعْد",
//     subtitle: "Study from anywhere",
//     description:
//       "One-to-one instruction from certified teachers, scheduled around your life, delivered from anywhere in the world.",
//     features: [
//       "Flexible scheduling",
//       "One-to-one sessions",
//       "Certified teachers",
//       "Global access",
//     ],
//     icon: Globe,
//     primary: false,
//     cta: "Study online",
//   },
// ] as const;

// const PROGRAMS = [
//   {
//     id: "tahfeedh",
//     title: "Tahfeedh",
//     arabic: "التحفيظ",
//     subtitle: "Qur'an Memorisation",
//     icon: BookOpen,
//     description:
//       "Complete memorisation of the Qur'an with structured daily revision and personal pacing.",
//     meta: ["Sabq", "Muraja'ah", "One-to-one"],
//   },
//   {
//     id: "tajweed",
//     title: "Tajweed",
//     arabic: "التجويد",
//     subtitle: "The Science of Recitation",
//     icon: Mic,
//     description:
//       "The articulation points, the attributes of letters, and the rules of recitation — studied and applied.",
//     meta: ["Makharij", "Sifaat", "Applied"],
//   },
//   {
//     id: "qiraat",
//     title: "Qira'aat",
//     arabic: "القراءات",
//     subtitle: "The Ten Recitations",
//     icon: Crown,
//     description:
//       "The ten authentic Qira'at, studied with verified Sanad and preparation for Ijazah.",
//     meta: ["Ten Qira'at", "Sanad", "Ijazah"],
//   },
//   {
//     id: "arabic",
//     title: "Arabic Language",
//     arabic: "اللغة العربية",
//     subtitle: "Qur'anic Arabic",
//     icon: Globe,
//     description:
//       "Classical Arabic grammar and morphology — the tools to read the Qur'an and its sciences.",
//     meta: ["Nahw", "Sarf", "Reading"],
//   },
//   {
//     id: "tafsir",
//     title: "Tafsir",
//     arabic: "التفسير",
//     subtitle: "Qur'anic Exegesis",
//     icon: Compass,
//     description:
//       "Classical and contemporary exegesis of the Qur'an, studied from the primary sources.",
//     meta: ["Classical", "Analysis", "Applied"],
//   },
//   {
//     id: "children",
//     title: "Children's Programme",
//     arabic: "برنامج الأطفال",
//     subtitle: "Foundation & Juz 'Amma",
//     icon: Heart,
//     description:
//       "Careful, unhurried grounding in Qur'anic recitation and character for children aged five to twelve.",
//     meta: ["Juz 'Amma", "Manners", "Family portal"],
//   },
// ] as const;

// const PRINCIPLES = [
//   {
//     icon: ShieldCheck,
//     title: "Authentic Sanad",
//     description:
//       "An unbroken chain of transmission to the Prophet ﷺ, preserved teacher to student for fourteen centuries.",
//   },
//   {
//     icon: Users,
//     title: "One-to-One Instruction",
//     description:
//       "Every student is taught individually — paced, corrected, and encouraged by a qualified teacher.",
//   },
//   {
//     icon: GraduationCap,
//     title: "Ijazah Certification",
//     description:
//       "Formal certification in recitation and memorisation, recognised by scholarly councils.",
//   },
// ] as const;

// const TESTIMONIALS = [
//   {
//     name: "Isā",
//     role: "Online student",
//     content:
//       "I am grateful for the comprehensive curriculum and the dedication of the teachers at Al-Maysaroh.",
//   },
//   {
//     name: "Yūsuf",
//     role: "Boarding student",
//     content:
//       "The boarding programme has been a transformative experience for my spiritual growth and my memorisation.",
//   },
// ] as const;

// /* ------------------------------------------------------------------ */
// /*  PAGE                                                               */
// /* ------------------------------------------------------------------ */

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen overflow-hidden bg-background">
//       {/* ============================================================
//           HERO
//           ============================================================ */}
//       <section className="relative overflow-hidden">
//         {/* The big gradient glow — hero's signature */}
//         <div aria-hidden className="pointer-events-none absolute inset-0">
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "radial-gradient(1100px 700px at 50% -10%, rgba(147,51,234,0.18), transparent 60%), radial-gradient(900px 600px at 50% 110%, rgba(245,158,11,0.15), transparent 60%)",
//             }}
//           />
//         </div>

//         <div className="container relative z-10 mx-auto px-6 py-20 sm:py-24 md:py-28 lg:px-8 lg:py-36">
//           <motion.div {...fadeUp} className="mx-auto max-w-5xl text-center">
//             {/* Colophon */}
//             <div className="mx-auto mb-10 flex max-w-3xl items-center gap-4">
//               <span
//                 aria-hidden
//                 className={cn("h-px w-12", BRAND.gradientRule)}
//               />
//               <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                 Al-Maysaroh Institute
//               </span>
//               <span aria-hidden className="h-px flex-1 bg-foreground/10" />
//               <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                 Est. 2018
//               </span>
//               <span
//                 aria-hidden
//                 className={cn("h-px w-12", BRAND.gradientRule)}
//               />
//             </div>

//             {/* The Arabic wordmark — hero's crown, gradient-filled, huge */}
//             <h2
//               dir="rtl"
//               lang="ar"
//               className={cn(
//                 "mx-auto mb-6 bg-clip-text font-quran text-[64px] font-bold leading-[1.15] text-transparent sm:text-[88px] md:text-[104px] lg:text-[120px]",
//                 "bg-gradient-to-br",
//                 G,
//                 G_DARK
//               )}
//             >
//               دار الميسرة
//             </h2>

//             {/* English H1, gradient accent phrase */}
//             <h1 className="mx-auto max-w-4xl font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
//               Your journey to{" "}
//               <span className={BRAND.gradientText}>Qur&apos;anic excellence</span>
//               ,{" "}
//               <span className="text-foreground/55">
//                 transmitted as it was received.
//               </span>
//             </h1>

//             {/* Lead */}
//             <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-[17px]">
//               A traditional madrasah for the memorisation and recitation of the
//               Qur&apos;an — grounded in authentic Sanad, taught one student at
//               a time, and offered both online and at our residential campus.
//             </p>

//             {/* CTAs — both gradient, one filled, one outlined */}
//             <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
//               <Link
//                 href="/onsite"
//                 className={cn(
//                   "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
//                   BRAND.gradientFill,
//                   BRAND.gradientFillHover
//                 )}
//               >
//                 Enter the Physical Campus
//                 <ArrowRight
//                   className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
//                   strokeWidth={1.75}
//                 />
//               </Link>

//               <Link
//                 href="/online"
//                 className={cn(
//                   "group relative inline-flex items-center gap-2 rounded-full p-[1.5px] shadow-sm transition-all duration-300",
//                   BRAND.gradientFill
//                 )}
//               >
//                 <span className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:bg-transparent group-hover:text-white">
//                   Study Online
//                   <ArrowRight
//                     className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
//                     strokeWidth={1.75}
//                   />
//                 </span>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============================================================
//           STATS — flat, on hairline grid
//           ============================================================ */}
//       <section className="border-y border-foreground/10">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-2 gap-px overflow-hidden bg-foreground/10 md:grid-cols-4">
//             {STATS.map((stat, i) => (
//               <motion.div key={stat.label} {...stagger(i)}>
//                 <div className="flex flex-col bg-background px-6 py-10 sm:px-8">
//                   <span className="font-heading text-4xl font-bold tabular-nums tracking-[-0.02em] text-foreground sm:text-5xl">
//                     {stat.value}
//                   </span>
//                   <span className="mt-2 text-[12px] leading-relaxed text-foreground/60">
//                     {stat.label}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           TRUST SEALS — gradient-filled icon tiles
//           ============================================================ */}
//       <section className="border-b border-foreground/10 bg-background py-16 md:py-20">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
//             {TRUST_SEALS.map((item, i) => {
//               const Icon = item.icon;
//               return (
//                 <motion.div key={item.label} {...stagger(i)}>
//                   <div className="flex flex-col items-center text-center">
//                     <span
//                       className={cn(
//                         "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20",
//                         BRAND.gradientFill
//                       )}
//                     >
//                       <Icon
//                         className="h-6 w-6 text-white"
//                         strokeWidth={1.75}
//                       />
//                     </span>
//                     <span className="text-[13px] font-semibold text-foreground/85">
//                       {item.label}
//                     </span>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           TWO CAMPUSES
//           ============================================================ */}
//       <section className="bg-background py-24 sm:py-28 md:py-32">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Reveal>
//             <div className="mx-auto mb-16 max-w-3xl text-center">
//               <div className="mb-6 flex items-center justify-center gap-4">
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//                 <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                   Two Campuses
//                 </span>
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//               </div>

//               <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
//                 The same curriculum,{" "}
//                 <span className={BRAND.gradientText}>wherever you study</span>.
//               </h2>

//               <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
//                 Study with us in residence at the campus, or one-to-one from
//                 wherever you are. The teaching, the Sanad, and the standards
//                 are the same.
//               </p>
//             </div>
//           </Reveal>

//           <div className="grid gap-6 md:grid-cols-2">
//             {CAMPUSES.map((campus, index) => {
//               const Icon = campus.icon;
//               return (
//                 <motion.div key={campus.href} {...stagger(index)}>
//                   <Link
//                     href={campus.href}
//                     className={cn(
//                       "group relative flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-700/10 sm:p-10",
//                       BRAND.washHover
//                     )}
//                   >
//                     {/* top row — gradient icon tile + Arabic */}
//                     <div className="mb-8 flex items-start justify-between">
//                       <span
//                         className={cn(
//                           "flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20",
//                           BRAND.gradientFill
//                         )}
//                       >
//                         <Icon
//                           className="h-6 w-6 text-white"
//                           strokeWidth={1.75}
//                         />
//                       </span>
//                       <span
//                         dir="rtl"
//                         lang="ar"
//                         className="font-arabic text-[20px] leading-none text-foreground/45"
//                       >
//                         {campus.arabic}
//                       </span>
//                     </div>

//                     <h3 className="font-heading text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-[28px]">
//                       {campus.title}
//                     </h3>
//                     <p className="mt-2 text-[13px] text-foreground/55">
//                       {campus.subtitle}
//                     </p>

//                     <p className="mt-6 mb-8 flex-1 text-[14px] leading-[1.7] text-foreground/70">
//                       {campus.description}
//                     </p>

//                     <ul className="mb-8 space-y-2.5">
//                       {campus.features.map((feature) => (
//                         <li
//                           key={feature}
//                           className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground/70"
//                         >
//                           <Check
//                             className={cn(
//                               "mt-[3px] h-[14px] w-[14px] shrink-0",
//                               BRAND.purpleSoft
//                             )}
//                             strokeWidth={2.25}
//                           />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
//                       <span
//                         className={cn(
//                           "text-[12px] font-semibold tracking-wide",
//                           BRAND.purple
//                         )}
//                       >
//                         {campus.cta}
//                       </span>
//                       <span
//                         className={cn(
//                           "flex h-8 w-8 items-center justify-center rounded-full",
//                           BRAND.gradientFill
//                         )}
//                       >
//                         <ArrowUpRight
//                           className="h-[13px] w-[13px] text-white transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
//                           strokeWidth={2}
//                         />
//                       </span>
//                     </div>

//                     {/* bottom hairline */}
//                     <span
//                       aria-hidden
//                       className={cn(
//                         "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-b-2xl transition-transform duration-500 group-hover:scale-x-100",
//                         BRAND.gradientRule
//                       )}
//                     />
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           PROGRAMS
//           ============================================================ */}
//       <section className="bg-background pb-24 sm:pb-28 md:pb-32">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Reveal>
//             <div className="mx-auto mb-16 max-w-3xl text-center">
//               <div className="mb-6 flex items-center justify-center gap-4">
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//                 <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                   The Curriculum
//                 </span>
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//               </div>

//               <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
//                 A complete course of study,{" "}
//                 <span className={BRAND.gradientText}>
//                   taught the way it was meant to be taught
//                 </span>
//                 .
//               </h2>

//               <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
//                 Six disciplines, each grounded in authentic transmission and
//                 taught in the classical manner.
//               </p>
//             </div>
//           </Reveal>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {PROGRAMS.map((program, index) => {
//               const Icon = program.icon;
//               return (
//                 <motion.div key={program.id} {...stagger(index)}>
//                   <Link
//                     href={`/onsite/programs/${program.id}`}
//                     className={cn(
//                       "group relative flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-700/10",
//                       BRAND.washHover
//                     )}
//                   >
//                     {/* top row — gradient number + gradient icon tile */}
//                     <div className="mb-8 flex items-start justify-between">
//                       <span
//                         className={cn(
//                           "bg-clip-text font-heading text-[20px] font-bold tabular-nums text-transparent",
//                           "bg-gradient-to-br",
//                           G,
//                           G_DARK
//                         )}
//                       >
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span
//                         className={cn(
//                           "flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20",
//                           BRAND.gradientFill
//                         )}
//                       >
//                         <Icon
//                           className="h-5 w-5 text-white"
//                           strokeWidth={1.75}
//                         />
//                       </span>
//                     </div>

//                     {/* title + Arabic */}
//                     <div className="mb-5">
//                       <div className="flex items-baseline justify-between gap-3">
//                         <h3 className="font-heading text-[22px] font-bold tracking-[-0.01em] text-foreground">
//                           {program.title}
//                         </h3>
//                         <span
//                           dir="rtl"
//                           lang="ar"
//                           className="font-arabic text-[18px] leading-none text-foreground/40"
//                         >
//                           {program.arabic}
//                         </span>
//                       </div>
//                       <p className="mt-1 text-[13px] text-foreground/55">
//                         {program.subtitle}
//                       </p>
//                     </div>

//                     <p className="mb-6 flex-1 text-[14px] leading-[1.7] text-foreground/70">
//                       {program.description}
//                     </p>

//                     {/* meta with plain dots */}
//                     <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-foreground/60">
//                       {program.meta.map((item, i) => (
//                         <span key={item} className="flex items-center gap-3">
//                           {i > 0 && (
//                             <span
//                               aria-hidden
//                               className="h-1 w-1 rounded-full bg-foreground/30"
//                             />
//                           )}
//                           {item}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
//                       <span className="text-[12px] font-semibold tracking-wide text-foreground/65 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
//                         Read more
//                       </span>
//                       <span
//                         className={cn(
//                           "flex h-8 w-8 items-center justify-center rounded-full",
//                           BRAND.gradientFill
//                         )}
//                       >
//                         <ArrowUpRight
//                           className="h-[13px] w-[13px] text-white transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
//                           strokeWidth={2}
//                         />
//                       </span>
//                     </div>

//                     <span
//                       aria-hidden
//                       className={cn(
//                         "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-b-2xl transition-transform duration-500 group-hover:scale-x-100",
//                         BRAND.gradientRule
//                       )}
//                     />
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>

//           <Reveal delay={0.2}>
//             <div className="mt-14 text-center">
//               <Link
//                 href="/onsite/programs"
//                 className={cn(
//                   "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
//                   BRAND.gradientFill,
//                   BRAND.gradientFillHover
//                 )}
//               >
//                 See all programmes
//                 <ArrowRight
//                   className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
//                   strokeWidth={1.75}
//                 />
//               </Link>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ============================================================
//           PRINCIPLES
//           ============================================================ */}
//       <section className="border-y border-foreground/10 bg-background py-24 sm:py-28 md:py-32">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Reveal>
//             <div className="mx-auto mb-16 max-w-3xl text-center">
//               <div className="mb-6 flex items-center justify-center gap-4">
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//                 <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                   Why Al-Maysaroh
//                 </span>
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//               </div>

//               <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
//                 Built on tradition,{" "}
//                 <span className={BRAND.gradientText}>
//                   held to the standards of it
//                 </span>
//                 .
//               </h2>
//             </div>
//           </Reveal>

//           <div className="grid gap-6 md:grid-cols-3">
//             {PRINCIPLES.map((principle, i) => {
//               const Icon = principle.icon;
//               return (
//                 <motion.div key={principle.title} {...stagger(i)}>
//                   <div className="group flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-700/10 sm:p-10">
//                     <span
//                       className={cn(
//                         "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20",
//                         BRAND.gradientFill
//                       )}
//                     >
//                       <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
//                     </span>

//                     <h3 className="font-heading text-[20px] font-bold tracking-[-0.01em] text-foreground">
//                       {principle.title}
//                     </h3>

//                     <p className="mt-4 text-[14px] leading-[1.75] text-foreground/70">
//                       {principle.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           TESTIMONIALS
//           ============================================================ */}
//       <section className="bg-background py-24 sm:py-28 md:py-32">
//         <div className="container mx-auto px-6 lg:px-8">
//           <Reveal>
//             <div className="mx-auto mb-16 max-w-3xl text-center">
//               <div className="mb-6 flex items-center justify-center gap-4">
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//                 <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
//                   From the Students
//                 </span>
//                 <span
//                   aria-hidden
//                   className={cn("h-px w-12", BRAND.gradientRule)}
//                 />
//               </div>

//               <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
//                 In their own{" "}
//                 <span className={BRAND.gradientText}>words</span>.
//               </h2>
//             </div>
//           </Reveal>

//           <div className="grid gap-6 md:grid-cols-2">
//             {TESTIMONIALS.map((t, i) => (
//               <motion.div key={t.name} {...stagger(i)}>
//                 <figure className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-8 sm:p-10">
//                   <Quote
//                     className={cn("mb-6 h-7 w-7", BRAND.purpleSoft)}
//                     strokeWidth={1.75}
//                   />
//                   <blockquote className="flex-1 text-[15px] leading-[1.75] text-foreground/80">
//                     {t.content}
//                   </blockquote>
//                   <figcaption className="mt-8 border-t border-foreground/10 pt-5">
//                     <div className="flex items-center gap-3">
//                       <span
//                         className={cn(
//                           "flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold text-white shadow-lg shadow-purple-700/25",
//                           BRAND.gradientFill
//                         )}
//                       >
//                         {t.name.charAt(0)}
//                       </span>
//                       <div>
//                         <p className="text-[13px] font-semibold text-foreground">
//                           {t.name}
//                         </p>
//                         <p className="mt-0.5 text-[12px] text-foreground/55">
//                           {t.role}
//                         </p>
//                       </div>
//                     </div>
//                   </figcaption>
//                 </figure>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ============================================================
//           CLOSING CTA
//           ============================================================ */}
//       <section className="relative overflow-hidden border-t border-foreground/10 bg-background py-24 sm:py-28 md:py-32 lg:py-36">
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(1000px 600px at 50% 100%, rgba(147,51,234,0.14), transparent 60%), radial-gradient(900px 500px at 50% 0%, rgba(245,158,11,0.12), transparent 60%)",
//           }}
//         />

//         <div className="container relative mx-auto px-6 lg:px-8">
//           <Reveal>
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-6xl">
//                 The next step is{" "}
//                 <span className={BRAND.gradientText}>a conversation</span>.
//               </h2>

//               <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-[17px]">
//                 Every admission begins with a short conversation — so we can
//                 place you with the right teacher, on the right path, at the
//                 right pace.
//               </p>

//               <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
//                 <Link
//                   href="/onsite/admissions"
//                   className={cn(
//                     "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
//                     BRAND.gradientFill,
//                     BRAND.gradientFillHover
//                   )}
//                 >
//                   Begin admissions
//                   <ArrowRight
//                     className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
//                     strokeWidth={1.75}
//                   />
//                 </Link>
//                 <Link
//                   href="/physical/contact"
//                   className={cn(
//                     "group relative inline-flex items-center gap-2 rounded-full p-[1.5px] shadow-sm transition-all duration-300",
//                     BRAND.gradientFill
//                   )}
//                 >
//                   <span className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:bg-transparent group-hover:text-white">
//                     Speak with the administration
//                     <ArrowRight
//                       className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
//                       strokeWidth={1.75}
//                     />
//                   </span>
//                 </Link>
//               </div>

//               <p className="mt-8 text-[12px] text-foreground/55">
//                 Free assessment · No commitment · All ages welcome
//               </p>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ============================================================
//           FOOTNOTE STRIP
//           ============================================================ */}
//       <div className="border-t border-foreground/10 bg-background py-6">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-foreground/65">
//             <span className="flex items-center gap-2">
//               <ShieldCheck
//                 className={cn("h-3.5 w-3.5", BRAND.purple)}
//                 strokeWidth={1.75}
//               />
//               Ijazah Certified
//             </span>
//             <span className="flex items-center gap-2">
//               <Crown
//                 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400"
//                 strokeWidth={1.75}
//               />
//               Authentic Sanad
//             </span>
//             <span className="flex items-center gap-2">
//               <Users
//                 className={cn("h-3.5 w-3.5", BRAND.purple)}
//                 strokeWidth={1.75}
//               />
//               50+ Students
//             </span>
//             <span className="flex items-center gap-2">
//               <Globe
//                 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400"
//                 strokeWidth={1.75}
//               />
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
  Crown,
  BookOpen,
  Mic,
  Heart,
  GraduationCap,
  Compass,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/shared/section-animation";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BRAND — saturated purple → gold                                     */
/* ------------------------------------------------------------------ */

const GRADIENT = "from-purple-700 via-purple-600 to-amber-500";
const GRADIENT_DARK = "dark:from-purple-400 dark:via-purple-400 dark:to-amber-400";

const gradientText = cn(
  "bg-gradient-to-r bg-clip-text text-transparent",
  GRADIENT,
  GRADIENT_DARK
);

const gradientFill = cn(
  "bg-gradient-to-r",
  GRADIENT,
  GRADIENT_DARK
);

const gradientFillHover = cn(
  "hover:from-purple-800 hover:via-purple-700 hover:to-amber-600",
  "dark:hover:from-purple-300 dark:hover:via-purple-300 dark:hover:to-amber-300"
);

const gradientRule = cn(
  "bg-gradient-to-r",
  GRADIENT,
  GRADIENT_DARK
);

/* ------------------------------------------------------------------ */
/*  MOTION — one register                                               */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE },
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
});

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "50+", label: "Students in residence" },
  { value: "5", label: "Countries represented" },
  { value: "1,400", label: "Years of Sanad" },
  { value: "94%", label: "Completion rate" },
] as const;

const TRUST_SEALS = [
  { label: "Ijazah Authenticated", arabic: "إِجَازَة", icon: ShieldCheck },
  { label: "Authentic Sanad", arabic: "سَنَد", icon: Crown },
  { label: "One-to-One Instruction", arabic: "فَرْدِي", icon: Users },
  { label: "Global Reach", arabic: "عَالَمِي", icon: Globe },
] as const;

const CAMPUSES = [
  {
    href: "/onsite",
    title: "Physical Campus",
    arabic: "الحَرَم",
    subtitle: "Residential study",
    description:
      "Full-time memorisation and recitation at our residential campus — with boarding, a structured daily routine, and community life.",
    features: [
      "Boarding available",
      "Structured daily routine",
      "Community and brotherhood",
      "Supervised study",
    ],
    icon: Building2,
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
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 700px at 50% -10%, rgba(147,51,234,0.14), transparent 60%), radial-gradient(900px 600px at 50% 110%, rgba(245,158,11,0.11), transparent 60%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-6 py-24 sm:py-28 md:py-32 lg:px-8 lg:py-40">
          <motion.div {...fadeUp} className="mx-auto max-w-5xl text-center">
            {/* Colophon */}
            <div className="mx-auto mb-12 flex max-w-3xl items-center gap-4">
              <span aria-hidden className={cn("h-px w-12", gradientRule)} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                Al-Maysaroh Institute
              </span>
              <span aria-hidden className="h-px flex-1 bg-foreground/10" />
              <span
                dir="rtl"
                lang="ar"
                className={cn(
                  "font-quran text-[18px] font-bold leading-none",
                  gradientText
                )}
              >
                دار الميسرة
              </span>
            </div>

            {/* H1 */}
            <h1 className="mx-auto max-w-4xl font-heading text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              A madrasah for the{" "}
              <span className={gradientText}>memorisation</span> and{" "}
              <span className={gradientText}>recitation</span> of the Qur&apos;an.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-[17px]">
              Grounded in authentic Sanad, taught one student at a time, and
              offered both online and at our residential campus.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/onsite"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
                  gradientFill,
                  gradientFillHover
                )}
              >
                Physical Campus
                <ArrowRight
                  className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>

              <Link
                href="/online"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground/85 transition-all duration-300 hover:text-foreground"
                )}
              >
                Online Campus
                <ArrowRight
                  className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          STATS — flat
          ============================================================ */}
      <section className="border-y border-foreground/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-foreground/10 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} {...stagger(i)}>
                <div className="flex flex-col bg-background px-6 py-10 sm:px-8">
                  <span className="font-heading text-4xl font-bold tabular-nums tracking-[-0.02em] text-foreground sm:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[12px] leading-relaxed text-foreground/60">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST SEALS — hairline grid, naked icons
          ============================================================ */}
      <section className="border-b border-foreground/10 bg-background py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 md:grid-cols-4">
            {TRUST_SEALS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} {...stagger(i)}>
                  <div className="flex flex-col items-start bg-background p-6 sm:p-7">
                    <div className="mb-5 flex items-center gap-3">
                      <Icon
                        className="h-[20px] w-[20px] text-purple-700/80 dark:text-purple-300/80"
                        strokeWidth={1.5}
                      />
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-[15px] leading-none text-foreground/45"
                      >
                        {item.arabic}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold leading-snug text-foreground/80">
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
          CAMPUSES — hairline grid
          ============================================================ */}
      <section className="bg-background py-24 sm:py-28 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  Two Campuses
                </span>
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
              </div>

              <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
                Two campuses.{" "}
                <span className={gradientText}>The same standards</span>.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 md:grid-cols-2">
            {CAMPUSES.map((campus, index) => {
              const Icon = campus.icon;
              return (
                <motion.div key={campus.href} {...stagger(index)}>
                  <Link
                    href={campus.href}
                    className={cn(
                      "group relative flex h-full flex-col bg-background p-8 transition-colors duration-300 hover:bg-purple-50/40 dark:hover:bg-purple-950/15 sm:p-12"
                    )}
                  >
                    <div className="mb-10 flex items-start justify-between">
                      <Icon
                        className="h-[22px] w-[22px] text-purple-700/80 transition-colors duration-300 group-hover:text-purple-700 dark:text-purple-300/80 dark:group-hover:text-purple-300"
                        strokeWidth={1.5}
                      />
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-[18px] leading-none text-foreground/45"
                      >
                        {campus.arabic}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold tracking-[-0.01em] text-foreground sm:text-[28px]">
                      {campus.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-foreground/55">
                      {campus.subtitle}
                    </p>

                    <p className="mt-6 mb-8 flex-1 text-[14px] leading-[1.75] text-foreground/70">
                      {campus.description}
                    </p>

                    <ul className="mb-8 space-y-2.5">
                      {campus.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground/70"
                        >
                          <Check
                            className="mt-[3px] h-[13px] w-[13px] shrink-0 text-purple-700/70 dark:text-purple-300/70"
                            strokeWidth={2.25}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
                      <span className="text-[12px] font-semibold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                        Explore
                      </span>
                      <ArrowRight
                        className="h-[14px] w-[14px] text-foreground/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                        gradientRule
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROGRAMS — hairline grid
          ============================================================ */}
      <section className="bg-background pb-24 sm:pb-28 md:pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  The Curriculum
                </span>
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
              </div>

              <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
                Six disciplines,{" "}
                <span className={gradientText}>transmitted teacher to student</span>
                .
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div key={program.id} {...stagger(index)}>
                  <Link
                    href={`/onsite/programs/${program.id}`}
                    className="group relative flex h-full flex-col bg-background p-8 transition-colors duration-300 hover:bg-purple-50/40 dark:hover:bg-purple-950/15 sm:p-9"
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <span className="font-heading text-[18px] font-bold tabular-nums text-foreground/25 transition-colors duration-300 group-hover:text-foreground/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex items-center gap-4">
                        <span
                          dir="rtl"
                          lang="ar"
                          className="font-arabic text-[16px] leading-none text-foreground/40"
                        >
                          {program.arabic}
                        </span>
                        <Icon
                          className="h-[20px] w-[20px] text-purple-700/80 transition-colors duration-300 group-hover:text-purple-700 dark:text-purple-300/80 dark:group-hover:text-purple-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <h3 className="font-heading text-[22px] font-bold tracking-[-0.01em] text-foreground">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-foreground/55">
                      {program.subtitle}
                    </p>

                    <p className="mt-5 mb-6 flex-1 text-[14px] leading-[1.7] text-foreground/70">
                      {program.description}
                    </p>

                    <div className="mb-6 text-[12px] text-foreground/55">
                      {program.meta.join("  ·  ")}
                    </div>

                    <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
                      <span className="text-[12px] font-semibold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                        Read more
                      </span>
                      <ArrowRight
                        className="h-[13px] w-[13px] text-foreground/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                        gradientRule
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-14 text-center">
              <Link
                href="/onsite/programs"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
                  gradientFill,
                  gradientFillHover
                )}
              >
                All programmes
                <ArrowRight
                  className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PRINCIPLES — hairline grid
          ============================================================ */}
      <section className="border-y border-foreground/10 bg-background py-24 sm:py-28 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  Why Al-Maysaroh
                </span>
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
              </div>

              <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
                Three commitments{" "}
                <span className={gradientText}>we are held to</span>.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {PRINCIPLES.map((principle, i) => {
              const Icon = principle.icon;
              return (
                <motion.div key={principle.title} {...stagger(i)}>
                  <div className="flex h-full flex-col bg-background p-8 sm:p-10">
                    <Icon
                      className="mb-8 h-[22px] w-[22px] text-purple-700/80 dark:text-purple-300/80"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-heading text-[20px] font-bold tracking-[-0.01em] text-foreground">
                      {principle.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.75] text-foreground/70">
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
      <section className="bg-background py-24 sm:py-28 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70">
                  From the Students
                </span>
                <span aria-hidden className={cn("h-px w-12", gradientRule)} />
              </div>

              <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.25rem]">
                What students{" "}
                <span className={gradientText}>actually say</span>.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...stagger(i)}>
                <figure className="flex h-full flex-col bg-background p-8 sm:p-12">
                  <blockquote className="flex-1 font-heading text-[20px] font-normal leading-[1.55] tracking-[-0.005em] text-foreground/85 sm:text-[22px]">
                    {t.content}
                  </blockquote>
                  <figcaption className="mt-10 border-t border-foreground/10 pt-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                      — {t.name}, {t.role}
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
      <section className="relative overflow-hidden border-t border-foreground/10 bg-background py-24 sm:py-28 md:py-32 lg:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 600px at 50% 100%, rgba(147,51,234,0.12), transparent 60%), radial-gradient(900px 500px at 50% 0%, rgba(245,158,11,0.10), transparent 60%)",
          }}
        />

        <div className="container relative mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-5xl md:text-6xl">
                Admission begins with{" "}
                <span className={gradientText}>a conversation</span>.
              </h2>

              <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-[17px]">
                A short conversation, so we can place you with the right
                teacher, on the right path, at the right pace.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/onsite/admissions"
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/25 transition-all duration-300",
                    gradientFill,
                    gradientFillHover
                  )}
                >
                  Begin admissions
                  <ArrowRight
                    className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </Link>
                <Link
                  href="/physical/contact"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-wide text-foreground/85 transition-all duration-300 hover:text-foreground"
                >
                  Contact the administration
                  <ArrowRight
                    className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          FOOTNOTE STRIP
          ============================================================ */}
      <div className="border-t border-foreground/10 bg-background py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-foreground/60">
            <span className="flex items-center gap-2">
              <ShieldCheck
                className="h-3.5 w-3.5 text-purple-700/70 dark:text-purple-300/70"
                strokeWidth={1.5}
              />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2">
              <Crown
                className="h-3.5 w-3.5 text-amber-600/80 dark:text-amber-400/80"
                strokeWidth={1.5}
              />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2">
              <Users
                className="h-3.5 w-3.5 text-purple-700/70 dark:text-purple-300/70"
                strokeWidth={1.5}
              />
              50+ Students
            </span>
            <span className="flex items-center gap-2">
              <Globe
                className="h-3.5 w-3.5 text-amber-600/80 dark:text-amber-400/80"
                strokeWidth={1.5}
              />
              5+ Countries
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
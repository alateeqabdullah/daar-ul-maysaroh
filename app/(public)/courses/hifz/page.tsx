// // // src/app/(marketing)/courses/hifz/page.tsx
// // "use client";

// // import { motion } from "framer-motion";
// // import {
// //   BookOpen,
// //   Target,
// //   Star,
// //   Clock,
// //   CheckCircle,
// //   Zap,
// //   Award,
// //   Users,
// //   Crown,
// //   Calendar,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useCourses } from "@/hooks/use-courses";
// // import { cn } from "@/lib/utils";
// // import Link from "next/link";

// // export default function HifzProgramPage() {
// //   const { courses, isLoading } = useCourses();

// //   const hifzCourses = courses.filter(
// //     (course) =>
// //       course.title.toLowerCase().includes("hifz") ||
// //       course.title.toLowerCase().includes("memorization")
// //   );

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-background pt-16">
// //         <div className="container mx-auto px-4 lg:px-6 py-8">
// //           <div className="animate-pulse space-y-8">
// //             <div className="h-8 bg-card rounded w-1/4"></div>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               {[1, 2, 3].map((i) => (
// //                 <div key={i} className="h-64 bg-card rounded-lg"></div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background pt-16">
// //       {/* Hero Section */}
// //       <section className="bg-linear-to-br from-purple-500 to-pink-600 text-white py-16 lg:py-20">
// //         <div className="container mx-auto px-4 lg:px-6">
// //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial={{ opacity: 0, x: -30 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               className="space-y-6"
// //             >
// //               <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
// //                 <Crown className="w-5 h-5" />
// //                 <span className="text-sm font-medium">Hifz Program</span>
// //               </div>

// //               <h1 className="text-4xl lg:text-6xl font-heading font-bold">
// //                 Quran Memorization Program
// //               </h1>

// //               <p className="text-xl text-purple-100">
// //                 Embark on the sacred journey of memorizing the entire Quran with
// //                 our comprehensive Hifz program guided by expert Huffaz.
// //               </p>

// //               <div className="grid grid-cols-2 gap-4">
// //                 {[
// //                   { label: "Completion Time", value: "2-3 Years" },
// //                   { label: "Success Rate", value: "95%" },
// //                   { label: "Daily Commitment", value: "2-3 Hours" },
// //                   { label: "Ijazah Ready", value: "Yes" },
// //                 ].map((stat, index) => (
// //                   <div key={stat.label} className="text-center">
// //                     <div className="text-2xl font-bold">{stat.value}</div>
// //                     <div className="text-sm text-purple-200">{stat.label}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, x: 30 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
// //             >
// //               <h3 className="text-2xl font-heading font-bold mb-6">
// //                 Program Highlights
// //               </h3>
// //               <div className="space-y-4">
// //                 {[
// //                   "Daily one-on-one sessions with certified Huffaz",
// //                   "Personalized memorization plan and schedule",
// //                   "Regular revision and testing system",
// //                   "Tajweed perfection alongside memorization",
// //                   "Ijazah preparation and certification",
// //                   "Parent/guardian progress updates",
// //                 ].map((benefit, index) => (
// //                   <div key={index} className="flex items-center space-x-3">
// //                     <CheckCircle className="w-5 h-5 text-purple-300 flex-shrink-0" />
// //                     <span className="text-purple-100">{benefit}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Program Structure */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 lg:px-6">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             className="text-center mb-12"
// //           >
// //             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
// //               Program Structure
// //             </h2>
// //             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
// //               A carefully designed journey to help you memorize the entire Quran
// //               with perfection
// //             </p>
// //           </motion.div>

// //           <div className="grid md:grid-cols-3 gap-8 mb-16">
// //             {[
// //               {
// //                 phase: "Phase 1",
// //                 title: "Foundation & Juz Amma",
// //                 duration: "6 Months",
// //                 description:
// //                   "Build strong foundation and memorize the 30th Juz with proper Tajweed",
// //                 features: [
// //                   "Basic Tajweed rules",
// //                   "Memorization techniques",
// //                   "Daily 1-hour sessions",
// //                 ],
// //               },
// //               {
// //                 phase: "Phase 2",
// //                 title: "Core Memorization",
// //                 duration: "18-24 Months",
// //                 description:
// //                   "Systematic memorization of the entire Quran with regular revision",
// //                 features: [
// //                   "Weekly new pages",
// //                   "Daily revision",
// //                   "Monthly testing",
// //                 ],
// //               },
// //               {
// //                 phase: "Phase 3",
// //                 title: "Mastery & Ijazah",
// //                 duration: "6 Months",
// //                 description:
// //                   "Perfect memorization and prepare for Ijazah certification",
// //                 features: [
// //                   "Complete revision",
// //                   "Ijazah preparation",
// //                   "Recitation perfection",
// //                 ],
// //               },
// //             ].map((phase, index) => (
// //               <motion.div
// //                 key={phase.phase}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: index * 0.2 }}
// //                 className="bg-card rounded-2xl border shadow-sm p-6 text-center"
// //               >
// //                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <span className="font-bold text-primary">{phase.phase}</span>
// //                 </div>
// //                 <h3 className="text-xl font-heading font-bold mb-2">
// //                   {phase.title}
// //                 </h3>
// //                 <div className="text-sm text-primary font-medium mb-3">
// //                   {phase.duration}
// //                 </div>
// //                 <p className="text-muted-foreground text-sm mb-4">
// //                   {phase.description}
// //                 </p>
// //                 <div className="space-y-2 text-left">
// //                   {phase.features.map((feature, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="flex items-center space-x-2 text-sm"
// //                     >
// //                       <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
// //                       <span>{feature}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* Hifz Courses */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             className="text-center mb-12"
// //           >
// //             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
// //               Hifz Program Options
// //             </h2>
// //           </motion.div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {hifzCourses.map((course, index) => (
// //               <motion.div
// //                 key={course.id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6, delay: index * 0.1 }}
// //                 whileHover={{ y: -5 }}
// //                 className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
// //               >
// //                 {/* Premium Badge */}
// //                 <div className="absolute top-4 right-4 bg-linear-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
// //                   Premium
// //                 </div>

// //                 <div className="p-6 space-y-4">
// //                   {/* Course Header */}
// //                   <div className="space-y-2">
// //                     <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
// //                       {course.title}
// //                     </h3>
// //                     <p className="text-muted-foreground text-sm line-clamp-2">
// //                       {course.description}
// //                     </p>
// //                   </div>

// //                   {/* Commitment */}
// //                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
// //                     <Calendar className="w-4 h-4" />
// //                     <span>Daily commitment required</span>
// //                   </div>

// //                   {/* Key Features */}
// //                   <div className="space-y-2">
// //                     {course.features
// //                       .slice(0, 4)
// //                       .map((feature: string, idx: number) => (
// //                         <div key={idx} className="flex items-center space-x-2">
// //                           <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
// //                           <span className="text-sm text-card-foreground">
// //                             {feature}
// //                           </span>
// //                         </div>
// //                       ))}
// //                   </div>

// //                   {/* Price & Duration */}
// //                   <div className="flex items-center justify-between pt-4 border-t">
// //                     <div>
// //                       <div className="text-2xl font-bold text-primary">
// //                         ${course.price}
// //                       </div>
// //                       <div className="text-sm text-muted-foreground">
// //                         per month
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <div className="flex items-center space-x-1 text-sm text-muted-foreground">
// //                         <Clock className="w-4 h-4" />
// //                         <span>{course.duration}m</span>
// //                       </div>
// //                       <div className="text-xs text-muted-foreground">
// //                         daily session
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* CTA */}
// //                   <Button
// //                     className="w-full group-hover:scale-105 transition-transform duration-200 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
// //                     asChild
// //                   >
// //                     <Link href={`/courses/${course.id}`}>
// //                       <Crown className="w-4 h-4 mr-2" />
// //                       Start Hifz Journey
// //                     </Link>
// //                   </Button>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-16 bg-muted/30">
// //         <div className="container mx-auto px-4 lg:px-6">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             className="text-center max-w-4xl mx-auto"
// //           >
// //             <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
// //             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
// //               Begin Your Sacred Journey of Hifz
// //             </h2>
// //             <p className="text-xl text-muted-foreground mb-8">
// //               Join the blessed path of becoming a Hafiz/Hafiza with our
// //               comprehensive memorization program.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Button
// //                 size="lg"
// //                 className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
// //                 asChild
// //               >
// //                 <Link href="/auth/signup">
// //                   <Zap className="w-4 h-4 mr-2" />
// //                   Start Free Assessment
// //                 </Link>
// //               </Button>
// //               <Button size="lg" variant="outline" asChild>
// //                 <Link href="/contact">
// //                   <Users className="w-4 h-4 mr-2" />
// //                   Speak with Hafiz
// //                 </Link>
// //               </Button>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }








// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Award, BookOpen, Calendar, CheckCircle2, Clock, GraduationCap, Shield, Sparkles, Target, Users } from "lucide-react";
// import Link from "next/link";

// export default function HifzProgramPage() {
//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 bg-background overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 space-y-8 sm:space-y-10">
//             {/* Breadcrumb */}
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Link href="/courses" className="hover:text-primary-700 transition-colors">Programs</Link>
//               <span>/</span>
//               <span className="text-primary-700 font-medium">Hifz Al-Quran</span>
//             </div>

//             {/* Hero Content */}
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//               <div className="space-y-6 sm:space-y-8">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em]">
//                     <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Ijazah Certification
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85]">
//                     Hifz <span className="text-primary-700 italic">Al-Quran</span>
//                     <br />Program
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
//                     Complete Quran memorization with authentic Ijazah certification. 
//                     An unbroken chain of transmission reaching back to Prophet Muhammad (ﷺ).
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                     <Link href="/admissions">
//                       <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11 w-full sm:w-auto">
//                         <span className="flex items-center gap-3">
//                           START YOUR JOURNEY
//                           <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                         </span>
//                       </Button>
//                     </Link>
//                     <Link href="#curriculum">
//                       <Button variant="outline" className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto">
//                         EXPLORE CURRICULUM
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Visual */}
//               <Reveal delay={0.4}>
//                 <div className="relative">
//                   <div className="institutional-card p-8 sm:p-10 md:p-12 bg-linear-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
//                     <div className="grid grid-cols-2 gap-6 mb-8">
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">2-3</div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">Years Duration</div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">1-on-1</div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">Teaching</div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">100%</div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">Memorization</div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">Ijazah</div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">Certification</div>
//                       </div>
//                     </div>
                    
//                     <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10">
//                       <div className="flex items-center gap-4 mb-3">
//                         <GraduationCap className="w-8 h-8 text-primary-700" />
//                         <div className="font-black text-lg uppercase tracking-tight">Sanad-Based</div>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         Complete chain of transmission to Prophet Muhammad (ﷺ)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Program Highlights */}
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   The <span className="text-primary-700 italic">Al-Maysaroh</span> Difference
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Why our Hifz program stands apart in authentic Quranic education
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Shield,
//                   title: "Authentic Sanad",
//                   description: "Unbroken chain to Prophet (ﷺ)"
//                 },
//                 {
//                   icon: Target,
//                   title: "Personalized Path",
//                   description: "Customized memorization plan"
//                 },
//                 {
//                   icon: Award,
//                   title: "Ijazah Certification",
//                   description: "Traditional certification"
//                 },
//                 {
//                   icon: Clock,
//                   title: "Flexible Scheduling",
//                   description: "Balance with daily life"
//                 }
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 text-center hover:border-primary-700/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
//                     <p className="text-sm text-muted-foreground">{item.description}</p>
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
//                   Structured <span className="text-primary-700 italic">Curriculum</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   A systematic approach to Quran memorization spanning 2-3 years
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-6 sm:space-y-8">
//               {[
//                 {
//                   phase: "1",
//                   title: "Foundation (6 Months)",
//                   description: "Establish memorization techniques and daily routine",
//                   points: [
//                     "Tajweed fundamentals",
//                     "Memorization methodology",
//                     "Daily revision system",
//                     "Progress tracking setup"
//                   ]
//                 },
//                 {
//                   phase: "2",
//                   title: "Core Memorization (18 Months)",
//                   description: "Systematic completion of the entire Quran",
//                   points: [
//                     "Juz-by-Juz progression",
//                     "Weekly assessments",
//                     "Mistake correction",
//                     "Revision reinforcement"
//                   ]
//                 },
//                 {
//                   phase: "3",
//                   title: "Consolidation (6 Months)",
//                   description: "Perfect memorization and preparation for Ijazah",
//                   points: [
//                     "Complete Quran revision",
//                     "Speed and fluency",
//                     "Ijazah preparation",
//                     "Teaching methodology"
//                   ]
//                 }
//               ].map((phase, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-primary-700/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-6">
//                       <div className="md:w-48 shrink-0">
//                         <div className="inline-flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-primary-700 text-white p-4 flex items-center justify-center text-sm font-black">
//                             {phase.phase}
//                           </div>
//                           <div className="font-black text-lg uppercase tracking-tight">{phase.title}</div>
//                         </div>
//                         <p className="text-sm text-muted-foreground">{phase.description}</p>
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           {phase.points.map((point, idx) => (
//                             <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/20">
//                               <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
//                               <span className="text-sm font-medium">{point}</span>
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
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Our <span className="text-primary-700 italic">Methodology</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   The proven approach that has helped thousands memorize the Quran
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: BookOpen,
//                   title: "Personalized Instruction",
//                   description: "1-on-1 sessions with Ijazah-certified scholars who tailor the approach to your learning style and pace."
//                 },
//                 {
//                   icon: Users,
//                   title: "Progress Tracking",
//                   description: "Comprehensive digital tracking of every ayah memorized, mistakes made, and progress achieved."
//                 },
//                 {
//                   icon: Calendar,
//                   title: "Structured Schedule",
//                   description: "Flexible yet disciplined schedule that adapts to your life while maintaining consistent progress."
//                 }
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 h-full hover:border-primary-700/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
//                     <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
//                 <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-primary-700" />
                
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
//                   Begin Your <span className="text-primary-700 italic">Memorization</span> Journey
//                 </h2>
                
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
//                   Join thousands who have completed their Hifz with authentic Ijazah through Al-Maysaroh
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link href="/admissions">
//                     <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11 w-full sm:w-auto">
//                       <span className="flex items-center gap-3">
//                         ENROLL NOW
//                         <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </span>
//                     </Button>
//                   </Link>
                  
//                   <Link href="/contact">
//                     <Button variant="outline" className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto">
//                       SPEAK TO ADVISOR
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-border/50">
//                   <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Free Assessment Session
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       14-Day Satisfaction Guarantee
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Flexible Payment Plans
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Frequently Asked <span className="text-primary-700 italic">Questions</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light">
//                   Common questions about our Hifz program
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "What age is appropriate to start Hifz?",
//                   a: "We accept students from age 7 through adulthood. Younger students typically complete in 3 years, while adults may take 2-3 years depending on their schedule."
//                 },
//                 {
//                   q: "How many hours per day are required?",
//                   a: "We recommend 1-2 hours daily, including memorization and revision. The exact schedule is personalized based on your capacity and goals."
//                 },
//                 {
//                   q: "What happens if I miss lessons?",
//                   a: "We offer flexible rescheduling and catch-up sessions. Your progress is tracked digitally, so you can continue from where you left off."
//                 },
//                 {
//                   q: "Is Tajweed included in the program?",
//                   a: "Yes, Tajweed is integrated throughout the entire program. You'll learn proper pronunciation rules alongside memorization."
//                 },
//                 {
//                   q: "What support is available outside of lessons?",
//                   a: "24/7 access to our portal with revision tools, audio recordings, progress tracking, and direct messaging with your teacher."
//                 }
//               ].map((faq, index) => (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
//                     <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-3">{faq.q}</h3>
//                     <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>

//             <Reveal delay={0.3}>
//               <div className="mt-12 text-center">
//                 <p className="text-lg text-muted-foreground mb-6">
//                   Still have questions about our Hifz program?
//                 </p>
//                 <Link href="/contact">
//                   <Button variant="outline" className="rounded-full px-8 py-4 font-black">
//                     CONTACT OUR ADMISSIONS TEAM
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






// app/courses/hifz/page.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Star,
  Clock,
  Calendar,
  Award,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  Crown,
  Target,
  Quote,
  GraduationCap,
  Compass,
  MessageCircle,
  Rocket,
  Globe,
  Gem,
  ScrollText,
  Sun,
  Leaf,
  Flower,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Program Data
const PROGRAM_DATA = {
  name: "Hifz Al-Quran",
  tagline: "The Sacred Journey of Memorization",
  description: "A comprehensive, spiritually enriching program to memorize the entire Quran with proper Tajweed, deep understanding, and authentic Sanad certification.",
  audience: "Ages 12+ • Committed Learners",
  duration: "2-3 years",
  sessionsPerWeek: "3-5 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 Private Sessions",
  level: "Beginner to Advanced",
  priceRange: "$149",
  pricePeriod: "per month",
  surahs: 114,
  verses: 6236,
  juz: 30,
};

// Core Pillars
const PILLARS = [
  { icon: Shield, title: "Authentic Sanad", description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)", audience: "Spiritual Lineage" },
  { icon: Crown, title: "Ijazah Certification", description: "Formal certification upon completion", audience: "Scholarly Recognition" },
  { icon: Users, title: "1-on-1 Attention", description: "Personalized guidance from certified scholars", audience: "Individual Focus" },
  { icon: Heart, title: "Spiritual Nurturing", description: "Develop deep connection with Allah's words", audience: "Heart Transformation" },
  { icon: Target, title: "Structured Progression", description: "Juz-by-Juz systematic memorization", audience: "Clear Milestones" },
  { icon: Calendar, title: "Flexible Pace", description: "Customized schedule that fits your life", audience: "Sustainable Journey" },
];

// Memorization Journey
const MEMORIZATION_JOURNEY = [
  { stage: "Foundation Phase", duration: "Months 1-6", focus: "Establish strong memorization techniques", surahs: "Juz 1-5", activities: ["Tajweed foundation", "Memorization methodology", "Daily revision system", "Progress tracking"], icon: Leaf },
  { stage: "Building Phase", duration: "Months 7-18", focus: "Systematic memorization of the Quran", surahs: "Juz 6-25", activities: ["Juz-by-Juz progression", "Weekly assessments", "Mistake correction", "Revision reinforcement"], icon: Flower },
  { stage: "Mastery Phase", duration: "Months 19-30", focus: "Perfect memorization and fluency", surahs: "Juz 26-30", activities: ["Complete Quran revision", "Speed and fluency", "Mutashabihat mastery", "Ijazah preparation"], icon: Crown },
];

// Schedule Options
const SCHEDULE_OPTIONS = [
  { day: "Monday, Wednesday, Friday", time: "Flexible (6 AM - 10 PM EST)", icon: Sun },
  { day: "Tuesday, Thursday, Saturday", time: "Flexible (6 AM - 10 PM EST)", icon: Sun },
  { day: "Daily (5 days/week)", time: "Custom schedule", icon: Calendar },
  { day: "Weekend Intensive", time: "Friday, Saturday, Sunday", icon: Calendar },
];

// Success Stories
const STORIES = [
  { name: "Ahmed Hassan", type: "Hafiz Graduate", quote: "The structured approach and constant encouragement kept me motivated throughout my 2-year journey. The Ijazah ceremony was unforgettable.", duration: "24 months", icon: Crown },
  { name: "Fatima Al-Mansouri", type: "Mother of 3", quote: "Balancing family and Hifz seemed impossible, but my teacher's patience and flexible schedule made it possible. I'm now a Hafidha!", duration: "30 months", icon: Heart },
  { name: "Dr. Omar Farooq", type: "Medical Professional", quote: "As a busy doctor, I needed a program that respects my time. The 1-on-1 attention and structured revision system helped me complete Hifz in 28 months.", duration: "28 months", icon: Briefcase },
  { name: "Yusuf Rahman", type: "University Student", quote: "The teachers don't just teach memorization; they instill love for the Quran. The journey transformed my relationship with Allah.", duration: "26 months", icon: GraduationCap },
];

// FAQ
const FAQS = [
  { q: "What is the minimum age to start Hifz?", a: "We accept students from age 12 and above. Younger students may be accepted based on assessment." },
  { q: "How many hours should I practice daily?", a: "We recommend 1-2 hours of memorization plus 1 hour of revision daily. Consistency is key." },
  { q: "What if I forget what I memorized?", a: "Our revision system is designed to prevent forgetting. Regular revision sessions are built into the program." },
  { q: "Do I get an Ijazah upon completion?", a: "Yes! Upon successful completion, you receive an Ijazah with complete Sanad to Prophet Muhammad (ﷺ)." },
  { q: "Can I join if I already know some Juz?", a: "Absolutely! We'll assess your level and create a personalized plan from where you are." },
  { q: "Is there a trial period?", a: "Yes! We offer a free 30-minute assessment session to evaluate your level and goals." },
];



export default function HifzProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/3 rounded-full blur-[200px]" />
        
        {/* Animated Floating Elements */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 left-10 w-3 h-3 bg-purple-400/30 rounded-full" />
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-32 right-20 w-4 h-4 bg-gold/30 rounded-full" />
        <motion.div animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-1/4 w-2 h-2 bg-indigo-400/30 rounded-full" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-24 sm:pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 text-purple-700 text-[11px] font-black uppercase tracking-wider mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> 🏆 The Noble Path of Memorization 🏆
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[1.1] mb-6">
              Hifz{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-gold">
                Al-Quran
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              {PROGRAM_DATA.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: Users, text: PROGRAM_DATA.format },
                { icon: Clock, text: `${PROGRAM_DATA.sessionDuration} sessions` },
                { icon: Crown, text: "Ijazah Certification" },
                { icon: ScrollText, text: "Authentic Sanad" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800 text-purple-700 text-xs font-black">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.text}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-10 py-5 sm:px-12 sm:py-6 font-black bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    BEGIN YOUR HIFZ JOURNEY
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey">
                <Button variant="outline" className="rounded-full px-10 py-5 sm:px-12 sm:py-6 font-black text-base sm:text-lg border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300">
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border/50">
              {[
                { label: "Quran Memorized", value: "114", icon: BookOpen, sub: "Surahs" },
                { label: "Total Verses", value: "6,236", icon: ScrollText, sub: "Ayahs" },
                { label: "Juz", value: "30", icon: Star, sub: "Parts" },
                { label: "Ijazah Graduates", value: "200+", icon: Crown, sub: "Certified" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-800">
                  <stat.icon className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-black text-purple-600">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-[10px] text-purple-500 font-black mt-0.5">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pillars Section */}
      <section className="py-20 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Crown className="w-3.5 h-3.5" /> The Sacred Path
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              Why Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">Hifz Program</span> is Unique
            </h2>
            <p className="text-muted-foreground text-lg">A journey of a lifetime, guided by scholars with authentic Sanad</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -5 }} className="group p-6 rounded-2xl bg-background border border-border hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg mb-1">{pillar.title}</h3>
                        <p className="text-sm text-muted-foreground">{pillar.description}</p>
                        <div className="mt-2 inline-flex px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[10px] font-black">
                          {pillar.audience}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memorization Journey */}
      <section id="journey" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Compass className="w-3.5 h-3.5" /> Your Path to Ijazah
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">First Ayah</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-purple-700">Complete Quran</span>
            </h2>
            <p className="text-muted-foreground text-lg">A structured, spiritual journey to become a carrier of the Divine Word</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-gold hidden md:block" />
            <div className="space-y-8">
              {MEMORIZATION_JOURNEY.map((phase, idx) => {
                const Icon = phase.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="relative pl-0 md:pl-20">
                      <div className="hidden md:flex absolute left-0 top-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 items-center justify-center text-white font-black text-xl shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="institutional-card p-6 md:p-8 hover:border-purple-300 transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-72">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-950/30 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-purple-600" />
                              </div>
                              <h3 className="font-black text-2xl">{phase.stage}</h3>
                            </div>
                            <div className="inline-flex px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-xs font-black mt-2">
                              {phase.duration}
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">{phase.focus}</p>
                            <div className="mt-2 text-xs font-black text-gold">{phase.surahs}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2">
                              {phase.activities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 text-purple-700 text-xs font-black">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {activity}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 h-2 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(idx + 1) * 33}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-purple-600 to-gold rounded-full"
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
      </section>

      {/* Schedule & Pricing */}
      <section className="py-20 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="institutional-card p-8 hover:border-purple-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-950/30 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-black text-2xl">Flexible Schedule</h3>
                </div>
                <div className="space-y-3">
                  {SCHEDULE_OPTIONS.map((slot, i) => {
                    const Icon = slot.icon;
                    return (
                      <div key={i} className="p-4 rounded-xl bg-background border border-border hover:border-purple-300 transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-purple-600" />
                            <span className="font-black text-sm">{slot.day}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{slot.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">✨ All times in EST • Custom schedules available ✨</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="institutional-card p-8 bg-gradient-to-br from-purple-50/20 to-indigo-50/20 hover:border-purple-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
                    <Gem className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-2xl">Investment in Eternity</h3>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">{PROGRAM_DATA.priceRange}</div>
                    <p className="text-sm text-muted-foreground mt-1">{PROGRAM_DATA.pricePeriod} • includes all materials</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "1-on-1 private sessions",
                      "Personalized memorization plan",
                      "Daily revision system",
                      "Progress tracking & reports",
                      "Free assessment session",
                      "Ijazah certification upon completion",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-purple-50/30">
                      <span className="font-black">Family discount (3+ members)</span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">15% off</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Users className="w-3.5 h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">Huffadh</span>
            </h2>
            <p className="text-muted-foreground text-lg">Those who completed the sacred journey with us</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORIES.map((story, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="institutional-card p-6 h-full flex flex-col group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-lg">{story.name}</h4>
                      <p className="text-xs text-purple-600 font-black">{story.type}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-purple-200 dark:text-purple-800/30 mb-3" />
                  <p className="text-sm text-muted-foreground italic flex-grow leading-relaxed">"{story.quote}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">✓ Completed in {story.duration}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <MessageCircle className="w-3.5 h-3.5" /> Common Questions
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-gold">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} className="institutional-card p-6 hover:border-purple-300 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-base mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="institutional-card p-10 md:p-14 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-gold/10"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-700 to-gold mb-6 shadow-xl">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">Begin Your Journey to Become a Hafiz</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
              Join the ranks of those who carry the Quran in their hearts.
              Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-10 py-5 font-black bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    BOOK FREE ASSESSMENT
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-10 py-5 font-black border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">✨ Free 30-minute assessment</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">🏆 Ijazah certification</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">📖 Authentic Sanad</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
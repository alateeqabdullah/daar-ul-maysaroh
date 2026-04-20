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

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
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
  ScrollText,
  Gem,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FAQSection } from "./faq";

// Program Data
const PROGRAM_DATA = {
  name: "Hifz Al-Quran",
  tagline: "The Sacred Journey of Memorization",
  description:
    "A comprehensive, spiritually enriching program to memorize the entire Quran with proper Tajweed, deep understanding, and authentic Sanad certification.",
  audience: "Ages 12+ • Committed Learners",
  duration: "2-3 years",
  sessionsPerWeek: "3-5 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 Private Sessions",
  level: "Beginner to Advanced",
  surahs: 114,
  verses: 6236,
  juz: 30,
  priceRange: "$149",
  pricePeriod: "per month",
};

// Core Pillars
const PILLARS = [
  {
    icon: Shield,
    title: "Authentic Sanad",
    description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
    audience: "Spiritual Lineage",
  },
  {
    icon: Crown,
    title: "Ijazah Certification",
    description: "Formal certification upon completion",
    audience: "Scholarly Recognition",
  },
  {
    icon: Users,
    title: "1-on-1 Attention",
    description: "Personalized guidance from certified scholars",
    audience: "Individual Focus",
  },
  {
    icon: Heart,
    title: "Spiritual Nurturing",
    description: "Develop deep connection with Allah's words",
    audience: "Heart Transformation",
  },
  {
    icon: Target,
    title: "Structured Progression",
    description: "Juz-by-Juz systematic memorization",
    audience: "Clear Milestones",
  },
  {
    icon: Calendar,
    title: "Flexible Pace",
    description: "Customized schedule that fits your life",
    audience: "Sustainable Journey",
  },
];

// Memorization Journey
const MEMORIZATION_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-6",
    focus: "Establish strong memorization techniques",
    juz: "Juz 1-5",
    activities: [
      "Tajweed foundation",
      "Memorization methodology",
      "Daily revision system",
      "Progress tracking",
    ],
    icon: Leaf,
  },
  {
    stage: "Building Phase",
    duration: "Months 7-18",
    focus: "Systematic memorization of the Quran",
    juz: "Juz 6-25",
    activities: [
      "Juz-by-Juz progression",
      "Weekly assessments",
      "Mistake correction",
      "Revision reinforcement",
    ],
    icon: Flower,
  },
  {
    stage: "Mastery Phase",
    duration: "Months 19-30",
    focus: "Perfect memorization and fluency",
    juz: "Juz 26-30",
    activities: [
      "Complete Quran revision",
      "Speed and fluency",
      "Mutashabihat mastery",
      "Ijazah preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths - Different for Different Audiences
const JOURNEY_PATHS = [
  {
    audience: "Youth (12-17)",
    icon: User,
    pace: "Structured & Supportive",
    duration: "2-3 years",
    features: [
      "Regular assessments",
      "Peer motivation",
      "Parent involvement",
      "Progress tracking",
    ],
    color: "from-purple-500 to-indigo-500",
  },
  {
    audience: "Adults (18-35)",
    icon: GraduationCap,
    pace: "Focused & Efficient",
    duration: "2-2.5 years",
    features: [
      "Intensive schedule",
      "Deep understanding",
      "Flexible timing",
      "Ijazah preparation",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    audience: "Professionals",
    icon: Briefcase,
    pace: "Flexible & Sustainable",
    duration: "2.5-3 years",
    features: [
      "Early morning slots",
      "Weekend options",
      "Revision focus",
      "Work-life balance",
    ],
    color: "from-purple-600 to-indigo-700",
  },
  {
    audience: "Advanced/Mujawwid",
    icon: Crown,
    pace: "Accelerated & Precision",
    duration: "1.5-2 years",
    features: [
      "Rapid progression",
      "Tajweed emphasis",
      "Mutashabihat mastery",
      "Teaching preparation",
    ],
    color: "from-gold to-amber-600",
  },
];

// Universal Milestones
const MILESTONES = [
  { level: "Foundation Level", juz: "1-5", badge: "🌱", description: "Building strong memorization habits" },
  { level: "Intermediate Level", juz: "6-15", badge: "🌿", description: "Developing memorization stamina" },
  { level: "Advanced Level", juz: "16-25", badge: "🌳", description: "Strengthening retention & fluency" },
  { level: "Master Level", juz: "26-30", badge: "🏆", description: "Complete Quran & Ijazah preparation" },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Ahmed, 24",
    type: "Hafiz Graduate",
    story: "The structured approach and constant encouragement kept me motivated throughout my 2-year journey. The Ijazah ceremony was unforgettable.",
    duration: "24 months",
    icon: Crown,
  },
  {
    name: "Fatima, 35",
    type: "Mother of 3",
    story: "Balancing family and Hifz seemed impossible, but my teacher's patience and flexible schedule made it possible. I'm now a Hafidha!",
    duration: "30 months",
    icon: Heart,
  },
  {
    name: "Dr. Omar, 42",
    type: "Medical Professional",
    story: "As a busy doctor, I needed a program that respects my time. The 1-on-1 attention and structured revision system helped me complete Hifz.",
    duration: "28 months",
    icon: Briefcase,
  },
  {
    name: "Yusuf, 19",
    type: "University Student",
    story: "The teachers don't just teach memorization; they instill love for the Quran. The journey transformed my relationship with Allah.",
    duration: "26 months",
    icon: GraduationCap,
  },
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Hidden on mobile for performance */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 🏆 The Noble Path of Memorization 🏆
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Hifz{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-gold whitespace-nowrap">
                Al-Quran
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              A comprehensive, spiritually enriching program to memorize the entire Quran with proper Tajweed, deep understanding, and authentic Sanad certification.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    BEGIN YOUR HIFZ JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-purple-600 text-purple-600">
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Total Surahs", value: "114", icon: BookOpen },
                { label: "Total Verses", value: "6,236", icon: ScrollText },
                { label: "Juz", value: "30", icon: Star },
                { label: "Ijazah Graduates", value: "200+", icon: Crown },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-purple-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Sacred Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Why Our <span className="text-purple-600 italic">Hifz Program</span> is Unique
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A journey of a lifetime, guided by scholars with authentic Sanad
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-purple-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-purple-600 font-black mt-1">{pillar.audience}</p>
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
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-purple-600 italic">Tailored to You</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different needs - all leading to becoming a Hafiz
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-purple-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memorization Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Ijazah
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From <span className="text-purple-600 italic">First Ayah</span> to <span className="text-purple-600 italic">Complete Quran</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A structured, spiritual journey to become a carrier of the Divine Word
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-gold" />
              <div className="space-y-6 sm:space-y-8">
                {MEMORIZATION_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                              <p className="text-xs font-black text-gold mt-1">{phase.juz}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.activities.map((activity, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 text-purple-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {activity}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
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
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Celebrate Progress
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Every <span className="text-purple-600 italic">Milestone</span> Matters
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Recognition at every stage keeps you motivated on your Hifz journey
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {MILESTONES.map((milestone, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-purple-50/30 to-indigo-50/30 border border-purple-100 dark:border-purple-800">
                  <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">{milestone.badge}</div>
                  <h3 className="font-black text-sm sm:text-lg mb-0.5 sm:mb-1">{milestone.level}</h3>
                  <p className="text-xs sm:text-sm text-purple-600 font-black mb-1 sm:mb-2">{milestone.juz} Juz</p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-purple-600 italic">Huffadh</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who completed the sacred journey with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-purple-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200 dark:text-purple-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">"{story.story}"</p>
                    <p className="text-[10px] sm:text-xs text-purple-600 font-black mt-3">✓ Completed in {story.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Format Options */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Investment in Eternity
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Simple, <span className="text-purple-600 italic">Transparent</span> Pricing
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Choose the format that works best for your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Standard Track",
                price: "$149",
                period: "/month",
                features: [
                  "3 sessions per week",
                  "45-min sessions",
                  "Progress tracking",
                  "Revision system",
                  "Monthly assessments",
                ],
                icon: User,
                popular: true,
              },
              {
                title: "Intensive Track",
                price: "$199",
                period: "/month",
                features: [
                  "5 sessions per week",
                  "60-min sessions",
                  "Accelerated pace",
                  "Daily revision",
                  "Weekly testing",
                  "Ijazah preparation",
                ],
                icon: Target,
                popular: false,
              },
              {
                title: "Flexible Track",
                price: "$129",
                period: "/month",
                features: [
                  "Custom schedule",
                  "45-min sessions",
                  "Work-life balance",
                  "Revision focus",
                  "Weekend options",
                ],
                icon: Calendar,
                popular: false,
              },
            ].map((format, i) => {
              const Icon = format.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 text-center h-full ${format.popular ? "border-2 border-purple-500 relative" : ""}`}>
                    {format.popular && (
                      <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-1 sm:mb-2">{format.title}</h3>
                    <div className="text-2xl sm:text-3xl font-black text-purple-600">{format.price}</div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">{format.period}</p>
                    <div className="space-y-1.5 sm:space-y-2 text-left mb-5 sm:mb-6">
                      {format.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                          <span className="break-words">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/assessment">
                      <Button className="w-full rounded-full py-2.5 sm:py-3 font-black text-xs sm:text-sm bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white">
                        Begin Your Journey
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-purple-50/5 to-indigo-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-purple-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600/5 to-indigo-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-700 to-gold mb-4 sm:mb-6 shadow-lg">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Begin Your Journey to Become a Hafiz</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Join the ranks of those who carry the Quran in their hearts.
              Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-purple-600 text-purple-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 30-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🏆 Ijazah certification</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📖 Authentic Sanad</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
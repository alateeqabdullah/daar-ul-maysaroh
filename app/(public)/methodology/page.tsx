
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Award,
//   BarChart3,
//   Brain,
//   CheckCircle2,
//   ChevronRight,
//   Crown,
//   Database,
//   Globe,
//   GraduationCap,
//   Headphones as HeadphonesIcon,
//   Heart,
//   Layers,
//   Link as LinkIcon,
//   Mic,
//   Monitor,
//   Repeat,
//   Shield,
//   Smartphone,
//   Sparkle,
//   Sparkles,
//   Star,
//   Target,
//   Users,
//   Video,
//   Scroll,
// } from "lucide-react";
// import Link from "next/link";

// const METHODOLOGY_STEPS = [
//   {
//     step: "01",
//     title: "Initial Assessment",
//     description:
//       "Every student begins with a comprehensive evaluation of their current level, learning style, and goals.",
//     icon: Target,
//     details: [
//       "Reading level assessment",
//       "Tajweed proficiency check",
//       "Learning style identification",
//       "Goal setting session",
//       "Personalized roadmap creation",
//     ],
//   },
//   {
//     step: "02",
//     title: "Scholar Matching",
//     description:
//       "We pair you with an Ijazah-certified scholar who specializes in your specific learning needs.",
//     icon: Users,
//     details: [
//       "Sanad lineage verification",
//       "Teaching style compatibility",
//       "Schedule alignment",
//       "Gender preference respected",
//       "Free assessment session with match",
//     ],
//   },
//   {
//     step: "03",
//     title: "Structured Curriculum",
//     description:
//       "Follow a proven, systematic approach to Quranic mastery with clear milestones and progress tracking.",
//     icon: Layers,
//     details: [
//       "Phased learning objectives",
//       "Weekly lesson plans",
//       "Practice assignments",
//       "Regular assessments",
//       "Adaptive pace adjustment",
//     ],
//   },
//   {
//     step: "04",
//     title: "Live 1-on-1 Sessions",
//     description:
//       "Engage in focused, real-time learning with your dedicated scholar through our proprietary platform.",
//     icon: Mic,
//     details: [
//       "HD video conferencing",
//       "Real-time correction",
//       "Screen sharing for materials",
//       "Session recordings",
//       "Instant feedback",
//     ],
//   },
//   {
//     step: "05",
//     title: "Continuous Practice",
//     description:
//       "Reinforce learning with structured practice, audio submissions, and progress tracking between sessions.",
//     icon: Repeat,
//     details: [
//       "Practice recordings",
//       "Teacher feedback loop",
//       "Mobile app access",
//       "Daily revision reminders",
//       "Mistake tracking",
//     ],
//   },
//   {
//     step: "06",
//     title: "Progress Validation",
//     description:
//       "Regular assessments and milestone celebrations ensure authentic advancement toward Ijazah certification.",
//     icon: Award,
//     details: [
//       "Quarterly evaluations",
//       "Milestone certificates",
//       "Error pattern analysis",
//       "Readiness assessment",
//       "Ijazah preparation",
//     ],
//   },
// ];

// const TEACHING_PILLARS = [
//   {
//     icon: Shield,
//     title: "Sanad-Based Transmission",
//     description:
//       "Every lesson is taught with awareness of the unbroken chain of transmission back to the Prophet (ﷺ).",
//     color: "purple",
//   },
//   {
//     icon: Mic,
//     title: "Phonetic Precision",
//     description:
//       "Makharij and Sifaat are taught with scientific accuracy using audio analysis technology.",
//     color: "amber",
//   },
//   {
//     icon: Brain,
//     title: "Cognitive Learning",
//     description:
//       "Techniques based on memory science and cognitive psychology for optimal retention.",
//     color: "purple",
//   },
//   {
//     icon: Heart,
//     title: "Spiritual Connection",
//     description:
//       "Lessons are infused with tazkiyah (purification) and love for the Quran.",
//     color: "amber",
//   },
//   {
//     icon: BarChart3,
//     title: "Data-Driven Progress",
//     description:
//       "Every mistake, improvement, and milestone is tracked and analyzed.",
//     color: "purple",
//   },
//   {
//     icon: Globe,
//     title: "Global Accessibility",
//     description:
//       "Learn from anywhere with flexible scheduling across all time zones.",
//     color: "amber",
//   },
// ];

// const TECHNOLOGY_FEATURES = [
//   {
//     icon: Monitor,
//     title: "Proprietary Portal",
//     description:
//       "All-in-one dashboard for lessons, materials, and progress tracking.",
//   },
//   {
//     icon: HeadphonesIcon,
//     title: "Audio Analysis",
//     description:
//       "Visual feedback on your recitation with spectrogram technology.",
//   },
//   {
//     icon: Smartphone,
//     title: "Mobile App (Coming Soon)",
//     description:
//       "Practice anytime, anywhere with our mobile learning application.",
//   },
//   {
//     icon: BarChart3,
//     title: "Progress Analytics",
//     description:
//       "Detailed insights into your learning patterns and improvement areas.",
//   },
//   {
//     icon: Video,
//     title: "Session Recording",
//     description:
//       "Record and Review all lessons with cloud-recorded sessions and notes.",
//   },
//   {
//     icon: Database,
//     title: "Resource Library",
//     description:
//       "Access to thousands of Quranic resources, recordings, and materials.",
//   },
// ];

// const SACRED_LINEAGE = [
//   { generation: "Allah", name: "Allah (SWT)", icon: Sparkle, color: "amber" },
//   {
//     generation: "Jibril",
//     name: "Angel Jibril (AS)",
//     icon: Star,
//     color: "amber",
//   },
//   { generation: "Prophet", name: "Muhammad (ﷺ)", icon: Crown, color: "amber" },
// ];

// const HUMAN_LINEAGE = [
//   { generation: "Chain", name: "1400+ Years", icon: LinkIcon, color: "purple" },
//   {
//     generation: "Master",
//     name: "Master Scholar",
//     icon: Award,
//     color: "purple",
//   },
//   {
//     generation: "Teacher",
//     name: "Ijazah-Certified",
//     icon: GraduationCap,
//     color: "purple",
//   },
//   { generation: "Student", name: "You", icon: Users, color: "purple" },
// ];

// const getColorStyles = (color: string) => {
//   return {
//     purple: {
//       text: "text-purple-600 dark:text-purple-400",
//       bg: "bg-purple-100 dark:bg-purple-950/40",
//       border: "border-purple-200 dark:border-purple-800",
//       gradient: "from-purple-600 to-purple-700",
//       light: "bg-purple-50/30 dark:bg-purple-950/20",
//     },
//     amber: {
//       text: "text-amber-600 dark:text-amber-400",
//       bg: "bg-amber-100 dark:bg-amber-950/40",
//       border: "border-amber-200 dark:border-amber-800",
//       gradient: "from-amber-500 to-amber-600",
//       light: "bg-amber-50/30 dark:bg-amber-950/20",
//     },
//   }[color];
// };

// export default function Methodology() {
//   return (
//     <section className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 bg-background relative overflow-hidden">
//       {/* Background */}
//       <div className="absolute top-0 -left-20 w-80 xs:w-96 h-80 xs:h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 -right-20 w-80 xs:w-96 h-80 xs:h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
//       <div
//         className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
//         style={{ backgroundSize: "400px" }}
//       />

//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           {/* Section Header */}
//           <div className="max-w-4xl mb-12 xs:mb-16 sm:mb-20 space-y-4 xs:space-y-5 sm:space-y-6">
//             <Reveal>
//               <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-purple-100 dark:bg-purple-900/30 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border border-purple-200 dark:border-purple-800">
//                 <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
//                 The Al-Maysaroh Methodology
//               </div>
//               <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
//                 Modern Science. <br />
//                 <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                   Ancient Chain.
//                 </span>
//               </h2>
//               <p className="text-base xs:text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl border-l-4 border-amber-500 pl-4 xs:pl-5 sm:pl-6 leading-relaxed">
//                 A systematic approach combining traditional scholarly
//                 transmission with modern learning science.
//               </p>
//             </Reveal>
//           </div>

//           {/* Sanad Lineage: THE MAP DESIGN */}
//           <Reveal delay={0.2}>
//             <div className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 p-6 xs:p-8 sm:p-10 md:p-12 mb-16 xs:mb-20 sm:mb-24 lg:mb-32 relative group shadow-lg">
//               <div className="text-center mb-10 xs:mb-12 sm:mb-16">
//                 <h3 className="text-xl xs:text-2xl font-black uppercase tracking-widest text-purple-600 mb-2">
//                   The Unbroken Chain
//                 </h3>
//                 <div className="h-px w-16 xs:w-20 sm:w-24 bg-amber-500/30 mx-auto" />
//               </div>

//               <div className="flex flex-col gap-8 xs:gap-10 sm:gap-12 items-center">
//                 <div className="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-12 md:gap-16">
//                   {SACRED_LINEAGE.map((item, i) => {
//                     const Icon = item.icon;
//                     const colors = getColorStyles(item.color);
//                     return (
//                       <div
//                         key={i}
//                         className="relative flex flex-col items-center group/item"
//                       >
//                         <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-500">
//                           <Icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-amber-500" />
//                         </div>
//                         <span className="mt-2 xs:mt-3 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase text-amber-600 tracking-wider">
//                           {item.generation}
//                         </span>
//                         <span className="text-[10px] xs:text-xs font-bold text-center">
//                           {item.name}
//                         </span>
//                         {i < 2 && (
//                           <ArrowRight className="hidden md:block absolute -right-8 xs:-right-10 sm:-right-12 top-8 w-5 h-5 xs:w-6 xs:h-6 text-amber-500/30" />
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="flex flex-col items-center py-2 xs:py-3 sm:py-4">
//                   <div className="w-0.5 h-12 xs:h-14 sm:h-16 bg-gradient-to-b from-amber-500 to-purple-600 shadow-md" />
//                   <div className="px-3 xs:px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[8px] xs:text-[9px] sm:text-[10px] font-black tracking-tighter shadow-md">
//                     1,400 YEARS OF TRANSMISSION
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-12 md:gap-16">
//                   {HUMAN_LINEAGE.map((item, i) => {
//                     const Icon = item.icon;
//                     const colors = getColorStyles(item.color);
//                     return (
//                       <div
//                         key={i}
//                         className="relative flex flex-col items-center group/item"
//                       >
//                         <div className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-full bg-purple-100 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-800 flex items-center justify-center group-hover/item:border-purple-500 transition-all duration-500">
//                           <Icon className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-purple-600" />
//                         </div>
//                         <span className="mt-2 xs:mt-3 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-wider">
//                           {item.generation}
//                         </span>
//                         <span className="text-[10px] xs:text-xs font-bold text-center">
//                           {item.name}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <p className="text-[10px] xs:text-xs sm:text-sm text-center text-muted-foreground mt-8 xs:mt-10 sm:mt-12 max-w-2xl mx-auto italic">
//                 Your recitation connects directly to the Prophet (ﷺ) through an
//                 unbroken chain of certified scholars.
//               </p>
//             </div>
//           </Reveal>

//           {/* 6-Step Process */}
//           <div className="mb-16 xs:mb-20 sm:mb-24 lg:mb-32">
//             <Reveal>
//               <div className="flex items-center gap-3 xs:gap-4 mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
//                 <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Your{" "}
//                   <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
//                     Learning
//                   </span>{" "}
//                   Journey
//                 </h3>
//                 <div className="grow h-px bg-purple-600/10" />
//               </div>
//             </Reveal>

//             <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-7 md:gap-8">
//               {METHODOLOGY_STEPS.map((step, index) => {
//                 const Icon = step.icon;
//                 return (
//                   <Reveal key={index} delay={index * 0.1}>
//                     <li className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all overflow-hidden h-full group list-none shadow-sm hover:shadow-xl">
//                       <div className="p-5 xs:p-6 sm:p-7 md:p-8 space-y-4 xs:space-y-5 sm:space-y-6 flex flex-col h-full">
//                         <div className="flex justify-between items-start">
//                           <div className="w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-500">
//                             <Icon className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7" />
//                           </div>
//                           <span className="text-4xl xs:text-5xl font-black text-purple-600/10">
//                             {step.step}
//                           </span>
//                         </div>

//                         <div className="grow">
//                           <h4 className="font-black text-base xs:text-lg sm:text-xl uppercase tracking-tight mb-1.5 xs:mb-2 group-hover:text-purple-600 transition-colors">
//                             {step.title}
//                           </h4>
//                           <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed mb-4 xs:mb-5 sm:mb-6">
//                             {step.description}
//                           </p>

//                           <ul className="space-y-2 pt-3 xs:pt-4 border-t border-purple-200 dark:border-purple-800">
//                             {step.details.map((detail, idx) => (
//                               <li
//                                 key={idx}
//                                 className="flex items-center gap-2 xs:gap-3 text-[10px] xs:text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors"
//                               >
//                                 <CheckCircle2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600 shrink-0" />
//                                 {detail}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
//                     </li>
//                   </Reveal>
//                 );
//               })}
//             </ol>
//           </div>

//           {/* Teaching Pillars */}
//           <div className="mb-16 xs:mb-20 sm:mb-24 lg:mb-32">
//             <Reveal>
//               <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center mb-8 xs:mb-10 sm:mb-12 lg:mb-16">
//                 Our{" "}
//                 <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
//                   Teaching
//                 </span>{" "}
//                 Pillars
//               </h3>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-7 md:gap-8">
//               {TEACHING_PILLARS.map((pillar, index) => {
//                 const Icon = pillar.icon;
//                 const colors = getColorStyles(pillar.color);
//                 return (
//                   <Reveal key={index} delay={index * 0.1}>
//                     <div
//                       className={`bg-card rounded-xl sm:rounded-2xl border ${colors.border} hover:border-purple-300 transition-all p-5 xs:p-6 sm:p-7 md:p-8 h-full flex flex-col items-center text-center group shadow-sm hover:shadow-xl`}
//                     >
//                       <div
//                         className={`w-14 h-14 xs:w-15 xs:h-15 sm:w-16 sm:h-16 rounded-xl ${colors.bg} flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-500`}
//                       >
//                         <Icon
//                           className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 ${colors.text} group-hover:text-white`}
//                         />
//                       </div>
//                       <h4 className="font-black text-base xs:text-lg uppercase tracking-tight mb-2 xs:mb-3 italic">
//                         {pillar.title}
//                       </h4>
//                       <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
//                         {pillar.description}
//                       </p>
//                     </div>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Technology Integration */}
//           <div className="mb-16 xs:mb-20 sm:mb-24 lg:mb-32 bg-gradient-to-br from-purple-900 to-purple-950 p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl text-white relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 xs:w-56 sm:w-64 h-48 xs:h-56 sm:h-64 bg-purple-600/20 blur-[100px]" />
//             <Reveal>
//               <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-8 xs:mb-10 sm:mb-12 lg:mb-16 text-center">
//                 <span className="text-amber-400">Technology</span> That Enhances
//               </h3>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8">
//               {TECHNOLOGY_FEATURES.map((tech, i) => {
//                 const Icon = tech.icon;
//                 return (
//                   <Reveal key={i} delay={i * 0.1}>
//                     <div className="flex gap-3 xs:gap-4 p-4 xs:p-5 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
//                       <Icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
//                       <div>
//                         <h4 className="font-black text-xs xs:text-sm uppercase tracking-wider mb-1">
//                           {tech.title}
//                         </h4>
//                         <p className="text-[10px] xs:text-xs text-white/70 leading-relaxed">
//                           {tech.description}
//                         </p>
//                       </div>
//                     </div>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mb-16 xs:mb-20 sm:mb-24 lg:mb-32">
//             {[
//               {
//                 value: "1400+",
//                 label: "Years of Heritage",
//                 icon: Shield,
//                 color: "purple",
//               },
//               {
//                 value: "1-on-1",
//                 label: "Personal Attention",
//                 icon: Users,
//                 color: "amber",
//               },
//               {
//                 value: "24/7",
//                 label: "Portal Access",
//                 icon: Globe,
//                 color: "purple",
//               },
//               {
//                 value: "100%",
//                 label: "Ijazah Track",
//                 icon: Award,
//                 color: "amber",
//               },
//             ].map((stat, index) => {
//               const Icon = stat.icon;
//               const colors = getColorStyles(stat.color);
//               return (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div
//                     className={`text-center p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl border ${colors.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card`}
//                   >
//                     <Icon
//                       className={`w-6 h-6 xs:w-7 xs:h-7 mx-auto mb-2 xs:mb-3 ${colors.text}`}
//                     />
//                     <div
//                       className={`text-2xl xs:text-3xl sm:text-4xl font-black ${colors.text} tracking-tighter mb-0.5 xs:mb-1`}
//                     >
//                       {stat.value}
//                     </div>
//                     <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] xs:tracking-[0.2em] text-muted-foreground">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <Reveal>
//             <div className="relative rounded-2xl sm:rounded-3xl p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 text-center overflow-hidden border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20">
//               <div className="relative z-10 space-y-5 xs:space-y-6 sm:space-y-7 md:space-y-8">
//                 <div className="w-20 h-20 xs:w-22 xs:h-22 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
//                   <GraduationCap className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 text-white" />
//                 </div>
//                 <h3 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]">
//                   Ready to Begin Your{" "}
//                   <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
//                     Journey
//                   </span>
//                   ?
//                 </h3>
//                 <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto italic">
//                   Experience the Al-Maysaroh methodology firsthand with a
//                   complimentary placement assessment.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-5 md:gap-6 justify-center pt-2 xs:pt-3 sm:pt-4">
//                   <Link href="/admissions">
//                     <Button className="rounded-full px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xs xs:text-sm font-black shadow-xl transition-all">
//                       START YOUR JOURNEY
//                       <ChevronRight className="ml-2 w-4 h-4" />
//                     </Button>
//                   </Link>
//                   <Link href="/contact">
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-6 xs:px-8 sm:px-10 md:px-12 py-3 xs:py-3.5 sm:py-4 text-xs xs:text-sm font-black border-2 border-purple-300 text-purple-600 hover:bg-purple-50 transition-all"
//                     >
//                       SPEAK TO AN ADVISOR
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }







// app/methodology/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Crown,
  Database,
  Globe,
  GraduationCap,
  Headphones as HeadphonesIcon,
  Heart,
  Layers,
  Link as LinkIcon,
  Mic,
  Monitor,
  Repeat,
  Shield,
  Smartphone,
  Sparkle,
  Sparkles,
  Star,
  Target,
  Users,
  Video,
  Scroll,
  Compass,
  Gem,
  Infinity,
  Zap,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Simple step data without complex animations
const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Sacred Assessment",
    description: "Begin your journey with a personalized evaluation by our Dean of Academic Affairs.",
    icon: Crown,
    duration: "30-45 min",
    milestone: "Personalized Roadmap",
    details: [
      "One-on-one session with Shaykh Abubakar",
      "Evaluation of current recitation level",
      "Identification of learning style and goals",
      "Discussion of spiritual objectives",
      "Creation of personalized learning roadmap",
    ],
  },
  {
    step: "02",
    title: "Divine Pairing",
    description: "Matched with an Ijazah-certified scholar who resonates with your learning style.",
    icon: Users,
    duration: "24-48 hours",
    milestone: "Teacher Assigned",
    details: [
      "Sanad lineage verification",
      "Teaching methodology compatibility",
      "Schedule and timezone alignment",
      "Free trial session with matched teacher",
      "Adjustment option if needed",
    ],
  },
  {
    step: "03",
    title: "Knowledge Architecture",
    description: "Follow a structured curriculum designed for optimal retention and mastery.",
    icon: Layers,
    duration: "Ongoing",
    milestone: "Phase Completion",
    details: [
      "Phased learning objectives",
      "Weekly personalized lesson plans",
      "Practice assignments and revision",
      "Regular progress assessments",
      "Adaptive pace adjustment",
    ],
  },
  {
    step: "04",
    title: "Living Transmission",
    description: "Engage in live, real-time sessions with your dedicated scholar.",
    icon: Mic,
    duration: "30-60 min/session",
    milestone: "Session Mastery",
    details: [
      "HD video conferencing",
      "Real-time pronunciation correction",
      "Screen sharing for materials",
      "Session recordings for review",
      "Instant feedback and guidance",
    ],
  },
  {
    step: "05",
    title: "Sacred Repetition",
    description: "Reinforce learning with structured practice between sessions.",
    icon: Repeat,
    duration: "10-15 min/day",
    milestone: "Consistency Achieved",
    details: [
      "Audio recording submissions",
      "Teacher feedback on practice",
      "Mobile app for on-the-go learning",
      "Daily revision reminders",
      "Mistake tracking and analysis",
    ],
  },
  {
    step: "06",
    title: "Celestial Certification",
    description: "Complete your journey with formal Ijazah certification.",
    icon: Award,
    duration: "Final Exam",
    milestone: "Ijazah Granted",
    details: [
      "Comprehensive final evaluation",
      "Live examination with scholarly council",
      "Error pattern analysis",
      "Ijazah certificate with Sanad chain",
      "Lifelong alumni benefits",
    ],
  },
];

const TEACHING_PILLARS = [
  {
    icon: Scroll,
    title: "Sanad Lineage",
    description: "Unbroken chain to Prophet Muhammad (ﷺ)",
    color: "purple",
  },
  {
    icon: Mic,
    title: "Phonetic Precision",
    description: "Scientific approach to Makharij and Sifaat",
    color: "amber",
  },
  {
    icon: Brain,
    title: "Cognitive Wisdom",
    description: "Memory science for optimal retention",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Spiritual Connection",
    description: "Tazkiyah and divine connection",
    color: "amber",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Track every milestone and mistake",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Learn from anywhere, anytime",
    color: "amber",
  },
];

const TECHNOLOGY_FEATURES = [
  { icon: Monitor, title: "Proprietary Portal", description: "All-in-one learning dashboard", badge: "Available" },
  { icon: HeadphonesIcon, title: "Audio Analysis", description: "Visual feedback on recitation", badge: "AI-Powered" },
  { icon: Smartphone, title: "Mobile App", description: "Practice on the go", badge: "Coming Soon" },
  { icon: BarChart3, title: "Progress Analytics", description: "Detailed insights", badge: "Real-time" },
  { icon: Video, title: "Session Recording", description: "Review past lessons", badge: "Cloud Storage" },
  { icon: Database, title: "Resource Library", description: "Access thousands of materials", badge: "24/7" },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      gradient: "from-amber-500 to-amber-600",
    },
  };
  // ✅ Added fallback
  return styles[color as keyof typeof styles] || styles.purple;
};

export default function Methodology() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative bg-background overflow-hidden min-h-screen pb-16 xs:pb-20">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Breadcrumb */}
        <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32">
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-purple-600">Methodology</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 xs:mb-16 sm:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4 xs:mb-6">
              <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-500" />
              <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-purple-700">The Al-Maysaroh Way</span>
            </div>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 xs:mb-6">
              Where{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                Science
              </span>
              <br />
              Meets{" "}
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                Sanctity
              </span>
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              A revolutionary approach that honors 1,400 years of scholarly tradition
              while embracing cutting-edge learning science.
            </p>
          </Reveal>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 mb-16 xs:mb-20">
          {[
            { value: "1,400+", label: "Years of Heritage", icon: Shield },
            { value: "100%", label: "Ijazah Track", icon: Award },
            { value: "24/7", label: "Global Access", icon: Globe },
            { value: "1-on-1", label: "Personal Attention", icon: Users },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center p-3 xs:p-4 rounded-xl bg-card border border-purple-200 dark:border-purple-800">
                  <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-purple-600 mx-auto mb-1 xs:mb-2" />
                  <div className="text-xl xs:text-2xl font-black text-purple-600">{stat.value}</div>
                  <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* The Golden Chain */}
        <Reveal delay={0.2}>
          <div className="bg-card rounded-xl xs:rounded-2xl border border-purple-200 dark:border-purple-800 p-5 xs:p-6 sm:p-8 mb-16 xs:mb-20">
            <div className="text-center mb-6 xs:mb-8">
              <h2 className="text-2xl xs:text-3xl font-black tracking-tighter mb-2">The Golden Chain</h2>
              <p className="text-sm xs:text-base text-muted-foreground">An unbroken lineage of light spanning 1,400 years</p>
            </div>
            
            {/* ✅ Fixed: Responsive chain layout */}
            <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-3">
              {[
                { name: "Allah ﷻ", icon: Sparkle, color: "amber" },
                { name: "Jibril (AS)", icon: Star, color: "amber" },
                { name: "Muhammad ﷺ", icon: Crown, color: "amber" },
                { name: "Companions", icon: Users, color: "purple" },
                { name: "Scholars", icon: GraduationCap, color: "purple" },
                { name: "Teachers", icon: Shield, color: "purple" },
                { name: "You", icon: Heart, color: "purple" },
              ].map((node, idx) => {
                const Icon = node.icon;
                const colors = getColorStyles(node.color);
                return (
                  <div key={idx} className="flex items-center">
                    <div className="text-center">
                      <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto mb-1 xs:mb-2`}>
                        <Icon className={`w-4 h-4 xs:w-5 xs:h-5 ${colors.text}`} />
                      </div>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs font-black">{node.name}</span>
                    </div>
                    {/* ✅ Fixed: Hide arrow on mobile */}
                    {idx < 6 && <ArrowRight className="hidden sm:inline w-3 h-3 xs:w-4 xs:h-4 text-muted-foreground" />}
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-5 xs:mt-6">
              <span className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 text-[8px] xs:text-[9px] font-black">
                <Scroll className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                Your voice connects to the Prophet (ﷺ)
              </span>
            </div>
          </div>
        </Reveal>

        {/* 6-Step Process */}
        <div className="mb-16 xs:mb-20">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="text-2xl xs:text-3xl font-black tracking-tighter mb-2">Your Sacred Journey</h2>
            <p className="text-sm xs:text-base text-muted-foreground">Six transformative phases to mastery</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6">
            {METHODOLOGY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === idx;
              
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all overflow-hidden h-full flex flex-col">
                    <div className="p-5 xs:p-6 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shadow-md shrink-0">
                          <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-[8px] xs:text-[9px] font-black text-purple-600">Step {step.step}</span>
                          <h3 className="font-black text-base xs:text-lg">{step.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-xs xs:text-sm text-muted-foreground mb-4">{step.description}</p>
                      
                      <div className="flex items-center justify-between text-[10px] xs:text-xs mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{step.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-purple-600" />
                          <span className="line-clamp-1">{step.milestone}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : idx)}
                        className="text-[10px] xs:text-xs font-black text-purple-600 flex items-center gap-1"
                      >
                        {isExpanded ? "Show less" : "Show details"}
                        <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800 space-y-2 overflow-hidden"
                          >
                            {step.details.map((detail, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px] xs:text-xs">
                                <CheckCircle2 className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-green-500 shrink-0" />
                                <span className="text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Teaching Pillars */}
        <div className="mb-16 xs:mb-20">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="text-2xl xs:text-3xl font-black tracking-tighter mb-2">Our Sacred Pillars</h2>
            <p className="text-sm xs:text-base text-muted-foreground">The foundations of our methodology</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6">
            {TEACHING_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const colors = getColorStyles(pillar.color);
              
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-5 xs:p-6 text-center group h-full">
                    <div className={`w-12 h-12 xs:w-14 xs:h-14 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3 xs:mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 xs:w-7 xs:h-7 ${colors.text}`} />
                    </div>
                    <h3 className="font-black text-base xs:text-lg mb-2">{pillar.title}</h3>
                    <p className="text-xs xs:text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16 xs:mb-20">
          <div className="text-center mb-8 xs:mb-12">
            <h2 className="text-2xl xs:text-3xl font-black tracking-tighter mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">Technology</span> as a Vessel
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground">Modern tools serving an ancient tradition</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6">
            {TECHNOLOGY_FEATURES.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-5 xs:p-6 group h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 xs:w-5.5 xs:h-5.5 text-purple-600" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 text-[7px] xs:text-[8px] font-black">
                        {tech.badge}
                      </span>
                    </div>
                    <h3 className="font-black text-sm xs:text-base mb-1">{tech.title}</h3>
                    <p className="text-xs xs:text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <Reveal>
          <div className="mb-16 xs:mb-20 rounded-xl xs:rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-8 xs:p-10 sm:p-12 text-center">
              <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 mx-auto mb-3 xs:mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-white mb-2 xs:mb-3">Ready to Become a Carrier?</h2>
              <p className="text-white/90 text-sm xs:text-base mb-5 xs:mb-6 max-w-md mx-auto">
                Begin your journey with a complimentary assessment from our Dean.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
                <Link href="/assessment" className="w-full sm:w-auto">
                  <Button className="w-full rounded-full px-5 xs:px-6 py-2.5 xs:py-3 bg-white text-purple-600 hover:bg-gray-100 font-black text-[10px] xs:text-xs sm:text-sm">
                    Start Free Assessment
                    <ArrowRight className="ml-1.5 xs:ml-2 w-3 h-3 xs:w-4 xs:h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-full px-5 xs:px-6 py-2.5 xs:py-3 border-white text-white hover:bg-white/20 font-black text-[10px] xs:text-xs sm:text-sm">
                    Speak to an Advisor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
// import {
//   BookOpen,
//   Scroll,
//   Brain,
//   Users,
//   Sparkles,
//   Award,
//   Target,
//   Clock,
//   CheckCircle2,
//   ArrowRight,
//   GraduationCap,
//   Shield,
//   Globe,
//   Star,
//   FileText,
//   Library,
//   PenTool,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";

// export default function TafsirStudiesPage() {
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
//                 className="hover:text-primary-700 transition-colors"
//               >
//                 Programs
//               </Link>
//               <span className="mx-2">/</span>
//               <span className="text-primary-700 font-medium">
//                 Tafsir Studies
//               </span>
//             </div>

//             {/* Hero Content */}
//             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
//               <div className="lg:w-1/2 space-y-4 sm:space-y-6">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-3.5 h-3.5" /> Classical Exegesis
//                     Certification
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
//                     Tafsir{" "}
//                     <span className="text-primary-700 italic">Al-Mubin</span>
//                     <br />
//                     Studies Program
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
//                     Deep dive into Quranic meanings with classical methodology.
//                     Study authentic Tafsir from primary sources under the
//                     guidance of scholars with Ijazah in classical works.
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                     <Link href="/admissions" className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
//                         <span className="flex items-center justify-center gap-2 sm:gap-3">
//                           BEGIN TAFSIR STUDIES
//                           <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </span>
//                       </Button>
//                     </Link>
//                     <Link href="#curriculum" className="w-full sm:w-auto">
//                       <Button
//                         variant="outline"
//                         className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
//                       >
//                         EXPLORE CURRICULUM
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Visual */}
//               <Reveal delay={0.4} className="lg:w-1/2">
//                 <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
//                   <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
//                     {[
//                       { value: "1.5", label: "Years", icon: Clock },
//                       { value: "1-on-1", label: "Sessions", icon: Users },
//                       { value: "Advanced", label: "Level", icon: Target },
//                       { value: "Classical", label: "Sources", icon: Scroll },
//                     ].map((stat, idx) => (
//                       <div key={idx} className="space-y-1">
//                         <div className="text-2xl sm:text-3xl font-black text-primary-700">
//                           {stat.value}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {stat.label}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
//                     <div className="flex items-center gap-3 mb-2">
//                       <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                       <div className="font-black text-base sm:text-lg uppercase tracking-tight">
//                         Scholarly Mentorship
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Direct guidance from Tafsir specialists with Ijazah in
//                       classical works
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Program Highlights */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Study Classical{" "}
//                   <span className="text-primary-700 italic">Tafsir</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Engage with authentic exegesis works in their original context
//                   and language
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: BookOpen,
//                   title: "Primary Sources",
//                   description:
//                     "Study directly from classical Tafsir manuscripts",
//                 },
//                 {
//                   icon: Brain,
//                   title: "Methodology",
//                   description: "Learn principles of Quranic interpretation",
//                 },
//                 {
//                   icon: Users,
//                   title: "Scholar Guidance",
//                   description: "1-on-1 mentorship with Tafsir specialists",
//                 },
//                 {
//                   icon: Scroll,
//                   title: "Contextual Understanding",
//                   description:
//                     "Historical and linguistic context of revelation",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 text-center hover:border-primary-700/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
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

//       {/* Curriculum Structure */}
//       <section id="curriculum" className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Comprehensive{" "}
//                   <span className="text-primary-700 italic">Curriculum</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   18-month systematic study of classical Tafsir methodology and
//                   works
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-6 sm:space-y-8">
//               {[
//                 {
//                   phase: "Semester 1",
//                   title: "Foundations of Tafsir (6 Months)",
//                   description: "Establish principles of Quranic interpretation",
//                   points: [
//                     "Usul al-Tafsir (principles of exegesis)",
//                     "Asbab al-Nuzul (occasions of revelation)",
//                     "Nasikh wa Mansukh (abrogation)",
//                     "Quranic sciences introduction",
//                   ],
//                 },
//                 {
//                   phase: "Semester 2",
//                   title: "Classical Tafsir Works (6 Months)",
//                   description: "Study major classical Tafsir literature",
//                   points: [
//                     "Tafsir al-Tabari (جامع البيان)",
//                     "Tafsir Ibn Kathir (تفسير القرآن العظيم)",
//                     "Tafsir al-Qurtubi (الجامع لأحكام القرآن)",
//                     "Comparative analysis methodology",
//                   ],
//                 },
//                 {
//                   phase: "Semester 3",
//                   title: "Advanced Studies & Application (6 Months)",
//                   description: "Thematic studies and contemporary application",
//                   points: [
//                     "Thematic Tafsir (التفسير الموضوعي)",
//                     "Contemporary issues in light of Tafsir",
//                     "Research methodology in Tafsir",
//                     "Teaching Tafsir principles",
//                   ],
//                 },
//               ].map((phase, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-primary-700/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-6">
//                       <div className="md:w-48 flex-shrink-0">
//                         <div className="inline-flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-primary-700 text-white flex items-center justify-center text-sm font-black">
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
//                               className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-950/20"
//                             >
//                               <CheckCircle2 className="w-4 h-4 text-primary-700 flex-shrink-0" />
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

//       {/* Classical Works Focus */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Study{" "}
//                   <span className="text-primary-700 italic">Classical</span>{" "}
//                   Tafsir Works
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Engage with the great Tafsir works that have shaped Islamic
//                   scholarship
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
//               {[
//                 {
//                   title: "Tafsir al-Tabari",
//                   author: "Abu Ja'far al-Tabari (d. 310 AH)",
//                   description:
//                     "The foundational comprehensive Tafsir, combining linguistic analysis, historical context, and early narrations.",
//                   focus: "Historical & linguistic analysis",
//                 },
//                 {
//                   title: "Tafsir Ibn Kathir",
//                   author: "Ibn Kathir (d. 774 AH)",
//                   description:
//                     "Hadith-based interpretation focusing on authentic narrations and rejecting weak interpretations.",
//                   focus: "Hadith-based interpretation",
//                 },
//                 {
//                   title: "Tafsir al-Qurtubi",
//                   author: "Al-Qurtubi (d. 671 AH)",
//                   description:
//                     "Comprehensive work focusing on jurisprudential rulings derived from Quranic verses.",
//                   focus: "Jurisprudential insights",
//                 },
//                 {
//                   title: "Tafsir al-Sa'di",
//                   author: "Abd al-Rahman al-Sa'di (d. 1376 AH)",
//                   description:
//                     "Modern classical work focusing on spiritual guidance and practical application.",
//                   focus: "Spiritual & practical guidance",
//                 },
//               ].map((work, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
//                         <Library className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-1">
//                           {work.title}
//                         </h3>
//                         <p className="text-sm text-primary-700 font-medium mb-2">
//                           {work.author}
//                         </p>
//                         <p className="text-sm text-muted-foreground mb-3">
//                           {work.description}
//                         </p>
//                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-700/10">
//                           <span className="text-xs font-black text-primary-700 uppercase">
//                             Focus:
//                           </span>
//                           <span className="text-xs font-medium">
//                             {work.focus}
//                           </span>
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
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Traditional{" "}
//                   <span className="text-primary-700 italic">Methodology</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Learn Tafsir through the traditional scholarly approach with
//                   modern accessibility
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Users,
//                   title: "1-on-1 Scholarly Guidance",
//                   description:
//                     "Personal mentorship from Tafsir specialists who hold Ijazah in classical works. Weekly sessions focusing on close reading and analysis.",
//                 },
//                 {
//                   icon: BookOpen,
//                   title: "Textual Analysis Sessions",
//                   description:
//                     "Detailed study of classical Tafsir texts in their original Arabic. Analysis of methodology, arguments, and scholarly debates.",
//                 },
//                 {
//                   icon: PenTool,
//                   title: "Research & Application",
//                   description:
//                     "Develop research skills in Tafsir studies. Learn to apply classical principles to contemporary questions and produce scholarly work.",
//                 },
//               ].map((item, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 h-full hover:border-primary-700/30 transition-all duration-300">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4">
//                       <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
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

//       {/* Certification & Outcomes */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-primary-700/20">
//                 <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//                   <div>
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-6">
//                       Program{" "}
//                       <span className="text-primary-700 italic">Outcomes</span>
//                     </h2>

//                     <div className="space-y-4">
//                       {[
//                         "Master principles of Quranic interpretation (Usul al-Tafsir)",
//                         "Analyze major classical Tafsir works critically",
//                         "Understand historical context of revelation",
//                         "Apply Tafsir methodology to contemporary issues",
//                         "Read and comprehend classical Tafsir in Arabic",
//                         "Develop scholarly research skills in Tafsir studies",
//                       ].map((outcome, idx) => (
//                         <div key={idx} className="flex items-center gap-3">
//                           <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
//                           <span className="font-medium">{outcome}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-700/10 flex items-center justify-center mb-6">
//                       <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700" />
//                     </div>

//                     <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
//                       Tafsir Studies Certification
//                     </h3>

//                     <p className="text-muted-foreground mb-6">
//                       Upon successful completion, receive a recognized
//                       certification in Classical Tafsir Studies, verifying your
//                       mastery of Quranic interpretation principles and classical
//                       works.
//                     </p>

//                     <div className="space-y-3">
//                       <div className="flex items-center gap-3">
//                         <Shield className="w-5 h-5 text-primary-700" />
//                         <span className="text-sm font-medium">
//                           Ijazah-holding instructors
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <FileText className="w-5 h-5 text-primary-700" />
//                         <span className="text-sm font-medium">
//                           Comprehensive final research paper
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <Star className="w-5 h-5 text-primary-700" />
//                         <span className="text-sm font-medium">
//                           Oral examination on classical texts
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Prerequisites & Requirements */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10">
//                 <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6">
//                   Program{" "}
//                   <span className="text-primary-700 italic">Requirements</span>
//                 </h2>

//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <h3 className="font-black text-lg uppercase tracking-tight text-primary-700">
//                       Prerequisites
//                     </h3>
//                     <ul className="space-y-3">
//                       <li className="flex items-start gap-3">
//                         <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">
//                           Advanced Arabic reading ability
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">
//                           Completion of basic Islamic studies
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <CheckCircle2 className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">
//                           Familiarity with Quranic text
//                         </span>
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="space-y-4">
//                     <h3 className="font-black text-lg uppercase tracking-tight text-primary-700">
//                       Time Commitment
//                     </h3>
//                     <ul className="space-y-3">
//                       <li className="flex items-start gap-3">
//                         <Clock className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">6-8 hours weekly study</span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <BookOpen className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">
//                           Weekly 1-on-1 sessions (90 min)
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <PenTool className="w-4 h-4 text-primary-700 mt-1 flex-shrink-0" />
//                         <span className="text-sm">
//                           Research paper in final semester
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
//                 <Scroll className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-primary-700" />

//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
//                   Understand the{" "}
//                   <span className="text-primary-700 italic">Quran's</span>{" "}
//                   Depths
//                 </h2>

//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
//                   Join serious students of knowledge in mastering classical
//                   Quranic interpretation
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link href="/admissions">
//                     <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px] w-full sm:w-auto">
//                       <span className="flex items-center gap-3">
//                         BEGIN TAFSIR STUDIES
//                         <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </span>
//                     </Button>
//                   </Link>

//                   <Link href="/contact">
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px] w-full sm:w-auto"
//                     >
//                       SCHOLAR CONSULTATION
//                     </Button>
//                   </Link>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-border/50">
//                   <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Advanced Arabic Required
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       1-on-1 Scholarly Mentorship
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Classical Texts Focus
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
//                   Tafsir Studies{" "}
//                   <span className="text-primary-700 italic">Questions</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light">
//                   Common questions about classical Tafsir studies
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "What level of Arabic is required?",
//                   a: "Advanced reading proficiency is required. You should be able to read classical Arabic texts with dictionary assistance. We recommend completing our Arabic Fluency program first or equivalent.",
//                 },
//                 {
//                   q: "Is this program suitable for beginners in Islamic studies?",
//                   a: "This is an advanced program. Students should have basic knowledge of Islamic sciences, Quranic studies, and familiarity with major classical works.",
//                 },
//                 {
//                   q: "What texts will we study?",
//                   a: "Primary focus on Tafsir al-Tabari, Ibn Kathir, and al-Qurtubi. Supplementary study of other classical works and modern academic studies on Tafsir.",
//                 },
//                 {
//                   q: "Is there a research component?",
//                   a: "Yes, the final semester includes a research paper on a Tafsir-related topic under scholarly supervision. This develops academic research skills.",
//                 },
//                 {
//                   q: "Can I teach Tafsir after completing this program?",
//                   a: "While this provides strong foundation, teaching authorization (Ijazah) requires additional study and testing. This program prepares you for advanced Tafsir studies.",
//                 },
//                 {
//                   q: "What's the difference between Tafsir and translation?",
//                   a: "Translation conveys meaning in another language. Tafsir involves interpretation, contextual analysis, linguistic study, and understanding of rulings and wisdom behind verses.",
//                 },
//               ].map((faq, index) => (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
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
//                   Ready to dive deep into Quranic interpretation?
//                 </p>
//                 <Link href="/contact">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 font-black"
//                   >
//                     CONSULT WITH TAFSIR SCHOLAR
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












// app/courses/tafsir/page.tsx
"use client";

import { PricingCalculatorTafsir } from "@/components/public/pricing/pricing-calculator-universal";
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
  GraduationCap,
  Library,
  PenTool,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// Program Data
const PROGRAM_DATA = {
  name: "Tafsir Al-Mubin",
  tagline: "Deep Quranic Understanding",
  description:
    "A comprehensive program to study classical and contemporary Tafsir, enabling you to understand the Quran's meanings, context, and relevance to modern life.",
  audience: "Advanced Learners • Ages 16+",
  duration: "12-18 months",
  sessionsPerWeek: "2-3 sessions",
  sessionDuration: "60-75 minutes",
  format: "1-on-1 or Small Groups",
  level: "Intermediate to Advanced",
  priceRange: "$129",
  pricePeriod: "per month",
};

// Core Pillars of Tafsir
const PILLARS = [
  {
    icon: ScrollText,
    title: "Classical Tafsir",
    description: "Study works of Tabari, Ibn Kathir, Qurtubi, and Sa'di",
    audience: "Foundational",
  },
  {
    icon: Brain,
    title: "Thematic Tafsir",
    description: "Explore Quranic themes and their interconnections",
    audience: "Analytical",
  },
  {
    icon: BookOpen,
    title: "Asbab al-Nuzul",
    description: "Understand revelation context and historical background",
    audience: "Contextual",
  },
  {
    icon: PenTool,
    title: "Linguistic Analysis",
    description: "Deep dive into Arabic grammar and rhetoric",
    audience: "Advanced",
  },
  {
    icon: Shield,
    title: "Contemporary Application",
    description: "Connect Quranic teachings to modern challenges",
    audience: "Practical",
  },
  {
    icon: Crown,
    title: "Research Methodology",
    description: "Develop skills for independent Tafsir research",
    audience: "Scholarly",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-6",
    focus: "Introduction to classical Tafsir works",
    topics: [
      "Introduction to Uloom al-Quran",
      "Tafsir al-Tabari (selected)",
      "Asbab al-Nuzul foundations",
      "Basic linguistic analysis",
    ],
    icon: ScrollText,
  },
  {
    stage: "Intermediate Phase",
    duration: "Months 7-12",
    focus: "Deep study of major Tafsir works",
    topics: [
      "Tafsir Ibn Kathir (complete study)",
      "Thematic Tafsir methodology",
      "Advanced linguistic analysis",
      "Comparative Tafsir",
    ],
    icon: BookOpen,
  },
  {
    stage: "Advanced Phase",
    duration: "Months 13-18",
    focus: "Independent research and application",
    topics: [
      "Contemporary Tafsir issues",
      "Research paper writing",
      "Teaching methodology",
      "Ijazah preparation",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Seekers of Knowledge",
    icon: User,
    pace: "Thorough & Comprehensive",
    duration: "16-18 months",
    features: ["Complete coverage", "Classical texts", "Regular assessments", "Scholarly guidance"],
    color: "from-slate-600 to-gray-700",
  },
  {
    audience: "Advanced Students",
    icon: GraduationCap,
    pace: "Intensive & Scholarly",
    duration: "12-15 months",
    features: ["Research focus", "Primary sources", "Thematic studies", "Teaching prep"],
    color: "from-gray-700 to-slate-800",
  },
  {
    audience: "Educators",
    icon: Users,
    pace: "Practical & Applicable",
    duration: "14-16 months",
    features: ["Teaching methods", "Curriculum design", "Youth engagement", "Community focus"],
    color: "from-slate-700 to-gray-800",
  },
  {
    audience: "Researchers",
    icon: Brain,
    pace: "Academic & Rigorous",
    duration: "15-18 months",
    features: ["Research methodology", "Academic writing", "Source analysis", "Publication prep"],
    color: "from-gray-800 to-slate-900",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Dr. Ahmed, 45",
    type: "Tafsir Graduate",
    story: "The program transformed my understanding of the Quran. I can now approach Tafsir with confidence and share its beauty with others.",
    duration: "16 months",
    icon: User,
  },
  {
    name: "Fatima, 38",
    type: "Islamic Studies Teacher",
    story: "Studying Tafsir with Al-Maysaroh gave me the tools to teach Quranic meanings effectively. The scholars are truly inspiring.",
    duration: "14 months",
    icon: GraduationCap,
  },
  {
    name: "Omar, 52",
    type: "Imam",
    story: "The depth of classical Tafsir study has enriched my khutbahs and community teaching. Highly recommended for anyone serious about Quranic understanding.",
    duration: "18 months",
    icon: Crown,
  },
  {
    name: "Aisha, 29",
    type: "Researcher",
    story: "The research methodology module was exceptional. I'm now working on a thematic Tafsir paper with guidance from my teacher.",
    duration: "15 months",
    icon: Brain,
  },
];

// FAQ
const FAQS = [
  { q: "What is the prerequisite for this program?", a: "Basic Arabic reading ability and familiarity with Quranic concepts. Prior Islamic studies background is helpful but not required." },
  { q: "Which Tafsir works will I study?", a: "You'll study selected portions of Tafsir al-Tabari, complete Tafsir Ibn Kathir, selected portions of Tafsir al-Qurtubi, and Tafsir al-Sa'di." },
  { q: "Do I need to know Arabic?", a: "Basic Arabic reading is recommended. For advanced linguistic analysis, we provide support for non-Arabic speakers with translated materials." },
  { q: "Can I get an Ijazah?", a: "Yes! Advanced students can pursue Ijazah in Tafsir upon successful completion of the program and final examination." },
  { q: "How much time should I dedicate weekly?", a: "We recommend 4-6 hours weekly for study, reading, and assignments." },
  { q: "Is there a research component?", a: "Yes, advanced students complete a research paper on a chosen Tafsir topic with scholarly guidance." },
];

export default function TafsirProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Scholarly Slate/Navy Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-700/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-slate-500/10 to-gray-500/10 border border-slate-500/20 text-slate-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 📚 Deep Quranic Understanding 📚
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Tafsir{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 whitespace-nowrap">
                Al-Mubin
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Dive deep into Quranic meanings through classical and contemporary Tafsir. Understand the divine message in its proper context and apply it to modern life.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    BEGIN YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-slate-600 text-slate-600">
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Tafsir Works", value: "4+", icon: ScrollText },
                { label: "Classical Sources", value: "10+", icon: Library },
                { label: "Scholarly Graduates", value: "80+", icon: Award },
                { label: "Research Papers", value: "50+", icon: PenTool },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-950/20 dark:to-gray-950/20 border border-slate-100 dark:border-slate-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-slate-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-slate-50/5 to-gray-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <ScrollText className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Science of Tafsir
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master Every <span className="text-slate-600 italic">Aspect</span> of Tafsir
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Comprehensive coverage of classical and contemporary Tafsir methodology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-slate-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-slate-600 font-black mt-1">{pillar.audience}</p>
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
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-slate-600 italic">Tailored to Your Goals</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different aspirations - all leading to deep Quranic understanding
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-slate-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-gradient-to-b from-background via-slate-50/5 to-gray-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-slate-600 italic">Curriculum</span> for Deep Understanding
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 12-18 month journey to Tafsir mastery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-500 via-gray-500 to-slate-600" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-slate-600 to-gray-700 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-slate-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-900/30 text-slate-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 text-slate-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-slate-100 dark:bg-slate-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-slate-600 to-gray-700 rounded-full"
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
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-slate-600 italic">Pricing</span> That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen duration, frequency, and learning intensity
            </p>
          </div>

          <PricingCalculatorTafsir dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on scholar assignment and your specific requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-slate-50/5 to-gray-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Transformation
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-slate-600 italic">Scholars</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who deepened their understanding with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-slate-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-slate-200 dark:text-slate-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">"{story.story}"</p>
                    <p className="text-[10px] sm:text-xs text-slate-600 font-black mt-3">✓ Completed in {story.duration}</p>
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
            <div className="inline-flex items-center gap-2 text-slate-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-slate-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-slate-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-slate-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-slate-600/5 to-gray-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 mb-4 sm:mb-6 shadow-lg">
              <ScrollText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Deepen Your Understanding of the Quran</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Study Tafsir with expert scholars. Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-slate-600 text-slate-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 20-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📚 Study classical Tafsir</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🎓 Ijazah certification path</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
// import {
//   BookOpen,
//   Users,
//   Clock,
//   Target,
//   Award,
//   Star,
//   Sparkles,
//   Calendar,
//   CheckCircle2,
//   ArrowRight,
//   Volume2,
//   Mic,
//   TrendingUp,
//   Crown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";

// export default function QiroahProgramPage() {
//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 bg-background overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 space-y-8 sm:space-y-10">
//             {/* Breadcrumb */}
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Link
//                 href="/courses"
//                 className="hover:text-primary-700 transition-colors"
//               >
//                 Programs
//               </Link>
//               <span>/</span>
//               <span className="text-primary-700 font-medium">
//                {` Qiro'ah Program`}
//               </span>
//             </div>

//             {/* Hero Content */}
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//               <div className="space-y-6 sm:space-y-8">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.2em]">
//                     <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Quran Reading
//                     Mastery
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85]">
//                    {` Qiro'ah `}
//                     <span className="text-primary-700 italic">Al-Quran</span>
//                     <br />
//                     Program
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
//                     Learn to read the Quran fluently and correctly with proper
//                     pronunciation. Perfect for beginners, those needing to
//                     improve their reading, or anyone wanting to strengthen their
//                     Quran recitation skills.
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-wrap gap-3 pt-2">
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Users className="w-3.5 h-3.5" />
//                       Group or 1-on-1
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Clock className="w-3.5 h-3.5" />
//                       Flexible Schedule
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Target className="w-3.5 h-3.5" />
//                       All Levels Welcome
//                     </div>
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.4}>
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
//                       <Button
//                         variant="outline"
//                         className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto"
//                       >
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
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">
//                           All
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">
//                           Age Groups
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">
//                           Flex
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">
//                           Schedule
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">
//                           8-12
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">
//                           Months
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="text-3xl sm:text-4xl font-black text-primary-700">
//                           Fluency
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium text-muted-foreground">
//                           Guaranteed
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10">
//                       <div className="flex items-center gap-4 mb-3">
//                         <Volume2 className="w-8 h-8 text-primary-700" />
//                         <div className="font-black text-lg uppercase tracking-tight">
//                           Correct Pronunciation
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         Master Makharij and Sifaat for beautiful, accurate
//                         recitation
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
//                   The{" "}
//                   <span className="text-primary-700 italic">Al-Maysaroh</span>{" "}
//                   Difference
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                 {`  Why our Qiro'ah program is the ideal choice for Quran reading
//                   mastery`}
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Mic,
//                   title: "Correct Pronunciation",
//                   description:
//                     "Master Makharij (articulation points) from day one",
//                 },
//                 {
//                   icon: Users,
//                   title: "Flexible Format",
//                   description:
//                     "Choose between group classes or 1-on-1 instruction",
//                 },
//                 {
//                   icon: Target,
//                   title: "Personalized Pace",
//                   description:
//                     "Progress at your own speed with customized plans",
//                 },
//                 {
//                   icon: Award,
//                   title: "Progressive Levels",
//                   description: "From beginner to fluent reader, step by step",
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

//       {/* Who Is This For? */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Who Is This{" "}
//                   <span className="text-primary-700 italic">For?</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   {`Our Qiro'ah program welcomes students from all backgrounds and
//                   levels`}
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Star,
//                   title: "Complete Beginners",
//                   description:
//                     "No prior Arabic or Quran reading experience needed. Start from the very basics.",
//                 },
//                 {
//                   icon: TrendingUp,
//                   title: "Intermediate Readers",
//                   description:
//                     "Already know some letters? Build fluency and correct common mistakes.",
//                 },
//                 {
//                   icon: Crown,
//                   title: "Advanced Reciters",
//                   description:
//                     "Perfect your pronunciation, learn rules, and achieve beautiful recitation.",
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

//       {/* Curriculum Structure */}
//       <section
//         id="curriculum"
//         className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5"
//       >
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Structured{" "}
//                   <span className="text-primary-700 italic">Curriculum</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   A clear pathway from beginner to confident Quran reader
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-6 sm:space-y-8">
//               {[
//                 {
//                   level: "1",
//                   title: "Foundations (2-3 Months)",
//                   description: "Master the Arabic alphabet and basic reading",
//                   points: [
//                     "Arabic alphabet recognition (all 28 letters)",
//                     "Letter pronunciation (Makharij)",
//                     "Short vowels (Fatha, Kasra, Damma)",
//                     "Connecting letters to form words",
//                   ],
//                 },
//                 {
//                   level: "2",
//                   title: "Building Fluency (3-4 Months)",
//                   description: "Develop reading speed and accuracy",
//                   points: [
//                     "Long vowels (Madd)",
//                     "Sukoon (silence) and Shadda (emphasis)",
//                     "Basic Tajweed rules",
//                     "Reading short Surahs",
//                   ],
//                 },
//                 {
//                   level: "3",
//                   title: "Fluent Reading (3-4 Months)",
//                   description: "Read Quran with confidence and proper rhythm",
//                   points: [
//                     "Fluent Quranic reading",
//                     "Advanced Tajweed application",
//                     "Common mistake correction",
//                     "Beautiful recitation practice",
//                   ],
//                 },
//               ].map((level, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-6 sm:p-8 md:p-10 hover:border-primary-700/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-6">
//                       <div className="md:w-56 shrink-0">
//                         <div className="inline-flex items-center gap-3 mb-3">
//                           <div className="w-10 h-10 rounded-lg bg-primary-700 text-white p-4 flex items-center justify-center text-sm font-black">
//                             {level.level}
//                           </div>
//                           <div className="font-black text-lg uppercase tracking-tight">
//                             {level.title}
//                           </div>
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           {level.description}
//                         </p>
//                       </div>

//                       <div className="flex-1">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           {level.points.map((point, idx) => (
//                             <div
//                               key={idx}
//                               className="flex items-center gap-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-950/20"
//                             >
//                               <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
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

//       {/* Teaching Methodology */}
//       <section className="py-12 sm:py-16 md:py-24">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Our{" "}
//                   <span className="text-primary-700 italic">
//                     Teaching Approach
//                   </span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   A proven methodology that ensures steady progress and lasting
//                   results
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   icon: Mic,
//                   title: "Live Pronunciation Practice",
//                   description:
//                     "Real-time correction from qualified instructors who listen to every word you recite.",
//                 },
//                 {
//                   icon: Users,
//                   title: "Interactive Learning",
//                   description:
//                     "Engaging lessons with audio examples, visual aids, and plenty of practice opportunities.",
//                 },
//                 {
//                   icon: Calendar,
//                   title: "Flexible Scheduling",
//                   description:
//                     "Choose class times that fit your routine. Weekly sessions with recorded reviews.",
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

//       {/* Program Options */}
//       <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Choose Your{" "}
//                   <span className="text-primary-700 italic">Learning Path</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
//                   Flexible options to match your learning preferences
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
//               {/* Group Classes */}
//               <Reveal delay={0.1}>
//                 <div className="institutional-card p-8 hover:border-primary-700/30 transition-all duration-300 h-full">
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="w-14 h-14 rounded-xl bg-primary-700/10 flex items-center justify-center">
//                       <Users className="w-7 h-7 text-primary-700" />
//                     </div>
//                     <h3 className="text-2xl font-black uppercase tracking-tight">
//                       Group Classes
//                     </h3>
//                   </div>
//                   <div className="space-y-4 mb-8">
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Class Size</span>
//                       <span className="font-black">4-10 students</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Duration</span>
//                       <span className="font-black">30-60 minutes</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Frequency</span>
//                       <span className="font-black">2-4x per week</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Monthly</span>
//                       <span className="font-black text-primary-700 text-xl">
//                         $6
//                       </span>
//                     </div>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Peer learning environment
//                     </li>
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Group practice sessions
//                     </li>
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Motivational community
//                     </li>
//                   </ul>
//                   <Link href="/courses/group-qiroah">
//                     <Button className="w-full rounded-full font-black">
//                       SELECT GROUP
//                     </Button>
//                   </Link>
//                 </div>
//               </Reveal>

//               {/* Private 1-on-1 */}
//               <Reveal delay={0.2}>
//                 <div className="institutional-card p-8 border-2 border-primary-700/30 hover:border-primary-700/50 transition-all duration-300 h-full relative">
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-700 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
//                     RECOMMENDED
//                   </div>
//                   <div className="flex items-center gap-4 mb-6 mt-4">
//                     <div className="w-14 h-14 rounded-xl bg-primary-700/10 flex items-center justify-center">
//                       <Star className="w-7 h-7 text-primary-700" />
//                     </div>
//                     <h3 className="text-2xl font-black uppercase tracking-tight">
//                       Private 1-on-1
//                     </h3>
//                   </div>
//                   <div className="space-y-4 mb-8">
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Focus</span>
//                       <span className="font-black">Complete attention</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Duration</span>
//                       <span className="font-black">30-60 minutes</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Frequency</span>
//                       <span className="font-black">Flexible</span>
//                     </div>
//                     <div className="flex justify-between items-center border-b border-border/50 pb-2">
//                       <span className="text-muted-foreground">Monthly</span>
//                       <span className="font-black text-primary-700 text-xl">
//                         $2+
//                       </span>
//                     </div>
//                   </div>
//                   <ul className="space-y-3 mb-8">
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Personalized curriculum
//                     </li>
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Flexible scheduling
//                     </li>
//                     <li className="flex items-center gap-3 text-sm">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Faster progress
//                     </li>
//                   </ul>
//                   <Link href="/admissions">
//                     <Button className="w-full rounded-full font-black bg-primary-700 hover:bg-primary-800">
//                       SELECT PRIVATE
//                     </Button>
//                   </Link>
//                 </div>
//               </Reveal>
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
//                   Begin Your{" "}
//                   <span className="text-primary-700 italic">Quran Reading</span>{" "}
//                   Journey
//                 </h2>

//                 <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
//                   Join students who have transformed their Quran recitation
//                   through our proven program
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

//                   <Link href="/assessment">
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11 w-full sm:w-auto"
//                     >
//                       FREE ASSESSMENT
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
//                       Flexible Payment Plans
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                       Satisfaction Guaranteed
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
//                   Frequently Asked{" "}
//                   <span className="text-primary-700 italic">Questions</span>
//                 </h2>
//                 <p className="text-lg sm:text-xl text-muted-foreground font-light">
//                   {`Everything you need to know about our Qiro'ah program`}
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "I have absolutely no Arabic knowledge. Can I join?",
//                   a: "Absolutely! Our Level 1 curriculum is designed specifically for complete beginners. We start from the Arabic alphabet and build your reading skills step by step.",
//                 },
//                 {
//                   q: "How long will it take to read the Quran fluently?",
//                   a: "Most students achieve fluent Quran reading within 4-6 months with consistent practice. However, progress depends on your dedication and practice time.",
//                 },
//                 {
//                   q: "What's the difference between Qiro'ah and Tajweed?",
//                   a: "Qiro'ah focuses on learning to read the Quran correctly, while Tajweed is the advanced science of perfecting every letter's pronunciation. Our Qiro'ah program includes basic Tajweed rules needed for correct reading.",
//                 },
//                 {
//                   q: "Can I switch between group and private classes?",
//                   a: "Yes! You can change your learning format at any time. Many students start with group classes and switch to private for advanced levels.",
//                 },
//                 {
//                   q: "What technology do I need?",
//                   a: "A computer, tablet, or smartphone with internet connection and a microphone. We use Google Meet/Zoom for live sessions and provide access to our learning portal.",
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
//                  {` Still have questions about our Qiro'ah program?`}
//                 </p>
//                 <Link href="/contact">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 font-black"
//                   >
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









// app/courses/qiroah/page.tsx
"use client";

import { PricingCalculatorQiroah } from "@/components/public/pricing/pricing-calculator-universal";
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
  Mic,
  Quote,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  User,
  Users,
  Volume2,
  Headphones,
  Gem,
  MessageCircle,
  Eye,
  Heart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";


// Program Data
const PROGRAM_DATA = {
  name: "Qiro'ah Program",
  tagline: "Learn to Read the Quran with Confidence",
  description:
    "A personalized program to help you read the Quran fluently and correctly. Perfect for beginners, reverts, and anyone who wants to improve their Quranic reading skills.",
  audience: "All Ages • Absolute Beginners Welcome",
  duration: "6-12 months",
  sessionsPerWeek: "1-3 sessions",
  sessionDuration: "45-60 minutes",
  format: "1-on-1 Private Sessions",
  level: "Beginner to Intermediate",
  priceRange: "$89",
  pricePeriod: "per month",
};

// Core Pillars of Qiro'ah
const PILLARS = [
  {
    icon: Eye,
    title: "Letter Recognition",
    description: "Master Arabic alphabet and proper pronunciation",
    audience: "Foundation",
  },
  {
    icon: Mic,
    title: "Makharij",
    description: "Correct articulation points of every letter",
    audience: "Core Skill",
  },
  {
    icon: Volume2,
    title: "Fluency Practice",
    description: "Develop smooth and confident reading",
    audience: "Application",
  },
  {
    icon: Headphones,
    title: "Audio Support",
    description: "High-quality recitations for practice",
    audience: "Technology",
  },
  {
    icon: Heart,
    title: "Patient Instruction",
    description: "Learn at your own pace with encouragement",
    audience: "Support",
  },
  {
    icon: Award,
    title: "Progress Tracking",
    description: "Celebrate every milestone along your journey",
    audience: "Motivation",
  },
];

// Learning Journey
const LEARNING_JOURNEY = [
  {
    stage: "Foundation Phase",
    duration: "Months 1-3",
    focus: "Master Arabic letters and basic reading",
    topics: [
      "Arabic alphabet recognition",
      "Letter sounds and pronunciation",
      "Short vowels (Fatha, Kasra, Damma)",
      "Basic word formation",
    ],
    icon: Eye,
  },
  {
    stage: "Building Phase",
    duration: "Months 4-7",
    focus: "Develop reading fluency",
    topics: [
      "Long vowels (Madd)",
      "Sukoon and Shadda",
      "Connecting letters",
      "Simple sentence reading",
    ],
    icon: Volume2,
  },
  {
    stage: "Fluency Phase",
    duration: "Months 8-12",
    focus: "Read Quran confidently",
    topics: [
      "Full Quranic reading",
      "Basic Tajweed rules",
      "Speed and accuracy",
      "Independent reading practice",
    ],
    icon: Crown,
  },
];

// Journey Paths
const JOURNEY_PATHS = [
  {
    audience: "Absolute Beginners",
    icon: User,
    pace: "Gentle & Supportive",
    duration: "10-12 months",
    features: ["Start from zero", "Patient instruction", "Regular practice", "Confidence building"],
    color: "from-teal-500 to-emerald-500",
  },
  {
    audience: "Reverts/Converts",
    icon: Heart,
    pace: "Compassionate & Encouraging",
    duration: "8-10 months",
    features: ["Supportive environment", "Islamic context", "Practical focus", "Community connection"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    audience: "Refresher Learners",
    icon: TrendingUp,
    pace: "Focused & Efficient",
    duration: "6-8 months",
    features: ["Assessment first", "Targeted correction", "Fluency focus", "Rapid progress"],
    color: "from-teal-600 to-emerald-600",
  },
  {
    audience: "Children (7+)",
    icon: Users,
    pace: "Engaging & Fun",
    duration: "8-10 months",
    features: ["Fun activities", "Reward system", "Parent updates", "Patient teachers"],
    color: "from-emerald-600 to-teal-600",
  },
];

// Success Stories
const SUCCESS_STORIES = [
  {
    name: "Sarah, 34",
    type: "Revert",
    story: "I never thought I could learn to read Arabic. My teacher was so patient and encouraging. Now I can read Quran during my prayers!",
    duration: "9 months",
    icon: Heart,
  },
  {
    name: "Ahmed, 28",
    type: "Working Professional",
    story: "The flexible schedule allowed me to learn around my work. I've gone from zero to reading fluently in less than a year.",
    duration: "10 months",
    icon: Briefcase,
  },
  {
    name: "Amina, 9",
    type: "Young Learner",
    story: "I love my Quran classes! My teacher makes learning fun with games. Now I can read to my parents.",
    duration: "8 months",
    icon: User,
  },
  {
    name: "Yusuf, 45",
    type: "Refresher Learner",
    story: "I learned to read as a child but forgot. The program helped me regain fluency quickly. Highly recommended!",
    duration: "7 months",
    icon: TrendingUp,
  },
];

// FAQ
const FAQS = [
  { q: "Do I need any prior knowledge?", a: "No! This program is designed for absolute beginners. We start from the alphabet and build gradually." },
  { q: "How much time should I practice daily?", a: "We recommend 10-15 minutes of daily practice. Consistency matters more than quantity." },
  { q: "What if I have difficulty pronouncing letters?", a: "Our teachers are experienced in helping students with pronunciation challenges. We use proven techniques to make learning easier." },
  { q: "Can I learn at my own pace?", a: "Yes! Every student has a personalized learning plan. You can accelerate or take more time based on your needs." },
  { q: "What technology do I need?", a: "A computer or tablet with a microphone and camera. No special software required." },
  { q: "Is there a free trial?", a: "Yes! We offer a free 20-minute assessment session to experience our teaching style." },
];

export default function QiroahProgramPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Warm Teal/Emerald Theme */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 text-teal-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" /> 📖 Learn to Read the Quran 📖
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Qiro'ah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 whitespace-nowrap">
                Program
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Learn to read the Quran with confidence. A personalized program for absolute beginners, reverts, and anyone wanting to improve their Quranic reading.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm sm:text-base shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    START YOUR JOURNEY
                    <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-teal-600 text-teal-600">
                  EXPLORE THE PATH
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Letters", value: "28", icon: Eye },
                { label: "Reading Fluency", value: "95%", icon: Volume2 },
                { label: "Success Rate", value: "97%", icon: Target },
                { label: "Happy Students", value: "400+", icon: Users },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-100 dark:border-teal-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-teal-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Pillars Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-emerald-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> The Path to Reading
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Master <span className="text-teal-600 italic">Quran Reading</span> Step by Step
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A structured approach to help you read the Quran with confidence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-teal-300 transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-sm sm:text-base mb-0.5 sm:mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{pillar.description}</p>
                      <p className="text-[10px] sm:text-xs text-teal-600 font-black mt-1">{pillar.audience}</p>
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              A Journey <span className="text-teal-600 italic">Tailored to You</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Different paths for different learners - all leading to confident Quran reading
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {JOURNEY_PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 text-center h-full group">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-0.5 sm:mb-1">{path.audience}</h3>
                    <p className="text-xs sm:text-sm text-teal-600 font-black mb-1.5 sm:mb-2">{path.pace}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{path.duration}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section id="journey" className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-emerald-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Path to Fluency
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Structured <span className="text-teal-600 italic">Learning</span> for Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A systematic 6-12 month journey to confident Quran reading
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-emerald-500 to-teal-600" />
              <div className="space-y-6 sm:space-y-8">
                {LEARNING_JOURNEY.map((phase, idx) => {
                  const Icon = phase.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <div className="relative md:pl-16">
                        <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                          {idx + 1}
                        </div>
                        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 md:p-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-64">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center">
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                                </div>
                                <h3 className="font-black text-lg sm:text-xl">{phase.stage}</h3>
                              </div>
                              <div className="inline-flex px-2 py-0.5 sm:py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 text-[8px] sm:text-[10px] font-black">
                                {phase.duration}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{phase.focus}</p>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2">
                                {phase.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 text-teal-700 text-[10px] sm:text-xs font-black">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {topic}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-full bg-teal-100 dark:bg-teal-900/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${(idx + 1) * 33}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Gem className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Calculate Your Tuition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="text-teal-600 italic">Pricing</span> That Fits You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Your price depends on your chosen duration, frequency, and learning pace
            </p>
          </div>

          <PricingCalculatorQiroah dbPlans={[]} />

          <p className="text-xs text-center text-muted-foreground mt-4">
            *Final price may vary based on teacher assignment and your specific requirements
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background via-teal-50/5 to-emerald-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Stories of Success
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              From Our <span className="text-teal-600 italic">Students</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Those who learned to read the Quran with us
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SUCCESS_STORIES.map((story, i) => {
              const Icon = story.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base truncate">{story.name}</h4>
                        <p className="text-[10px] sm:text-xs text-teal-600 font-black">{story.type}</p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200 dark:text-teal-800/30 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-muted-foreground italic grow leading-relaxed break-words">"{story.story}"</p>
                    <p className="text-[10px] sm:text-xs text-teal-600 font-black mt-3">✓ Completed in {story.duration}</p>
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
            <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="text-teal-600 italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
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
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-teal-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-teal-600/5 to-emerald-600/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 mb-4 sm:mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2">Start Your Quran Reading Journey Today</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Learn to read the Quran with confidence. Start with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-teal-600 text-teal-600">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">✨ Free 20-minute assessment</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">📖 Learn at your own pace</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">🎓 Certificate upon completion</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
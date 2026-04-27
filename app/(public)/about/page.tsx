

// // app/about/page.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Award,
//   Brain,
//   Crown,
//   Globe,
//   GraduationCap,
//   Heart,
//   Quote,
//   Rocket,
//   ScrollText,
//   Shield,
//   Sparkles,
//   Star,
//   Target,
//   Trophy,
//   Users,
//   Compass,
//   Gem,
//   Eye,
//   Lightbulb,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";

// // Institute Data
// const INSTITUTE = {
//   name: "Al-Maysaroh International Institute",
//   founded: 2018,
//   founder: "Shaykh Abubakar Al-Maysariy",
//   tagline: "Preserving the Word of Allah",
//   description:
//     "A sanctuary of sacred knowledge dedicated to preserving the authentic transmission of the Quran through an unbroken chain of scholarship spanning 1400 years.",
//   mission: "To produce carriers of the Quran who embody its character in every facet of life, while preserving the Sanad for future generations.",
//   vision: "To become the world's most trusted institution for authentic Quranic education, producing scholars who carry the light of revelation to every corner of the globe.",
// };

// // Core Values - Updated with Purple + Gold theme
// const VALUES = [
//   {
//     title: "Ikhlas",
//     arabic: "الإخلاص",
//     meaning: "Sincerity",
//     description: "Teaching purely for the sake of Allah, seeking His pleasure alone.",
//     icon: Heart,
//     gradient: "from-purple-600 to-purple-700",
//     bgLight: "bg-purple-100 dark:bg-purple-950/40",
//   },
//   {
//     title: "Itqan",
//     arabic: "الإتقان",
//     meaning: "Excellence",
//     description: "Pursuing perfection in every recitation, every rule, every transmission.",
//     icon: Target,
//     gradient: "from-amber-500 to-amber-600",
//     bgLight: "bg-amber-100 dark:bg-amber-950/40",
//   },
//   {
//     title: "Amanah",
//     arabic: "الأمانة",
//     meaning: "Trust",
//     description: "A sacred responsibility to preserve and transmit the Quran exactly as revealed.",
//     icon: Shield,
//     gradient: "from-purple-600 to-amber-500",
//     bgLight: "bg-purple-100 dark:bg-purple-950/40",
//   },
// ];

// // Timeline
// const TIMELINE = [
//   { year: "2018", event: "Institute Founded", description: "Al-Maysaroh began with 5 students in a small virtual classroom", icon: Star },
//   { year: "2019", event: "First Ijazah Granted", description: "First student completed full Hifz with Sanad certification", icon: Crown },
//   { year: "2020", event: "Global Expansion", description: "Reached students across 10+ countries worldwide", icon: Globe },
//   { year: "2021", event: "Scholarly Council Formed", description: "Assembled 8 senior scholars with complete Ijazah", icon: Users },
//   { year: "2022", event: "500 Students Milestone", description: "Celebrated 500 active students globally", icon: Trophy },
//   { year: "2023", event: "Children's Programs Launch", description: "Introduced Group Qiro'ah and Juz Amma for young learners", icon: Heart },
//   { year: "2024", event: "Ijazah Program Expansion", description: "Added advanced Ijazah tracks in Qira'at", icon: Award },
//   { year: "2025", event: "Global Recognition", description: "Recognized by international scholarly councils", icon: Gem },
// ];

// // The Sanad Chain
// const SANAD_CHAIN = [
//   { generation: 1, name: "Prophet Muhammad (ﷺ)", era: "7th Century", location: "Madinah", isProphet: true },
//   { generation: 2, name: "Imam Ali ibn Abi Talib", era: "7th Century", location: "Kufa" },
//   { generation: 3, name: "Imam Abu Aswad al-Du'ali", era: "7th Century", location: "Basra" },
//   { generation: 4, name: "Imam Yahya ibn Ya'mar", era: "8th Century", location: "Basra" },
//   { generation: 5, name: "Imam al-Khalil ibn Ahmad", era: "8th Century", location: "Basra" },
//   { generation: 6, name: "Imam Sibawayh", era: "8th Century", location: "Basra" },
//   { generation: 7, name: "Imam al-Ashma'uni", era: "9th Century", location: "Egypt" },
//   { generation: 8, name: "Imam Ibn Mujahid", era: "10th Century", location: "Baghdad" },
//   { generation: 9, name: "Imam al-Dani", era: "11th Century", location: "Andalusia" },
//   { generation: 10, name: "Imam al-Shatibi", era: "12th Century", location: "Andalusia" },
//   { generation: 11, name: "Imam Ibn al-Jazari", era: "14th Century", location: "Damascus" },
//   { generation: 12, name: "Shaykh al-Misri", era: "19th Century", location: "Egypt" },
//   { generation: 13, name: "Shaykh al-Haddad", era: "20th Century", location: "Makkah" },
//   { generation: 14, name: "Shaykh Abubakar Al-Maysariy", era: "21st Century", location: "Global", current: true },
// ];

// // Stats - Updated colors
// const STATS = [
//   { value: "100+", label: "Active Students", icon: Users, desc: "Growing community", color: "purple" },
//   { value: "6+", label: "Countries", icon: Globe, desc: "Global reach", color: "amber" },
//   { value: "8+", label: "Certified Scholars", icon: GraduationCap, desc: "Ijazah-holders", color: "purple" },
//   { value: "1400+", label: "Years of Sanad", icon: ScrollText, desc: "Unbroken chain", color: "amber" },
// ];

// // Testimonials
// const TESTIMONIALS = [
//   {
//     name: "Dr. Ahmed El-Tayyib",
//     role: "Al-Azhar Scholar",
//     content: "Al-Maysaroh represents the highest standard of Quranic education. Their commitment to authentic Sanad is exemplary.",
//     rating: 5,
//     image: "أ",
//   },
//   {
//     name: "Prof. Fatima Mernissi",
//     role: "Islamic Studies Scholar",
//     content: "A beacon of authentic Islamic education in the digital age. The scholarly rigor is unmatched.",
//     rating: 5,
//     image: "ف",
//   },
//   {
//     name: "Shaykh Abdullah bin Hamid",
//     role: "Senior Scholar, Makkah",
//     content: "I have reviewed their methodology. It preserves the sacred tradition while embracing modern pedagogy.",
//     rating: 5,
//     image: "ع",
//   },
// ];

// // Learning Phases
// const LEARNING_PHASES = [
//   {
//     lvl: "Phase 01: Foundation",
//     items: [
//       "Qaida Noorania Mastery",
//       "Basic Makharij Alignment",
//       "Juz Amma Recitation",
//     ],
//   },
//   {
//     lvl: "Phase 02: Intermediate",
//     items: [
//       "Full Tajweed Science",
//       "Juz Amma & Tabarak Hifz",
//       "Introduction to Sarf",
//     ],
//   },
//   {
//     lvl: "Phase 03: Ijazah Track",
//     items: [
//       "Full Quran Hifz",
//       "Mutashabihat Mastery",
//       "Sanad Certification",
//     ],
//   },
// ];

// // Pillars data
// const PILLARS = [
//   { icon: ScrollText, title: "Authentic Sanad", desc: "Unbroken chain to Prophet Muhammad (ﷺ)", color: "purple" },
//   { icon: Users, title: "1-on-1 Instruction", desc: "Personalized attention from certified scholars", color: "amber" },
//   { icon: Brain, title: "Proven Methodology", desc: "Structured approach for lasting retention", color: "purple" },
//   { icon: Globe, title: "Global Accessibility", desc: "Learn from anywhere, at your pace", color: "amber" },
// ];

// const getColorStyles = (color: string) => {
//   const styles = {
//     purple: {
//       text: "text-purple-600 dark:text-purple-400",
//       border: "border-purple-200 dark:border-purple-800",
//       bg: "bg-purple-100 dark:bg-purple-950/40",
//       gradient: "from-purple-600 to-purple-700",
//       light: "bg-purple-50/30 dark:bg-purple-950/20",
//     },
//     amber: {
//       text: "text-amber-600 dark:text-amber-400",
//       border: "border-amber-200 dark:border-amber-800",
//       bg: "bg-amber-100 dark:bg-amber-950/40",
//       gradient: "from-amber-500 to-amber-600",
//       light: "bg-amber-50/30 dark:bg-amber-950/20",
//     },
//   };
//   return styles[color as keyof typeof styles] || styles.purple;
// };

// export default function AboutPage() {
//   return (
//     <main className="relative bg-background overflow-hidden">
//       {/* Premium Background Effects - Updated colors */}
//       <div className="hidden sm:block fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
//           style={{ backgroundSize: "300px" }}
//         />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
//       </div>

//       {/* Breadcrumb */}
//       <div className="container font-semibold mx-auto px-4 xs:px-5 sm:px-6 pt-16 xs:pt-20 sm:pt-24 md:pt-28 lg:pt-32">
//         <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
//           <Link href="/" className="hover:text-purple-600 transition-colors">
//             Home
//           </Link>
//           <span className="opacity-30">/</span>
//           <span className="text-purple-600">About Us</span>
//         </nav>
//       </div>

//       {/* Hero Section - Fixed Colors */}
//       <div className="relative pb-12 xs:pb-16 sm:pb-20">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="max-w-5xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-10 xs:gap-12 lg:gap-16 xl:gap-24 items-center">
//               <Reveal>
//                 <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
//                   <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500" />{" "}
//                     Established 2018 • Preserving the Sanad
//                   </div>

//                   <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
//                     Preserving the{" "}
//                     <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
//                       Word
//                     </span>
//                     <br />
//                     of Allah
//                   </h1>

//                   <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
//                     Al-Maysaroh International Institute is a sanctuary of sacred
//                     knowledge, dedicated to preserving the authentic
//                     transmission of the Quran through an unbroken chain of
//                     scholarship.
//                   </p>

//                   {/* Mission & Legacy Cards */}
//                   <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 pt-2 xs:pt-3 sm:pt-4">
//                     <div className="group p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
//                       <h4 className="font-black uppercase text-[9px] xs:text-[10px] tracking-[0.2em] text-purple-600 mb-2 xs:mb-3">
//                         Our Mission
//                       </h4>
//                       <p className="text-xs xs:text-sm text-muted-foreground font-bold leading-relaxed">
//                         To produce Huffadh who embody the Quranic character in
//                         every facet of life.
//                       </p>
//                     </div>
//                     <div className="group p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-amber-200 dark:border-amber-800 hover:border-amber-300 transition-all">
//                       <h4 className="font-black uppercase text-[9px] xs:text-[10px] tracking-[0.2em] text-amber-600 mb-2 xs:mb-3">
//                         Our Legacy
//                       </h4>
//                       <p className="text-xs xs:text-sm text-muted-foreground font-bold leading-relaxed">
//                         Preserving a Sanad (Chain) that has remained unbroken
//                         for 1,400 years.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>

//               {/* Quote Card */}
//               <Reveal delay={0.2}>
//                 <div className="relative aspect-square">
//                   <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl sm:rounded-[4rem] rotate-3 -z-10" />
//                   <div className="relative h-full bg-card rounded-3xl sm:rounded-[4rem] border border-purple-200 dark:border-purple-800 shadow-xl flex items-center justify-center p-6 xs:p-8 sm:p-10 md:p-12 overflow-hidden">
//                     <div className="quran-monumental opacity-5 absolute scale-125 rotate-12 pointer-events-none select-none text-4xl sm:text-6xl whitespace-nowrap">
//                       بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
//                     </div>
//                     <div className="text-center space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 relative z-10">
//                       <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-amber-100 dark:bg-amber-950/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
//                         <Lightbulb className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-amber-500" />
//                       </div>
//                       <p className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-heading italic text-balance leading-tight">
//                        {` "A generation that carries the Word, and lives its Light."`}
//                       </p>
//                       <div className="h-px w-10 xs:w-12 bg-amber-500/50 mx-auto" />
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mt-10 xs:mt-12 sm:mt-16">
//               <Link href="/admissions" className="w-full xs:w-auto">
//                 <Button className="w-full rounded-full px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm sm:text-base shadow-xl">
//                   <span className="flex items-center justify-center gap-2">
//                     BEGIN YOUR JOURNEY
//                     <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   </span>
//                 </Button>
//               </Link>
//               <Link href="/assessment" className="w-full xs:w-auto">
//                 <Button
//                   variant="outline"
//                   className="w-full rounded-full px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 font-black text-sm sm:text-base border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
//                 >
//                   FREE ASSESSMENT
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <section className="py-8 xs:py-10 sm:py-12 border-y border-border/50 bg-muted/20">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 text-center">
//             {STATS.map((stat, i) => {
//               const Icon = stat.icon;
//               const colors = getColorStyles(stat.color);
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
//                     <Icon className={`w-4 h-4 xs:w-5 xs:h-5 ${colors.text} mx-auto opacity-60`} />
//                     <div className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black ${colors.text}`}>
//                       {stat.value}
//                     </div>
//                     <div className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] xs:tracking-[0.2em] text-muted-foreground">
//                       {stat.label}
//                     </div>
//                     <div className="text-[7px] xs:text-[8px] text-muted-foreground/50">
//                       {stat.desc}
//                     </div>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Founder's Story */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center">
//             <Reveal>
//               <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
//                 <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
//                   <Crown className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Our Founder
//                 </div>
//                 <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
//                   The Vision Behind{" "}
//                   <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Al-Maysaroh</span>
//                 </h2>
//                 <div className="flex items-center gap-3 xs:gap-4">
//                   <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-xl xs:text-2xl sm:text-3xl font-black shadow-lg shrink-0">
//                     أ
//                   </div>
//                   <div>
//                     <h3 className="font-black text-sm xs:text-base sm:text-lg md:text-xl">
//                       Shaykh Abubakar Al-Maysariy
//                     </h3>
//                     <p className="text-purple-600 font-black text-xs sm:text-sm">
//                       Founder & Chief Scholar
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
//                   Born in Makkah and raised in the sacred precincts of Islamic
//                   scholarship, Shaykh Abubakar dedicated his life to preserving
//                   the authentic transmission of the Quran. He studied under
//                   senior scholars from Al-Azhar, Umm Al-Qura, and the Moroccan
//                   Qira'at schools.
//                 </p>
//                 <div className="p-4 xs:p-5 sm:p-6 rounded-xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 italic">
//                   <Quote className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-amber-500/30 mb-2" />
//                   <p className="text-xs xs:text-sm sm:text-base md:text-lg font-medium">
//                     "The Quran is not just a book to be read; it is a living
//                     tradition to be transmitted, heart to heart, generation to
//                     generation."
//                   </p>
//                   <p className="text-[10px] xs:text-xs sm:text-sm text-purple-600 font-black mt-2 xs:mt-3">
//                     — Shaykh Abubakar Al-Maysariy
//                   </p>
//                 </div>
//               </div>
//             </Reveal>

//             <Reveal delay={0.2}>
//               <div className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-5 xs:p-6 sm:p-7 md:p-8 space-y-4 xs:space-y-5 sm:space-y-6">
//                 <div className="flex items-center gap-2 xs:gap-3">
//                   <Target className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-600" />
//                   <h3 className="font-black text-sm xs:text-base sm:text-lg">
//                     Our Mission
//                   </h3>
//                 </div>
//                 <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
//                   {INSTITUTE.mission}
//                 </p>
//                 <div className="h-px bg-border/50" />
//                 <div className="flex items-center gap-2 xs:gap-3">
//                   <Eye className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-amber-500" />
//                   <h3 className="font-black text-sm xs:text-base sm:text-lg">
//                     Our Vision
//                   </h3>
//                 </div>
//                 <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
//                   {INSTITUTE.vision}
//                 </p>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Core Values */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12">
//             <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 xs:mb-4">
//               <Heart className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Our Foundation
//             </div>
//             <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 xs:mb-4 px-2">
//               Core <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Values</span>
//             </h2>
//             <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground px-4">
//               The principles that guide every aspect of our institute
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
//             {VALUES.map((value, i) => {
//               const Icon = value.icon;
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group">
//                     <div
//                       className={`w-14 h-14 xs:w-16 xs:h-16 mx-auto mb-3 xs:mb-4 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className="w-7 h-7 xs:w-8 xs:h-8 text-white" />
//                     </div>
//                     <h3 className="font-black text-lg xs:text-xl mb-0.5 xs:mb-1">
//                       {value.title}
//                     </h3>
//                     <p className="text-xs xs:text-sm text-purple-600 font-black mb-1 xs:mb-2">
//                       {value.arabic}
//                     </p>
//                     <p className="text-xs xs:text-sm text-muted-foreground">
//                       {value.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* The 4 Pillars / Methodology */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12">
//             <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 xs:mb-4">
//               <Compass className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Our Approach
//             </div>
//             <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 xs:mb-4 px-2">
//               The <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Al-Maysaroh</span> Method
//             </h2>
//             <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground px-4">
//               A unique blend of traditional scholarship and modern pedagogy
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 max-w-5xl mx-auto">
//             {PILLARS.map((item, i) => {
//               const Icon = item.icon;
//               const colors = getColorStyles(item.color);
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center p-5 xs:p-6 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group h-full">
//                     <div
//                       className={`w-12 h-12 xs:w-14 xs:h-14 mx-auto mb-3 xs:mb-4 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
//                     >
//                       <Icon className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
//                     </div>
//                     <h3 className="font-black text-sm xs:text-base mb-1 xs:mb-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs xs:text-sm text-muted-foreground">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* The Sanad Chain */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12">
//             <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 xs:mb-4">
//               <ScrollText className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Our Heritage
//             </div>
//             <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 xs:mb-4 px-2">
//               The Unbroken{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Sanad</span>
//             </h2>
//             <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground px-4">
//               Our chain of transmission connects directly to Prophet Muhammad
//               (ﷺ) through 14 generations of verified scholars
//             </p>
//           </div>

//           <div className="relative max-w-5xl mx-auto">
//             <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-amber-500 to-purple-600 -translate-x-1/2" />
//             <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8">
//               {SANAD_CHAIN.map((scholar, idx) => (
//                 <Reveal key={idx} delay={Math.min(idx * 0.02, 0.3)}>
//                   <div
//                     className={`flex flex-col md:flex-row items-center gap-3 xs:gap-4 sm:gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
//                   >
//                     <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
//                       <p className="text-[9px] xs:text-[10px] sm:text-xs text-purple-600 font-black">
//                         {scholar.era}
//                       </p>
//                       <p className="font-black text-sm xs:text-base sm:text-lg break-words">
//                         {scholar.name}
//                       </p>
//                       <p className="text-xs xs:text-sm text-muted-foreground">
//                         {scholar.location}
//                       </p>
//                     </div>
//                     <div className="relative z-10 shrink-0">
//                       <div
//                         className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black shadow-lg text-xs xs:text-sm sm:text-base transition-all ${
//                           scholar.current 
//                             ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white ring-4 ring-purple-600/20" 
//                             : scholar.isProphet 
//                             ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white" 
//                             : "bg-muted text-muted-foreground"
//                         }`}
//                       >
//                         {scholar.generation}
//                       </div>
//                     </div>
//                     <div className="flex-1 hidden md:block" />
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>

//           <div className="text-center mt-8 xs:mt-10 sm:mt-12 md:mt-16">
//             <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-full bg-amber-100 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
//               <Shield className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-amber-600" />
//               <span className="text-[8px] xs:text-[9px] sm:text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
//                 Verified by International Scholarly Council
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Learning Journey */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="relative bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 overflow-hidden p-5 xs:p-6 sm:p-8 md:p-10 lg:p-12">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-amber-500 to-purple-600" />

//             <div className="max-w-3xl mb-6 xs:mb-8 sm:mb-10 md:mb-12">
//               <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 xs:mb-3 sm:mb-4 leading-tight">
//                 Your Journey <br />
//                 <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">to Ijazah</span>
//               </h2>
//               <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-muted-foreground font-medium">
//                 A structured path from beginner to verified carrier of the Quran.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
//               {LEARNING_PHASES.map((phase, i) => (
//                 <Reveal key={phase.lvl} delay={i * 0.1}>
//                   <div className="space-y-3 xs:space-y-4 sm:space-y-5 bg-card/50 p-5 xs:p-6 rounded-xl border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all group">
//                     <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">
//                       0{i + 1}
//                     </div>
//                     <div>
//                       <h4 className="text-sm xs:text-base sm:text-lg font-black uppercase tracking-tight mb-2 xs:mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors">
//                         {phase.lvl}
//                       </h4>
//                       <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
//                         {phase.items.map((item) => (
//                           <li
//                             key={item}
//                             className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm font-bold text-muted-foreground"
//                           >
//                             <ChevronRight className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-amber-500 shrink-0" />
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Scholarly Recognition */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12">
//             <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 xs:mb-4">
//               <Award className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Scholarly Recognition
//             </div>
//             <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 xs:mb-4 px-2">
//               Endorsed by{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Leading</span> Scholars
//             </h2>
//             <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground px-4">
//               Recognized by prestigious Islamic institutions worldwide
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 max-w-4xl mx-auto">
//             {TESTIMONIALS.map((testimonial, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="bg-card rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-4 xs:p-5 sm:p-6 h-full flex flex-col">
//                   <Quote className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-purple-200 dark:text-purple-800/30 mb-2 xs:mb-3" />
//                   <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground italic mb-3 xs:mb-4 flex-1 leading-relaxed">
//                     "{testimonial.content}"
//                   </p>
//                   <div className="flex items-center gap-2 xs:gap-3 pt-2 xs:pt-3 border-t border-purple-200 dark:border-purple-800">
//                     <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-black text-xs sm:text-sm">
//                       {testimonial.image}
//                     </div>
//                     <div className="min-w-0">
//                       <h4 className="font-black text-[10px] xs:text-xs sm:text-sm truncate">
//                         {testimonial.name}
//                       </h4>
//                       <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-purple-600 font-black truncate">
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

//       {/* Final CTA */}
//       <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600/5 to-amber-500/5">
//             <div className="inline-flex items-center justify-center w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 mb-4 xs:mb-5 sm:mb-6 shadow-xl">
//               <Rocket className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 text-white" />
//             </div>
//             <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black mb-2 xs:mb-3 sm:mb-4 px-2">
//               Become Part of Our Legacy
//             </h2>
//             <p className="text-sm xs:text-base text-muted-foreground mb-5 xs:mb-6 sm:mb-8 max-w-md mx-auto px-4">
//               Join a community dedicated to preserving and transmitting the Word
//               of Allah. Begin your journey with a free, no-obligation assessment.
//             </p>
//             <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center px-4">
//               <Link href="/admissions" className="w-full xs:w-auto">
//                 <Button className="w-full rounded-full px-5 xs:px-6 sm:px-8 py-3 sm:py-3.5 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm sm:text-base">
//                   START YOUR JOURNEY
//                   <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 xs:ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/contact" className="w-full xs:w-auto">
//                 <Button
//                   variant="outline"
//                   className="w-full rounded-full px-5 xs:px-6 sm:px-8 py-3 sm:py-3.5 font-black text-sm sm:text-base border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
//                 >
//                   CONTACT US
//                 </Button>
//               </Link>
//             </div>
//             <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground mt-4 xs:mt-5 sm:mt-6">
//               Free 20-minute assessment • No commitment • All ages welcome
//             </p>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .quran-monumental {
//           font-family: "Amiri", "Scheherazade", "Lateef", "Noto Naskh Arabic", serif;
//         }
//       `}</style>
//     </main>
//   );
// }









// app/about/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  Brain,
  Crown,
  Globe,
  GraduationCap,
  Heart,
  Quote,
  Rocket,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Compass,

  Eye,
  Lightbulb,

  BookOpen,
  Monitor,
  Wifi,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// Institute Data
const INSTITUTE = {
  name: "Al-Maysaroh Institute",
  founded: 2018,
  founder: "Shaykh Abubakar Al-Maysariy",
  tagline: "Preserving the Word of Allah",
  description:
    "A sanctuary of sacred knowledge dedicated to preserving the authentic transmission of the Quran through an unbroken chain of scholarship spanning 1400 years.",
  mission: "To produce carriers of the Quran who embody its character in every facet of life, while preserving the Sanad for future generations.",
  vision: "To become the world's most trusted institution for authentic Quranic education, producing scholars who carry the light of revelation to every corner of the globe.",
};

// Core Values
const VALUES = [
  {
    title: "Ikhlas",
    arabic: "الإخلاص",
    meaning: "Sincerity",
    description: "Teaching purely for the sake of Allah, seeking His pleasure alone.",
    icon: Heart,
    gradient: "from-purple-600 to-purple-700",
  },
  {
    title: "Itqan",
    arabic: "الإتقان",
    meaning: "Excellence",
    description: "Pursuing perfection in every recitation, every rule, every transmission.",
    icon: Target,
    gradient: "from-amber-500 to-amber-600",
  },
  {
    title: "Amanah",
    arabic: "الأمانة",
    meaning: "Trust",
    description: "A sacred responsibility to preserve and transmit the Quran exactly as revealed.",
    icon: Shield,
    gradient: "from-purple-600 to-amber-500",
  },
];

// Timeline
const TIMELINE = [
  { year: "2018", event: "Institute Founded", description: "Al-Maysaroh began with 5 students in a small virtual classroom", icon: Star },
  { year: "2020", event: "First Ijazah Granted", description: "First student completed full Hifz", icon: Crown },
  { year: "2020", event: "Global Expansion", description: "Reached students across 2 countries worldwide", icon: Globe },
  // { year: "2021", event: "Scholarly Council Formed", description: "Assembled 8 senior scholars with complete Ijazah", icon: Users },
  { year: "2022", event: "50 Students Milestone", description: "Celebrated 500 active students globally", icon: Trophy },
  { year: "2023", event: "Children's Programs Launch", description: "Introduced Group Qiro'ah and Juz Amma for young learners", icon: Heart },
  { year: "2025", event: "More Programs and Ijazah Program Expansion", description: "Added advanced Ijazah tracks in Qira'at", icon: Award },
  // { year: "2025", event: "Global Recognition", description: "Recognized by international scholarly councils", icon: Gem },
];



// Stats
const STATS = [
  { value: "100+", label: "Active Students", icon: Users, desc: "Growing community", color: "purple" },
  { value: "6+", label: "Countries", icon: Globe, desc: "Global reach", color: "amber" },
  { value: "8+", label: "Certified Scholars", icon: GraduationCap, desc: "Ijazah-holders", color: "purple" },
  { value: "1400+", label: "Years of Sanad", icon: ScrollText, desc: "Unbroken chain", color: "amber" },
];

// Testimonials
const TESTIMONIALS = [
  {
    name: "Dr. Ahmed El-Tayyib",
    role: "Al-Azhar Scholar",
    content: "Al-Maysaroh represents the highest standard of Quranic education. Their commitment to authentic Sanad is exemplary.",
    image: "أ",
  },
  {
    name: "Prof. Fatima Mernissi",
    role: "Islamic Studies Scholar",
    content: "A beacon of authentic Islamic education in the digital age. The scholarly rigor is unmatched.",
    image: "ف",
  },
  {
    name: "Shaykh Abdullah bin Hamid",
    role: "Senior Scholar, Makkah",
    content: "I have reviewed their methodology. It preserves the sacred tradition while embracing modern pedagogy.",
    image: "ع",
  },
];

// Learning Phases
const LEARNING_PHASES = [
  {
    lvl: "Phase 01: Foundation",
    items: ["Qaida Nuur-ul-bayaan Mastery", "Basic Makharij Alignment", "Juz Amma Recitation"],
  },
  {
    lvl: "Phase 02: Intermediate",
    items: ["Basic Tajweed Science", "Juz Amma & Tabarak Hifz", "Memorization Techniques" ],
  },
  {
    lvl: "Phase 03: Ijazah Track",
    items: ["Full Quran Hifz", "Mutashabihat Mastery", "Sanad Certification"],
  },
];

// Pillars data
const PILLARS = [
  { icon: ScrollText, title: "Authentic Sanad", desc: "Unbroken chain to Prophet Muhammad (ﷺ)", color: "purple" },
  { icon: Users, title: "1-on-1 Instruction", desc: "Personalized attention from certified scholars", color: "amber" },
  { icon: Brain, title: "Proven Methodology", desc: "Structured approach for lasting retention", color: "purple" },
  { icon: Globe, title: "Global Accessibility", desc: "Learn from anywhere, at your pace", color: "amber" },
];

// SECTION 4: Leadership Team
const LEADERSHIP_TEAM = [
  { name: "Shaykh Abubakar Al-Maysariy", role: "Founder & Chief Scholar", credentials: "Ijazah in 10 Qira'at", image: "أ", bio: "Over 13 years of teaching experience, trained over 100 certified Qurra worldwide." },

  { name: "Ustadh Shu'ayb Abdullah", role: "Head of Hifz Department", credentials: "Ijazah in Hafs 'an 'Asim", image: "ي", bio: "Has guided over 100 students to complete memorization." },
  { name: "Ustadhah Fatimah Alagbada", role: "Head of Female Education", credentials: "Ijazah in Tajweed", image: "م", bio: "Dedicated to creating a nurturing environment for female students." },
];



// SECTION 7: Virtual Campus Features
const VIRTUAL_CAMPUS_FEATURES = [
  { icon: Monitor, title: "Live 1-on-1 Sessions", description: "Real-time interaction with certified scholars" },
  { icon: BookOpen, title: "Progress Dashboard", description: "Track every surah, ayah, and tajweed rule" },
  { icon: Clock, title: "Recording Library", description: "Review past sessions anytime, anywhere" },
  { icon: Users, title: "Parent Portal", description: "Monitor your child's progress and attendance" },
  { icon: Wifi, title: "24/7 Access", description: "Learn from anywhere, on any device" },
  { icon: CheckCircle2, title: "Assessment Tracking", description: "Automatic grading and feedback" },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export default function AboutPage() {
  return (
    <main className="relative bg-background overflow-hidden">
      {/* Premium Background Effects */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 pt-30 sm:pt-24 md:pt-28 lg:pt-32">
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600">About Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative pb-12 sm:pb-16">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Reveal>
                <div className="space-y-6 sm:space-y-8">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500" /> Established 2018 • Preserving the Sanad
                  </div>
                  <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                    Preserving the{" "}
                    <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">Word</span>
                    <br />of Allah
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                    Al-Maysaroh International Institute is a sanctuary of sacred knowledge,
                    dedicated to preserving the authentic transmission of the Quran.
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 pt-4">
                    <div className="group p-5 rounded-2xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-purple-600 mb-2">Our Mission</h4>
                      <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                        To produce Huffadh who embody the Quranic character in every facet of life.
                      </p>
                    </div>
                    <div className="group p-5 rounded-2xl bg-card border border-amber-200 dark:border-amber-800 hover:border-amber-300 transition-all">
                      <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-amber-600 mb-2">Our Legacy</h4>
                      <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                        Preserving a Sanad that has remained unbroken for 1,400 years.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="relative aspect-square">
                  <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl sm:rounded-[4rem] rotate-3 -z-10" />
                  <div className="relative h-full bg-card rounded-3xl sm:rounded-[4rem] border border-purple-200 dark:border-purple-800 shadow-xl flex items-center justify-center p-8 sm:p-12 overflow-hidden">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Lightbulb className="w-10 h-10 text-amber-500" />
                      </div>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-heading italic leading-tight">
                      {`  "A generation that carries the Word, and lives its Light."`}
                      </p>
                      <div className="h-px w-12 bg-amber-500/50 mx-auto" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col xs:flex-row gap-4 justify-center mt-12 sm:mt-16">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-xl">
                  BEGIN YOUR JOURNEY <Rocket className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-4 font-black border-amber-500 text-amber-600">FREE ASSESSMENT</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              const colors = getColorStyles(stat.color);
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="space-y-1">
                    <Icon className={`w-5 h-5 ${colors.text} mx-auto opacity-60`} />
                    <div className={`text-2xl sm:text-3xl font-black ${colors.text}`}>{stat.value}</div>
                    <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                    <div className="text-[8px] text-muted-foreground/50">{stat.desc}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="inline-flex items-center gap-1.5 xs:gap-2 text-purple-600 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  <Crown className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Our Founder
                </div>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                  The Vision Behind{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Al-Maysaroh</span>
                </h2>
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-xl xs:text-2xl sm:text-3xl font-black shadow-lg shrink-0">
                    أ
                  </div>
                  <div>
                    <h3 className="font-black text-sm xs:text-base sm:text-lg md:text-xl">
                      Shaykh Abubakar Al-Maysariy
                    </h3>
                    <p className="text-purple-600 font-black text-xs sm:text-sm">
                      Founder & Chief Scholar
                    </p>
                  </div>
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Born in Makkah and raised in the sacred precincts of Islamic
                  scholarship, Shaykh Abubakar dedicated his life to preserving
                  the authentic transmission of the Quran. He studied under
                  senior scholars from Al-Azhar, Umm Al-Qura, and the Moroccan
                  Qira'at schools.
                </p>
                <div className="p-4 xs:p-5 sm:p-6 rounded-xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 italic">
                  <Quote className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-amber-500/30 mb-2" />
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg font-medium">
                    "The Quran is not just a book to be read; it is a living
                    tradition to be transmitted, heart to heart, generation to
                    generation."
                  </p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-purple-600 font-black mt-2 xs:mt-3">
                    — Shaykh Abubakar Al-Maysariy
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-card rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all p-5 xs:p-6 sm:p-7 md:p-8 space-y-4 xs:space-y-5 sm:space-y-6">
                <div className="flex items-center gap-2 xs:gap-3">
                  <Target className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <h3 className="font-black text-sm xs:text-base sm:text-lg">
                    Our Mission
                  </h3>
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {INSTITUTE.mission}
                </p>
                <div className="h-px bg-border/50" />
                <div className="flex items-center gap-2 xs:gap-3">
                  <Eye className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-amber-500" />
                  <h3 className="font-black text-sm xs:text-base sm:text-lg">
                    Our Vision
                  </h3>
                </div>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {INSTITUTE.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: Leadership Team */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
              <Users className="w-3.5 h-3.5" /> Our Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
              Guiding the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Vision</span>
            </h2>
            <p className="text-muted-foreground">Meet the scholars and administrators leading Al-Maysaroh</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {LEADERSHIP_TEAM.map((leader, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-lg group-hover:scale-110 transition-transform">
                    {leader.image}
                  </div>
                  <h3 className="font-black text-lg mb-1">{leader.name}</h3>
                  <p className="text-purple-600 font-black text-xs uppercase mb-2">{leader.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{leader.credentials}</p>
                  <p className="text-[10px] text-muted-foreground/70">{leader.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
              <Heart className="w-3.5 h-3.5" /> Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
              Core <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-8 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-black text-xl mb-1">{value.title}</h3>
                    <p className="text-sm text-purple-600 font-black mb-2">{value.arabic}</p>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
              <Compass className="w-3.5 h-3.5" /> Our Approach
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
              The <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Al-Maysaroh</span> Method
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {PILLARS.map((item, i) => {
              const Icon = item.icon;
              const colors = getColorStyles(item.color);
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-6 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-black text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Accreditations & Certifications */}
      {/* <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
              <Award className="w-3.5 h-3.5" /> Recognized Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
              Accreditations &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Certifications</span>
            </h2>
            <p className="text-muted-foreground">Recognized by prestigious Islamic institutions worldwide</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {ACCREDITATIONS.map((accred, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-5 rounded-xl bg-card border border-purple-200 dark:border-purple-800 text-center hover:border-purple-300 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
                    <span className="font-black text-lg text-purple-600">{accred.logo}</span>
                  </div>
                  <p className="font-black text-xs uppercase tracking-wider">{accred.name}</p>
                  <p className="text-[9px] text-purple-600 font-black mt-1">Since {accred.year}</p>
                  <p className="text-[8px] text-muted-foreground mt-2">{accred.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-[10px] font-black uppercase tracking-wider">Fully Accredited & Verified</span>
            </div>
          </div>
        </div>
      </section> */}

   

      {/* SECTION 7: Virtual Campus */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="space-y-5">
                <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
                  <Globe className="w-3.5 h-3.5" /> Digital Sanctuary
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                  Our{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Virtual</span> Campus
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A proprietary digital platform designed for focused Quranic study. Track every surah, ayah, and tajweed rule with precision.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {VIRTUAL_CAMPUS_FEATURES.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-medium">{feature.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-purple-600/10 to-amber-500/10 rounded-2xl p-8 text-center border border-purple-200 dark:border-purple-800">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 mb-5">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-black text-2xl mb-3">24/7 Access</h3>
                <p className="text-muted-foreground mb-6">
                  Learn from anywhere, at any time. Our platform is accessible from desktop, tablet, or mobile devices.
                </p>
                <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-600" /> Desktop</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Tablet</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-600" /> Mobile</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

 
      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="bg-card rounded-2xl border border-purple-200 p-8 sm:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600/5 to-amber-500/5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 mb-6 shadow-xl">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Become Part of Our Legacy</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join a community dedicated to preserving and transmitting the Word of Allah.
              Begin your journey with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col xs:flex-row gap-4 justify-center">
              <Link href="/admissions" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  START YOUR JOURNEY <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-8 py-4 font-black border-amber-500 text-amber-600">CONTACT US</Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-6">Free 20-minute assessment • No commitment • All ages welcome</p>
          </div>
        </div>
      </section>
    </main>
  );
}
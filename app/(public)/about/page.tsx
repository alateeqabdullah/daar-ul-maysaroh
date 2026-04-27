


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

//   Eye,
//   Lightbulb,

//   BookOpen,
//   Monitor,
//   Wifi,
//   Clock,
//   CheckCircle2,
// } from "lucide-react";
// import Link from "next/link";

// // Institute Data
// const INSTITUTE = {
//   name: "Al-Maysaroh Institute",
//   founded: 2018,
//   founder: "Shaykh Abubakar Al-Maysariy",
//   tagline: "Preserving the Word of Allah",
//   description:
//     "A sanctuary of sacred knowledge dedicated to preserving the authentic transmission of the Quran through an unbroken chain of scholarship spanning 1400 years.",
//   mission: "To produce carriers of the Quran who embody its character in every facet of life, while preserving the Sanad for future generations.",
//   vision: "To become the world's most trusted institution for authentic Quranic education, producing scholars who carry the light of revelation to every corner of the globe.",
// };

// // Core Values
// const VALUES = [
//   {
//     title: "Ikhlas",
//     arabic: "الإخلاص",
//     meaning: "Sincerity",
//     description: "Teaching purely for the sake of Allah, seeking His pleasure alone.",
//     icon: Heart,
//     gradient: "from-purple-600 to-purple-700",
//   },
//   {
//     title: "Itqan",
//     arabic: "الإتقان",
//     meaning: "Excellence",
//     description: "Pursuing perfection in every recitation, every rule, every transmission.",
//     icon: Target,
//     gradient: "from-amber-500 to-amber-600",
//   },
//   {
//     title: "Amanah",
//     arabic: "الأمانة",
//     meaning: "Trust",
//     description: "A sacred responsibility to preserve and transmit the Quran exactly as revealed.",
//     icon: Shield,
//     gradient: "from-purple-600 to-amber-500",
//   },
// ];

// // Timeline
// const TIMELINE = [
//   { year: "2018", event: "Institute Founded", description: "Al-Maysaroh began with 5 students in a small virtual classroom", icon: Star },
//   { year: "2020", event: "First Ijazah Granted", description: "First student completed full Hifz", icon: Crown },
//   { year: "2020", event: "Global Expansion", description: "Reached students across 2 countries worldwide", icon: Globe },
//   // { year: "2021", event: "Scholarly Council Formed", description: "Assembled 8 senior scholars with complete Ijazah", icon: Users },
//   { year: "2022", event: "50 Students Milestone", description: "Celebrated 500 active students globally", icon: Trophy },
//   { year: "2023", event: "Children's Programs Launch", description: "Introduced Group Qiro'ah and Juz Amma for young learners", icon: Heart },
//   { year: "2025", event: "More Programs and Ijazah Program Expansion", description: "Added advanced Ijazah tracks in Qira'at", icon: Award },
//   // { year: "2025", event: "Global Recognition", description: "Recognized by international scholarly councils", icon: Gem },
// ];



// // Stats
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
//     image: "أ",
//   },
//   {
//     name: "Prof. Fatima Mernissi",
//     role: "Islamic Studies Scholar",
//     content: "A beacon of authentic Islamic education in the digital age. The scholarly rigor is unmatched.",
//     image: "ف",
//   },
//   {
//     name: "Shaykh Abdullah bin Hamid",
//     role: "Senior Scholar, Makkah",
//     content: "I have reviewed their methodology. It preserves the sacred tradition while embracing modern pedagogy.",
//     image: "ع",
//   },
// ];

// // Learning Phases
// const LEARNING_PHASES = [
//   {
//     lvl: "Phase 01: Foundation",
//     items: ["Qaida Nuur-ul-bayaan Mastery", "Basic Makharij Alignment", "Juz Amma Recitation"],
//   },
//   {
//     lvl: "Phase 02: Intermediate",
//     items: ["Basic Tajweed Science", "Juz Amma & Tabarak Hifz", "Memorization Techniques" ],
//   },
//   {
//     lvl: "Phase 03: Ijazah Track",
//     items: ["Full Quran Hifz", "Mutashabihat Mastery", "Sanad Certification"],
//   },
// ];

// // Pillars data
// const PILLARS = [
//   { icon: ScrollText, title: "Authentic Sanad", desc: "Unbroken chain to Prophet Muhammad (ﷺ)", color: "purple" },
//   { icon: Users, title: "1-on-1 Instruction", desc: "Personalized attention from certified scholars", color: "amber" },
//   { icon: Brain, title: "Proven Methodology", desc: "Structured approach for lasting retention", color: "purple" },
//   { icon: Globe, title: "Global Accessibility", desc: "Learn from anywhere, at your pace", color: "amber" },
// ];

// // SECTION 4: Leadership Team
// const LEADERSHIP_TEAM = [
//   { name: "Shaykh Abubakar Al-Maysariy", role: "Founder & Chief Scholar", credentials: "Ijazah in 10 Qira'at", image: "أ", bio: "Over 13 years of teaching experience, trained over 100 certified Qurra worldwide." },

//   { name: "Ustadh Shu'ayb Abdullah", role: "Head of Hifz Department", credentials: "Ijazah in Hafs 'an 'Asim", image: "ي", bio: "Has guided over 100 students to complete memorization." },
//   { name: "Ustadhah Fatimah Alagbada", role: "Head of Female Education", credentials: "Ijazah in Tajweed", image: "م", bio: "Dedicated to creating a nurturing environment for female students." },
// ];



// // SECTION 7: Virtual Campus Features
// const VIRTUAL_CAMPUS_FEATURES = [
//   { icon: Monitor, title: "Live 1-on-1 Sessions", description: "Real-time interaction with certified scholars" },
//   { icon: BookOpen, title: "Progress Dashboard", description: "Track every surah, ayah, and tajweed rule" },
//   { icon: Clock, title: "Recording Library", description: "Review past sessions anytime, anywhere" },
//   { icon: Users, title: "Parent Portal", description: "Monitor your child's progress and attendance" },
//   { icon: Wifi, title: "24/7 Access", description: "Learn from anywhere, on any device" },
//   { icon: CheckCircle2, title: "Assessment Tracking", description: "Automatic grading and feedback" },
// ];

// const getColorStyles = (color: string) => {
//   const styles = {
//     purple: {
//       text: "text-purple-600 dark:text-purple-400",
//       border: "border-purple-200 dark:border-purple-800",
//       bg: "bg-purple-100 dark:bg-purple-950/40",
//       gradient: "from-purple-600 to-purple-700",
//     },
//     amber: {
//       text: "text-amber-600 dark:text-amber-400",
//       border: "border-amber-200 dark:border-amber-800",
//       bg: "bg-amber-100 dark:bg-amber-950/40",
//       gradient: "from-amber-500 to-amber-600",
//     },
//   };
//   return styles[color as keyof typeof styles] || styles.purple;
// };

// export default function AboutPage() {
//   return (
//     <main className="relative bg-background overflow-hidden">
//       {/* Premium Background Effects */}
//       <div className="hidden sm:block fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
//       </div>

//       {/* Breadcrumb */}
//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 pt-30 sm:pt-24 md:pt-28 lg:pt-32">
//         <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
//           <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
//           <span className="opacity-30">/</span>
//           <span className="text-purple-600">About Us</span>
//         </nav>
//       </div>

//       {/* Hero Section */}
//       <div className="relative pb-12 sm:pb-16">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="max-w-5xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//               <Reveal>
//                 <div className="space-y-6 sm:space-y-8">
//                   <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500" /> Established 2018 • Preserving the Sanad
//                   </div>
//                   <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
//                     Preserving the{" "}
//                     <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">Word</span>
//                     <br />of Allah
//                   </h1>
//                   <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
//                     Al-Maysaroh International Institute is a sanctuary of sacred knowledge,
//                     dedicated to preserving the authentic transmission of the Quran.
//                   </p>
//                   <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 pt-4">
//                     <div className="group p-5 rounded-2xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
//                       <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-purple-600 mb-2">Our Mission</h4>
//                       <p className="text-sm text-muted-foreground font-bold leading-relaxed">
//                         To produce Huffadh who embody the Quranic character in every facet of life.
//                       </p>
//                     </div>
//                     <div className="group p-5 rounded-2xl bg-card border border-amber-200 dark:border-amber-800 hover:border-amber-300 transition-all">
//                       <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-amber-600 mb-2">Our Legacy</h4>
//                       <p className="text-sm text-muted-foreground font-bold leading-relaxed">
//                         Preserving a Sanad that has remained unbroken for 1,400 years.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>

//               <Reveal delay={0.2}>
//                 <div className="relative aspect-square">
//                   <div className="absolute inset-0 border-2 border-amber-500/20 rounded-3xl sm:rounded-[4rem] rotate-3 -z-10" />
//                   <div className="relative h-full bg-card rounded-3xl sm:rounded-[4rem] border border-purple-200 dark:border-purple-800 shadow-xl flex items-center justify-center p-8 sm:p-12 overflow-hidden">
//                     <div className="text-center space-y-6">
//                       <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
//                         <Lightbulb className="w-10 h-10 text-amber-500" />
//                       </div>
//                       <p className="text-2xl sm:text-3xl lg:text-4xl font-heading italic leading-tight">
//                       {`  "A generation that carries the Word, and lives its Light."`}
//                       </p>
//                       <div className="h-px w-12 bg-amber-500/50 mx-auto" />
//                     </div>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>

//             <div className="flex flex-col xs:flex-row gap-4 justify-center mt-12 sm:mt-16">
//               <Link href="/admissions" className="w-full xs:w-auto">
//                 <Button className="w-full rounded-full px-6 sm:px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-xl">
//                   BEGIN YOUR JOURNEY <Rocket className="w-4 h-4 ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/assessment" className="w-full xs:w-auto">
//                 <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-4 font-black border-amber-500 text-amber-600">FREE ASSESSMENT</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <section className="py-8 sm:py-12 border-y border-border/50 bg-muted/20">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
//             {STATS.map((stat, i) => {
//               const Icon = stat.icon;
//               const colors = getColorStyles(stat.color);
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="space-y-1">
//                     <Icon className={`w-5 h-5 ${colors.text} mx-auto opacity-60`} />
//                     <div className={`text-2xl sm:text-3xl font-black ${colors.text}`}>{stat.value}</div>
//                     <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">{stat.label}</div>
//                     <div className="text-[8px] text-muted-foreground/50">{stat.desc}</div>
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

//       {/* SECTION 4: Leadership Team */}
//       <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
//               <Users className="w-3.5 h-3.5" /> Our Leadership
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
//               Guiding the{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Vision</span>
//             </h2>
//             <p className="text-muted-foreground">Meet the scholars and administrators leading Al-Maysaroh</p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {LEADERSHIP_TEAM.map((leader, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="text-center p-6 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group">
//                   <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-lg group-hover:scale-110 transition-transform">
//                     {leader.image}
//                   </div>
//                   <h3 className="font-black text-lg mb-1">{leader.name}</h3>
//                   <p className="text-purple-600 font-black text-xs uppercase mb-2">{leader.role}</p>
//                   <p className="text-xs text-muted-foreground mb-2">{leader.credentials}</p>
//                   <p className="text-[10px] text-muted-foreground/70">{leader.bio}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Core Values */}
//       <section className="py-16 sm:py-20 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
//               <Heart className="w-3.5 h-3.5" /> Our Foundation
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
//               Core <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Values</span>
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {VALUES.map((value, i) => {
//               const Icon = value.icon;
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center p-8 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group">
//                     <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>
//                     <h3 className="font-black text-xl mb-1">{value.title}</h3>
//                     <p className="text-sm text-purple-600 font-black mb-2">{value.arabic}</p>
//                     <p className="text-sm text-muted-foreground">{value.description}</p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* The 4 Pillars */}
//       <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
//               <Compass className="w-3.5 h-3.5" /> Our Approach
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
//               The <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Al-Maysaroh</span> Method
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
//             {PILLARS.map((item, i) => {
//               const Icon = item.icon;
//               const colors = getColorStyles(item.color);
//               return (
//                 <Reveal key={i} delay={i * 0.1}>
//                   <div className="text-center p-6 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
//                     <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
//                       <Icon className="w-7 h-7 text-white" />
//                     </div>
//                     <h3 className="font-black text-base mb-2">{item.title}</h3>
//                     <p className="text-sm text-muted-foreground">{item.desc}</p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* SECTION 5: Accreditations & Certifications */}
//       {/* <section className="py-16 sm:py-20 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-3">
//               <Award className="w-3.5 h-3.5" /> Recognized Excellence
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3">
//               Accreditations &{" "}
//               <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Certifications</span>
//             </h2>
//             <p className="text-muted-foreground">Recognized by prestigious Islamic institutions worldwide</p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
//             {ACCREDITATIONS.map((accred, i) => (
//               <Reveal key={i} delay={i * 0.1}>
//                 <div className="p-5 rounded-xl bg-card border border-purple-200 dark:border-purple-800 text-center hover:border-purple-300 transition-all group">
//                   <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
//                     <span className="font-black text-lg text-purple-600">{accred.logo}</span>
//                   </div>
//                   <p className="font-black text-xs uppercase tracking-wider">{accred.name}</p>
//                   <p className="text-[9px] text-purple-600 font-black mt-1">Since {accred.year}</p>
//                   <p className="text-[8px] text-muted-foreground mt-2">{accred.description}</p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200">
//               <Shield className="w-4 h-4 text-purple-600" />
//               <span className="text-[10px] font-black uppercase tracking-wider">Fully Accredited & Verified</span>
//             </div>
//           </div>
//         </div>
//       </section> */}

   

//       {/* SECTION 7: Virtual Campus */}
//       <section className="py-16 sm:py-20 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             <Reveal>
//               <div className="space-y-5">
//                 <div className="inline-flex items-center gap-1.5 text-purple-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
//                   <Globe className="w-3.5 h-3.5" /> Digital Sanctuary
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
//                   Our{" "}
//                   <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Virtual</span> Campus
//                 </h2>
//                 <p className="text-muted-foreground leading-relaxed">
//                   A proprietary digital platform designed for focused Quranic study. Track every surah, ayah, and tajweed rule with precision.
//                 </p>
//                 <div className="grid sm:grid-cols-2 gap-3 pt-2">
//                   {VIRTUAL_CAMPUS_FEATURES.map((feature, i) => {
//                     const Icon = feature.icon;
//                     return (
//                       <div key={i} className="flex items-center gap-2 text-sm">
//                         <Icon className="w-4 h-4 text-amber-500" />
//                         <span className="text-xs font-medium">{feature.title}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </Reveal>

//             <Reveal delay={0.2}>
//               <div className="bg-gradient-to-br from-purple-600/10 to-amber-500/10 rounded-2xl p-8 text-center border border-purple-200 dark:border-purple-800">
//                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 mb-5">
//                   <Monitor className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="font-black text-2xl mb-3">24/7 Access</h3>
//                 <p className="text-muted-foreground mb-6">
//                   Learn from anywhere, at any time. Our platform is accessible from desktop, tablet, or mobile devices.
//                 </p>
//                 <div className="flex justify-center gap-4 text-xs text-muted-foreground">
//                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-600" /> Desktop</span>
//                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Tablet</span>
//                   <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-600" /> Mobile</span>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

 
//       {/* Final CTA */}
//       <section className="py-16 sm:py-20 md:py-24">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="bg-card rounded-2xl border border-purple-200 p-8 sm:p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600/5 to-amber-500/5">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 mb-6 shadow-xl">
//               <Rocket className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-black mb-4">Become Part of Our Legacy</h2>
//             <p className="text-muted-foreground mb-8 max-w-md mx-auto">
//               Join a community dedicated to preserving and transmitting the Word of Allah.
//               Begin your journey with a free, no-obligation assessment.
//             </p>
//             <div className="flex flex-col xs:flex-row gap-4 justify-center">
//               <Link href="/admissions" className="w-full xs:w-auto">
//                 <Button className="w-full rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 text-white">
//                   START YOUR JOURNEY <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/contact" className="w-full xs:w-auto">
//                 <Button variant="outline" className="w-full rounded-full px-8 py-4 font-black border-amber-500 text-amber-600">CONTACT US</Button>
//               </Link>
//             </div>
//             <p className="text-xs text-muted-foreground mt-6">Free 20-minute assessment • No commitment • All ages welcome</p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }














// app/about/page.tsx
import { Metadata } from "next";
import AboutClient from "./about-client";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "About Us | Al-Maysaroh International Institute",
  description: "Learn about Al-Maysaroh's mission to preserve the authentic transmission of the Quran through an unbroken chain of scholarship spanning 1,400 years.",
  keywords: "Al-Maysaroh, Quran institute, Islamic education, Sanad, Ijazah, Quran memorization, Tajweed",
  authors: [{ name: "Al-Maysaroh International Institute" }],
  openGraph: {
    title: "About Al-Maysaroh - Preserving the Word of Allah",
    description: "A sanctuary of sacred knowledge dedicated to preserving the authentic transmission of the Quran.",
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com/about",
    images: [
      {
        url: "/og/about.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Maysaroh International Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Al-Maysaroh",
    description: "Preserving the authentic transmission of the Quran since 2018.",
    images: ["/og/about.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://almaysaroh.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
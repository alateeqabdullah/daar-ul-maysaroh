// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";
// import { EnrollmentForm } from "@/components/forms/enrollment-form";
// import {
//   Sparkles,
//   Users,
//   Clock,
//   Calendar,
//   Heart,
//   Award,
//   MessageSquare,
//   Smile,
//   CheckCircle,
//   ArrowRight,
//   CheckCircle2,
//   Star,
//   Trophy,
//   Gift,
//   HelpCircle,
//   Shield,
// } from "lucide-react";
// // import { TrialForm } from "@/components/forms/trial-form";
// import { cn } from "@/lib/utils";
// import { Metadata } from "next";

// // Dynamic metadata generation
// export async function generateMetadata(): Promise<Metadata> {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://almaysaroh.com";

//   return {
//     title:
//       "Group Qiro'ah for Children | Interactive Quran Reading | Al-Maysaroh",
//     description:
//       "Interactive group Quran reading program for children ages 7-12. Learn with peers, earn rewards, and build confidence in a fun, supportive environment. Free assessment available.",
//     keywords: [
//       "group qiro'ah",
//       "quran for children",
//       "kids quran classes",
//       "online quran for kids",
//       "children quran reading",
//       "interactive quran learning",
//       "group quran lessons",
//       "quran recitation for kids",
//       "quran classes for children",
//       "quran reading program for kids",
//       "quran learning for children",
//       "quran education for kids",
//       "quran recitation classes for children",
//       "quran study group for kids",
//       "quran reading sessions for children",
//       "quran learning program for kids",
//       "quran recitation program for children",
//       "quran classes online for kids",
//       "quran reading classes for children",
//       "quran learning classes for kids",
//       "quran recitation classes online for children",
//     ],
//     openGraph: {
//       title: "Group Qiro'ah for Children | Interactive Quran Reading",
//       description:
//         "Fun, interactive group Quran reading program for children ages 7-12. Learn with peers, earn rewards, and build confidence.",
//       url: `${baseUrl}/courses/group-qiroah`,
//       siteName: "Al-Maysaroh Institute",
//       images: [
//         {
//           url: `${baseUrl}/og/qiroah-group.jpg`,
//           width: 1200,
//           height: 630,
//           alt: "Group Qiro'ah for Children - Interactive Quran Reading",
//         },
//       ],
//       type: "website",
//       locale: "en_US",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Group Qiro'ah for Children | Interactive Quran Reading",
//       description:
//         "Fun, interactive group Quran reading program for children ages 7-12. Free assessment available.",
//       images: [`${baseUrl}/og/qiroah-group.jpg`],
//     },
//     alternates: {
//       canonical: `${baseUrl}/courses/group-qiroah`,
//     },
//   };
// }

// // Mock data - replace with actual Prisma queries
// const COURSE_DETAILS = {
//   name: "Group Qiro'ah for Children",
//   tagline: "Learn to Read Quran with Joy & Confidence",
//   description:
//     "A nurturing environment where children ages 7-12 learn proper Quranic recitation through interactive group sessions, games, and positive reinforcement .",
//   ageGroup: "7-12 years",
//   duration: "6 months",
//   sessionsPerWeek: "min: 2, max: 4" ,
//   sessionDuration: "30 - 60 minutes",
//   classSize: "4-10 students",
//   startDate: "April, 2026",
//   price: {
//     monthly: 6,
//     quarterly: 18,
//     annually: 70,
//   },
//   features: [
//     "Interactive learning games",
//     "Progress certificates",
//     "Parent portal access",
//     "Weekly progress reports",
//     "Fun Quran competitions",
//     "Reward system",
//   ],
//   curriculum: [
//     {
//       level: "Level 1: Foundations",
//       months: "Months 1-2",
//       topics: [
//         "Arabic alphabet recognition",
//         "Proper pronunciation (Makharij basics)",
//         "Short vowels (Fatha, Kasra, Damma)",
//         "Connecting letters",
//         "Basic reading fluency",
        
//       ],
//     },
//     {
//       level: "Level 2: Building Fluency",
//       months: "Months 3-4",
//       topics: [
//         "Long vowels (Madd)",
//         "Sukoon and Shadda",
//         "Basic Tajweed rules for children",
//         "Reading short Surahs",
//         "Interactive recitation practice",
//       ],
//     },
//     {
//       level: "Level 3: Confident Reading",
//       months: "Months 5-6",
//       topics: [
//         "Fluent Quranic reading",
//         "Juz Amma practice",
//         "Basic memorization",
//         "Public recitation practice",
//         "Final group recitation project",
//         "Celebration and rewards ceremony",
//       ],
//     },
//   ],
//   schedule: [
//     { day: "Monday & Wednesday", time: "3:00 PM - 4:45 PM (EST)" },
//     { day: "Tuesday & Thursday", time: "3:00 PM - 5:45 PM (EST)" },
//     { day: "Saturday & Sunday", time: "8:00 AM - 11:30 AM (EST)" },
//   ],

//   // schedule: [
//   //   { day: "Monday & Wednesday", time: "4:00 PM - 4:45 PM (EST)" },
//   //   { day: "Tuesday & Thursday", time: "5:00 PM - 5:45 PM (EST)" },
//   //   { day: "Saturday", time: "10:00 AM - 11:30 AM (EST)" },
//   //   { day: "Sunday", time: "11:00 AM - 12:30 PM (EST)" },
//   // ],
//   teachers: [
//     {
//       name: "Ustadha Fatima Zahrah",
//       qualifications: "Ijazah in Hifz & Tajweed, 10 years teaching children",
//       image: "/teachers/fatima.jpg",
//     },
//     {
//       name: "Ustadh Abubakar Al-Maysariy",
//       qualifications: "Ijazah in Qira'at, 15 years experience with children",
//       image: "/teachers/dean.jpg",
//     },
//   ],
//   benefits: [
//     {
//       icon: Heart,
//       title: "Nurturing Environment",
//       description:
//         "Positive, encouraging atmosphere that builds love for the Quran",
//     },
//     {
//       icon: Users,
//       title: "Peer Learning",
//       description: "Children learn better together with friendly competition",
//     },
//     {
//       icon: Award,
//       title: "Reward System",
//       description: "Stars, certificates, and prizes to celebrate progress",
//     },
//     {
//       icon: MessageSquare,
//       title: "Parent Communication",
//       description: "Weekly updates and parent-teacher meetings",
//     },
//   ],
//   rewards: [
//     { name: "Star Recruiter", surahs: "5", badge: "⭐" },
//     { name: "Moon Reciter", surahs: "10", badge: "🌙" },
//     { name: "Sun Scholar", surahs: "15", badge: "☀️" },
//     { name: "Quran Champion", surahs: "20+", badge: "🏆" },
//   ],
//   faqs: [
//     {
//       q: "What if my child has no prior Arabic knowledge?",
//       a: "Perfect! Our Level 1 is designed for absolute beginners. We start from the very basics with fun, engaging activities.",
//     },
//     {
//       q: "How do you keep children engaged online?",
//       a: "We use interactive games, visual aids, short activities, and frequent positive reinforcement. Sessions are designed for young attention spans.",
//     },
//     {
//       q: "Can parents observe the classes?",
//       a: "Yes! We offer monthly open sessions where parents can observe. You also receive weekly progress reports.",
//     },
//     {
//       q: "What if my child misses a class?",
//       a: "Recordings are available, and makeup sessions can be arranged within the same week.",
//     },
//     {
//       q: "Is there a trial class available?",
//       a: "Yes! We offer a free trial session so your child can experience the class before committing.",
//     },
//   ],
// };

// export default async function GroupQiroahAdmissionsPage() {
//   return (
//     <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
//       {/* Background Decor - Premium Addition */}
//       <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
//       <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />

//       {/* Floating particles - Premium Addition */}
//       <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
//       <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Hero Section - Enhanced with better visual */}
//         <section className="relative overflow-hidden">
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
//               {/* <Link
//                 href="/courses/children"
//                 className="hover:text-primary-700 transition-colors"
//               >
//                 Children
//               </Link> */}
//               <span className="mx-2">/</span>
//               <span className="text-primary-700 font-medium">
//               {`  Group Qiro'ah`}
//               </span>
//             </div>

//             {/* Hero Content - Enhanced with better spacing */}
//             <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
//               <div className="lg:w-1/2 space-y-4 sm:space-y-6">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
//                     <Sparkles className="w-3.5 h-3.5" /> ENROLLING NOW • AGES
//                     7-12
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
//                     Group{" "}
//                     <span className="text-primary-700 italic">{`Qiro'ah`}</span>
//                     <br />
//                     for Children
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
//                     {COURSE_DETAILS.description}
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-wrap gap-3 pt-2">
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Users className="w-3.5 h-3.5" />
//                       {COURSE_DETAILS.classSize}
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Clock className="w-3.5 h-3.5" />
//                       {COURSE_DETAILS.sessionDuration}
//                     </div>
//                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
//                       <Calendar className="w-3.5 h-3.5" />
//                       {COURSE_DETAILS.sessionsPerWeek}x/week
//                     </div>
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.4}>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                     <Link href="/admissions" className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-11">
//                         <span className="flex items-center justify-center gap-2 sm:gap-3">
//                           ENROLL NOW
//                           <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </span>
//                       </Button>
//                     </Link>
//                     <Link href="#assessment" className="w-full sm:w-auto">
//                       <Button
//                         variant="outline"
//                         className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11"
//                       >
//                         FREE ASSESSMENT
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Visual - Enhanced with rewards preview */}
//               <Reveal delay={0.4} className="lg:w-1/2">
//                 <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
//                   <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
//                     <div className="space-y-1">
//                       <div className="text-2xl sm:text-3xl font-black text-primary-700">
//                         $6
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         Monthly
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <div className="text-2xl sm:text-3xl font-black text-primary-700">
//                         6 mo
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         Duration
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <div className="text-2xl sm:text-3xl font-black text-primary-700">
//                         4-6
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         Students/class
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <div className="text-2xl sm:text-3xl font-black text-primary-700">
//                         April
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         Start Date
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Smile className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                       <div className="font-black text-base sm:text-lg uppercase tracking-tight">
//                         Child-Friendly Approach
//                       </div>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Games • Rewards • Positive Reinforcement • Progress
//                       Tracking
//                     </p>
//                   </div>

//                   {/* Rewards Preview - Premium Addition */}
//                   <div className="mt-4 flex justify-between items-center px-2">
//                     {COURSE_DETAILS.rewards.slice(0, 3).map((reward, idx) => (
//                       <div key={idx} className="text-center">
//                         <div className="text-2xl">{reward.badge}</div>
//                         <div className="text-[10px] font-black text-muted-foreground mt-1">
//                           {reward.name}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </section>

//         {/* Benefits Section - Your existing structure with enhanced icons */}
//         <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
//                   <Star className="w-3.5 h-3.5" /> WHY PARENTS CHOOSE US
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
//                   Why Parents{" "}
//                   <span className="text-primary-700 italic">Love</span> This
//                   Program
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
//                   A nurturing environment where children develop a lifelong love
//                   for the Quran
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//               {COURSE_DETAILS.benefits.map((benefit, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-5 sm:p-6 text-center h-full hover:border-primary-700/30 transition-all duration-300 group">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
//                     </div>
//                     <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
//                       {benefit.title}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-muted-foreground">
//                       {benefit.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Curriculum Section - Enhanced with better visual hierarchy */}
//         <section className="py-12 sm:py-16 md:py-24">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
//                   Fun &{" "}
//                   <span className="text-primary-700 italic">Effective</span>{" "}
//                   Curriculum
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
//                   Age-appropriate progression designed for young learners
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-4 sm:space-y-6">
//               {COURSE_DETAILS.curriculum.map((level, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-5 sm:p-6 md:p-8 hover:border-primary-700/30 transition-all duration-300">
//                     <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
//                       <div className="md:w-64 shrink-0">
//                         <div className="inline-flex items-center gap-2 sm:gap-3 mb-2">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center text-sm sm:text-base font-black shadow-md">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <div className="font-black text-base sm:text-lg uppercase tracking-tight">
//                               {level.level}
//                             </div>
//                             <p className="text-xs text-primary-700 font-black mt-1">
//                               {level.months}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex-1">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
//                           {level.topics.map((topic, idx) => (
//                             <div
//                               key={idx}
//                               className="flex items-center gap-2 p-2 rounded-lg bg-primary-50/50 dark:bg-primary-950/20"
//                             >
//                               <CheckCircle2 className="w-3.5 h-3.5 text-primary-700 shrink-0" />
//                               <span className="text-xs sm:text-sm">
//                                 {topic}
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
//         </section>

//         {/* Rewards Section - Premium Addition */}
//         <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider mb-4">
//                   <Trophy className="w-3.5 h-3.5" /> MOTIVATIONAL REWARDS
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
//                   <span className="text-primary-700 italic">Rewards</span> &
//                   Achievements
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
//                   {` Fun incentives to celebrate your child's Quranic milestones and keep them motivated!`}
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {COURSE_DETAILS.rewards.map((reward, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="text-center p-4 sm:p-6 rounded-xl bg-linear-to-br from-accent/5 to-accent/10 border border-accent/20 hover:border-accent/40 transition-all group">
//                     <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
//                       {reward.badge}
//                     </div>
//                     <div className="font-black text-sm uppercase tracking-tight">
//                       {reward.name}
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {reward.surahs} Surahs
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Schedule Section - Enhanced with better visual */}
//         <section className="py-12 sm:py-16 md:py-24">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
//               <Reveal>
//                 <div className="space-y-6">
//                   <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                     Choose Your{" "}
//                     <span className="text-primary-700 italic">Schedule</span>
//                   </h2>
//                   <p className="text-base sm:text-lg text-muted-foreground">
//                     {`  Multiple time slots available to fit your family's routine.
//                     All times shown in Eastern Time (EST). Classes are live and interactive, so your child can join from anywhere!`}
//                   </p>

//                   <div className="space-y-3 sm:space-y-4">
//                     {COURSE_DETAILS.schedule.map((slot, index) => (
//                       <div
//                         key={index}
//                         className="p-4 sm:p-5 rounded-xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all group"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700 group-hover:scale-110 transition-transform" />
//                             <span className="font-black text-sm sm:text-base">
//                               {slot.day}
//                             </span>
//                           </div>
//                           <span className="text-xs sm:text-sm text-muted-foreground">
//                             {slot.time}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Reveal>

              
//             <Reveal delay={0.2}>
//               <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
//                     <Gift className="w-8 h-8 text-accent" />
//                   </div>
//                   <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight mb-2">
//                     Free Assessment Session
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     No commitment • No payment required
//                   </p>
//                 </div>

//                 <ul className="space-y-3 mb-6">
//                   {[
//                     "30-minute trial session",
//                     "Meet the teacher",
//                     "Experience our method",
//                     "Level assessment",
//                   ].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-3">
//                       <CheckCircle2 className="w-4 h-4 text-accent" />
//                       <span className="text-sm">{item}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <Link href="#assessment">
//                   <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-black">
//                     SCHEDULE FREE ASSESSMENT
//                   </Button>
//                 </Link>
//               </div>
//             </Reveal>
//           </div>
//           </div>
//         </section>

        
     

//         {/* Pricing Section - Your existing structure */}
//         <section
//           id="pricing"
//           className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl"
//         >
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
//                   Simple,{" "}
//                   <span className="text-primary-700 italic">Affordable</span>{" "}
//                   Plans
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
//                   Choose the payment option that works best for your family
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
//               {[
//                 {
//                   name: "Monthly",
//                   price: "$6",
//                   period: "/month",
//                   description: "Perfect for trying out",
//                   features: [
//                     "No long-term commitment",
//                     "Cancel anytime",
//                     "Full access",
//                     "Progress reports",
//                   ],
//                   popular: false,
//                   planId: "monthly",
//                 },
//                 {
//                   name: "Quarterly",
//                   price: "$18",
//                   period: "/3 months",
//                   description: "Save 6+%",
//                   features: [
//                     "Best value",
//                     "Priority scheduling",
//                     "Free materials",
//                     "Parent portal access",
//                   ],
//                   popular: true,
//                   planId: "quarterly",
//                 },
//                 {
//                   name: "Annual",
//                   price: "$70",
//                   period: "/year",
//                   description: "Save 1% + bonus",
//                   features: [
//                     "Maximum savings",
//                     "Free assessment sessions",
//                     "Certificate included",
//                     "Bonus Quran workbook",
//                   ],
//                   popular: false,
//                   planId: "annual",
//                 },
//               ].map((plan, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div
//                     className={cn(
//                       "institutional-card p-5 sm:p-6 md:p-8 h-full flex flex-col relative transition-all duration-300 hover:-translate-y-1",
//                       plan.popular &&
//                         "border-2 border-primary-700 shadow-royal",
//                     )}
//                   >
//                     {plan.popular && (
//                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
//                         MOST POPULAR
//                       </div>
//                     )}

//                     <div className="mb-4 sm:mb-6">
//                       <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-2">
//                         {plan.name}
//                       </h3>
//                       <div className="flex items-baseline gap-1">
//                         <span className="text-3xl sm:text-4xl font-black text-primary-700">
//                           {plan.price}
//                         </span>
//                         <span className="text-xs sm:text-sm text-muted-foreground">
//                           {plan.period}
//                         </span>
//                       </div>
//                       <p className="text-xs sm:text-sm text-muted-foreground mt-2">
//                         {plan.description}
//                       </p>
//                     </div>

//                     <ul className="space-y-2 sm:space-y-3 mb-6 grow">
//                       {plan.features.map((feature, idx) => (
//                         <li
//                           key={idx}
//                           className="flex items-center gap-2 text-xs sm:text-sm"
//                         >
//                           <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 shrink-0" />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <Link
//                       href={`#enroll-form?plan=${plan.planId}`}
//                       className="mt-auto"
//                     >
//                       <Button
//                         className={cn(
//                           "w-full rounded-full font-black transition-all duration-300",
//                           plan.popular
//                             ? "bg-primary-700 hover:bg-primary-800 text-white"
//                             : "bg-primary-700/10 hover:bg-primary-700/20 text-primary-700",
//                         )}
//                       >
//                         SELECT PLAN
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Teachers Section - Your existing structure */}
//         <section className="py-12 sm:py-16 md:py-24">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
//                   <Shield className="w-3.5 h-3.5" /> CERTIFIED SCHOLARS
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
//                   Meet Your{" "}
//                   <span className="text-primary-700 italic">Teachers</span>
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
//                   Experienced, patient, and certified in teaching children
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
//               {COURSE_DETAILS.teachers.map((teacher, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-5 sm:p-6 flex items-start gap-4 hover:border-primary-700/30 transition-all duration-300 group">
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-black text-2xl group-hover:scale-105 transition-transform">
//                       {teacher.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
//                         {teacher.name}
//                       </h3>
//                       <p className="text-xs sm:text-sm text-muted-foreground">
//                         {teacher.qualifications}
//                       </p>
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ENROLLMENT FORM SECTION - Your existing structure */}
//         <section
//           id="enroll-form"
//           className="py-12 sm:py-16 md:py-24 scroll-mt-20 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl"
//         >
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-8 sm:mb-12 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Enroll Your{" "}
//                   <span className="text-primary-700 italic">Child</span> Today
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//                   {`  Complete the form below to secure your child's spot in our
//                     upcoming Group Qiro'ah session. We can't wait to welcome you to our Quran learning family!`}
//                 </p>
//               </div>
//             </Reveal>

//             <Reveal delay={0.1}>
//               <div className="institutional-card p-6 sm:p-8 md:p-10">
//                 <EnrollmentForm
//                   courseId="group-qiroah"
//                   courseName="Group Qiro'ah for Children"
//                   priceOptions={[
//                     { id: "monthly", name: "Monthly", price: 16 },
//                     { id: "quarterly", name: "Quarterly", price: 45 },
//                     { id: "annual", name: "Annual", price: 165 },
//                   ]}
//                   scheduleOptions={COURSE_DETAILS.schedule.map(
//                     (slot, index) => ({
//                       id: `slot-${index}`,
//                       label: `${slot.day} • ${slot.time}`,
//                     }),
//                   )}
//                 />
//               </div>
//             </Reveal>
//           </div>
//         </section>

//         {/* TRIAL FORM SECTION - Your existing structure */}
//         {/* <section
//           id="trial-form"
//           className="py-12 sm:py-16 md:py-24 scroll-mt-20"
//         >
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-8 sm:mb-12 space-y-4">
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Try a{" "}
//                   <span className="text-primary-700 italic">Free Class</span>
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//                   {No commitment required. Experience our teaching style and see
//                   if it's right for your child.}
//                 </p>
//               </div>
//             </Reveal>

//             <Reveal delay={0.1}>
//               <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-accent/20 bg-linear-to-br from-accent/5 to-accent/10">
//                 <TrialForm
//                   courseId="group-qiroah"
//                   courseName="Group Qiro'ah for Children"
//                   scheduleOptions={COURSE_DETAILS.schedule.map(
//                     (slot, index) => ({
//                       id: `trial-${index}`,
//                       label: `${slot.day} • ${slot.time}`,
//                     }),
//                   )}
//                 />
//               </div>
//             </Reveal>
//           </div>
//         </section> */}

//         {/* FAQ Section - Enhanced with better styling */}
//         <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
//           <div className="max-w-4xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-12 sm:mb-16 space-y-4">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
//                   <HelpCircle className="w-3.5 h-3.5" /> COMMON QUESTIONS
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
//                   Frequently Asked{" "}
//                   <span className="text-primary-700 italic">Questions</span>
//                 </h2>
//                 <p className="text-base sm:text-lg text-muted-foreground">
//                   Everything parents need to know
//                 </p>
//               </div>
//             </Reveal>

//             <div className="space-y-3 sm:space-y-4">
//               {COURSE_DETAILS.faqs.map((faq, index) => (
//                 <Reveal key={index} delay={index * 0.05}>
//                   <div className="institutional-card p-4 sm:p-6 hover:border-primary-700/30 transition-all duration-300 group">
//                     <div className="flex gap-3 sm:gap-4">
//                       <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0 group-hover:bg-primary-700/10 transition-colors">
//                         <HelpCircle className="w-4 h-4 text-primary-700" />
//                       </div>
//                       <div>
//                         <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">
//                           {faq.q}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
//                           {faq.a}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ==================== FINAL CTA ==================== */}
//         <section id="assessment" className="py-12 sm:py-16 md:py-20">
//           <Reveal>
//             <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20 max-w-4xl mx-auto">
//               <Smile className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary-700" />

//               <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
//                 {` Start Your Child's`}{" "}
//                 <span className="text-primary-700 italic">Quran</span> Journey
//               </h2>

//               <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
//                 Give your child the gift of Quranic connection in a fun,
//                 supportive environment
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/admissions">
//                   <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11">
//                     <span className="flex items-center gap-3">
//                       ENROLL NOW
//                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </span>
//                   </Button>
//                 </Link>

//                 <Link href="/contact">
//                   <Button
//                     variant="outline"
//                     className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11"
//                   >
//                     FREE ASSESSMENT
//                   </Button>
//                 </Link>
//               </div>

//               <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                     Satisfaction Guaranteed
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                     Free Assessment Available
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-primary-700" />
//                     Flexible Scheduling
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </section>
//       </div>
//     </main>
//   );
// }


// app/courses/group-qiroah/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  Calendar,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  Gem,
  Crown,
  Target,
  Quote,
  GraduationCap,
  Compass,
  MessageCircle,
  Rocket,
  Globe,
  Smile,
  Gamepad,
  Leaf,
  Flower,
  Sun,
  Baby,
  Briefcase,
  Zap,
  Feather,
  Coffee,
  Moon,
  Cloud,
  Rainbow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Premium Color Scheme - Sunset/Amber Theme
const COLORS = {
  primary: "from-amber-500 to-orange-600",
  secondary: "from-orange-500 to-amber-500",
  accent: "from-rose-500 to-amber-500",
  light: "amber-50",
  dark: "amber-950",
  border: "amber-200",
  text: "amber-700",
  gradient: "from-amber-50/30 via-orange-50/20 to-rose-50/30",
  glow: "from-amber-500/20 via-orange-500/15 to-rose-500/10",
};

// Program Data
const PROGRAM_DATA = {
  name: "Group Qiro'ah",
  tagline: "Your First Step to Reading the Quran",
  description: "A warm, nurturing group learning experience for absolute beginners of all ages. Join a community of learners on the same beautiful journey.",
  audience: "All Ages • Absolute Beginners Welcome",
  duration: "Flexible (6-12 months)",
  sessionsPerWeek: "1-3 sessions",
  sessionDuration: "45-60 minutes",
  format: "Small Groups (4-10 learners)",
  level: "Beginner to Intermediate",
  priceRange: "$69",
  pricePeriod: "per month",
};

// Core Benefits
const BENEFITS = [
  { icon: Smile, title: "Supportive Environment", description: "Learn at your own pace in a judgment-free space", audience: "All learners" },
  { icon: Users, title: "Peer Learning", description: "Grow together with fellow learners in small groups", audience: "Everyone" },
  { icon: Gamepad, title: "Engaging Methods", description: "Interactive activities that make learning stick", audience: "All ages" },
  { icon: Heart, title: "Patient Instructors", description: "Teachers who genuinely care about your progress", audience: "All levels" },
  { icon: Award, title: "Progress Recognition", description: "Celebrate every milestone along your journey", audience: "All students" },
  { icon: Calendar, title: "Flexible Learning", description: "Schedules that fit your life", audience: "Everyone" },
];

// Learning Journey
const LEARNING_JOURNEY = [
  { stage: "Alphabet Foundation", duration: "Foundation Phase", focus: "Arabic letters, sounds, and basic recognition", activities: ["Letter recognition", "Sound practice", "Writing basics", "Simple games"], icon: Leaf },
  { stage: "Word Building", duration: "Building Phase", focus: "Connecting letters and forming words", activities: ["Word construction", "Vocabulary building", "Reading practice", "Group activities"], icon: Flower },
  { stage: "Surah Reading", duration: "Fluency Phase", focus: "Reading short surahs with confidence", activities: ["Surah practice", "Fluency drills", "Meaning discussion", "Revision games"], icon: Crown },
  { stage: "Confident Reader", duration: "Mastery Phase", focus: "Independent Quran reading with proper rhythm", activities: ["Fluency mastery", "Basic Tajweed", "Public reading", "Graduation"], icon: Star },
];

// Schedule Options
const SCHEDULE_OPTIONS = [
  { day: "Monday & Wednesday", time: "Flexible (4-8 PM EST)", icon: Sun },
  { day: "Tuesday & Thursday", time: "Flexible (4-8 PM EST)", icon: Sun },
  { day: "Saturday", time: "Morning (9-11 AM EST) • Afternoon (2-4 PM EST)", icon: Sun },
  { day: "Sunday", time: "Morning (9-11 AM EST) • Afternoon (2-4 PM EST)", icon: Sun },
  { day: "Weekend Intensive", time: "Saturday & Sunday, 3 hours/week", icon: Calendar },
];

// Success Stories
const STORIES = [
  { name: "Abdulbasit, 45", type: "Working Professional", quote: "I never thought I could learn Quran reading at my age. The patient teachers and supportive group made it possible.", duration: "7 months", icon: Briefcase },
  { name: "Qonitah, 9", type: "Young Learner", quote: "Learning to read the Quran is fun! I love the challenges and my friends in the class.", duration: "6 months", icon: Baby },
  { name: "Habeebah, 32", type: "Busy Mother", quote: "The flexible schedule allowed me to learn without sacrificing family time. I'm now reading short surahs confidently!", duration: "6 months", icon: Heart },
  { name: "Yusuf, 19", type: "University Student", quote: "The group setting kept me accountable and motivated. I've gone from zero to reading surahs confidently.", duration: "7 months", icon: GraduationCap },
];

// FAQ
const FAQS = [
  { q: "Do I need any prior knowledge?", a: "Not at all! This program is designed for absolute beginners. We start from the very basics and build gradually." },
  { q: "Is this only for children?", a: "No! We have learners of all ages - from 7 to 70+. The program is tailored to each individual's pace and learning style." },
  { q: "How much time should I practice at home?", a: "We recommend 10-15 minutes of daily practice. Consistency matters more than quantity." },
  { q: "What if I miss a class?", a: "Recordings are available, and we offer flexible makeup options within the same week." },
  { q: "Can I switch to 1-on-1 later?", a: "Absolutely! Many students start in groups and transition to private sessions as they advance." },
  { q: "Is there a free trial?", a: "Yes! We offer a free 20-30-minute assessment session to experience our teaching style." },
];

export default function GroupQiroahPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative pt-12 bg-background overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-500/3 rounded-full blur-[200px]" />
        
        {/* Animated Floating Elements */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 w-3 h-3 bg-amber-400/30 rounded-full" />
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-32 right-20 w-4 h-4 bg-orange-400/30 rounded-full" />
        <motion.div animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-1/4 w-2 h-2 bg-rose-400/30 rounded-full" />
      </div>

      {/* Hero Section - Premium Design */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-24 sm:pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 text-[11px] font-black uppercase tracking-wider mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> 🌟 For Everyone • All Ages Welcome 🌟
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[1.1] mb-6">
              Learn to Read{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">
                the Quran
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              {PROGRAM_DATA.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: Users, text: PROGRAM_DATA.format },
                { icon: Clock, text: `${PROGRAM_DATA.sessionDuration} sessions` },
                { icon: Smile, text: "Beginner Friendly" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 text-xs font-black">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.text}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-10 py-5 sm:px-12 sm:py-6 font-black bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    START FREE ASSESSMENT
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="#journey">
                <Button variant="outline" className="rounded-full px-10 py-5 sm:px-12 sm:py-6 font-black text-base sm:text-lg border-amber-600 text-amber-600 hover:bg-amber-50 transition-all duration-300">
                  EXPLORE THE JOURNEY
                </Button>
              </Link>
            </div>

            {/* Stats with Premium Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border/50">
              {[
                { label: "Happy Learners", value: "500+", icon: Users },
                { label: "Success Rate", value: "95%", icon: Target },
                { label: "Global Reach", value: "15+", icon: Globe },
                { label: "Avg. Completion", value: "7 mo", icon: Calendar },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800">
                  <stat.icon className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-black text-amber-600">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section - Premium Cards */}
      <section className="py-20 bg-gradient-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Heart className="w-3.5 h-3.5" /> Why Families Love Us
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Supportive</span> Learning Environment
            </h2>
            <p className="text-muted-foreground text-lg">Where everyone can learn at their own pace, with encouragement every step of the way</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -5 }} className="group p-6 rounded-2xl bg-background border border-border hover:border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        <div className="mt-2 inline-flex px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-[10px] font-black">
                          {benefit.audience}
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

      {/* Learning Journey - Premium Timeline */}
      <section id="journey" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Compass className="w-3.5 h-3.5" /> Your Path to Mastery
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              From <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">First Letter</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">Confident Reader</span>
            </h2>
            <p className="text-muted-foreground text-lg">A clear, supportive progression designed for lasting success</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400 hidden md:block" />
            <div className="space-y-8">
              {LEARNING_JOURNEY.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="relative pl-0 md:pl-20">
                      <div className="hidden md:flex absolute left-0 top-6 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      <div className="institutional-card p-6 md:p-8 hover:border-amber-300 transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-72">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-amber-600" />
                              </div>
                              <h3 className="font-black text-2xl">{stage.stage}</h3>
                            </div>
                            <div className="inline-flex px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-xs font-black mt-2">
                              {stage.duration}
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">{stage.focus}</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2">
                              {stage.activities.map((activity, i) => (
                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 text-amber-700 text-xs font-black">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {activity}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 h-2 w-full bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(idx + 1) * 25}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
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

      {/* Schedule & Pricing - Premium Cards */}
      <section className="py-20 bg-gradient-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Schedule Card */}
            <Reveal>
              <div className="institutional-card p-8 hover:border-amber-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-black text-2xl">Flexible Schedule</h3>
                </div>
                <div className="space-y-3">
                  {SCHEDULE_OPTIONS.map((slot, i) => {
                    const Icon = slot.icon;
                    return (
                      <div key={i} className="p-4 rounded-xl bg-background border border-border hover:border-amber-300 transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-amber-600" />
                            <span className="font-black text-sm">{slot.day}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{slot.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">✨ All times in EST • More time zones available • Custom schedules possible ✨</p>
              </div>
            </Reveal>

            {/* Pricing Card */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-8 bg-gradient-to-br from-amber-50/20 to-orange-50/20 hover:border-amber-300 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Gem className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-black text-2xl">Simple, Transparent Pricing</h3>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">{PROGRAM_DATA.priceRange}</div>
                    <p className="text-sm text-muted-foreground mt-1">{PROGRAM_DATA.pricePeriod} • includes all materials</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "2 small group sessions per week",
                      "All digital learning materials",
                      "Progress tracking & reports",
                      "Parent/guardian portal access",
                      "Free assessment session",
                      "Certificate upon completion",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-amber-50/50 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-sm p-3 rounded-lg bg-amber-50/30">
                      <span className="font-black">Family discount (3+ members)</span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">15% off</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Success Stories - Premium Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <Users className="w-3.5 h-3.5" /> Real Stories, Real Success
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Community</span>
            </h2>
            <p className="text-muted-foreground text-lg">Learners of all ages who found their path with us</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORIES.map((story, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="institutional-card p-6 h-full flex flex-col group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-lg">{story.name}</h4>
                      <p className="text-xs text-amber-600 font-black">{story.type}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-amber-200 dark:text-amber-800/30 mb-3" />
                  <p className="text-sm text-muted-foreground italic flex-grow leading-relaxed">"{story.quote}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">✓ Completed in {story.duration}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Premium Accordion */}
      <section className="py-20 bg-gradient-to-b from-background via-amber-50/5 to-orange-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <MessageCircle className="w-3.5 h-3.5" /> Common Questions
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3 }} className="institutional-card p-6 hover:border-amber-300 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
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

      {/* Final CTA - Premium */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="institutional-card p-10 md:p-14 text-center max-w-4xl mx-auto bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-rose-50/30"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 mb-6 shadow-xl">
              <Smile className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">Start Your Quran Reading Journey Today</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
              No matter your age or background — we're here to help you succeed.
              Begin with a free, no-obligation assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button className="rounded-full px-10 py-5 font-black bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    BOOK FREE ASSESSMENT
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-10 py-5 font-black border-amber-600 text-amber-600 hover:bg-amber-50 transition-all duration-300">
                  TALK TO ADVISOR
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">✨ Free 20-minute session</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">💝 No commitment</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">🌍 All ages welcome</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
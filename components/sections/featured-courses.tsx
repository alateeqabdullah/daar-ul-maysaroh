// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import {
//   BookOpen,
//   Star,
//   Users,
//   Clock,
//   ArrowRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const FEATURED_COURSES = [
//   {
//     title: "Qiro'ah Program",
//     subtitle: "Quran Reading",
//     description: "Complete Quran reading and recitation with certification.",
//     icon: BookOpen,
//     duration: "6 - 12 Months",
//     students: "1-on-1",
//     level: "Beginner+",
//     href: "/courses/qiroah",
//     features: ["Certificate", "24/7 Portal", "Analytics"],
//   },
//   {
//     title: "Hifz Program",
//     subtitle: "Quran Memorization",
//     description: "Complete Quran memorization with Ijazah certification.",
//     icon: BookOpen,
//     duration: "2-3 Years",
//     students: "1-on-1",
//     level: "All Levels",
//     href: "/courses/hifz",
//     features: ["Ijazah", "24/7 Portal", "Analytics"],
//   },

//   {
//     title: "Tajweed Mastery",
//     subtitle: "Scientific Recitation",
//     description:
//       "Perfect your Quranic pronunciation with rules-based methodology.",
//     icon: Star,
//     duration: "6 Months",
//     students: "1-on-1",
//     // level: "Beginner+",
//     level: "All Levels",
//     href: "/courses/tajweed",
//     features: ["Live Correction", "Audio Analysis"],
//   },
//   // {
//   //   title: "Arabic Fluency",
//   //   subtitle: "Quranic Language",
//   //   description: "Understand Quran in its original language.",
//   //   icon: Users,
//   //   duration: "1 Year",
//   //   students: "1-on-1",
//   //   // level: "Beginner",
//   //   level: "All Levels",

//   //   href: "/courses/arabic",
//   //   features: ["Grammar", "Vocabulary", "Tafsir"],
//   // },
//   {
//     title: "Tafsir Studies",
//     subtitle: "Quranic Exegesis",
//     description: "Deep dive into Quranic meanings with classical methodology.",
//     icon: Clock,
//     duration: "1.5 Years",
//     students: "1-on-1",
//     level: "Advanced",
//     href: "/courses/tafsir",
//     features: ["Classical Sources", "Scholar Mentorship"],
//   },
// ];

// export function FeaturedCourses() {
//   return (
//     <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Section Header */}
//         <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-xs sm:text-[10px] uppercase tracking-widest sm:tracking-[0.3em]">
//               <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" /> Featured Programs
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
//               Sacred <span className="text-primary-700 italic">Knowledge</span>
//               <br />
//               Paths
//             </h2>
//             <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-4 sm:pl-6">
//               Choose your journey into Quranic mastery with structured,
//               sanad-based programs.
//             </p>
//           </Reveal>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
//           {FEATURED_COURSES.map((course, index) => (
//             <Reveal key={course.title} delay={index * 0.15}>
//               <motion.div
//                 whileHover={{ y: -4 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="group relative"
//               >
//                 {/* Card */}
//                 <div className="relative z-10 institutional-card p-6 sm:p-8 md:p-10 h-full flex flex-col border border-transparent group-hover:border-primary-700/30">
//                   {/* Course Header */}
//                   <div className="flex items-start justify-between mb-6 sm:mb-8 md:mb-10">
//                     <div className="flex items-center gap-4 sm:gap-6">
//                       <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
//                         <course.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-700" />
//                       </div>

//                       <div>
//                         <div className="text-xs sm:text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1 sm:mb-2">
//                           {course.subtitle}
//                         </div>
//                         <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
//                           {course.title}
//                         </h3>
//                       </div>
//                     </div>

//                     {/* Duration Badge */}
//                     <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary-700/10 border border-primary-700/20">
//                       <span className="text-xs sm:text-sm font-black text-primary-700">
//                         {/* {course.duration} */}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8 grow">
//                     {course.description}
//                   </p>

//                   {/* Features */}
//                   <div className="mb-6 sm:mb-8 md:mb-10">
//                     <div className="text-xs font-black text-primary-700 uppercase tracking-widest mb-3 sm:mb-4">
//                       PROGRAM FEATURES
//                     </div>
//                     <div className="flex flex-wrap gap-2 sm:gap-3">
//                       {course.features.map((feature, idx) => (
//                         <div
//                           key={idx}
//                           className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/10"
//                         >
//                           <span className="text-xs sm:text-sm font-medium text-primary-700">
//                             {feature}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Footer */}
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
//                     <div className="flex items-center gap-6 w-full sm:w-auto">
//                       {/* <div className="space-y-1">
//                         <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
//                           FORMAT
//                         </div>
//                         <div className="text-base sm:text-lg font-black">
//                           {course.students}
//                         </div>
//                       </div> */}

//                       <div className="space-y-1">
//                         <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">
//                           LEVEL
//                         </div>
//                         <div className="text-base sm:text-md font-black">
//                           {course.level}
//                         </div>
//                       </div>
//                     </div>

//                     <Link href={course.href} className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-white bg-primary-700 hover:bg-primary-800 text-sm sm:text-base group/btn">
//                         <span className="flex items-center gap-2 sm:gap-3">
//                           EXPLORE
//                           <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-2" />
//                         </span>
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>

//         {/* View All CTA */}
//         <Reveal>
//           <div className="text-center">
//             <div className="inline-flex flex-col items-center gap-6 sm:gap-8">
//               <div className="text-base sm:text-lg opacity-70 text-muted-foreground font-semibold max-w-md px-4">
//                 Each program includes Ijazah / certification and scholarly
//                 mentorship.
//               </div>

//               <Link href="/courses">
//                 <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 text-base sm:text-md md:text-md font-black bg-primary-700 text-white hover:bg-primary-800 transition-all duration-500 group min-h-11 min-w-11">
//                   <span className="flex items-center gap-3 sm:gap-4">
//                     VIEW ALL PROGRAMS
//                     <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2" />
//                   </span>
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }





// components/sections/featured-courses.tsx
"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  BookOpen,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Globe,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED_COURSES = [
  {
    id: "qiroah",
    title: "Qiro'ah Program",
    subtitle: "Quran Reading",
    description: "Complete Quran reading and recitation with certification. Learn proper pronunciation and fluency with patient, expert guidance.",
    icon: BookOpen,
    duration: "6-12 Months",
    format: "1-on-1",
    level: "Beginner+",
    students: "150+",
    rating: 4.9,
    href: "/courses/qiroah",
    features: ["Certificate", "24/7 Portal", "Analytics", "Live Correction"],
    color: "purple",
    popular: true,
  },
  {
    id: "hifz",
    title: "Hifz Program",
    subtitle: "Quran Memorization",
    description: "Complete Quran memorization with Ijazah certification. Structured revision system for long-term retention and mastery.",
    icon: Crown,
    duration: "2-3 Years",
    format: "1-on-1",
    level: "All Levels",
    students: "200+",
    rating: 4.9,
    href: "/courses/hifz",
    features: ["Ijazah", "24/7 Portal", "Analytics", "Revision System"],
    color: "amber",
    popular: true,
  },
  {
    id: "tajweed",
    title: "Tajweed Mastery",
    subtitle: "Scientific Recitation",
    description: "Perfect your Quranic pronunciation with rules-based methodology. Master Makharij and Sifaat with expert feedback.",
    icon: Mic,
    duration: "6-12 Months",
    format: "1-on-1",
    level: "Intermediate+",
    students: "300+",
    rating: 4.8,
    href: "/courses/tajweed",
    features: ["Live Correction", "Audio Analysis", "Certificate", "Progress Tracking"],
    color: "teal",
    popular: true,
  },
  {
    id: "arabic",
    title: "Arabic Fluency",
    subtitle: "Quranic Language",
    description: "Understand the Quran in its original language. Master classical Arabic grammar, vocabulary, and comprehension.",
    icon: Globe,
    duration: "12-18 Months",
    format: "1-on-1",
    level: "Beginner",
    students: "120+",
    rating: 4.7,
    href: "/courses/arabic",
    features: ["Grammar Focus", "Vocabulary Builder", "Tafsir Integration", "Certificate"],
    color: "green",
    popular: false,
  },
  {
    id: "tafsir",
    title: "Tafsir Studies",
    subtitle: "Quranic Exegesis",
    description: "Deep dive into Quranic meanings with classical methodology. Understand context, interpretation, and scholarly insights.",
    icon: BookOpen,
    duration: "12-18 Months",
    format: "1-on-1",
    level: "Advanced",
    students: "80+",
    rating: 4.9,
    href: "/courses/tafsir",
    features: ["Classical Sources", "Scholar Mentorship", "Research", "Certificate"],
    color: "slate",
    popular: false,
  },
  {
    id: "group-qiroah",
    title: "Group Qiro'ah",
    subtitle: "Children's Reading",
    description: "Fun, interactive Quran reading for children ages 7-12. Learn with peers in a supportive, engaging environment.",
    icon: Users,
    duration: "6-9 Months",
    format: "Group (4-6)",
    level: "Beginner",
    students: "100+",
    rating: 4.9,
    href: "/courses/group-qiroah",
    features: ["Interactive Games", "Reward System", "Parent Portal", "Certificate"],
    color: "emerald",
    popular: true,
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      badge: "from-purple-600 to-purple-700",
      text: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:border-purple-300",
      icon: "text-purple-600",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      badge: "from-amber-500 to-amber-600",
      text: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      hover: "hover:border-amber-300",
      icon: "text-amber-600",
      gradient: "from-amber-600 to-amber-700",
    },
    teal: {
      badge: "from-teal-500 to-teal-600",
      text: "text-teal-600",
      bg: "bg-teal-100 dark:bg-teal-950/30",
      border: "border-teal-200 dark:border-teal-800",
      hover: "hover:border-teal-300",
      icon: "text-teal-600",
      gradient: "from-teal-600 to-teal-700",
    },
    green: {
      badge: "from-green-500 to-green-600",
      text: "text-green-600",
      bg: "bg-green-100 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      hover: "hover:border-green-300",
      icon: "text-green-600",
      gradient: "from-green-600 to-green-700",
    },
    slate: {
      badge: "from-slate-500 to-slate-600",
      text: "text-slate-600",
      bg: "bg-slate-100 dark:bg-slate-950/30",
      border: "border-slate-200 dark:border-slate-800",
      hover: "hover:border-slate-300",
      icon: "text-slate-600",
      gradient: "from-slate-600 to-slate-700",
    },
    emerald: {
      badge: "from-emerald-500 to-emerald-600",
      text: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      hover: "hover:border-emerald-300",
      icon: "text-emerald-600",
      gradient: "from-emerald-600 to-emerald-700",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function FeaturedCourses() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  // Handle responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCourses = FEATURED_COURSES.slice(0, visibleCount);

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="institutional-card p-10 h-96 animate-pulse bg-muted/20 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20 space-y-3 xs:space-y-4 sm:space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 text-amber-500 font-black text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">
              <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" /> 
              Featured Programs
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[1.1]">
              Sacred{" "}
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Knowledge
              </span>
              <br className="hidden xs:block" />
              Paths
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-amber-500 pl-3 xs:pl-4 sm:pl-6">
              Choose your journey into Quranic mastery with structured,
              sanad-based programs.
            </p>
          </Reveal>
        </div>

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {visibleCourses.map((course, index) => {
            const Icon = course.icon;
            const colors = getColorStyles(course.color);
            
            return (
              <Reveal key={course.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group h-full"
                >
                  <Link href={course.href}>
                    <div className={`bg-card rounded-xl xs:rounded-2xl border border-border ${colors.hover} transition-all duration-300 p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 h-full flex flex-col shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer`}>
                      
                      {/* Popular Badge */}
                      {course.popular && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className={`px-2 py-0.5 rounded-full bg-linear-to-r ${colors.badge} text-white text-[8px] xs:text-[9px] font-black uppercase tracking-wider shadow-md`}>
                            Most Popular
                          </div>
                        </div>
                      )}

                      {/* Course Header */}
                      <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 xs:gap-4 mb-5 xs:mb-6 sm:mb-8">
                        <div className="flex items-center gap-3 xs:gap-4 sm:gap-6">
                          <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl xs:rounded-2xl ${colors.bg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                            <Icon className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 ${colors.icon}`} />
                          </div>

                          <div>
                            <div className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black ${colors.text} uppercase tracking-wider mb-0.5 xs:mb-1`}>
                              {course.subtitle}
                            </div>
                            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className={`px-2 py-0.5 xs:px-3 xs:py-1 rounded-full ${colors.bg} border ${colors.border} self-start`}>
                          <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black ${colors.text}`}>
                            {course.duration}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs xs:text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-5 xs:mb-6 sm:mb-8 flex-grow">
                        {course.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3 xs:mb-4">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`w-3 h-3 xs:w-3.5 xs:h-3.5 ${i <= course.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'}`} />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">({course.rating})</span>
                      </div>

                      {/* Features */}
                      <div className="mb-5 xs:mb-6 sm:mb-8">
                        <div className={`text-[8px] xs:text-[9px] sm:text-[10px] font-black ${colors.text} uppercase tracking-wider mb-2 xs:mb-3 sm:mb-4`}>
                          PROGRAM FEATURES
                        </div>
                        <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
                          {course.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`px-2 py-0.5 xs:px-3 xs:py-1 rounded-full ${colors.bg} border ${colors.border}`}
                            >
                              <span className={`text-[8px] xs:text-[9px] sm:text-[10px] font-medium ${colors.text}`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 pt-4 xs:pt-5 sm:pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 w-full xs:w-auto">
                          <div className="space-y-0.5 xs:space-y-1">
                            <div className="text-[8px] xs:text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                              LEVEL
                            </div>
                            <div className="text-xs xs:text-sm sm:text-base font-black">
                              {course.level}
                            </div>
                          </div>
                          <div className="space-y-0.5 xs:space-y-1">
                            <div className="text-[8px] xs:text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                              FORMAT
                            </div>
                            <div className="text-xs xs:text-sm sm:text-base font-black">
                              {course.format}
                            </div>
                          </div>
                          <div className="space-y-0.5 xs:space-y-1">
                            <div className="text-[8px] xs:text-[9px] font-black text-muted-foreground uppercase tracking-wider">
                              STUDENTS
                            </div>
                            <div className="text-xs xs:text-sm sm:text-base font-black">
                              {course.students}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-primary-700 font-black text-[10px] xs:text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>

                      {/* Decorative Line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* View All CTA */}
        <Reveal>
          <div className="text-center mt-10 xs:mt-12 sm:mt-16 md:mt-20">
            <div className="inline-flex flex-col items-center gap-4 xs:gap-5 sm:gap-6">
              {/* <div className="text-xs xs:text-sm sm:text-base text-muted-foreground font-medium max-w-md px-4">
                ✨ Each program includes Ijazah / certification and scholarly mentorship with authentic Sanad.
              </div> */}

              <Link href="/courses">
                <Button className="rounded-full px-6 xs:px-7 sm:px-8 md:px-10 py-2.5 xs:py-3 sm:py-3.5 md:py-4 text-[10px] xs:text-xs sm:text-sm font-black bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group">
                  <span className="flex items-center gap-2 xs:gap-3">
                    VIEW ALL PROGRAMS
                    <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Trust Badge */}
        <Reveal delay={0.2}>
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <Shield className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                All programs include Ijazah/certification and authentic Sanad
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}




// // // app/not-found.tsx
// // "use client";

// // import Link from "next/link";
// // import { motion } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Home,
// //   ArrowRight,
// //   Search,
// //   BookOpen,
// //   Crown,
// //   Shield,
// //   Sparkles,
// //   Compass,
// //   MessageCircle,
// //   GraduationCap,
// // } from "lucide-react";

// // export default function NotFound() {
// //   return (
// //     <main className="relative bg-background overflow-hidden min-h-screen flex items-center justify-center">
// //       {/* Premium Background Effects */}
// //       <div className="hidden sm:block fixed inset-0 pointer-events-none">
// //         <div
// //           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
// //           style={{ backgroundSize: "300px" }}
// //         />
// //         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
// //         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
// //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
// //       </div>

// //       <div className="container mx-auto px-4 sm:px-6 py-20">
// //         <div className="max-w-2xl mx-auto text-center">
// //           {/* Decorative Number */}
// //           <motion.div
// //             initial={{ scale: 0.9, opacity: 0 }}
// //             animate={{ scale: 1, opacity: 1 }}
// //             transition={{ duration: 0.5 }}
// //             className="relative inline-block mb-6"
// //           >
// //             <div className="text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tighter text-purple-600/10">
// //               404
// //             </div>
// //             <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
// //               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
// //                 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Title */}
// //           <motion.h1
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.1, duration: 0.5 }}
// //             className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-4"
// //           >
// //             Page Not{" "}
// //             <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
// //               Found
// //             </span>
// //           </motion.h1>

// //           {/* Description */}
// //           <motion.p
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.2, duration: 0.5 }}
// //             className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto"
// //           >
// //            {` The page you're looking for doesn't exist or has been moved.
// //             Let's guide you back to the right path.`}
// //           </motion.p>

// //           {/* Suggested Links */}
// //           <motion.div
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.3, duration: 0.5 }}
// //             className="grid sm:grid-cols-2 gap-4 mb-10 text-left"
// //           >
// //             {[
// //               { href: "/", label: "Home", icon: Home, color: "purple" },
// //               { href: "/courses", label: "Our Courses", icon: BookOpen, color: "amber" },
// //               { href: "/teachers", label: "Our Scholars", icon: Crown, color: "purple" },
// //               { href: "/assessment", label: "Free Assessment", icon: Shield, color: "amber" },
// //               { href: "/admissions", label: "Admissions", icon: GraduationCap, color: "purple" },
// //               { href: "/contact", label: "Contact Us", icon: MessageCircle, color: "amber" },
// //             ].map((item, idx) => {
// //               const Icon = item.icon;
// //               const isPurple = item.color === "purple";
// //               return (
// //                 <Link
// //                   key={idx}
// //                   href={item.href}
// //                   className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-300 transition-all bg-card hover:shadow-md"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
// //                       <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
// //                     </div>
// //                     <span className="font-black text-sm">{item.label}</span>
// //                   </div>
// //                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
// //                 </Link>
// //               );
// //             })}
// //           </motion.div>

// //           {/* Search Bar */}
// //           <motion.div
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.4, duration: 0.5 }}
// //             className="mb-8"
// //           >
// //             <div className="relative max-w-md mx-auto">
// //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
// //               <input
// //                 type="text"
// //                 placeholder="Search our site..."
// //                 className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") {
// //                     window.location.href = `/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
// //                   }
// //                 }}
// //               />
// //             </div>
// //           </motion.div>

// //           {/* Return Home Button */}
// //           <motion.div
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.5, duration: 0.5 }}
// //           >
// //             <Link href="/">
// //               <Button className="rounded-full px-8 py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-300 group">
// //                 <Home className="w-4 h-4 mr-2" />
// //                 Return to Home
// //                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
// //               </Button>
// //             </Link>
// //           </motion.div>

// //           {/* Trust Message */}
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.6, duration: 0.5 }}
// //             className="mt-10"
// //           >
// //             <div className="inline-flex items-center gap-2 text-[10px] text-muted-foreground">
// //               <Compass className="w-3 h-3 text-amber-500" />
// //               <span>Need help? Contact our support team</span>
// //               <Link href="/contact" className="text-purple-600 font-black hover:underline">
// //                 Get Help
// //               </Link>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }










// // app/not-found.tsx
// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Home,
//   ArrowRight,
//   Search,
//   BookOpen,
//   Crown,
//   Shield,
//   Sparkles,
//   Compass,
//   MessageCircle,
//   GraduationCap,
//   TrendingUp,
//   Heart,
//   Zap,
//   Coffee,
//   Moon,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function NotFound() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mood, setMood] = useState<"lost" | "curious" | "hopeful">("lost");

//   // Rotate moods every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMood((prev) => {
//         if (prev === "lost") return "curious";
//         if (prev === "curious") return "hopeful";
//         return "lost";
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const moodMessages = {
//     lost: {
//       emoji: "🔍",
//       title: "Lost in the digital wilderness?",
//       description: "Even the best travelers take wrong turns. Let's get you back on track.",
//     },
//     curious: {
//       emoji: "📚",
//       title: "Looking for something specific?",
//       description: "Our scholars have organized sacred knowledge just for you.",
//     },
//     hopeful: {
//       emoji: "✨",
//       title: "Your journey continues here",
//       description: "Every ending is a new beginning. Let's find your path together.",
//     },
//   };

//   const currentMood = moodMessages[mood];

//   const popularPages = [
//     { href: "/courses/hifz", label: "Hifz Program", icon: Crown, color: "purple", trending: true },
//     { href: "/courses/tajweed", label: "Tajweed Mastery", icon: TrendingUp, color: "amber", trending: true },
//     { href: "/assessment", label: "Free Assessment", icon: Sparkles, color: "purple", trending: true },
//     { href: "/teachers", label: "Meet Our Scholars", icon: GraduationCap, color: "amber", trending: false },
//   ];

//   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
//     }
//   };

//   return (
//     <main className="relative bg-background overflow-hidden min-h-screen flex items-center justify-center">
//       {/* Premium Background Effects */}
//       <div className="hidden sm:block fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
//           style={{ backgroundSize: "300px" }}
//         />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-[200px]" />
        
//         {/* Floating particles */}
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
//             animate={{
//               y: [0, -50, 0],
//               x: [0, (i % 2 === 0 ? 30 : -30), 0],
//               opacity: [0, 0.4, 0],
//             }}
//             transition={{
//               duration: 5 + i,
//               repeat: Infinity,
//               delay: i * 0.8,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${10 + (i * 15)}%`,
//               top: `${20 + (i * 10)}%`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-16 xs:py-20 sm:py-24">
//         <div className="max-w-2xl mx-auto">
//           {/* Animated 404 with Mood Ring */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
//             animate={{ scale: 1, opacity: 1, rotateY: 0 }}
//             transition={{ duration: 0.8, type: "spring" }}
//             className="relative text-center mb-6"
//           >
//             <div className="relative inline-block">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 blur-3xl opacity-20 rounded-full" />
//               <div className="relative text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tighter bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
//                 404
//               </div>
//               <motion.div
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//                 className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
//               >
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Dynamic Mood Message */}
//           <motion.div
//             key={mood}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-6"
//           >
//             <div className="text-5xl mb-3">{currentMood.emoji}</div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter font-heading mb-2">
//               {currentMood.title}
//             </h1>
//             <p className="text-sm sm:text-base text-muted-foreground">
//               {currentMood.description}
//             </p>
//           </motion.div>

//           {/* Live Clock / Islamic Quote */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.15, duration: 0.5 }}
//             className="text-center mb-8"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-purple-200 dark:border-purple-800">
//               <Moon className="w-3 h-3 text-amber-500" />
//               <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
//                 "And whoever puts their trust in Allah, He will be enough for them" — Quran 65:3
//               </span>
//               <Coffee className="w-3 h-3 text-purple-600" />
//             </div>
//           </motion.div>

//           {/* Quick Actions Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="grid sm:grid-cols-2 gap-3 mb-8"
//           >
//             {popularPages.map((item, idx) => {
//               const Icon = item.icon;
//               const isPurple = item.color === "purple";
//               return (
//                 <Link
//                   key={idx}
//                   href={item.href}
//                   className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-300 transition-all bg-card hover:shadow-md"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
//                       <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
//                     </div>
//                     <div>
//                       <span className="font-black text-sm">{item.label}</span>
//                       {item.trending && (
//                         <div className="flex items-center gap-1">
//                           <Zap className="w-2.5 h-2.5 text-amber-500" />
//                           <span className="text-[8px] font-black text-amber-500">Trending</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
//                 </Link>
//               );
//             })}
//           </motion.div>

//           {/* Enhanced Search Bar with Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="relative max-w-md mx-auto">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 placeholder="Search courses, scholars, or topics..."
//                 className="w-full pl-11 pr-24 py-3 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
//               />
//               <button
//                 onClick={() => searchQuery.trim() && (window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[10px] font-black hover:from-purple-700 hover:to-purple-800 transition"
//               >
//                 Go
//               </button>
//             </div>
//           </motion.div>

//           {/* Help Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="mb-8"
//           >
//             <div className="bg-gradient-to-br from-purple-600/5 to-amber-500/5 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
//                     <Heart className="w-5 h-5 text-amber-500" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-black">Still can't find what you're looking for?</p>
//                     <p className="text-xs text-muted-foreground">Our team is here to help guide you.</p>
//                   </div>
//                 </div>
//                 <Link href="/contact">
//                   <Button variant="outline" className="rounded-full px-5 py-2 text-xs font-black border-purple-300 text-purple-600 hover:bg-purple-50">
//                     Contact Support
//                     <MessageCircle className="w-3.5 h-3.5 ml-1.5" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>

//           {/* Return Home Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//             className="flex flex-col sm:flex-row gap-3 justify-center"
//           >
//             <Link href="/">
//               <Button className="rounded-full px-6 sm:px-8 py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-300 group w-full sm:w-auto">
//                 <Home className="w-4 h-4 mr-2" />
//                 Return to Home
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//             <Link href="/assessment">
//               <Button variant="outline" className="rounded-full px-6 sm:px-8 py-3 font-black text-sm border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300 w-full sm:w-auto group">
//                 Start Free Assessment
//                 <Compass className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//           </motion.div>

//           {/* Fun Fact / Did You Know? */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             className="mt-10 text-center"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20">
//               <span className="text-sm">💡</span>
//               <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
//                 Did you know? Over 500 students have found their perfect teacher through our free assessment.
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </main>
//   );
// }




// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowRight,
  Search,
  BookOpen,
  Crown,
  Shield,
  Sparkles,
  Compass,
  MessageCircle,
  GraduationCap,
  TrendingUp,
  Heart,
  Zap,
  Moon,
  Star,
  Diamond,
  Gem,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mood, setMood] = useState<"lost" | "curious" | "hopeful">("lost");

  useEffect(() => {
    const interval = setInterval(() => {
      setMood((prev) => {
        if (prev === "lost") return "curious";
        if (prev === "curious") return "hopeful";
        return "lost";
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const moodMessages = {
    lost: {
      emoji: "🕊️",
      title: "A gentle detour",
      description: "Even the best journeys have unexpected turns. Let us guide you back.",
    },
    curious: {
      emoji: "✨",
      title: "Seeking sacred knowledge",
      description: "Your quest for understanding is honorable. Let us help you find what you seek.",
    },
    hopeful: {
      emoji: "🌟",
      title: "A new chapter awaits",
      description: "Every ending is a beautiful beginning. Your journey continues here.",
    },
  };

  const currentMood = moodMessages[mood];

  const quickLinks = [
    { href: "/", label: "Home", icon: Home, color: "purple" },
    { href: "/courses", label: "Courses", icon: BookOpen, color: "amber" },
    { href: "/teachers", label: "Scholars", icon: Crown, color: "purple" },
    { href: "/assessment", label: "Assessment", icon: Sparkles, color: "amber" },
    { href: "/contact", label: "Support", icon: MessageCircle, color: "purple" },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <main className="relative bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Mobile-friendly background - simplified */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "200px" }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-12 xs:py-16 sm:py-20 md:py-24 relative z-10">
        <div className="max-w-md mx-auto">
          {/* 404 Number - Mobile optimized */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 xs:mb-8"
          >
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 blur-2xl opacity-20 rounded-full" />
              
              {/* 404 Number */}
              <div className="relative flex items-center justify-center gap-1 xs:gap-2">
                <span className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                  4
                </span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 flex items-center justify-center shadow-xl"
                >
                  <span className="text-2xl xs:text-3xl sm:text-4xl font-black text-white">0</span>
                </motion.div>
                <span className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                  4
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mood Message - Mobile readable */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-5 xs:mb-6 sm:mb-8"
            >
              <div className="text-4xl xs:text-5xl mb-2 xs:mb-3">{currentMood.emoji}</div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tighter font-heading mb-2">
                {currentMood.title}
              </h1>
              <p className="text-sm xs:text-base text-muted-foreground px-2">
                {currentMood.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Quick Links Grid - Mobile optimized (2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-2 xs:gap-3 mb-6 xs:mb-8"
          >
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              const isPurple = item.color === "purple";
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex items-center justify-between p-3 xs:p-4 rounded-xl border border-border hover:border-purple-300 transition-all bg-card active:bg-muted/50"
                >
                  <div className="flex items-center gap-2 xs:gap-3">
                    <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                    </div>
                    <span className="font-black text-xs xs:text-sm">{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </motion.div>

          {/* Search Bar - Mobile friendly */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 xs:mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search courses, scholars..."
                className="w-full pl-11 pr-20 py-3 xs:py-3.5 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
              />
              <button
                onClick={() => searchQuery.trim() && (window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 xs:px-4 py-1 xs:py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[10px] xs:text-xs font-black active:scale-95 transition-all"
              >
                Go
              </button>
            </div>
          </motion.div>

          {/* Help Card - Mobile friendly */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 xs:mb-8"
          >
            <div className="p-4 xs:p-5 rounded-xl bg-gradient-to-br from-purple-600/5 to-amber-500/5 border border-purple-200 dark:border-purple-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs xs:text-sm font-black">Need help finding something?</p>
                    <p className="text-[10px] xs:text-xs text-muted-foreground">Our team is here for you</p>
                  </div>
                </div>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full rounded-full px-5 py-2 text-[10px] xs:text-xs font-black border-purple-300 text-purple-600 active:bg-purple-50">
                    Contact Support
                    <MessageCircle className="w-3 h-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Mobile first (full width, stacked) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Link href="/">
              <Button className="w-full rounded-full py-3 xs:py-3.5 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md active:scale-98 transition-all duration-300 group">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/assessment">
              <Button variant="outline" className="w-full rounded-full py-3 xs:py-3.5 font-black text-sm border-2 border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300 group">
                <Compass className="w-4 h-4 mr-2" />
                Start Free Assessment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badge - Mobile friendly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 xs:mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20">
              <span className="text-[10px] xs:text-xs">💎</span>
              <span className="text-[7px] xs:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Trusted by 500+ students worldwide
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-optimized CSS for active states */}
      <style jsx>{`
        @media (max-width: 640px) {
          .active\\:scale-98:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </main>
  );
}
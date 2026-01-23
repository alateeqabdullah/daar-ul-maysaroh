"use client";

<<<<<<< HEAD
import { motion } from "framer-motion";
import { PlayCircle, Star, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-background via-blue-50/30 to-green-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/islamic-pattern.svg')] opacity-5"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Rated 4.9/5 by 500+ Students</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold tracking-tight">
              Learn <span className="text-primary">Quran</span> with{" "}
              <span className="text-accent">Certified</span> Teachers
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Master Quran recitation, memorization, and Tajweed through
              personalized one-on-one sessions with Ijazah-certified teachers.
              Start your spiritual journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                <Link href="/auth/signup">Start Learning Free</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Introduction
              </Button>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { icon: Users, label: "Active Students", value: "500+" },
                { icon: Award, label: "Certified Teachers", value: "24+" },
                { icon: Clock, label: "Flexible Timing", value: "24/7" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 lg:p-12 border shadow-2xl relative">
              {/* Quran Book Illustration */}
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center">
                <div className="font-arabic text-4xl lg:text-5xl text-primary leading-loose mb-4">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </div>
                <p className="text-lg text-muted-foreground">
                  Begin your journey with the words of Allah
                </p>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              >
                <Award className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
              >
                <Star className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
=======
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Mouse Parallax for Interactive Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  // Parallax layers for background
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 1000], [0, -150]);

  // 3D Card Rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[110vh] flex items-center pt-32 pb-20 overflow-hidden bg-background"
    >
      {/* --- ELITE DYNAMIC BACKGROUND --- */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        {/* Divine Light Sunbeam */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-primary-700/10 blur-[160px] rounded-full pointer-events-none"
        />

        {/* Floating "Light" Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute w-2 h-2 bg-gold/40 rounded-full blur-[2px]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </motion.div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center relative z-10">
        {/* --- LEFT: INSTITUTIONAL CONTENT --- */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          {/* Elite Academy Badge */}
          <div className="relative inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl glass-surface border-white/20 text-primary-700 text-[11px] font-black tracking-[0.3em] uppercase shadow-2xl"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Al-Maysaroh International Institute
            </motion.div>
            <div className="absolute inset-0 bg-primary-700/20 blur-xl rounded-full" />
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] font-heading">
              Divine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-primary-700 to-primary-950 drop-shadow-sm">
                Connection.
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-xl font-medium font-sans italic opacity-80">
              {` "Connecting hearts to the Eternal Word through traditional
              scholarly excellence and modern digital sanctuary."`}
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <Link href="/courses">
              <Button
                size="lg"
                className="h-20 px-12 rounded-[2rem] text-lg font-black bg-primary-700 hover:bg-primary-800 text-white shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] transition-all group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  ADMISSIONS OPEN{" "}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-all" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  animate={{ x: ["-150%", "250%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </Button>
            </Link>

            <div className="flex items-center gap-6 px-4">
              <div className="h-12 w-px bg-border/50" />
              <div className="flex flex-col">
                <p className="text-[10px] font-black tracking-widest text-gold uppercase">
                  Scholarly Council
                </p>
                <p className="font-bold text-sm">Ijazah Verified</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: THE INTERACTIVE SACRED MANUSCRIPT --- */}
        <motion.div
          style={{ rotateX, rotateY, perspective: 1200 }}
          className="relative lg:h-[800px] flex items-center justify-center"
        >
          {/* Mystical Orbit Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-primary-700/10 rounded-full scale-[1.2] opacity-50"
          />

          <div className="w-full max-w-[600px] glass-surface rounded-[5rem] border-white/30 dark:border-white/5 p-12 lg:p-20 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] text-center relative overflow-hidden group">
            {/* Inner Glowing Core */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-700/10 blur-[100px] rounded-full group-hover:bg-primary-700/20 transition-all duration-1000" />

            {/* THE QURAN VERSE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10"
            >
              <div className="quran-monumental mb-12 selection:bg-gold/40 cursor-default">
                وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
              </div>

              <div className="space-y-10">
                <p className="text-4xl font-heading italic text-foreground/90 leading-[1.3] text-balance">
                  {`  "Verily, We have made this Quran `}
                  <span className="text-primary-700 not-italic font-black">
                    {`easy for remembrance.`}
                  </span>
                  {`"`}
                </p>

                <div className="flex items-center justify-center gap-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold" />
                  <div className="flex flex-col items-center">
                    <BookMarked className="w-5 h-5 text-gold mb-2" />
                    <p className="text-[12px] font-black text-gold uppercase tracking-[0.6em] whitespace-nowrap">
                      Surah Al-Qamar
                    </p>
                  </div>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold" />
                </div>
              </div>
            </motion.div>

            {/* INSTITUTIONAL LIVE STATS */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border/40 pt-12">
              <div className="space-y-1">
                <div className="text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
                  500+
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Noble Students
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
                  Global
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Network
                </div>
              </div>
            </div>

            {/* Floating Trust Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[9px] font-black tracking-widest uppercase">
                  Verified Traditional Sanad
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollY, [0, 100], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] font-black tracking-widest uppercase opacity-40">
          Begin Journey
        </p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-700 to-transparent" />
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
      </motion.div>
    </section>
  );
}

<<<<<<< HEAD


// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { PlayCircle, Star, Users, Award } from "lucide-react";

// const stats = [
//   { icon: Users, label: "Quran Students", value: "500+" },
//   { icon: Award, label: "Huffaz Graduated", value: "50+" },
//   { icon: Star, label: "Success Rate", value: "98%" },
// ];

// export function Hero() {
//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-background to-muted"
//     >
//       <div className="container mx-auto px-4 lg:px-6">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-6"
//           >
//             <h1 className="text-4xl lg:text-6xl font-heading font-bold tracking-tight">
//               Learn <span className="text-primary">Quran</span> with{" "}
//               <span className="text-accent">Personalized</span> Guidance
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl">
//               Al-Maysaroh Quran Institute offers exclusive one-on-one Quran
//               education with certified teachers. Master recitation,
//               memorization, and understanding with individualized attention.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button size="lg" className="text-lg px-8">
//                 Start Learning Today
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg px-8">
//                 <PlayCircle className="w-5 h-5 mr-2" />
//                 Watch Introduction
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-8 pt-8">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 + 0.5 }}
//                   className="text-center"
//                 >
//                   <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
//                   <div className="text-2xl font-bold text-foreground">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Visual Element */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="bg-primary/10 rounded-2xl p-8 lg:p-12 border border-primary/20">
//               <div className="text-center space-y-4">
//                 <div className="font-arabic text-4xl lg:text-6xl text-primary leading-loose">
//                   ﴾ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا ﴿
//                 </div>
//                 <p className="text-lg text-muted-foreground">
//                 {`  "And recite the Quran with measured recitation."`}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Surah Al-Muzzammil (73:4)
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
=======
// "use client";

// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import {
//   GraduationCap,
//   ArrowRight,
//   ShieldCheck,
//   ScrollText,
//   Globe,
//   Sparkles,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRef, useEffect } from "react";
// import Link from "next/link";

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Mouse Parallax Effect for the Sacred Manuscript
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
//   const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

//   const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
//   const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (rect) {
//       const x = (e.clientX - rect.left) / rect.width - 0.5;
//       const y = (e.clientY - rect.top) / rect.height - 0.5;
//       mouseX.set(x);
//       mouseY.set(y);
//     }
//   };

//   return (
//     <section
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background"
//     >
//       {/* --- MODERN BACKGROUND ARCHITECTURE --- */}
//       {/* 1. Subtle Islamic Pattern */}
//       <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

//       {/* 2. Animated Mesh Gradients (The Divine Light) */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.5, 0.3],
//           x: [0, 50, 0],
//           y: [0, -30, 0],
//         }}
//         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//         className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-primary-700/10 blur-[120px] rounded-full -z-10"
//       />
//       <motion.div
//         animate={{
//           scale: [1, 1.1, 1],
//           opacity: [0.2, 0.4, 0.2],
//           x: [0, -40, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "linear",
//           delay: 2,
//         }}
//         className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold/5 blur-[100px] rounded-full -z-10"
//       />

//       <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center relative z-10">
//         {/* --- LEFT: INSTITUTIONAL CONTENT --- */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="space-y-10"
//         >
//           {/* Badge */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 dark:bg-primary-950/30 backdrop-blur-md border border-primary-200/50 text-primary-700 text-[10px] font-black tracking-[0.25em] uppercase shadow-sm"
//           >
//             <Sparkles className="w-4 h-4 animate-pulse" />
//             <span>Traditional Excellence • Modern Mastery</span>
//           </motion.div>

//           <div className="space-y-4">
//             <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] font-heading">
//               Preserving <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-900">
//                 Sacred
//               </span>{" "}
//               <br />
//               Traditions.
//             </h1>
//             <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium font-sans border-l-4 border-gold/30 pl-6">
//               Al-Maysaroh is a world-class sanctuary for Hifz and Tajweed,
//               bridging the gap between classical scholarly Sanad and
//               21st-century digital accessibility.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-5">
//             <Link href="/courses">
//               <Button
//                 size="lg"
//                 className="h-16 px-10 rounded-2xl text-md font-bold bg-primary-700 hover:bg-primary-800 text-white shadow-[0_20px_50px_rgba(124,58,237,0.3)] transition-all group overflow-hidden relative"
//               >
//                 <span className="relative z-10 flex items-center">
//                   ADMISSIONS 2026{" "}
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all" />
//                 </span>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                   animate={{ x: ["-100%", "200%"] }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//               </Button>
//             </Link>
//             <Link href="/methodology">
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="h-16 px-10 rounded-2xl text-md font-bold border-2 hover:bg-primary-50 transition-all"
//               >
//                 OUR METHODOLOGY
//               </Button>
//             </Link>
//           </div>

//           {/* Institutional Trust Indicators */}
//           <div className="flex flex-wrap items-center gap-8 pt-6">
//             <div className="flex items-center gap-4 group">
//               <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm border flex items-center justify-center group-hover:border-accent transition-colors">
//                 <ShieldCheck className="w-6 h-6 text-accent" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
//                   Certified
//                 </p>
//                 <p className="text-sm font-bold">Ijazah Sanad</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 group">
//               <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-sm border flex items-center justify-center group-hover:border-primary-700 transition-colors">
//                 <Globe className="w-6 h-6 text-primary-700" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
//                   Global Reach
//                 </p>
//                 <p className="text-sm font-bold">50+ Nations</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* --- RIGHT: THE SACRED MANUSCRIPT (3D INTERACTIVE CARD) --- */}
//         <motion.div
//           style={{ rotateX, rotateY, perspective: 1000 }}
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="relative lg:h-[750px] flex items-center justify-center"
//         >
//           {/* Outer Glow Ring */}
//           <div className="absolute inset-0 bg-primary-700/5 rounded-[4.5rem] blur-3xl animate-pulse" />

//           <div className="w-full max-w-[550px] bg-white/70 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[4rem] border border-white/40 dark:border-white/10 p-10 lg:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] text-center relative overflow-hidden group">
//             {/* Animated Border Gradient */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-primary-700/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

//             {/* THE QURAN VERSE */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="relative z-10"
//             >
//               {/* Massive Calligraphy */}
//               <div className="quran-monumental mb-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] selection:bg-gold/30">
//                 بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
//               </div>

//               <div className="space-y-8">
//                 <p className="text-3xl font-heading italic text-foreground/80 leading-snug text-balance">
//                   "Truly, this Quran guides to that which is{" "}
//                   <span className="text-primary-700 not-italic font-black">
//                     most upright.
//                   </span>
//                   "
//                 </p>

//                 <div className="flex items-center justify-center gap-6">
//                   <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
//                   <p className="text-[11px] font-black text-gold uppercase tracking-[0.5em] whitespace-nowrap">
//                     Surah Al-Isra: 9
//                   </p>
//                   <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* LIVE ACTIVITY STATUS */}
//             <div className="mt-16 flex items-center justify-center gap-10">
//               <div className="relative">
//                 <div className="text-4xl font-black text-primary-700 tabular-nums tracking-tighter">
//                   500<span className="text-gold">+</span>
//                 </div>
//                 <div className="text-[9px] font-black uppercase tracking-widest opacity-40">
//                   Active Students
//                 </div>
//               </div>
//               <div className="w-px h-10 bg-border/50" />
//               <div className="relative">
//                 <div className="text-4xl font-black text-primary-700 tabular-nums tracking-tighter">
//                   24<span className="text-gold">/</span>7
//                 </div>
//                 <div className="text-[9px] font-black uppercase tracking-widest opacity-40">
//                   Scholarly Support
//                 </div>
//               </div>
//             </div>

//             {/* Verified Seal */}
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
//               <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
//                 <ScrollText className="w-4 h-4 text-gold" />
//                 <span className="text-[8px] font-black tracking-widest uppercase">
//                   Traditional Sanad Authenticated
//                 </span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
//       </div>
//     </section>
//   );
// }

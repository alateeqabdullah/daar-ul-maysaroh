// "use client";

// import { Button } from "@/components/ui/button";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   ArrowRight,
//   Award,
//   BookMarked,
//   ShieldCheck,
//   Sparkles,
//   Users
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// export function Hero() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile on mount
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // ALWAYS call hooks unconditionally
//   const bgY = useTransform(scrollY, [0, 500], [0, 200]);
//   const textY = useTransform(scrollY, [0, 500], [0, -50]);
//   const rotateX = useTransform(scrollY, [0, 500], ["0deg", "2deg"]);
//   const rotateY = useTransform(scrollY, [0, 500], ["0deg", "2deg"]);
//   const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

//   // Get values for conditional use
//   const bgYValue = isMobile ? 0 : bgY;
//   const textYValue = isMobile ? 0 : textY;
//   const rotateXValue = isMobile ? "0deg" : rotateX;
//   const rotateYValue = isMobile ? "0deg" : rotateY;
//   const perspectiveValue = isMobile ? 0 : 1200;

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen md:min-h-[110vh] flex items-center pt-20 md:pt-32 pb-10 md:pb-20 overflow-hidden bg-background"
//     >
//       {/* --- BACKGROUND (unchanged) --- */}
//       <motion.div style={{ y: bgYValue }} className="absolute inset-0 z-0">
//         {/* Simplified Divine Light */}
//         <motion.div
//           animate={
//             isMobile
//               ? {}
//               : {
//                   scale: [1, 1.1, 1],
//                   opacity: [0.1, 0.15, 0.1],
//                 }
//           }
//           transition={isMobile ? {} : { duration: 8, repeat: Infinity }}
//           className="absolute top-1/4 left-1/2 md:left-1/3 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary-700/5 md:bg-primary-700/10 blur-[60px] md:blur-[160px] rounded-full pointer-events-none -translate-x-1/2 md:translate-x-0"
//         />

//         {/* Reduced particles for mobile */}
//         {[...Array(isMobile ? 3 : 6)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               y: [0, -50, 0],
//               opacity: [0, 0.3, 0],
//               rotate: [0, 180],
//             }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               delay: i * 1.5,
//             }}
//             className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-gold/30 md:bg-gold/40 rounded-full blur-[1px] md:blur-[2px]"
//             style={{
//               left: `${isMobile ? 10 + i * 25 : 15 + i * 15}%`,
//               top: `${isMobile ? 30 + i * 15 : 20 + i * 10}%`,
//             }}
//           />
//         ))}

//         <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] md:opacity-[0.03] mask-[linear-gradient(to_bottom,black,transparent)] scale-150 md:scale-100" />
//       </motion.div>

//       <div className="container mx-auto px-4 sm:px-6 -grid md:-grid lg:grid lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-center relative z-10">
//         {/* --- LEFT: PERFECTED CONTENT FOR ADULTS --- */}
//         <motion.div
//           style={{ y: textYValue }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="space-y-6 md:space-y-8 order-2 lg:order-1"
//         >
//           {/* Elite Academy Badge */}
//           <div className="relative pt-16 inline-block">
//             <motion.div
//               whileHover={isMobile ? {} : { scale: 1.05 }}
//               className="relative z-10 inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl glass-surface border-white/10 md:border-white/20 text-primary-700 text-[10px] md:text-[11px] font-bold md:font-black tracking-[0.2em] md:tracking-[0.3em] uppercase shadow-lg md:shadow-2xl"
//             >
//               <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
//               <h1 className="whitespace-nowrap">AL-MAYSAROH INSTITUTE</h1>
//             </motion.div>
//             <div className="absolute inset-0 bg-primary-700/10 md:bg-primary-700/20 blur-lg md:blur-xl rounded-full" />
//           </div>

//           {/* HEADLINE - Sophisticated & Aspirational */}
//           <div className="space-y-4 md:space-y-5">
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] font-heading">
//               Not Just Quran Classes. <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-primary-600 to-primary-800">
//                 A Personal Connection to the Quran...
//               </span>
//             </h2>

//             {/* SUBHEADING - Benefits for Adults */}
//             <p className="text-lg text-muted-foreground max-w-lg">
//               Connection leads to consistency. Consistency leads to mastery.
//               Help your child build a relationship with the Quran that keeps
//               them engaged, motivated, and progressing through authentic
//               Sanad-based learning.
//             </p>

//             {/* UNIQUE VALUE PROPOSITION - Credibility */}
//             <p className="text-sm md:text-base text-muted-foreground/80 border-l-2 border-gold/50 pl-4 py-1">
//               <span className="font-semibold">1400-year unbroken chain</span> to
//               Prophet Muhammad (ﷺ) • 1-on-1 with certified scholars
//             </p>
//           </div>

//           {/* SOCIAL PROOF - Trust Indicators */}
//           <div className="flex flex-wrap items-center gap-6 pt-2">
//             <div className="flex items-center gap-3">
//               <div className="flex -space-x-3">
//                 {[...Array(4)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 border-2 border-background shadow-lg"
//                   />
//                 ))}
//               </div>
//               <div className="text-sm md:text-base">
//                 <span className="font-black text-primary-700">100+</span>{" "}
//                 <span className="text-muted-foreground">students taught</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Award className="w-4 h-4 md:w-5 md:h-5 text-gold" />
//               <span className="text-xs md:text-sm text-muted-foreground">
//                 <span className="font-semibold text-foreground">90%</span>{" "}
//                 completion rate
//               </span>
//             </div>
//           </div>

//           {/* CALL TO ACTION - Refined */}
//           <div className="flex flex-col pb-8 sm:flex-row flex-wrap gap-4 md:gap-6 pt-4">
//             <Link href="/courses" className="w-full sm:w-auto">
//               <Button
//                 size={isMobile ? "default" : "lg"}
//                 className="h-14 sm:h-16 md:h-20 w-full sm:w-auto px-6 sm:px-8 md:px-12 rounded-3xl md:rounded-4xl text-sm md:text-md font-bold md:font-black bg-primary-700 hover:bg-primary-800 text-white shadow-lg md:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] transition-all group overflow-hidden relative"
//               >
//                 <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2">
//                   SCHEDULE ASSESSMENT{" "}
//                   <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-all" />
//                 </span>
//                 {!isMobile && (
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                     animate={{ x: ["-150%", "250%"] }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                   />
//                 )}
//               </Button>
//             </Link>

//             <div className="flex items-center gap-4 md:gap-6 px-0 sm:px-4">
//               <div className="h-8 md:h-12 w-px bg-border/50" />
//               <div className="flex flex-col">
//                 <p className="text-[10px] md:text-[10px] font-bold md:font-black tracking-wider md:tracking-widest text-gold uppercase">
//                   Free Assessment
//                 </p>
//                 <p className="font-semibold md:font-bold text-sm">
//                   No obligation
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* TRUST INDICATORS */}
//           <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
//             <div className="flex items-center gap-2">
//               <ShieldCheck className="w-4 h-4 text-accent" />
//               <span>Ijazah Certification</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Users className="w-4 h-4 text-accent" />
//               <span>1-on-1 Instruction</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Sparkles className="w-4 h-4 text-accent" />
//               <span>30-Day Guarantee</span>
//             </div>
//           </div>

//           {/* PARENTS NOTE - Optional, only if needed */}
//           <div className="text-xs text-muted-foreground/60 italic pt-2 pb-4 border-t border-border/20">
//             Programs available for adults, professionals, and children (ages 5+)
//           </div>
//         </motion.div>

//         {/* --- RIGHT: SACRED MANUSCRIPT (unchanged) --- */}
//         <motion.div
//           style={{
//             rotateX: rotateXValue,
//             rotateY: rotateYValue,
//             perspective: perspectiveValue,
//           }}
//           className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
//         >
//           {/* Simplified orbit for mobile */}
//           {!isMobile && (
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-0 border border-primary-700/10 rounded-full scale-[1.2] opacity-50 hidden md:block"
//             />
//           )}

//           <div className="w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] glass-surface rounded-3xl md:rounded-[5rem] border-white/20 md:border-white/30 dark:border-white/5 p-6 sm:p-8 md:p-12 lg:p-20 shadow-xl md:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] text-center relative overflow-hidden group">
//             {/* Mobile-optimized inner glow */}
//             <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-32 h-32 md:w-64 md:h-64 bg-primary-700/5 md:bg-primary-700/10 blur-2xl md:blur-[100px] rounded-full group-hover:bg-primary-700/10 md:group-hover:bg-primary-700/20 transition-all duration-1000" />

//             {/* THE QURAN VERSE */}
//               <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//               className="relative z-10"
//             >
//               <div className="quran-monumental text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-12 selection:bg-gold/40 cursor-default leading-relaxed">
//                 وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
//               </div>

//               <div className="space-y-6 md:space-y-10">
//                 <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-heading italic text-foreground/90 leading-[1.4] md:leading-[1.3] text-balance px-2">
//                   {`"Verily, We have made this Quran `}
//                   <span className="text-primary-700 not-italic font-bold md:font-black">
//                     {`easy for remembrance.`}
//                   </span>
//                   {`"`}
//                 </p>

//                 <div className="flex items-center justify-center gap-4 md:gap-8">
//                   <div className="h-px md:h-0.5 flex-1 bg-linear-to-r from-transparent via-gold/30 md:via-gold/50 to-gold" />
//                   <div className="flex flex-col items-center min-w-[100px]">
//                     <BookMarked className="w-4 h-4 md:w-5 md:h-5 text-gold mb-1 md:mb-2" />
//                     <p className="text-[10px] md:text-[12px] font-bold md:font-black text-gold uppercase tracking-[0.3em] md:tracking-[0.6em] whitespace-nowrap">
//                       Surah Al-Qamar
//                     </p>
//                   </div>
//                   <div className="h-px md:h-0.5 flex-1 bg-linear-to-l from-transparent via-gold/30 md:via-gold/50 to-gold" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* STATS */}
//             <div className="mt-8 md:mt-16 grid grid-cols-2 gap-4 md:gap-8 border-t border-border/30 md:border-border/40 pt-6 md:pt-12">
//               <div className="space-y-1">
//                 <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
//                   1400+
//                 </div>
//                 <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
//                   Years of Sanad
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
//                   Global
//                 </div>
//                 <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
//                   Network of Scholars
//                 </div>
//               </div>
//             </div>

//             {/* Trust Indicator */}
//             <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
//               <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-sm md:backdrop-blur-md">
//                 <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-accent" />
//                 <span className="text-[8px] md:text-[9px] font-bold md:font-black tracking-wider md:tracking-widest uppercase">
//                   Authentic Sanad
//                 </span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       {!isMobile && (
//         <motion.div
//           style={{ opacity: scrollIndicatorOpacity }}
//           className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         >
//           <p className="text-[10px] font-black tracking-widest uppercase opacity-40">
//             Discover Your Path
//           </p>
//           <div className="w-px h-8 md:h-12 bg-linear-to-b from-primary-700 to-transparent" />
//         </motion.div>
//       )}
//     </section>
//   );
// }



"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookMarked,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference (must be in useEffect)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionPreference = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreference);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  // ALWAYS call hooks unconditionally
  const bgY = useTransform(scrollY, [0, 500], [0, 200]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const rotateX = useTransform(scrollY, [0, 500], ["0deg", "2deg"]);
  const rotateY = useTransform(scrollY, [0, 500], ["0deg", "2deg"]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Get values for conditional use
  const bgYValue = isMobile ? 0 : bgY;
  const textYValue = isMobile ? 0 : textY;
  const rotateXValue = isMobile ? "0deg" : rotateX;
  const rotateYValue = isMobile ? "0deg" : rotateY;
  const perspectiveValue = isMobile ? 0 : 1200;

  const shouldAnimate = mounted && !prefersReducedMotion && !isMobile;

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative min-h-screen md:min-h-[110vh] flex items-center pt-16 xs:pt-20 sm:pt-24 md:pt-32 pb-10 xs:pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-background",
        className,
      )}
    >
      {/* --- BACKGROUND --- */}
      <motion.div
        style={{ y: bgYValue }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Divine Light - Purple Glow */}
        <motion.div
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.08, 0.12, 0.08],
                }
              : { opacity: 0.08 }
          }
          transition={!shouldAnimate ? {} : { duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 md:left-1/3 w-[300px] md:w-[600px] lg:w-[800px] h-[300px] md:h-[600px] lg:h-[800px] bg-purple-600/5 md:bg-purple-600/10 blur-[60px] md:blur-[120px] lg:blur-[160px] rounded-full -translate-x-1/2 md:translate-x-0"
        />

        {/* Divine Light - Amber Glow */}
        <motion.div
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.15, 1],
                  opacity: [0.05, 0.08, 0.05],
                }
              : { opacity: 0.05 }
          }
          transition={
            !shouldAnimate ? {} : { duration: 10, repeat: Infinity, delay: 2 }
          }
          className="absolute bottom-1/4 right-1/2 md:right-1/3 w-[250px] md:w-[500px] lg:w-[600px] h-[250px] md:h-[500px] lg:h-[600px] bg-amber-500/5 md:bg-amber-500/8 blur-[60px] md:blur-[100px] lg:blur-[140px] rounded-full translate-x-1/2 md:translate-x-0"
        />

        {/* Reduced particles for mobile */}
        {shouldAnimate &&
          [...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -60, 0],
                x: [0, i % 2 === 0 ? 30 : -30, 0],
                opacity: [0, 0.3, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut",
              }}
              className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full blur-[1px] ${
                i % 2 === 0
                  ? "bg-purple-500/30 sm:bg-purple-500/40"
                  : "bg-amber-500/30 sm:bg-amber-500/40"
              }`}
              style={{
                left: `${isMobile ? 10 + (i % 4) * 25 : 5 + ((i * 10) % 90)}%`,
                top: `${isMobile ? 20 + (i % 3) * 30 : 10 + ((i * 12) % 80)}%`,
              }}
            />
          ))}

        {/* Islamic Pattern - Fixed mask for cross-browser compatibility */}
        <div
          className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-center bg-repeat opacity-[0.02] sm:opacity-[0.03] pointer-events-none"
          style={{
            backgroundSize: isMobile ? "200px" : "300px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />

        {/* Edge Fade Gradients */}
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-center relative z-10">
        {/* --- LEFT: CONTENT --- */}
        <motion.div
          style={{ y: textYValue }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 order-2 lg:order-1"
        >
          {/* Elite Academy Badge */}
          <div className="relative pt-12 xs:pt-14 sm:pt-16 inline-block">
            <motion.div
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2 md:gap-3 px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2 md:py-2.5 rounded-xl md:rounded-2xl bg-card/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 text-purple-700 text-[9px] xs:text-[10px] sm:text-[10px] md:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase shadow-lg"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="whitespace-nowrap">AL-MAYSAROH INSTITUTE</span>
            </motion.div>
            <div className="absolute inset-0 bg-purple-600/10 blur-xl rounded-full" />
          </div>

          {/* HEADLINE */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-4 md:space-y-5">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] font-heading">
              Not Just Quran Classes. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-purple-600 to-purple-800">
                A Personal Connection to the Quran...
              </span>
            </h1>

            {/* SUBHEADING */}
            <p className="text-sm xs:text-base sm:text-base md:text-lg text-muted-foreground max-w-lg">
              Connection leads to consistency. Consistency leads to mastery.
              Build a relationship with the Quran that keeps you engaged,
              motivated, and progressing through authentic Sanad-based learning.
            </p>

            {/* UNIQUE VALUE PROPOSITION */}
            <p className="text-xs xs:text-sm md:text-base text-muted-foreground/80 border-l-2 border-amber-500/50 pl-3 xs:pl-4 py-1">
              <span className="font-semibold">1400-year unbroken chain</span> to
              Prophet Muhammad (ﷺ) • 1-on-1 with certified scholars
            </p>
          </div>

          {/* SOCIAL PROOF */}
          <div className="flex flex-wrap items-center gap-4 xs:gap-5 sm:gap-6 pt-1 xs:pt-2">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="flex -space-x-2 xs:-space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-background shadow-lg"
                  />
                ))}
              </div>
              <div className="text-xs xs:text-sm sm:text-sm md:text-base">
                <span className="font-black text-purple-600">100+</span>{" "}
                <span className="text-muted-foreground">students taught</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2">
              <Award className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-amber-500" />
              <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">90%</span>{" "}
                completion rate
              </span>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 xs:gap-4 sm:gap-5 md:gap-6 pt-2 xs:pt-3 sm:pt-4 pb-6 xs:pb-7 sm:pb-8">
            <Link href="/courses" className="w-full xs:w-auto">
              <Button
                size={isMobile ? "default" : "lg"}
                className="h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 w-full xs:w-auto px-5 xs:px-6 sm:px-7 md:px-10 lg:px-12 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl text-xs xs:text-sm sm:text-sm md:text-base font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2">
                  SCHEDULE ASSESSMENT{" "}
                  <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 group-hover:translate-x-1 transition-all" />
                </span>
                {shouldAnimate && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </Button>
            </Link>

            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 px-0 xs:px-2 sm:px-4">
              <div className="h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 w-px bg-border/50" />
              <div className="flex flex-col">
                <p className="text-[8px] xs:text-[9px] sm:text-[9px] md:text-[10px] font-black tracking-wider text-amber-500 uppercase">
                  Free Assessment
                </p>
                <p className="font-semibold text-[10px] xs:text-xs sm:text-xs md:text-sm">
                  No obligation
                </p>
              </div>
            </div>
          </div>

          {/* TRUST INDICATORS */}
          <div className="flex flex-wrap items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 text-[10px] xs:text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <ShieldCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-500" />
              <span>Ijazah Certification</span>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-500" />
              <span>1-on-1 Instruction</span>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-500" />
              <span>30-Day Guarantee</span>
            </div>
          </div>

          {/* PARENTS NOTE */}
          <div className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground/60 italic pt-2 pb-4 border-t border-border/20">
            Programs available for adults, professionals, and children (ages 5+)
          </div>
        </motion.div>

        {/* --- RIGHT: SACRED MANUSCRIPT --- */}
        <motion.div
          style={{
            rotateX: rotateXValue,
            rotateY: rotateYValue,
            perspective: perspectiveValue,
          }}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          {/* Simplified orbit for mobile */}
          {!isMobile && shouldAnimate && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-purple-600/10 rounded-full scale-[1.2] opacity-50 hidden md:block"
            />
          )}

          <div className="institutional-card w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] rounded-3xl md:rounded-[5rem] border border-purple-200 dark:border-purple-800 p-6 sm:p-8 md:p-12 lg:p-20 shadow-xl md:shadow-2xl text-center relative overflow-hidden group bg-gradient-to-br from-background to-purple-50/10">
            {/* Inner glow */}
            <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-32 h-32 md:w-64 md:h-64 bg-purple-600/5 md:bg-purple-600/10 blur-2xl md:blur-[100px] rounded-full group-hover:bg-purple-600/10 md:group-hover:bg-purple-600/20 transition-all duration-1000" />

            {/* THE QURAN VERSE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <div className="quran-monumental text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-12 selection:bg-amber-500/40 cursor-default leading-relaxed">
                وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
              </div>

              <div className="space-y-6 md:space-y-10">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-heading italic text-foreground/90 leading-[1.4] md:leading-[1.3] text-balance px-2">
                  {`"Verily, We have made this Quran `}
                  <span className="text-purple-600 not-italic font-bold md:font-black">
                    {`easy for remembrance.`}
                  </span>
                  {`"`}
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="h-px md:h-0.5 flex-1 bg-gradient-to-r from-transparent via-amber-500/30 md:via-amber-500/50 to-amber-500" />
                  <div className="flex flex-col items-center min-w-[100px]">
                    <BookMarked className="w-4 h-4 md:w-5 md:h-5 text-amber-500 mb-1 md:mb-2" />
                    <p className="text-[10px] md:text-[12px] font-bold md:font-black text-amber-500 uppercase tracking-[0.3em] md:tracking-[0.6em] whitespace-nowrap">
                      Surah Al-Qamar
                    </p>
                  </div>
                  <div className="h-px md:h-0.5 flex-1 bg-gradient-to-l from-transparent via-amber-500/30 md:via-amber-500/50 to-amber-500" />
                </div>
              </div>
            </motion.div>

            {/* STATS */}
            <div className="mt-8 md:mt-16 grid grid-cols-2 gap-4 md:gap-8 border-t border-border/30 md:border-border/40 pt-6 md:pt-12">
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-black text-purple-600 tracking-tighter tabular-nums">
                  1400+
                </div>
                <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Years of Sanad
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-black text-purple-600 tracking-tighter tabular-nums">
                  Global
                </div>
                <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Network of Scholars
                </div>
              </div>
            </div>

            {/* Trust Indicator */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-sm md:backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                <span className="text-[8px] md:text-[9px] font-bold md:font-black tracking-wider md:tracking-widest uppercase">
                  Authentic Sanad
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {shouldAnimate && (
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 xs:gap-1.5 sm:gap-2"
        >
          <p className="text-[8px] xs:text-[9px] sm:text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-40">
            Discover Your Path
          </p>
          <div className="w-px h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-purple-700 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
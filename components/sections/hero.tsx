"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen md:min-h-[110vh] flex items-center pt-20 md:pt-32 pb-10 md:pb-20 overflow-hidden bg-background"
    >
      {/* --- MOBILE-OPTIMIZED BACKGROUND --- */}
      <motion.div style={{ y: bgYValue }} className="absolute inset-0 z-0">
        {/* Simplified Divine Light */}
        <motion.div
          animate={
            isMobile
              ? {}
              : {
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.15, 0.1],
                }
          }
          transition={isMobile ? {} : { duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 md:left-1/3 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary-700/5 md:bg-primary-700/10 blur-[60px] md:blur-[160px] rounded-full pointer-events-none -translate-x-1/2 md:translate-x-0"
        />

        {/* Reduced particles for mobile */}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.3, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-gold/30 md:bg-gold/40 rounded-full blur-[1px] md:blur-[2px]"
            style={{
              left: `${isMobile ? 10 + i * 25 : 15 + i * 15}%`,
              top: `${isMobile ? 30 + i * 15 : 20 + i * 10}%`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] md:opacity-[0.03] mask-[linear-gradient(to_bottom,black,transparent)] scale-150 md:scale-100" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 -grid md:-grid lg:grid lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-center relative z-10">
        {/* --- LEFT: INSTITUTIONAL CONTENT --- */}
        <motion.div
          style={{ y: textYValue }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 md:space-y-12 order-2 lg:order-1"
        >
          {/* Elite Academy Badge - Mobile optimized */}
          <div className="relative pt-16 inline-block">
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="relative z-10 inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl glass-surface border-white/10 md:border-white/20 text-primary-700 text-[10px] md:text-[11px] font-bold md:font-black tracking-[0.2em] md:tracking-[0.3em] uppercase shadow-lg md:shadow-2xl"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
              <span className="whitespace-nowrap">Al-Maysaroh</span>
            </motion.div>
            <div className="absolute inset-0 bg-primary-700/10 md:bg-primary-700/20 blur-lg md:blur-xl rounded-full" />
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] font-heading">
              Divine <br />
              <span className="text-transparent bg-clip-text bg-linear-to-br from-gold via-primary-700 to-primary-950 drop-shadow-sm">
                Connection.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed md:leading-relaxed max-w-lg font-medium font-sans italic opacity-80">
              {`"Connecting hearts to the Eternal Word through traditional scholarly excellence."`}
            </p>
          </div>

          <div className="flex flex-col pb-20 sm:flex-row flex-wrap gap-4 md:gap-6">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button
                size={isMobile ? "default" : "lg"}
                className="h-14 sm:h-16 md:h-20 w-full sm:w-auto px-6 sm:px-8 md:px-12 rounded-3xl md:rounded-4xl text-sm md:text-md font-bold md:font-black bg-primary-700 hover:bg-primary-800 text-white shadow-lg md:shadow-[0_30px_60px_-15px_rgba(124,58,237,0.4)] transition-all group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center sm:justify-start gap-2">
                  ADMISSIONS OPEN{" "}
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-all" />
                </span>
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-150%", "250%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </Button>
            </Link>

            <div className="flex items-center gap-4 md:gap-6 px-0 sm:px-4">
              <div className="h-8 md:h-12 w-px bg-border/50" />
              <div className="flex flex-col">
                <p className="text-[10px] md:text-[10px] font-bold md:font-black tracking-wider md:tracking-widest text-gold uppercase">
                  Scholarly Council
                </p>
                <p className="font-semibold md:font-bold text-sm">
                  Ijazah Verified
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: MOBILE-OPTIMIZED SACRED MANUSCRIPT --- */}
        <motion.div
          style={{
            rotateX: rotateXValue,
            rotateY: rotateYValue,
            perspective: perspectiveValue,
          }}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          {/* Simplified orbit for mobile */}
          {!isMobile && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-primary-700/10 rounded-full scale-[1.2] opacity-50 hidden md:block"
            />
          )}

          <div className="w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] glass-surface rounded-3xl md:rounded-[5rem] border-white/20 md:border-white/30 dark:border-white/5 p-6 sm:p-8 md:p-12 lg:p-20 shadow-xl md:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] text-center relative overflow-hidden group">
            {/* Mobile-optimized inner glow */}
            <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-32 h-32 md:w-64 md:h-64 bg-primary-700/5 md:bg-primary-700/10 blur-2xl md:blur-[100px] rounded-full group-hover:bg-primary-700/10 md:group-hover:bg-primary-700/20 transition-all duration-1000" />

            {/* THE QURAN VERSE - Mobile responsive */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <div className="quran-monumental text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-12 selection:bg-gold/40 cursor-default leading-relaxed">
                وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
              </div>

              <div className="space-y-6 md:space-y-10">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-heading italic text-foreground/90 leading-[1.4] md:leading-[1.3] text-balance px-2">
                  {`"Verily, We have made this Quran `}
                  <span className="text-primary-700 not-italic font-bold md:font-black">
                    {`easy for remembrance.`}
                  </span>
                  {`"`}
                </p>

                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="h-px md:h-0.5 flex-1 bg-linear-to-r from-transparent via-gold/30 md:via-gold/50 to-gold" />
                  <div className="flex flex-col items-center min-w-[100px]">
                    <BookMarked className="w-4 h-4 md:w-5 md:h-5 text-gold mb-1 md:mb-2" />
                    <p className="text-[10px] md:text-[12px] font-bold md:font-black text-gold uppercase tracking-[0.3em] md:tracking-[0.6em] whitespace-nowrap">
                      Surah Al-Qamar
                    </p>
                  </div>
                  <div className="h-px md:h-0.5 flex-1 bg-linear-to-l from-transparent via-gold/30 md:via-gold/50 to-gold" />
                </div>
              </div>
            </motion.div>

            {/* MOBILE-OPTIMIZED STATS */}
            <div className="mt-8 md:mt-16 grid grid-cols-2 gap-4 md:gap-8 border-t border-border/30 md:border-border/40 pt-6 md:pt-12">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
                  500+
                </div>
                <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Noble Students
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-700 tracking-tighter tabular-nums">
                  Global
                </div>
                <div className="text-[10px] md:text-[10px] font-bold md:font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Network
                </div>
              </div>
            </div>

            {/* Mobile-optimized Trust Indicator */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-sm md:backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                <span className="text-[8px] md:text-[9px] font-bold md:font-black tracking-wider md:tracking-widest uppercase">
                  Verified Sanad
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simplified Scroll Indicator for Mobile */}
      {!isMobile && (
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] font-black tracking-widest uppercase opacity-40">
            Begin Journey
          </p>
          <div className="w-px h-8 md:h-12 bg-linear-to-b from-primary-700 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}




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
//       </div>
//     </section>
//   );
// }

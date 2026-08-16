// app/(marketing)/physical/components/sections/PhysicalHero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Users,
  Building2,
  MapPin,
  Crown,
  Clock,
  GraduationCap,
  Heart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.png";

interface PhysicalHeroProps {
  className?: string;
}

export function PhysicalHero({ className }: PhysicalHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const bgYValue = isMobile ? 0 : bgY;
  const textYValue = isMobile ? 0 : textY;
  const rotateXValue = isMobile ? "0deg" : rotateX;
  const rotateYValue = isMobile ? "0deg" : rotateY;
  const scaleValue = isMobile ? 1 : scale;
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
                  opacity: [0.08, 0.15, 0.08],
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
                  opacity: [0.05, 0.1, 0.05],
                }
              : { opacity: 0.05 }
          }
          transition={
            !shouldAnimate ? {} : { duration: 10, repeat: Infinity, delay: 2 }
          }
          className="absolute bottom-1/4 right-1/2 md:right-1/3 w-[250px] md:w-[500px] lg:w-[600px] h-[250px] md:h-[500px] lg:h-[600px] bg-amber-500/5 md:bg-amber-500/8 blur-[60px] md:blur-[100px] lg:blur-[140px] rounded-full translate-x-1/2 md:translate-x-0"
        />

        {/* Premium Particles - More elegant */}
        {shouldAnimate &&
          [...Array(isMobile ? 6 : 12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -80, 0],
                x: [0, i % 2 === 0 ? 40 : -40, 0],
                opacity: [0, 0.4, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + (i % 5),
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
              className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full blur-[1px] ${
                i % 3 === 0
                  ? "bg-purple-500/40 sm:bg-purple-500/50"
                  : i % 3 === 1
                    ? "bg-amber-500/40 sm:bg-amber-500/50"
                    : "bg-white/30 sm:bg-white/40"
              }`}
              style={{
                left: `${isMobile ? 5 + (i % 6) * 18 : 2 + ((i * 8) % 95)}%`,
                top: `${isMobile ? 10 + (i % 5) * 20 : 5 + ((i * 9) % 85)}%`,
              }}
            />
          ))}

        {/* Premium Islamic Pattern - Enhanced opacity */}
        <div
          className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-center bg-repeat opacity-[0.03] sm:opacity-[0.04] pointer-events-none"
          style={{
            backgroundSize: isMobile ? "180px" : "250px",
            maskImage:
              "radial-linear(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-linear(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* Edge Fade linears */}
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-background to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-center relative z-10">
        {/* --- LEFT: CONTENT --- */}
        <motion.div
          style={{ y: textYValue }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 order-2 lg:order-1"
        >
          {/* Premium Badge */}
          <div className="relative pt-12 xs:pt-14 sm:pt-16 inline-block">
            <motion.div
              whileHover={!isMobile ? { scale: 1.03, y: -2 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10 inline-flex items-center gap-2 sm:gap-2 md:gap-3 px-4 xs:px-5 sm:px-5 md:px-6 py-2 xs:py-2 sm:py-2 md:py-2.5 rounded-2xl md:rounded-2xl bg-card/80 backdrop-blur-lg border border-purple-200 dark:border-purple-800 shadow-xl"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <MapPin className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[9px] xs:text-[10px] sm:text-[10px] md:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-purple-700 dark:text-purple-400">
                Daar-ul-Maysaroh • Ibadan.
              </span>
            </motion.div>
            <div className="absolute inset-0 bg-purple-600/20 blur-2xl rounded-full" />
          </div>

          {/* Premium Headline */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-5 md:space-y-6">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[1.1] font-heading">
              A Community Centered on{" "}
              {/* A Structured Campus. */}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                  {` The Qur'an.`}
                  
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-linear-to-r from-purple-600 to-amber-600 rounded-full opacity-30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
              <br />
              <span className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-muted-foreground">
                The Campus Built for Memorization
                {/* An Immersive Qur'an Experience. */}
              </span>
            </h1>

            {/* Premium Subheading */}
            <p className="text-sm xs:text-base sm:text-base md:text-md text-muted-foreground max-w-lg leading-relaxed">
              An environment designed for focused Quran memorization, offering
              an immersive experience for students of all ages. Our campus
              provides a structured setting that nurtures spiritual growth,
              academic excellence, and personal development, ensuring that every
              student thrives in their Quranic journey.
            </p>

            {/* Premium Value Proposition */}
            <div className="flex flex-wrap gap-2 xs:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] xs:text-xs font-black text-purple-700 dark:text-purple-400">
                  1400+ Year Sanad
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] xs:text-xs font-black text-amber-700 dark:text-amber-400">
                  Boarding & Day
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-[10px] xs:text-xs font-black text-purple-700 dark:text-purple-400">
                  Ijazah Track
                </span>
              </div>
            </div>
          </div>

          {/* Premium Social Proof with Animation */}
          <div className="flex flex-wrap items-center gap-5 xs:gap-6 sm:gap-8 pt-1 xs:pt-2">
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="flex -space-x-2 xs:-space-x-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-purple-600 to-purple-800 border-2 border-background shadow-lg flex items-center justify-center text-[10px] font-black text-white/50"
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="text-xs xs:text-sm sm:text-sm md:text-base">
                <span className="font-black text-purple-600">50+</span>{" "}
                <span className="text-muted-foreground">active students</span>
              </div>
            </div>

            <div className="flex items-center gap-2 xs:gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9</span>{" "}
                student rating
              </span>
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2">
              <Award className="w-4 h-4 xs:w-4.5 xs:h-4.5 text-amber-500" />
              <span className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Ijazah</span>{" "}
                certification
              </span>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 xs:gap-4 sm:gap-5 md:gap-6 pt-2 xs:pt-3 sm:pt-4 pb-6 xs:pb-7 sm:pb-8">
            <Link href="/physical/admissions" className="w-full xs:w-auto">
              <motion.div
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 w-full xs:w-auto px-6 xs:px-7 sm:px-8 md:px-10 lg:px-12 rounded-2xl sm:rounded-2xl md:rounded-3xl text-xs xs:text-sm sm:text-sm md:text-base font-black bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white shadow-2xl hover:shadow-3xl transition-all group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    APPLY NOW
                    <ArrowRight className="w-4 h-4 xs:w-4.5 xs:h-4.5 group-hover:translate-x-1.5 transition-all" />
                  </span>
                  {shouldAnimate && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-150%", "250%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-500/20 to-purple-600/0"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>
            </Link>

            <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 px-1 xs:px-2 sm:px-4">
              <div className="h-8 xs:h-9 sm:h-10 md:h-12 w-px bg-border/50" />
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

          {/* Premium Trust Indicators with Icons */}
          <div className="flex flex-wrap items-center gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {[
              {
                icon: ShieldCheck,
                label: "Ijazah Certified",
                color: "emerald",
              },
              { icon: Building2, label: "Campus Learning", color: "emerald" },
              { icon: Crown, label: "Authentic Sanad", color: "emerald" },
              { icon: Clock, label: "Part-Time Program", color: "emerald" },
              { icon: Clock, label: "Full-Time Program", color: "emerald" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-1.5 xs:gap-2 text-[9px] xs:text-[10px] text-muted-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                  <item.icon className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Parents Note - Premium */}
          <div className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground/60 italic pt-2 pb-4 border-t border-border/20 flex items-center gap-2">
            <Heart className="w-3 h-3 text-amber-500/50" />
            Programs for children (5+), teenagers, and adults • Boarding & Day
            available
          </div>
        </motion.div>

        {/* --- RIGHT: PREMIUM CAMPUS VISUAL --- */}
        <motion.div
          style={{
            rotateX: rotateXValue,
            rotateY: rotateYValue,
            perspective: perspectiveValue,
            scale: scaleValue,
          }}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          {/* Premium Orbital Rings */}
          {!isMobile && shouldAnimate && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-600/10 rounded-full scale-[1.3] opacity-40 hidden md:block"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-amber-500/10 rounded-full scale-[1.5] opacity-30 hidden md:block"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-600/5 rounded-full scale-[1.7] opacity-20 hidden md:block"
              />
            </>
          )}

          {/* Premium Card */}
          <div className="institutional-card w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] rounded-3xl md:rounded-[5rem] border border-purple-200 dark:border-purple-800 p-6 sm:p-8 md:p-12 lg:p-20 shadow-2xl md:shadow-3xl text-center relative overflow-hidden group bg-linear-to-br from-background via-purple-50/5 to-amber-50/5">
            {/* Premium Glow Effects */}
            <div className="absolute -top-20 -left-20 md:-top-32 md:-left-32 w-48 h-48 md:w-80 md:h-80 bg-purple-600/10 blur-3xl md:blur-[120px] rounded-full group-hover:bg-purple-600/20 transition-all duration-1000" />
            <div className="absolute -bottom-20 -right-20 md:-bottom-32 md:-right-32 w-48 h-48 md:w-80 md:h-80 bg-amber-500/10 blur-3xl md:blur-[120px] rounded-full group-hover:bg-amber-500/20 transition-all duration-1000" />

            {/* Premium Border Glow */}
            <div className="absolute inset-0 rounded-3xl md:rounded-[5rem] border border-white/5 dark:border-white/5 pointer-events-none" />

            <div className="absolute inset-0 rounded-3xl md:rounded-[5rem] bg-linear-to-br from-transparent via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Premium Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-10"
            >
              {/* Premium Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-linear-to-br from-purple-600 to-amber-500 mb-6 md:mb-8 shadow-2xl">
              <Image
                                              src={Logo}
                                              width={100}
                                              height={100}
                                              alt="Al-Maysaroh Institute Logo"
                                              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
                                            />
                {/* <Building2 className="w-10 h-10 md:w-12 md:h-12 text-white" /> */}
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-3xl sm:text-3xl md:text-4xl font-black tracking-tighter bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                  Daar-ul-Maysaroh
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-heading italic text-foreground/80 leading-relaxed text-balance px-2">
                  {`"A Sanctuary for `}
                  <span className="text-purple-600 not-italic font-bold md:font-black">
                    Quran Memorization
                  </span>
                  {` "`}
                </p>

                {/* Premium Divider */}
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  <div className="h-0.5 w-12 md:w-20 bg-linear-to-r from-transparent to-amber-500/50" />
                  <div className="flex flex-col items-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-500 mb-1" />
                    <p className="text-[9px] md:text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] md:tracking-[0.4em] whitespace-nowrap">
                      Ibadan Campus
                    </p>
                  </div>
                  <div className="h-0.5 w-12 md:w-20 bg-linear-to-l from-transparent to-amber-500/50" />
                </div>
              </div>
            </motion.div>

            {/* Premium Stats */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 gap-4 md:gap-8 border-t border-border/30 pt-6 md:pt-10">
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-1">
                <div className="text-2xl md:text-4xl font-black text-purple-600 tracking-tighter tabular-nums">
                  50+
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Active Students
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="space-y-1">
                <div className="text-2xl md:text-4xl font-black text-amber-500 tracking-tighter tabular-nums">
                  1400+
                </div>
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground">
                  Years of Sanad
                </div>
              </motion.div>
            </div>

            {/* Premium Trust Badge */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 dark:bg-black/30 border border-white/10 backdrop-blur-xl shadow-lg"
              >
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                <span className="text-[7px] md:text-[8px] font-black tracking-[0.15em] md:tracking-widest uppercase text-white/90">
                  Ijazah Certification Track
                </span>
              </motion.div>
            </div>

            {/* Premium Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-600/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>

      {/* Premium Scroll Indicator */}
      {shouldAnimate && (
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 xs:gap-1.5 sm:gap-2"
        >
          <p className="text-[8px] xs:text-[9px] sm:text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-40 text-foreground">
            Begin Your Journey
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 xs:h-10 sm:h-12 md:h-14 bg-linear-to-b from-purple-700 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
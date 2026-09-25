// app/loading.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = prev < 30 ? 8 : prev < 70 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const isReady = progress === 100;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        // Warm material — ivory in light, deep warm ink in dark
        background:
          "radial-gradient(120% 100% at 50% 50%, hsl(40 30% 99%) 0%, hsl(40 25% 97%) 60%, hsl(40 20% 95%) 100%)",
      }}
    >
      {/* Warm vignette — the material detail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, transparent 40%, rgba(212,175,55,0.06) 100%)",
        }}
      />

      {/* Dark mode override — deep warm ink */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, hsl(260 25% 8%) 0%, hsl(260 22% 6%) 60%, hsl(260 20% 5%) 100%)",
        }}
      />

      <div className="relative space-y-8 px-6 text-center">
        {/* ---------- Logo ---------- */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative inline-block">
            {/* Soft warm halo — gold, not purple */}
            <div
              className="absolute inset-0 opacity-25 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.5), transparent 70%)",
              }}
            />
            <div className="relative mx-auto h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src={Logo}
                alt="Al-Maysaroh Institute"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* ---------- Wordmark: Arabic hero + English footnote ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-5"
        >
          {/* The Arabic wordmark — hero of the screen */}
          <h1
            dir="rtl"
            lang="ar"
            className="font-quran text-[52px] font-bold leading-[1.15] tracking-tight sm:text-[64px]"
            style={{
              // Warm gold fill — like foil on paper
              backgroundImage:
                "linear-gradient(180deg, #e5c464 0%, #d4af37 45%, #b8942a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            دار الميسرة
          </h1>

          {/* Single ornament — a short gold rule */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="block h-px w-10 origin-center rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #d4af37 50%, transparent)",
            }}
          />

          {/* English as footnote */}
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/50">
            Al-Maysaroh Institute
          </span>
        </motion.div>

        {/* ---------- Progress device: gold hairline drawing outward ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-4 flex flex-col items-center gap-4"
        >
          <div className="relative h-px w-40">
            {/* Faint track */}
            <div className="absolute inset-0 rounded-full bg-foreground/[0.06]" />
            {/* Gold draw — expands symmetrically from center */}
            <motion.div
              className="absolute top-0 h-px rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #d4af37 50%, transparent)",
                left: "50%",
              }}
              initial={{ width: "0%", x: "0%" }}
              animate={{
                width: `${progress}%`,
                x: "-50%",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Bilingual status — Arabic first, English beneath */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.span
              key={isReady ? "ready" : "loading"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              dir="rtl"
              lang="ar"
              className="font-quran text-[14px] leading-none text-foreground/60"
            >
              {isReady ? "أهلاً وسهلاً" : "جار التحميل"}
            </motion.span>

            <span
              role="status"
              aria-live="polite"
              aria-label={isReady ? "Ready" : "Loading"}
              className="text-[9px] font-medium uppercase tracking-[0.4em] text-foreground/40"
            >
              {isReady ? "Welcome" : "Loading"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

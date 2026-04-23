// components/sections/cta-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// Check for reduced motion preference
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function CTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hoverScale = mounted && !prefersReducedMotion ? 1.02 : 1;
  const tapScale = mounted && !prefersReducedMotion ? 0.98 : 1;

  return (
    <section className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Background - Clean gradient without heavy patterns */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-purple-700 to-amber-600" />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

      {/* Decorative top-right corner accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      {/* Decorative bottom-left corner accent */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[9px] font-black uppercase tracking-wider text-white">
                Begin Your Journey
              </span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.2] text-white mb-4">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-200">
                Quranic Journey?
              </span>
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.2}>
            <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto mb-8">
              Begin with a free, no-obligation assessment. Our scholars will
              guide you every step of the way.
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href="/assessment" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: hoverScale }}
                  whileTap={{ scale: tapScale }}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-700 font-black text-sm shadow-lg hover:shadow-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-700"
                >
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/courses" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: hoverScale }}
                  whileTap={{ scale: tapScale }}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/30 bg-transparent text-white font-black text-sm hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-700"
                >
                  View Programs
                </motion.button>
              </Link>
            </div>
          </Reveal>

          {/* Simple Trust Indicator - Clean and minimal */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <div className="px-3 py-1.5">
                <p className="text-2xl font-black text-white">100+</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/60">
                  Active Students
                </p>
              </div>
              <div className="w-px h-8 bg-white/20 my-auto" />
              <div className="px-3 py-1.5">
                <p className="text-2xl font-black text-white">94%</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/60">
                  Success Rate
                </p>
              </div>
              <div className="w-px h-8 bg-white/20 my-auto" />
              <div className="px-3 py-1.5">
                <p className="text-2xl font-black text-white">6+</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-white/60">
                  Countries
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bottom Note */}
          <Reveal delay={0.5}>
            <p className="text-[9px] text-white/40 mt-6">
              ✨ Free 20-minute assessment • No commitment • Flexible scheduling
              ✨
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

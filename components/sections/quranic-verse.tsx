"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function QuranicVerse() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-32 lg:py-48 relative overflow-hidden bg-slate-950">
      {/* Background Islamic Geometry Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div style={{ scale, opacity }}>
          <div className="quran-monumental mb-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading italic text-white/90 leading-tight">
             {` "And We have certainly made the Quran easy for remembrance, so is there any who will remember?"`}
            </h2>
            
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
              <p className="text-xs font-black text-gold uppercase tracking-[0.4em]">Surah Al-Qamar: 17</p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-700/20 blur-[120px] -z-10 rounded-full" />
      </div>
    </section>
  );
}
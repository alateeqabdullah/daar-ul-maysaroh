"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";

// Pre-defined deterministic values to ensure hydration consistency
const PREDEFINED_PARTICLES = [
  {
    width: "18.93px",
    height: "9.28px",
    top: "75.21%",
    left: "39.50%",
    duration: 16.42,
    delay: 1.3,
  },
  {
    width: "5.79px",
    height: "16.90px",
    top: "26.03%",
    left: "65.72%",
    duration: 23.22,
    delay: 3.83,
  },
  {
    width: "12.45px",
    height: "18.76px",
    top: "10.50%",
    left: "20.15%",
    duration: 15.25,
    delay: 0.0,
  },
  {
    width: "22.31px",
    height: "8.92px",
    top: "89.75%",
    left: "80.34%",
    duration: 28.91,
    delay: 2.15,
  },
  {
    width: "14.67px",
    height: "21.88px",
    top: "42.89%",
    left: "12.67%",
    duration: 19.76,
    delay: 1.78,
  },
  {
    width: "9.12px",
    height: "7.34px",
    top: "67.45%",
    left: "91.23%",
    duration: 24.56,
    delay: 0.45,
  },
  {
    width: "16.78px",
    height: "12.89px",
    top: "33.21%",
    left: "50.89%",
    duration: 21.34,
    delay: 2.89,
  },
  {
    width: "11.23px",
    height: "19.67px",
    top: "55.67%",
    left: "73.45%",
    duration: 17.89,
    delay: 1.23,
  },
];

export function QuranicVerse() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(ref, { amount: 0.5 });
  const [patternLoaded, setPatternLoaded] = useState(false);

  // Generate particle data using predefined values
  const particles = useMemo(() => {
    return PREDEFINED_PARTICLES.map((particle, i) => ({
      id: i,
      width: particle.width,
      height: particle.height,
      top: particle.top,
      left: particle.left,
      animation: `float ${particle.duration}s infinite ease-in-out`,
      animationDelay: `${particle.delay}s`,
    }));
  }, []);

  // Load pattern image to prevent flash
  useEffect(() => {
    const img = new Image();
    img.src = "/islamic-pattern.svg";
    img.onload = () => setPatternLoaded(true);
  }, []);

  // Trigger subtle interaction when verse comes into view
  useEffect(() => {
    if (isInView) {
      // You could trigger a sound effect or analytics event here
      console.log("Quranic verse in view");
    }
  }, [isInView]);

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  // Styles for maintainability
  const textGradient =
    "bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent";
  const dividerGradient =
    "h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent";

  return (
    <section
      ref={ref}
      aria-label="Quranic Verse Display"
      role="region"
      className="py-12 lg:py-32 relative overflow-hidden bg-slate-950 isolate"
    >
      {/* Background Islamic Geometry Overlay with loading state */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          patternLoaded ? "opacity-[0.03]" : "opacity-0"
        }`}
        style={{
          backgroundImage: "url('/islamic-pattern.svg')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      {/* Fallback pattern while loading */}
      {!patternLoaded && (
        <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
        <motion.div style={{ scale, opacity, y }}>
          {/* Arabic Bismillah with enhanced styling */}
          <div
            className="quran-monumental mb-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] relative"
            dir="rtl"
            lang="ar"
            aria-label="Bismillah Hir Rahman Nir Rahim - In the name of Allah, the Most Gracious, the Most Merciful"
          >
            <span className="text-3xl md:text-7xl lg:text-8xl tracking-wider leading-relaxed">
              وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ <br />فَهَلْ مِن مُّدَّكِرٍۢ
              ١٧{" "}
            </span>

            {/* Decorative dots */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-amber-500/30"
                  style={{ animationDelay: `${dot * 200}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Verse container */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* English translation */}
            <h2
              className="text-3xl md:text-5xl font-heading italic text-white/90 leading-tight"
              lang="en"
            >
              <span className="sr-only">Quranic Verse: </span>
              {` "And We have certainly made the Quran easy for remembrance, so is there any who will remember?"`}
            </h2>

            {/* Reference divider */}
            <div
              className="flex items-center justify-center gap-6"
              role="separator"
            >
              <div className={dividerGradient + " w-12 md:w-20"} />

              <div className="flex flex-col items-center gap-2">
                <p
                  className="text-xs font-black text-amber-400 uppercase tracking-[0.4em]"
                  aria-label="Chapter 54, Verse 17"
                >
                  Surah Al-Qamar: 17
                </p>

                {/* Transliteration for accessibility */}
                <p
                  className="text-xs text-amber-500/70 font-medium"
                  aria-hidden="true"
                  lang="ar-Latn"
                >
                  Surah Al-Qamar, Ayah 17
                </p>
              </div>

              <div className={dividerGradient + " w-12 md:w-20"} />
            </div>

            {/* Optional: Add a subtle CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-700/30 text-amber-300 hover:text-amber-200 hover:border-amber-500/50 transition-all duration-300 group"
              aria-label="Learn more about this verse"
              onClick={() => window.open("https://quran.com/54/17", "_blank")}
            >
              <span className="flex items-center gap-3">
                <span className="text-sm font-semibold tracking-wide">
                  Read Tafsir
                </span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Ambient Glow - optimized for performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-gradient-to-br from-amber-900/10 via-primary-700/10 to-transparent blur-[100px] -z-10 rounded-full opacity-60" />

        {/* Performance-optimized floating particles */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-amber-500/5"
              style={{
                width: particle.width,
                height: particle.height,
                top: particle.top,
                left: particle.left,
                animation: particle.animation,
                animationDelay: particle.animationDelay,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
          }
        }

        /* Ensure proper Arabic font rendering */
        .quran-monumental {
          font-family: "Amiri", "Scheherazade", "Lateef", serif;
          font-weight: 400;
          text-align: center;
        }

        /* High contrast mode support */
        @media (forced-colors: active) {
          .quran-monumental {
            forced-color-adjust: none;
            color: CanvasText;
          }
        }
      `}</style>
    </section>
  );
}

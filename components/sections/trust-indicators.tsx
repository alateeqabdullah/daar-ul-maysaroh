"use client";

import { motion, useInView } from "framer-motion";
import { ShieldCheck, Landmark, Award, ScrollText } from "lucide-react";
import { useRef } from "react";

const TRUST_SEALS = [
  {
    icon: ShieldCheck,
    label: "Ijazah Authenticated",
    sub: "Verified Sanad Chains",
    description: "Direct transmission chains verified by scholars",
  },
  {
    icon: Landmark,
    label: "Global Council",
    sub: "Al-Azhar Affiliated Faculty",
    description: "Faculty members certified by Al-Azhar University",
  },
  {
    icon: Award,
    label: "Premium Pedagogy",
    sub: "1-on-1 Academic Focus",
    description: "Personalized learning with dedicated teachers",
  },
  {
    icon: ScrollText,
    label: "Traditional Science",
    sub: "Classical Tajweed Poem Study",
    description: "Study of classical Islamic sciences and tajweed poems",
  },
];

export function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="py-8 md:py-12 border-y border-border/30 md:border-border/50 bg-background/50 relative overflow-hidden"
      aria-label="Trust Seals and Certifications"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {TRUST_SEALS.map((seal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              {/* Main card with improved touch target */}
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-card border border-border/30 hover:border-primary-500/30 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer h-full">
                {/* Icon container */}
                <div
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300"
                  aria-hidden="true"
                >
                  <seal.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-700 dark:text-primary-500" />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-[10px] font-bold md:font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-primary-700 dark:text-primary-600 leading-tight mb-1">
                    {seal.label}
                  </p>
                  <p className="text-sm md:text-xs font-semibold md:font-bold text-foreground opacity-90 uppercase leading-tight">
                    {seal.sub}
                  </p>

                  {/* Hidden description for accessibility */}
                  <p className="sr-only">{seal.description}</p>
                </div>
              </div>

              {/* Desktop-only hover tooltip */}
              <div className="hidden lg:block absolute z-10 w-64 p-3 bg-popover border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-2 pointer-events-none left-1/2 -translate-x-1/2 bottom-full mb-2">
                <p className="text-xs text-popover-foreground">
                  {seal.description}
                </p>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-b rotate-45" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="hidden md:block h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent mt-8 md:mt-12"
        />
      </div>
    </section>
  );
}

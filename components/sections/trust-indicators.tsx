// "use client";

// import { motion, useInView } from "framer-motion";
// import { ShieldCheck, Landmark, Award, ScrollText } from "lucide-react";
// import { useRef } from "react";

// const TRUST_SEALS = [
//   {
//     icon: ShieldCheck,
//     label: "Ijazah Authenticated",
//     sub: "Verified Sanad Chains",
//     description: "Direct transmission chains verified by scholars",
//   },
//   {
//     icon: Landmark,
//     label: "Global Council",
//     sub: "Al-Azhar Affiliated Faculty",
//     description: "Faculty members certified by Al-Azhar University",
//   },
//   {
//     icon: Award,
//     label: "Premium Pedagogy",
//     sub: "1-on-1 Academic Focus",
//     description: "Personalized learning with dedicated teachers",
//   },
//   {
//     icon: ScrollText,
//     label: "Traditional Science",
//     sub: "Classical Tajweed Poem Study",
//     description: "Study of classical Islamic sciences and tajweed poems",
//   },
// ];

// export function TrustIndicators() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(containerRef, { once: true, margin: "-100px" });

//   return (
//     <section
//       ref={containerRef}
//       className="py-8 md:py-12 border-y border-border/30 md:border-border/50 bg-background/50 relative overflow-hidden"
//       aria-label="Trust Seals and Certifications"
//     >
//       <div className="container mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : {}}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
//         >
//           {TRUST_SEALS.map((seal, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{
//                 delay: i * 0.1,
//                 duration: 0.5,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 y: -4,
//                 transition: { duration: 0.2 },
//               }}
//               className="group relative"
//             >
//               {/* Main card with improved touch target */}
//               <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-card border border-border/30 hover:border-primary-500/30 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer h-full">
//                 {/* Icon container */}
//                 <div
//                   className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300"
//                   aria-hidden="true"
//                 >
//                   <seal.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-700 dark:text-primary-500" />
//                 </div>

//                 {/* Text content */}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs md:text-[10px] font-bold md:font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-primary-700 dark:text-primary-600 leading-tight mb-1">
//                     {seal.label}
//                   </p>
//                   <p className="text-sm md:text-xs font-semibold md:font-bold text-foreground opacity-90 uppercase leading-tight">
//                     {seal.sub}
//                   </p>

//                   {/* Hidden description for accessibility */}
//                   <p className="sr-only">{seal.description}</p>
//                 </div>
//               </div>

//               {/* Desktop-only hover tooltip */}
//               <div className="hidden lg:block absolute z-10 w-64 p-3 bg-popover border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-2 pointer-events-none left-1/2 -translate-x-1/2 bottom-full mb-2">
//                 <p className="text-xs text-popover-foreground">
//                   {seal.description}
//                 </p>
//                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-b rotate-45" />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Optional decorative element */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={isInView ? { scaleX: 1 } : {}}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="hidden md:block h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent mt-8 md:mt-12"
//         />
//       </div>
//     </section>
//   );
// }








// components/sections/trust-indicators.tsx
"use client";

import { motion, useInView, useAnimation, Variants } from "framer-motion";
import {
  ShieldCheck,
  Landmark,
  Award,
  ScrollText,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const TRUST_SEALS = [
  {
    icon: ShieldCheck,
    label: "Ijazah Authenticated",
    sub: "Verified Sanad Chains",
    description:
      "Direct transmission chains from certified scholars with documented isnad",
    color: "purple",
  },
  {
    icon: Landmark,
    label: "Scholarly Council",
    sub: "Traditional Sanad Lineage",
    description:
      "Faculty with authenticated chains of transmission to the Prophet (ﷺ)",
    color: "amber",
  },
  {
    icon: Award,
    label: "Premium Pedagogy",
    sub: "1-on-1 Academic Focus",
    description:
      "Personalized learning with dedicated master teachers and progress tracking",
    color: "purple",
  },
  {
    icon: ScrollText,
    label: "Traditional Science",
    sub: "Classical Methodology",
    description:
      "Study of classical Islamic sciences following authentic scholarly traditions",
    color: "amber",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      gradient: "from-purple-600 to-purple-700",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-600",
      light: "bg-purple-500/10",
      ring: "ring-purple-500/20",
      hover: "hover:border-purple-300",
      via: "via-purple-500",
    },
    amber: {
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-600",
      light: "bg-amber-500/10",
      ring: "ring-amber-500/20",
      hover: "hover:border-amber-300",
      via: "via-amber-500",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5"
      aria-label="Trust Seals and Certifications"
    >
      {/* Background Elements - Simplified for mobile */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Animated particles - Hidden on mobile for performance */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
            animate={{
              y: [0, -80, 0],
              x: [0, Math.sin(i) * 40, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${20 + ((i * 7) % 60)}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 xs:mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
            <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
            <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
              Certified Excellence
            </span>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] font-heading mb-3 xs:mb-4 px-2">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
              Scholars
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Our credentials are backed by centuries of Islamic scholarly
            tradition with authentic Sanad chains.
          </p>
        </motion.div>

        {/* Trust Seals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8"
        >
          {TRUST_SEALS.map((seal, i) => {
            const Icon = seal.icon;
            const colors = getColorStyles(seal.color);
            
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group"
              >
                {/* Glow Effect - Simplified */}
                <div className={cn(
                  "absolute -inset-0.5 bg-gradient-to-r rounded-xl xs:rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                  colors.gradient
                )} />

                {/* Main Card */}
                <div className={cn(
                  "relative bg-card rounded-xl xs:rounded-2xl border border-border transition-all duration-300 p-5 xs:p-6 sm:p-6 md:p-7 lg:p-8 shadow-sm hover:shadow-xl overflow-hidden h-full",
                  colors.hover
                )}>
                  
                  {/* Corner Accent */}
                  <div className={cn(
                    "absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl opacity-5 rounded-bl-full",
                    colors.gradient
                  )} />

                  {/* Icon Container */}
                  <div className="relative mb-4 xs:mb-5 sm:mb-6">
                    <div className={cn(
                      "relative w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl xs:rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                      colors.gradient
                    )}>
                      <Icon className="w-6 h-6 xs:w-6.5 xs:h-6.5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-background border border-purple-200 dark:border-purple-800 flex items-center justify-center shadow-md">
                      <CheckCircle className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                    <h3 className="text-base xs:text-lg sm:text-lg md:text-xl font-black text-foreground leading-tight">
                      {seal.label}
                    </h3>
                    <p className={cn(
                      "text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider",
                      colors.text
                    )}>
                      {seal.sub}
                    </p>
                    <p className="text-[11px] xs:text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {seal.description}
                    </p>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                    colors.via
                  )} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-10 xs:mt-12 sm:mt-16 md:mt-20"
        >
          <div className="inline-flex flex-col xs:flex-row items-center gap-2 xs:gap-3 text-xs xs:text-sm text-muted-foreground">
            <div className="hidden xs:block h-px w-6 bg-gradient-to-r from-transparent to-border" />
            <span className="font-medium text-[10px] xs:text-xs">
              All certifications verified annually • Authentic Sanad chains
            </span>
            <div className="hidden xs:block h-px w-6 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
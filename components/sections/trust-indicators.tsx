"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import {
  ShieldCheck,
  Landmark,
  Award,
  ScrollText,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useRef, useEffect } from "react";

const TRUST_SEALS = [
  {
    icon: ShieldCheck,
    label: "Ijazah Authenticated",
    sub: "Verified Sanad Chains",
    description:
      "Direct transmission chains from certified scholars with documented isnad",
    color: "from-emerald-500 to-teal-600",
    bgColor: "emerald",
  },
  {
    icon: Landmark,
    label: "Global Council",
    sub: "Al-Azhar Affiliated",
    description:
      "Faculty certified by Al-Azhar University with international recognition",
    color: "from-blue-500 to-cyan-600",
    bgColor: "blue",
  },
  {
    icon: Award,
    label: "Premium Pedagogy",
    sub: "1-on-1 Academic Focus",
    description:
      "Personalized learning with dedicated master teachers and progress tracking",
    color: "from-amber-500 to-orange-600",
    bgColor: "amber",
  },
  {
    icon: ScrollText,
    label: "Traditional Science",
    sub: "Classical Methodology",
    description:
      "Study of classical Islamic sciences following authentic scholarly traditions",
    color: "from-purple-500 to-violet-600",
    bgColor: "purple",
  },
];

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconVariants = {
    hidden: { rotate: -20, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.6,
      },
    },
  };

  const glowVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.2,
      opacity: 0.8,
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="Trust Seals and Certifications"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-50/5 to-background dark:from-background dark:via-primary-950/5 dark:to-background" />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 10) % 100}%`,
              top: `${20 + ((i * 7) % 60)}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/30 mb-4">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-400">
              Certified Excellence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Scholars
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our credentials are backed by centuries of Islamic scholarly
            tradition
          </p>
        </motion.div>

        {/* Trust Seals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {TRUST_SEALS.map((seal, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover="hover"
              className="relative group"
            >
              {/* Glow Effect */}
              <motion.div
                variants={glowVariants}
                className={`absolute -inset-0.5 bg-gradient-to-br ${seal.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />

              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden h-full">
                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${seal.color} opacity-5 rounded-bl-full`}
                />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div
                    variants={iconVariants}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${seal.color} flex items-center justify-center shadow-lg`}
                  >
                    <seal.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />

                    {/* Animated Ring */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-white/20 flex items-center justify-center shadow-md"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-black text-foreground leading-tight">
                    {seal.label}
                  </h3>
                  <p
                    className={`text-sm md:text-base font-bold uppercase tracking-[0.1em] bg-gradient-to-r ${seal.color} bg-clip-text text-transparent`}
                  >
                    {seal.sub}
                  </p>
                  <p className="text-sm text-muted-foreground opacity-90 leading-relaxed">
                    {seal.description}
                  </p>
                </div>

                {/* Hover Line Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: `var(--color-${seal.bgColor}-500)` }}
                />
              </div>

              {/* Floating Tag on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileHover={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-background border border-white/10 shadow-lg"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-400 whitespace-nowrap">
                  Certified
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-border" />
            <span className="font-medium">
              All certifications verified annually
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

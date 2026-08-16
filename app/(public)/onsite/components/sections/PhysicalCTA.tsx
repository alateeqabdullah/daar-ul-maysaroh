// app/(marketing)/physical/components/sections/PhysicalCTA.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Heart,
  ShieldCheck,
  Users,
  Award,
  Clock,
  Home,
  Sun,
  Moon,
  Star,
  Crown,
} from "lucide-react";

export function PhysicalCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Premium Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-amber-600" />

      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.05] bg-center bg-repeat"
        style={{ backgroundSize: "200px" }}
      />

      {/* Decorative Light Effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            animate={{
              y: [0, -80, 0],
              x: [0, i % 2 === 0 ? 40 : -40, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6 shadow-2xl border border-white/10">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Begin Your{" "}
            <span className="bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent">
              Quranic Journey
            </span>
          </h2>

          {/* Description */}
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Join Daar-ul-Maysaroh today. Choose between Day or Boarding
            programmes and start your path to Quranic excellence with authentic
            Sanad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/physical/admissions">
              <Button className="bg-white text-purple-600 hover:bg-white/90 font-black text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-all group">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/physical/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-black text-base px-8 py-6"
              >
                Schedule a Visit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Supportive Environment
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Free Assessment
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community Focused
            </span>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Full-Time Program
              </span>
              <span className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                Boarding & Day Options
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Ijazah Track Available
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

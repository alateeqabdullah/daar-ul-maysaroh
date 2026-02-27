"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Home,
  Search,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Moon,
  Star,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-700/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      {/* Animated Stars */}
      <div className="absolute top-1/4 right-1/4 animate-pulse">
        <Star className="w-4 h-4 text-primary-700/20" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-300">
        <Moon className="w-6 h-6 text-primary-700/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* 404 Number */}
          <Reveal>
            <div className="relative inline-block">
              <div className="text-8xl sm:text-9xl md:text-[200px] font-black font-heading leading-none">
                <span className="text-primary-700/20">4</span>
                <span className="text-primary-700 relative inline-block animate-pulse">
                  0
                </span>
                <span className="text-primary-700/20">4</span>
              </div>

              {/* Compass Decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 opacity-10"
              >
                <Compass className="w-32 h-32 sm:w-48 sm:h-48 text-primary-700" />
              </motion.div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                Page <span className="text-primary-700 italic">Not Found</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              {`  The page you're looking for seems to have wandered off like a
                lost traveler in the desert. Let's guide you back to familiar
                grounds.`}
              </p>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto py-8">
              {[
                { icon: Home, label: "Home", href: "/" },
                { icon: BookOpen, label: "Courses", href: "/courses" },
                { icon: Search, label: "Search", href: "/search" },
              ].map((link, index) => (
                <Link key={index} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="institutional-card p-4 sm:p-6 flex flex-col items-center gap-3 cursor-pointer group"
                  >
                    <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-700 group-hover:rotate-12 transition-transform" />
                    <span className="font-black text-sm uppercase tracking-tight">
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  GO BACK
                </span>
              </Button>

              <Link href="/">
                <Button className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
                  <span className="flex items-center gap-2">
                    RETURN HOME
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Help Text */}
          <Reveal delay={0.4}>
            <div className="pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Need assistance?{" "}
                <Link
                  href="/contact"
                  className="text-primary-700 font-black hover:underline"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

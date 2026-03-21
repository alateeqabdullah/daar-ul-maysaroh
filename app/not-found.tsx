// app/not-found.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Home,
  Search,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Moon,
  Star,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  // Track 404 for analytics
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("404 Error:", window.location.pathname);
    }
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
        style={{ backgroundSize: "300px" }}
      />

      {/* Floating Elements - pointer-events-none prevents blocking clicks */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Stars */}
      <div className="absolute top-1/4 right-1/4 animate-pulse pointer-events-none">
        <Star className="w-4 h-4 text-primary-700/20" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-300 pointer-events-none">
        <Moon className="w-6 h-6 text-primary-700/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* 404 Number */}
          <div className="relative inline-block">
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }
              }
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl sm:text-9xl md:text-[200px] font-black font-heading leading-none"
            >
              <span className="text-primary-700/20">4</span>
              <span className="text-primary-700 relative inline-block animate-pulse">
                0
              </span>
              <span className="text-primary-700/20">4</span>
            </motion.div>

            {/* Compass Decoration */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 opacity-10 pointer-events-none"
            >
              <Compass className="w-32 h-32 sm:w-48 sm:h-48 text-primary-700" />
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
              Page <span className="text-primary-700 italic">Not Found</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              {`The page you're looking for seems to have wandered off like a lost
              traveler in the desert. Let's guide you back to familiar grounds.`}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search for courses, teachers, or topics..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto py-8"
          >
            {[
              { icon: Home, label: "Home", href: "/", onClick: null },
              {
                icon: BookOpen,
                label: "Courses",
                href: "/courses",
                onClick: null,
              },
              { icon: Search, label: "Search", href: "/search", onClick: null },
            ].map((link, index) => (
              <Link key={index} href={link.href}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="institutional-card p-4 sm:p-6 flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <link.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-700 group-hover:rotate-12 transition-transform" />
                  <span className="font-black text-sm uppercase tracking-tight">
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="pt-4"
          >
            <p className="text-xs text-muted-foreground mb-4">
              Popular pages you might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Hifz Program", href: "/courses/hifz" },
                { label: "Tajweed Mastery", href: "/courses/tajweed" },
                { label: "Arabic Fluency", href: "/courses/arabic" },
                { label: "Admissions", href: "/admissions" },
                { label: "Scholars", href: "/teachers" },
              ].map((page, idx) => (
                <Link
                  key={idx}
                  href={page.href}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors hover:text-primary-700 cursor-pointer"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11 cursor-pointer hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                GO BACK
              </span>
            </Button>

            <Link href="/">
              <Button className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-white text-sm sm:text-base min-h-11 cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  RETURN HOME
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Need assistance?{" "}
              <Link
                href="/contact"
                className="text-primary-700 font-black hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Contact our support team
                <Sparkles className="w-3 h-3" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

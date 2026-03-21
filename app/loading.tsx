"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingPageProps {
  variant?: "fullscreen" | "minimal" | "inline";
  message?: string;
  showQuote?: boolean;
}

export default function LoadingPage({
  variant = "fullscreen",
  message = "Loading Sacred Knowledge",
  showQuote = true,
}: LoadingPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Initialize particles once during component initialization to avoid 
  // synchronous setState in useEffect which causes cascading renders.
  const [particles] = useState(() => 
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));

  const loadingMessages = [
    "Preparing your sacred journey...",
    "Connecting you to scholars...",
    "Loading divine knowledge...",
    "Almost ready...",
  ];

  useEffect(() => {
    if (variant === "fullscreen") {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [loadingMessages.length, variant]);

  // Minimal variant for components
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-primary-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Inline variant for buttons/containers
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center gap-3 p-8">
        <div className="w-5 h-5 border-2 border-primary-700 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    );
  }

  // Fullscreen variant (default)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              shouldReduceMotion
                ? {}
                : { opacity: [0, 0.2, 0], scale: [0.5, 1, 0.5] }
            }
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-primary-700/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 px-4">
        {/* Animated Logo */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-2xl">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>

          {/* Sparkle Animation */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-6 h-6 text-primary-700" />
            </motion.div>
          )}
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.h2
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter font-heading"
          >
            <span className="text-primary-700 italic">Loading</span> {message}
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={shouldReduceMotion ? { x: "0%" } : { x: "100%" }}
                transition={
                  shouldReduceMotion
                    ? {}
                    : {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="h-full w-1/2 bg-linear-to-r from-primary-700 via-primary-500 to-primary-700 rounded-full"
              />
            </div>
          </div>

          {/* Loading Dots */}
          {!shouldReduceMotion && (
            <div className="flex justify-center gap-2 pt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 rounded-full bg-primary-700"
                />
              ))}
            </div>
          )}

          {/* Rotating Message */}
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground mt-4"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </div>

        {/* Quranic Quote */}
        {showQuote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto pt-8"
          >
            {`"And We have certainly made the Quran easy for remembrance, so is there any who will remember?"`}
            <br />
            <span className="text-primary-700 font-black text-[10px] mt-2 block">
              Surah Al-Qamar (54:17)
            </span>
          </motion.p>
        )}
      </div>
    </div>
  );
}

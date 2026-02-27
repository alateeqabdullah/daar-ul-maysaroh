"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-2xl">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>

          {/* Sparkle Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4"
          >
            <Sparkles className="w-6 h-6 text-primary-700" />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter font-heading"
          >
            <span className="text-primary-700 italic">Loading</span> Sacred
            Knowledge
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-1/2 bg-gradient-to-r from-primary-700 to-primary-500 rounded-full"
              />
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 pt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary-700"
              />
            ))}
          </div>
        </div>

        {/* Quranic Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto pt-8"
        >
         {` "And We have certainly made the Quran easy for remembrance, so is
          there any who will remember?"`}
          <br />
          <span className="text-primary-700 font-black text-[10px] mt-2 block">
            Surah Al-Qamar (54:17)
          </span>
        </motion.p>
      </div>
    </div>
  );
}

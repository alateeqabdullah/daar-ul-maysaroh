// app/loading.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = prev < 30 ? 8 : prev < 70 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6 px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 blur-2xl opacity-20" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
              <Image
                src="/logo.svg"
                alt="Al-Maysaroh"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Wordmark - optional, only if your logo doesn't have text */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className="text-base sm:text-lg font-light tracking-[0.3em] text-muted-foreground uppercase">
            Al-Maysaroh
          </span>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-32 mx-auto mt-6">
          <div className="h-[1px] w-full bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </div>

        {/* Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase font-medium"
        >
          {progress === 100 ? "Ready" : "Loading"}
        </motion.p>
      </div>
    </div>
  );
}

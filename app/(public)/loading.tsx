// "use client";

// import { motion } from "framer-motion";
// import { BookOpen, Sparkles } from "lucide-react";

// export default function LoadingPage() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <div className="text-center space-y-8">
//         {/* Animated Logo */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="relative"
//         >
//           <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-2xl">
//             <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
//           </div>

//           {/* Sparkle Animation */}
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 180, 360],
//               opacity: [0.5, 1, 0.5],
//             }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="absolute -top-4 -right-4"
//           >
//             <Sparkles className="w-6 h-6 text-primary-700" />
//           </motion.div>
//         </motion.div>

//         {/* Loading Text */}
//         <div className="space-y-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-2xl sm:text-3xl font-black tracking-tighter font-heading"
//           >
//             <span className="text-primary-700 italic">Loading</span> Sacred
//             Knowledge
//           </motion.h2>

//           {/* Progress Bar */}
//           <div className="w-48 sm:w-64 mx-auto">
//             <div className="h-1 bg-muted rounded-full overflow-hidden">
//               <motion.div
//                 initial={{ x: "-100%" }}
//                 animate={{ x: "100%" }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="h-full w-1/2 bg-gradient-to-r from-primary-700 to-primary-500 rounded-full"
//               />
//             </div>
//           </div>

//           {/* Loading Dots */}
//           <div className="flex justify-center gap-2 pt-4">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
//                 className="w-2 h-2 rounded-full bg-primary-700"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Quranic Quote */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto pt-8"
//         >
//          {` "And We have certainly made the Quran easy for remembrance, so is
//           there any who will remember?"`}
//           <br />
//           <span className="text-primary-700 font-black text-[10px] mt-2 block">
//             Surah Al-Qamar (54:17)
//           </span>
//         </motion.p>
//       </div>
//     </div>
//   );
// }











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

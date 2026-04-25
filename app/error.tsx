// // app/error.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   RefreshCw,
//   Home,
//   Mail,
//   Bug,
//   FileWarning,
//   ArrowLeft,
//   Loader2,
//   Shield,
//   Clock,
// } from "lucide-react";

// interface ErrorPageProps {
//   error: Error & { digest?: string };
//   reset: () => void;
// }

// export default function ErrorPage({ error, reset }: ErrorPageProps) {
//   const router = useRouter();
//   const [isResetting, setIsResetting] = useState(false);

//   useEffect(() => {
//     console.error("Application error:", error);
//   }, [error]);

//   const handleReset = async () => {
//     setIsResetting(true);
//     try {
//       await reset();
//     } finally {
//       setIsResetting(false);
//     }
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   return (
//     <main className="min-h-screen bg-background relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-background to-background pointer-events-none" />

//       {/* Floating Elements */}
//       <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
//         <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
//           {/* Error Icon */}
//           <Reveal>
//             <div className="relative inline-block">
//               <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-orange-500/10 flex items-center justify-center">
//                 <FileWarning className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
//               </div>
//               <div className="absolute -bottom-4 -right-4 animate-pulse">
//                 <Bug className="w-6 h-6 text-muted-foreground/30" />
//               </div>
//             </div>
//           </Reveal>

//           {/* Error Message */}
//           <Reveal delay={0.1}>
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
//                 Something Went{" "}
//                 <span className="text-orange-500 italic">Wrong</span>
//               </h1>
//               <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
//                 We encountered an unexpected error. Our team has been
//                 automatically notified.
//               </p>
//               <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
//               {`  Don't worry - you can try again or return to the homepage.`}
//               </p>
//             </div>
//           </Reveal>

//           {/* Error Details (Development Only) */}
//           {process.env.NODE_ENV === "development" && (
//             <Reveal delay={0.15}>
//               <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border text-left max-w-2xl mx-auto">
//                 <p className="font-mono text-xs sm:text-sm overflow-auto break-all">
//                   <span className="text-red-500 font-bold">Error:</span>{" "}
//                   {error.message}
//                   {error.digest && (
//                     <>
//                       <br />
//                       <span className="text-muted-foreground">
//                         <span className="font-bold">Digest:</span>{" "}
//                         {error.digest}
//                       </span>
//                     </>
//                   )}
//                 </p>
//               </div>
//             </Reveal>
//           )}

//           {/* Action Buttons */}
//           <Reveal delay={0.2}>
//             <div className="flex flex-wrap gap-4 justify-center items-center">
//               <Button
//                 onClick={handleReset}
//                 disabled={isResetting}
//                 className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base min-h-11 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 <span className="flex items-center gap-2">
//                   {isResetting ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <RefreshCw className="w-4 h-4" />
//                   )}
//                   {isResetting ? "RETRYING..." : "TRY AGAIN"}
//                 </span>
//               </Button>

//               <Button
//                 onClick={handleGoBack}
//                 variant="outline"
//                 className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11 cursor-pointer hover:bg-muted transition-colors"
//               >
//                 <span className="flex items-center gap-2">
//                   <ArrowLeft className="w-4 h-4" />
//                   GO BACK
//                 </span>
//               </Button>

//               <Link href="/">
//                 <Button
//                   variant="outline"
//                   className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11 cursor-pointer hover:bg-muted transition-colors"
//                 >
//                   <span className="flex items-center gap-2">
//                     <Home className="w-4 h-4" />
//                     HOME
//                   </span>
//                 </Button>
//               </Link>
//             </div>
//           </Reveal>

//           {/* Trust Badges */}
//           <Reveal delay={0.25}>
//             <div className="flex flex-wrap justify-center gap-4 pt-4">
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Shield className="w-3 h-3 text-primary-700" />
//                 <span>Auto-reported to our team</span>
//               </div>
//               <div className="hidden sm:block w-px h-3 bg-border" />
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Clock className="w-3 h-3 text-primary-700" />
//                 <span>Typically resolved within hours</span>
//               </div>
//             </div>
//           </Reveal>

//           {/* Support Options */}
//           <Reveal delay={0.3}>
//             <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
//               <p className="text-sm text-muted-foreground mb-4">
//                 If the problem persists, please report it to our support team:
//               </p>
//               <Link href="mailto:errors@almaysaroh.com?subject=Error%20Report">
//                 <Button
//                   variant="ghost"
//                   className="gap-2 cursor-pointer hover:bg-muted transition-colors"
//                 >
//                   <Mail className="w-4 h-4" />
//                   errors@almaysaroh.com
//                 </Button>
//               </Link>
//               {error.digest && (
//                 <p className="text-xs text-muted-foreground mt-4">
//                   Please include this error ID in your report:{" "}
//                   <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
//                     {error.digest}
//                   </code>
//                 </p>
//               )}
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </main>
//   );
// }













// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Shield,
  Sparkles,
  Compass,
  MessageCircle,
  Wifi,
  Server,
  Zap,
  Coffee,
  Heart,
} from "lucide-react";
import { useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        
        {/* Large Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Error Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/20 rounded-full"
            animate={{
              y: [0, -60, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-16 xs:py-20 sm:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Error Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-amber-500/20 blur-3xl rounded-full" />
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-red-500/10 to-amber-500/10 border-4 border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-red-500" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-amber-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tighter font-heading mb-3"
          >
            Something Went{" "}
            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              Wrong
            </span>
          </motion.h1>

          {/* Error Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md mx-auto"
          >
            {error.message || "An unexpected error occurred. Our technical team has been notified."}
          </motion.p>

          {/* Error Digest (if available) */}
          {error.digest && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] text-muted-foreground/50 font-mono mb-6"
            >
              Error ID: {error.digest}
            </motion.p>
          )}

          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-3 mb-8"
          >
            {[
              { href: "/", label: "Return Home", icon: Home, color: "purple", action: "home" },
              { href: "#", label: "Try Again", icon: RefreshCw, color: "amber", action: "reset", onClick: reset },
              { href: "/contact", label: "Contact Support", icon: MessageCircle, color: "purple", action: "contact" },
              { href: "/assessment", label: "Free Assessment", icon: Compass, color: "amber", action: "assessment" },
            ].map((item, idx) => {
              const Icon = item.icon;
              const isPurple = item.color === "purple";
              const isReset = item.action === "reset";
              
              if (isReset) {
                return (
                  <button
                    key={idx}
                    onClick={reset}
                    className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-300 transition-all bg-card hover:shadow-md text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                      </div>
                      <span className="font-black text-sm">{item.label}</span>
                    </div>
                    <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:rotate-180 transition-all duration-500" />
                  </button>
                );
              }
              
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-300 transition-all bg-card hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                    </div>
                    <span className="font-black text-sm">{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-purple-200/50">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-wider text-green-600">System Online</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-purple-500" />
                <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">Auto-Reporting Enabled</span>
              </div>
            </div>
          </motion.div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/5 to-amber-500/5">
              <Heart className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Our technical team has been notified. Thank you for your patience.
              </span>
              <Coffee className="w-3 h-3 text-purple-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
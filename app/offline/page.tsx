// "use client";

// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import { motion } from "framer-motion";
// import {
//   WifiOff,
//   RefreshCw,
//   Home,
//   BookOpen,
//   Download,
//   Save,
//   Globe,
//   ArrowLeft,
//   Wifi,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function OfflinePage() {
//   const router = useRouter();
//   const [isOnline, setIsOnline] = useState(false);
//   const [isChecking, setIsChecking] = useState(false);

//   useEffect(() => {
//     // Initial check
//     setIsOnline(navigator.onLine);

//     const handleOnline = () => {
//       setIsOnline(true);
//     };

//     const handleOffline = () => {
//       setIsOnline(false);
//     };

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   // Redirect when back online
//   useEffect(() => {
//     if (isOnline) {
//       // Small delay to ensure connection is stable
//       const timer = setTimeout(() => {
//         window.location.reload();
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [isOnline]);

//   const handleRefresh = () => {
//     setIsChecking(true);
//     // Force check connection
//     if (navigator.onLine) {
//       window.location.reload();
//     } else {
//       // Still offline, show a message
//       setIsChecking(false);
//       // You could add a toast notification here
//     }
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   return (
//     <main className="min-h-screen bg-background relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-background to-background pointer-events-none" />

//       {/* Floating Elements */}
//       <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
//         <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
//           {/* Offline Icon */}
//           <Reveal>
//             <motion.div
//               animate={{
//                 scale: [1, 1.05, 1],
//                 opacity: [1, 0.8, 1],
//               }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="inline-block"
//             >
//               <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-blue-500/10 flex items-center justify-center">
//                 <WifiOff className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
//               </div>
//             </motion.div>
//           </Reveal>

//           {/* Message */}
//           <Reveal delay={0.1}>
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
//                {` You're`} <span className="text-blue-500 italic">Offline</span>
//               </h1>
//               <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
//              {`   It seems you've lost your internet connection. Don't worry, you
//                 can still access some features.`}
//               </p>
//               <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
//                {` We'll automatically refresh when your connection is restored.`}
//               </p>
//             </div>
//           </Reveal>

//           {/* Connection Status */}
//           <Reveal delay={0.15}>
//             <div className="flex items-center justify-center gap-2 text-sm">
//               <div
//                 className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"} animate-pulse`}
//               />
//               <span className="text-muted-foreground">
//                 {isOnline ? "Reconnecting..." : "No internet connection"}
//               </span>
//             </div>
//           </Reveal>

//           {/* Offline Features */}
//           <Reveal delay={0.2}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
//               {[
//                 { icon: Download, label: "Downloaded", value: "Lessons (3)" },
//                 { icon: Save, label: "Saved", value: "Progress" },
//                 { icon: BookOpen, label: "Available", value: "Quran Text" },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-4 rounded-xl bg-muted/30 border border-border"
//                 >
//                   <item.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
//                   <p className="text-xs text-muted-foreground">{item.label}</p>
//                   <p className="font-black text-sm">{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           </Reveal>

//           {/* Action Buttons */}
//           <Reveal delay={0.3}>
//             <div className="flex flex-wrap gap-4 justify-center items-center">
//               <Button
//                 onClick={handleRefresh}
//                 disabled={isChecking}
//                 className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base min-h-[44px] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <span className="flex items-center gap-2">
//                   {isChecking ? (
//                     <>
//                       <RefreshCw className="w-4 h-4 animate-spin" />
//                       CHECKING...
//                     </>
//                   ) : (
//                     <>
//                       <RefreshCw className="w-4 h-4" />
//                       TRY AGAIN
//                     </>
//                   )}
//                 </span>
//               </Button>

//               <Button
//                 onClick={handleGoBack}
//                 variant="outline"
//                 className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px] cursor-pointer hover:bg-muted transition-colors"
//               >
//                 <span className="flex items-center gap-2">
//                   <ArrowLeft className="w-4 h-4" />
//                   GO BACK
//                 </span>
//               </Button>

//               <Link href="/">
//                 <Button
//                   variant="outline"
//                   className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px] cursor-pointer hover:bg-muted transition-colors"
//                 >
//                   <span className="flex items-center gap-2">
//                     <Home className="w-4 h-4" />
//                     HOME
//                   </span>
//                 </Button>
//               </Link>
//             </div>
//           </Reveal>

//           {/* Offline Resources */}
//           <Reveal delay={0.4}>
//             <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
//               <p className="text-sm text-muted-foreground mb-4">
//                 Available offline resources:
//               </p>
//               <div className="flex flex-wrap gap-3 justify-center">
//                 {[
//                   { name: "Quran Text", icon: BookOpen, href: "/quran" },
//                   { name: "Last Lesson", icon: Download, href: "/last-lesson" },
//                   { name: "Downloads", icon: Save, href: "/downloads" },
//                 ].map((item, idx) => (
//                   <Link key={idx} href={item.href}>
//                     <div className="px-4 py-2 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black cursor-pointer hover:bg-primary-700/20 transition-colors flex items-center gap-2">
//                       <item.icon className="w-3 h-3" />
//                       {item.name}
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </Reveal>

//           {/* Help Text */}
//           <Reveal delay={0.45}>
//             <div className="text-center">
//               <p className="text-xs text-muted-foreground/50">
//                 Once you're back online, this page will automatically refresh.
//               </p>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </main>
//   );
// }









// app/offline/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  ArrowRight,
  RefreshCw,
  WifiOff,
  SignalLow,
  Battery,
  Heart,
  Coffee,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function OfflinePage() {
  const [isConnected, setIsConnected] = useState(true);
  const [checkingConnection, setCheckingConnection] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("afternoon");

  useEffect(() => {
    // Set time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");

    // Check initial connection status
    setIsConnected(navigator.onLine);

    // Listen for connection changes
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => setIsConnected(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const checkConnection = async () => {
    setCheckingConnection(true);
    
    // Attempt to fetch a small resource to test real connectivity
    try {
      const response = await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (response.ok) {
        setIsConnected(true);
        window.location.reload();
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
    } finally {
      setCheckingConnection(false);
    }
  };

  const timeGreetings = {
    morning: { greeting: "Good morning", emoji: "🌅", arabic: "صباح الخير" },
    afternoon: { greeting: "Good afternoon", emoji: "☀️", arabic: "مساء الخير" },
    evening: { greeting: "Good evening", emoji: "🌙", arabic: "مساء النور" },
  };

  const currentTime = timeGreetings[timeOfDay];

  // Offline resources (cached content)
  const offlineResources = [
    { href: "/courses", label: "Browse Courses", icon: BookOpen, color: "purple", description: "View program overviews" },
    { href: "/about", label: "About Us", icon: Heart, color: "amber", description: "Learn our story" },
    { href: "/teachers", label: "Our Scholars", icon: Sparkles, color: "purple", description: "Meet our faculty" },
  ];

  return (
    <main className="relative bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Signal Wave Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-400/20 rounded-full"
            animate={{
              y: [0, -50, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + (i * 0.4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${20 + (i * 6)}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-16 xs:py-20 sm:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Wifi Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-linear-to-r from-gray-600/20 to-amber-500/20 blur-3xl rounded-full" />
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 rounded-full bg-linear-to-br from-gray-500/10 to-amber-500/10 border-4 border-gray-500/20 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <WifiOff className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-gray-500" />
                </motion.div>
              </div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <SignalLow className="w-3 h-3 text-amber-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Time-based Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-purple-100/20 to-amber-100/20 backdrop-blur-sm border border-gray-200/50">
              <span className="text-sm">{currentTime.emoji}</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-600">{currentTime.greeting}</span>
              <span className="text-[9px] font-arabic text-amber-600">{currentTime.arabic}</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tighter font-heading mb-3"
          >
            You're{" "}
            <span className="bg-linear-to-r from-gray-600 to-amber-600 bg-clip-text text-transparent">
              Offline
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto"
          >
            It seems you've lost your internet connection. Don't worry - your progress is saved.
            We'll help you reconnect.
          </motion.p>

          {/* Connection Status Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-8"
          >
            <div className="bg-card rounded-xl p-5 border border-border shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-red-600">Disconnected</span>
                </div>
                <div className="flex items-center gap-1">
                  <Battery className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-black">{Math.floor(Math.random() * 30) + 40}%</span>
                </div>
              </div>
              
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-linear-to-r from-gray-500 to-amber-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>No active connection</span>
                <span>Retrying...</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 mb-8"
          >
            <button
              onClick={checkConnection}
              disabled={checkingConnection}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-sm shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {checkingConnection ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Checking Connection...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Check Connection
                </>
              )}
            </button>

            <div className="grid xs:grid-cols-2 sm:grid-cols-3 gap-3">
              {offlineResources.map((item, idx) => {
                const Icon = item.icon;
                const isPurple = item.color === "purple";
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group p-3 rounded-xl border border-border hover:border-purple-300 transition-all bg-card hover:shadow-md text-center"
                  >
                    <div className={`w-10 h-10 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                    </div>
                    <p className="font-black text-xs">{item.label}</p>
                    <p className="text-[8px] text-muted-foreground">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Offline Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <details className="group">
              <summary className="cursor-pointer inline-flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-purple-600 transition">
                <span>🔧 Troubleshooting Tips</span>
                <ArrowRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-3 p-4 rounded-xl bg-muted/20 text-left space-y-2">
                <p className="text-[10px] flex items-center gap-2">
                  <span>📡</span> Check your Wi-Fi or cellular connection
                </p>
                <p className="text-[10px] flex items-center gap-2">
                  <span>🔄</span> Toggle Airplane mode on and off
                </p>
                <p className="text-[10px] flex items-center gap-2">
                  <span>📱</span> Restart your router or modem
                </p>
                <p className="text-[10px] flex items-center gap-2">
                  <span>💾</span> Your progress is saved locally
                </p>
              </div>
            </details>
          </motion.div>

          {/* Inspirational Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-600/5 to-amber-500/5">
              <Heart className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Your connection will be restored soon. In the meantime, explore our cached resources.
              </span>
              <Coffee className="w-3 h-3 text-purple-500" />
            </div>
          </motion.div>

          {/* Return Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6"
          >
            <Link href="/" className="inline-flex items-center gap-1 text-[10px] font-black text-purple-600 hover:underline">
              <Home className="w-3 h-3" />
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
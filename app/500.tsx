// "use client";

// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   AlertTriangle,
//   RefreshCw,
//   Home,
//   Mail,
//   Phone,
//   HelpCircle,
//   Wifi,
//   WifiOff,
//   Clock,
//   ArrowLeft,
// } from "lucide-react";

// export default function ServerErrorPage() {
//   const router = useRouter();

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   return (
//     <main className="min-h-screen bg-background relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-background to-background pointer-events-none" />

//       {/* Floating Elements */}
//       <div className="absolute top-20 right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
//         <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
//           {/* Error Icon */}
//           <Reveal>
//             <motion.div
//               animate={{
//                 scale: [1, 1.05, 1],
//                 rotate: [0, 3, -3, 0],
//               }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="inline-block"
//             >
//               <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-red-500/10 flex items-center justify-center">
//                 <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
//               </div>
//             </motion.div>
//           </Reveal>

//           {/* Error Message */}
//           <Reveal delay={0.1}>
//             <div className="space-y-4">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
//                 <span className="text-red-500">500</span> • Server{" "}
//                 <span className="text-primary-700 italic">Error</span>
//               </h1>
//               <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
//                 Something went wrong on our end. Our technical team has been
//                 notified and is working to resolve the issue.
//               </p>
//               <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
//                 Please try refreshing the page or come back in a few minutes.
//               </p>
//             </div>
//           </Reveal>

//           {/* Status Indicators */}
//           <Reveal delay={0.2}>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
//               {[
//                 { icon: WifiOff, label: "Connection", status: "Interrupted" },
//                 { icon: Clock, label: "Est. Fix", status: "15-30 min" },
//                 {
//                   icon: HelpCircle,
//                   label: "Incident ID",
//                   status: "ERR-2024-001",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-4 rounded-xl bg-muted/30 border border-border"
//                 >
//                   <item.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
//                   <p className="text-xs text-muted-foreground">{item.label}</p>
//                   <p className="font-black text-sm">{item.status}</p>
//                 </div>
//               ))}
//             </div>
//           </Reveal>

//           {/* Action Buttons */}
//           <Reveal delay={0.3}>
//             <div className="flex flex-wrap gap-4 justify-center items-center">
//               <Button
//                 onClick={handleRefresh}
//                 className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base min-h-[44px] cursor-pointer transition-colors"
//               >
//                 <span className="flex items-center gap-2">
//                   <RefreshCw className="w-4 h-4" />
//                   TRY AGAIN
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

//           {/* Contact Options */}
//           <Reveal delay={0.4}>
//             <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
//               <p className="text-sm text-muted-foreground mb-4">
//                 Need immediate assistance? Contact us directly:
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="mailto:support@almaysaroh.com">
//                   <Button
//                     variant="ghost"
//                     className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
//                   >
//                     <Mail className="w-4 h-4" />
//                     support@almaysaroh.com
//                   </Button>
//                 </Link>
//                 <Link href="tel:+2349110163930">
//                   <Button
//                     variant="ghost"
//                     className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
//                   >
//                     <Phone className="w-4 h-4" />
//                     (+234) 911-016-3930
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </Reveal>

//           {/* Error Reference (Optional) */}
//           <Reveal delay={0.45}>
//             <div className="text-center">
//               <p className="text-[10px] text-muted-foreground/40 font-mono">
//                 Reference: 500_ERROR_
//                 {new Date().getTime().toString(36).toUpperCase()}
//               </p>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </main>
//   );
// }










// app/500.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  ArrowRight,
  RefreshCw,
  MessageCircle,
  Server,
  Database,
  Cloud,
  Clock,
  Heart,
  Coffee,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function InternalServerError() {
  const [isHovering, setIsHovering] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAutoRefresh = () => {
    if (countdown === 0) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      handleAutoRefresh();
    }
  }, [countdown]);

  return (
    <main className="relative bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        
        {/* Large Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Server Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
            animate={{
              y: [0, -70, 0],
              x: [0, (i % 2 === 0 ? 40 : -40), 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + (i * 0.3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + (i * 9)}%`,
              top: `${15 + (i * 7)}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 py-16 xs:py-20 sm:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Server Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-linear-to-r from-orange-600/20 to-amber-500/20 blur-3xl rounded-full" />
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 rounded-full bg-linear-to-br from-orange-500/10 to-amber-500/10 border-4 border-orange-500/20 flex items-center justify-center">
                <Server className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-orange-500" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1 -right-1"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Database className="w-3 h-3 text-amber-500" />
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
            Server{" "}
            <span className="bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Error
            </span>
          </motion.h1>

          {/* Error Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md mx-auto"
          >
            Our servers are experiencing technical difficulties. Our team is working to resolve the issue.
          </motion.p>

          {/* Auto-refresh Countdown */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-linear-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black">Auto-refreshing in</span>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-sm font-black text-amber-600">{countdown}</span>
              </div>
              <span className="text-xs font-black">seconds</span>
              <RefreshCw className="w-3.5 h-3.5 text-purple-500 animate-spin" />
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-3 mb-8"
          >
            {[
              { href: "/", label: "Return Home", icon: Home, color: "purple" },
              { href: "#", label: "Refresh Page", icon: RefreshCw, color: "amber", action: "refresh", onClick: () => window.location.reload() },
              { href: "/contact", label: "Report Issue", icon: MessageCircle, color: "purple" },
              { href: "/status", label: "System Status", icon: Cloud, color: "amber" },
            ].map((item, idx) => {
              const Icon = item.icon;
              const isPurple = item.color === "purple";
              const isRefresh = item.action === "refresh";
              
              if (isRefresh) {
                return (
                  <button
                    key={idx}
                    onClick={item.onClick}
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

          {/* Service Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[8px] font-black uppercase tracking-wider">Database</span>
                <span className="text-[8px] text-green-600">Operational</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-wider">API Gateway</span>
                <span className="text-[8px] text-red-600">Degraded</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[8px] font-black uppercase tracking-wider">CDN</span>
                <span className="text-[8px] text-green-600">Operational</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-600/5 to-amber-500/5">
              <Heart className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Our engineering team has been alerted. We're working to restore full service.
              </span>
              <Coffee className="w-3 h-3 text-purple-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
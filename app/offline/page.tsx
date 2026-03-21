"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  WifiOff,
  RefreshCw,
  Home,
  BookOpen,
  Download,
  Save,
  Globe,
  ArrowLeft,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OfflinePage() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Redirect when back online
  useEffect(() => {
    if (isOnline) {
      // Small delay to ensure connection is stable
      const timer = setTimeout(() => {
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleRefresh = () => {
    setIsChecking(true);
    // Force check connection
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Still offline, show a message
      setIsChecking(false);
      // You could add a toast notification here
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-background pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Offline Icon */}
          <Reveal>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-blue-500/10 flex items-center justify-center">
                <WifiOff className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
              </div>
            </motion.div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
               {` You're`} <span className="text-blue-500 italic">Offline</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
             {`   It seems you've lost your internet connection. Don't worry, you
                can still access some features.`}
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
               {` We'll automatically refresh when your connection is restored.`}
              </p>
            </div>
          </Reveal>

          {/* Connection Status */}
          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              />
              <span className="text-muted-foreground">
                {isOnline ? "Reconnecting..." : "No internet connection"}
              </span>
            </div>
          </Reveal>

          {/* Offline Features */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
              {[
                { icon: Download, label: "Downloaded", value: "Lessons (3)" },
                { icon: Save, label: "Saved", value: "Progress" },
                { icon: BookOpen, label: "Available", value: "Quran Text" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-black text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button
                onClick={handleRefresh}
                disabled={isChecking}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base min-h-[44px] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isChecking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      CHECKING...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      TRY AGAIN
                    </>
                  )}
                </span>
              </Button>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px] cursor-pointer hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  GO BACK
                </span>
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px] cursor-pointer hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    HOME
                  </span>
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Offline Resources */}
          <Reveal delay={0.4}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Available offline resources:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { name: "Quran Text", icon: BookOpen, href: "/quran" },
                  { name: "Last Lesson", icon: Download, href: "/last-lesson" },
                  { name: "Downloads", icon: Save, href: "/downloads" },
                ].map((item, idx) => (
                  <Link key={idx} href={item.href}>
                    <div className="px-4 py-2 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black cursor-pointer hover:bg-primary-700/20 transition-colors flex items-center gap-2">
                      <item.icon className="w-3 h-3" />
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Help Text */}
          <Reveal delay={0.45}>
            <div className="text-center">
              <p className="text-xs text-muted-foreground/50">
                Once you're back online, this page will automatically refresh.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

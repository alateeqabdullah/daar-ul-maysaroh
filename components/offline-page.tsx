// components/offline-page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  WifiOff,
  RefreshCw,
  Battery,
  Signal,
  Zap,
  Clock,
  AlertCircle,
  Home,
  BookOpen,
  Mail,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface OfflinePageProps {
  onRetry?: () => void;
}

export function OfflinePage({ onRetry }: OfflinePageProps) {
  const [countdown, setCountdown] = useState(30);
  const [retryCount, setRetryCount] = useState(0);

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

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    onRetry?.();
    window.location.reload();
  };

  return (
    <main className="relative bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-md mx-auto">
          {/* Animated Wifi Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-amber-500/20 blur-3xl rounded-full" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-red-500/10 to-amber-500/10 border-4 border-red-500/20 flex items-center justify-center">
                <WifiOff className="w-14 h-14 text-red-500" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 -right-2"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-amber-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl xs:text-4xl font-black tracking-tighter mb-3"
          >
            You're{" "}
            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              Offline
            </span>
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground mb-6"
          >
            It seems you've lost your internet connection. Don't worry, your
            progress is saved.
          </motion.p>

          {/* Connection Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-4 rounded-xl bg-muted/20 border border-border"
          >
            <div className="grid grid-cols-2 gap-3 text-left">
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                  Status
                </p>
                <p className="text-sm font-black text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Disconnected
                </p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                  Auto-Retry
                </p>
                <p className="text-sm font-black">{countdown}s</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                  Attempts
                </p>
                <p className="text-sm font-black">{retryCount}/5</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                  Cached Pages
                </p>
                <p className="text-sm font-black">3 available</p>
              </div>
            </div>
          </motion.div>

          {/* Cached Content Notice */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-8 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
          >
            <p className="text-[10px] text-green-600 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3" />
              Previously visited pages are available offline
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black text-sm hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full rounded-full px-6 py-3 font-black text-sm border-purple-300 text-purple-600"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <div className="flex justify-center gap-4">
              <Link
                href="/courses"
                className="text-[10px] text-muted-foreground hover:text-purple-600 transition"
              >
                Browse Courses
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/contact"
                className="text-[10px] text-muted-foreground hover:text-purple-600 transition"
              >
                Contact Support
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/assessment"
                className="text-[10px] text-muted-foreground hover:text-purple-600 transition"
              >
                Free Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

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
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Check if we're back online
    const handleOnline = () => setIsOnline(true);
    window.addEventListener("online", handleOnline);

    return () => window.removeEventListener("online", handleOnline);
  }, []);

  // Redirect when back online
  useEffect(() => {
    if (isOnline) {
      window.location.reload();
    }
  }, [isOnline]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Offline Icon */}
          <Reveal>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
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
                You're <span className="text-blue-500 italic">Offline</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                It seems you've lost your internet connection. Don't worry, you
                can still access some features.
              </p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  TRY AGAIN
                </span>
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    GO HOME
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
                {["Quran Text", "Last Lesson", "Downloads"].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

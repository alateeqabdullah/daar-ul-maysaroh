"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Mail,
  Phone,
  HelpCircle,
  Wifi,
  WifiOff,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function ServerErrorPage() {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-background to-background pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Error Icon */}
          <Reveal>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
              </div>
            </motion.div>
          </Reveal>

          {/* Error Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                <span className="text-red-500">500</span> • Server{" "}
                <span className="text-primary-700 italic">Error</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                Something went wrong on our end. Our technical team has been
                notified and is working to resolve the issue.
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                Please try refreshing the page or come back in a few minutes.
              </p>
            </div>
          </Reveal>

          {/* Status Indicators */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
              {[
                { icon: WifiOff, label: "Connection", status: "Interrupted" },
                { icon: Clock, label: "Est. Fix", status: "15-30 min" },
                {
                  icon: HelpCircle,
                  label: "Incident ID",
                  status: "ERR-2024-001",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-black text-sm">{item.status}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button
                onClick={handleRefresh}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base min-h-[44px] cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  TRY AGAIN
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

          {/* Contact Options */}
          <Reveal delay={0.4}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Need immediate assistance? Contact us directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:support@almaysaroh.com">
                  <Button
                    variant="ghost"
                    className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    support@almaysaroh.com
                  </Button>
                </Link>
                <Link href="tel:+2349110163930">
                  <Button
                    variant="ghost"
                    className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (+234) 911-016-3930
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Error Reference (Optional) */}
          <Reveal delay={0.45}>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground/40 font-mono">
                Reference: 500_ERROR_
                {new Date().getTime().toString(36).toUpperCase()}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

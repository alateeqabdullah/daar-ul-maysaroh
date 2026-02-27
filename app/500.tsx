"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function ServerErrorPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Error Icon */}
          <Reveal>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.location.reload()}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]"
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
                    RETURN HOME
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
                  <Button variant="ghost" className="gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    support@almaysaroh.com
                  </Button>
                </Link>
                <Link href="tel:+11234567890">
                  <Button variant="ghost" className="gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    +1 (123) 456-7890
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

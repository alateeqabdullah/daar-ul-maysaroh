"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  Calendar,
  Mail,
  Bell,
  RefreshCw,
  Home,
  Construction,
} from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  const estimatedCompletion = new Date();
  estimatedCompletion.setHours(estimatedCompletion.getHours() + 2);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-background to-background" />

      {/* Construction Icons */}
      <div className="absolute top-10 left-10 opacity-10">
        <Construction className="w-24 h-24 text-yellow-500" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Wrench className="w-24 h-24 text-yellow-500 rotate-45" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Maintenance Icon */}
          <Reveal>
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-yellow-500/10 flex items-center justify-center">
                <Wrench className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
              </div>
            </motion.div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                Scheduled{" "}
                <span className="text-yellow-500 italic">Maintenance</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                We're currently performing scheduled maintenance to improve your
                experience. We'll be back shortly!
              </p>
            </div>
          </Reveal>

          {/* Status Indicators */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
              {[
                { icon: Clock, label: "Started", value: "10:00 AM EST" },
                { icon: Calendar, label: "Expected", value: "~2 hours" },
                { icon: Bell, label: "Notify Me", value: "When ready" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-yellow-500" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-black text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Progress Bar */}
          <Reveal delay={0.25}>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Maintenance in progress</span>
                <span>~35% complete</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-yellow-500 rounded-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  CHECK STATUS
                </span>
              </Button>

              <Link href="/">
                <Button className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-yellow-500 hover:bg-yellow-600 text-white text-sm sm:text-base min-h-[44px]">
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    HOME
                  </span>
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Get Notified */}
          <Reveal delay={0.4}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Want to know when we're back online?
              </p>
              <Link href="mailto:notify@almaysaroh.com?subject=Notify%20me%20when%20site%20is%20back">
                <Button variant="ghost" className="gap-2">
                  <Mail className="w-4 h-4" />
                  GET NOTIFIED
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

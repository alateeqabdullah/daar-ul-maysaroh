"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Rocket,
  Clock,
  Calendar,
  Mail,
  Bell,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("You'll be notified!", {
      description: "We'll email you when this launches.",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-700/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      {/* Sparkles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 right-1/4"
      >
        <Sparkles className="w-6 h-6 text-primary-700/20" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Icon */}
          <Reveal>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary-700/10 to-primary-500/10 flex items-center justify-center">
                <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-primary-700" />
              </div>
            </motion.div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading">
                Coming <span className="text-primary-700 italic">Soon</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                We're working on something amazing for you. Stay tuned for our
                launch!
              </p>
            </div>
          </Reveal>

          {/* Features Preview */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
              {[
                { icon: BookOpen, label: "New Courses", value: "Coming" },
                { icon: Users, label: "Community", value: "Soon" },
                { icon: Star, label: "Features", value: "5+" },
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

          {/* Countdown Placeholder */}
          <Reveal delay={0.25}>
            <div className="flex justify-center gap-3 sm:gap-4">
              {[
                { value: "30", label: "Days" },
                { value: "12", label: "Hours" },
                { value: "45", label: "Mins" },
                { value: "22", label: "Secs" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-700 bg-primary-50 dark:bg-primary-950/40 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center">
                    {item.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Notify Form */}
          <Reveal delay={0.3}>
            <form onSubmit={handleNotify} className="max-w-md mx-auto pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-center sm:text-left"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-6 py-3 font-black bg-primary-700 hover:bg-primary-800 min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? "NOTIFYING..." : "NOTIFY ME"}
                    <Bell className="w-4 h-4" />
                  </span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                We'll notify you when we launch. No spam, ever.
              </p>
            </form>
          </Reveal>

          {/* Back Home */}
          <Reveal delay={0.4}>
            <div className="pt-8">
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  BACK TO HOME
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

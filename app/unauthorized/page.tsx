"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Lock,
  Shield,
  ArrowLeft,
  Home,
  LogIn,
  Mail,
  AlertOctagon,
  Key,
  HelpCircle,
  UserCheck,
} from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-background to-background pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Lock Icon */}
          <Reveal>
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, -3, 3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-red-500/10 flex items-center justify-center relative">
                <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />

                {/* Shield Overlay */}
                <div className="absolute -top-2 -right-2">
                  <Shield className="w-6 h-6 text-primary-700/30" />
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                Access <span className="text-red-500 italic">Denied</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
               {` You don't have permission to access this page. This area is
                protected for authorized users only.`}
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                Please sign in with an account that has the required
                permissions.
              </p>
            </div>
          </Reveal>

          {/* Access Level Indicators */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6">
              {[
                {
                  icon: AlertOctagon,
                  label: "Restricted Area",
                  value: "Admin/Student Only",
                },
                {
                  icon: Key,
                  label: "Required Role",
                  value: "Student / Staff / Admin",
                },
                {
                  icon: Shield,
                  label: "Security Level",
                  value: "Level 2 Authentication",
                },
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

          {/* Quick Help */}
          <Reveal delay={0.25}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="w-4 h-4 text-primary-700" />
              <span>
                Need access? Contact your administrator or sign in with
                appropriate credentials.
              </span>
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11 cursor-pointer hover:bg-muted transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  GO BACK
                </span>
              </Button>

              <Link href="/login">
                <Button className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-white text-sm sm:text-base min-h-11 cursor-pointer transition-colors">
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    SIGN IN
                  </span>
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11 cursor-pointer hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    HOME
                  </span>
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Contact Support */}
          <Reveal delay={0.4}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                Think this is a mistake? Contact our support team:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:access@almaysaroh.com">
                  <Button
                    variant="ghost"
                    className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    access@almaysaroh.com
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className="gap-2 text-sm cursor-pointer hover:bg-muted transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    SUPPORT CENTER
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Helpful Tip */}
          <Reveal delay={0.45}>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 text-xs font-medium">
                <UserCheck className="w-3 h-3" />
                <span>
                {`  Already have access? Make sure you're signed in with the
                  correct account`}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

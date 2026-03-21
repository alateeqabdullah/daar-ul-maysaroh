// app/error.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Home,
  Mail,
  Bug,
  FileWarning,
  ArrowLeft,
  Loader2,
  Shield,
  Clock,
} from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await reset();
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-background to-background pointer-events-none" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Error Icon */}
          <Reveal>
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-orange-500/10 flex items-center justify-center">
                <FileWarning className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 animate-pulse">
                <Bug className="w-6 h-6 text-muted-foreground/30" />
              </div>
            </div>
          </Reveal>

          {/* Error Message */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading">
                Something Went{" "}
                <span className="text-orange-500 italic">Wrong</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                We encountered an unexpected error. Our team has been
                automatically notified.
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
              {`  Don't worry - you can try again or return to the homepage.`}
              </p>
            </div>
          </Reveal>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <Reveal delay={0.15}>
              <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border text-left max-w-2xl mx-auto">
                <p className="font-mono text-xs sm:text-sm overflow-auto break-all">
                  <span className="text-red-500 font-bold">Error:</span>{" "}
                  {error.message}
                  {error.digest && (
                    <>
                      <br />
                      <span className="text-muted-foreground">
                        <span className="font-bold">Digest:</span>{" "}
                        {error.digest}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          )}

          {/* Action Buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button
                onClick={handleReset}
                disabled={isResetting}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base min-h-11 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="flex items-center gap-2">
                  {isResetting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isResetting ? "RETRYING..." : "TRY AGAIN"}
                </span>
              </Button>

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

          {/* Trust Badges */}
          <Reveal delay={0.25}>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 text-primary-700" />
                <span>Auto-reported to our team</span>
              </div>
              <div className="hidden sm:block w-px h-3 bg-border" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 text-primary-700" />
                <span>Typically resolved within hours</span>
              </div>
            </div>
          </Reveal>

          {/* Support Options */}
          <Reveal delay={0.3}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                If the problem persists, please report it to our support team:
              </p>
              <Link href="mailto:errors@almaysaroh.com?subject=Error%20Report">
                <Button
                  variant="ghost"
                  className="gap-2 cursor-pointer hover:bg-muted transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  errors@almaysaroh.com
                </Button>
              </Link>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-4">
                  Please include this error ID in your report:{" "}
                  <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                    {error.digest}
                  </code>
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

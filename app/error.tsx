"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import {
  AlertCircle,
  RefreshCw,
  Home,
  Mail,
  Bug,
  FileWarning,
} from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Error Icon */}
          <Reveal>
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-orange-500/10 flex items-center justify-center">
                <FileWarning className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
              </div>

              {/* Bug Icon */}
              <div className="absolute -bottom-4 -right-4">
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
            </div>
          </Reveal>

          {/* Error Details (for debugging) */}
          {process.env.NODE_ENV === "development" && (
            <Reveal delay={0.15}>
              <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border text-left">
                <p className="font-mono text-xs sm:text-sm overflow-auto">
                  <span className="text-red-500">Error:</span> {error.message}
                  {error.digest && (
                    <>
                      <br />
                      <span className="text-muted-foreground">
                        Digest: {error.digest}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          )}

          {/* Action Buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={reset}
                className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base min-h-[44px]"
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

          {/* Support Options */}
          <Reveal delay={0.3}>
            <div className="pt-8 border-t border-border/50 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">
                If the problem persists, please report it to our support team:
              </p>
              <Link href="mailto:errors@almaysaroh.com?subject=Error%20Report">
                <Button variant="ghost" className="gap-2">
                  <Mail className="w-4 h-4" />
                  errors@almaysaroh.com
                </Button>
              </Link>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-4">
                  Please include this error ID in your report:{" "}
                  <code className="font-mono bg-muted px-2 py-1 rounded">
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

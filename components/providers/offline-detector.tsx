"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OfflineProviderProps {
  children: React.ReactNode;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function OfflineProvider({
  children,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}: OfflineProviderProps) {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Handle online/offline events
  useEffect(() => {
    setMounted(true);

    const handleOffline = () => {
      setIsOffline(true);
      setWasOffline(true);
      setShowBanner(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setIsReconnecting(true);

      // Simulate reconnection delay
      setTimeout(() => {
        setIsReconnecting(false);
        // Auto-refresh the page after coming back online
        if (autoRefresh && wasOffline) {
          window.location.reload();
        }
      }, 1500);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Initial check
    setIsOffline(!navigator.onLine);
    if (!navigator.onLine) {
      setWasOffline(true);
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [autoRefresh, wasOffline]);

  // Auto-refresh check when coming back online
  useEffect(() => {
    if (!isOffline && wasOffline && autoRefresh) {
      const timer = setTimeout(() => {
        if (navigator.onLine) {
          window.location.reload();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOffline, wasOffline, autoRefresh]);

  // Manual retry
  const handleRetry = useCallback(() => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Force check again
      setIsOffline(true);
      setShowBanner(true);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
  }, []);

  // During SSR, render without any wrapper
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Main content with optional freeze effect */}
      <div
        className={cn(
          "transition-all duration-300",
          isOffline && "opacity-70 grayscale-[0.2] pointer-events-none",
        )}
      >
        {children}
      </div>

      {/* Offline Banner - Animated */}
      <AnimatePresence>
        {isOffline && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto sm:min-w-[380px] max-w-lg"
          >
            <div className="glass-surface bg-amber-500/10 dark:bg-amber-950/30 backdrop-blur-md border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative p-4">
                {/* Animated indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-shimmer" />

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <WifiOff className="w-5 h-5 text-amber-500 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-black text-sm uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Connection Lost
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      You're currently offline. Some features may be
                      unavailable.
                      {wasOffline &&
                        " We'll reconnect automatically when you're back online."}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        onClick={handleRetry}
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 rounded-full text-xs font-black gap-1 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </Button>
                      <Button
                        onClick={handleDismiss}
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 rounded-full text-xs font-black text-muted-foreground hover:text-foreground"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <button
                    onClick={handleDismiss}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-muted/50 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reconnecting Indicator */}
      <AnimatePresence>
        {!isOffline && isReconnecting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass-surface bg-green-500/10 dark:bg-green-950/30 backdrop-blur-md border border-green-500/30 rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black text-green-600 dark:text-green-400">
                  Reconnecting...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden iframe for background keep-alive (optional) */}
      {!isOffline && (
        <div className="hidden">
          <iframe
            src="/api/keep-alive"
            title="keep-alive"
            aria-hidden="true"
            style={{ display: "none" }}
          />
        </div>
      )}
    </>
  );
}

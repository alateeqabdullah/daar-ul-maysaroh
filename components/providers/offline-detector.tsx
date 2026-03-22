"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OfflineProviderProps {
  children: React.ReactNode;
  autoRefresh?: boolean;
}

export function OfflineProvider({
  children,
  autoRefresh = true,
}: OfflineProviderProps) {
  // CRITICAL: Always initialize with false on server, update on client
  const [isOffline, setIsOffline] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Using a ref to persist the auto-refresh behavior across re-renders
  const autoRefreshRef = useRef(autoRefresh);
  useEffect(() => {
    autoRefreshRef.current = autoRefresh;
  }, [autoRefresh]);

  // Mark component as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Manual retry mechanism
  const handleRetry = useCallback(() => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      setIsOffline(true);
      setHasBeenOffline(true);
      setShowBanner(true);
      toast.error("Still offline", {
        description: "Please check your internet connection.",
        duration: 4000,
        position: "top-center",
      });
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
  }, []);

  // Effect to handle online/offline events - ONLY RUNS ON CLIENT
  useEffect(() => {
    if (!mounted) return;

    let reconnectTimer: NodeJS.Timeout;

    // Set initial offline state based on actual connection
    setIsOffline(!navigator.onLine);
    setHasBeenOffline(!navigator.onLine);

    const handleOffline = () => {
      setIsOffline(true);
      setHasBeenOffline(true);
      setShowBanner(true);
      setIsReconnecting(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setIsReconnecting(true);
      setShowBanner(false);

      reconnectTimer = setTimeout(() => {
        setIsReconnecting(false);
        if (autoRefreshRef.current && hasBeenOffline) {
          window.location.reload();
        }
        setHasBeenOffline(false);
      }, 1500);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [mounted, hasBeenOffline]);

  // Don't render anything that could cause hydration mismatch until mounted
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

      {/* OFFLINE BANNER - FULLY MOBILE OPTIMIZED */}
      <AnimatePresence>
        {isOffline && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 px-3 sm:px-0"
          >
            <div className="glass-surface bg-amber-500/10 dark:bg-amber-950/30 backdrop-blur-md border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden w-full sm:w-[420px] max-w-full">
              {/* Animated indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-shimmer" />

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <WifiOff className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm sm:text-base uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                      Connection Lost
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      You're currently offline. Some features may be
                      unavailable.
                      {hasBeenOffline &&
                        autoRefresh &&
                        " We'll reconnect automatically when you're back online."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <Button
                        onClick={handleRetry}
                        size="sm"
                        variant="outline"
                        className="h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-black gap-1.5 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                        aria-label="Retry connection"
                      >
                        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Retry Now
                      </Button>
                      <Button
                        onClick={handleDismiss}
                        size="sm"
                        variant="ghost"
                        className="h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-black text-muted-foreground hover:text-foreground"
                        aria-label="Dismiss offline banner"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  {/* Close Button - Mobile Optimized */}
                  <button
                    onClick={handleDismiss}
                    className="shrink-0 p-1.5 sm:p-2 -mt-1 -mr-1 rounded-full hover:bg-muted/50 transition-colors active:bg-muted/70"
                    aria-label="Close offline notification"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECONNECTING INDICATOR - Mobile Optimized */}
      <AnimatePresence>
        {!isOffline && isReconnecting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50"
            role="status"
            aria-live="polite"
          >
            <div className="glass-surface bg-green-500/10 dark:bg-green-950/30 backdrop-blur-md border border-green-500/30 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-black text-green-600 dark:text-green-400 whitespace-nowrap">
                  Reconnecting to network...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

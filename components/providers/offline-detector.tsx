"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// It's good practice to define types for props explicitly.
interface OfflineProviderProps {
  children: React.ReactNode;
  /**
   * If true, the page will automatically refresh when reconnecting after being offline.
   * @default true
   */
  autoRefresh?: boolean;
  /**
   * The interval in milliseconds to check for connectivity when autoRefresh is enabled
   * and the user is back online. (Note: browser events are primary, this is a fallback/reinforcement)
   * @default 30000 (30 seconds)
   * @deprecated The native `online` event is more reliable. This prop might be removed in future versions.
   */
  refreshInterval?: number; // Marked as deprecated as native events are generally preferred.
}

export function OfflineProvider({
  children,
  autoRefresh = true,
}: OfflineProviderProps) {
  const [isOffline, setIsOffline] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false); // Renamed for clarity
  const [showBanner, setShowBanner] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Using a ref to persist the auto-refresh behavior across re-renders
  const autoRefreshRef = useRef(autoRefresh);
  useEffect(() => {
    autoRefreshRef.current = autoRefresh;
  }, [autoRefresh]);

  // Effect to handle online/offline events
  useEffect(() => {
    // Initial check on mount
    const initialOfflineStatus = !navigator.onLine;
    setIsOffline(initialOfflineStatus);
    if (initialOfflineStatus) {
      setHasBeenOffline(true);
      setShowBanner(true);
    }

    const handleOffline = () => {
      setIsOffline(true);
      setHasBeenOffline(true);
      setShowBanner(true);
      setIsReconnecting(false); // Ensure this is false when offline
    };

    const handleOnline = () => {
      setIsOffline(false);
      setIsReconnecting(true);
      setShowBanner(false); // Hide banner immediately on online event

      // Simulate reconnection delay and then potentially refresh
      const reconnectTimer = setTimeout(() => {
        setIsReconnecting(false);
        if (autoRefreshRef.current && hasBeenOffline) {
          // Only reload if we actually went offline before
          window.location.reload();
        }
        // Reset hasBeenOffline after potential refresh, or if not refreshing
        setHasBeenOffline(false);
      }, 1500); // Give a brief moment for the network to stabilize

      return () => clearTimeout(reconnectTimer); // Cleanup timeout if component unmounts
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [hasBeenOffline]); // hasBeenOffline is a dependency to ensure the auto-refresh logic uses the latest state

  // Manual retry mechanism
  const handleRetry = useCallback(() => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // If still offline, re-show the banner and update state
      setIsOffline(true);
      setHasBeenOffline(true);
      setShowBanner(true);
      // Optional: Add a visual indicator here for a failed retry
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
  }, []);

  // No `mounted` state needed. Client components only run in the browser.
  // The initial state check covers the first render.

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
            transition={{ type: "spring", damping: 25, stiffness: 200 }} // Refined transition
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto sm:min-w-[380px] max-w-lg"
            role="alert" // Announce to screen readers that an important message appeared
            aria-live="polite" // Screen readers will announce changes
          >
            <div className="glass-surface bg-amber-500/10 dark:bg-amber-950/30 backdrop-blur-md border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative p-4">
                {/* Animated indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-shimmer" />

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {" "}
                    {/* Minor alignment fix */}
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
                      unavailable.{" "}
                      {hasBeenOffline &&
                        autoRefresh &&
                        "We'll reconnect and refresh automatically when you're back online."}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        onClick={handleRetry}
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 rounded-full text-xs font-black gap-1 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                        aria-label="Retry connection"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </Button>
                      <Button
                        onClick={handleDismiss}
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 rounded-full text-xs font-black text-muted-foreground hover:text-foreground"
                        aria-label="Dismiss offline banner"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <button
                    onClick={handleDismiss}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-muted/50 transition-colors"
                    aria-label="Close offline notification"
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
            transition={{ duration: 0.3 }} // Simpler transition for this smaller element
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
            role="status" // Indicate to screen readers that this is status information
            aria-live="polite"
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
      {/*
        Consider if `keep-alive` is truly necessary. Modern browsers are good at managing
        background tabs. An iframe to an API route can sometimes cause unnecessary
        server load or resource usage if not carefully managed.
        If it's for session persistence, consider alternative strategies like
        server-side sessions with refresh tokens or client-side caching.
      */}
      {!isOffline && (
        <div className="hidden">
          {/* <iframe
            src="/api/keep-alive"
            title="keep-alive"
            aria-hidden="true"
            style={{ display: "none" }}
          /> */}
        </div>
      )}
    </>
  );
}

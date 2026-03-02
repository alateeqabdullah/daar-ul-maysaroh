// components/providers/offline-detector.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function OfflineDetector({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Don't run during server-side rendering
    if (typeof window === "undefined") return;

    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === "development";

    const handleOffline = () => {
      setIsOffline(true);
      // Don't redirect if already on offline page
      if (pathname !== "/offline") {
        router.push("/offline");
      }
    };

    const handleOnline = () => {
      setIsOffline(false);
      // If we're on the offline page and come back online, go home
      if (pathname === "/offline") {
        router.push("/");
      }
    };

    // Add event listeners
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Initial check - but with a delay to avoid hydration issues
    const timer = setTimeout(() => {
      // Only redirect if:
      // 1. We're actually offline
      // 2. Not in development (or if in development, only if really offline)
      // 3. Not already on offline page
      if (!navigator.onLine && !isDevelopment && pathname !== "/offline") {
        router.push("/offline");
      }
    }, 1000); // Delay to ensure everything is loaded

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(timer);
    };
  }, [router, pathname]);

  // Don't render anything special, just children
  return <>{children}</>;
}

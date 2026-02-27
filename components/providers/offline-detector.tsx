// components/providers/offline-detector.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function OfflineDetector({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is offline
    const handleOffline = () => {
      router.push("/offline");
    };

    const handleOnline = () => {
      // If we're on the offline page and come back online, go home
      if (window.location.pathname === "/offline") {
        router.push("/");
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Initial check
    if (!navigator.onLine) {
      router.push("/offline");
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [router]);

  return <>{children}</>;
}

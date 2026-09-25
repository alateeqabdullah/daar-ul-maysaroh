// app/components/offline-banner.tsx
"use client";

import { useOffline } from "@/app/providers/offline-provider";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const { isOffline } = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] border-b border-amber-500/30 bg-amber-50/95 px-4 py-2 text-center text-[12px] font-medium text-amber-900 backdrop-blur dark:bg-amber-950/95 dark:text-amber-100">
      <WifiOff className="mr-1.5 inline h-3.5 w-3.5" strokeWidth={1.75} />
      You are currently offline. Some features may be unavailable.
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast.dismiss("offline-toast");
      toast.success("Back online", { description: "You can now continue." });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast.error("You are offline", {
        id: "offline-toast",
        description: "App functionality is paused until connection returns.",
        duration: Infinity,
      });
    };

    // Initial check
    if (!navigator.onLine) handleOffline();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className={isOffline ? "app-offline-freeze" : ""}>
      {children}

      <style jsx global>{`
        /* The Magic: Gray out and disable EVERYTHING inside this div */
        .app-offline-freeze {
          filter: grayscale(0.8) opacity(0.8);
          pointer-events: none; /* Disables all clicks/inputs */
          user-select: none; /* Prevents highlighting text */
          cursor: not-allowed;
          transition: filter 0.3s ease;
        }

        /* EXCEPT the Sonner Toaster - we must keep this interactive! */
        [data-sonner-toaster] {
          filter: none !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
// 📄 src/components/layout/announcement-bar.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  // In production, you might want to show this based on user preferences
  // or specific campaigns
  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem("hasSeenAnnouncement");
    if (hasSeenAnnouncement) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenAnnouncement", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 px-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span className="font-medium">Limited Time Offer</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Get 20% off your first month with code: WELCOME20</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-primary-foreground/20 rounded transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

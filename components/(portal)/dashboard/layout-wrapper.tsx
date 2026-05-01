"use client";

import { ReactNode } from "react";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isOpen, width } = useSidebarStore();

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        // When sidebar is open, add margin-left
        isOpen ? "lg:ml-80" : "lg:ml-0",
      )}
      style={
        {
          // Use CSS custom properties for smoother transitions
          "--sidebar-width": `${width}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

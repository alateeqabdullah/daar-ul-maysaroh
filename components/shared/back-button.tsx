// components/shared/navigation-header.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface NavigationHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonLabel?: string;
  className?: string;
  onBack?: () => void;
}

export function NavigationHeader({
  breadcrumbs = [],
  showBackButton = true,
  backButtonLabel = "Back",
  className,
  onBack,
}: NavigationHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-1.5 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">{backButtonLabel}</span>
          </Button>
        )}

        {breadcrumbs.length > 0 && showBackButton && (
          <span className="text-muted-foreground">|</span>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <Link
                  href={crumb.href}
                  className={cn(
                    "hover:text-foreground transition-colors",
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

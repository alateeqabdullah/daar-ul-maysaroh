"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  isDark: boolean;
}

export function Breadcrumbs({ isDark }: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link
        href="/admin"
        className={cn(
          "flex items-center space-x-1 transition-colors duration-300 hover:text-indigo-600",
          isDark ? "text-gray-400 hover:text-indigo-400" : "text-gray-500"
        )}
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>

      {pathnames.map((name, index) => {
        const href = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <div key={href} className="flex items-center space-x-2">
            <ChevronRight
              className={cn(
                "w-4 h-4",
                isDark ? "text-gray-600" : "text-gray-400"
              )}
            />
            {isLast ? (
              <span
                className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-gray-900"
                )}
              >
                {formattedName}
              </span>
            ) : (
              <Link
                href={href}
                className={cn(
                  "transition-colors duration-300 hover:text-indigo-600",
                  isDark
                    ? "text-gray-400 hover:text-indigo-400"
                    : "text-gray-500"
                )}
              >
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

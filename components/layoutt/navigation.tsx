// 📄 src/components/layout/navigation.tsx
"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavigationProps {
  mobile?: boolean;
}

const navigationItems = [
  { name: "Home", href: "/", exact: true },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Teachers", href: "/teachers" }, 
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href;
    if (href.startsWith("#")) return false; // Hash links not active in pathname
    return pathname.startsWith(href);
  };

  if (mobile) {
    return (
      <nav className="space-y-4">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block py-3 px-4 text-lg font-medium rounded-lg transition-all duration-200",
              isActive(item.href, item.exact)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "relative text-sm font-medium transition-all duration-200",
            "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isActive(item.href, item.exact)
              ? "text-primary"
              : "text-foreground/80 hover:text-primary"
          )}
        >
          {item.name}
          {isActive(item.href, item.exact) && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}

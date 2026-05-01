"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badge?: string;
    description?: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ item, isActive, onClick }: NavItemProps) {
  const Icon = item.icon;

  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group flex items-center w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        isActive
          ? "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-400 shadow-lg"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="relative">
        <Icon
          className={cn(
            "mr-3 h-5 w-5 transition-all duration-300",
            isActive
              ? "text-primary-700 dark:text-primary-400"
              : "text-muted-foreground group-hover:text-primary-700 dark:group-hover:text-primary-400",
          )}
          aria-hidden="true"
        />
        {isActive && (
          <motion.div
            layoutId="activeNavItem"
            className="absolute inset-0 bg-primary-500/10 rounded-lg blur-sm"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-bold tracking-tight truncate">{item.name}</p>
        {item.description && (
          <p className="text-[10px] font-medium text-muted-foreground mt-0.5 truncate opacity-70 group-hover:opacity-100 transition-opacity">
            {item.description}
          </p>
        )}
      </div>

      {item.badge && (
        <Badge
          variant="secondary"
          className="ml-2 shrink-0 rounded-full text-[10px] font-black px-2 py-0.5 border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white"
        >
          {item.badge}
        </Badge>
      )}

      {isActive && (
        <ChevronRight className="ml-2 h-4 w-4 text-primary-700 dark:text-primary-400 flex-shrink-0" />
      )}
    </motion.button>
  );
}

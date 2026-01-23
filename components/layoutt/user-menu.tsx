// 📄 src/components/layout/user-menu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  BookOpen,
  ChevronDown,
  Shield,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UserMenuProps {
  mobile?: boolean;
}

export function UserMenu({ mobile = false }: UserMenuProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return (
      <div
        className={cn(
          "flex items-center space-x-4",
          mobile && "flex-col space-y-4 space-x-0 w-full"
        )}
      >
        <Link href="/auth/signin">
          <Button
            variant="ghost"
            className={cn(mobile && "w-full justify-center")}
          >
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className={cn(mobile && "w-full justify-center")}>
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const user = session.user;

  const getDashboardLink = () => {
    switch (user.role) {
      case "ADMIN":
        return "/admin";
      case "TEACHER":
        return "/teacher";
      default:
        return "/dashboard";
    }
  };

  const getDashboardIcon = () => {
    switch (user.role) {
      case "ADMIN":
        return Shield;
      case "TEACHER":
        return BarChart3;
      default:
        return BookOpen;
    }
  };

  const DashboardIcon = getDashboardIcon();

  const menuItems = [
    {
      icon: DashboardIcon,
      label: "Dashboard",
      href: getDashboardLink(),
    },
    {
      icon: User,
      label: "Profile",
      href: `${getDashboardLink()}/profile`,
    },
    {
      icon: CreditCard,
      label: "Billing",
      href: "/dashboard/billing",
    },
    {
      icon: Settings,
      label: "Settings",
      href: `${getDashboardLink()}/settings`,
    },
  ];

  if (mobile) {
    return (
      <div className="space-y-4 w-full">
        {/* User Info */}
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">
              {user.name}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {user.email}
            </p>
            <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
              {user.role?.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}

          <button
            onClick={() => signOut()}
            className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground leading-none">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {user.role?.toLowerCase()}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-card-foreground hover:bg-muted rounded-lg transition-colors text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Sign Out */}
            <div className="p-2 border-t border-border">
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

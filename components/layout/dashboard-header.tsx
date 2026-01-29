"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  User,
  Settings,
  Command,
  LogOut,
  Menu,
  Home,
  TrendingUp,
  Calendar,
  FileText,
  Users,
  Crown,
  Sparkles,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/store/use-sidebar-store";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string;
  };
}

export default function DashboardHeader({ user }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isOpen, toggle, setOpen } = useSidebarStore(); // Get both toggle and setOpen
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const notifications = [
    {
      id: 1,
      text: "New student registration pending approval",
      time: "5 min ago",
      type: "warning",
      icon: AlertCircle,
    },
    {
      id: 2,
      text: "Class schedule updated for Quran 101",
      time: "1 hour ago",
      type: "info",
      icon: Calendar,
    },
    {
      id: 3,
      text: "Monthly report ready for review",
      time: "2 hours ago",
      type: "success",
      icon: FileText,
    },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBreadcrumb = () => {
    const path = pathname.split("/").filter((p) => p);
    if (path.length === 0) return "Dashboard";

    const lastSegment = path[path.length - 1];
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPageIcon = () => {
    const path = pathname.split("/").filter((p) => p);
    if (path.length === 0) return Home;

    const lastSegment = path[path.length - 1];
    switch (lastSegment) {
      case "dashboard":
        return Home;
      case "students":
        return Users;
      case "teachers":
        return User;
      case "classes":
        return Calendar;
      case "grades":
        return TrendingUp;
      case "attendance":
        return CheckCircle;
      case "reports":
        return FileText;
      case "settings":
        return Settings;
      default:
        return Home;
    }
  };

  const PageIcon = getPageIcon();

  const getRoleColor = () => {
    switch (user.role) {
      case "SUPER_ADMIN":
        return "bg-linear-to-br from-amber-500 via-orange-500 to-amber-600";
      case "ADMIN":
        return "bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700";
      case "TEACHER":
        return "bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-600";
      case "STUDENT":
        return "bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600";
      case "PARENT":
        return "bg-gradient-to-br from-violet-500 via-purple-600 to-violet-600";
      default:
        return "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800";
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300",
          isScrolled && "shadow-lg",
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Left section - Menu toggle & page info */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button - FIXED TOGGLE */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition-all duration-300 group"
                onClick={toggle} // Use toggle from store
                aria-label="Toggle Sidebar"
              >
                {isOpen ? (
                  <X className="h-5 w-5 text-primary-700 dark:text-primary-400" />
                ) : (
                  <Menu className="h-5 w-5 text-primary-700 dark:text-primary-400" />
                )}
              </Button>

              {/* Page info */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-9 h-9 bg-linear-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <PageIcon className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-black tracking-tight text-foreground">
                      {getBreadcrumb()}
                    </h1>
                    <Badge className="rounded-full bg-linear-to-r from-emerald-400 to-teal-500 border-0 text-[10px] font-black px-2 py-0.5">
                      LIVE
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Welcome back,{" "}
                    <span className="font-bold text-primary-700 dark:text-primary-400">
                      {user.name.split(" ")[0]}
                    </span>
                    <Sparkles className="h-3 w-3 ml-1 inline text-amber-500" />
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden lg:block flex-1 max-w-xl px-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary-700 dark:group-focus-within:text-primary-400" />
                <Input
                  type="search"
                  placeholder="Search anything... (Press ⌘K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-border/50 bg-background/50 pl-12 pr-12 text-sm focus-visible:ring-primary-700 focus-visible:border-primary-700 rounded-xl h-10 backdrop-blur-sm outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <kbd className="rounded-lg border border-border bg-background px-1.5 py-1 font-sans text-xs font-black text-muted-foreground">
                    <Command className="mr-1 inline-block h-3 w-3" />K
                  </kbd>
                </div>
              </div>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 w-9 h-9 transition-all duration-300 outline-none"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Language */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 w-9 h-9 relative group outline-none"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "lang" ? null : "lang")
                  }
                  aria-expanded={activeDropdown === "lang"}
                  aria-label="Language Selector"
                >
                  <Globe className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-[8px] flex items-center justify-center">
                    EN
                  </Badge>
                </Button>

                <AnimatePresence>
                  {activeDropdown === "lang" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20"
                        >
                          English
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 font-arabic"
                          dir="rtl"
                        >
                          العربية
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20"
                        >
                          Urdu
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 w-9 h-9 relative group outline-none"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "notif" ? null : "notif",
                    )
                  }
                  aria-expanded={activeDropdown === "notif"}
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-linear-to-r from-red-500 to-pink-600 ring-2 ring-background">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60"></span>
                  </span>
                </Button>

                <AnimatePresence>
                  {activeDropdown === "notif" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-black uppercase tracking-wider">
                            Notifications
                          </p>
                          <Badge className="rounded-full bg-linear-to-r from-primary-600 to-primary-800 text-[10px] font-black px-2.5 py-0.5">
                            {notifications.length} New
                          </Badge>
                        </div>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <div
                              key={notification.id}
                              className="p-4 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center">
                                  <Icon className="h-4 w-4 text-primary-700 dark:text-primary-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground leading-tight">
                                    {notification.text}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full h-11 rounded-none text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View all notifications
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-xl px-2.5 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-300 group outline-none"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "user" ? null : "user")
                  }
                  aria-expanded={activeDropdown === "user"}
                  aria-label="User Menu"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8 border border-primary-500/20 group-hover:border-primary-500/30 transition-colors">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback
                        className={cn(
                          "text-white font-bold text-xs",
                          getRoleColor(),
                        )}
                      >
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    {user.role === "SUPER_ADMIN" && (
                      <Crown className="absolute -top-1 -right-1 h-3 w-3 text-amber-500 fill-amber-500" />
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background bg-linear-to-r from-emerald-400 to-teal-500" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-xs font-bold text-foreground leading-none">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">
                      {user.role.replace("_", " ")}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "hidden lg:block h-3.5 w-3.5 text-muted-foreground transition-transform",
                      activeDropdown === "user" && "rotate-180",
                    )}
                  />
                </Button>

                <AnimatePresence>
                  {activeDropdown === "user" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-primary-500/30">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback
                              className={cn(
                                "text-white font-bold",
                                getRoleColor(),
                              )}
                            >
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link href="/profile">
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-10 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20"
                          >
                            <User className="mr-3 h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                            My Profile
                          </Button>
                        </Link>
                        <Link href="/settings">
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-10 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20"
                          >
                            <Settings className="mr-3 h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                            Account Settings
                          </Button>
                        </Link>
                        <div className="my-2 px-3">
                          <div className="rounded-xl bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium text-muted-foreground">
                                Storage
                              </span>
                              <span className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                64%
                              </span>
                            </div>
                            <div className="w-full bg-primary-100 dark:bg-primary-900/30 rounded-full h-1.5">
                              <div className="bg-linear-to-r from-primary-500 to-primary-600 h-1.5 rounded-full w-2/3" />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-red-400"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-3 h-3.5 w-3.5" />
                          Sign Out
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full border-border/50 bg-background/50 pl-10 text-sm rounded-xl h-9"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

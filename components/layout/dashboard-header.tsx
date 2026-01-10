"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getInitials, cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSidebarStore } from "@/store/use-sidebar-store";

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
  const { toggle } = useSidebarStore();

  const [notifications] = useState([
    {
      id: 1,
      text: "New student registration pending approval",
      time: "5 min ago",
    },
    { id: 2, text: "Class schedule updated for Quran 101", time: "1 hour ago" },
    { id: 3, text: "Monthly report ready for review", time: "2 hours ago" },
  ]);

  const getBreadcrumb = () => {
    const path = pathname.split("/").filter((p) => p);
    if (path.length === 0) return "Dashboard";

    const lastSegment = path[path.length - 1];
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace("-", " ")
    );
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu Toggle, Breadcrumb & Greeting */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
              onClick={toggle}
            >
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </Button>

            <div className="hidden sm:block">
              <h1 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                {getBreadcrumb()}
              </h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Welcome,{" "}
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  {user.name}
                </span>{" "}
                👋
              </p>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden max-w-md flex-1 px-8 lg:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-purple-500" />
              <Input
                type="search"
                placeholder="Quick search... (Press /)"
                className="w-full border-slate-200 bg-slate-100/50 pl-10 pr-10 text-xs focus-visible:ring-purple-500 dark:border-white/10 dark:bg-white/5"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 font-sans text-[10px] font-medium text-slate-400 dark:border-white/10 dark:bg-slate-900 lg:inline-block">
                  <Command className="mr-1 inline-block h-2 w-2" />K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-400" />
            </Button>

            {/* Language Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <Globe className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 rounded-xl border-slate-200 dark:border-white/10"
              >
                <DropdownMenuItem className="cursor-pointer font-bold text-xs">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer font-bold text-xs font-arabic"
                  dir="rtl"
                >
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-bold text-xs">
                  Urdu
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="absolute right-2 top-2 flex h-2 w-2 items-center justify-center rounded-full bg-purple-500 ring-2 ring-white dark:ring-slate-950">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 rounded-2xl border-slate-200 shadow-2xl dark:border-white/10"
              >
                <DropdownMenuLabel className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black uppercase tracking-wider">
                      Notifications
                    </p>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:bg-purple-500/20">
                      {notifications.length} New
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="cursor-pointer p-4 focus:bg-slate-50 dark:focus:bg-white/5"
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {notification.text}
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center py-3 text-xs font-bold text-purple-600 hover:text-purple-700">
                  View all updates
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 rounded-xl px-2 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  <div className="relative">
                    <Avatar className="h-9 w-9 border-2 border-purple-500/20">
                      <AvatarImage src={user.image} />
                      <AvatarFallback className="bg-purple-600 text-white text-xs font-black">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                  </div>
                  <div className="hidden flex-col items-start text-left lg:flex">
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      {user.role.replace("_", " ")}
                    </span>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-2xl border-slate-200 shadow-2xl dark:border-white/10"
              >
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="p-3 cursor-pointer font-bold text-xs"
                  asChild
                >
                  <Link href="/profile">
                    <User className="mr-3 h-4 w-4 text-purple-500" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3 cursor-pointer font-bold text-xs"
                  asChild
                >
                  <Link href="/settings">
                    <Settings className="mr-3 h-4 w-4 text-purple-500" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="p-3 cursor-pointer font-bold text-xs text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-500/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

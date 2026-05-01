// src/components/layout/student-header.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Calendar,
  Star,
  Target,
  ChevronDown,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface StudentHeaderProps {
  user: any;
}

export default function StudentHeader({ user }: StudentHeaderProps) {
  const pathname = usePathname();
  const [notifications] = useState([
    { id: 1, text: "New assignment posted in Quran 101", time: "1 hour ago" },
    {
      id: 2,
      text: "Your grade for Fiqh Midterm has been published",
      time: "2 hours ago",
    },
    {
      id: 3,
      text: "Class schedule updated for next week",
      time: "5 hours ago",
    },
  ]);

  const getPageTitle = () => {
    const path = pathname.split("/").filter((p) => p);
    if (path.length <= 1) return "Dashboard";

    const page = path[1];
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Page title and stats */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Mon, Jan 15</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Current Streak: 7 days</span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Target className="h-3 w-3" />
                  Weekly Goal: 65%
                </Badge>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search classes, assignments..."
                  className="w-64 pl-10"
                />
              </div>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {notifications.length}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Notifications
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      You have {notifications.length} new notifications
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="cursor-pointer"
                  >
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center text-sm font-medium text-purple-600">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 rounded-full px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start text-sm lg:flex">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500">Student</span>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {user.email}
                    </p>
                    <div className="flex items-center pt-1">
                      <Badge variant="secondary" className="text-xs">
                        Level: Intermediate
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/student/profile">My Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/student/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/student/help">Help Center</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={handleSignOut}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

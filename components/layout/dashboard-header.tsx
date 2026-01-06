// // src/components/layout/dashboard-header.tsx
// "use client";

// import { useState } from "react";
// import { useTheme } from "next-themes";
// import { Bell, Menu, Moon, Search, Sun, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Link from "next/link";

// interface HeaderProps {
//   onSidebarToggle: () => void;
//   user: any;
// }

// export default function Header({ onSidebarToggle, user }: HeaderProps) {
//   const { theme, setTheme } = useTheme();
//   const [notifications] = useState([
//     { id: 1, title: "New assignment posted", time: "10 min ago" },
//     { id: 2, title: "Quran evaluation completed", time: "1 hour ago" },
//     { id: 3, title: "Class schedule updated", time: "2 hours ago" },
//   ]);

//   const unreadNotifications = notifications.length;

//   return (
//     <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Left section */}
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="mr-2 lg:hidden"
//               onClick={onSidebarToggle}
//             >
//               <Menu className="h-5 w-5" />
//             </Button>

//             <div className="relative hidden md:block">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <Input placeholder="Search..." className="w-64 pl-10" />
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-4">
//             {/* Theme toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>

//             {/* Notifications */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="relative">
//                   <Bell className="h-5 w-5" />
//                   {unreadNotifications > 0 && (
//                     <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                       {unreadNotifications}
//                     </span>
//                   )}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-80">
//                 <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {notifications.map((notification) => (
//                   <DropdownMenuItem
//                     key={notification.id}
//                     className="cursor-pointer py-3"
//                   >
//                     <div className="flex flex-col">
//                       <span className="font-medium">{notification.title}</span>
//                       <span className="text-xs text-gray-500">
//                         {notification.time}
//                       </span>
//                     </div>
//                   </DropdownMenuItem>
//                 ))}
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="cursor-pointer text-center text-purple-600 hover:text-purple-700 dark:text-purple-400">
//                   View all notifications
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* User menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="relative h-8 w-8 rounded-full"
//                 >
//                   <div className="h-8 w-8 rounded-full bg-gradient-primary p-0.5">
//                     <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-800">
//                       <User className="h-4 w-4 text-purple-600" />
//                     </div>
//                   </div>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuLabel>
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       {user?.name}
//                     </p>
//                     <p className="text-xs leading-none text-gray-500">
//                       {user?.email}
//                     </p>
//                     <p className="text-xs leading-none text-purple-600 capitalize">
//                       {user?.role?.toLowerCase().replace("_", " ")}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <a href="/profile">Profile</a>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <a href="/settings">Settings</a>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link
//                     href="/api/auth/signout"
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     Sign out
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }



// src/components/layout/dashboard-header.tsx
"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Bell, 
  Search, 
  HelpCircle,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  User,
  Settings
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { getInitials } from '@/lib/utils'
import { signOut } from 'next-auth/react'

interface HeaderProps {
  user: any
}

export default function DashboardHeader({ user }: HeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [notifications] = useState([
    { id: 1, text: 'New student registration pending approval', time: '5 min ago' },
    { id: 2, text: 'Class schedule updated for Quran 101', time: '1 hour ago' },
    { id: 3, text: 'Monthly report ready for review', time: '2 hours ago' },
  ])

  const getBreadcrumb = () => {
    const path = pathname.split('/').filter(p => p)
    if (path.length === 0) return 'Dashboard'
    
    const lastSegment = path[path.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace('-', ' ')
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center">
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getBreadcrumb()}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {user.name} 👋
              </p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-10"
                />
              </div>
            </div> */}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
                <DropdownMenuItem>اردو</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Notifications</p>
                    <p className="text-xs leading-none text-gray-500">
                      You have {notifications.length} unread notifications
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="cursor-pointer">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center text-sm font-medium text-purple-600">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help */}
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <a href="/help">
                <HelpCircle className="h-5 w-5" />
              </a>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 rounded-full px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start text-sm lg:flex">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user.role.toLowerCase().replace('_', ' ')}
                    </span>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
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
  )
}
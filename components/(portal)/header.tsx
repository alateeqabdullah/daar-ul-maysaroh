"use client";

import {
 
  Search,
  Menu,
  Globe,
  User,
  LogOut,
 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import SidebarMobile from "./sidebar-mobile";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { NotificationBell } from "./notification-bell";

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-20 md:h-24 glass-surface sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 flex items-center justify-between gap-4">
      {/* MOBILE LEFT: HAMBURGER & LOGO */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 border-0 w-[320px] dark:bg-slate-950 shadow-royal"
          >
            {/* RADIX FIX: Mandatory Accessible Titles */}
            <SheetHeader className="sr-only">
              <SheetTitle>Institutional Menu</SheetTitle>
              <SheetDescription>
                Sovereign navigation nodes for {user?.role}
              </SheetDescription>
            </SheetHeader>
            <SidebarMobile role={user?.role} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-col">
          <span className="font-black italic uppercase tracking-tighter text-xl md:text-3xl leading-none dark:text-white">
            Maysaroh
          </span>
          <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-primary-700 ml-1">
            Sovereign Node
          </span>
        </div>
      </div>

      {/* DESKTOP CENTER: SEARCH */}
      <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Search registry... (⌘K)"
            className="w-full h-12 pl-12 pr-4 bg-slate-100/50 dark:bg-slate-900/50 border border-transparent hover:border-primary-700/20 rounded-2xl text-sm focus:ring-4 ring-primary-700/5 outline-none transition-all dark:text-white font-bold"
          />
        </div>
      </div>

      {/* RIGHT CLUSTER: STATUS & IDENTITY */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">
            Live Sync
          </span>
        </div>

        <ThemeToggle />

        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4 cursor-pointer group ml-1 md:ml-4">
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-slate-900 dark:text-white leading-none mb-1.5">
                  {user?.name}
                </p>
                <Badge className="bg-primary-700 h-5 px-3 rounded-full text-[8px] font-black uppercase tracking-tighter border-0 shadow-sm">
                  {user?.role.replace("_", " ")}
                </Badge>
              </div>
              <div className="relative">
                <Avatar className="h-11 w-11 md:h-12 md:w-12 border-2 border-white dark:border-slate-800 shadow-xl transition-transform group-hover:scale-110">
                  <AvatarImage src={user?.image || undefined} />
                  <AvatarFallback className="bg-primary-100 text-primary-700 font-black">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-950" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 rounded-4xl p-4 shadow-royal border-slate-100 dark:border-slate-800 dark:bg-slate-950 mt-2"
          >
            <div className="p-4 mb-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
              <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                Identity Ledger
              </p>
              <p className="text-sm font-black dark:text-white truncate">
                {user?.email}
              </p>
            </div>
            <DropdownMenuItem className="rounded-xl py-4 font-bold text-xs gap-3 cursor-pointer">
              <Link href="/profile" className="flex items-center gap-3">
                <User size={18} className="text-primary-700" /> Identity Vault
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl py-4 font-bold text-xs gap-3 cursor-pointer">
              <Globe size={18} className="text-primary-700" /> Locale: English
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-xl py-4 font-bold text-xs gap-3 text-rose-500 cursor-pointer"
            >
              <LogOut size={18} /> Disconnect Node
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

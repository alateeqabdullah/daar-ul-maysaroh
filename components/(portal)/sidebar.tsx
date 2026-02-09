"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_CONFIG } from "@/lib/navigation-config";
import { LogOut, ChevronLeft, Shield, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";


interface NavItem {
  name: string;
  href: string;
  desc: string;
  badge?: string | number;
  icon: LucideIcon
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export default function Sidebar({ role }: { role: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const menuGroups = (NAV_CONFIG as Record<string, NavGroup[]>)[role] || [];

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: isCollapsed ? 120 : 320 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 shadow-sm"
      >
        {/* --- BRANDING --- */}
        <div className="p-8 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary-700 flex items-center justify-center text-white shadow-royal shrink-0 relative group">
              <Shield className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="font-black tracking-tighter text-2xl uppercase italic leading-none dark:text-white">
                  Maysaroh
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary-700 mt-1">
                  Sovereign node
                </span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* --- NAV REGISTRY --- */}
        <nav className="flex-1 px-6 space-y-10 overflow-y-auto no-scrollbar pt-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              {!isCollapsed && (
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const linkContent = (
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "group flex items-center gap-4 px-4 py-4 rounded-[1.5rem] transition-all duration-300 relative",
                          isActive
                            ? "bg-primary-700 text-white shadow-royal"
                            : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6 shrink-0 transition-transform group-active:scale-90",
                            isActive ? "text-white" : "text-primary-700",
                          )}
                        />
                        {!isCollapsed && (
                          <div className="flex-1">
                            <p className="font-bold text-md tracking-tight">
                              {item.name}
                            </p>
                            {/* <p
                              className={cn(
                                "text-[9px] font-medium tracking-tighter opacity-60 uppercase",
                                isActive ? "text-white" : "text-slate-400",
                              )}
                            >
                              {item.desc}
                            </p> */}
                          </div>
                        )}
                        {item.badge && !isCollapsed && (
                          <Badge
                            className={cn(
                              "h-5 min-w-5 rounded-full flex items-center justify-center text-[8px] font-black border-0",
                              isActive
                                ? "bg-white text-primary-700"
                                : "bg-primary-700 text-white",
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && !isCollapsed && (
                          <motion.div
                            layoutId="navGlow"
                            className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                          />
                        )}
                      </div>
                    </Link>
                  );

                  return isCollapsed ? (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-primary-700 text-white border-0 font-black uppercase text-[10px] px-4 py-2 rounded-xl shadow-royal"
                      >
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={item.href}>{linkContent}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* --- FOOTER --- */}
        <div className="p-6 border-t dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-[1.5rem] transition-all group"
          >
            <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && (
              <span className="font-black text-xs uppercase tracking-widest leading-none mt-0.5">
                Disconnect Node
              </span>
            )}
          </button>
        </div>

        {/* --- TOGGLE --- */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 h-7 w-7 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-royal hover:scale-110 transition-transform z-50 border-4 border-white dark:border-slate-950"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180",
            )}
          />
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}

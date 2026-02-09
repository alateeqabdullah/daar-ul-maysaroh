"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_CONFIG } from "@/lib/navigation-config";
import { Badge } from "@/components/ui/badge";
import { LogOut, LucideIcon, Shield, X } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";



interface NavItem {
  name: string;
  href: string;
  desc: string;
  badge?: string | number;
  icon: LucideIcon;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export default function SidebarMobile({ role }: { role: string }) {
  const pathname = usePathname();
  const menuGroups = (NAV_CONFIG as Record<string, NavGroup[]>)[role] || [];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* --- BRANDING --- */}
      <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-700 flex items-center justify-center text-white shadow-royal">
            <Shield size={20} />
          </div>
          <div>
            <p className="font-black italic uppercase tracking-tighter text-xl leading-none dark:text-white">
              Maysaroh
            </p>
            <Badge className="text-[8px] h-4 uppercase mt-1 bg-primary-700/10 text-primary-700 border-0">
              {role.replace("_", " ")}
            </Badge>
          </div>
        </div>
        <SheetClose className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
          <X size={18} />
        </SheetClose>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <nav className="flex-1 p-6 space-y-10 overflow-y-auto no-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">
              {group.group}
            </p>
            <div className="grid gap-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <SheetClose asChild>
                      <div
                        className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all active:scale-95 ${
                          isActive
                            ? "bg-primary-700 text-white shadow-xl"
                            : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <item.icon
                          size={20}
                          className={
                            isActive ? "text-white" : "text-primary-700"
                          }
                        />
                        <div className="flex-1">
                          <p className="font-black uppercase text-[11px] tracking-widest">
                            {item.name}
                          </p>
                          <p
                            className={`text-[8px] font-bold uppercase tracking-tighter opacity-60 ${isActive ? "text-white" : "text-slate-400"}`}
                          >
                            {item.desc}
                          </p>
                        </div>
                        {item.badge && (
                          <Badge
                            className={`h-5 min-w-5 rounded-full flex items-center justify-center text-[8px] font-black border-0 ${isActive ? "bg-white text-primary-700" : "bg-primary-700 text-white animate-pulse"}`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </SheetClose>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* --- FOOTER / DISCONNECT --- */}
      <div className="p-6 border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-500 text-white font-black uppercase text-[10px] tracking-[0.3em] shadow-lg active:scale-95 transition-all"
        >
          <LogOut size={16} />
          Terminate Session
        </button>
        <p className="text-[7px] font-black text-center uppercase tracking-[0.4em] text-slate-400 mt-6">
          Sovereign Synchronizer v2.6.0
        </p>
      </div>
    </div>
  );
}

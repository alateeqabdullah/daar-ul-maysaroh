"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  LayoutDashboard,
  Users,
  BookOpen,
  ShieldAlert,
  GraduationCap,
  MessageSquare,
  FileText,
  Activity,
  Search,
  Zap,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function GlobalCommandCenter() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // 1. LISTEN FOR KEYBOARD SHORTCUT (⌘K or Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // 2. ACTION HANDLER
  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {/* HEADER SECTION */}
      <div className="flex items-center border-b border-white/5 px-4 py-3 bg-white/[0.02]">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
          Intelligence Command Center
        </p>
      </div>

      <CommandInput 
        placeholder="Type to search students, modules, or actions..." 
        className="h-14 text-base border-none focus:ring-0"
      />

      <CommandList className="max-h-[450px] overflow-y-auto custom-scrollbar p-2">
        <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
          No records or modules found.
        </CommandEmpty>

        {/* GROUP: CORE INTELLIGENCE */}
        <CommandGroup heading="Intelligence Modules">
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/admin"))}
            className="rounded-2xl py-3 cursor-pointer hover:bg-primary/10 group transition-all"
          >
            <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-[14px] font-bold">Executive Dashboard</span>
            <CommandShortcut className="font-black">⌘ D</CommandShortcut>
          </CommandItem>
          
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/admin/approvals"))}
            className="rounded-2xl py-3 cursor-pointer hover:bg-primary/10 group"
          >
            <ShieldAlert className="mr-3 h-5 w-5 text-amber-500" />
            <span className="text-[14px] font-bold">Pending Verifications</span>
            <CommandShortcut className="font-black">⌘ V</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-2 bg-white/5" />

        {/* GROUP: ACADEMIC OPS */}
        <CommandGroup heading="Academic Operations">
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/admin/students"))}
            className="rounded-2xl py-3 cursor-pointer"
          >
            <Users className="mr-3 h-5 w-5 text-purple-500" />
            <span className="text-[14px] font-bold">Student Body Registry</span>
          </CommandItem>
          
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/admin/classes"))}
            className="rounded-2xl py-3 cursor-pointer"
          >
            <BookOpen className="mr-3 h-5 w-5 text-emerald-500" />
            <span className="text-[14px] font-bold">Curriculum Planner</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-2 bg-white/5" />

        {/* GROUP: QUICK ACTIONS */}
        <CommandGroup heading="System Actions">
          <CommandItem className="rounded-2xl py-3 cursor-pointer group">
            <Zap className="mr-3 h-5 w-5 text-amber-500 group-hover:animate-pulse" />
            <span className="text-[14px] font-bold">Deploy New Class Instance</span>
          </CommandItem>
          
          <CommandItem 
            onSelect={() => runCommand(() => router.push("/admin/settings"))}
            className="rounded-2xl py-3 cursor-pointer"
          >
            <Settings className="mr-3 h-5 w-5 text-slate-500" />
            <span className="text-[14px] font-bold">Account Security Nodes</span>
            <CommandShortcut className="font-black">⌘ ,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* FOOTER LEGEND */}
      <div className="flex items-center justify-between border-t border-white/5 bg-black/40 px-5 py-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        <div className="flex gap-4">
          <span>↑↓ Navigate</span>
          <span>↵ Execute</span>
          <span>esc Close</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-5 w-5 flex items-center justify-center rounded border border-white/10 bg-white/5">⌘</span>
          <span className="h-5 w-5 flex items-center justify-center rounded border border-white/10 bg-white/5">K</span>
        </div>
      </div>
    </CommandDialog>
  );
}
"use client";

import { LogOut, LifeBuoy, Sparkles, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";

interface SidebarFooterProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
  onSignOut: () => void;
  onNavigate: (path: string) => void;
}

export function SidebarFooter({
  user,
  onSignOut,
  onNavigate,
}: SidebarFooterProps) {
  const getRoleColor = () => {
    switch (user.role) {
      case "SUPER_ADMIN":
        return "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600";
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

  return (
    <div className="shrink-0 border-t border-border/50 p-4 space-y-4 bg-gradient-to-b from-background to-background/80">
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-primary-500/30">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback
              className={cn("text-white font-black text-sm", getRoleColor())}
            >
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          {user.role === "SUPER_ADMIN" && (
            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-amber-500 fill-amber-500" />
          )}
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-foreground truncate">
            {user.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              className={cn(
                "text-[10px] font-black px-2 py-0.5 border-0 text-white",
                getRoleColor(),
              )}
            >
              {user.role.replace("_", " ")}
            </Badge>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center gap-2 rounded-xl text-xs font-bold text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
          onClick={() => onNavigate("/help")}
        >
          <LifeBuoy className="h-4 w-4" />
          Help
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center gap-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Version Info */}
      <div className="pt-4 mt-2 border-t border-border/50">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-bold text-muted-foreground">
            v2.1.0 • Elite Edition
          </span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

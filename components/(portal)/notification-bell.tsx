"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Bell,
  Zap,
  Megaphone,
  FileText,
  Wallet,
  Info,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "@/app/actions/notifications";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  actionUrl: string | null;
  referenceId: string | null;
  referenceType: string | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [, startTransition] = useTransition();

  // Load notifications on mount
  useEffect(() => {
    getMyNotifications().then(setNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleRead = (id: string) => {
    startTransition(async () => {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    });
  };

  const handleReadAll = () => {
    startTransition(async () => {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications handshaked");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-11 w-11 md:h-12 md:w-12 rounded-2xl glass-surface border border-slate-200 dark:border-slate-800 flex items-center justify-center relative hover:scale-105 transition-transform group shadow-sm">
          <Bell className="h-5 w-5 text-slate-500 group-hover:text-primary-700 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] md:w-[400px] rounded-4xl p-4 shadow-royal border-slate-100 dark:border-slate-800 dark:bg-slate-950 mt-4 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2 mb-2">
          <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400">
            Notification Vault
          </h4>
          {unreadCount > 0 && (
            <button
              onClick={handleReadAll}
              className="text-[10px] font-black text-primary-700 hover:underline"
            >
              Mark All Read
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto no-scrollbar space-y-2">
          <AnimatePresence initial={false}>
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div
                    onClick={() => !n.isRead && handleRead(n.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                      n.isRead
                        ? "bg-slate-50/50 dark:bg-slate-900/50 border-transparent opacity-60"
                        : "bg-white dark:bg-slate-900 border-primary-100 dark:border-primary-900/50 shadow-sm"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center ${getTypeColor(n.type)}`}
                    >
                      {getTypeIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-black truncate ${n.isRead ? "text-slate-500" : "text-slate-900 dark:text-white"}`}
                      >
                        {n.title}
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 line-clamp-2 mt-0.5">
                        {n.message}
                      </p>
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter mt-2">
                        {formatDistanceToNow(new Date(n.createdAt))} ago
                      </p>
                    </div>
                    {!n.isRead && (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-700 mt-2 shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center opacity-20">
                <Zap className="h-10 w-10 mx-auto mb-2" />
                <p className="font-black text-[10px] uppercase">
                  Registry Clear
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <DropdownMenuSeparator className="my-4" />
        <div className="px-2">
          <Button
            variant="ghost"
            className="w-full rounded-xl font-black text-[10px] uppercase text-slate-400 h-10"
          >
            View Global History
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --- LOGIC HELPERS ---

function getTypeIcon(type: string) {
  switch (type) {
    case "ASSIGNMENT":
      return <FileText size={16} />;
    case "GRADE":
      return <Award size={16} />;
    case "PAYMENT":
      return <Wallet size={16} />;
    case "SYSTEM":
      return <Zap size={16} />;
    case "ANNOUNCEMENT":
      return <Megaphone size={16} />;
    default:
      return <Info size={16} />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "ASSIGNMENT":
      return "bg-indigo-500/10 text-indigo-600";
    case "GRADE":
      return "bg-gold/10 text-gold";
    case "PAYMENT":
      return "bg-emerald-500/10 text-emerald-600";
    case "ANNOUNCEMENT":
      return "bg-primary-700/10 text-primary-700";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

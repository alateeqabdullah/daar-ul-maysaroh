"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarHeaderProps {
  userRole: string;
  onClose: () => void;
}

export function SidebarHeader({ userRole, onClose }: SidebarHeaderProps) {
  const getPortalName = () => {
    switch (userRole) {
      case "STUDENT":
        return "Student Portal";
      case "TEACHER":
        return "Teacher Portal";
      case "PARENT":
        return "Parent Portal";
      case "ADMIN":
      case "SUPER_ADMIN":
        return "Admin Portal";
      default:
        return "Portal";
    }
  };

  return (
    <div className="shrink-0 flex h-20 items-center justify-between px-6 border-b border-border/50 bg-gradient-to-b from-primary-50/10 to-transparent dark:from-primary-900/5 dark:to-transparent">
      <Link
        href="/dashboard"
        className="group flex items-center gap-4 outline-none"
        onClick={() => {
          if (window.innerWidth < 1024) {
            onClose();
          }
        }}
      >
        <motion.div
          whileHover={{ rotate: 6, scale: 1.05 }}
          className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20"
        >
          <BookOpen className="h-6 w-6 text-white" />
        </motion.div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter leading-none">
            AL-MAYSAROH
          </h1>
          <p className="text-[10px] text-primary-700 dark:text-primary-400 font-bold tracking-[0.3em] uppercase">
            {getPortalName()}
          </p>
        </div>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition-all duration-300"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}

"use client";

import { useSidebarStore } from "@/store/use-sidebar-store";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function DashboardWrapper({ children, session }: any) {
  const { isOpen, setOpen } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 1024) setOpen(true);
  }, [setOpen]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-slate-50/50 dark:bg-[#050505] text-slate-900 dark:text-slate-100">
        <DashboardSidebar user={session.user} />

        <motion.div
          animate={{
            paddingLeft:
              typeof window !== "undefined" && window.innerWidth >= 1024
                ? isOpen
                  ? "300px"
                  : "0px"
                : "0px",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="flex flex-col min-h-screen"
        >
          <DashboardHeader user={session.user} />

          <main className="flex-1 p-4 md:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[1600px] mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </motion.div>

        <Toaster richColors closeButton position="top-right" />
      </div>
    </ThemeProvider>
  );
}

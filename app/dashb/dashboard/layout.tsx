// src/app/(dashboard)/layout.tsx - UPDATED VERSION
"use client";

import DashboardHeader from "@/components/(portal)/dashboard/header";
import DashboardSidebar from "@/components/(portal)/dashboard/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardSidebar user={session.user} />

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-gray-800 lg:hidden",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <DashboardSidebar user={session.user} />
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <DashboardHeader
            user={session.user}
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Components
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/layout/page-transition"; // We will create this

// Providers
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

// Font Configuration
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MadrasahPro",
    default: "Dashboard",
  },
  description: "Advanced management system for MadrasahPro",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Server-Side Auth Check
  const session = await auth();

  if (!session) redirect("/login");
  if (session.user.status !== "APPROVED") redirect("/pending");

  return (
    <div
      className={cn(
        "font-sans antialiased",
        inter.variable,
        notoSansArabic.variable
      )}
      dir="auto"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          {/* 
            APP SHELL ARCHITECTURE 
            h-screen + overflow-hidden prevents the body from scrolling.
            We manage scrolling internally.
          */}
          <div className="flex h-screen overflow-hidden bg-muted/40">
            {/* 2. SIDEBAR - Fixed width, hidden on mobile */}
            {/* The Sidebar component needs to handle its own 'fixed' positioning on mobile */}
            <div className="hidden lg:block lg:w-72 lg:shrink-0 border-r border-border bg-card">
              <DashboardSidebar user={session.user} />
            </div>

            {/* 3. MAIN AREA - Flex column */}
            <div className="flex flex-col flex-1 min-w-0">
              {/* HEADER - Sticky at top */}
              <DashboardHeader user={session.user} />

              {/* MAIN CONTENT - This is the only part that scrolls */}
              <main className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl">
                  <Suspense fallback={<DashboardSkeleton />}>
                    {/* Client component for smooth Framer Motion transitions */}
                    <PageTransition>{children}</PageTransition>
                  </Suspense>
                </div>
              </main>
            </div>
          </div>

          <Toaster richColors closeButton position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

// --- OPTIMIZED SKELETON ---
// Aligned with the dashboard grid layout
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title Area */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border border-border bg-card/50 shadow-sm"
          />
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 h-[400px] animate-pulse rounded-xl border border-border bg-card/50" />
        <div className="h-[400px] animate-pulse rounded-xl border border-border bg-card/50" />
      </div>
    </div>
  );
}

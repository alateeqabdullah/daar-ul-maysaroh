import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Amiri } from "next/font/google";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Components
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/layout/page-transition";

// Providers
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-quran",
});
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { template: "%s | Al-Maysaroh", default: "Dashboard" },
  description: "Advanced Islamic Educational Management System",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");
  if (session.user.status !== "APPROVED") redirect("/pending");

  return (
    <div
      className={cn(
        "font-sans antialiased",
        inter.variable,
        notoSansArabic.variable,
        amiri.variable,
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
          {/* Remove all flex and positioning from the outer div */}
          <div className="min-h-screen bg-background">
            {/* Sidebar - Truly fixed, outside of content flow */}
            <DashboardSidebar user={session.user} />

            {/* Main content - Must have left padding on desktop */}
            <div className="lg:pl-80">
              {/* Header */}
              <DashboardHeader user={session.user} />

              {/* Main content area */}
              <main className="pt-5">
                <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 lg:px-10">
                  <Suspense fallback={<DashboardSkeleton />}>
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




function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border bg-card/50"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 h-[400px] animate-pulse rounded-3xl border bg-card/50" />
        <div className="h-[400px] animate-pulse rounded-3xl border bg-card/50" />
      </div>
    </div>
  );
}
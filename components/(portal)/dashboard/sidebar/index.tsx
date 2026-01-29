"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { getNavigationForRole } from "@/lib/navigation";

// Import components
import { SidebarHeader } from "./sidebar-header";
import { SidebarSearch } from "./sidebar-search";
import { SidebarFooter } from "./sidebar-footer";
import { NavSection } from "./nav-section";
import { QuickActions } from "./quick-actions";
import { SystemMetricsWidget } from "./widgets/system-metrics";
import { StudentProgressWidget } from "./widgets/student-progress";
import { ParentSummaryWidget } from "./widgets/parent-summary";

interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const { isOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Initialize sidebar
  useEffect(() => {
    setMounted(true);
    const { initialize } = useSidebarStore.getState();
    initialize();
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    "mod+b": () => useSidebarStore.getState().toggle(),
    escape: () => {
      if (window.innerWidth < 1024 && isOpen) {
        setOpen(false);
      }
    },
  });

  // Get filtered navigation
  const navigation = getNavigationForRole(user.role);
  const filteredNavigation = navigation.filter((section) =>
    section.items.some(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  // Handle navigation
  const handleNavigation = (href: string) => {
    router.push(href);
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Get appropriate widget for role
  const renderRoleWidget = () => {
    switch (user.role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        return <SystemMetricsWidget />;
      case "STUDENT":
        return <StudentProgressWidget />;
      case "PARENT":
        return <ParentSummaryWidget />;
      default:
        return null;
    }
  };

  // Animation variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full max-w-xs",
          "lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-80",
          "flex flex-col bg-background border-r border-border/50",
          "backdrop-blur-xl supports-backdrop-filter:bg-background/95",
          "shadow-2xl lg:shadow-lg",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <SidebarHeader userRole={user.role} onClose={() => setOpen(false)} />

        {/* Search */}
        <SidebarSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions userRole={user.role} onAction={handleNavigation} />

              {/* Navigation Sections */}
              {filteredNavigation.map((section) => (
                <NavSection
                  key={section.title}
                  section={section}
                  currentPath={pathname}
                  onNavigate={handleNavigation}
                />
              ))}

              {/* Role-specific Widget */}
              {renderRoleWidget()}

              {/* Quick Links */}
              <div className="space-y-2">
                <h3 className="px-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavigation("/help")}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all text-left"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Help Center
                  </button>
                  <button
                    onClick={() => handleNavigation("/feedback")}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all text-left"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SidebarFooter
          user={user}
          onSignOut={handleSignOut}
          onNavigate={handleNavigation}
        />
      </motion.aside>
    </>
  );
}

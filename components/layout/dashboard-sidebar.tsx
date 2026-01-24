"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Users2,
  Calendar,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Book,
  GraduationCap,
  Wallet,
  User as UserIcon,
  MessageSquare,
  Folder,
  PieChart,
  ShieldCheck,
  Zap,
  ChevronRight,
  Sparkles,
  Crown,
  Bell,
  CheckCircle,
  ChevronDown,
  Home,
  ChartBar,
  FileBarChart,
  School,
  Network,
  CreditCard,
  Banknote,
  BarChart,
  Library,
  Target,
  Award,
  Shield,
  Database,
  Cpu,
  UserPlus,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/store/use-sidebar-store";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface NavigationGroup {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: NavigationItem[];
}

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

// Grouped Navigation Structure
const adminNavigation: NavigationGroup[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    items: [
      { name: "Dashboard", href: "/admin", icon: Home },
      { name: "Analytics", href: "/admin/analytics", icon: ChartBar },
      { name: "Reports", href: "/admin/reports", icon: FileBarChart },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      {
        name: "User Approval",
        href: "/admin/approvals",
        icon: UserCheck,
        badge: 5,
      },
      { name: "All Users", href: "/admin/users", icon: Users },
      { name: "Teachers", href: "/admin/teachers", icon: GraduationCap },
      { name: "Students", href: "/admin/students", icon: UserIcon },
      { name: "Parents", href: "/admin/parents", icon: Users2 },
      { name: "Groups", href: "/admin/groups", icon: Network },
    ],
  },
  {
    title: "Academic",
    icon: BookOpen,
    items: [
      { name: "Classes", href: "/admin/classes", icon: School },
      { name: "Schedule", href: "/admin/schedule", icon: Calendar },
      { name: "Attendance", href: "/admin/attendance", icon: CheckCircle },
      { name: "Assignments", href: "/admin/assignments", icon: FileText },
      { name: "Grades", href: "/admin/grades", icon: TrendingUp },
      { name: "Quran Progress", href: "/admin/quran", icon: Book },
      { name: "Resources", href: "/admin/resources", icon: Library },
    ],
  },
  {
    title: "Financial",
    icon: Wallet,
    items: [
      {
        name: "Tuition Fees",
        href: "/admin/financial/tuition",
        icon: CreditCard,
      },
      { name: "Payments", href: "/admin/financial/payments", icon: Banknote },
      { name: "Invoices", href: "/admin/financial/invoices", icon: FileText },
      { name: "Reports", href: "/admin/financial/reports", icon: BarChart },
    ],
  },
  {
    title: "System",
    icon: Settings,
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Security", href: "/admin/security", icon: Shield },
      { name: "Backup", href: "/admin/backup", icon: Database },
      { name: "API", href: "/admin/api", icon: Cpu },
    ],
  },
];

const teacherNavigation: NavigationGroup[] = [
  {
    title: "Teaching",
    icon: BookOpen,
    items: [
      { name: "Dashboard", href: "/teacher", icon: Home },
      { name: "My Classes", href: "/teacher/classes", icon: School },
      { name: "Students", href: "/teacher/students", icon: Users },
      { name: "Attendance", href: "/teacher/attendance", icon: CheckCircle },
      { name: "Assignments", href: "/teacher/assignments", icon: FileText },
      { name: "Grades", href: "/teacher/grades", icon: TrendingUp },
    ],
  },
  {
    title: "Planning",
    icon: Calendar,
    items: [
      { name: "Schedule", href: "/teacher/schedule", icon: Calendar },
      { name: "Lesson Plans", href: "/teacher/lesson-plans", icon: Target },
      { name: "Resources", href: "/teacher/resources", icon: Library },
      { name: "Quran Progress", href: "/teacher/quran", icon: Book },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    items: [
      { name: "Messages", href: "/teacher/communication", icon: MessageSquare },
      { name: "Announcements", href: "/teacher/announcements", icon: Bell },
      { name: "Meetings", href: "/teacher/meetings", icon: Users2 },
    ],
  },
  {
    title: "Performance",
    icon: ChartBar,
    items: [
      { name: "Reports", href: "/teacher/reports", icon: FileBarChart },
      { name: "Analytics", href: "/teacher/analytics", icon: PieChart },
      { name: "Achievements", href: "/teacher/achievements", icon: Award },
    ],
  },
];

const studentNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/student", icon: Home },
  { name: "My Classes", href: "/student/classes", icon: School },
  { name: "Schedule", href: "/student/schedule", icon: Calendar },
  { name: "Assignments", href: "/student/assignments", icon: FileText },
  { name: "Grades", href: "/student/grades", icon: TrendingUp },
  { name: "Quran Progress", href: "/student/quran", icon: Book },
  { name: "Attendance", href: "/student/attendance", icon: CheckCircle },
  { name: "Resources", href: "/student/resources", icon: Library },
  { name: "Messages", href: "/student/messages", icon: MessageSquare },
];

const parentNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/parent", icon: Home },
  { name: "My Children", href: "/parent/children", icon: Users },
  { name: "Progress Reports", href: "/parent/progress", icon: TrendingUp },
  { name: "Attendance", href: "/parent/attendance", icon: CheckCircle },
  { name: "Payments", href: "/parent/payments", icon: Wallet },
  { name: "Messages", href: "/parent/messages", icon: MessageSquare },
  { name: "Schedule", href: "/parent/schedule", icon: Calendar },
  { name: "Quran Progress", href: "/parent/quran", icon: Book },
];

export default function DashboardSidebar({ user }: SidebarProps) {
  const { isOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      Overview: true,
      "User Management": true,
    },
  );

  useEffect(() => {
    setMounted(true);
    // Auto-open on desktop
    if (window.innerWidth >= 1024) {
      setOpen(true);
    }
  }, [setOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector("aside");
      const target = event.target as HTMLElement;

      if (
        isOpen &&
        window.innerWidth < 1024 &&
        sidebar &&
        !sidebar.contains(target) &&
        !target.closest('button[aria-label="Toggle Sidebar"]')
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  const getNavigation = (): NavigationGroup[] | NavigationItem[] => {
    switch (user.role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        return adminNavigation;
      case "TEACHER":
        return teacherNavigation;
      case "STUDENT":
        return studentNavigation;
      case "PARENT":
        return parentNavigation;
      default:
        return [];
    }
  };

  const navigation = getNavigation();
  const hasGroups = Array.isArray(navigation) && navigation[0]?.items;

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

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const quickActions = [
    {
      label: "New Student",
      icon: UserPlus,
      href: "/admin/students/create",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Create Class",
      icon: School,
      href: "/admin/classes/create",
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Generate Report",
      icon: FileBarChart,
      href: "/admin/reports/create",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Collect Payment",
      icon: CreditCard,
      href: "/admin/financial/payments",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 flex flex-col",
          "lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:translate-x-0",
          "bg-background border-r border-border/30 shadow-2xl",
        )}
        style={{
          transform: "none", // Let Framer Motion control
        }}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border/30">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-black tracking-tight leading-none">
                AL-MAYSAROH
              </h1>
              <p className="text-[9px] text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase">
                Education
              </p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="px-4 py-3">
          <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-3 border border-primary-200/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-primary-500/20">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback
                    className={cn(
                      "text-white font-bold text-xs",
                      getRoleColor(),
                    )}
                  >
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {user.role === "SUPER_ADMIN" && (
                  <Crown className="absolute -top-1 -right-1 h-3 w-3 text-amber-500 fill-amber-500" />
                )}
                <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-background bg-gradient-to-r from-emerald-400 to-teal-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 border-0",
                      getRoleColor(),
                    )}
                  >
                    {user.role.replace("_", " ")}
                  </Badge>
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
          {/* Stats (Admin Only) */}
          {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
            <div className="mb-4 px-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-2.5 border border-emerald-200/20">
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Active
                  </p>
                  <p className="text-base font-black text-foreground">142</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-2.5 border border-amber-200/20">
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    Pending
                  </p>
                  <p className="text-base font-black text-foreground">5</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Groups */}
          <div className="space-y-1">
            {hasGroups
              ? (navigation as NavigationGroup[]).map((group) => {
                  const GroupIcon = group.icon || ChevronRight;
                  const isExpanded = expandedGroups[group.title] ?? true;

                  return (
                    <div key={group.title} className="space-y-1">
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <GroupIcon className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {group.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 text-muted-foreground transition-transform",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-1"
                          >
                            <div className="space-y-0.5">
                              {group.items.map((item) => {
                                const isActive =
                                  pathname === item.href ||
                                  pathname?.startsWith(`${item.href}/`);

                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                      isActive
                                        ? "bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 dark:text-primary-400"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                                    )}
                                    onClick={() =>
                                      window.innerWidth < 1024 && setOpen(false)
                                    }
                                  >
                                    <item.icon
                                      className={cn(
                                        "mr-3 h-4 w-4 transition-colors",
                                        isActive
                                          ? "text-primary-600 dark:text-primary-400"
                                          : "text-muted-foreground group-hover:text-primary-600",
                                      )}
                                    />
                                    <span className="flex-1">{item.name}</span>
                                    {item.badge && (
                                      <Badge className="ml-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-bold px-1.5 py-0 border-0">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              : // Flat navigation
                (navigation as NavigationItem[]).map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 dark:text-primary-400"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                      )}
                      onClick={() => window.innerWidth < 1024 && setOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-4 w-4 transition-colors",
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-muted-foreground group-hover:text-primary-600",
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                    </Link>
                  );
                })}
          </div>

          {/* Quick Actions (Admin Only) */}
          {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="px-3 mb-3">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Zap className="h-3 w-3 text-amber-500" /> Quick Actions
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push(action.href);
                      window.innerWidth < 1024 && setOpen(false);
                    }}
                    className={cn(
                      "group flex flex-col items-center justify-center rounded-lg p-2.5",
                      "bg-gradient-to-br from-white to-white/80 dark:from-slate-900 dark:to-slate-900/80",
                      "border border-border/30 hover:border-primary-300 dark:hover:border-primary-700",
                      "transition-all duration-200 hover:scale-[1.02]",
                      "outline-none focus:ring-2 focus:ring-primary-500/20",
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center mb-1.5",
                        `bg-gradient-to-br ${action.color}`,
                      )}
                    >
                      <action.icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-foreground text-center leading-tight">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-border/30 p-4 space-y-2">
          <Link
            href="/help"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            onClick={() => window.innerWidth < 1024 && setOpen(false)}
          >
            <HelpCircle className="mr-3 h-4 w-4" />
            <span>Help & Support</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </button>

          {/* Status */}
          <div className="pt-3 mt-2 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Systems Operational
                </span>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold">
                v2.1.0
              </Badge>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

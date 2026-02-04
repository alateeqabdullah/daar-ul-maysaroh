"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/store/use-sidebar-store";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Users2,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  X,
  Book,
  GraduationCap,
  Wallet,
  User as UserIcon,
  MessageSquare,
  Folder,
  PieChart,
  Zap,
  ChevronRight,
  Search,
  LifeBuoy,
  TrendingUp,
  CheckCircle,
  Crown,
  Sparkles,
  Award,
  BarChart,
  CreditCard,
  Target,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/**
 * ELITE NAVIGATION INTERFACE
 */
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
  description?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

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

  
  useEffect(() => {
    setMounted(true);
    // Initialize sidebar state based on screen size
    useSidebarStore.getState().initialize();

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      const { isOpen, setOpen } = useSidebarStore.getState();
      if (isDesktop !== isOpen) {
        setOpen(isDesktop);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get role-specific styling
  const getRoleColor = () => {
    switch (user.role) {
      case "SUPER_ADMIN":
        return "bg-linear-to-br from-amber-500 via-orange-500 to-amber-600";
      case "ADMIN":
        return "bg-linear-to-br from-purple-600 via-indigo-600 to-purple-700";
      case "TEACHER":
        return "bg-linear-to-br from-emerald-500 via-teal-600 to-emerald-600";
      case "STUDENT":
        return "bg-linear-to-br from-blue-500 via-cyan-500 to-blue-600";
      case "PARENT":
        return "bg-linear-to-br from-violet-500 via-purple-600 to-violet-600";
      default:
        return "bg-linear-to-br from-slate-600 via-slate-700 to-slate-800";
    }
  };

  // 1. COMPREHENSIVE NAVIGATION FOR ALL ROLES
  const navigation: NavSection[] = useMemo(() => {
    const admin = [
      {
        title: "Dashboard Hub",
        items: [
          {
            name: "Overview",
            href: "/admin",
            icon: LayoutDashboard,
            description: "System health & analytics",
            badge: "Live",
          },
          {
            name: "Approvals",
            href: "/dashboard/admin/approvals",
            icon: UserCheck,
            badge: "5 Pending",
            description: "Verify new user requests",
          },
          {
            name: "Users",
            href: "/dashboard/admin/users",
            icon: Users,
            description: "Total system users",
          },
        ],
      },
      {
        title: "Academic Management",
        items: [
          {
            name: "Class Groups",
            href: "/dashboard/admin/groups",
            icon: Users2,
            description: "Manage study groups",
          },
          {
            name: "Curriculum",
            href: "/dashboard/admin/classes",
            icon: BookOpen,
            description: "Class syllabi & books",
            badge: "New",
          },
          {
            name: "Teachers",
            href: "/dashboard/admin/teachers",
            icon: GraduationCap,
            description: "Faculty management",
          },
          {
            name: "Students",
            href: "/dashboard/admin/students",
            icon: UserIcon,
            description: "Student profiles",
          },
          {
            name: "Attendance",
            href: "/dashboard/admin/attendance",
            icon: CheckCircle,
            description: "Track attendance",
          },
        ],
      },
      {
        title: "Administrative Hub",
        items: [
          {
            name: "Schedule",
            href: "/dashboard/admin/schedule",
            icon: Calendar,
            description: "Timetable management",
          },
          {
            name: "Assignments",
            href: "/dashboard/admin/assignments",
            icon: FileText,
            description: "Assignments & submissions",
          },
          {
            name: "Grades",
            href: "/dashboard/admin/grades",
            icon: TrendingUp,
            description: "Performance analytics",
          },
          {
            name: "Financial",
            href: "/dashboard/admin/financial",
            icon: Wallet,
            badge: "Secure",
            description: "Payment tracking",
          },
          {
            name: "System Config",
            href: "/dashboard/admin/settings",
            icon: Settings,
            description: "System preferences",
          },
        ],
      },
      {
        title: "Reports & Analytics",
        items: [
          {
            name: "Reports",
            href: "/dashboard/admin/reports",
            icon: PieChart,
            description: "Generate reports",
          },
          {
            name: "Parents",
            href: "/dashboard/admin/parents",
            icon: Users,
            description: "Parent management",
          },
          {
            name: "Communication",
            href: "/dashboard/admin/communication",
            icon: MessageSquare,
            description: "Messaging system",
          },
          {
            name: "Resources",
            href: "/dashboard/admin/resources",
            icon: Folder,
            description: "Learning materials",
          },
        ],
      },
    ];

    const teacher = [
      {
        title: "Teaching Hub",
        items: [
          {
            name: "My Dashboard",
            href: "/teacher",
            icon: LayoutDashboard,
            description: "Teaching overview",
            badge: "Updated",
          },
          {
            name: "Active Classes",
            href: "/dashboard/teacher/classes",
            icon: BookOpen,
            description: "Manage classes",
          },
          {
            name: "Quran Progress",
            href: "/dashboard/teacher/quran",
            icon: Book,
            description: "Student progress",
          },
        ],
      },
      {
        title: "Student Management",
        items: [
          {
            name: "Students",
            href: "/dashboard/teacher/students",
            icon: Users,
            description: "Student roster",
          },
          {
            name: "Attendance",
            href: "/dashboard/teacher/attendance",
            icon: CheckCircle,
            description: "Daily attendance",
          },
          {
            name: "Assignments",
            href: "/dashboard/teacher/assignments",
            icon: FileText,
            description: "Create & grade",
          },
          {
            name: "Grades",
            href: "/dashboard/teacher/grades",
            icon: TrendingUp,
            description: "Student performance",
          },
        ],
      },
      {
        title: "Planning & Resources",
        items: [
          {
            name: "Schedule",
            href: "/dashboard/teacher/schedule",
            icon: Calendar,
            description: "Class schedule",
          },
          {
            name: "Resources",
            href: "/dashboard/teacher/resources",
            icon: Folder,
            description: "Teaching materials",
          },
          {
            name: "Communication",
            href: "/dashboard/teacher/communication",
            icon: MessageSquare,
            description: "Contact students",
          },
          {
            name: "Reports",
            href: "/dashboard/teacher/reports",
            icon: PieChart,
            description: "Progress reports",
          },
        ],
      },
    ];

    const student = [
      {
        title: "My Learning Hub",
        items: [
          {
            name: "Dashboard",
            href: "/student",
            icon: LayoutDashboard,
            description: "Learning overview",
            badge: "New",
          },
          {
            name: "My Classes",
            href: "/dashboard/student/classes",
            icon: BookOpen,
            description: "Enrolled classes",
          },
          {
            name: "Quran Progress",
            href: "/dashboard/student/quran",
            icon: Book,
            description: "Memorization tracker",
          },
          {
            name: "Schedule",
            href: "/dashboard/student/schedule",
            icon: Calendar,
            description: "Class timetable",
          },
        ],
      },
      {
        title: "Academic Progress",
        items: [
          {
            name: "Assignments",
            href: "/dashboard/student/assignments",
            icon: FileText,
            description: "View & submit",
            badge: "2 Due",
          },
          {
            name: "Grades",
            href: "/dashboard/student/grades",
            icon: TrendingUp,
            description: "Performance",
          },
          {
            name: "Attendance",
            href: "/dashboard/student/attendance",
            icon: CheckCircle,
            description: "Attendance record",
          },
          {
            name: "Resources",
            href: "/dashboard/student/resources",
            icon: Folder,
            description: "Study materials",
          },
        ],
      },
      {
        title: "Achievements",
        items: [
          {
            name: "Certificates",
            href: "/dashboard/student/certificates",
            icon: Award,
            description: "My certificates",
          },
          {
            name: "Progress",
            href: "/dashboard/student/progress",
            icon: BarChart,
            description: "Learning analytics",
          },
          {
            name: "Goals",
            href: "/dashboard/student/goals",
            icon: Target,
            description: "Learning objectives",
          },
        ],
      },
    ];

    const parent = [
      {
        title: "Family Dashboard",
        items: [
          {
            name: "Overview",
            href: "/parent",
            icon: LayoutDashboard,
            description: "Family overview",
            badge: "Updated",
          },
          {
            name: "My Children",
            href: "/dashboard/parent/children",
            icon: Users,
            description: "Children profiles",
          },
          {
            name: "Progress Reports",
            href: "/dashboard/parent/progress",
            icon: TrendingUp,
            description: "Academic progress",
          },
        ],
      },
      {
        title: "Monitoring",
        items: [
          {
            name: "Attendance",
            href: "/dashboard/parent/attendance",
            icon: CheckCircle,
            description: "Attendance tracking",
          },
          {
            name: "Grades",
            href: "/dashboard/parent/grades",
            icon: BarChart3,
            description: "Academic performance",
          },
          {
            name: "Assignments",
            href: "/dashboard/parent/assignments",
            icon: FileText,
            description: "Homework status",
          },
          {
            name: "Schedule",
            href: "/dashboard/parent/schedule",
            icon: Calendar,
            description: "Children schedule",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            name: "Payments",
            href: "/dashboard/parent/payments",
            icon: CreditCard,
            description: "Fee management",
            badge: "1 Due",
          },
          {
            name: "Messages",
            href: "/dashboard/parent/messages",
            icon: MessageSquare,
            description: "School communication",
          },
          {
            name: "Quran Progress",
            href: "/dashboard/parent/quran",
            icon: Book,
            description: "Quran memorization",
          },
          {
            name: "Support",
            href: "/dashboard/parent/support",
            icon: LifeBuoy,
            description: "Help & assistance",
          },
        ],
      },
    ];

    // Return navigation based on user role
    switch (user.role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        return admin;
      case "TEACHER":
        return teacher;
      case "STUDENT":
        return student;
      case "PARENT":
        return parent;
      default:
        return [];
    }
  }, [user.role]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleQuickAction = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  // Animation variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // Filter navigation based on search
  const filteredNavigation = searchQuery
    ? navigation
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length > 0)
    : navigation;

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
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          // Mobile: fixed, slides in/out
          "fixed inset-y-0 left-0 z-50 w-80 flex flex-col",
          // Desktop: fixed position, always visible
          "lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:z-40",
          // Visual styling
          "bg-background border-r border-border/50 backdrop-blur-xl",
        )}
        style={{ transform: "none" }}
      >
        {/* BRAND LOGO AREA - With Animation */}
        <div className="shrink-0 flex h-24 items-center justify-between px-6 border-b border-border/50 bg-linear-to-b from-primary-50/10 to-transparent dark:from-primary-900/5 dark:to-transparent">
          <Link
            href="/dashboard"
            className="group flex items-center gap-4 outline-none"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="w-12 h-12 bg-linear-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20"
            >
              <BookOpen className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter leading-none">
                AL-MAYSAROH
              </h1>
              <p className="text-[10px] text-primary-700 dark:text-primary-400 font-bold tracking-[0.3em] uppercase">
                {user.role === "STUDENT"
                  ? "Student Portal"
                  : user.role === "TEACHER"
                    ? "Teacher Portal"
                    : user.role === "PARENT"
                      ? "Parent Portal"
                      : "Admin Portal"}
              </p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* SIDEBAR SEARCH - Enhanced */}
        <div className="shrink-0 px-4 py-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary-700 dark:group-focus-within:text-primary-400" />
            <Input
              type="search"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-border/50 bg-background/50 pl-10 text-sm focus-visible:ring-primary-700 focus-visible:border-primary-700 rounded-2xl h-10 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* 2. SCROLLABLE NAVIGATION AREA - FIXED */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-6">
              {filteredNavigation.map((section, sIndex) => (
                <div key={sIndex} className="space-y-2">
                  <h3 className="px-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname?.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "group flex items-center rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 relative outline-none",
                            isActive
                              ? "bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/30 shadow-lg"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                          )}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setOpen(false);
                            }
                          }}
                        >
                          <div className="relative">
                            <item.icon
                              className={cn(
                                "mr-3 h-5 w-5 transition-all duration-300",
                                isActive
                                  ? "text-primary-700 dark:text-primary-400"
                                  : "text-muted-foreground group-hover:text-primary-700 dark:group-hover:text-primary-400",
                              )}
                            />
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-primary-500/10 rounded-lg blur-sm"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold tracking-tight truncate">
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-[10px] font-medium text-muted-foreground mt-0.5 truncate opacity-70 group-hover:opacity-100 transition-opacity">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {item.badge && (
                            <Badge className="ml-2 shrink-0 rounded-full bg-linear-to-r from-amber-500 to-orange-500 text-[10px] font-black px-2 py-0.5 border-0 whitespace-nowrap">
                              {item.badge}
                            </Badge>
                          )}

                          {isActive && (
                            <ChevronRight className="ml-2 h-4 w-4 text-primary-700 dark:text-primary-400" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* SYSTEM METRICS WIDGET - For Admin/Tech Roles Only */}
              {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
                <div className="mx-3 mt-6 p-5 rounded-2xl bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200/50 dark:border-primary-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black uppercase tracking-wider text-foreground">
                      System Status
                    </p>
                    <Zap className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Storage Usage</span>
                        <span className="text-primary-700 dark:text-primary-400">
                          78%
                        </span>
                      </div>
                      <Progress
                        value={78}
                        className="h-1.5 bg-primary-100 dark:bg-primary-900/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Active Users</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          42/100
                        </span>
                      </div>
                      <Progress
                        value={42}
                        className="h-1.5 bg-primary-100 dark:bg-primary-900/30"
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-4 h-9 bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-xs font-black text-white rounded-xl shadow-lg"
                  >
                    Upgrade Plan
                  </Button>
                </div>
              )}

              {/* STUDENT SPECIFIC WIDGET */}
              {user.role === "STUDENT" && (
                <div className="mx-3 mt-6 p-5 rounded-2xl bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10 border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black uppercase tracking-wider text-foreground">
                      Learning Progress
                    </p>
                    <Target className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Quran Memorization</span>
                        <span className="text-blue-700 dark:text-blue-400">
                          65%
                        </span>
                      </div>
                      <Progress
                        value={65}
                        className="h-1.5 bg-blue-100 dark:bg-blue-900/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground">
                        <span>Assignments Complete</span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          8/10
                        </span>
                      </div>
                      <Progress
                        value={80}
                        className="h-1.5 bg-blue-100 dark:bg-blue-900/30"
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-4 h-9 border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-xl"
                  >
                    View Progress Report
                  </Button>
                </div>
              )}

              {/* PARENT SPECIFIC WIDGET */}
              {user.role === "PARENT" && (
                <div className="mx-3 mt-6 p-5 rounded-2xl bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-200/50 dark:border-violet-800/30">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black uppercase tracking-wider text-foreground">
                      Child Summary
                    </p>
                    <Users className="h-4 w-4 text-violet-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">
                        Attendance
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        95%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">
                        Avg. Grade
                      </span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        A-
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">
                        Assignments Due
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        2
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-4 h-9 border-violet-200 dark:border-violet-800/30 text-violet-700 dark:text-violet-400 text-xs font-bold rounded-xl"
                  >
                    View Children
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR FOOTER - Enhanced Profile Widget */}
        <div className="shrink-0 border-t border-border/50 p-4 space-y-4 bg-linear-to-b from-background to-background/80">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary-500/30">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback
                  className={cn(
                    "text-white font-black text-sm",
                    getRoleColor(),
                  )}
                >
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              {user.role === "SUPER_ADMIN" && (
                <Crown className="absolute -top-1 -right-1 h-4 w-4 text-amber-500 fill-amber-500" />
              )}
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-linear-to-r from-emerald-400 to-teal-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-foreground truncate">
                {user.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={cn(
                    "text-[10px] font-black px-2 py-0.5 border-0",
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
            <Link
              href="/help"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 py-2.5 text-xs font-bold text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setOpen(false);
                }
              }}
            >
              <LifeBuoy className="h-4 w-4" />
              Help
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-500/10 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>

          {/* Version Info */}
          <div className="pt-4 mt-2 border-t border-border/50">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold text-muted-foreground">
                v2.1.0 • Elite Edition
              </span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-linear-to-r from-emerald-400 to-teal-500" />
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

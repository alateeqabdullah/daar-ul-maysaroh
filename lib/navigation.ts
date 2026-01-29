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
  Book,
  GraduationCap,
  Wallet,
  User as UserIcon,
  MessageSquare,
  Folder,
  PieChart,
  CheckCircle,
  TrendingUp,
  Award,
  BarChart,
  CreditCard,
  Target,
  LifeBuoy,
} from "lucide-react";

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

// Admin navigation
export const ADMIN_NAV: NavSection[] = [
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
];

// Student navigation
export const STUDENT_NAV: NavSection[] = [
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
];

// Teacher navigation (similarly define TEACHER_NAV and PARENT_NAV)
// ... [similar structure for other roles]

export function getNavigationForRole(role: string): NavSection[] {
  const roleMap: Record<string, NavSection[]> = {
    SUPER_ADMIN: ADMIN_NAV,
    ADMIN: ADMIN_NAV,
    TEACHER: [], // Add TEACHER_NAV here
    STUDENT: STUDENT_NAV,
    PARENT: [], // Add PARENT_NAV here
  };

  return roleMap[role] || STUDENT_NAV;
}

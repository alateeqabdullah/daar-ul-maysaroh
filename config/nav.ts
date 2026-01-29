import {
  LayoutDashboard,
  UserCheck,
  Users,
  BookOpen,
  GraduationCap,
  Wallet,
  BarChart3,
  Settings,
  Calendar,
  FileText,
  Folder,
  MessageSquare,
} from "lucide-react";

export const DASHBOARD_NAV = {
  ADMIN: [
    {
      group: "Management",
      items: [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        {
          name: "Approvals",
          href: "/admin/approvals",
          icon: UserCheck,
          badge: "NEW",
        },
        { name: "User Directory", href: "/admin/users", icon: Users },
      ],
    },
    {
      group: "Academic",
      items: [
        {
          name: "Institutes & Classes",
          href: "/admin/classes",
          icon: BookOpen,
        },
        {
          name: "Faculty Registry",
          href: "/admin/teachers",
          icon: GraduationCap,
        },
        { name: "Student Body", href: "/admin/students", icon: Users },
      ],
    },
    {
      group: "Operations",
      items: [
        { name: "Financial Bursar", href: "/admin/financial", icon: Wallet },
        { name: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ],
  TEACHER: [
    {
      group: "Academic",
      items: [
        { name: "My Majlis", href: "/teacher", icon: LayoutDashboard },
        { name: "Classroom", href: "/teacher/classes", icon: BookOpen },
        { name: "Attendance", href: "/teacher/attendance", icon: UserCheck },
        { name: "Quran Progress", href: "/teacher/quran", icon: BookOpen },
      ],
    },
  ],
  STUDENT: [
    {
      group: "Learning",
      items: [
        { name: "My Portal", href: "/student", icon: LayoutDashboard },
        { name: "My Classes", href: "/student/classes", icon: BookOpen },
        { name: "Hifz Progress", href: "/student/quran", icon: GraduationCap },
        { name: "Schedule", href: "/student/schedule", icon: Calendar },
      ],
    },
  ],
};

// import {
//   LayoutDashboard,
//   Users,
//   UserCheck,
//   BookOpen,
//   Users2,
//   Calendar,
//   FileText,
//   BarChart3,
//   Settings,
//   Book,
//   GraduationCap,
//   Wallet,
//   User as UserIcon,
//   MessageSquare,
//   Folder,
//   PieChart,
//   CheckCircle,
//   TrendingUp,
//   Award,
//   BarChart,
//   CreditCard,
//   Target,
//   LifeBuoy,
// } from "lucide-react";

// interface NavItem {
//   name: string;
//   href: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   badge?: string;
//   description?: string;
// }

// interface NavSection {
//   title: string;
//   items: NavItem[];
// }

// // Admin navigation
// export const ADMIN_NAV: NavSection[] = [
//   {
//     title: "Dashboard Hub",
//     items: [
//       {
//         name: "Overview",
//         href: "/admin",
//         icon: LayoutDashboard,
//         description: "System health & analytics",
//         badge: "Live",
//       },
//       {
//         name: "Approvals",
//         href: "/dashboard/admin/approvals",
//         icon: UserCheck,
//         badge: "5 Pending",
//         description: "Verify new user requests",
//       },
//       {
//         name: "Users",
//         href: "/dashboard/admin/users",
//         icon: Users,
//         description: "Total system users",
//       },
//     ],
//   },
//   {
//     title: "Academic Management",
//     items: [
//       {
//         name: "Class Groups",
//         href: "/dashboard/admin/groups",
//         icon: Users2,
//         description: "Manage study groups",
//       },
//       {
//         name: "Curriculum",
//         href: "/dashboard/admin/classes",
//         icon: BookOpen,
//         description: "Class syllabi & books",
//         badge: "New",
//       },
//       {
//         name: "Teachers",
//         href: "/dashboard/admin/teachers",
//         icon: GraduationCap,
//         description: "Faculty management",
//       },
//       {
//         name: "Students",
//         href: "/dashboard/admin/students",
//         icon: UserIcon,
//         description: "Student profiles",
//       },
//       {
//         name: "Attendance",
//         href: "/dashboard/admin/attendance",
//         icon: CheckCircle,
//         description: "Track attendance",
//       },
//     ],
//   },
// ];

// // Student navigation
// export const STUDENT_NAV: NavSection[] = [
//   {
//     title: "My Learning Hub",
//     items: [
//       {
//         name: "Dashboard",
//         href: "/student",
//         icon: LayoutDashboard,
//         description: "Learning overview",
//         badge: "New",
//       },
//       {
//         name: "My Classes",
//         href: "/dashboard/student/classes",
//         icon: BookOpen,
//         description: "Enrolled classes",
//       },
//       {
//         name: "Quran Progress",
//         href: "/dashboard/student/quran",
//         icon: Book,
//         description: "Memorization tracker",
//       },
//       {
//         name: "Schedule",
//         href: "/dashboard/student/schedule",
//         icon: Calendar,
//         description: "Class timetable",
//       },
//     ],
//   },
//   {
//     title: "Academic Progress",
//     items: [
//       {
//         name: "Assignments",
//         href: "/dashboard/student/assignments",
//         icon: FileText,
//         description: "View & submit",
//         badge: "2 Due",
//       },
//       {
//         name: "Grades",
//         href: "/dashboard/student/grades",
//         icon: TrendingUp,
//         description: "Performance",
//       },
//       {
//         name: "Attendance",
//         href: "/dashboard/student/attendance",
//         icon: CheckCircle,
//         description: "Attendance record",
//       },
//       {
//         name: "Resources",
//         href: "/dashboard/student/resources",
//         icon: Folder,
//         description: "Study materials",
//       },
//     ],
//   },
// ];

// // Teacher navigation (similarly define TEACHER_NAV and PARENT_NAV)
// // ... [similar structure for other roles]

// export function getNavigationForRole(role: string): NavSection[] {
//   const roleMap: Record<string, NavSection[]> = {
//     SUPER_ADMIN: ADMIN_NAV,
//     ADMIN: ADMIN_NAV,
//     TEACHER: [], // Add TEACHER_NAV here
//     STUDENT: STUDENT_NAV,
//     PARENT: [], // Add PARENT_NAV here
//   };

//   return roleMap[role] || STUDENT_NAV;
// }












// lib/navigation.ts
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, ScrollText, 
  Group, GitBranch, DollarSign, ShieldCheck, Calendar, Settings, 
  Heart, CreditCard, Activity 
} from "lucide-react";

export const adminNavGroups = [
  {
    group: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    ],
  },
  {
    group: "Identity & Access",
    items: [
      { name: "Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Student Groups", href: "/dashboard/admin/groups", icon: Group },
    ],
  },
  {
    group: "Academic Excellence",
    items: [
      { name: "Classes", href: "/dashboard/admin/classes", icon: GraduationCap },
      { name: "Subjects", href: "/dashboard/admin/subjects", icon: BookOpen },
      { name: "Enrollments", href: "/dashboard/admin/enrollments", icon: ScrollText },
      { name: "Assignments", href: "/dashboard/admin/assignments", icon: ScrollText },
      { name: "Grades", href: "/dashboard/admin/grades", icon: ScrollText },
    ],
  },
  {
    group: "Spiritual Journey", // Highlighting your unique Prisma models
    items: [
      { name: "Quran Progress", href: "/dashboard/admin/quran-progress", icon: BookOpen },
      { name: "Hifz Progress", href: "/dashboard/admin/hifz-progress", icon: Activity },
      { name: "Sanad Chains", href: "/dashboard/admin/sanad-chains", icon: GitBranch },
    ],
  },
  {
    group: "Financial Management",
    items: [
      { name: "Pricing Plans", href: "/dashboard/admin/pricing-plans", icon: CreditCard },
      { name: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: Activity },
      { name: "Invoices", href: "/dashboard/admin/invoices", icon: DollarSign },
      { name: "Payments", href: "/dashboard/admin/payments", icon: DollarSign },
      { name: "Expenses", href: "/dashboard/admin/expenses", icon: DollarSign },
      { name: "Payrolls", href: "/dashboard/admin/payrolls", icon: DollarSign },
    ],
  },
  {
    group: "Communication & System",
    items: [
      { name: "Announcements", href: "/dashboard/admin/announcements", icon: ShieldCheck },
      { name: "Events", href: "/dashboard/admin/events", icon: Calendar },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  },
];
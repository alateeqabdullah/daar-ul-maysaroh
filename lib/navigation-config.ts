import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Wallet,
  MessageSquare,
  Settings,
  Mic,
  CheckCircle,
  Award,
  Heart,
  BarChart3,
  LifeBuoy,
  CreditCard,
  Users2,
  UserCheck,
  TrendingUp,
  PieChart,
  Folder,
  Book,
  User as UserIcon,
} from "lucide-react";

export const NAV_CONFIG = {
  SUPER_ADMIN: [
    {
      group: "Command Hub",
      items: [
        {
          name: "System Cockpit",
          href: "/dashboard/admin",
          icon: LayoutDashboard,
          desc: "Global intelligence & pulse",
          badge: "Live",
        },
        {
          name: "Identity Gateway",
          href: "/dashboard/admin/approvals",
          icon: UserCheck,
          desc: "Verify waitlisted nodes",
          badge: "5",
        },
        {
          name: "Node Registry",
          href: "/dashboard/admin/users",
          icon: Users,
          desc: "Total system identities",
        },
      ],
    },
    {
      group: "Academic Orchestration",
      items: [
        {
          name: "Class Groups",
          href: "/dashboard/admin/groups",
          icon: Users2,
          desc: "Manage study circles",
        },
        {
          name: "Curriculum",
          href: "/dashboard/admin/classes",
          icon: BookOpen,
          desc: "Syllabi & Knowledge Nodes",
        },
        {
          name: "Faculty Registry",
          href: "/dashboard/admin/teachers",
          icon: GraduationCap,
          desc: "Instructor node management",
        },
        {
          name: "Student Registry",
          href: "/dashboard/admin/students",
          icon: UserIcon,
          desc: "Student identity profiles",
        },
        {
          name: "Attendance Radar",
          href: "/dashboard/admin/attendance",
          icon: CheckCircle,
          desc: "Live presence tracking",
        },
      ],
    },
    {
      group: "Institutional Logistics",
      items: [
        {
          name: "Master Schedule",
          href: "/dashboard/admin/schedule",
          icon: Calendar,
          desc: "Temporal node management",
        },
        {
          name: "Task Terminal",
          href: "/dashboard/admin/assignments",
          icon: FileText,
          desc: "Challenges & handovers",
        },
        {
          name: "Result Ledger",
          href: "/dashboard/admin/grades",
          icon: TrendingUp,
          desc: "Mastery analytics",
        },
        {
          name: "Financial Hub",
          href: "/dashboard/admin/financial",
          icon: Wallet,
          desc: "Revenue synchronization",
          badge: "Secure",
        },
        {
          name: "Vault Settings",
          href: "/dashboard/admin/settings",
          icon: Settings,
          desc: "System sovereignty",
        },
      ],
    },
    {
      group: "Intelligence & Comms",
      items: [
        {
          name: "Intel Reports",
          href: "/dashboard/admin/reports",
          icon: PieChart,
          desc: "Institutional snapshots",
        },
        {
          name: "Guardian Hub",
          href: "/dashboard/admin/parents",
          icon: Users,
          desc: "Stakeholder management",
        },
        {
          name: "Comms Terminal",
          href: "/dashboard/admin/communication",
          icon: MessageSquare,
          desc: "Encrypted messaging",
        },
        {
          name: "Knowledge Vault",
          href: "/dashboard/admin/resources",
          icon: Folder,
          desc: "Asset repository",
        },
      ],
    },
  ],
  TEACHER: [
    {
      group: "Tactical Hub",
      items: [
        {
          name: "My Cockpit",
          href: "/dashboard/teacher",
          icon: LayoutDashboard,
          desc: "Daily sync overview",
        },
        {
          name: "Active Nodes",
          href: "/dashboard/teacher/classes",
          icon: BookOpen,
          desc: "Classroom orchestration",
        },
        {
          name: "Hifz Terminal",
          href: "/dashboard/teacher/quran",
          icon: Mic,
          desc: "Spiritual progress sync",
        },
      ],
    },
    {
      group: "Student Oversight",
      items: [
        {
          name: "Student Nodes",
          href: "/dashboard/teacher/students",
          icon: Users,
          desc: "Identity list",
        },
        {
          name: "Check-in",
          href: "/dashboard/teacher/attendance",
          icon: CheckCircle,
          desc: "Presence verification",
        },
        {
          name: "Evaluator",
          href: "/dashboard/teacher/assignments",
          icon: FileText,
          desc: "Task management",
        },
        {
          name: "Grade Ledger",
          href: "/dashboard/teacher/grades",
          icon: TrendingUp,
          desc: "Mastery recording",
        },
      ],
    },
    {
      group: "Resources",
      items: [
        {
          name: "Schedule",
          href: "/dashboard/teacher/schedule",
          icon: Calendar,
          desc: "My temporal node",
        },
        {
          name: "Vault Access",
          href: "/dashboard/teacher/resources",
          icon: Folder,
          desc: "Knowledge handouts",
        },
        {
          name: "Comms",
          href: "/dashboard/teacher/communication",
          icon: MessageSquare,
          desc: "Student handshakes",
        },
      ],
    },
  ],
  STUDENT: [
    {
      group: "Learning Journey",
      items: [
        {
          name: "My Pulse",
          href: "/dashboard/student",
          icon: Heart,
          desc: "Learning overview",
        },
        {
          name: "My Classes",
          href: "/dashboard/student/classes",
          icon: BookOpen,
          desc: "Enrolled nodes",
        },
        {
          name: "Quran Tracker",
          href: "/dashboard/student/quran",
          icon: Book,
          desc: "Mastery progress",
        },
        {
          name: "Timeline",
          href: "/dashboard/student/schedule",
          icon: Calendar,
          desc: "Class schedule",
        },
      ],
    },
    {
      group: "Performance",
      items: [
        {
          name: "Handovers",
          href: "/dashboard/student/assignments",
          icon: FileText,
          desc: "Tasks due",
          badge: "2",
        },
        {
          name: "Results",
          href: "/dashboard/student/grades",
          icon: TrendingUp,
          desc: "My mastery grade",
        },
        {
          name: "Vault",
          href: "/dashboard/student/resources",
          icon: Folder,
          desc: "Study assets",
        },
      ],
    },
    {
      group: "Sovereignty",
      items: [
        {
          name: "Certificates",
          href: "/dashboard/student/certificates",
          icon: Award,
          desc: "Verified achievements",
        },
        {
          name: "Analytics",
          href: "/dashboard/student/progress",
          icon: BarChart3,
          desc: "Growth data",
        },
      ],
    },
  ],
  PARENT: [
    {
      group: "Family Dashboard",
      items: [
        {
          name: "Overview",
          href: "/dashboard/parent",
          icon: LayoutDashboard,
          desc: "Family node sync",
        },
        {
          name: "Children",
          href: "/dashboard/parent/children",
          icon: Users,
          desc: "Identity nodes",
        },
        {
          name: "Progress",
          href: "/dashboard/parent/progress",
          icon: TrendingUp,
          desc: "Academic mastery",
        },
      ],
    },
    {
      group: "Monitoring",
      items: [
        {
          name: "Attendance",
          href: "/dashboard/parent/attendance",
          icon: CheckCircle,
          desc: "Presence logs",
        },
        {
          name: "Grades",
          href: "/dashboard/parent/grades",
          icon: BarChart3,
          desc: "Performance ledger",
        },
        {
          name: "Homework",
          href: "/dashboard/parent/assignments",
          icon: FileText,
          desc: "Task status",
        },
        {
          name: "Hifz Sync",
          href: "/dashboard/parent/quran",
          icon: Book,
          desc: "Spiritual progress",
        },
      ],
    },
    {
      group: "Institutional Sync",
      items: [
        {
          name: "Revenue Hub",
          href: "/dashboard/parent/payments",
          icon: CreditCard,
          desc: "Fee management",
          badge: "Due",
        },
        {
          name: "Comms",
          href: "/dashboard/parent/messages",
          icon: MessageSquare,
          desc: "Direct handshake",
        },
        {
          name: "Support",
          href: "/dashboard/parent/support",
          icon: LifeBuoy,
          desc: "Vault assistance",
        },
      ],
    },
  ],
};

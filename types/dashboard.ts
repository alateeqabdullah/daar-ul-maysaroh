// types/dashboard.ts

export interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  activeClasses: number;
  activeTeachers: number;
  revenue: number;
  attendanceRate: number;
}

export interface ChartDataRevenue {
  month: string;
  revenue: number;
}

export interface ChartDataAttendance {
  day: string;
  present: number;
  absent: number;
}

export interface ChartDataDistribution {
  name: string;
  value: number;
  color: string;
}

export interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  createdAt: string; // Dates over JSON are strings
}

export interface ActivityItem {
  id: string;
  type: "PAYMENT" | "USER_JOINED" | "SYSTEM";
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export interface DashboardApiResponse {
  stats: DashboardStats;
  pendingUsers: PendingUser[];
  charts: {
    revenue: ChartDataRevenue[];
    attendance: ChartDataAttendance[];
    userDistribution: ChartDataDistribution[];
  };
  recentActivity: ActivityItem[];
}






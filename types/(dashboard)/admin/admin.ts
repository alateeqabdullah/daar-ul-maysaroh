export interface DashboardStats {
  pendingApprovals: number;
  activeStudents: number;
  todayAttendance: number;
  revenue: number;
  expenseTotal: number;
}

export interface RecentHifzLog {
  id: string;
  surah: number;
  startAyah: number;
  endAyah: number;
  status: "PASS" | "FAIL" | "NEEDS_PRACTICE" | "EXCELLENT";
  student: {
    user: {
      name: string;
      image: string | null;
    };
  };
}

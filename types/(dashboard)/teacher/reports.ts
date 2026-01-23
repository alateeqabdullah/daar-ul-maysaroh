// // types/reports.ts

// export interface AttendanceTrend {
//   month: string;
//   present: number;
//   absent: number;
// }

// export interface GradeDistribution {
//   name: string;
//   value: number;
//   color: string;
// }

// export interface PerformanceTrend {
//   month: string;
//   score: number;
// }

// export interface ClassPerformanceMetric {
//   id: string;
//   name: string;
//   code: string;
//   studentCount: number;
//   averageScore: number;
//   attendanceRate: number;
//   improvement: number; // Difference from previous month (mocked or calculated)
// }

// export interface GeneratedReportLog {
//   id: string;
//   title: string;
//   type: "attendance" | "performance" | "progress" | "grades";
//   generatedAt: string;
//   size: string;
// }

// export interface DashboardStats {
//   avgAttendance: number;
//   avgPerformance: number;
//   totalAssignments: number;
//   activeStudents: number;
// }

// export interface ReportsPageData {
//   attendanceData: AttendanceTrend[];
//   gradeData: GradeDistribution[];
//   performanceData: PerformanceTrend[];
//   classMetrics: ClassPerformanceMetric[];
//   recentReports: GeneratedReportLog[];
//   stats: DashboardStats;
// }


export interface ReportsPageData {
  stats: {
    avgAttendance: number;
    avgPerformance: number;
    totalAssignments: number;
    activeStudents: number;
  };
  attendanceData: { month: string; present: number }[];
  gradeData: { name: string; value: number; color: string }[];
  performanceData: { month: string; score: number }[];
  classMetrics: {
    id: string;
    name: string;
    code: string;
    averageScore: number;
    attendanceRate: number;
    studentCount: number;
  }[];
  recentReports: {
    id: string;
    title: string;
    type: string;
    size: string;
    generatedAt: string;
  }[];
}
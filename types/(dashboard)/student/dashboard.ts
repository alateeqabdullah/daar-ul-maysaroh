export interface DashboardData {
  student: {
    name: string;
    image: string | null;
    currentLevel: string | null;
    hifzLevel: string | null;
  };
  stats: {
    attendanceRate: number;
    avgGrade: number;
    completedLessons: number;
    pendingAssignments: number;
  };
  hifzProgress: {
    currentSurah: string;
    juz: number;
    completion: number;
    lastLog: {
      date: string;
      status: string;
      ayahs: string;
    } | null;
  };
  upcomingClasses: Array<{
    id: string;
    name: string;
    startTime: string;
    teacher: string;
    meetingUrl?: string | null;
  }>;
  recentAssignments: Array<{
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: "PENDING" | "SUBMITTED" | "GRADED";
  }>;
}

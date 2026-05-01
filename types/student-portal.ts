export interface Subject {
  id: string;
  name: string;
  code: string;
  category: string;
  upcomingAssignments: Array<{
    id: string;
    title: string;
    dueDate: string;
  }>;
}

export interface Enrollment {
  id: string;
  status: string;
  progress: number;
  attendanceRate: number;
  enrolledAt: string;
  class: {
    id: string;
    name: string;
    code: string;
    level: string;
    description: string | null;
    teacher: {
      id: string;
      name: string;
      image: string | null;
    };
    subjects: Subject[];
    recentMaterials: Array<{
      id: string;
      title: string;
      type: string;
      fileUrl: string;
      uploadedAt: string;
    }>;
  };
}

export interface WeeklySession {
  id: string;
  class: { name: string; teacher: { name: string } };
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  meetingUrl?: string;
}

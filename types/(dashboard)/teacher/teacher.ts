// src/types/teacher.ts

export interface TeacherScheduleItem {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isLive: boolean;
  meetingUrl: string | null;
  meetingPlatform: string;
  className: string;
  classCode: string;
  classLevel: string;
  studentCount: number;
  teacherName?: string;
  teacherImage?: string | null;
}

export interface TeacherClassOption {
  id: string;
  name: string;
  code: string;
}

export interface ScheduleStats {
  totalSessions: number;
  onlineSessions: number;
  uniqueClasses: number;
  busiestDay: string;
}





export interface ReportStats {
  totalStudents: number;
  attendanceRate: number;
  avgGrade: number;
  assignmentsCompletion: number;
  topPerformingClass: string;
}

export interface ClassPerformance {
  name: string;
  attendance: number;
  grades: number;
}

export interface TeacherProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  bio: string | null;
  qualification: string | null;
  experienceYears: number;
  specialization: string | null;
  joiningDate: string;
}

export interface TeacherSettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  theme: "light" | "dark" | "system";
}
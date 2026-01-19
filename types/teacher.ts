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
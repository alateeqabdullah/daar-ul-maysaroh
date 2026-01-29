// // types/student.ts
// import {
//   UserRole,
//   UserStatus,
//   EnrollmentStatus,
//   AttendanceStatus,
//   MaterialType,
//   ScheduleType,
//   MeetingPlatform,
//   PriorityLevel,
//   AssignmentType,
//   SubmissionStatus,
// } from "@/app/generated/prisma/client";

// // Base types from Prisma schema
// export type Student = {
//   id: string;
//   userId: string;
//   studentId: string;
//   dateOfBirth?: Date | null;
//   gender: "MALE" | "FEMALE";
//   enrollmentDate: Date;
//   currentLevel?: string | null;
//   currentClassId?: string | null;
//   academicYear: string;
//   hifzLevel?: string | null;
//   tajweedLevel?: string | null;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string | null;
//     role: UserRole;
//     status: UserStatus;
//   };
// };

// export type Class = {
//   id: string;
//   name: string;
//   code: string;
//   description?: string | null;
//   level: string;
//   section?: string | null;
//   capacity: number;
//   currentEnrollment: number;
//   academicYear: string;
//   term?: string | null;
//   isActive: boolean;
//   startDate?: Date | null;
//   endDate?: Date | null;
//   teacher: Teacher;
//   subjects: Subject[];
//   schedules: ClassSchedule[];
//   materials: ClassMaterial[];
// };

// export type Teacher = {
//   id: string;
//   teacherId: string;
//   qualification?: string | null;
//   specialization?: string | null;
//   user: {
//     name: string;
//     email: string;
//     image?: string | null;
//   };
// };

// export type Subject = {
//   id: string;
//   name: string;
//   code: string;
//   category: string;
//   creditHours: number;
//   assignments: Assignment[];
// };

// export type ClassSchedule = {
//   id: string;
//   dayOfWeek: number;
//   startTime: string;
//   endTime: string;
//   timezone: string;
//   isLive: boolean;
//   meetingPlatform?: MeetingPlatform | null;
//   meetingUrl?: string | null;
//   meetingId?: string | null;
//   meetingPassword?: string | null;
//   isRecurring: boolean;
// };

// export type ClassMaterial = {
//   id: string;
//   title: string;
//   description?: string | null;
//   type: MaterialType;
//   fileUrl: string;
//   thumbnailUrl?: string | null;
//   fileSize?: number | null;
//   uploadedAt: Date;
//   uploadedBy: {
//     name: string;
//   };
// };

// export type Assignment = {
//   id: string;
//   title: string;
//   description?: string | null;
//   dueDate: Date;
//   totalMarks: number;
//   weightage: number;
//   type: AssignmentType;
//   subject: Subject;
//   submissions: AssignmentSubmission[];
// };

// export type AssignmentSubmission = {
//   id: string;
//   submittedAt: Date;
//   submissionText?: string | null;
//   marks?: number | null;
//   status: SubmissionStatus;
//   feedback?: string | null;
// };

// export type Enrollment = {
//   id: string;
//   enrolledAt: Date;
//   enrollmentType: string;
//   status: EnrollmentStatus;
//   progress?: number | null;
//   class: Class;
//   attendance: {
//     date: Date;
//     status: AttendanceStatus;
//   }[];
// };

// export type AttendanceSummary = {
//   status: AttendanceStatus;
//   count: number;
// };

// // Component Props
// export interface StudentClassesPageProps {
//   searchParams: {
//     view?: "grid" | "list";
//     status?: EnrollmentStatus | "all";
//     search?: string;
//   };
// }

// export interface StudentClassesClientProps {
//   student: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//     studentId: string;
//     currentLevel?: string;
//     hifzLevel?: string;
//   };
//   enrollments: Enrollment[];
//   availableClasses: Class[];
//   stats: {
//     totalClasses: number;
//     activeClasses: number;
//     completedClasses: number;
//     averageProgress: number;
//     attendanceRate: number;
//   };
//   schedule: {
//     id: string;
//     class: Class;
//     dayOfWeek: number;
//     dayName: string;
//     startTime: string;
//     endTime: string;
//     isOnline: boolean;
//     meetingUrl?: string;
//   }[];
//   filters: {
//     view: "grid" | "list";
//     status: EnrollmentStatus | "all";
//     search: string;
//   };
// }




import { EnrollmentStatus } from "@/app/generated/prisma/enums";

export interface StudentClassesProps {
  student: {
    name: string;
    email: string;
    image: string | null;
    studentId: string;
  };
  enrollments: Array<{
    id: string;
    className: string;
    classCode: string;
    teacherName: string;
    teacherImage: string | null;
    status: EnrollmentStatus;
    progress: number;
    schedules: string[];
    materials: string[];
    enrolledAt: string;
  }>;
  availableClasses: Array<{
    id: string;
    name: string;
    code: string;
    teacher: string;
    capacity: number;
    enrolled: number;
  }>;
  stats: {
    totalClasses: number;
    activeClasses: number;
    completedClasses: number;
    averageProgress: number;
    attendanceRate: number;
  };
  schedule: Array<{
    id: string;
    className: string;
    teacher: string;
    day: string;
    time: string;
    meetingUrl: string | null;
  }>;
  filters: {
    view: string;
    status: string;
    search: string;
  };
}



export type ClassStatus = "ACTIVE" | "COMPLETED" | "DROPPED" | "UPCOMING";

export interface Teacher {
  name: string;
  email: string;
  avatar?: string | null;
}

export interface Enrollment {
  id: string;
  className: string;
  classCode: string;
  teacher: Teacher;
  status: ClassStatus;
  progress: number;
  nextLesson?: {
    title: string;
    date: string;
    meetingUrl?: string;
  };
}

export interface AvailableClass {
  id: string;
  name: string;
  code: string;
  teacher: string;
  capacity: number;
  enrolled: number;
}

export interface DashboardStats {
  totalClasses: number;
  activeClasses: number;
  completedClasses: number;
  averageProgress: number;
  attendanceRate: number;
}
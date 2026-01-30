import { User, Student, Teacher, Payment, HifzProgress } from "@/app/generated/prisma/client";

export interface ExtendedHifzLog extends HifzProgress {
  student: {
    user: {
      name: string;
      image: string | null;
    };
  };
}

export interface DashboardData {
  counts: {
    pendingUsers: number;
    students: number;
    teachers: number;
    classes: number;
  };
  revenue: {
    monthly: number;
    pending: number;
  };
  recentLogs: ExtendedHifzLog[];
  pendingList: (User & { studentProfile: any; teacherProfile: any })[];
}

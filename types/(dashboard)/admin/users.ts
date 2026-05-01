

import { Parent, Student, Teacher, User } from "@/app/generated/prisma/client";
import { UserRole } from "@/app/generated/prisma/enums";

export type UserWithProfiles = User & {
  studentProfile: Student | null;
  teacherProfile: Teacher | null;
  parentProfile: Parent | null;
};

export interface CreateNodeData {
  name: string;
  email: string;
  role: UserRole;
  specificId: string; // studentId or teacherId
  gender: "MALE" | "FEMALE";
  academicYear?: string;
}

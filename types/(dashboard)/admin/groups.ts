import { GroupMember, GroupSchedule, Student, StudentGroup, Teacher, User } from "@/app/generated/prisma/client";


export type ExtendedGroup = StudentGroup & {
  teacher: (Teacher & { user: User }) | null;
  assistantTeacher: (Teacher & { user: User }) | null;
  members: (GroupMember & { student: Student & { user: User } })[];
  schedules: GroupSchedule[];
};

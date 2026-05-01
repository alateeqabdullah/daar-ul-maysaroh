// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  image?: string;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  name: string;
  email: string;
  dateOfBirth?: Date;
  gender: string;
  currentClass?: string;
  hifzLevel?: string;
  parent?: Parent;
}

export interface Teacher {
  id: string;
  userId: string;
  teacherId: string;
  name: string;
  email: string;
  qualification?: string;
  specialization?: string;
}

export interface Parent {
  id: string;
  userId: string;
  name: string;
  email: string;
  occupation?: string;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  description?: string;
  level: string;
  capacity: number;
  currentEnrollment: number;
  teacher: Teacher;
  schedules: ClassSchedule[];
}

export interface StudentGroup {
  id: string;
  name: string;
  description?: string;
  type: string;
  teacher?: Teacher;
  members: GroupMember[];
  schedules: GroupSchedule[];
}

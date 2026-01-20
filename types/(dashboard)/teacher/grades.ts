// src/types/grades.ts

import { ExamType } from "@/app/generated/prisma/enums";

export interface GradeData {
  id: string;
  studentId: string;
  studentName: string;
  studentImage: string | null;
  className: string;
  subjectName: string;
  subjectId?: string; // Optional for edit mapping
  examType: ExamType;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string | null;
  remarks: string | null;
  date: string; // ISO String for serialization
}

export interface StudentOption {
  id: string;
  name: string;
  image: string | null;
}

export interface SubjectOption {
  id: string;
  name: string;
}

export interface ClassOption {
  id: string;
  name: string;
  subjects: SubjectOption[];
  students: StudentOption[];
}

export interface GradeStats {
  totalGrades: number;
  averageScore: number;
  topStudentName: string;
  failingCount: number;
}
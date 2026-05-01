// app/(portal)/dashboard/admin/subjects/page.tsx
import { Metadata } from "next";
import { SubjectsClient } from "./subjects-client";
import {
  getSubjects,
  getSubjectStats,
  getSubjectCategories,
  getAvailableTeachers,
  getAvailableClasses,
  type SubjectWithRelations,
} from "../actions/subjects";
import { SubjectCategory } from "@/app/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Subject Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage subjects, curriculum, and course materials",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    teacherId?: string;
    classId?: string;
  }>;
}

export default async function SubjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const category = params.category as SubjectCategory | undefined;
  const teacherId = params.teacherId;
  const classId = params.classId;

  let subjectsData: { data: SubjectWithRelations[]; totalPages: number; total: number };
  let stats;
  let categories: string[];
  let teachers: { id: string; name: string; specialization: string | null }[];
  let classes: { id: string; name: string; code: string; level: string }[];

  const defaultCategories = [
    "QURAN", "TAJWEED", "ARABIC", "FIQH", "AQEEDAH",
    "SEERAH", "HADITH", "AKHLAQ", "HISTORY", "OTHER",
  ];

  try {
    const [sData, sStats, sCats, sTeachers, sClasses] =
      await Promise.all([
        getSubjects({
          page,
          limit: 10,
          search,
          category,
          teacherId,
          classId,
        }),
        getSubjectStats(),
        getSubjectCategories(),
        getAvailableTeachers(),
        getAvailableClasses(),
      ]);
    subjectsData = sData;
    stats = sStats;
    categories = sCats;
    teachers = sTeachers;
    classes = sClasses;
  } catch (error) {
    console.error("Error loading subjects page:", error);
    subjectsData = { data: [], totalPages: 1, total: 0 };
    stats = {
      totalSubjects: 0,
      byCategory: {} as Record<SubjectCategory, number>,
      byClass: [],
      byTeacher: [],
      totalMaterials: 0,
      totalAssignments: 0,
      averageGrade: 0,
    };
    categories = defaultCategories;
    teachers = [];
    classes = [];
  }

  return (
    <SubjectsClient
      initialSubjects={subjectsData.data || []}
      initialStats={stats}
      initialPage={page}
      initialSearch={search || ""}
      initialCategory={category || ""}
      initialTeacherId={teacherId || ""}
      initialClassId={classId || ""}
      totalPages={subjectsData.totalPages || 1}
      totalSubjects={subjectsData.total || 0}
      categories={categories}
      teachers={teachers}
      classes={classes}
    />
  );
}

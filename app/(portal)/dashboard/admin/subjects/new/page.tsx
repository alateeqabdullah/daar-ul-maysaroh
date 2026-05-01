// app/(portal)/dashboard/admin/subjects/new/page.tsx
import { Metadata } from "next";
import { NewSubjectClient } from "./new-subject-client";
import {
  getSubjectCategories,
  getAvailableTeachers,
  getAvailableClasses,
} from "../../actions/subjects";

export const metadata: Metadata = {
  title: "Create Subject | Admin Dashboard | Al-Maysaroh",
  description: "Create a new subject for the curriculum",
};

export default async function NewSubjectPage() {
  let categories: string[] = [
    "QURAN",
    "TAJWEED",
    "ARABIC",
    "FIQH",
    "AQEEDAH",
    "SEERAH",
    "HADITH",
    "AKHLAQ",
    "HISTORY",
    "OTHER",
  ];
  let teachers: any[] = [];
  let classes: any[] = [];

  try {
    const [categoriesRes, teachersRes, classesRes] = await Promise.all([
      getSubjectCategories(),
      getAvailableTeachers(),
      getAvailableClasses(),
    ]);
    categories = categoriesRes;
    teachers = teachersRes;
    classes = classesRes;
  } catch (error) {
    console.error("Error loading new subject page:", error);
  }

  return (
    <NewSubjectClient
      categories={categories}
      teachers={teachers}
      classes={classes}
    />
  );
}

// app/(portal)/dashboard/admin/grades/new/page.tsx
import { Metadata } from "next";
import { NewGradeClient } from "./new-grade-client";
import { getExamTypes } from "../../actions/grades";
import { getSubjects } from "../../actions/subjects";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Enter New Grade | Admin Dashboard | Al-Maysaroh",
  description: "Enter a new grade for a student",
};

export default async function NewGradePage() {
  const session = await auth();
  // Try different possible user ID locations
  const userId =
    session?.user?.id || session?.user?.sub || (session?.user as any)?.id;
  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";

  let examTypes: string[] = [
    "MIDTERM",
    "FINAL",
    "QUIZ",
    "ASSIGNMENT",
    "RECITATION_TEST",
    "MEMORIZATION_TEST",
    "ORAL_EXAM",
    "WRITTEN_EXAM",
  ];

  interface FormattedSubject {
    id: string;
    name: string;
    code: string;
    category: string;
    className: string;
  }

  interface FormattedStudent {
    id: string;
    name: string;
    email: string;
    studentId: string;
    image: string | null;
  }

  let formattedSubjects: FormattedSubject[] = [];
  let formattedStudents: FormattedStudent[] = [];

  try {
    const [fetchedExamTypes, subjects, students] = await Promise.all([
      getExamTypes(),
      getSubjects({ page: 1, limit: 100 }),
      prisma.student.findMany({
        where: { enrollments: { some: { status: "ACTIVE" } } },
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { user: { name: "asc" } },
      }),
    ]);

    examTypes = fetchedExamTypes;
    formattedStudents = students.map((student) => ({
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      studentId: student.studentId,
      image: student.user.image,
    }));
    formattedSubjects = subjects.data.map((subject) => ({
      id: subject.id,
      name: subject.name,
      code: subject.code,
      category: subject.category,
      className: subject.class?.name || "Not Assigned",
    }));
  } catch (error) {
    console.error("Error loading new grade page:", error);
  }

  return (
    <NewGradeClient
      examTypes={examTypes}
      subjects={formattedSubjects}
      students={formattedStudents}
      userId={userId || ""}
      userName={userName}
    />
  );
}

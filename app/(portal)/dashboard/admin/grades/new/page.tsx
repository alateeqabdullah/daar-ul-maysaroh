// app/(portal)/dashboard/admin/grades/new/page.tsx
import { Metadata } from "next";
import { NewGradeClient } from "./new-grade-client";
import { getExamTypes } from "../../actions/grades";
import { getSubjects } from "../../actions/subjects";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Enter New Grade | Admin Dashboard | Al-Maysaroh",
  description: "Enter a new grade for a student",
};

export default async function NewGradePage() {
  const session = await auth();
  
  // Get user from database using session email
  let userId = "";
  let userName = "Admin";
  
  if (session?.user?.email) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true },
      });
      if (dbUser) {
        userId = dbUser.id;
        userName = dbUser.name || session.user.name || "Admin";
      }
    } catch (error) {
      console.error("Error fetching user from database:", error);
    }
  }

  let examTypes: string[] = [];
  let formattedSubjects: any[] = [];
  let formattedStudents: any[] = [];

  try {
    const [fetchedExamTypes, subjects, students] = await Promise.all([
      getExamTypes(),
      getSubjects({ page: 1, limit: 100 }),
      prisma.student.findMany({
        where: {
          enrollments: {
            some: {
              status: "ACTIVE",
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
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
    examTypes = [
      "MIDTERM",
      "FINAL",
      "QUIZ",
      "ASSIGNMENT",
      "RECITATION_TEST",
      "MEMORIZATION_TEST",
      "ORAL_EXAM",
      "WRITTEN_EXAM",
    ];
  }

  return (
    <NewGradeClient
      examTypes={examTypes}
      subjects={formattedSubjects}
      students={formattedStudents}
      userId={userId}
      userName={userName}
    />
  );
}
// app/(portal)/dashboard/admin/grades/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { EditGradeClient } from "./edit-grade-client";
import { getGradeById, getExamTypes } from "../../../actions/grades";
import { getSubjects } from "../../../actions/subjects";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Edit Grade | Admin Dashboard | Al-Maysaroh",
  description: "Edit grade details and assessment information",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGradePage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Log session for debugging
  console.log("Session:", JSON.stringify(session, null, 2));

  // Try different possible user ID locations
  let userId = "";
  if (session?.user?.id) {
    userId = session.user.id;
  } else if ((session?.user as any)?.sub) {
    userId = (session.user as any).sub;
  } else if ((session?.user as any)?.id) {
    userId = (session.user as any).id;
  } else if (session?.user?.email) {
    // Fallback: try to find user by email if ID not available
    const userByEmail = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (userByEmail) {
      userId = userByEmail.id;
    }
  }

  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";

  const [grade, examTypes, subjects, students] = await Promise.all([
    getGradeById(id),
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

  if (!grade) {
    notFound();
  }

  // Format the grade to match the expected Grade interface in EditGradeClient
  const formattedGrade = {
    ...grade,
    student: {
      name: grade.student.user.name,
      studentId: grade.student.studentId,
    },
    subject: {
      name: grade.subject.name,
      code: grade.subject.code,
    },
    // Ensure dates are handled correctly if needed, though Prisma usually returns Date objects
    assessmentDate: new Date(grade.assessmentDate),
    remarks: grade.remarks || null,
  };

  const formattedStudents = students.map((student) => ({
    id: student.id,
    name: student.user.name || "Unknown",
    email: student.user.email,
    studentId: student.studentId,
    image: student.user.image,
  }));

  const formattedSubjects = subjects.data.map((subject) => ({
    id: subject.id,
    name: subject.name,
    code: subject.code,
    category: subject.category,
    className: subject.class?.name || "Not Assigned",
  }));

  return (
    <EditGradeClient
      grade={formattedGrade}
      examTypes={examTypes}
      subjects={formattedSubjects}
      students={formattedStudents}
      userId={userId || ""}
      userName={userName}
    />
  );
}

// src/app/(dashboard)/admin/grades/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GradesManagementClient from "@/components/admin/grades-management-client";
import { auth } from "@/lib/auth";

export default async function GradesManagementPage({
  searchParams,
}: {
  // Fix: searchParams is a Promise in Next.js 15
  searchParams: Promise<{ page?: string; classId?: string }>;
}) {
  const session = await auth()

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Await params to comply with Next.js 15
  await searchParams;

  // Initialize data variables outside the try block
  let grades: any[] = [];
  let classes: any[] = [];
  let stats = { total: 0, average: 0, topStudents: [] as any[] };

  try {
    const [gradesData, classesData] = await Promise.all([
      prisma.grade.findMany({
        include: {
          student: {
            include: {
              user: true,
            },
          },
          subject: {
            include: {
              class: true,
              teacher: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: {
          assessmentDate: "desc",
        },
      }),
      prisma.class.findMany({
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
          subjects: true,
          enrollments: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        where: {
          isActive: true,
        },
      }),
    ]);

    grades = gradesData;
    classes = classesData;

    // Calculate grade statistics safely
    const totalGrades = grades.length;
    const averageScore =
      totalGrades > 0
        ? grades.reduce((sum, grade) => sum + Number(grade.percentage), 0) /
          totalGrades
        : 0;

    const topStudents = grades
      .reduce((acc: any[], grade) => {
        const existing = acc.find((item) => item.studentId === grade.studentId);
        if (existing) {
          existing.total += Number(grade.percentage);
          existing.count += 1;
        } else {
          acc.push({
            studentId: grade.studentId,
            student: grade.student,
            total: Number(grade.percentage),
            count: 1,
          });
        }
        return acc;
      }, [])
      .map((item) => ({
        ...item,
        average: item.total / item.count,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);

    stats = {
      total: totalGrades,
      average: Math.round(averageScore),
      topStudents: topStudents,
    };
  } catch (error) {
    console.error("Error loading grades data:", error);
    // Variables remain at their defaults if the fetch fails
  }

  // FIX: Return JSX outside of the try/catch block
  return (
    <GradesManagementClient
      initialGrades={JSON.parse(JSON.stringify(grades))}
      classes={JSON.parse(JSON.stringify(classes))}
      stats={JSON.parse(JSON.stringify(stats))}
    />
  );
}

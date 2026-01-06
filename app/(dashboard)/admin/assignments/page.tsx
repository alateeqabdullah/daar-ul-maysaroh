// src/app/(dashboard)/admin/assignments/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AssignmentsManagementClient from "@/components/admin/assignments-management-client";
import { auth } from "@/lib/auth";

export default async function AssignmentsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; classId?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Await params to comply with Next.js 15
  await searchParams;

  // Initialize variables for the render
  let assignments: any[] = [];
  let classes: any[] = [];
  let stats = { total: 0, upcoming: 0, overdue: 0, graded: 0 };

  // FIX: Capture "now" once to keep calculations pure during render
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  try {
    const [assignmentsData, classesData] = await Promise.all([
      prisma.assignment.findMany({
        include: {
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
          createdBy: true,
          submissions: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: {
          dueDate: "asc",
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
        },
        where: {
          isActive: true,
        },
      }),
    ]);

    assignments = assignmentsData;
    classes = classesData;

    // Calculate stats using the fixed "now" reference
    stats = {
      total: assignments.length,
      upcoming: assignments.filter((a) => {
        const dueDate = new Date(a.dueDate);
        return dueDate > now && dueDate < nextWeek;
      }).length,
      overdue: assignments.filter((a) => {
        const dueDate = new Date(a.dueDate);
        return dueDate < now && a.submissions.length === 0;
      }).length,
      graded: assignments.filter((a) =>
        a.submissions.some((s: any) => s.status === "GRADED")
      ).length,
    };
  } catch (error) {
    console.error("Error loading assignments data:", error);
    // Values remain at their defaults if the fetch fails
  }

  // FIX: Return JSX outside of the try/catch block
  return (
    <AssignmentsManagementClient
      initialAssignments={JSON.parse(JSON.stringify(assignments))}
      classes={JSON.parse(JSON.stringify(classes))}
      stats={stats}
    />
  );
}

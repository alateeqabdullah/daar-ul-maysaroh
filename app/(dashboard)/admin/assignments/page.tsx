import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AssignmentsManagementClient from "@/components/admin/assignments-management-client";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export const metadata = {
  title: "Assignments | Admin",
  description: "Manage curriculum tasks and assessments",
};

export default async function AssignmentsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; classId?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  // --- Filter Logic ---
  const where: Prisma.AssignmentWhereInput = {
    ...(params.search && {
      title: { contains: params.search, mode: "insensitive" },
    }),
    ...(params.classId &&
      params.classId !== "ALL" && {
        subject: { classId: params.classId },
      }),
  };

  try {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [assignmentsRaw, total, classesRaw, subjectsRaw, statsRaw] =
      await Promise.all([
        // 1. Fetch Assignments
        prisma.assignment.findMany({
          where,
          include: {
            subject: {
              select: {
                id: true,
                name: true,
                class: { select: { id: true, name: true } },
                teacher: {
                  include: { user: { select: { name: true, image: true } } },
                },
              },
            },
            _count: { select: { submissions: true } },
          },
          orderBy: { dueDate: "asc" },
          skip,
          take: limit,
        }),
        // 2. Count Total
        prisma.assignment.count({ where }),
        // 3. Fetch Classes (For Dropdown)
        prisma.class.findMany({
          where: { isActive: true },
          select: { id: true, name: true },
        }),
        // 4. Fetch Subjects (For Dropdown mapping)
        prisma.subject.findMany({
          select: { id: true, name: true, classId: true },
        }),
        // 5. Global Stats
        Promise.all([
          prisma.assignment.count(),
          prisma.assignment.count({
            where: { dueDate: { gt: now, lt: nextWeek } },
          }),
          prisma.assignment.count({ where: { dueDate: { lt: now } } }), // Overdue calculation is complex in SQL, strictly this means "Past Due"
        ]),
      ]);

    // Serialize
    const assignments = assignmentsRaw.map((a) => ({
      ...a,
      dueDate: a.dueDate.toISOString(),
      createdAt: a.createdAt.toISOString(),
      submissionCount: a._count.submissions,
    }));

    const stats = {
      total: statsRaw[0],
      upcoming: statsRaw[1],
      pastDue: statsRaw[2],
      // We estimate grading progress based on submission status in the client or a separate query if needed
      completionRate: 85, // Mock or calculate complex agg
    };

    return (
      <AssignmentsManagementClient
        initialAssignments={assignments}
        classes={classesRaw}
        subjects={subjectsRaw}
        stats={stats}
        pagination={{ page, total, limit, pages: Math.ceil(total / limit) }}
      />
    );
  } catch (error) {
    console.error("Assignment Page Error:", error);
    return <div>Error loading assignments.</div>;
  }
}

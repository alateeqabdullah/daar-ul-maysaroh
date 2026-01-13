import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherDashboardClient from "@/components/teacher/teacher-dashboard-client";

export const metadata = {
  title: "Teacher Workspace",
  description: "Manage your classroom",
};

export default async function TeacherDashboardPage() {
  const session = await auth();

  // 1. Auth Check
  if (!session?.user?.email) redirect("/login");
  if (session.user.role !== "TEACHER") redirect("/dashboard");

  // 2. Fetch User & Teacher Profile safely via Email
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      teacherProfile: {
        include: {
          classes: {
            where: { isActive: true },
            include: {
              subjects: true,
              _count: { select: { enrollments: true } },
            },
          },
        },
      },
    },
  });

  const teacher = dbUser?.teacherProfile;

  if (!dbUser || !teacher) {
    return (
      <div className="p-8 text-center">
        Teacher profile not found. Contact admin.
      </div>
    );
  }

  // 3. Fetch Dashboard Data
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6

  const [assignments, upcomingSessions, recentSubmissions] = await Promise.all([
    // Active Assignments
    prisma.assignment.findMany({
      where: { createdById: dbUser.id },
      include: {
        subject: { select: { name: true, class: { select: { name: true } } } },
        _count: { select: { submissions: true } },
      },
      orderBy: { dueDate: "asc" },
      take: 5,
    }),
    // Today's Schedule
    prisma.classSchedule.findMany({
      where: {
        class: { teacherId: teacher.id },
        dayOfWeek: dayOfWeek,
      },
      include: {
        class: { select: { id: true, name: true, code: true } },
      },
      orderBy: { startTime: "asc" },
    }),
    // Submissions needing grading
    prisma.assignmentSubmission.findMany({
      where: {
        assignment: { createdById: dbUser.id },
        status: "SUBMITTED",
      },
      include: {
        student: { include: { user: { select: { name: true, image: true } } } },
        assignment: { select: { title: true, totalMarks: true } },
      },
      take: 5,
      orderBy: { submittedAt: "desc" },
    }),
  ]);

  // 4. Serialize Data
  const dashboardData = {
    teacherId: teacher.id,
    // FIX: Use dbUser.name because teacher.user was not included in the query
    teacherName: dbUser.name || "Instructor",
    isAvailable: teacher.isAvailable,

    myClasses: teacher.classes.map((c) => ({
      id: c.id,
      name: c.name,
      subjects: c.subjects.map((s) => ({ id: s.id, name: s.name })),
    })),

    stats: {
      totalClasses: teacher.classes.length,
      totalStudents: teacher.classes.reduce(
        (acc, c) => acc + c._count.enrollments,
        0
      ),
      assignmentsCount: assignments.length,
      pendingGrades: recentSubmissions.length,
    },

    todaySchedule: upcomingSessions.map((s) => ({
      ...s,
      startTime: s.startTime,
      endTime: s.endTime,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })),

    assignments: assignments.map((a) => ({
      ...a,
      dueDate: a.dueDate.toISOString(),
      createdAt: a.createdAt.toISOString(),
    })),

    recentSubmissions: recentSubmissions.map((s) => ({
      ...s,
      submittedAt: s.submittedAt.toISOString(),
    })),
  };

  return <TeacherDashboardClient data={dashboardData} />;
}

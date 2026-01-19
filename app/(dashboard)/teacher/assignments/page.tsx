import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherAssignmentsClient from "@/components/teacher/teacher-assignments-client";

export const metadata = {
  title: "Assignments | Teacher",
  description: "Manage tasks, homework, and grading",
};

export default async function TeacherAssignmentsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher Profile
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: { include: { classes: { select: { id: true, name: true, subjects: true } } } } }
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");

  const teacherId = dbUser.teacherProfile.id;
  const classes = dbUser.teacherProfile.classes;

  // 2. Fetch Assignments
  const assignmentsRaw = await prisma.assignment.findMany({
    where: { createdById: dbUser.id },
    include: {
      subject: { select: { name: true, class: { select: { id: true, name: true, code: true } } } },
      _count: { select: { submissions: true } }
    },
    orderBy: { dueDate: "asc" }
  });

  // 3. Serialize
  const assignments = assignmentsRaw.map(a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    type: a.type,
    totalMarks: a.totalMarks,
    dueDate: a.dueDate.toISOString(),
    createdAt: a.createdAt.toISOString(),
    subjectName: a.subject.name,
    className: a.subject.class.name,
    classCode: a.subject.class.code,
    submissionCount: a._count.submissions,
    // Calculate status dynamically based on due date
    status: new Date(a.dueDate) < new Date() ? "OVERDUE" : "ACTIVE"
  }));

  // 4. Calculate Stats
  const stats = {
    total: assignments.length,
    active: assignments.filter(a => a.status === "ACTIVE").length,
    overdue: assignments.filter(a => a.status === "OVERDUE").length,
    submissions: assignments.reduce((acc, a) => acc + a.submissionCount, 0)
  };

  return (
    <TeacherAssignmentsClient 
      initialAssignments={assignments}
      classes={classes}
      stats={stats}
    />
  );
}
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherStudentsClient from "@/components/teacher/teacher-students-client";

export const metadata = {
  title: "My Students | Teacher",
  description: "Monitor student progress and performance",
};

export default async function TeacherStudentsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher Profile
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { teacherProfile: { select: { id: true } } },
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");

  // 2. Fetch Students enrolled in Teacher's Classes
  const studentsRaw = await prisma.student.findMany({
    where: {
      enrollments: {
        some: {
          class: { teacherId: dbUser.teacherProfile.id, isActive: true },
          status: "ACTIVE",
        },
      },
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true, phone: true },
      },
      currentClass: { select: { name: true, code: true } },
      parent: {
        include: { user: { select: { name: true, phone: true, email: true } } },
      },
      // Fetch recent attendance for stats
      attendance: {
        take: 20,
        orderBy: { date: "desc" },
        select: { status: true },
      },
      // Fetch Hifz Progress
      hifzLogs: {
        take: 1,
        orderBy: { date: "desc" },
        select: { surah: true, endAyah: true },
      },
    },
    orderBy: { user: { name: "asc" } },
  });

  // 3. Serialize & Calculate Stats
  const students = studentsRaw.map((s) => {
    // Attendance Rate Calculation
    const presentCount = s.attendance.filter(
      (a) => a.status === "PRESENT"
    ).length;
    const totalAttendance = s.attendance.length;
    const attendanceRate =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 100;

    // Status Determination (At Risk if attendance < 70%)
    let status = "Active";
    if (attendanceRate < 70) status = "At Risk";

    return {
      id: s.id,
      userId: s.user.id,
      name: s.user.name,
      email: s.user.email,
      phone: s.user.phone,
      image: s.user.image,
      className: s.currentClass?.name || "Unassigned",
      classCode: s.currentClass?.code,
      hifzLevel: s.hifzLevel || "Beginner",
      currentSurah: s.hifzLogs[0]?.surah || 1, // Default Fatihah
      attendanceRate,
      status,
      parent: s.parent
        ? {
            name: s.parent.user.name,
            phone: s.parent.user.phone,
            email: s.parent.user.email,
          }
        : null,
    };
  });

  // Calculate Dashboard Stats
  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "Active").length,
    atRisk: students.filter((s) => s.status === "At Risk").length,
    avgAttendance: Math.round(
      students.reduce((acc, s) => acc + s.attendanceRate, 0) /
        (students.length || 1)
    ),
  };

  return <TeacherStudentsClient initialStudents={students} stats={stats} />;
}

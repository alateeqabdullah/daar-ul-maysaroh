import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherAttendanceClient from "@/components/teacher/teacher-attendance-client";
import { startOfDay, endOfDay } from "date-fns";

export const metadata = {
  title: "Attendance | Teacher",
  description: "Mark daily class attendance",
};

export default async function TeacherAttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; classId?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const params = await searchParams;
  const dateStr = params.date || new Date().toISOString().split("T")[0];
  const targetDate = new Date(dateStr);

  // 1. Get Teacher Profile
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      teacherProfile: {
        include: {
          classes: {
            where: { isActive: true },
            select: { id: true, name: true, code: true },
          },
        },
      },
    },
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");
  const classes = dbUser.teacherProfile.classes;

  // 2. Determine Active Class
  const selectedClassId = params.classId || classes[0]?.id;

  let students: any[] = [];
  const attendanceMap: Record<string, unknown> = {};
  let scheduleId: string | null = null;
  let sessionDetails = null;

  if (selectedClassId) {
    // A. Find Schedule for this day (Is there a class today?)
    const dayOfWeek = targetDate.getDay();
    const schedule = await prisma.classSchedule.findFirst({
      where: { classId: selectedClassId, dayOfWeek },
    });
    scheduleId = schedule?.id || null;

    if (schedule) {
      sessionDetails = {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      };
    }

    // B. Fetch Enrolled Students
    const classData = await prisma.class.findUnique({
      where: { id: selectedClassId },
      include: {
        enrollments: {
          where: { status: "ACTIVE" },
          include: {
            student: {
              include: {
                user: { select: { id: true, name: true, image: true } },
              },
            },
          },
          orderBy: { student: { user: { name: "asc" } } },
        },
      },
    });

    if (classData) {
      students = classData.enrollments.map((e) => ({
        studentId: e.student.id,
        name: e.student.user.name,
        image: e.student.user.image,
        studentCode: e.student.studentId,
      }));
    }

    // C. Fetch Existing Records
    const records = await prisma.attendance.findMany({
      where: {
        classId: selectedClassId,
        date: { gte: startOfDay(targetDate), lte: endOfDay(targetDate) },
      },
    });

    records.forEach((r) => {
      attendanceMap[r.studentId] = {
        status: r.status,
        remarks: r.remarks || "",
      };
    });
  }

  return (
    <TeacherAttendanceClient
      classes={classes}
      students={students}
      initialAttendance={attendanceMap}
      selectedDate={dateStr}
      selectedClassId={selectedClassId}
      scheduleId={scheduleId}
      sessionDetails={sessionDetails}
    />
  );
}

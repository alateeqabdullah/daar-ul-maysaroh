import { AttendanceStatus, EnrollmentStatus } from "@/app/generated/prisma/enums";
import { auth } from "@/lib/auth"; // Your Auth.js v5 configuration
import { prisma } from "@/lib/prisma"; // Your Prisma 7 client instance
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  // 1. Authentication & Role Check
  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    // 2. Fetch Student Profile with essential relations
    const studentProfile = await prisma.student.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
      },
    });

    if (!studentProfile) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 },
      );
    }

    // 3. Parallel Data Fetching for Performance
    const [enrollments, allAvailableClasses, attendanceData] =
      await Promise.all([
        // Fetch Current Enrollments
        prisma.enrollment.findMany({
          where: { studentId: studentProfile.id },
          include: {
            class: {
              include: {
                teacher: {
                  include: { user: { select: { name: true, image: true } } },
                },
                schedules: true,
              },
            },
          },
          orderBy: { enrolledAt: "desc" },
        }),

        // Fetch Available Classes (Classes student is NOT enrolled in)
        prisma.class.findMany({
          where: {
            isActive: true,
            enrollments: { none: { studentId: studentProfile.id } },
            currentEnrollment: { lt: prisma.class.fields.capacity }, // Logic: not full
          },
          include: {
            teacher: { include: { user: { select: { name: true } } } },
          },
          take: 10,
        }),

        // Fetch Attendance for stats calculation
        prisma.attendance.groupBy({
          by: ["status"],
          where: { studentId: studentProfile.id },
          _count: true,
        }),
      ]);

    // 4. Calculate Stats
    const totalClasses = enrollments.length;
    const activeClasses = enrollments.filter(
      (e) => e.status === EnrollmentStatus.ACTIVE,
    ).length;
    const completedClasses = enrollments.filter(
      (e) => e.status === EnrollmentStatus.COMPLETED,
    ).length;

    const averageProgress =
      totalClasses > 0
        ? Math.round(
            enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0) /
              totalClasses,
          )
        : 0;

    const totalAttendanceRecords = attendanceData.reduce(
      (acc, curr) => acc + curr._count,
      0,
    );
    const presentRecords =
      attendanceData.find((a) => a.status === AttendanceStatus.PRESENT)
        ?._count || 0;
    const attendanceRate =
      totalAttendanceRecords > 0
        ? Math.round((presentRecords / totalAttendanceRecords) * 100)
        : 100;

    // 5. Transform Schedule for Timeline UI
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const schedule = enrollments
      .filter((e) => e.status === EnrollmentStatus.ACTIVE)
      .flatMap((e) =>
        e.class.schedules.map((s) => ({
          id: s.id,
          className: e.class.name,
          day: weekDays[s.dayOfWeek],
          time: `${s.startTime} - ${s.endTime}`,
          meetingUrl: s.meetingUrl,
          dayNumber: s.dayOfWeek, // for sorting
        })),
      )
      .sort((a, b) => a.dayNumber - b.dayNumber);

    // 6. Final Response Construction
    return NextResponse.json({
      student: {
        name: studentProfile.user.name,
        email: studentProfile.user.email,
        image: studentProfile.user.image,
        studentId: studentProfile.studentId,
      },
      enrollments: enrollments.map((e) => ({
        id: e.id,
        className: e.class.name,
        classCode: e.class.code,
        teacherName: e.class.teacher.user.name,
        teacherImage: e.class.teacher.user.image,
        status: e.status,
        progress: e.progress || 0,
        enrolledAt: e.enrolledAt,
        meetingUrl: e.class.schedules[0]?.meetingUrl || null,
      })),
      availableClasses: allAvailableClasses.map((c) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        teacher: c.teacher.user.name,
        capacity: c.capacity,
        enrolled: c.currentEnrollment,
      })),
      stats: {
        totalClasses,
        activeClasses,
        completedClasses,
        averageProgress,
        attendanceRate,
      },
      schedule,
    });
  } catch (error) {
    console.error("API_ERROR_STUDENT_CLASSES:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

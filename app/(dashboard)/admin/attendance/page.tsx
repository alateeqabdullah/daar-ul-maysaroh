// src/app/(dashboard)/admin/attendance/page.tsx
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AttendanceManagementClient from "@/components/admin/attendance-management-client";
import { auth } from "@/lib/auth";

export default async function AttendanceManagementPage({
  searchParams,
}: {
  // searchParams must be a Promise in Next.js 15
  searchParams: Promise<{ date?: string; class?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // 1. Await searchParams
  const params = await searchParams;
  const classId = params.class;
  const dateStr = params.date || new Date().toISOString().split("T")[0];

  // 2. Initialize variables for data
  let classes: any[] = [];
  let allStudents: any[] = [];
  let attendanceRecords: any[] = [];
  let attendanceMapObj: Record<string, any> = {};

  try {
    const date = new Date(dateStr);

    // Define date boundaries for the specific day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [classesData, attendanceData] = await Promise.all([
      prisma.class.findMany({
        where: { isActive: true },
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
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
      }),
      prisma.attendance.findMany({
        where: {
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
          ...(classId && { classId }),
        },
        include: {
          student: {
            include: {
              user: true,
            },
          },
          class: true,
          schedule: true,
        },
      }),
    ]);

    classes = classesData;
    attendanceRecords = attendanceData;

    // Logic to determine which students to show
    const selectedClass = classId
      ? classes.find((c) => c.id === classId)
      : null;

    allStudents = selectedClass
      ? selectedClass.enrollments.map((e: any) => e.student)
      : classes.flatMap((c: any) => c.enrollments.map((e: any) => e.student));

    // Create attendance map for quick lookup
    const tempMap = new Map();
    attendanceRecords.forEach((record) => {
      tempMap.set(record.studentId, record);
    });
    attendanceMapObj = Object.fromEntries(tempMap);
  } catch (error) {
    console.error("Error loading attendance:", error);
    // Data remains empty/defaults on catch
  }

  // 3. Return JSX outside of the try/catch block
  return (
    <AttendanceManagementClient
      classes={JSON.parse(JSON.stringify(classes))}
      students={JSON.parse(JSON.stringify(allStudents))}
      attendanceRecords={JSON.parse(JSON.stringify(attendanceRecords))}
      selectedDate={dateStr}
      selectedClass={classId || null}
      attendanceMap={attendanceMapObj}
    />
  );
}

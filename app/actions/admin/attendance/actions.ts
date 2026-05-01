// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { AttendanceStatus } from "@/app/generated/prisma/enums";

// // 1. Single Node Update
// export async function markAttendance(data: {
//   studentId: string;
//   classId: string;
//   scheduleId: string;
//   status: AttendanceStatus;
//   date: string;
// }) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const targetDate = new Date(data.date);
//   targetDate.setHours(0, 0, 0, 0);

//   try {
//     const record = await prisma.attendance.upsert({
//       where: {
//         studentId_scheduleId_date: {
//           studentId: data.studentId,
//           scheduleId: data.scheduleId,
//           date: targetDate,
//         },
//       },
//       update: {
//         status: data.status,
//         markedAt: new Date(),
//         markedBy: session.user.id,
//       },
//       create: {
//         studentId: data.studentId,
//         classId: data.classId,
//         scheduleId: data.scheduleId,
//         date: targetDate,
//         status: data.status,
//         markedAt: new Date(),
//         markedBy: session.user.id,
//         arrivalTime: data.status === "LATE" ? new Date() : null,
//       },
//     });
//     revalidatePath("/admin/attendance");
//     return { success: true, id: record.id };
//   } catch (error) {
//     console.error(error);
//     throw new Error("Handshake Failed");
//   }
// }

// // 2. Bulk Node Injection (The missing export)
// export async function bulkMarkAttendance(data: {
//   studentIds: string[];
//   classId: string;
//   scheduleId: string;
//   date: string;
//   status: AttendanceStatus;
// }) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const targetDate = new Date(data.date);
//   targetDate.setHours(0, 0, 0, 0);

//   try {
//     await prisma.$transaction(
//       data.studentIds.map((sId) =>
//         prisma.attendance.upsert({
//           where: {
//             studentId_scheduleId_date: {
//               studentId: sId,
//               scheduleId: data.scheduleId,
//               date: targetDate,
//             },
//           },
//           update: { status: data.status, markedAt: new Date() },
//           create: {
//             studentId: sId,
//             classId: data.classId,
//             scheduleId: data.scheduleId,
//             date: targetDate,
//             status: data.status,
//             markedBy: session.user.id,
//           },
//         }),
//       ),
//     );
//     revalidatePath("/admin/attendance");
//     return { success: true };
//   } catch (error) {
//     throw new Error("Bulk Handshake Failed");
//   }
// }

// // 3. Departure Logic
// export async function logDeparture(attendanceId: string) {
//   await prisma.attendance.update({
//     where: { id: attendanceId },
//     data: { departureTime: new Date() },
//   });
//   revalidatePath("/admin/attendance");
//   return { success: true };
// }

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AttendanceStatus } from "@/app/generated/prisma/enums";

// 1. Single Node Update
export async function markAttendance(data: {
  studentId: string;
  classId: string;
  scheduleId: string;
  status: AttendanceStatus;
  date: string;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const targetDate = new Date(data.date);
  targetDate.setHours(0, 0, 0, 0);

  try {
    const record = await prisma.attendance.upsert({
      where: {
        studentId_scheduleId_date: {
          studentId: data.studentId,
          scheduleId: data.scheduleId,
          date: targetDate,
        },
      },
      update: {
        status: data.status,
        markedAt: new Date(),
        markedBy: session.user.id,
      },
      create: {
        studentId: data.studentId,
        classId: data.classId,
        scheduleId: data.scheduleId,
        date: targetDate,
        status: data.status,
        markedAt: new Date(),
        markedBy: session.user.id,
        arrivalTime: data.status === "LATE" ? new Date() : null,
      },
    });
    revalidatePath("/admin/attendance");
    return { success: true, id: record.id };
  } catch (error) {
    throw new Error("Handshake Failed");
  }
}

// 2. Bulk Node Update
export async function bulkMarkAttendance(data: {
  studentIds: string[];
  classId: string;
  scheduleId: string;
  date: string;
  status: AttendanceStatus;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const targetDate = new Date(data.date);
  targetDate.setHours(0, 0, 0, 0);

  try {
    await prisma.$transaction(
      data.studentIds.map((sId) =>
        prisma.attendance.upsert({
          where: {
            studentId_scheduleId_date: {
              studentId: sId,
              scheduleId: data.scheduleId,
              date: targetDate,
            },
          },
          update: { status: data.status, markedAt: new Date() },
          create: {
            studentId: sId,
            classId: data.classId,
            scheduleId: data.scheduleId,
            date: targetDate,
            status: data.status,
            markedBy: session.user.id,
          },
        }),
      ),
    );
    revalidatePath("/admin/attendance");
    return { success: true };
  } catch (error) {
    throw new Error("Bulk Handshake Failed");
  }
}

// 3. Departure Logic
export async function logDeparture(attendanceId: string) {
  await prisma.attendance.update({
    where: { id: attendanceId },
    data: { departureTime: new Date() },
  });
  revalidatePath("/admin/attendance");
  return { success: true };
}

/**
 * 4. THE SAFETY PROTOCOL (Flag Unexplained Absence)
 * This is for the "Safety Pulse" on the dashboard.
 * Flags a student as absent and triggers an internal alert/notification.
 */
export async function flagUnexplainedAbsence(
  studentId: string,
  scheduleId: string,
  date: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return await prisma.$transaction(async (tx) => {
    // 1. Mark as Absent if no record exists
    const record = await tx.attendance.upsert({
      where: {
        studentId_scheduleId_date: { studentId, scheduleId, date: targetDate },
      },
      update: { status: "ABSENT", markedBy: session.user.id },
      create: {
        studentId,
        scheduleId,
        classId:
          (await tx.classSchedule.findUnique({ where: { id: scheduleId } }))
            ?.classId || "",
        date: targetDate,
        status: "ABSENT",
        markedBy: session.user.id,
      },
    });

    // 2. Log a System Notification (for the Dashboard Alert)
    await tx.notification.create({
      data: {
        userId:
          (
            await tx.student.findUnique({
              where: { id: studentId },
              select: { userId: true },
            })
          )?.userId || "",
        title: "Unexplained Absence Detected",
        message: `Student was marked absent on ${targetDate.toLocaleDateString()}. Parental contact advised.`,
        type: "ATTENDANCE",
        priority: "URGENT",
      },
    });

    revalidatePath("/admin/attendance");
    return { success: true };
  });
}

/**
 * 5. THE EXCUSAL PROTOCOL (Medical/Leave)
 * Updates a record with remarks and an "EXCUSED" status.
 */
export async function excuseAttendance(attendanceId: string, remarks: string) {
  await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      status: "EXCUSED",
      remarks: remarks,
      markedAt: new Date(),
    },
  });
  revalidatePath("/admin/attendance");
}

/**
 * 6. PRECISE CHECK-IN (Arrival Node)
 * Records the exact timestamp of arrival for late students.
 */
export async function logArrivalTime(attendanceId: string) {
  const now = new Date();
  await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      arrivalTime: now,
      status: "LATE",
    },
  });
  revalidatePath("/admin/attendance");
}

/**
 * 7. SESSION SYNCHRONIZATION
 * Links the attendance record to a specific ScheduledSession instance (from your Subscription model).
 */
export async function syncWithSession(attendanceId: string, sessionId: string) {
  await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      scheduledSessions: {
        connect: { id: sessionId },
      },
    },
  });
  revalidatePath("/admin/attendance");
}

/**
 * 8. ATTENDANCE ANALYTICS (Identity Deep-Dive)
 * Fetches the "Pulse" for a specific student's attendance history.
 */
export async function getStudentAttendanceAnalytics(studentId: string) {
  const records = await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: "desc" },
    take: 30,
  });

  const total = records.length;
  const present = records.filter((r) => r.status === "PRESENT").length;
  const late = records.filter((r) => r.status === "LATE").length;

  return {
    rate: total > 0 ? Math.round((present / total) * 100) : 0,
    lateCount: late,
    history: records,
  };
}

/**
 * 9. RESET DAILY LOGS (Cleanup)
 * Removes all attendance records for a class on a specific date (for corrections).
 */
export async function resetDailyAttendance(classId: string, date: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin clearance required.");

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  await prisma.attendance.deleteMany({
    where: {
      classId: classId,
      date: targetDate,
    },
  });

  revalidatePath("/admin/attendance");
}
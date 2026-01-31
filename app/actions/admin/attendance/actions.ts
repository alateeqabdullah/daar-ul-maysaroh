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

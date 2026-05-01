// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";

// // 1. BROADCAST ENGINE
// export async function quickBroadcast(title: string, content: string) {
//   const session = await auth();
//   if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
//     throw new Error("Unauthorized");

//   await prisma.announcement.create({
//     data: {
//       title,
//       content,
//       type: "GENERAL",
//       priority: "NORMAL",
//       targetAudience: ["ALL"],
//       createdById: session.user.id,
//       isPublished: true,
//       publishAt: new Date(),
//     },
//   });
//   revalidatePath("/dashboard/admin");
//   return { success: true };
// }

// // 2. IDENTITY HANDSHAKE (APPROVE/REJECT)
// export async function processUserAction(
//   userId: string,
//   action: "APPROVE" | "REJECT",
// ) {
//   const session = await auth();
//   if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
//     throw new Error("Unauthorized");

//   await prisma.user.update({
//     where: { id: userId },
//     data: {
//       status: action === "APPROVE" ? "APPROVED" : "REJECTED",
//       approvedAt: action === "APPROVE" ? new Date() : null,
//       approvedById: session.user.id,
//     },
//   });
//   revalidatePath("/dashboard/admin");
//   return { success: true };
// }

// // 3. DEBT RECOVERY (NUDGE ALL OVERDUE)
// export async function nudgeAllOverdueParents() {
//   const overdueInvoices = await prisma.invoice.findMany({
//     where: { status: "PENDING", dueDate: { lt: new Date() } },
//     include: { parent: { include: { user: true } } },
//   });

//   const notifications = overdueInvoices.map((inv) =>
//     prisma.notification.create({
//       data: {
//         userId: inv.parent.userId,
//         title: "Overdue Fee Alert",
//         message: `Your balance of $${inv.amount} for ${inv.month} is overdue. Please sync payment.`,
//         type: "PAYMENT",
//         priority: "URGENT",
//       },
//     }),
//   );

//   await Promise.all(notifications);
//   revalidatePath("/dashboard/admin");
//   return { success: true, count: overdueInvoices.length };
// }

// // 4. ATTENDANCE RESET (CORRECTION PROTOCOL)
// export async function resetTodayAttendance() {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   await prisma.attendance.deleteMany({
//     where: { date: { gte: today } },
//   });

//   revalidatePath("/dashboard/admin");
//   return { success: true };
// }

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// 1. BROADCAST TRANSMISSION
export async function quickBroadcast(title: string, content: string) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  await prisma.announcement.create({
    data: {
      title,
      content,
      type: "GENERAL",
      priority: "NORMAL",
      targetAudience: ["ALL"],
      createdById: session.user.id,
      isPublished: true,
      publishAt: new Date(),
    },
  });
  revalidatePath("/dashboard/admin");
  return { success: true };
}

// 2. IDENTITY HANDSHAKE
export async function processUserAction(
  userId: string,
  action: "APPROVE" | "REJECT",
) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: userId },
    data: {
      status: action === "APPROVE" ? "APPROVED" : "REJECTED",
      approvedAt: action === "APPROVE" ? new Date() : null,
      approvedById: session.user.id,
    },
  });
  revalidatePath("/dashboard/admin");
  return { success: true };
}

// 3. STAFF LOAD BALANCING
export async function toggleStaffAvailability(
  teacherId: string,
  available: boolean,
) {
  await prisma.teacher.update({
    where: { id: teacherId },
    data: { isAvailable: available },
  });
  revalidatePath("/dashboard/admin");
}
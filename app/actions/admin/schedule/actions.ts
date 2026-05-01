"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function manageSchedule(formData: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  const { id, ...data } = formData;

  // 1. Conflict Check: Teacher Double-Booking
  const targetClass = await prisma.class.findUnique({
    where: { id: data.classId },
  });

  const overlap = await prisma.classSchedule.findFirst({
    where: {
      dayOfWeek: parseInt(data.dayOfWeek),
      class: { teacherId: targetClass?.teacherId },
      NOT: id ? { id } : undefined,
      AND: [
        { startTime: { lt: data.endTime } },
        { endTime: { gt: data.startTime } },
      ],
    },
    include: { class: true },
  });

  if (overlap) {
    throw new Error(
      `Teacher Conflict: Already teaching "${overlap.class.name}" during this time.`,
    );
  }

  // 2. Database Operation
  const payload = {
    classId: data.classId,
    dayOfWeek: parseInt(data.dayOfWeek),
    startTime: data.startTime,
    endTime: data.endTime,
    timezone: data.timezone || "UTC",
    isLive: data.isLive,
    meetingPlatform: data.meetingPlatform,
    meetingUrl: data.meetingUrl || null,
    meetingId: data.meetingId || null,
    meetingPassword: data.meetingPassword || null,
    isRecurring: data.isRecurring,
    recurrenceRule: data.recurrenceRule || null,
  };

  const result = id
    ? await prisma.classSchedule.update({
        where: { id },
        data: payload,
        include: {
          class: { include: { teacher: { include: { user: true } } } },
        },
      })
    : await prisma.classSchedule.create({
        data: payload,
        include: {
          class: { include: { teacher: { include: { user: true } } } },
        },
      });

  revalidatePath("/admin/schedule");
  return { success: true, schedule: JSON.parse(JSON.stringify(result)) };
}

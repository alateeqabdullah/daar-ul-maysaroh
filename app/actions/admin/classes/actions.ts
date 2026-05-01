"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * MAPPING & CREATION
 */
export async function manageClassNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized Access");
  }

  const payload = {
    name: String(data.name),
    code: String(data.code).toUpperCase(),
    level: String(data.level),
    capacity: parseInt(data.capacity) || 20,
    academicYear: String(data.academicYear),
    teacherId: String(data.teacherId),
    isActive: data.isActive === "true" || data.isActive === true,
  };

  try {
    if (data.id) {
      await prisma.class.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.class.create({
        data: { ...payload, createdById: session.user.id },
      });
    }
    revalidatePath("/admin/classes");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002")
      throw new Error("Registry Conflict: Code exists.");
    throw new Error("Handshake Failed");
  }
}

/**
 * ENROLLMENT ENGINE
 */
export async function toggleEnrollment(
  classId: string,
  studentId: string,
  action: "ENROLL" | "UNENROLL",
) {
  if (action === "ENROLL") {
    // Check capacity first
    const classNode = await prisma.class.findUnique({
      where: { id: classId },
      include: { _count: { select: { enrollments: true } } },
    });
    if (classNode && classNode._count.enrollments >= classNode.capacity) {
      throw new Error("Node at Maximum Capacity");
    }
    await prisma.enrollment.create({ data: { classId, studentId } });
  } else {
    await prisma.enrollment.deleteMany({ where: { classId, studentId } });
  }
  revalidatePath("/admin/classes");
  return { success: true };
}

/**
 * COHORT MIGRATION (ELITE FEATURE)
 */
export async function promoteClassCohort(
  sourceClassId: string,
  targetClassId: string,
) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin Clearance Required");

  const enrollments = await prisma.enrollment.findMany({
    where: { classId: sourceClassId, status: "ACTIVE" },
  });

  if (enrollments.length === 0)
    throw new Error("No active nodes found in source class");

  await prisma.$transaction(
    enrollments.map((e) =>
      prisma.enrollment.create({
        data: {
          studentId: e.studentId,
          classId: targetClassId,
          status: "ACTIVE",
        },
      }),
    ),
  );

  revalidatePath("/admin/classes");
  return { success: true, count: enrollments.length };
}

/**
 * COMMUNICATION
 */
export async function broadcastToClass(
  classId: string,
  title: string,
  content: string,
) {
  const session = await auth();
  await prisma.announcement.create({
    data: {
      title,
      content,
      specificClassId: classId,
      createdById: session?.user.id as string,
      targetAudience: ["SPECIFIC_CLASS"],
    },
  });
  return { success: true };
}

/**
 * DESTRUCTION
 */
export async function toggleClassStatus(id: string, isActive: boolean) {
  await prisma.class.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/classes");
}

export async function decommissionClass(id: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin Access Required");
  await prisma.class.delete({ where: { id } });
  revalidatePath("/admin/classes");
}

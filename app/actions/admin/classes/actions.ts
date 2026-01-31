"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function manageClass(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized Access");
  }

  // STRICT TYPE CASTING (Prevents Database Handshake Errors)
  const payload = {
    name: String(data.name),
    code: String(data.code).toUpperCase(),
    level: String(data.level),
    capacity: parseInt(data.capacity) || 20,
    teacherId: String(data.teacherId),
    academicYear: String(data.academicYear || "2025/2026"),
    isActive: data.isActive === "true" || data.isActive === true,
    createdById: session.user.id,
  };

  try {
    if (data.id) {
      await prisma.class.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await prisma.class.create({ data: payload });
    }
    revalidatePath("/admin/classes");
    return { success: true };
  } catch (error: any) {
    console.error("Class Action Error:", error);
    if (error.code === "P2002") throw new Error("Class Code already exists.");
    throw new Error("Database Handshake Failed");
  }
}

export async function unenrollStudent(enrollmentId: string) {
  await prisma.enrollment.delete({ where: { id: enrollmentId } });
  revalidatePath("/admin/classes");
  return { success: true };
}

export async function toggleClassStatus(id: string, currentStatus: boolean) {
  await prisma.class.update({
    where: { id },
    data: { isActive: !currentStatus },
  });
  revalidatePath("/admin/classes");
}

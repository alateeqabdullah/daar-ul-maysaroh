"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function manageClassNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  // ATOMIC DATA CONVERSION
  const payload = {
    name: String(data.name),
    code: String(data.code).toUpperCase(),
    level: String(data.level),
    capacity: parseInt(data.capacity) || 20,
    academicYear: String(data.academicYear),
    teacherId: String(data.teacherId),
    isActive: data.isActive === "true" || data.isActive === true,
    createdById: session.user.id,
  };

  try {
    if (data.id) {
      await prisma.class.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.class.create({ data: payload });
    }
    revalidatePath("/admin/classes");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002")
      throw new Error("Registry Conflict: Code already exists.");
    throw new Error("Handshake Failed");
  }
}

export async function enrollStudentNode(classId: string, studentId: string) {
  await prisma.enrollment.create({
    data: { classId, studentId, status: "ACTIVE" },
  });
  revalidatePath("/admin/classes");
  return { success: true };
}

export async function decommissionClass(id: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin clearance required");
  await prisma.class.delete({ where: { id } });
  revalidatePath("/admin/classes");
  return { success: true };
}

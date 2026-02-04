"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { MaritalStatus } from "@/app/generated/prisma/enums";

/**
 * 1. MANAGE PARENT NODE (UPSERT)
 */
export async function manageParentNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) throw new Error("Unauthorized");

  const email = String(data.email).toLowerCase().trim();

  return await prisma.$transaction(async (tx) => {
    // A. Upsert User
    const user = await tx.user.upsert({
      where: { email },
      update: { name: data.name, phone: data.phone },
      create: {
        name: data.name,
        email,
        phone: data.phone,
        role: "PARENT",
        status: "APPROVED",
        password: await bcrypt.hash("Guardian2026!", 10),
      }
    });

    // B. Upsert Parent Profile
    const parent = await tx.parent.upsert({
      where: { userId: user.id },
      update: {
        occupation: data.occupation,
        employer: data.employer,
        address: data.address,
        maritalStatus: data.maritalStatus as MaritalStatus,
        spouseName: data.spouseName,
        spousePhone: data.spousePhone,
        emergencyContact: data.emergencyContact,
        relationship: data.relationship,
      },
      create: {
        userId: user.id,
        occupation: data.occupation,
        employer: data.employer,
        address: data.address,
        maritalStatus: data.maritalStatus as MaritalStatus,
        spouseName: data.spouseName,
        spousePhone: data.spousePhone,
        emergencyContact: data.emergencyContact,
        relationship: data.relationship,
      }
    });

    revalidatePath("/admin/parents");
    return { success: true, id: parent.id };
  });
}

/**
 * 2. LINK STUDENT TO GUARDIAN
 */
export async function linkStudentToParent(studentId: string, parentId: string) {
  await prisma.student.update({
    where: { id: studentId },
    data: { parentId }
  });
  revalidatePath("/admin/parents");
}

/**
 * 3. BROADCAST TO FAMILY NODE
 */
export async function familyBroadcast(parentId: string, title: string, message: string) {
  const parent = await prisma.parent.findUnique({ where: { id: parentId } });
  if (!parent) throw new Error("Parent node absent");

  await prisma.notification.create({
    data: {
      userId: parent.userId,
      title: `[Family Alert] ${title}`,
      message,
      type: "ANNOUNCEMENT",
      priority: "HIGH"
    }
  });
}

/**
 * 4. GET FAMILY FINANCIAL SUMMARY (For PDF Statement)
 */
export async function getFamilyStatement(parentId: string) {
  return await prisma.invoice.findMany({
    where: { parentId },
    include: { payments: true },
    orderBy: { createdAt: 'desc' }
  });
}

/**
 * 5. UPDATE MARITAL LOGIC
 */
export async function updateMaritalStatus(parentId: string, status: MaritalStatus) {
  await prisma.parent.update({ where: { id: parentId }, data: { maritalStatus: status } });
  revalidatePath("/admin/parents");
}

/**
 * 6. UPDATE EMERGENCY PROTOCOL
 */
export async function updateEmergencyNode(parentId: string, contact: string) {
  await prisma.parent.update({ where: { id: parentId }, data: { emergencyContact: contact } });
}

/**
 * 7. DECOMMISSION GUARDIAN NODE
 */
export async function decommissionParent(parentId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") throw new Error("Super Admin Clearance Required");
  
  const parent = await prisma.parent.findUnique({ where: { id: parentId } });
  if (parent) {
    await prisma.user.delete({ where: { id: parent.userId } });
  }
  revalidatePath("/admin/parents");
}

/**
 * 8. TOGGLE SECURITY ACCESS
 */
export async function toggleParentAccess(userId: string, active: boolean) {
  await prisma.user.update({ where: { id: userId }, data: { isActive: active } });
}

/**
 * 9. RECORD FAMILY SIZE
 */
export async function updateFamilySize(parentId: string, size: number) {
  await prisma.parent.update({ where: { id: parentId }, data: { familySize: size } });
}

/**
 * 10. REFRESH IDENTITY SNAPSHOT
 */
export async function refreshParentIdentity(parentId: string) {
  revalidatePath(`/admin/parents`);
}
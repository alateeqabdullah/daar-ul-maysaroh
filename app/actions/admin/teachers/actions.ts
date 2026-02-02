"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { ContractType } from "@/app/generated/prisma/enums";

/**
 * 1. DEPLOY/UPDATE TEACHER NODE
 * Handles the creation of a User + Teacher Profile in one transaction.
 */
export async function manageTeacherNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized Access: Administrative clearance required.");
  }

  const teacherId = String(data.teacherId).toUpperCase();
  const email = String(data.email).toLowerCase();

  // Process expertise from comma-separated string to array
  const expertiseArray = data.expertise
    ? data.expertise
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  try {
    return await prisma.$transaction(async (tx) => {
      // Step A: Upsert the User account first
      const user = await tx.user.upsert({
        where: { email },
        update: {
          name: data.name,
          role: "TEACHER",
          status: "APPROVED",
        },
        create: {
          name: data.name,
          email,
          role: "TEACHER",
          status: "APPROVED",
          password: await bcrypt.hash("AlMaysaroh2026!", 10), // Default temp password
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`,
        },
      });

      // Step B: Upsert the Teacher Profile linked to that User
      const teacherProfile = await tx.teacher.upsert({
        where: { userId: user.id },
        update: {
          teacherId,
          qualification: data.qualification,
          specialization: data.specialization,
          experienceYears: parseInt(data.experienceYears) || 0,
          contractType: data.contractType as ContractType,
          salary: parseFloat(data.salary) || 0,
          isAvailable: data.isAvailable === "true" || data.isAvailable === true,
          expertise: expertiseArray,
          bio: data.bio,
        },
        create: {
          userId: user.id,
          teacherId,
          qualification: data.qualification,
          specialization: data.specialization,
          experienceYears: parseInt(data.experienceYears) || 0,
          contractType: data.contractType as ContractType,
          salary: parseFloat(data.salary) || 0,
          isAvailable: true,
          expertise: expertiseArray,
          bio: data.bio,
          joiningDate: new Date(),
        },
      });

      revalidatePath("/admin/teachers");
      return { success: true, teacherId: teacherProfile.id };
    });
  } catch (error: any) {
    console.error("Teacher Action Error:", error);
    if (error.code === "P2002")
      throw new Error("ID Conflict: Teacher ID or Email already registered.");
    throw new Error("Handshake Failed: Unable to synchronize faculty node.");
  }
}

/**
 * 2. TOGGLE FIELD AVAILABILITY
 * Quickly toggle if a teacher can be assigned to new classes.
 */
export async function toggleTeacherAvailability(
  id: string,
  isAvailable: boolean,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.teacher.update({
    where: { id },
    data: { isAvailable },
  });

  revalidatePath("/admin/teachers");
  return { success: true };
}

/**
 * 3. GENERATE PAYROLL NODE
 * Creates a financial record for the teacher for the current month.
 */
export async function generateTeacherPayroll(
  teacherId: string,
  amount: number,
) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized");
  }

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Check if payroll already exists for this month to prevent double payment
  const existing = await prisma.payroll.findFirst({
    where: { teacherId, month: currentMonth },
  });

  if (existing)
    throw new Error(
      `Payroll for ${currentMonth} already exists for this node.`,
    );

  await prisma.payroll.create({
    data: {
      teacherId,
      amount,
      month: currentMonth,
      status: "PENDING", // Becomes COMPLETED once bursar confirms
    },
  });

  revalidatePath("/admin/teachers");
  return { success: true };
}

/**
 * 4. DECOMMISSION FACULTY NODE
 * Super Admin only: Removes teacher and user account.
 */
export async function decommissionTeacherNode(teacherId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    throw new Error(
      "Critical Access Denied: Super Admin clearance required for decommissioning.",
    );
  }

  // Find the user ID associated with this teacher first
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    select: { userId: true },
  });

  if (!teacher) throw new Error("Node not found.");

  // Delete the User (Cascade will handle teacher profile if configured,
  // but we delete user to be thorough)
  await prisma.user.delete({
    where: { id: teacher.userId },
  });

  revalidatePath("/admin/teachers");
  return { success: true };
}

/**
 * 5. GET TEACHER ANALYTICS (Internal)
 * Fetches stats for a specific teacher for the Identity Drawer.
 */
export async function getTeacherDeepStats(teacherId: string) {
  const stats = await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: {
      _count: {
        select: {
          classes: true,
          courses: true,
          hifzLogsReviewed: true,
        },
      },
      payrolls: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return stats;
}

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { ContractType } from "@/app/generated/prisma/enums";

/**
 * 1. MANAGE TEACHER NODE (UPSERT)
 * The primary engine for creating or updating a Faculty Member.
 * Handles the User account and the Teacher Profile in one transaction.
 */
export async function manageTeacherNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized: Administrative clearance required.");
  }

  // Data Sanitization
  const email = String(data.email).toLowerCase().trim();
  const name = String(data.name).trim();
  const teacherId = String(data.teacherId).toUpperCase().trim();
  const salary = isNaN(parseFloat(data.salary)) ? 0 : parseFloat(data.salary);
  const expYears = isNaN(parseInt(data.experienceYears))
    ? 0
    : parseInt(data.experienceYears);
  const maxStudents = isNaN(parseInt(data.maxStudents))
    ? 20
    : parseInt(data.maxStudents);

  const expertiseArray =
    typeof data.expertise === "string"
      ? data.expertise
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  try {
    return await prisma.$transaction(async (tx) => {
      // Create/Update User account
      const user = await tx.user.upsert({
        where: { email },
        update: { name, role: "TEACHER", status: "APPROVED" },
        create: {
          name,
          email,
          role: "TEACHER",
          status: "APPROVED",
          password: await bcrypt.hash("AlMaysaroh2026!", 10),
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        },
      });

      // Create/Update Teacher Profile
      const teacherProfile = await tx.teacher.upsert({
        where: { userId: user.id },
        update: {
          teacherId,
          qualification: data.qualification || null,
          specialization: data.specialization || null,
          experienceYears: expYears,
          bio: data.bio || null,
          expertise: expertiseArray,
          contractType: data.contractType as ContractType,
          salary,
          maxStudents,
          teachingStyle: data.teachingStyle || null,
          isAvailable: data.isAvailable === "true" || data.isAvailable === true,
        },
        create: {
          userId: user.id,
          teacherId,
          qualification: data.qualification || null,
          specialization: data.specialization || null,
          experienceYears: expYears,
          bio: data.bio || null,
          expertise: expertiseArray,
          joiningDate: new Date(),
          contractType: (data.contractType as ContractType) || "FULL_TIME",
          salary,
          maxStudents,
          teachingStyle: data.teachingStyle || null,
          isAvailable: true,
        },
      });

      revalidatePath("/admin/teachers");
      return { success: true, id: teacherProfile.id };
    });
  } catch (error: any) {
    console.error("Teacher Management Error:", error);
    if (error.code === "P2002")
      throw new Error("ID Conflict: Email or Teacher ID already exists.");
    throw new Error(`Handshake Failed: ${error.message}`);
  }
}

/**
 * 2. TOGGLE AVAILABILITY
 * Quickly toggle a teacher's status for new assignments.
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
}

/**
 * 3. GENERATE MONTHLY PAYROLL
 * Creates a pending payment record for the teacher.
 */
export async function generateTeacherPayroll(
  teacherId: string,
  amount: number,
) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  const month = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Prevent duplicate payroll for the same month
  const existing = await prisma.payroll.findFirst({
    where: { teacherId, month },
  });

  if (existing) throw new Error(`Payroll for ${month} already initialized.`);

  await prisma.payroll.create({
    data: {
      teacherId,
      amount,
      month,
      status: "PENDING",
    },
  });

  revalidatePath("/admin/teachers");
  return { success: true };
}

/**
 * 4. PROCESS PAYROLL PAYMENT
 * Mark a payroll node as COMPLETED (Paid).
 */
export async function processPayrollPayment(payrollId: string) {
  await prisma.payroll.update({
    where: { id: payrollId },
    data: {
      status: "COMPLETED",
      paidAt: new Date(),
    },
  });
  revalidatePath("/admin/teachers");
}

/**
 * 5. DECOMMISSION TEACHER NODE
 * Permanently removes the teacher and their associated user account.
 */
export async function decommissionTeacherNode(teacherId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin clearance required.");

  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    select: { userId: true },
  });

  if (teacher) {
    await prisma.user.delete({ where: { id: teacher.userId } });
  }

  revalidatePath("/admin/teachers");
  return { success: true };
}

/**
 * 6. ASSIGN TEACHER TO CLASS
 * Directly links a teacher node to an academic class.
 */
export async function assignTeacherToClass(teacherId: string, classId: string) {
  await prisma.class.update({
    where: { id: classId },
    data: { teacherId },
  });
  revalidatePath("/admin/teachers");
}

/**
 * 7. GET DEEP ANALYTICS
 * Fetches teaching load and history for the Identity Drawer.
 */
export async function getTeacherAnalytics(teacherId: string) {
  return await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: {
      classes: {
        select: {
          name: true,
          code: true,
          level: true,
          currentEnrollment: true,
        },
      },
      payrolls: {
        take: 12,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { classes: true, courses: true, hifzLogsReviewed: true },
      },
    },
  });
}

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { Gender, UserStatus } from "@/app/generated/prisma/enums";

/**
 * 1. INJECT STUDENT NODE (UPSERT)
 * Creates User + Student profile in one transaction.
 */
export async function manageStudentNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Administrative clearance required.");
  }

  const email = String(data.email).toLowerCase().trim();
  const name = String(data.name).trim();
  const studentId = String(data.studentId).toUpperCase().trim();

  try {
    return await prisma.$transaction(async (tx) => {
      // Create/Update Core User
      const user = await tx.user.upsert({
        where: { email },
        update: { name, role: "STUDENT" },
        create: {
          name,
          email,
          role: "STUDENT",
          status: "APPROVED",
          password: await bcrypt.hash("AlMaysaroh2026!", 10),
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        },
      });

      // Create/Update Student Profile
      const profile = await tx.student.upsert({
        where: { userId: user.id },
        update: {
          studentId,
          gender: data.gender as Gender,
          nationality: data.nationality || null,
          currentLevel: data.currentLevel || null,
          academicYear: data.academicYear || "2025-2026",
          hifzLevel: data.hifzLevel || null,
          tajweedLevel: data.tajweedLevel || null,
        },
        create: {
          userId: user.id,
          studentId,
          gender: data.gender as Gender,
          nationality: data.nationality || null,
          currentLevel: data.currentLevel || null,
          academicYear: data.academicYear || "2025-2026",
          hifzLevel: data.hifzLevel || null,
          tajweedLevel: data.tajweedLevel || null,
        },
      });

      revalidatePath("/admin/students");
      return { success: true, id: profile.id };
    });
  } catch (error: any) {
    console.error("Student Action Error:", error);
    if (error.code === "P2002")
      throw new Error("ID Conflict: Student ID or Email already exists.");
    throw new Error(`Handshake Failed: ${error.message}`);
  }
}

/**
 * 2. UPDATE STUDENT STATUS
 */
export async function updateStudentStatus(userId: string, status: UserStatus) {
  await prisma.user.update({
    where: { id: userId },
    data: { status },
  });
  revalidatePath("/admin/students");
}

/**
 * 3. LINK GUARDIAN (PARENT)
 */
export async function linkGuardian(studentId: string, parentEmail: string) {
  const parent = await prisma.user.findUnique({
    where: { email: parentEmail.toLowerCase().trim() },
    include: { parentProfile: true },
  });

  if (!parent?.parentProfile)
    throw new Error("No Guardian node found with this email.");

  await prisma.student.update({
    where: { id: studentId },
    data: { parentId: parent.parentProfile.id },
  });

  revalidatePath("/admin/students");
}

/**
 * 4. DECOMMISSION STUDENT (DELETE)
 */
export async function decommissionStudent(studentId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin clearance required.");

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { userId: true },
  });

  if (student) {
    await prisma.user.delete({ where: { id: student.userId } });
  }

  revalidatePath("/admin/students");
  return { success: true };
}



/**
 * 1. BULK CLASS ENROLLMENT
 * Enroll multiple student nodes into a class node at once.
 */
export async function bulkEnrollStudents(studentIds: string[], classId: string) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) throw new Error("Unauthorized");

  await prisma.enrollment.createMany({
    data: studentIds.map(id => ({
      studentId: id,
      classId: classId,
      enrollmentType: "REGULAR",
      status: "ACTIVE"
    })),
    skipDuplicates: true
  });

  revalidatePath("/admin/students");
  return { success: true };
}

/**
 * 2. PROMOTE STUDENT LEVEL
 * Shift a student node to a higher academic level.
 */
export async function promoteStudent(studentId: string, newLevel: string) {
  await prisma.student.update({
    where: { id: studentId },
    data: { currentLevel: newLevel }
  });
  revalidatePath("/admin/students");
}

/**
 * 3. GET DEEP ANALYTICS (For the Identity Drawer)
 * Fetches attendance and financial health in one handshake.
 */
export async function getStudentContext(studentId: string) {
  const [attendance, invoices, progress] = await Promise.all([
    prisma.attendance.groupBy({
      by: ['status'],
      where: { studentId },
      _count: true
    }),
    prisma.invoice.findMany({
      where: { parent: { students: { some: { id: studentId } } } },
      orderBy: { dueDate: 'desc' }
    }),
    prisma.quranProgress.count({
      where: { studentId, status: "MASTERED" }
    })
  ]);

  return { attendance, invoices, masteredSurahs: progress };
}
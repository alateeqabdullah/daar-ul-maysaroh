"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { UserStatus } from "@/app/generated/prisma/enums";

export async function updateUserStatus(userId: string, status: UserStatus) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: userId },
    data: {
      status,
      approvedAt: status === "APPROVED" ? new Date() : undefined,
      approvedById: status === "APPROVED" ? session.user.id : undefined,
    },
  });
  revalidatePath("/admin/users");
}

export async function createUserNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  const hashedPassword = await bcrypt.hash("AlMaysaroh2026!", 10);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        password: hashedPassword,
        status: "APPROVED",
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`,
      },
    });

    if (data.role === "STUDENT") {
      await tx.student.create({
        data: {
          userId: user.id,
          studentId: data.specificId,
          gender: data.gender,
          academicYear: data.academicYear || "2025/2026",
          nationality: data.nationality,
        },
      });
    }

    if (data.role === "TEACHER") {
      await tx.teacher.create({
        data: {
          userId: user.id,
          teacherId: data.specificId,
          joiningDate: new Date(),
        },
      });
    }

    revalidatePath("/admin/users");
    return { success: true };
  });
}

export async function linkParentToStudent(
  studentId: string,
  parentEmail: string,
) {
  const parent = await prisma.user.findUnique({
    where: { email: parentEmail },
    include: { parentProfile: true },
  });

  if (!parent?.parentProfile)
    throw new Error("Parent profile not found with that email.");

  await prisma.student.update({
    where: { id: studentId },
    data: { parentId: parent.parentProfile.id },
  });

  revalidatePath("/admin/users");
}

export async function deleteUserNode(userId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin access required");

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}

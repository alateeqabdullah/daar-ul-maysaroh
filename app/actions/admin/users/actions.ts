"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { UserRole, UserStatus } from "@prisma/client";

export async function updateUserStatus(userId: string, status: UserStatus) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: userId },
    data: { status, approvedAt: status === "APPROVED" ? new Date() : undefined }
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") throw new Error("Only Super Admins can delete nodes.");

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}
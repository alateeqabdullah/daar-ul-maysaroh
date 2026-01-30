"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function approveUserAction(userId: string) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
      approvedById: session.user.id,
    },
  });

  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function broadcastAnnouncement(content: string) {
  // Logic for creating a global announcement from your schema
  const session = await auth();
  await prisma.announcement.create({
    data: {
      title: "Global Administrative Update",
      content,
      createdById: session?.user.id as string,
      targetAudience: ["ALL"],
    },
  });
  revalidatePath("/admin/dashboard");
}

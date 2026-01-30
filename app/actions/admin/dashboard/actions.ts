"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function quickBroadcast(title: string, content: string) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      throw new Error("Unauthorized");
    }

    await prisma.announcement.create({
      data: {
        title,
        content,
        type: "GENERAL", // Matches AnnouncementType enum
        priority: "NORMAL", // Matches PriorityLevel enum
        targetAudience: ["ALL"], // Matches AudienceType enum
        createdById: session.user.id,
        isPublished: true,
        publishAt: new Date(),
      },
    });

    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Broadcast Error:", error);
    return { error: error.message };
  }
}

export async function processUserAction(
  userId: string,
  action: "APPROVE" | "REJECT",
) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: userId },
    data: {
      status: action === "APPROVE" ? "APPROVED" : "REJECTED",
      approvedAt: action === "APPROVE" ? new Date() : null,
      approvedById: session.user.id,
    },
  });

  revalidatePath("/dashboard/admin");
  return { success: true };
}

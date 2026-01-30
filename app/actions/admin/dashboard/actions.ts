"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AnnouncementType, AudienceType, PriorityLevel } from "@/app/generated/prisma/enums";

export async function quickBroadcast(title: string, content: string) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      throw new Error("Unauthorized");
    }

    // FIX: Prisma requires targetAudience and type based on your schema
    await prisma.announcement.create({
      data: {
        title,
        content,
        type: "GENERAL" as AnnouncementType,
        priority: "NORMAL" as PriorityLevel,
        targetAudience: ["ALL"] as AudienceType[], // Fixed Enum Array
        createdById: session.user.id,
        isPublished: true,
        publishAt: new Date(),
      },
    });

    revalidatePath("/(portal)/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Broadcast Error:", error);
    return { error: error.message || "Failed to transmit broadcast" };
  }
}

export async function processUserAction(
  userId: string,
  action: "APPROVE" | "REJECT",
) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      throw new Error("Unauthorized");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        status: action === "APPROVE" ? "APPROVED" : "REJECTED",
        approvedAt: action === "APPROVE" ? new Date() : null,
        approvedById: session.user.id,
      },
    });

    revalidatePath("/(portal)/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

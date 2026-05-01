"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function processApproval(
  userId: string,
  action: "APPROVE" | "REJECT",
  reason?: string,
) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized Access");
  }

  try {
    const status = action === "APPROVE" ? "APPROVED" : "REJECTED";

    await prisma.user.update({
      where: { id: userId },
      data: {
        status,
        approvedAt: action === "APPROVE" ? new Date() : null,
        approvedById: action === "APPROVE" ? session.user.id : null,
        rejectionReason: action === "REJECT" ? reason : null,
      },
    });

    revalidatePath("/admin/approvals");
    return { success: true };
  } catch (error: any) {
    return { error: "Database Handshake Failed" };
  }
}

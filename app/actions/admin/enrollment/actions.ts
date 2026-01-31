"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function bulkEnroll(data: {
  classId: string;
  studentIds: string[];
  type: any;
}) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.$transaction(
      data.studentIds.map((sId) =>
        prisma.enrollment.create({
          data: {
            studentId: sId,
            classId: data.classId,
            enrollmentType: data.type || "REGULAR",
            status: "ACTIVE",
          },
        }),
      ),
    );

    // Update current enrollment count in the class model
    await prisma.class.update({
      where: { id: data.classId },
      data: { currentEnrollment: { increment: data.studentIds.length } },
    });

    revalidatePath("/admin/enrollment");
    revalidatePath("/admin/classes");
    return { success: true, count: result.length };
  } catch (error: any) {
    if (error.code === "P2002")
      throw new Error("One or more students are already in this class.");
    throw new Error("Database Handshake Failed");
  }
}

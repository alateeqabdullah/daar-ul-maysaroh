"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { EnrollmentStatus, EnrollmentType } from "@/app/generated/prisma/enums";

export async function bulkEnrollNodes(data: {
  classId: string;
  studentIds: string[];
  type: EnrollmentType;
  status: EnrollmentStatus;
}) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Handshake Refused: Unauthorized Access");
  }

  if (!data.classId || data.studentIds.length === 0) {
    throw new Error("Logic Error: Missing Parameters");
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the enrollment links
      const enrollments = await Promise.all(
        data.studentIds.map((sId) =>
          tx.enrollment.create({
            data: {
              studentId: sId,
              classId: data.classId,
              enrollmentType: data.type,
              status: data.status,
            },
          }),
        ),
      );

      // 2. Sync the Classroom Counter (Field in your schema)
      await tx.class.update({
        where: { id: data.classId },
        data: { currentEnrollment: { increment: data.studentIds.length } },
      });

      return enrollments;
    });

    revalidatePath("/admin/classes");
    revalidatePath("/admin/enrollment");
    return { success: true, count: result.length };
  } catch (error: any) {
    console.error("Enrollment Error:", error);
    throw new Error(
      "Node Collision: Students may already be in this registry.",
    );
  }
}

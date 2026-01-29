// app/api/admin/users/approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserRole, UserStatus } from "@/app/generated/prisma/enums";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // 1. Strict Role Check
    if (
      !session?.user?.id ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role as UserRole)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, action } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: "Missing userId or action" },
        { status: 400 }
      );
    }

    // 2. State Validation
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, status: true, email: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status !== UserStatus.PENDING) {
      return NextResponse.json(
        { error: "User is already processed" },
        { status: 400 }
      );
    }

    // 3. Perform Update via Transaction
    // Transactions ensure that if notification creation fails later, the user isn't left in a partial state.
    const result = await prisma.$transaction(async (tx) => {
      const isApproving = action === "APPROVE";

      const updated = await tx.user.update({
        where: { id: userId },
        data: {
          status: isApproving ? UserStatus.APPROVED : UserStatus.REJECTED,
          approvedAt: isApproving ? new Date() : null,
          // Assuming your schema has this field to track the admin
          // approvedById: session.user.id
        },
      });

      // Example of an internal notification record
      await tx.notification.create({
        data: {
          userId: userId,
          title: isApproving ? "Account Approved" : "Application Status",
          message: isApproving
            ? "Welcome! Your account has been approved. You can now access all features."
            : "We regret to inform you that your application was not approved at this time.",
          type: "SYSTEM",
        },
      });

      return updated;
    });

    // 4. Async Post-Processing (Emails)
    // Don't 'await' the email if you want the UI to respond instantly,
    // or use a queueing service like BullMQ/Resend.
    if (action === "APPROVE") {
      // sendWelcomeEmail(user.email);
    }

    return NextResponse.json({
      success: true,
      message: `User ${action.toLowerCase()}ed successfully`,
      data: {
        id: result.id,
        status: result.status,
      },
    });
  } catch (error) {
    console.error("[APPROVE_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

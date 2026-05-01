// src/app/api/admin/users/bulk-actions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userIds, action, reason } = body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { message: "No users selected" },
        { status: 400 }
      );
    }

    if (!["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Process bulk action
    const updateData = {
      status: action === "APPROVE" ? "APPROVED" : "REJECTED",
      approvedAt: action === "APPROVE" ? new Date() : null,
      approvedById: session.user.id,
      rejectionReason: action === "REJECT" ? reason : null,
      isActive: action === "APPROVE",
    };

    const result = await prisma.user.updateMany({
      where: {
        id: { in: userIds },
        status: "PENDING", // Only update pending users
      },
      data: updateData,
    });

    // TODO: Send email notifications for each user
    console.log(`Bulk ${action === "APPROVE" ? "approval" : "rejection"}:`, {
      count: result.count,
      admin: session.user.email,
      reason,
    });

    return NextResponse.json({
      message: `${result.count} users ${
        action === "APPROVE" ? "approved" : "rejected"
      }`,
      count: result.count,
    });
  } catch (error: any) {
    console.error("Error processing bulk action:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

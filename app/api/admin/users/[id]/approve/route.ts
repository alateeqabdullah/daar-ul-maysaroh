// src/app/api/admin/users/[id]/approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } } // Keep the standard signature for compatibility
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ⭐ CRITICAL FIX: Robustly extract the ID from the URL pathname
    // This bypasses potential Turbopack/params object bugs by manually parsing the URL.
    const pathname = request.nextUrl.pathname;
    const pathSegments = pathname.split("/");

    // The ID should be the second-to-last segment: /api/admin/users/[ID]/approve
    // If the path is longer than expected, default to the standard params.id
    let userId = params.id;
    if (pathSegments.length >= 2) {
      // Find the segment that is the actual ID (e.g., the segment *before* 'approve')
      const idIndex = pathSegments.indexOf("approve") - 1;
      if (idIndex > 0) {
        userId = pathSegments[idIndex];
      }
    }

    // Fallback/Validation Check
    if (!userId) {
      console.error(
        "Critical: Failed to extract User ID from URL path or params:",
        { pathname, params }
      );
      return NextResponse.json(
        { message: "User ID not provided (Critical Router Error)" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action, reason } = body;

    if (!["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Check for rejection reason
    if (action === "REJECT" && !reason) {
      return NextResponse.json(
        { message: "Rejection reason is required for rejection/suspension" },
        { status: 400 }
      );
    }

    // Rest of the logic remains the same (since the logic itself is correct)

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Allow actions on PENDING or APPROVED users
    if (user.status !== "PENDING" && user.status !== "APPROVED") {
      return NextResponse.json(
        { message: `Action not allowed for user status: ${user.status}` },
        { status: 400 }
      );
    }

    // Determine the status and isActive flags based on action
    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";
    const newIsActive = action === "APPROVE";

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: newStatus,
        approvedAt: action === "APPROVE" ? new Date() : user.approvedAt,
        approvedById: session.user.id,
        rejectionReason: action === "REJECT" ? reason : null,
        isActive: newIsActive,
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });

    // Determine the success message based on action and context
    let message;
    if (action === "APPROVE") {
      message = "User approved successfully";
    } else if (user.status === "APPROVED" && action === "REJECT") {
      message = "User suspended successfully";
    } else {
      message = "User rejected successfully";
    }

    // TODO: Send email notification to user
    console.log(`User status updated:`, {
      userId,
      email: user.email,
      action: action,
      oldStatus: user.status,
      newStatus: newStatus,
      reason,
      admin: session.user.email,
    });

    // If teacher is approved, ensure profile and availability exist
    if (action === "APPROVE" && user.role === "TEACHER") {
      if (!user.teacherProfile) {
        await prisma.teacherProfile.create({
          data: { userId: user.id, bio: "Welcome to MadrasahPro!" },
        });
      }

      const defaultAvailability = await prisma.teacherAvailability.findFirst({
        where: { teacherId: user.id, dayOfWeek: "MONDAY", startTime: "08:00" },
      });

      if (!defaultAvailability) {
        await prisma.teacherAvailability.create({
          data: {
            teacherId: user.id,
            dayOfWeek: "MONDAY",
            startTime: "08:00",
            endTime: "14:00",
            isAvailable: true,
          },
        });
      }
    }

    return NextResponse.json({
      message: message,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error processing approval:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

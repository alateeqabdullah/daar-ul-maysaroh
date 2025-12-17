// src/app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// =========================================================
// 1. EXISTING GET HANDLER (For fetching user details)
// =========================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            parent: {
              include: {
                user: true,
              },
            },
          },
        },
        teacherProfile: true,
        parentProfile: {
          include: {
            students: {
              include: {
                user: true,
              },
            },
          },
        },
        approvedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


// =========================================================
// 2. NEW POST HANDLER (For Approve/Reject/Suspend actions)
// =========================================================
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } } 
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const userId = params.id; 
    
    // Fallback/Validation Check
    if (!userId) {
        console.error("Missing ID: params object was", params); 
        return NextResponse.json({ message: "User ID not provided (Route Error)" }, { status: 400 });
    }

    const body = await request.json();
    const { action, reason } = body; // action: "APPROVE" or "REJECT"

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

    // Allow actions on PENDING, APPROVED, and REJECTED users.
    if (user.status !== "PENDING" && user.status !== "APPROVED" && user.status !== "REJECTED") {
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
        approvedAt: action === "APPROVE" ? (user.approvedAt || new Date()) : user.approvedAt,
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
        if (user.status === "REJECTED") {
             message = "User re-approved successfully";
        } else {
             message = "User approved successfully";
        }
    } else if (user.status === "APPROVED" && action === "REJECT") {
        message = "User suspended successfully";
    } else {
        message = "User rejected successfully";
    }

    // Console logging (for audit/debugging)
    console.log(`User status updated:`, {
      userId, email: user.email, action: action, oldStatus: user.status,
    });


    // If teacher is approved, ensure profile and availability exist
    if (action === "APPROVE" && user.role === "TEACHER") {
      if (!user.teacherProfile) {
        await prisma.teacherProfile.create({
          data: { userId: user.id, bio: "Welcome to MadrasahPro!", },
        });
      }

      const defaultAvailability = await prisma.teacherAvailability.findFirst({
         where: { teacherId: user.id, dayOfWeek: "MONDAY", startTime: "08:00" }
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
    console.error("Error processing user action:", error); 
    
    if (error.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
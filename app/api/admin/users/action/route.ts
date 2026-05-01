import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Import from your NextAuth config

export async function POST(req: Request) {
  try {
    // 1. AUTH CHECK
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. ROLE CHECK
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }, // Need ID to log who approved it
    });

    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 3. PROCESS REQUEST
    const body = await req.json();
    const { userId, action } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: newStatus,
        approvedAt: action === "APPROVE" ? new Date() : null,
        approvedById: action === "APPROVE" ? currentUser.id : null,
        rejectionReason: action === "REJECT" ? "Admin declined request" : null, // Optional: Add generic reason or pass from frontend
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("User Action Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

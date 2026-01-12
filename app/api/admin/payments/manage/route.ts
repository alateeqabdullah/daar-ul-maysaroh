import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, paymentId, status } = body;

    // --- 1. UPDATE STATUS ---
    if (action === "UPDATE_STATUS") {
      const updated = await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status,
          paidAt: status === "COMPLETED" ? new Date() : undefined,
        },
      });
      return NextResponse.json({ success: true, payment: updated });
    }

    // --- 2. DELETE ---
    if (action === "DELETE") {
      await prisma.payment.delete({ where: { id: paymentId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

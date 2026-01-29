// src/app/api/admin/approve-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { userId, action } = await req.json(); // action: "APPROVE" or "REJECT"

    if (action === "APPROVE") {
      await prisma.user.update({
        where: { id: userId },
        data: { status: "APPROVED" },
      });
    } else {
      // Either delete or mark as rejected based on your business logic
      await prisma.user.update({
        where: { id: userId },
        data: { status: "REJECTED" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

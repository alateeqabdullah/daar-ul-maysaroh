// src/app/api/admin/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      studentId,
      parentId,
      amount,
      status,
      paymentMethod,
      reference,
      description,
      dueDate,
      billingCycle,
    } = body;

    // 1. Validation
    if (!studentId || !amount) {
      return NextResponse.json(
        { error: "Student ID and Amount are required" },
        { status: 400 }
      );
    }

    // 2. Create Payment
    const payment = await prisma.payment.create({
      data: {
        amount,
        status: status || "PENDING",
        paymentMethod,
        reference,
        description,
        billingCycle,
        dueDate: dueDate ? new Date(dueDate) : null,
        paidAt: status === "COMPLETED" ? new Date() : null,
        // Connect relations
        student: { connect: { id: studentId } },
        ...(parentId && { parent: { connect: { id: parentId } } }),
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
        parent: { include: { user: { select: { name: true } } } },
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error: any) {
    console.error("[PAYMENTS_POST_ERROR]:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Reference code already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const studentId = searchParams.get("studentId");

    const payments = await prisma.payment.findMany({
      where: {
        ...(status && status !== "ALL" ? { status: status as any } : {}),
        ...(studentId ? { studentId } : {}),
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
        parent: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

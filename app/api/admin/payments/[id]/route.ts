// src/app/api/admin/payments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * PATCH: Update an existing payment record
 * Mapping frontend fields to schema.prisma fields:
 * - method -> paymentMethod
 * - reference -> gatewayReference
 * - billingCycle -> period
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // 1. Authorization Check
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const {
      status,
      method, // Map to paymentMethod
      reference, // Map to gatewayReference
      paidAt,
      billingCycle, // Map to period
      description,
      amount,
    } = body;

    // 2. Check if payment exists
    const existingPayment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!existingPayment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    // 3. Update using ONLY valid schema properties
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        status,
        amount: amount ? Number(amount) : undefined,
        paymentMethod: method, // schema field: paymentMethod
        gatewayReference: reference, // schema field: gatewayReference
        period: billingCycle, // schema field: period
        description,
        // Set paidAt if status is COMPLETED and it wasn't set [cite: 140]
        paidAt:
          status === "COMPLETED" && !existingPayment.paidAt
            ? new Date()
            : paidAt,
      },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    return NextResponse.json(updatedPayment);
  } catch (error: any) {
    console.error("[PAYMENT_PATCH_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove a payment record
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const payment = await prisma.payment.findUnique({ where: { id } });

    if (
      payment?.status === "COMPLETED" &&
      session.user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        { error: "Only Super Admins can delete completed records." },
        { status: 403 }
      );
    }

    await prisma.payment.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Payment record deleted successfully",
    });
  } catch (error) {
    console.error("[PAYMENT_DELETE_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

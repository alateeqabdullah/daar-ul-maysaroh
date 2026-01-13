// src/app/api/admin/finance/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
  DonationType,
  ExpenseCategory,
} from "@/app/generated/prisma/enums";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, paymentId, status } = body;

    // =========================================================
    // ACTION: CREATE_INVOICE
    // =========================================================
    if (action === "CREATE_INVOICE") {
      if (!data.parentId || !data.amount || !data.dueDate) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const dateStr = new Date().toISOString().slice(0, 7).replace("-", "");
      const count = await prisma.invoice.count();
      const invoiceNumber = `INV-${dateStr}-${(count + 1)
        .toString()
        .padStart(3, "0")}`;

      const newInvoice = await prisma.invoice.create({
        data: {
          amount: parseFloat(data.amount),
          dueDate: new Date(data.dueDate),
          month: new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          status: "PENDING",
          parent: { connect: { id: data.parentId } },
        },
      });

      const newPayment = await prisma.payment.create({
        data: {
          amount: parseFloat(data.amount),
          dueDate: new Date(data.dueDate),
          status: "PENDING",
          invoiceNumber: invoiceNumber,
          description: data.description || "Tuition Fee",
          paymentMethod: "CASH" as PaymentMethod,
          paymentGateway: "MANUAL" as PaymentGateway, // Required field
          currency: "USD", // Required field [cite: 55]
          parent: { connect: { id: data.parentId } },
          invoice: { connect: { id: newInvoice.id } },
        },
        include: {
          parent: {
            include: {
              user: { select: { name: true, image: true, email: true } },
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        payment: {
          ...newPayment,
          userName: newPayment.parent?.user.name || "Unknown",
          userImage: newPayment.parent?.user.image || null,
          userEmail: newPayment.parent?.user.email || "",
          userRole: "Parent",
        },
      });
    }

    // =========================================================
    // ACTION: CREATE_EXPENSE
    // =========================================================
    if (action === "CREATE_EXPENSE") {
      const expense = await prisma.expense.create({
        data: {
          title: data.title,
          amount: parseFloat(data.amount),
          category: data.category as ExpenseCategory,
          // FIX: In your schema, recordedBy is a String, not a relation
          recordedBy: session.user.id,
          notes: data.notes || "",
        },
      });
      return NextResponse.json({ success: true, expense });
    }

    // =========================================================
    // ACTION: CREATE_DONATION
    // =========================================================
    if (action === "CREATE_DONATION") {
      const donation = await prisma.donation.create({
        data: {
          donorName: data.donorName,
          amount: parseFloat(data.amount),
          type: (data.type as DonationType) || "SADAQAH", // Required enum
          notes: data.notes,
        },
      });
      return NextResponse.json({ success: true, donation });
    }

    // =========================================================
    // ACTION: RUN_PAYROLL
    // =========================================================
    if (action === "RUN_PAYROLL") {
      const payroll = await prisma.payroll.create({
        data: {
          teacher: { connect: { id: data.teacherId } },
          amount: parseFloat(data.amount),
          month: new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          status: "COMPLETED",
          paidAt: new Date(),
        },
        include: { teacher: { include: { user: true } } },
      });
      return NextResponse.json({ success: true, payroll });
    }

    if (action === "DELETE") {
      await prisma.payment.delete({ where: { id: paymentId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Finance API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

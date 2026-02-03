"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { PaymentMethod, PaymentStatus } from "@/app/generated/prisma/enums";

/**
 * 1. BULK GENERATE MONTHLY INVOICES
 * Scans all active subscriptions and generates invoices for the specified month.
 */
export async function generateMonthlyInvoices(month: string) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  const activeSubscriptions = await prisma.subscription.findMany({
    where: { status: "ACTIVE" },
    include: { student: { include: { parent: true } } },
  });

  const creations = activeSubscriptions
    .filter((sub) => sub.student.parentId) // Only for students with linked parents
    .map((sub) => ({
      parentId: sub.student.parentId!,
      amount: Number(sub.finalPrice),
      dueDate: new Date(new Date().setDate(28)), // End of month
      status: "PENDING" as PaymentStatus,
      month: month,
    }));

  await prisma.invoice.createMany({ data: creations });
  revalidatePath("/admin/finance");
  return { success: true, count: creations.length };
}

/**
 * 2. RECORD MANUAL PAYMENT (CASH/BANK)
 * For parents paying in person. Links to an invoice and updates status.
 */
export async function recordManualPayment(data: any) {
  const { invoiceId, amount, method, description } = data;

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { parent: true },
  });

  if (!invoice) throw new Error("Invoice Node not found.");

  return await prisma.$transaction(async (tx) => {
    // A. Create the Payment record
    await tx.payment.create({
      data: {
        parentId: invoice.parentId,
        amount: parseFloat(amount),
        currency: "USD",
        description: description || `Manual payment for ${invoice.month}`,
        paymentMethod: method as PaymentMethod,
        paymentGateway: "MANUAL",
        status: "COMPLETED",
        paidAt: new Date(),
        invoiceId: invoice.id,
      },
    });

    // B. Mark Invoice as Completed
    await tx.invoice.update({
      where: { id: invoiceId },
      data: { status: "COMPLETED" },
    });

    revalidatePath("/admin/finance");
    return { success: true };
  });
}

/**
 * 3. NUDGE OVERDUE PARENT
 * Sends a high-priority notification to parents with pending invoices.
 */
export async function nudgeInvoice(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { parent: { include: { user: true } } },
  });

  if (!invoice) throw new Error("Node absent.");

  await prisma.notification.create({
    data: {
      userId: invoice.parent.userId,
      title: "Action Required: Outstanding Dues",
      message: `Your invoice for ${invoice.month} ($${invoice.amount}) is pending. Please synchronize payment.`,
      type: "PAYMENT",
      priority: "URGENT",
    },
  });

  return { success: true };
}

/**
 * 4. VOID INVOICE
 */
export async function voidInvoiceNode(id: string) {
  await prisma.invoice.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/admin/finance");
}

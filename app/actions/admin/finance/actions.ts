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



/**
 * 1. MANUAL INVOICE INJECTION (FIXED)
 * Creates a custom invoice not tied to a subscription (e.g., Book Fees, Uniforms)
 */
export async function createManualInvoice(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) throw new Error("Unauthorized");

  const invoice = await prisma.invoice.create({
    data: {
      parentId: data.parentId,
      amount: parseFloat(data.amount),
      month: data.month,
      dueDate: new Date(data.dueDate),
      status: "PENDING",
    }
  });

  revalidatePath("/admin/finance");
  return { success: true, id: invoice.id };
}

/**
 * 2. APPLY INSTITUTIONAL DISCOUNT
 */
export async function applyDiscount(invoiceId: string, discountAmount: number) {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error("Node not found");

  const newAmount = Math.max(0, Number(invoice.amount) - discountAmount);

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { amount: newAmount }
  });

  revalidatePath("/admin/finance");
  return { success: true };
}

/**
 * 3. EXECUTE REFUND PROTOCOL
 */
export async function processRefund(paymentId: string, reason: string) {
  const payment = await prisma.payment.findUnique({ 
    where: { id: paymentId },
    include: { invoice: true }
  });

  if (!payment) throw new Error("Payment node absent");

  return await prisma.$transaction(async (tx) => {
    // A. Update Payment to REFUNDED
    await tx.payment.update({
      where: { id: paymentId },
      data: { 
        status: "REFUNDED",
        refundReason: reason,
        refundedAt: new Date(),
        refundedAmount: payment.amount 
      }
    });

    // B. Re-open the Invoice
    if (payment.invoiceId) {
      await tx.invoice.update({
        where: { id: payment.invoiceId },
        data: { status: "PENDING" }
      });
    }

    revalidatePath("/admin/finance");
    return { success: true };
  });
}

/**
 * 4. BULK OVERDUE RECOVERY (NUDGE ALL)
 */
export async function bulkNudgeOverdue() {
  const overdueInvoices = await prisma.invoice.findMany({
    where: { 
      status: "PENDING",
      dueDate: { lt: new Date() }
    },
    include: { parent: { include: { user: true } } }
  });

  const nudges = overdueInvoices.map(inv => 
    prisma.notification.create({
      data: {
        userId: inv.parent.userId,
        title: "CRITICAL: Outstanding Fees",
        message: `System Alert: Your balance of $${inv.amount} for ${inv.month} is overdue.`,
        type: "PAYMENT",
        priority: "URGENT"
      }
    })
  );

  await Promise.all(nudges);
  return { success: true, count: nudges.length };
}


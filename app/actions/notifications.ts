"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/** 1. FETCH LIVE NOTIFICATIONS */
export async function getMyNotifications() {
  const session = await auth();
  if (!session?.user?.email) return [];

  return await prisma.notification.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

/** 2. MARK AS READ */
export async function markAsRead(id: string) {
  await prisma.notification.update({
    where: { id },
    data: { isRead: true, readAt: new Date() },
  });
  revalidatePath("/");
}

/** 3. BULK HANDSHAKE (READ ALL) */
export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user?.email) return;

  await prisma.notification.updateMany({
    where: { user: { email: session.user.email }, isRead: false },
    data: { isRead: true, readAt: new Date() },
  });
  revalidatePath("/");
}

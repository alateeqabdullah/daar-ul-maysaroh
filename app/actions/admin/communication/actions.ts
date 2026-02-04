"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AnnouncementType, AudienceType, PriorityLevel } from "@/app/generated/prisma/enums";


// --- MIDDLEWARE ---
async function ensureAdmin() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");
  return session;
}

/** 1. DEPLOY ANNOUNCEMENT */
export async function manageAnnouncement(data: any) {
  const session = await ensureAdmin();
  const payload = {
    title: data.title,
    content: data.content,
    type: data.type as AnnouncementType,
    priority: data.priority as PriorityLevel,
    targetAudience: data.targetAudience as AudienceType[],
    isPublished: data.isPublished === "true",
    publishAt: new Date(),
    createdById: session.user.id,
  };

  if (data.id) {
    await prisma.announcement.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.announcement.create({ data: payload });
  }
  revalidatePath("/admin/communication");
  return { success: true };
}

/** 2. INITIALIZE PRIVATE MESSAGE (1-on-1) */
export async function sendPrivateMessage(
  receiverId: string,
  content: string,
  parentId?: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const msg = await prisma.message.create({
    data: {
      senderId: session.user.id,
      receiverId,
      content,
      parentMessageId: parentId,
      messageType: "TEXT",
    },
  });

  revalidatePath("/admin/communication");
  return { success: true, message: JSON.parse(JSON.stringify(msg)) };
}

/** 3. BROADCAST TARGETED NUDGE (NOTIFICATION) */
export async function sendTargetedNotification(
  userId: string,
  title: string,
  message: string,
) {
  await ensureAdmin();
  await prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type: "SYSTEM",
      priority: "HIGH",
    },
  });
}

/** 4. MARK MESSAGE AS READ */
export async function markMessageRead(messageId: string) {
  await prisma.message.update({
    where: { id: messageId },
    data: { isRead: true, readAt: new Date() },
  });
}

/** 5. DECOMMISSION ANNOUNCEMENT */
export async function deleteAnnouncement(id: string) {
  await ensureAdmin();
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/admin/communication");
}

/** 6. TOGGLE PUBLISH STATUS */
export async function toggleAnnouncementLive(id: string, isPublished: boolean) {
  await ensureAdmin();
  await prisma.announcement.update({ where: { id }, data: { isPublished } });
  revalidatePath("/admin/communication");
}

/** 7. PURGE SYSTEM NOTIFICATIONS */
export async function purgeNotificationNodes() {
  await ensureAdmin();
  await prisma.notification.deleteMany({ where: { isRead: true } });
  revalidatePath("/admin/communication");
}

/** 8. UPDATE MESSAGE THREAD (REPLY) */
export async function replyToThread(parentId: string, content: string) {
  const session = await auth();
  const original = await prisma.message.findUnique({ where: { id: parentId } });
  if (!original) throw new Error("Thread not found");

  return await sendPrivateMessage(original.senderId, content, parentId);
}

/** 9. ARCHIVE MESSAGE NODE */
export async function deleteMessageNode(id: string) {
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/communication");
}

/** 10. GET MESSAGE CONTEXT (THREADS) */
export async function getThreadHistory(parentId: string) {
  return await prisma.message.findMany({
    where: { OR: [{ id: parentId }, { parentMessageId: parentId }] },
    orderBy: { createdAt: "asc" },
    include: { sender: true },
  });
}

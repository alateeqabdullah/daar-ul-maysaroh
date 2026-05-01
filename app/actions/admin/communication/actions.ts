// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { AnnouncementType, AudienceType, PriorityLevel } from "@/app/generated/prisma/enums";


// // --- MIDDLEWARE ---
// async function ensureAdmin() {
//   const session = await auth();
//   if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
//     throw new Error("Unauthorized");
//   return session;
// }



// /** 1. DEPLOY ANNOUNCEMENT */
// export async function manageAnnouncement(data: any) {
//   const session = await ensureAdmin();
//   const payload = {
//     title: data.title,
//     content: data.content,
//     type: data.type as AnnouncementType,
//     priority: data.priority as PriorityLevel,
//     targetAudience: data.targetAudience as AudienceType[],
//     isPublished: data.isPublished === "true",
//     publishAt: new Date(),
//     createdById: session.user.id,
//   };

//   if (data.id) {
//     await prisma.announcement.update({ where: { id: data.id }, data: payload });
//   } else {
//     await prisma.announcement.create({ data: payload });
//   }
//   revalidatePath("/admin/communication");
//   return { success: true };
// }

// /** 2. INITIALIZE PRIVATE MESSAGE (1-on-1) */
// export async function sendPrivateMessage(
//   receiverId: string,
//   content: string,
//   parentId?: string,
// ) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const msg = await prisma.message.create({
//     data: {
//       senderId: session.user.id,
//       receiverId,
//       content,
//       parentMessageId: parentId,
//       messageType: "TEXT",
//     },
//   });

//   revalidatePath("/admin/communication");
//   return { success: true, message: JSON.parse(JSON.stringify(msg)) };
// }

// /** 3. BROADCAST TARGETED NUDGE (NOTIFICATION) */
// export async function sendTargetedNotification(
//   userId: string,
//   title: string,
//   message: string,
// ) {
//   await ensureAdmin();
//   await prisma.notification.create({
//     data: {
//       userId,
//       title,
//       message,
//       type: "SYSTEM",
//       priority: "HIGH",
//     },
//   });
// }

// /** 4. MARK MESSAGE AS READ */
// export async function markMessageRead(messageId: string) {
//   await prisma.message.update({
//     where: { id: messageId },
//     data: { isRead: true, readAt: new Date() },
//   });
// }

// /** 5. DECOMMISSION ANNOUNCEMENT */
// export async function deleteAnnouncement(id: string) {
//   await ensureAdmin();
//   await prisma.announcement.delete({ where: { id } });
//   revalidatePath("/admin/communication");
// }

// /** 6. TOGGLE PUBLISH STATUS */
// export async function toggleAnnouncementLive(id: string, isPublished: boolean) {
//   await ensureAdmin();
//   await prisma.announcement.update({ where: { id }, data: { isPublished } });
//   revalidatePath("/admin/communication");
// }

// /** 7. PURGE SYSTEM NOTIFICATIONS */
// export async function purgeNotificationNodes() {
//   await ensureAdmin();
//   await prisma.notification.deleteMany({ where: { isRead: true } });
//   revalidatePath("/admin/communication");
// }

// /** 8. UPDATE MESSAGE THREAD (REPLY) */
// export async function replyToThread(parentId: string, content: string) {
//   const session = await auth();
//   const original = await prisma.message.findUnique({ where: { id: parentId } });
//   if (!original) throw new Error("Thread not found");

//   return await sendPrivateMessage(original.senderId, content, parentId);
// }

// /** 9. ARCHIVE MESSAGE NODE */
// export async function deleteMessageNode(id: string) {
//   await prisma.message.delete({ where: { id } });
//   revalidatePath("/admin/communication");
// }

// /** 10. GET MESSAGE CONTEXT (THREADS) */
// export async function getThreadHistory(parentId: string) {
//   return await prisma.message.findMany({
//     where: { OR: [{ id: parentId }, { parentMessageId: parentId }] },
//     orderBy: { createdAt: "asc" },
//     include: { sender: true },
//   });
// }


// /** 11. INITIATE NEW CONVERSATION */
// export async function startNewConversation(receiverId: string, content: string) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const newMessage = await prisma.message.create({
//     data: {
//       senderId: session.user.id,
//       receiverId: receiverId,
//       content: content,
//       messageType: "TEXT",
//     },
//     include: {
//       sender: { select: { name: true, image: true } },
//       receiver: { select: { name: true, image: true } }
//     }
//   });

//   revalidatePath("/admin/communication");
//   return { success: true, message: JSON.parse(JSON.stringify(newMessage)) };
// }













"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import {
  AnnouncementType,
  AudienceType,
  PriorityLevel,
} from "@/app/generated/prisma/enums";

// --- MIDDLEWARE ---
async function ensureAdmin() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");
  return session;
}

// Helper to get the actual DB User ID from the session email
async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized: No session found");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user) throw new Error("User node not found in registry");
  return user;
}

/** 1. DEPLOY ANNOUNCEMENT (FIXED FOR ARRAYS & ENUMS) */
export async function manageAnnouncement(data: any) {
  try {
    const admin = await getAuthenticatedUser();

    // Ensure we are sending an ARRAY to the database for targetAudience
    const audience: AudienceType[] = Array.isArray(data.targetAudience)
      ? data.targetAudience
      : [data.targetAudience as AudienceType];

    const payload = {
      title: String(data.title),
      content: String(data.content),
      type: (data.type as AnnouncementType) || "GENERAL",
      priority: (data.priority as PriorityLevel) || "NORMAL",
      targetAudience: audience,
      isPublished: data.isPublished === "true" || data.isPublished === true,
      publishAt: new Date(),
      createdById: admin.id, // Using the verified ID
    };

    if (data.id) {
      await prisma.announcement.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await prisma.announcement.create({ data: payload });
    }

    revalidatePath("/admin/communication");
    return { success: true };
  } catch (error: any) {
    console.error("Broadcast Logic Error:", error);
    throw new Error(error.message);
  }
}

/** 2. START NEW CONVERSATION (FIXED ID FETCHING) */
export async function startNewConversation(
  receiverId: string,
  content: string,
) {
  try {
    const sender = await getAuthenticatedUser();

    const newMessage = await prisma.message.create({
      data: {
        senderId: sender.id,
        receiverId: receiverId,
        content: content,
        messageType: "TEXT",
      },
      include: {
        sender: { select: { name: true, image: true } },
      },
    });

    revalidatePath("/admin/communication");
    return { success: true, message: JSON.parse(JSON.stringify(newMessage)) };
  } catch (error: any) {
    throw new Error(`Message Dispatch Failed: ${error.message}`);
  }
}

/** 3. REPLY TO THREAD */
export async function replyToThread(parentId: string, content: string) {
  try {
    const sender = await getAuthenticatedUser();
    const original = await prisma.message.findUnique({
      where: { id: parentId },
    });
    if (!original) throw new Error("Thread context missing");

    // The recipient is whoever sent the original message
    const receiverId =
      original.senderId === sender.id ? original.receiverId : original.senderId;

    const msg = await prisma.message.create({
      data: {
        senderId: sender.id,
        receiverId: receiverId,
        content: content,
        parentMessageId: parentId,
        messageType: "TEXT",
      },
    });

    revalidatePath("/admin/communication");
    return { success: true, message: JSON.parse(JSON.stringify(msg)) };
  } catch (error: any) {
    throw new Error(error.message);
  }
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



"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { MaterialType } from "@/app/generated/prisma/enums";

// SECURITY CHECK
async function ensureClearance() {
  const session = await auth();
  if (
    !session ||
    !["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.user.role)
  )
    throw new Error("Unauthorized");
  return session;
}

/** 1. UPLOAD/INJECT RESOURCE (FIXED) */
export async function uploadResourceNode(data: any) {
  const session = await ensureClearance();

  // SANITIZATION: Critical for preventing "Handshake Failed"
  const payload = {
    title: String(data.title),
    description: String(data.description || ""),
    fileUrl: String(data.fileUrl), // In 2026, you'd use UploadThing or S3 here
    type: data.type as MaterialType,
    fileSize: parseInt(data.fileSize) || 0,
    fileType: String(data.fileType || "application/octet-stream"),
    uploadedById: session.user.id,
    isPublic: data.isPublic === "true" || data.isPublic === true,
  };

  try {
    if (data.classId && data.classId !== "") {
      await prisma.classMaterial.create({
        data: { ...payload, classId: data.classId },
      });
    } else if (data.subjectId && data.subjectId !== "") {
      await prisma.subjectMaterial.create({
        data: { ...payload, subjectId: data.subjectId },
      });
    } else {
      throw new Error("Target Node required (Class or Subject)");
    }
    revalidatePath("/admin/resources");
    return { success: true };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/** 2. UPDATE METADATA */
export async function updateResourceMetadata(
  id: string,
  origin: string,
  data: any,
) {
  await ensureClearance();
  const model =
    origin === "class" ? prisma.classMaterial : prisma.subjectMaterial;
  await (model as any).update({
    where: { id },
    data: { title: data.title, description: data.description },
  });
  revalidatePath("/admin/resources");
}

/** 3. DECOMMISSION (DELETE) */
export async function decommissionResource(id: string, origin: string) {
  await ensureClearance();
  const model =
    origin === "class" ? prisma.classMaterial : prisma.subjectMaterial;
  await (model as any).delete({ where: { id } });
  revalidatePath("/admin/resources");
}

/** 4. TOGGLE VISIBILITY */
export async function toggleResourcePublic(
  id: string,
  origin: string,
  isPublic: boolean,
) {
  await ensureClearance();
  const model =
    origin === "class" ? prisma.classMaterial : prisma.subjectMaterial;
  await (model as any).update({ where: { id }, data: { isPublic } });
  revalidatePath("/admin/resources");
}

/** 5. TRACK DOWNLOAD */
export async function logDownload(id: string, origin: string) {
  const model =
    origin === "class" ? prisma.classMaterial : prisma.subjectMaterial;
  await (model as any).update({
    where: { id },
    data: { downloadCount: { increment: 1 } },
  });
}

/** 6. SET AVAILABILITY WINDOW (SENSITIVE) */
export async function setResourceWindow(id: string, start: Date, end: Date) {
  await ensureClearance();
  await prisma.classMaterial.update({
    where: { id },
    data: { availableFrom: start, availableUntil: end },
  });
}

/** 7. MOVE RESOURCE (MIGRATION) */
export async function migrateResource(id: string, targetClassId: string) {
  await ensureClearance();
  await prisma.classMaterial.update({
    where: { id },
    data: { classId: targetClassId },
  });
  revalidatePath("/admin/resources");
}

/** 8. UPDATE THUMBNAIL */
export async function updateNodeThumbnail(
  id: string,
  origin: string,
  url: string,
) {
  await ensureClearance();
  const model =
    origin === "class" ? prisma.classMaterial : prisma.subjectMaterial;
  await (model as any).update({ where: { id }, data: { thumbnailUrl: url } });
}

/** 9. PURGE ORPHANS (SUPER ADMIN) */
export async function purgeOrphanedNodes() {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") throw new Error("Restricted");
  // Custom logic to find files with 0 downloads older than 1 year
}

/** 10. GENERATE SHARE LINK */
export async function generateNodeLink(id: string) {
  return {
    shareableUrl: `https://vault.maysaroh.com/s/${Buffer.from(id).toString("hex")}`,
  };
}

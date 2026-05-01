// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { GroupRole, GroupType } from "@/app/generated/prisma/enums";

// export async function manageGroup(data: any) {
//   const session = await auth();
//   if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
//     throw new Error("Handshake Refused: Unauthorized");
//   }

//   // STRICT TYPE CASTING (Prevents Database Errors)
//   const payload = {
//     name: String(data.name),
//     description: data.description || "",
//     type: data.type as GroupType,
//     capacity: parseInt(data.capacity) || 20,
//     academicYear: data.academicYear || "2025/2026",
//     teacherId: data.teacherId || null,
//     assistantTeacherId: data.assistantTeacherId || null,
//     isActive: data.isActive === "true" || data.isActive === true,
//   };

//   try {
//     if (data.id) {
//       await prisma.studentGroup.update({
//         where: { id: data.id },
//         data: payload,
//       });
//     } else {
//       await prisma.studentGroup.create({ data: payload });
//     }
//     revalidatePath("/admin/groups");
//     return { success: true };
//   } catch (error: any) {
//     console.error(error);
//     throw new Error("Handshake Failed: Registry Conflict");
//   }
// }

// export async function addGroupMember(groupId: string, studentId: string) {
//   await prisma.groupMember.create({
//     data: {
//       groupId,
//       studentId,
//       role: "MEMBER",
//       status: "ACTIVE",
//     },
//   });
//   revalidatePath("/admin/groups");
// }

// export async function updateMemberRole(memberId: string, role: GroupRole) {
//     await prisma.groupMember.update({
//       where: { id: memberId },
//       data: { role },
//     });
//     revalidatePath("/admin/groups");
//   }

//   // Group-Wide Broadcast
//   export async function postGroupAnnouncement(
//     groupId: string,
//     title: string,
//     content: string,
//   ) {
//     const session = await auth();
//     await prisma.groupAnnouncement.create({
//       data: {
//         groupId,
//         title,
//         content,
//         createdById: session?.user.id as string,
//       },
//     });
//     revalidatePath("/admin/groups");
//   }

//   // Update Individual Progress in Group
//   export async function updateMemberProgress(memberId: string, progress: number) {
//     await prisma.groupMember.update({
//       where: { id: memberId },
//       data: { groupProgress: progress },
//     });
//     revalidatePath("/admin/groups");
// }

// export async function removeGroupMember(memberId: string) {
//   await prisma.groupMember.delete({ where: { id: memberId } });
//   revalidatePath("/admin/groups");
// }

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { GroupRole, GroupType } from "@/app/generated/prisma/enums";

export async function manageGroup(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");

  const payload = {
    name: String(data.name),
    description: data.description || "",
    type: data.type as GroupType,
    capacity: parseInt(data.capacity) || 20,
    academicYear: data.academicYear || "2025/2026",
    teacherId: data.teacherId || null,
    assistantTeacherId: data.assistantTeacherId || null,
    isActive: true,
  };

  try {
    if (data.id) {
      await prisma.studentGroup.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await prisma.studentGroup.create({ data: payload });
    }
    revalidatePath("/admin/groups");
    return { success: true };
  } catch (error) {
    throw new Error("Registry Handshake Failed");
  }
}

export async function updateMemberRole(memberId: string, role: GroupRole) {
  await prisma.groupMember.update({ where: { id: memberId }, data: { role } });
  revalidatePath("/admin/groups");
  return { success: true };
}

export async function addMemberToGroup(groupId: string, studentId: string) {
  await prisma.groupMember.create({
    data: { groupId, studentId, role: "MEMBER", status: "ACTIVE" },
  });
  revalidatePath("/admin/groups");
  return { success: true };
}

export async function removeMemberFromGroup(memberId: string) {
  await prisma.groupMember.delete({ where: { id: memberId } });
  revalidatePath("/admin/groups");
  return { success: true };
}

export async function transmitBroadcast(
  groupId: string,
  title: string,
  content: string,
) {
  const session = await auth();
  await prisma.groupAnnouncement.create({
    data: {
      groupId,
      title,
      content,
      createdById: session?.user.id as string,
    },
  });
  revalidatePath("/admin/groups");
  return { success: true };
}
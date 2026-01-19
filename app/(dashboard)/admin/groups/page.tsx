import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GroupsManagementClient from "@/components/admin/groups-management-client";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Group Management | Admin",
  description: "Manage student groups and halqahs",
};

export default async function GroupsManagementPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  try {
    const [groupsRaw, teachersRaw, studentsRaw, classesRaw] = await Promise.all(
      [
        prisma.studentGroup.findMany({
          include: {
            teacher: {
              include: {
                user: { select: { name: true, image: true, email: true } },
              },
            },
            members: {
              include: {
                student: {
                  include: { user: { select: { name: true, image: true } } },
                },
              },
            },
            class: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.teacher.findMany({
          where: { isAvailable: true },
          include: { user: { select: { name: true, image: true } } },
        }),
        prisma.student.findMany({
          where: { user: { status: "APPROVED" } },
          include: {
            user: { select: { name: true, image: true, email: true } },
          },
        }),
        prisma.class.findMany({
          where: { isActive: true },
          select: { id: true, name: true },
        }),
      ]
    );

    // Manual Serialization for performance & safety
    const groups = groupsRaw.map((g) => ({
      ...g,
      createdAt: g.createdAt.toISOString(),
      updatedAt: g.updatedAt.toISOString(),
      startDate: g.startDate?.toISOString() || null,
      endDate: g.endDate?.toISOString() || null,
      members: g.members.map((m) => ({
        ...m,
        joinedAt: m.joinedAt.toISOString(),
      })),
    }));

    return (
      <GroupsManagementClient
        initialGroups={groups}
        teachers={teachersRaw}
        students={studentsRaw}
        classes={classesRaw}
      />
    );
  } catch (error) {
    console.error("Groups Load Error:", error);
    return <div>Error loading groups. Please refresh.</div>;
  }
}

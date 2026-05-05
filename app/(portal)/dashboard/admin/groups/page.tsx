// app/(portal)/dashboard/admin/groups/page.tsx
import { Metadata } from "next";
import { GroupsClient } from "./groups-client";
import { getGroups, getGroupStats, getGroupTypes } from "../actions/groups";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Group Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage student groups, schedules, and members",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    type?: string;
    teacherId?: string;
    classId?: string;
  }>;
}

export default async function GroupsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const type = params.type as any;
  const teacherId = params.teacherId;
  const classId = params.classId;

  let groupsData, stats, types, teachers, classes;
  let formattedTeachers: { id: string; name: string | null; email: string | null; }[] = [];
  let errorOccurred = false;

  const defaultTypes = ["ACADEMIC", "HIFZ", "REVISION", "SUPPORT", "PROJECT", "COMPETITION", "SOCIAL", "OTHER"];

  try {
    const results = await Promise.all([
      getGroups({
        page,
        limit: 10,
        search,
        type,
        teacherId,
        classId,
      }),
      getGroupStats(),
      getGroupTypes(),
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { user: { name: "asc" } },
      }),
      prisma.class.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          code: true,
          level: true,
        },
        orderBy: { name: "asc" },
      }),
    ]);

    groupsData = results[0];
    stats = results[1];
    types = results[2];
    teachers = results[3];
    classes = results[4];

    formattedTeachers = (teachers as any[]).map((teacher) => ({
      id: teacher.id,
      name: teacher.user.name,
      email: teacher.user.email,
    }));
  } catch (error) {
    console.error("Error loading groups page:", error);
    errorOccurred = true;
  }

  if (errorOccurred) {
    return (
      <GroupsClient
        initialGroups={[]}
        initialStats={{ totalGroups: 0, activeGroups: 0, totalMembers: 0, averageGroupSize: 0, byType: {} as any }}
        initialPage={1}
        initialSearch=""
        initialType=""
        initialTeacherId=""
        initialClassId=""
        totalPages={1}
        totalGroups={0}
        types={defaultTypes}
        teachers={[]}
        classes={[]}
      />
    );
  }

  return (
    <GroupsClient
      initialGroups={groupsData?.data || []}
      initialStats={stats!}
      initialPage={page}
      initialSearch={search || ""}
      initialType={type || ""}
      initialTeacherId={teacherId || ""}
      initialClassId={classId || ""}
      totalPages={groupsData?.totalPages || 1}
      totalGroups={groupsData?.total || 0}
      types={types || defaultTypes}
      teachers={formattedTeachers}
      classes={classes || []}
    />
  );
}

// app/(portal)/dashboard/admin/groups/new/page.tsx
import { Metadata } from "next";
import { NewGroupClient } from "./new-group-client";
import { getGroupTypes } from "../../actions/groups";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Create Group | Admin Dashboard | Al-Maysaroh",
  description: "Create a new student group",
};

export default async function NewGroupPage() {
  let types: string[];
  let classes: {
    id: string;
    name: string;
    code: string;
    level: string;
  }[];
  let formattedTeachers: { id: string; name: string | null; email: string | null }[] = [];

  try {
    const [typesRes, teachersRes, classesRes] = await Promise.all([
      getGroupTypes(),
      prisma.teacher.findMany({
        where: { isAvailable: true as any },
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

    types = typesRes;
    classes = classesRes;

    formattedTeachers = (teachersRes as any[]).map((teacher) => ({
      id: teacher.id as string,
      name: teacher.user.name,
      email: teacher.user.email,
    }));
  } catch (error) {
    console.error("Error loading new group page:", error);
    types = [
      "ACADEMIC",
      "HIFZ",
      "REVISION",
      "SUPPORT",
      "PROJECT",
      "COMPETITION",
      "SOCIAL",
      "OTHER",
    ];
    classes = [];
  }

  return (
    <NewGroupClient types={types} teachers={formattedTeachers} classes={classes} />
  );
}

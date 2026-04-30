import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClassDetailsClient from "@/components/teacher/class-details-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  const classData = await prisma.class.findUnique({
    where: { id: classId },
    select: { name: true },
  });
  return { title: `${classData?.name || "Class"} | Teacher` };
}

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const { classId } = await params;

  // 1. Verify Teacher Access & Fetch Data
  // FIX: Used findFirst to allow filtering by relation (teacher email)
  const classDataRaw = await prisma.class.findFirst({
    where: {
      id: classId,
      teacher: { user: { email: session.user.email } },
    },
    include: {
      // FIX: Removed 'assignments' from here as it's not a direct relation
      _count: { select: { enrollments: true } },

      // FIX: Fetch subjects to count assignments manually
      subjects: {
        select: {
          _count: { select: { assignments: true } },
        },
      },

      schedules: { orderBy: { dayOfWeek: "asc" } },
      announcements: { orderBy: { createdAt: "desc" }, take: 10 },
      materials: { orderBy: { createdAt: "desc" } },
      enrollments: {
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  email: true,
                  phone: true,
                },
              },
            },
          },
        },
        orderBy: { student: { user: { name: "asc" } } },
      },
    },
  });

  if (!classDataRaw) redirect("/teacher/classes");

  // 2. Calculate Totals
  const totalAssignments = classDataRaw.subjects.reduce(
    (acc, subj) => acc + subj._count.assignments,
    0
  );

  // 3. Serialize Data
  const classData = {
    ...classDataRaw,
    // Add the calculated count
    assignmentsCount: totalAssignments,
    studentsCount: classDataRaw._count.enrollments,

    // Date Serialization
    createdAt: classDataRaw.createdAt.toISOString(),
    updatedAt: classDataRaw.updatedAt.toISOString(),
    startDate: classDataRaw.startDate?.toISOString() || null,
    endDate: classDataRaw.endDate?.toISOString() || null,

    announcements: classDataRaw.announcements.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
      publishAt: a.publishAt.toISOString(),
    })),

    materials: classDataRaw.materials.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    })),

    students: classDataRaw.enrollments.map((e) => ({
      id: e.student.user.id,
      studentId: e.student.id,
      name: e.student.user.name,
      image: e.student.user.image,
      email: e.student.user.email,
      phone: e.student.user.phone,
      progress: e.progress || 0,
    })),
  };

  return (
    <ClassDetailsClient classData={classData} teacherId={session.user.id} />
  );
}

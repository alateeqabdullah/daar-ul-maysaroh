import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherResourcesClient from "@/components/teacher/teacher-resources-client";

export const metadata = {
  title: "Resources | Teacher",
  description: "Manage class materials and files",
};

export default async function TeacherResourcesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: { select: { id: true } } }
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");
  const teacherId = dbUser.teacherProfile.id;

  // 2. Fetch Resources & Classes
  const [resourcesRaw, classesRaw] = await Promise.all([
    prisma.classMaterial.findMany({
      where: { uploadedById: dbUser.id },
      include: {
        class: { select: { id: true, name: true, code: true } }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.class.findMany({
      where: { teacherId: teacherId, isActive: true },
      select: { id: true, name: true }
    })
  ]);

  // 3. Serialize
  const resources = resourcesRaw.map(r => ({
    id: r.id,
    title: r.title,
    description: r.description,
    type: r.type,
    fileUrl: r.fileUrl,
    fileSize: r.fileSize ? `${(r.fileSize / 1024 / 1024).toFixed(2)} MB` : "Unknown",
    classId: r.classId,
    className: r.class.name,
    classCode: r.class.code,
    downloads: r.downloadCount,
    createdAt: r.createdAt.toISOString()
  }));

  // Stats
  const stats = {
    totalFiles: resources.length,
    totalSize: "1.2 GB", // Mock or calculate if size is stored
    videos: resources.filter(r => r.type === "VIDEO").length,
    docs: resources.filter(r => r.type === "DOCUMENT").length
  };

  return <TeacherResourcesClient resources={resources} classes={classesRaw} stats={stats} />;
}
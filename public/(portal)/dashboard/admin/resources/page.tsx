import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResourcesTerminalClient from "@/components/admin/resources/resources-terminal-client";

export default async function ResourcesPage() {
  const session = await auth();
  if (
    !session ||
    !["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.user.role)
  )
    redirect("/login");

  // Fetching the Knowledge Registry
  const [classM, subjectM, courseM, classes, subjects] = await Promise.all([
    prisma.classMaterial.findMany({
      include: { uploadedBy: { select: { name: true, image: true } } },
    }),
    prisma.subjectMaterial.findMany({
      include: { uploadedBy: { select: { name: true, image: true } } },
    }),
    prisma.courseMaterial.findMany({ include: { course: true } }),
    prisma.class.findMany({ select: { id: true, name: true } }),
    prisma.subject.findMany({ select: { id: true, name: true } }),
  ]);

  const resources = JSON.parse(
    JSON.stringify({
      classMaterials: classM,
      subjectMaterials: subjectM,
      courseMaterials: courseM,
    }),
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black p-0 md:p-8">
      <ResourcesTerminalClient
        initialResources={resources}
        classes={JSON.parse(JSON.stringify(classes))}
        subjects={JSON.parse(JSON.stringify(subjects))}
      />
    </div>
  );
}

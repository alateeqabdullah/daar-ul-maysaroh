import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApprovalsClient from "@/components/admin/approvals-client";

export default async function ApprovalsPage() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    redirect("/login");

  const pendingUsers = await prisma.user.findMany({
    where: { status: "PENDING" },
    include: {
      studentProfile: true,
      teacherProfile: true,
      parentProfile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <ApprovalsClient
        initialUsers={JSON.parse(JSON.stringify(pendingUsers))}
      />
    </div>
  );
}

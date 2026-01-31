import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserRegistryClient from "@/components/admin/user-registry-client";

export default async function UserRegistryPage() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    redirect("/login");

  const usersRaw = await prisma.user.findMany({
    include: {
      studentProfile: { include: { parent: { include: { user: true } } } },
      teacherProfile: true,
      parentProfile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Serialization to handle Decimal/Date types in Client Components
  const users = JSON.parse(JSON.stringify(usersRaw));

  return (
    <div className="min-h-screen p-4 md:p-8">
      <UserRegistryClient initialUsers={users} />
    </div>
  );
}

// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import UserManagementClient from "@/components/admin/user-management-client";
// import { auth } from "@/lib/auth";
// import { Prisma } from "@prisma/client";

// interface PageProps {
//   searchParams: Promise<{
//     page?: string;
//     limit?: string;
//     role?: string;
//     search?: string;
//     status?: string;
//   }>;
// }

// export const metadata = {
//   title: "User Management | Admin",
//   description: "Manage all system users",
// };

// export default async function UserManagementPage({ searchParams }: PageProps) {
//   const session = await auth();
//   if (!session) redirect("/login");
//   if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) redirect("/dashboard");

//   const params = await searchParams;
//   const page = parseInt(params.page || "1");
//   const limit = parseInt(params.limit || "20");
//   const skip = (page - 1) * limit;

//   // Build Filter
//   const where: Prisma.UserWhereInput = {
//     role: { not: "SUPER_ADMIN" }, // Hide Super Admins
//   };

//   if (params.role && params.role !== "ALL") {
//     // @ts-ignore - Prisma enum casting safely handled by logic
//     where.role = params.role;
//   }

//   if (params.status && params.status !== "ALL") {
//     // @ts-ignore
//     where.status = params.status;
//   }

//   if (params.search) {
//     where.OR = [
//       { name: { contains: params.search, mode: "insensitive" } },
//       { email: { contains: params.search, mode: "insensitive" } },
//     ];
//   }

//   try {
//     const [usersRaw, total, counts] = await Promise.all([
//       prisma.user.findMany({
//         where,
//         include: {
//           studentProfile: true,
//           teacherProfile: true,
//           parentProfile: true,
//         },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit,
//       }),
//       prisma.user.count({ where }),
//       Promise.all([
//         prisma.user.count({ where: { role: "STUDENT", status: "APPROVED" } }),
//         prisma.user.count({ where: { role: "TEACHER", status: "APPROVED" } }),
//         prisma.user.count({ where: { role: "PARENT", status: "APPROVED" } }),
//         prisma.user.count({ where: { status: "PENDING" } }),
//         prisma.user.count({ where: { status: "SUSPENDED" } }),
//       ]),
//     ]);

//     // Manual Serialization (Faster than JSON.parse/stringify)
//     const users = usersRaw.map(u => ({
//       ...u,
//       createdAt: u.createdAt.toISOString(),
//       updatedAt: u.updatedAt.toISOString(),
//       emailVerified: u.emailVerified?.toISOString() || null,
//       lastLogin: u.lastLogin?.toISOString() || null,
//       approvedAt: u.approvedAt?.toISOString() || null,
//     }));

//     return (
//       <UserManagementClient
//         initialUsers={users}
//         pagination={{ page, limit, total, pages: Math.ceil(total / limit) }}
//         filters={{ role: params.role, search: params.search, status: params.status }}
//         stats={{
//           students: counts[0],
//           teachers: counts[1],
//           parents: counts[2],
//           pending: counts[3],
//           suspended: counts[4],
//         }}
//       />
//     );
//   } catch (error) {
//     console.error("User Fetch Error:", error);
//     return <div>Error loading users. Please refresh.</div>;
//   }
// }

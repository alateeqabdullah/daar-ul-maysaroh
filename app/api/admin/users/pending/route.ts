// // // src/app/api/admin/users/pending/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@/lib/auth";
// // import { prisma } from "@/lib/prisma";

// // export async function GET(request: NextRequest) {
// //   try {
// //     // Check authentication and authorization
// //     const session = await auth();

// //     if (!session) {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     // Only admins can access
// //     if (!["SUPER_ADMIN", "ADMIN"].includes(session.user?.role)) {
// //       // Added optional chaining for safety
// //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// //     }

// //     // Get query parameters
// //     const searchParams = request.nextUrl.searchParams;
// //     const search = searchParams.get("search") || "";
// //     const page = parseInt(searchParams.get("page") || "1");
// //     const limit = parseInt(searchParams.get("limit") || "20");

// //     // IMPORTANT: Get the raw filter values
// //     const roleFilter = searchParams.get("role");
// //     const statusFilter = searchParams.get("status");

// //     // Calculate pagination
// //     const skip = (page - 1) * limit;

// //     // Build where clause
// //     const where: any = {
// //       // Base search logic (remains the same)
// //       OR: [
// //         { name: { contains: search, mode: "insensitive" } },
// //         { email: { contains: search, mode: "insensitive" } },
// //         { phone: { contains: search, mode: "insensitive" } },
// //       ],
// //     };

// //     // 1. FIX: Conditionally apply status filter
// //     // If statusFilter is provided AND it's NOT the "ALL" pseudo-value, apply it.
// //     if (statusFilter && statusFilter !== "ALL") {
// //       where.status = statusFilter;
// //     }
// //     // If status is not provided (e.g., initial load), default to PENDING as per frontend state
// //     else if (!statusFilter) {
// //       where.status = "PENDING";
// //     }

// //     // 2. FIX: Conditionally apply role filter
// //     // If roleFilter is provided AND it's NOT the "All" pseudo-value, apply it.
// //     if (roleFilter && roleFilter !== "All") {
// //       where.role = roleFilter;
// //     }

// //     // Get users with pagination
// //     const [users, total] = await Promise.all([
// //       prisma.user.findMany({
// //         where,
// //         include: {
// //           studentProfile: true,
// //           teacherProfile: true,
// //           parentProfile: true,
// //         },
// //         orderBy: { createdAt: "desc" },
// //         skip,
// //         take: limit,
// //       }),
// //       prisma.user.count({ where }),
// //     ]);

// //     // Calculate pagination metadata
// //     const totalPages = Math.ceil(total / limit);
// //     const hasNextPage = page < totalPages;
// //     const hasPreviousPage = page > 1;

// //     return NextResponse.json({
// //       users,
// //       pagination: {
// //         page,
// //         limit,
// //         total,
// //         totalPages,
// //         hasNextPage,
// //         hasPreviousPage,
// //       },
// //     });
// //   } catch (error: any) {
// //     // NOTE: This catch block will now log the actual Prisma error to your server console
// //     // which will help debug any future database issues.
// //     console.error("Error fetching pending users:", error);
// //     return NextResponse.json(
// //       { message: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // }





// // src/app/api/admin/users/pending/route.ts
// import { NextRequest, NextResponse } from 'next/server'

// import { prisma } from '@/lib/prisma'
// import { auth } from '@/lib/auth'

// export async function GET(request: NextRequest) {
//   try {
//     const session = await auth()

//     if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       )
//     }

//     const { searchParams } = new URL(request.url)
//     const page = parseInt(searchParams.get('page') || '1')
//     const limit = parseInt(searchParams.get('limit') || '10')
//     const role = searchParams.get('role')
//     const search = searchParams.get('search')

//     const skip = (page - 1) * limit

//     const where: any = {
//       status: 'PENDING',
//     }

//     if (role && role !== 'ALL') {
//       where.role = role
//     }

//     if (search) {
//       where.OR = [
//         { name: { contains: search, mode: 'insensitive' } },
//         { email: { contains: search, mode: 'insensitive' } },
//         { phone: { contains: search, mode: 'insensitive' } },
//       ]
//     }

//     const [users, total] = await Promise.all([
//       prisma.user.findMany({
//         where,
//         include: {
//           studentProfile: true,
//           teacherProfile: true,
//           parentProfile: true,
//         },
//         orderBy: { createdAt: 'desc' },
//         skip,
//         take: limit,
//       }),
//       prisma.user.count({ where }),
//     ])

//     return NextResponse.json({
//       users,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     })
//   } catch (error) {
//     console.error('Error fetching pending users:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch pending users' },
//       { status: 500 }
//     )
//   }
// }



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this path to your prisma client

export async function GET() {
  try {
    const pendingUsers = await prisma.user.findMany({
      where: {
        status: "PENDING", // Ensure your schema has a status field
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pendingUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
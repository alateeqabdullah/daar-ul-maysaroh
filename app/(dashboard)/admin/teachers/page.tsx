// src/app/(dashboard)/admin/teachers/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherManagementClient from "@/components/admin/teacher-management-client";

export default async function TeacherManagementPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Initialize default data structure to prevent hydration mismatch or undefined errors
  let data = {
    teachers: [],
    stats: {
      totalTeachers: 0,
      availableTeachers: 0,
      totalClasses: 0,
      totalStudents: 0,
    },
  };

  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        classes: {
          include: {
            enrollments: true,
          },
        },
        subjects: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Serialize data and calculate stats inside the try block
    data = {
      teachers: JSON.parse(JSON.stringify(teachers)),
      stats: {
        totalTeachers: teachers.length,
        availableTeachers: teachers.filter((t) => t.isAvailable).length,
        totalClasses: teachers.reduce(
          (sum, t) => sum + (t.classes?.length || 0),
          0
        ),
        totalStudents: teachers.reduce(
          (sum, t) =>
            sum +
            (t.classes?.reduce(
              (classSum, c) => classSum + (c.enrollments?.length || 0),
              0
            ) || 0),
          0
        ),
      },
    };
  } catch (error) {
    console.error("Error loading teachers:", error);
    // Data remains at the default state defined above
  }

  // Single return point for cleaner Server Component execution
  return (
    <TeacherManagementClient
      initialTeachers={data.teachers}
      stats={data.stats}
    />
  );
}



// // src/app/(dashboard)/admin/teachers/page.tsx

// import { redirect } from 'next/navigation'
// import { prisma } from '@/lib/prisma'
// import TeachersManagementClient from '@/components/admin/teachers-management-client'
// import { auth } from '@/lib/auth';

// export default async function TeachersManagementPage({
//   searchParams,
// }: {
//   // Fix: searchParams is a Promise in Next.js 15
//   searchParams: Promise<{ page?: string; search?: string; status?: string }>
// }) {
//   const session = await auth()

//   if (!session) {
//     redirect('/login')
//   }

//   if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
//     redirect('/dashboard')
//   }

//   // 1. Await searchParams before accessing properties
//   const params = await searchParams;
//   const page = parseInt(params.page || '1')
//   const limit = 10
//   const skip = (page - 1) * limit

//   // 2. Initialize data variables outside the try block
//   let teachers: any[] = [];
//   let total = 0;

//   const where: any = {
//     user: {
//       status: 'APPROVED',
//     },
//   }

//   if (params.search) {
//     where.OR = [
//       { user: { name: { contains: params.search, mode: 'insensitive' } } },
//       { user: { email: { contains: params.search, mode: 'insensitive' } } },
//       { teacherId: { contains: params.search, mode: 'insensitive' } },
//     ]
//   }

//   if (params.status && params.status !== 'all') {
//     if (params.status === 'available') {
//       where.isAvailable = true
//     } else if (params.status === 'unavailable') {
//       where.isAvailable = false
//     }
//   }

//   try {
//     // 3. Perform data fetching
//     const [teachersData, totalCount] = await Promise.all([
//       prisma.teacher.findMany({
//         where,
//         include: {
//           user: true,
//           classes: {
//             include: {
//               enrollments: true,
//             },
//           },
//         },
//         orderBy: { user: { createdAt: 'desc' } },
//         skip,
//         take: limit,
//       }),
//       prisma.teacher.count({ where }),
//     ])

//     teachers = teachersData;
//     total = totalCount;
//   } catch (error) {
//     console.error('Error loading teachers:', error)
//     // Variables remain as initial empty values if an error occurs
//   }

//   // 4. Return JSX outside of the try/catch block
//   return (
//     <TeachersManagementClient
//       initialTeachers={JSON.parse(JSON.stringify(teachers))}
//       total={total}
//       page={page}
//       filters={params}
//     />
//   )
// }

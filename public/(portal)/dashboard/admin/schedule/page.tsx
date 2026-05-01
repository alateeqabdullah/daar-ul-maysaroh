// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import ScheduleManagementClient from "@/components/admin/schedule-management-client";
// import { auth } from "@/lib/auth";

// export const metadata = {
//   title: "Schedule Management | Admin",
//   description: "Manage weekly class timetables",
// };

// export default async function ScheduleManagementPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ day?: string; search?: string }>;
// }) {
//   const session = await auth();
//   if (!session) redirect("/login");
//   if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
//     redirect("/dashboard");

//   const params = await searchParams;

//   try {
//     const [classesRaw, teachersRaw, schedulesRaw] = await Promise.all([
//       // 1. Classes (for dropdown)
//       prisma.class.findMany({
//         where: { isActive: true },
//         select: { id: true, name: true, code: true, teacherId: true },
//       }),
//       // 2. Teachers (for reference)
//       prisma.teacher.findMany({
//         where: { isAvailable: true },
//         include: { user: { select: { name: true, image: true } } },
//       }),
//       // 3. All Schedules
//       prisma.classSchedule.findMany({
//         include: {
//           class: {
//             include: {
//               teacher: {
//                 include: { user: { select: { name: true, image: true } } },
//               },
//             },
//           },
//         },
//         orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
//       }),
//     ]);

//     // Serialize
//     const schedules = schedulesRaw.map((s) => ({
//       ...s,
//       createdAt: s.createdAt.toISOString(),
//       updatedAt: s.updatedAt.toISOString(),
//     }));

//     // Calculate Stats
//     const stats = {
//       totalSessions: schedules.length,
//       onlineSessions: schedules.filter((s) => s.isOnline).length,
//       uniqueClasses: new Set(schedules.map((s) => s.classId)).size,
//       busiestDay: getBusiestDay(schedules),
//     };

//     return (
//       <ScheduleManagementClient
//         initialSchedules={schedules}
//         classes={classesRaw}
//         teachers={teachersRaw}
//         stats={stats}
//         filters={{ day: params.day || "all", search: params.search || "" }}
//       />
//     );
//   } catch (error) {
//     console.error("Schedule Load Error:", error);
//     return <div>Error loading schedule.</div>;
//   }
// }

// function getBusiestDay(schedules: any[]) {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const counts = [0, 0, 0, 0, 0, 0, 0];
//   schedules.forEach((s) => counts[s.dayOfWeek]++);
//   const max = Math.max(...counts);
//   return days[counts.indexOf(max)];
// }






import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ScheduleManagementClient from "@/components/admin/schedule-management-client";

export default async function ScheduleManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; search?: string }>;
}) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/login");

  const params = await searchParams;

  // Fetch everything needed for the UI
  const [classes, schedulesRaw, teachers] = await Promise.all([
    prisma.class.findMany({
      where: { isActive: true },
      include: { teacher: { include: { user: true } } },
    }),
    prisma.classSchedule.findMany({
      include: {
        class: {
          include: {
            teacher: { include: { user: true } },
          },
        },
      },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
    prisma.teacher.findMany({ include: { user: true } }),
  ]);

  // SERIALIZATION FIX: Deeply convert Dates to Strings and Decimals to Numbers
  const schedules = JSON.parse(JSON.stringify(schedulesRaw));
  const classesData = JSON.parse(JSON.stringify(classes));

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <ScheduleManagementClient
        initialSchedules={schedules}
        classes={classesData}
        teachers={teachers}
        filters={{
          day: params.day || new Date().getDay().toString(),
          search: params.search || "",
        }}
      />
    </div>
  );
}
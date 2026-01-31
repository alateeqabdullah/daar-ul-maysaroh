import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AttendanceClient from "@/components/admin/attendance-client";

export default async function AttendancePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const dayOfWeek = new Date().getDay(); // 0-6

  // Fetch current schedules for today
  const schedules = await prisma.classSchedule.findMany({
    where: { dayOfWeek },
    include: {
      class: {
        include: {
          enrollments: {
            include: { student: { include: { user: true } } },
          },
        },
      },
      attendances: {
        where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      },
    },
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <AttendanceClient
        initialSchedules={JSON.parse(JSON.stringify(schedules))}
      />
    </div>
  );
}

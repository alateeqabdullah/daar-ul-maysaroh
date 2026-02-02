import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AttendanceTerminalClient from "@/components/admin/attendance-client";

export default async function AttendancePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [schedules, students, attendance] = await Promise.all([
    prisma.classSchedule.findMany({
      include: { class: true },
    }),
    // FIX: Ensure you are fetching ALL students to pass to the terminal
    prisma.student.findMany({
      include: { user: true },
    }),
    prisma.attendance.findMany({
      where: {
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <AttendanceTerminalClient
        // Use JSON.parse(JSON.stringify()) to prevent serialization errors with Dates/Decimals
        initialSchedules={JSON.parse(JSON.stringify(schedules))}
        allStudents={JSON.parse(JSON.stringify(students))}
        existingAttendance={JSON.parse(JSON.stringify(attendance))}
      />
    </div>
  );
}

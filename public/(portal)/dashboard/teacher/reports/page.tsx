import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReportsClient from "@/components/teacher/reports-client";
import { ReportsPageData } from "@/types/(dashboard)/teacher/reports";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

export const metadata = {
  title: "Reports & Analytics | Teacher",
  description: "Performance analytics and academic insights",
};

export default async function TeacherReportsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: { select: { id: true } } }
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");
  const teacherId = dbUser.teacherProfile.id;

  // 2. Define Time Range (Last 6 Months)
  const sixMonthsAgo = subMonths(new Date(), 6);

  // 3. Fetch Real Data
  const [classes, assignmentsCount, attendanceRaw, gradesRaw] = await Promise.all([
    // Class Metrics
    prisma.class.findMany({
      where: { teacherId, isActive: true },
      include: {
        _count: { select: { enrollments: true } },
        attendances: { where: { date: { gte: sixMonthsAgo } }, select: { status: true, date: true } },
        subjects: { include: { grades: { where: { assessmentDate: { gte: sixMonthsAgo } }, select: { percentage: true, assessmentDate: true } } } }
      }
    }),
    // Assignment Count
    prisma.assignment.count({ where: { createdById: dbUser.id } }),
    // Raw Attendance for Charts
    prisma.attendance.findMany({
      where: { 
        class: { teacherId },
        date: { gte: sixMonthsAgo }
      },
      select: { status: true, date: true }
    }),
    // Raw Grades for Charts
    prisma.grade.findMany({
      where: { subject: { teacherId } },
      select: { percentage: true, assessmentDate: true }
    })
  ]);

  // --- DATA PROCESSING (The "Real World" Logic) ---

  // 1. Process Class Metrics (Table Data)
  const classMetrics = classes.map(c => {
    const totalAtt = c.attendances.length;
    const present = c.attendances.filter(a => a.status === "PRESENT").length;
    const attRate = totalAtt > 0 ? Math.round((present / totalAtt) * 100) : 0;
    
    const allGrades = c.subjects.flatMap(s => s.grades.map(g => g.percentage));
    const avgScore = allGrades.length > 0 ? Math.round(allGrades.reduce((a,b)=>a+b,0)/allGrades.length) : 0;

    return {
      id: c.id, 
      name: c.name, 
      code: c.code,
      studentCount: c._count.enrollments,
      attendanceRate: attRate,
      averageScore: avgScore
    };
  });

  // 2. Process Monthly Trends (Charts)
  const monthsMap = new Map<string, { present: number, total: number, scoreSum: number, scoreCount: number }>();

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = subMonths(new Date(), i);
    const key = format(d, "MMM"); // "Jan", "Feb"
    monthsMap.set(key, { present: 0, total: 0, scoreSum: 0, scoreCount: 0 });
  }

  // Fill Attendance Data
  attendanceRaw.forEach(r => {
    const key = format(r.date, "MMM");
    if (monthsMap.has(key)) {
      const entry = monthsMap.get(key)!;
      entry.total++;
      if (r.status === "PRESENT") entry.present++;
    }
  });

  // Fill Grade Data
  gradesRaw.forEach(g => {
    const key = format(g.assessmentDate, "MMM");
    if (monthsMap.has(key)) {
      const entry = monthsMap.get(key)!;
      entry.scoreCount++;
      entry.scoreSum += g.percentage;
    }
  });

  const attendanceData = Array.from(monthsMap.entries()).map(([month, data]) => ({
    month,
    present: data.total > 0 ? Math.round((data.present / data.total) * 100) : 0
  }));

  const performanceData = Array.from(monthsMap.entries()).map(([month, data]) => ({
    month,
    score: data.scoreCount > 0 ? Math.round(data.scoreSum / data.scoreCount) : 0
  }));

  // 3. Process Grade Distribution (Pie Chart)
  const gradeCounts = { A: 0, B: 0, C: 0, F: 0 };
  gradesRaw.forEach(g => {
    if (g.percentage >= 90) gradeCounts.A++;
    else if (g.percentage >= 75) gradeCounts.B++;
    else if (g.percentage >= 50) gradeCounts.C++;
    else gradeCounts.F++;
  });

  const gradeData = [
    { name: 'A (90+)', value: gradeCounts.A, color: '#10b981' }, // Emerald
    { name: 'B (75-89)', value: gradeCounts.B, color: '#3b82f6' }, // Blue
    { name: 'C (50-74)', value: gradeCounts.C, color: '#f59e0b' }, // Amber
    { name: 'F (<50)', value: gradeCounts.F, color: '#ef4444' }  // Red
  ];

  // 4. Global Stats
  const avgPerformance = performanceData.length > 0 
    ? Math.round(performanceData.reduce((a,c) => a+c.score,0) / performanceData.length)
    : 0;
  
  const avgAttendance = attendanceData.length > 0
    ? Math.round(attendanceData.reduce((a,c) => a+c.present,0) / attendanceData.length)
    : 0;

  const initialData: ReportsPageData = {
    stats: {
      avgAttendance,
      avgPerformance,
      totalAssignments: assignmentsCount,
      activeStudents: classMetrics.reduce((a,c) => a+c.studentCount, 0)
    },
    attendanceData,
    gradeData,
    performanceData,
    classMetrics,
    // Real generated reports would be a separate DB table. Keeping static placeholder for UI demo only.
    recentReports: [
       { id: "1", title: "Monthly Summary", type: "performance", size: "1.2 MB", generatedAt: new Date().toISOString() }
    ]
  };

  return <ReportsClient initialData={initialData} />;
}
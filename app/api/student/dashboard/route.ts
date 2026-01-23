// src/app/api/student/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = session.user.studentProfile?.id;

    if (!studentId) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    // Get student with related data
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        enrollments: {
          include: {
            class: {
              include: {
                teacher: {
                  include: {
                    user: true,
                  },
                },
                schedules: true,
              },
            },
          },
        },
        grades: {
          take: 5,
          orderBy: { assessmentDate: "desc" },
          include: {
            subject: true,
          },
        },
        attendance: {
          take: 7,
          orderBy: { date: "desc" },
        },
        quranProgress: {
          where: {
            status: "IN_PROGRESS",
          },
          orderBy: { surahNumber: "asc" },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Calculate stats
    const totalClasses = student.enrollments.length;
    const completedAssignments = 0; // You would query this from assignments
    const attendanceRate =
      student.attendance.length > 0
        ? Math.round(
            (student.attendance.filter((a) => a.status === "PRESENT").length /
              student.attendance.length) *
              100
          )
        : 0;

    // Calculate average grade
    const averageGrade =
      student.grades.length > 0
        ? student.grades.reduce((acc, grade) => acc + grade.percentage, 0) /
          student.grades.length
        : 0;

    // Get upcoming classes (next 3 days)
    const today = new Date();
    const upcomingClasses = student.enrollments
      .flatMap((enrollment) =>
        enrollment.class.schedules
          .filter((schedule) => {
            // Filter for upcoming schedules
            return true; // Add your schedule filtering logic
          })
          .map((schedule) => ({
            id: schedule.id,
            class: enrollment.class.name,
            teacher: enrollment.class.teacher.user.name,
            time: `${schedule.startTime} - ${schedule.endTime}`,
            meetingUrl: schedule.meetingUrl,
          }))
      )
      .slice(0, 3);

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.user.name,
        studentId: student.studentId,
        hifzLevel: student.hifzLevel,
        tajweedLevel: student.tajweedLevel,
        currentClass: student.currentClass?.name,
      },
      stats: {
        totalClasses,
        completedAssignments,
        attendanceRate,
        averageGrade,
        quranProgress: student.quranProgress.length > 0 ? 65 : 0, // Calculate from Quran progress
        streak: 14, // Calculate from daily activities
      },
      upcomingClasses,
      recentGrades: student.grades,
      quranProgress: student.quranProgress,
    });
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

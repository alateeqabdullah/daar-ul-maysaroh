// src/app/api/courses/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    const where: any = {
      isActive: true,
      isPublic: true,
    };

    if (category) {
      where.category = category;
    }

    if (level) {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const course = await prisma.course.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        level: body.level,
        duration: body.duration,
        totalLessons: body.totalLessons,
        price: body.price,
        currency: body.currency,
        isActive: body.isActive ?? true,
        isPublic: body.isPublic ?? true,
        teacherId: body.teacherId,
        features: body.features,
        requirements: body.requirements,
        curriculum: body.curriculum,
        schedule: body.schedule,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

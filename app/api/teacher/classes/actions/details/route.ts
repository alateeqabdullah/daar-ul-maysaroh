import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, classId } = body;
    const userId = session.user.id;

    // --- POST ANNOUNCEMENT ---
    if (action === "POST_ANNOUNCEMENT") {
      const announcement = await prisma.announcement.create({
        data: {
          title: data.title,
          content: data.content,
          specificClassId: classId,
          createdById: userId,
          type: "ACADEMIC",
          targetAudience: ["STUDENTS"],
          isPublished: true,
        },
      });
      return NextResponse.json({
        success: true,
        item: {
          ...announcement,
          createdAt: announcement.createdAt.toISOString(),
        },
      });
    }

    // --- UPLOAD MATERIAL ---
    if (action === "UPLOAD_MATERIAL") {
      const material = await prisma.classMaterial.create({
        data: {
          title: data.title,
          description: data.description,
          fileUrl: data.fileUrl,
          type: "DOCUMENT",
          classId: classId,
          uploadedById: userId,
          isPublic: true,
        },
      });
      return NextResponse.json({
        success: true,
        item: { ...material, createdAt: material.createdAt.toISOString() },
      });
    }

    // --- DELETE ITEM ---
    if (action === "DELETE_ITEM") {
      if (data.type === "ANNOUNCEMENT") {
        await prisma.announcement.delete({ where: { id: data.id } });
      } else {
        await prisma.classMaterial.delete({ where: { id: data.id } });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

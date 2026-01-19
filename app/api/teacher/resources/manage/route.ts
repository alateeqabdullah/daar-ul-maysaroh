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
    const { action, data, resourceId } = body;

    // Get User ID
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // --- 1. UPLOAD RESOURCE ---
    if (action === "UPLOAD") {
      if (!data.title || !data.classId || !data.fileUrl) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }

      const newResource = await prisma.classMaterial.create({
        data: {
          title: data.title,
          description: data.description,
          fileUrl: data.fileUrl,
          type: data.type || "DOCUMENT",
          classId: data.classId,
          uploadedById: user.id,
          isPublic: true,
          fileSize: 0, // In real app, get from upload response
        },
        include: { class: { select: { id: true, name: true, code: true } } }
      });

      const formatted = {
        ...newResource,
        className: newResource.class.name,
        classCode: newResource.class.code,
        fileSize: "Unknown",
        downloads: 0,
        createdAt: newResource.createdAt.toISOString()
      };

      return NextResponse.json({ success: true, resource: formatted });
    }

    // --- 2. DELETE RESOURCE ---
    if (action === "DELETE") {
      await prisma.classMaterial.delete({ where: { id: resourceId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error: any) {
    console.error("Resource API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
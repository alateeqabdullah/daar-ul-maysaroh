// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// export async function POST(req: Request) {
//   try {
//     const session = await auth();
//     if (!session || session.user.role !== "TEACHER") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { action, data, classId } = body;
//     const userId = session.user.id;

//     // --- POST ANNOUNCEMENT ---
//     if (action === "POST_ANNOUNCEMENT") {
//       const announcement = await prisma.announcement.create({
//         data: {
//           title: data.title,
//           content: data.content,
//           specificClassId: classId,
//           createdById: userId,
//           type: "ACADEMIC",
//           targetAudience: ["STUDENTS"],
//           isPublished: true,
//         },
//       });
//       return NextResponse.json({
//         success: true,
//         item: {
//           ...announcement,
//           createdAt: announcement.createdAt.toISOString(),
//         },
//       });
//     }

//     // --- UPLOAD MATERIAL ---
//     if (action === "UPLOAD_MATERIAL") {
//       const material = await prisma.classMaterial.create({
//         data: {
//           title: data.title,
//           description: data.description,
//           fileUrl: data.fileUrl,
//           type: "DOCUMENT",
//           classId: classId,
//           uploadedById: userId,
//           isPublic: true,
//         },
//       });
//       return NextResponse.json({
//         success: true,
//         item: { ...material, createdAt: material.createdAt.toISOString() },
//       });
//     }

//     // --- DELETE ITEM ---
//     if (action === "DELETE_ITEM") {
//       if (data.type === "ANNOUNCEMENT") {
//         await prisma.announcement.delete({ where: { id: data.id } });
//       } else {
//         await prisma.classMaterial.delete({ where: { id: data.id } });
//       }
//       return NextResponse.json({ success: true });
//     }

//     return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    // 1. Security Check
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, classId } = body;

    // 2. Identify Teacher
    // We need the User ID for 'createdById' and Teacher Profile to verify class ownership
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { teacherProfile: true },
    });

    if (!user || !user.teacherProfile) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 404 }
      );
    }

    // 3. Verify Class Ownership (Security)
    const classCheck = await prisma.class.findUnique({
      where: { id: classId, teacherId: user.teacherProfile.id },
    });

    if (!classCheck) {
      return NextResponse.json(
        { error: "Class not found or access denied" },
        { status: 403 }
      );
    }

    // =========================================================
    // ACTION: POST ANNOUNCEMENT (Stream)
    // =========================================================
    if (action === "POST_ANNOUNCEMENT") {
      const announcement = await prisma.announcement.create({
        data: {
          title: data.title,
          content: data.content,
          type: "ACADEMIC",
          priority: "NORMAL",
          specificClassId: classId,
          createdById: user.id,
          targetAudience: ["STUDENTS"], // Enum array
          isPublished: true,
        },
      });

      // Serialize date for client
      return NextResponse.json({
        success: true,
        item: {
          ...announcement,
          createdAt: announcement.createdAt.toISOString(),
        },
      });
    }

    // =========================================================
    // ACTION: UPLOAD MATERIAL (Resources)
    // =========================================================
    if (action === "UPLOAD_MATERIAL") {
      const material = await prisma.classMaterial.create({
        data: {
          title: data.title,
          description: data.description,
          fileUrl: data.fileUrl,
          type: "DOCUMENT",
          classId: classId,
          uploadedById: user.id,
          isPublic: true,
        },
      });

      return NextResponse.json({
        success: true,
        item: {
          ...material,
          createdAt: material.createdAt.toISOString(),
        },
      });
    }

    // =========================================================
    // ACTION: CREATE ASSIGNMENT (Classwork)
    // =========================================================
    if (action === "CREATE_ASSIGNMENT") {
      // Create a default subject if one isn't selected,
      // or find the first subject of this class to attach the assignment to.
      // In a real app, you'd select the subject ID in the form.
      // Here we auto-resolve or create a "General" subject for the class.
      let subjectId = data.subjectId;

      if (!subjectId) {
        const defaultSubject = await prisma.subject.findFirst({
          where: { classId },
        });
        if (defaultSubject) {
          subjectId = defaultSubject.id;
        } else {
          // Fallback: Create a General subject
          const newSub = await prisma.subject.create({
            data: {
              name: "General",
              code: `${classCheck.code}-GEN`,
              category: "OTHER",
              classId: classId,
              teacherId: user.teacherProfile.id,
            },
          });
          subjectId = newSub.id;
        }
      }

      const assignment = await prisma.assignment.create({
        data: {
          title: data.title,
          description: data.description,
          totalMarks: parseFloat(data.totalMarks) || 100,
          type: data.type || "HOMEWORK",
          dueDate: new Date(data.dueDate),
          subjectId: subjectId,
          createdById: user.id,
        },
        include: {
          _count: { select: { submissions: true } },
        },
      });

      return NextResponse.json({
        success: true,
        item: {
          ...assignment,
          submissionCount: 0,
          dueDate: assignment.dueDate.toISOString(),
          createdAt: assignment.createdAt.toISOString(),
        },
      });
    }

    // =========================================================
    // ACTION: DELETE ITEM
    // =========================================================
    if (action === "DELETE_ITEM") {
      const { id, type } = data; // type: 'ANNOUNCEMENT' | 'MATERIAL' | 'ASSIGNMENT'

      if (type === "ANNOUNCEMENT") {
        await prisma.announcement.delete({ where: { id } });
      } else if (type === "MATERIAL") {
        await prisma.classMaterial.delete({ where: { id } });
      } else if (type === "ASSIGNMENT") {
        await prisma.assignment.delete({ where: { id } });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    console.error("Class Details API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
// "use server";

// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { AssignmentType } from "@/app/generated/prisma/enums";

// /**
//  * 1. DEPLOY ASSIGNMENT CHALLENGE (UPSERT)
//  */
// export async function manageAssignment(data: any) {
//   const session = await auth();
//   if (!session) throw new Error("Unauthorized");

//   const payload = {
//     title: data.title,
//     description: data.description,
//     subjectId: data.subjectId,
//     dueDate: new Date(data.dueDate),
//     totalMarks: parseFloat(data.totalMarks) || 100,
//     weightage: parseFloat(data.weightage) || 10,
//     type: data.type as AssignmentType,
//     instructions: data.instructions,
//     rubric: data.rubric,
//     attachments: data.attachments || [], // Array of URLs
//     createdById: session.user.id,
//   };

//   if (data.id) {
//     await prisma.assignment.update({ where: { id: data.id }, data: payload });
//   } else {
//     await prisma.assignment.create({ data: payload });
//   }

//   revalidatePath("/admin/assignments");
//   return { success: true };
// }

// /**
//  * 2. EVALUATE SUBMISSION (GRADING)
//  * Updates marks, feedback, and status in one handshake.
//  */
// export async function evaluateSubmission(
//   submissionId: string,
//   data: { marks: number; feedback: string },
// ) {
//   const session = await auth();

//   await prisma.assignmentSubmission.update({
//     where: { id: submissionId },
//     data: {
//       marks: data.marks,
//       feedback: data.feedback,
//       status: "GRADED",
//       gradedAt: new Date(),
//       gradedBy: session?.user.id,
//     },
//   });

//   revalidatePath("/admin/assignments");
//   return { success: true };
// }

// /**
//  * 3. NUDGE PENDING NODES
//  * Sends a notification to all students who haven't submitted yet.
//  */
// export async function nudgePendingStudents(assignmentId: string) {
//   const assignment = await prisma.assignment.findUnique({
//     where: { id: assignmentId },
//     include: {
//       subject: { include: { class: { include: { students: true } } } },
//     },
//   });

//   const students = assignment?.subject.class.students || [];

//   for (const student of students) {
//     const submission = await prisma.assignmentSubmission.findUnique({
//       where: {
//         assignmentId_studentId: { assignmentId, studentId: student.id },
//       },
//     });

//     if (!submission) {
//       await prisma.notification.create({
//         data: {
//           userId: student.userId,
//           title: "Urgent: Assignment Deadline",
//           message: `The deadline for "${assignment?.title}" is approaching. Please submit your work.`,
//           type: "ASSIGNMENT",
//           priority: "HIGH",
//         },
//       });
//     }
//   }
//   return { success: true };
// }

// /**
//  * 4. EXTEND DEADLINE (BULK)
//  */
// export async function extendDeadline(assignmentId: string, newDate: string) {
//   await prisma.assignment.update({
//     where: { id: assignmentId },
//     data: { dueDate: new Date(newDate) },
//   });
//   revalidatePath("/admin/assignments");
// }

// /**
//  * 5. DECOMMISSION ASSIGNMENT
//  */
// export async function decommissionAssignment(id: string) {
//   await prisma.assignment.delete({ where: { id } });
//   revalidatePath("/admin/assignments");
// }






"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AssignmentType } from "@/app/generated/prisma/enums";





/**
 * 1. MANAGE ASSIGNMENT (CREATE / UPDATE)
 * Fixed the attachment typo and added strict type conversion.
 */
export async function manageAssignmentNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "TEACHER", "SUPER_ADMIN"].includes(session.user.role)) {
    throw new Error("Administrative clearance required.");
  }

  // Deep Sanitization
  const id = data.id || undefined;
  const totalMarks = parseFloat(data.totalMarks) || 100;
  const weightage = parseFloat(data.weightage) || 10;
  const dueDate = new Date(data.dueDate);

  const payload = {
    title: String(data.title).trim(),
    description: String(data.description || "").trim(),
    subjectId: String(data.subjectId),
    dueDate,
    totalMarks,
    weightage,
    type: data.type as AssignmentType,
    instructions: String(data.instructions || "").trim(),
    rubric: String(data.rubric || "").trim(),
    // Cleanly split attachments string into array
    attachments: typeof data.attachments === 'string' 
      ? data.attachments.split(",").map((s: string) => s.trim()).filter(Boolean) 
      : [],
    createdById: session.user.id,
  };

  try {
    if (id) {
      await prisma.assignment.update({ where: { id }, data: payload });
    } else {
      await prisma.assignment.create({ data: payload });
    }
    revalidatePath("/admin/assignments");
    return { success: true };
  } catch (error: any) {
    console.error("Assignment Action Error:", error);
    throw new Error(`Deployment Failed: ${error.message}`);
  }
}

/**
 * 2. CLONE TASK (DUPLICATE)
 * Creates a carbon copy of an existing assignment for quick deployment.
 */
export async function cloneAssignment(id: string) {
  const source = await prisma.assignment.findUnique({ where: { id } });
  if (!source) throw new Error("Source node not found.");

  const { id: _, createdAt, updatedAt, ...rest } = source;
  
  await prisma.assignment.create({
    data: {
      ...rest,
      title: `${rest.title} (Clone)`,
      dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Default to +7 days
    }
  });

  revalidatePath("/admin/assignments");
  return { success: true };
}

/**
 * 3. RESET SUBMISSION NODE
 * Deletes a student's submission so they can re-upload their work.
 */
export async function resetSubmission(submissionId: string) {
  await prisma.assignmentSubmission.delete({ where: { id: submissionId } });
  revalidatePath("/admin/assignments");
  return { success: true };
}

/**
 * 4. BULK EXTEND DEADLINE
 */
export async function bulkExtendDeadline(assignmentId: string, days: number) {
  const task = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!task) throw new Error("Task not found");

  const newDate = new Date(task.dueDate.getTime() + (days * 24 * 60 * 60 * 1000));
  
  await prisma.assignment.update({
    where: { id: assignmentId },
    data: { dueDate: newDate }
  });

  revalidatePath("/admin/assignments");
  return { success: true };
}



/**
 * 2. COMMIT EVALUATION (GRADING)
 */
export async function evaluateSubmissionNode(
  submissionId: string,
  data: { marks: number; feedback: string },
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marks: data.marks,
        feedback: data.feedback,
        status: "GRADED",
        gradedAt: new Date(),
        gradedBy: session.user.id,
      },
    });
    revalidatePath("/admin/assignments");
    return { success: true };
  } catch (error: any) {
    throw new Error(`Evaluation Failed: ${error.message}`);
  }
}

/**
 * 3. NUDGE PENDING NODES (NOTIFICATIONS)
 */
export async function nudgePendingNodes(assignmentId: string) {
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      subject: { include: { class: { include: { students: true } } } },
    },
  });

  if (!assignment) throw new Error("Node not found");

  const students = assignment.subject.class.students;

  // Create a notification node for each student without a submission
  const notifications = await Promise.all(
    students.map(async (student) => {
      const submission = await prisma.assignmentSubmission.findUnique({
        where: {
          assignmentId_studentId: { assignmentId, studentId: student.id },
        },
      });

      if (!submission) {
        return prisma.notification.create({
          data: {
            userId: student.userId,
            title: "Urgent: Assignment Sync Required",
            message: `The deadline for "${assignment.title}" is imminent. Handover your payload.`,
            type: "ASSIGNMENT",
            priority: "HIGH",
          },
        });
      }
    }),
  );

  return { success: true, nudgedCount: notifications.length };
}

/**
 * 4. DECOMMISSION TASK
 */
export async function decommissionAssignment(id: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin access required.");

  await prisma.assignment.delete({ where: { id } });
  revalidatePath("/admin/assignments");
  return { success: true };
}
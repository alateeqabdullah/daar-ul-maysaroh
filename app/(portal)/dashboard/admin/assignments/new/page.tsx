// app/(portal)/dashboard/admin/assignments/new/page.tsx
import { Metadata } from "next";
import { NewAssignmentClient } from "./new-assignment-client";
import { getAssignmentTypes } from "../../actions/assignments";
import { getSubjects } from "../../actions/subjects";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Create Assignment | Admin Dashboard | Al-Maysaroh",
  description: "Create a new assignment for students",
};

export default async function NewAssignmentPage() {
  const session = await auth();
  const currentUser = session?.user;

  try {
    const [types, subjects] = await Promise.all([
      getAssignmentTypes(),
      getSubjects({ page: 1, limit: 100 }),
    ]);

    return (
      <NewAssignmentClient
        types={types}
        subjects={subjects.data || []}
        userId={currentUser?.id || ""}
      />
    );
  } catch (error) {
    console.error("Error loading new assignment page:", error);
    return (
      <NewAssignmentClient
        types={["HOMEWORK", "PROJECT", "QUIZ", "TEST", "PRESENTATION", "RECITATION", "OTHER"]}
        subjects={[]}
        userId=""
      />
    );
  }
}
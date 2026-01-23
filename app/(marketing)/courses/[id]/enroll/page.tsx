import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EnrollmentForm } from "@/components/courses/enrollment-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface EnrollmentPageProps {
  params: {
    id: string;
  };
}

export default async function EnrollmentPage({ params }: EnrollmentPageProps) {
  const session = await auth();
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  if (!course) {
    notFound();
  }

  // Redirect to sign in if not authenticated
  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=/courses/${params.id}/enroll`);
  }

  // Check if student is already enrolled
  if (session.user.studentId) {
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.studentId,
        courseId: params.id,
        status: "ACTIVE",
      },
    });

    if (existingEnrollment) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <EnrollmentForm course={course} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

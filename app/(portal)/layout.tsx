// app/(portal)/layout.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // Role-based routing
    const userRole = session.user?.role;
    const isAdminRoute = pathname.startsWith("/dashboard/admin");
    const isStudentRoute = pathname.startsWith("/dashboard/student");
    const isTeacherRoute = pathname.startsWith("/dashboard/teacher");

    if (isAdminRoute && userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
      router.push("/unauthorized");
    } else if (isStudentRoute && userRole !== "STUDENT") {
      router.push("/unauthorized");
    } else if (isTeacherRoute && userRole !== "TEACHER") {
      router.push("/unauthorized");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary-700 mx-auto" />
          <p className="text-muted-foreground">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

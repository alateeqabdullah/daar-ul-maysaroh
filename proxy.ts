// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ 1. Use static import. Assuming '@/lib/auth' is your standard Auth.js setup.
// This requires your Auth.js configuration to be compatible with the Edge Runtime.
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  // ✅ 2. Read the session using the Edge-compatible Auth.js helper.
  // This reads the session token from the cookie and validates it (without database lookup
  // if configured correctly with JWTs, which is essential for the Edge).
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  // --- Core Authentication Check ---

  // Redirect unauthenticated users to login
  if (!session?.user) {
    // Exclude the login page itself to prevent an infinite redirect loop
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to login/register if not logged in
    return NextResponse.next();
  }

  const user = session.user;

  // --- Check for Logged-In Users on Auth Pages ---

  // If user is logged in and tries to access login/register, redirect them to dashboard
  if (user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --- Application State and RBAC Checks (Your Original Logic) ---

  // If user is not approved and trying to access a non-pending route
  if (user.status !== "APPROVED" && !pathname.startsWith("/pending")) {
    // Exclude API routes or static files if necessary, but keep the core logic
    return NextResponse.redirect(new URL("/pending", request.url));
  }

  // --- Role-based access control ---

  const userRole = user?.role || "";

  if (
    pathname.startsWith("/admin") &&
    !["SUPER_ADMIN", "ADMIN"].includes(userRole)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/teacher") && userRole !== "TEACHER") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/student") && userRole !== "STUDENT") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/parent") && userRole !== "PARENT") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Ensure you include /login and /register in the matcher if you handle redirects there
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/parent/:path*",
    "/settings/:path*",
    "/login", // Included to handle redirection logic above
    "/register", // Included to handle redirection logic above
    // Note: Pending page should ideally not be matched here if you want to allow it
    // access without extra checks, but your logic handles /pending well.
  ],
};

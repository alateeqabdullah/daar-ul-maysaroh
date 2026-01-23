// // src/middleware.

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // ✅ 1. Use static import. Assuming '@/lib/auth' is your standard Auth.js setup.
// // This requires your Auth.js configuration to be compatible with the Edge Runtime.
// import { auth } from "@/lib/auth";

// export default async function proxy(request: NextRequest) {
//   // ✅ 2. Read the session using the Edge-compatible Auth.js helper.
//   // This reads the session token from the cookie and validates it (without database lookup
//   // if configured correctly with JWTs, which is essential for the Edge).
//   const session = await auth();

//   const pathname = request.nextUrl.pathname;

//   // --- Core Authentication Check ---

//   // Redirect unauthenticated users to login
//   if (!session?.user) {
//     // Exclude the login page itself to prevent an infinite redirect loop
//     if (pathname !== "/login" && pathname !== "/register") {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     // Allow access to login/register if not logged in
//     return NextResponse.next();
//   }

//   const user = session.user;

//   // --- Check for Logged-In Users on Auth Pages ---

//   // If user is logged in and tries to access login/register, redirect them to dashboard
//   if (user && (pathname === "/login" || pathname === "/register")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // --- Application State and RBAC Checks (Your Original Logic) ---

//   // If user is not approved and trying to access a non-pending route
//   if (user.status !== "APPROVED" && !pathname.startsWith("/pending")) {
//     // Exclude API routes or static files if necessary, but keep the core logic
//     return NextResponse.redirect(new URL("/pending", request.url));
//   }

//   // --- Role-based access control ---

//   const userRole = user?.role || "";

//   if (
//     pathname.startsWith("/admin") &&
//     !["SUPER_ADMIN", "ADMIN"].includes(userRole)
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (pathname.startsWith("/teacher") && userRole !== "TEACHER") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (pathname.startsWith("/student") && userRole !== "STUDENT") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (pathname.startsWith("/parent") && userRole !== "PARENT") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// // Ensure you include /login and /register in the matcher if you handle redirects there
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (internal API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",

//     // Explicitly include your protected UI routes
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/teacher/:path*",
//     "/student/:path*",
//     "/parent/:path*",
//     "/settings/:path*",
//     "/login",
//     "/register",
//   ],
// };













import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 1. Define Route Categories
  // Auth Routes: Accessible only when NOT logged in.
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  // Pending Route: The "waiting room" for unapproved users.
  const isPendingRoute = pathname.startsWith("/pending");

  // Public Routes: Accessible to everyone regardless of status.
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact");

  // 2. Handle Logic for Users who are NOT logged in
  if (!session) {
    // Redirect to login if trying to access protected content
    if (!isAuthRoute && !isPublicRoute) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // 3. Handle Logic for Logged-In Users
  const user = session.user;
  const userRole = user?.role || "";

  // If logged in, don't allow access to Login/Register/Forgot-Password
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Handle Approval Status (The "Waiting Room")
  // Force non-approved users to the pending page
  if (user.status !== "APPROVED" && !isPendingRoute) {
    return NextResponse.redirect(new URL("/pending", request.url));
  }

  // Prevent approved users from seeing the pending page
  if (user.status === "APPROVED" && isPendingRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5. Role-Based Access Control (RBAC)
  const roleRoutes = [
    { prefix: "/admin", allowed: ["SUPER_ADMIN", "ADMIN"] },
    { prefix: "/teacher", allowed: ["TEACHER"] },
    { prefix: "/student", allowed: ["STUDENT"] },
    { prefix: "/parent", allowed: ["PARENT"] },
  ];

  for (const route of roleRoutes) {
    if (
      pathname.startsWith(route.prefix) &&
      !route.allowed.includes(userRole)
    ) {
      // If user is in the wrong area, send them back to their specific dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Config to filter out internal Next.js files and static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (internal API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (any public images/assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
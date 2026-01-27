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

// 1. Configuration Constants - UPDATED to use /portal routes
const ROLE_PORTAL_HOMES: Record<string, string> = {
  SUPER_ADMIN: "/portal",
  ADMIN: "/dashboard",
  TEACHER: "/dashboard",
  STUDENT: "/dashboard",
  PARENT: "/dashboard",
  SUPPORT: "/dashboard",
};

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/admissions",
  "events",
  "/resources",
  "/contact",
  "/courses",
  "/pricing",
  "/faculty",
  "/faq",
  "/terms",
  "/privacy",
  "/help",
  "/pending",
  "/account-status",
  "/legal",
  
];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Helper: Get portal home based on role
  const getPortalHome = (role: string) => ROLE_PORTAL_HOMES[role] || "/portal";

  // 2. Identify Route Type
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isPendingRoute = pathname.startsWith("/pending");
  const isStatusRoute = pathname.startsWith("/account-status");
  const isPortalRoute = pathname.startsWith("/dashboard"); // ADD THIS

  // 3. Logic for Unauthenticated Users
  if (!session) {
    if (!isAuthRoute && !isPublicRoute) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
      );
    }
    return NextResponse.next();
  }

  // 4. Logic for Authenticated Users
  const user = session.user;
  const userRole = user?.role || "STUDENT";
  const userStatus = user?.status || "PENDING";

  // 4a. Redirect away from Auth routes to PORTAL (not /admin, /teacher, etc.)
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // CHANGED HERE
  }

  // 4b. Handle Account Status
  if (userStatus === "SUSPENDED" || userStatus === "DEACTIVATED") {
    if (pathname !== "/account-status/suspended") {
      return NextResponse.redirect(
        new URL("/account-status/suspended", request.url),
      );
    }
    return NextResponse.next();
  }

  if (userStatus === "REJECTED") {
    if (pathname !== "/account-status/rejected") {
      return NextResponse.redirect(
        new URL("/account-status/rejected", request.url),
      );
    }
    return NextResponse.next();
  }

  // 4c. Handle Pending Approval
  if (userStatus === "PENDING" && !isPendingRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/pending", request.url));
  }

  // 4d. Prevent Approved users from seeing the Pending page
  if (userStatus === "APPROVED" && isPendingRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // CHANGED HERE
  }

  // 5. Role-Based Access Control for Portal Routes
  if (isPortalRoute) {
    // Define which roles can access which portal sub-routes
    const PORTAL_ROLE_PERMISSIONS: Record<string, string[]> = {
      SUPER_ADMIN: ["/dashboard", "/dashboard/admin"],
      ADMIN: ["/dashboard", "/dashboard/admin"],
      TEACHER: ["/dashboard", "/dashboard/teacher"],
      STUDENT: ["/dashboard", "/dashboard/student"],
      PARENT: ["/dashboard", "/dashboard/parent"],
      SUPPORT: ["/dashboard", "/dashboard/support"],
    };

    const allowedRoutes = PORTAL_ROLE_PERMISSIONS[userRole] || ["/dashboard"];

    // Check if current path is allowed for this role
    const isRouteAllowed = allowedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    if (!isRouteAllowed) {
      // User trying to access a portal route not allowed for their role
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 6. Elite Role-Based Access Control (RBAC) - FOR LEGACY ROUTES
  // This section catches attempts to access old routes like /admin, /teacher directly
  const legacyRoleProtectedRoutes = [
    {
      path: "/admin",
      allowed: ["SUPER_ADMIN", "ADMIN"],
      redirectTo: "/dashboard/admin",
    },
    { path: "/teacher", allowed: ["TEACHER"], redirectTo: "/dashboard/teacher" },
    { path: "/student", allowed: ["STUDENT"], redirectTo: "/dashboard/student" },
    { path: "/parent", allowed: ["PARENT"], redirectTo: "/dashboard/parent" },
    { path: "/support", allowed: ["SUPPORT"], redirectTo: "/dashboard/support" },
  ];

  for (const route of legacyRoleProtectedRoutes) {
    if (pathname.startsWith(route.path)) {
      if (!route.allowed.includes(userRole)) {
        // User not allowed for this legacy route, redirect to portal
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        // User is allowed, redirect to new portal version of the route
        return NextResponse.redirect(new URL(route.redirectTo, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)",
  ],
};
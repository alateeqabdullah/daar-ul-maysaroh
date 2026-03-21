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

import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
  "/research",
  "/news",
  "/gallery",
  "/videos",
  "/testimonials",
  "/teachers",
  "/methodology",
  "/events",
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
  "/maintenance",
  "/coming-soon",
  "/offline",
  "/unauthorized",
];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance mode check
  const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
  if (MAINTENANCE_MODE && pathname !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Utility pages (always accessible)
  const UTILITY_PAGES = [
    "/maintenance",
    "/coming-soon",
    "/offline",
    "/unauthorized",
  ];
  const isUtilityPage = UTILITY_PAGES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isUtilityPage) {
    return NextResponse.next();
  }

  const session = await auth();

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isPendingRoute = pathname.startsWith("/pending");
  const isPortalRoute = pathname.startsWith("/dashboard");

  // Unauthenticated users
  if (!session) {
    if (isAuthRoute || isPublicRoute) {
      return NextResponse.next();
    }
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  // Authenticated users
  if (!session.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = session.user;
  const userRole = user.role || "STUDENT";
  const userStatus = user.status || "PENDING";

  // Redirect away from auth routes
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Account status handling
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

  // Pending approval
  if (userStatus === "PENDING" && !isPendingRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/pending", request.url));
  }

  if (userStatus === "APPROVED" && isPendingRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Portal routes - role-based access
  if (isPortalRoute) {
    const PORTAL_ROLE_PERMISSIONS: Record<string, string[]> = {
      SUPER_ADMIN: ["/dashboard", "/dashboard/admin"],
      ADMIN: ["/dashboard", "/dashboard/admin"],
      TEACHER: ["/dashboard", "/dashboard/teacher"],
      STUDENT: ["/dashboard", "/dashboard/student"],
      PARENT: ["/dashboard", "/dashboard/parent"],
      SUPPORT: ["/dashboard", "/dashboard/support"],
    };

    const allowedRoutes = PORTAL_ROLE_PERMISSIONS[userRole] || ["/dashboard"];
    const isRouteAllowed = allowedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    if (!isRouteAllowed) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ✅ FIXED: Legacy role-based redirects - exact match only
  const legacyRoleProtectedRoutes = [
    {
      path: "/admin",
      allowed: ["SUPER_ADMIN", "ADMIN"],
      redirectTo: "/dashboard/admin",
    },
    {
      path: "/teacher",
      allowed: ["TEACHER"],
      redirectTo: "/dashboard/teacher",
    },
    {
      path: "/student",
      allowed: ["STUDENT"],
      redirectTo: "/dashboard/student",
    },
    { path: "/parent", allowed: ["PARENT"], redirectTo: "/dashboard/parent" },
    {
      path: "/support",
      allowed: ["SUPPORT"],
      redirectTo: "/dashboard/support",
    },
  ];

  for (const route of legacyRoleProtectedRoutes) {
    // ✅ Exact match only (not startsWith)
    if (pathname === route.path || pathname === `${route.path}/`) {
      if (!route.allowed.includes(userRole)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL(route.redirectTo, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|maintenance|coming-soon|unauthorized).*)",
  ],
};
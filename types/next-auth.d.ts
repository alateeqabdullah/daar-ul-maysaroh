// // src/types/next-auth.d.ts
// import "next-auth";
// import { UserRole, UserStatus } from "@prisma/client";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       role: UserRole;
//       status: UserStatus;
//       image?: string;
//       studentProfile?: any;
//       teacherProfile?: any;
//       parentProfile?: any;
//       adminProfile?: any;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     name: string;
//     role: UserRole;
//     status: UserStatus;
//     image?: string;
//     studentProfile?: any;
//     teacherProfile?: any;
//     parentProfile?: any;
//     adminProfile?: any;
//   }
// }

// declare module "@auth/core/jwt" {
//   interface JWT {
//     id: string;
//     email: string;
//     name: string;
//     role: UserRole;
//     status: UserStatus;
//     image?: string;
//     studentProfile?: any;
//     teacherProfile?: any;
//     parentProfile?: any;
//     adminProfile?: any;
//   }
// }








import { type DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { UserRole, UserStatus } from "@prisma/client";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers
   * or retrieved from the database.
   */
  interface User {
    id: string;
    role: UserRole;
    status: UserStatus;
    studentProfileId?: string;
    teacherProfileId?: string;
    parentProfileId?: string;
    adminProfileId?: string;
    approvedAt?: Date | null;
    approvedById?: string | null;
  }

  /**
   * The session object returned by useSession, auth(), etc.
   * We extend the default session user with our custom properties.
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
      status: UserStatus;
      studentProfileId?: string;
      teacherProfileId?: string;
      parentProfileId?: string;
      adminProfileId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * The token object used for session persistence.
   * Properties here must be manually mapped in the auth.ts callbacks.
   */
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    status: UserStatus;
    studentProfileId?: string;
    teacherProfileId?: string;
    parentProfileId?: string;
    adminProfileId?: string;
  }
}
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

// src/types/next-auth.d.ts
import "next-auth"
import { UserRole, UserStatus } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    status: UserStatus
    image?: string
    studentProfileId?: string
    teacherProfileId?: string
    parentProfileId?: string
    adminProfileId?: string
    approvedAt?: Date
    approvedById?: string
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    role: UserRole
    status: UserStatus
    image?: string
    studentProfileId?: string
    teacherProfileId?: string
    parentProfileId?: string
    adminProfileId?: string
  }
}


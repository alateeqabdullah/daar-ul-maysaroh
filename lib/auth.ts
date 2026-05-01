// // // src/auth.ts


// // import NextAuth from "next-auth";
// // import Credentials from "@auth/core/providers/credentials";
// // import { prisma } from "@/lib/prisma";
// // import bcrypt from "bcryptjs";
// // // import type { DefaultSession } from "next-auth";

// // // // Extend session types for TypeScript
// // // declare module "next-auth" {
// // //   interface Session extends DefaultSession {
// // //     user: {
// // //       id: string;
// // //       role: string;
// // //       status: string;
// // //       studentProfile?: any;
// // //       teacherProfile?: any;
// // //       parentProfile?: any;
// // //       adminProfile?: any;
// // //     } & DefaultSession["user"];
// // //   }

// // //   interface User {
// // //     role: string;
// // //     status: string;
// // //     studentProfile?: any;
// // //     teacherProfile?: any;
// // //     parentProfile?: any;
// // //     adminProfile?: any;
// // //   }
// // // }

// // // declare module "@auth/core/jwt" {
// // //   interface JWT {
// // //     id: string;
// // //     role: string;
// // //     status: string;
// // //     studentProfile?: any;
// // //     teacherProfile?: any;
// // //     parentProfile?: any;
// // //     adminProfile?: any;
// // //   }
// // // }

// // export const { handlers, signIn, signOut, auth } = NextAuth({
// //   providers: [
// //     Credentials({
// //       name: "credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         try {
// //           if (!credentials?.email || !credentials?.password) {
// //             throw new Error("Email and password are required");
// //           }

// //           // Find user
// //           const user = await prisma.user.findUnique({
// //             where: { email: credentials.email as string },
// //             include: {
// //               studentProfile: true,
// //               teacherProfile: true,
// //               parentProfile: true,
// //               adminProfile: true,
// //             },
// //           });

// //           if (!user) {
// //             throw new Error("User not found");
// //           }

// //           if (!user.password) {
// //             throw new Error("Invalid authentication method");
// //           }

// //           // Check if password is correct
// //           const isPasswordValid = await bcrypt.compare(
// //             credentials.password as string,
// //             user.password
// //           );

// //           if (!isPasswordValid) {
// //             throw new Error("Invalid password");
// //           }

// //           // Check if user is approved
// //           if (user.status !== "APPROVED") {
// //             throw new Error(
// //               `Account is ${user.status.toLowerCase()}. Please wait for admin approval.`
// //             );
// //           }

// //           // Check if user is active
// //           if (!user.isActive) {
// //             throw new Error("Account is deactivated. Please contact support.");
// //           }

// //           return {
// //             id: user.id,
// //             email: user.email,
// //             name: user.name,
// //             role: user.role,
// //             status: user.status,
// //             image: user.image,
// //             studentProfile: user.studentProfile,
// //             teacherProfile: user.teacherProfile,
// //             parentProfile: user.parentProfile,
// //             adminProfile: user.adminProfile,
// //           };
// //         } catch (error) {
// //           console.error("Auth error:", error);
// //           throw error;
// //         }
// //       },
// //     }),
// //   ],
// //   session: {
// //     strategy: "jwt",
// //   },
// //   callbacks: {
// //     async jwt({ token, user, account }) {
// //       if (user) {
// //         token.id = user.id;
// //         token.email = user.email;
// //         token.name = user.name;
// //         token.role = user.role;
// //         token.status = user.status;
// //         token.image = user.image;
// //         token.studentProfile = user.studentProfile;
// //         token.teacherProfile = user.teacherProfile;
// //         token.parentProfile = user.parentProfile;
// //         token.adminProfile = user.adminProfile;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (session.user) {
// //         session.user.id = token.id as string;
// //         session.user.email = token.email as string;
// //         session.user.name = token.name as string;
// //         session.user.role = token.role as string;
// //         session.user.status = token.status as string;
// //         session.user.image = token.image as string;
// //         session.user.studentProfile = token.studentProfile;
// //         session.user.teacherProfile = token.teacherProfile;
// //         session.user.parentProfile = token.parentProfile;
// //         session.user.adminProfile = token.adminProfile;
// //       }
// //       return session;
// //     },
// //     async redirect({ url, baseUrl }) {
// //       // Redirect to dashboard after successful login
// //       if (url.startsWith(baseUrl)) {
// //         return `${baseUrl}/dashboard`;
// //       }
// //       // Allows relative callback URLs
// //       else if (url.startsWith("/")) {
// //         return `${baseUrl}${url}`;
// //       }
// //       return baseUrl;
// //     },
// //   },
// //   pages: {
// //     signIn: "/login",
// //     signUp: "/register",
// //     error: "/auth/error",
// //   },
// //   trustHost: true,
// //   debug: process.env.NODE_ENV === "development",
// // });












// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" }, // Essential for Middleware performance
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         });

//         // Ensure user exists and has a password (not an OAuth-only user)
//         if (!user || !user.password) return null;

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         );

//         if (!isPasswordValid) return null;

//         // Return properties that match your User model [cite: 1-6]
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role, // From UserRole enum
//           status: user.status, // From UserStatus enum
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // When the user first logs in, 'user' is available
//       if (user) {
//         token.role = user.role;
//         token.status = user.status;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Pass the role and status from the token to the session object
//       if (session.user) {
//         session.user.role = token.role as string;
//         session.user.status = token.status as string;
//       }
//       return session;
//     },
//   },
// });





import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole, UserStatus } from "@/app/generated/prisma/enums";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Prisma 7 types can be strict; 'as any' is a safe fallback
  // for the adapter during the beta transition of Auth.js v5
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // matches enum UserRole
          status: user.status, // matches enum UserStatus
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.status = token.status as UserStatus;
      }
      return session;
    },
  },
});


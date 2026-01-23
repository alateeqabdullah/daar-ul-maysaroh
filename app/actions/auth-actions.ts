"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function requestPasswordReset(email: string) {
  try {
    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Security: Always return success even if user doesn't exist to prevent email enumeration
    if (!user) {
      return { success: "If an account exists, a reset link has been sent." };
    }

    // 2. Generate Token
    const token = randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 Hour

    // 3. Store in DB (Clean up old tokens first)
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // 4. Send Email (Mock for now)
     // In production, use Resend or Nodemailer here
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    console.log("------------------------------------------------");
    console.log("🔒 PASSWORD RESET LINK:", resetLink);
    console.log("------------------------------------------------");

    return { success: "If an account exists, a reset link has been sent." };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}
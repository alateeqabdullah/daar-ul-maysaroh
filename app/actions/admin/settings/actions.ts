"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// --- MIDDLEWARE: SENSITIVE ACCESS CHECK ---
async function ensureSuperAdmin() {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("CRITICAL: Super Admin Clearance Required");
  return session;
}

/**
 * 1. UPDATE SYSTEM SETTING (GENERIC HANDSHAKE)
 */
export async function updateSystemSetting(key: string, value: string) {
  await auth();
  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value, category: "GENERAL", type: "STRING" },
  });
  revalidatePath("/admin/settings");
  return { success: true };
}

/**
 * 2. IDENTITY OVERRIDE (ADMIN PROFILE)
 */
export async function updateAdminProfile(data: any) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      phone: data.phone,
      language: data.language,
      timezone: data.timezone,
    },
  });
  revalidatePath("/admin/settings");
  return { success: true };
}

/**
 * 3. MAINTENANCE PROTOCOL (PORTAL FREEZE)
 */
export async function toggleMaintenanceMode(enabled: boolean) {
  await ensureSuperAdmin();
  await prisma.systemSetting.upsert({
    where: { key: "MAINTENANCE_MODE" },
    update: { value: String(enabled) },
    create: {
      key: "MAINTENANCE_MODE",
      value: String(enabled),
      category: "SECURITY",
      type: "BOOLEAN",
    },
  });
  revalidatePath("/");
}

/**
 * 4. ACADEMIC CYCLE CONFIG (TERM DATES)
 */
export async function updateAcademicTerm(
  termName: string,
  startDate: string,
  endDate: string,
) {
  await auth();
  const data = JSON.stringify({ termName, startDate, endDate });
  await prisma.systemSetting.upsert({
    where: { key: "CURRENT_ACADEMIC_TERM" },
    update: { value: data },
    create: {
      key: "CURRENT_ACADEMIC_TERM",
      value: data,
      category: "ACADEMIC",
      type: "JSON",
    },
  });
  revalidatePath("/admin/settings");
}

/**
 * 5. REGISTRATION PROTOCOL (ONBOARDING TOGGLE)
 */
export async function togglePublicRegistration(enabled: boolean) {
  await ensureSuperAdmin();
  await prisma.systemSetting.upsert({
    where: { key: "ALLOW_PUBLIC_REGISTRATION" },
    update: { value: String(enabled) },
    create: {
      key: "ALLOW_PUBLIC_REGISTRATION",
      value: String(enabled),
      category: "SECURITY",
      type: "BOOLEAN",
    },
  });
  revalidatePath("/register");
}

/**
 * 6. GRADING THRESHOLD (MASTERY SCALE)
 */
export async function updateGradingThresholds(thresholds: {
  A: number;
  B: number;
  C: number;
}) {
  await auth();
  const data = JSON.stringify(thresholds);
  await prisma.systemSetting.upsert({
    where: { key: "GRADING_THRESHOLDS" },
    update: { value: data },
    create: {
      key: "GRADING_THRESHOLDS",
      value: data,
      category: "ACADEMIC",
      type: "JSON",
    },
  });
  revalidatePath("/admin/grades");
}

/**
 * 7. FINANCIAL NODE CONFIG (CURRENCY/TAX)
 */
export async function updateFinancialConfig(currency: string, lateFee: number) {
  await ensureSuperAdmin();
  const data = JSON.stringify({ currency, lateFee });
  await prisma.systemSetting.upsert({
    where: { key: "FINANCIAL_CONFIG" },
    update: { value: data },
    create: {
      key: "FINANCIAL_CONFIG",
      value: data,
      category: "FINANCE",
      type: "JSON",
    },
  });
  revalidatePath("/admin/finance");
}

/**
 * 8. SECURITY: UPDATE SYSTEM PASSWORD
 */
export async function updateAdminPassword(current: string, next: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const isMatch = await bcrypt.compare(current, user?.password || "");
  if (!isMatch) throw new Error("Current password incorrect.");

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: await bcrypt.hash(next, 10) },
  });
}

/**
 * 9. PURGE NOTIFICATION REGISTRY (DB CLEANUP)
 */
export async function purgeNotifications() {
  await ensureSuperAdmin();
  // Delete notifications older than 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await prisma.notification.deleteMany({
    where: { createdAt: { lt: thirtyDaysAgo } },
  });
}

/**
 * 10. TOGGLE SPIRITUAL KPI (PRAYER LOGS)
 */
export async function togglePrayerTracking(enabled: boolean) {
  await auth();
  await prisma.systemSetting.upsert({
    where: { key: "ENABLE_PRAYER_TRACKING" },
    update: { value: String(enabled) },
    create: {
      key: "ENABLE_PRAYER_TRACKING",
      value: String(enabled),
      category: "ACADEMIC",
      type: "BOOLEAN",
    },
  });
}

/**
 * 11. BRANDING OVERRIDE (LOGO/NAME)
 */
export async function updateBranding(name: string, logoUrl: string) {
  await ensureSuperAdmin();
  const data = JSON.stringify({ name, logoUrl });
  await prisma.systemSetting.upsert({
    where: { key: "BRANDING_DATA" },
    update: { value: data },
    create: {
      key: "BRANDING_DATA",
      value: data,
      category: "GENERAL",
      type: "JSON",
    },
  });
}

/**
 * 12. NOTIFICATION HANDSHAKE (AUTO-EMAIL)
 */
export async function toggleAutoEmail(enabled: boolean) {
  await ensureSuperAdmin();
  await prisma.systemSetting.upsert({
    where: { key: "AUTO_EMAIL_NOTIFICATIONS" },
    update: { value: String(enabled) },
    create: {
      key: "AUTO_EMAIL_NOTIFICATIONS",
      value: String(enabled),
      category: "GENERAL",
      type: "BOOLEAN",
    },
  });
}

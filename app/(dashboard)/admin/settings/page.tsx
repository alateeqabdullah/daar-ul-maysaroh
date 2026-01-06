// src/app/(dashboard)/admin/settings/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SystemSettingsClient from "@/components/admin/system-settings-client";

export default async function SystemSettingsPage() {
  const session = await auth();

  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  const rawSettings = await prisma.systemSetting.findMany();

  const settingsMap = rawSettings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);

  // Helper to convert DB strings to booleans
  const toBool = (val: string | undefined, fallback: boolean) =>
    val === undefined ? fallback : val === "true";

  const initialSettings = {
    // General
    siteName: settingsMap.siteName || "MadrasahPro",
    siteDescription:
      settingsMap.siteDescription || "Islamic Education Platform",
    contactEmail: settingsMap.contactEmail || "admin@example.com",
    contactPhone: settingsMap.contactPhone || "",
    timezone: settingsMap.timezone || "UTC",
    dateFormat: settingsMap.dateFormat || "MM/DD/YYYY",
    language: settingsMap.language || "en",

    // Email (Optional fields)
    smtpHost: settingsMap.smtpHost,
    smtpPort: settingsMap.smtpPort,
    smtpUsername: settingsMap.smtpUsername,
    emailFrom: settingsMap.emailFrom,

    // Notifications (Must be boolean)
    emailNotifications: toBool(settingsMap.emailNotifications, true),
    pushNotifications: toBool(settingsMap.pushNotifications, false),
    newUserAlerts: toBool(settingsMap.newUserAlerts, true),
    paymentAlerts: toBool(settingsMap.paymentAlerts, true),
    attendanceAlerts: toBool(settingsMap.attendanceAlerts, true),

    // Security
    requireEmailVerification: toBool(
      settingsMap.requireEmailVerification,
      true
    ),
    requireStrongPasswords: toBool(settingsMap.requireStrongPasswords, true),
    sessionTimeout: settingsMap.sessionTimeout || "24",
    maxLoginAttempts: settingsMap.maxLoginAttempts || "5",

    // Academic
    academicYear: settingsMap.academicYear || "2023-2024",
    defaultClassCapacity: settingsMap.defaultClassCapacity || "25",
    attendanceThreshold: settingsMap.attendanceThreshold || "80",
    gradingScale: settingsMap.gradingScale || "percentage",

    // Financial
    currency: settingsMap.currency || "USD",
    paymentGateway: settingsMap.paymentGateway || "stripe",
    taxRate: settingsMap.taxRate || "0",
    lateFeeAmount: settingsMap.lateFeeAmount || "0",
    lateFeeDays: settingsMap.lateFeeDays || "7",

    // Status
    maintenanceMode: toBool(settingsMap.maintenanceMode, false),
    requireApproval: toBool(settingsMap.requireApproval, true),
    enableRegistration: toBool(settingsMap.enableRegistration, true),
  };

  return <SystemSettingsClient initialSettings={initialSettings} />;
}

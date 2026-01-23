import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SystemSettingsClient from "@/components/admin/system-settings-client";

export const metadata = {
  title: "System Settings | Admin",
  description: "Configure global application settings",
};

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

  // Helper to convert DB strings to booleans safely
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
    language: settingsMap.language || "en",

    // Email / SMTP (Sensitive)
    smtpHost: settingsMap.smtpHost || "",
    smtpPort: settingsMap.smtpPort || "587",
    emailFrom: settingsMap.emailFrom || "noreply@madrasahpro.com",

    // Notifications
    emailNotifications: toBool(settingsMap.emailNotifications, true),
    pushNotifications: toBool(settingsMap.pushNotifications, false),
    newUserAlerts: toBool(settingsMap.newUserAlerts, true),
    paymentAlerts: toBool(settingsMap.paymentAlerts, true),

    // Security
    requireEmailVerification: toBool(
      settingsMap.requireEmailVerification,
      true
    ),
    requireStrongPasswords: toBool(settingsMap.requireStrongPasswords, true),
    sessionTimeout: settingsMap.sessionTimeout || "24",
    maxLoginAttempts: settingsMap.maxLoginAttempts || "5",

    // Academic
    academicYear:
      settingsMap.academicYear || new Date().getFullYear().toString(),
    defaultClassCapacity: settingsMap.defaultClassCapacity || "25",
    attendanceThreshold: settingsMap.attendanceThreshold || "80",

    // Financial
    currency: settingsMap.currency || "USD",
    taxRate: settingsMap.taxRate || "0",
    lateFeeAmount: settingsMap.lateFeeAmount || "0",

    // Status
    maintenanceMode: toBool(settingsMap.maintenanceMode, false),
    enableRegistration: toBool(settingsMap.enableRegistration, true),
  };

  return <SystemSettingsClient initialSettings={initialSettings} />;
}

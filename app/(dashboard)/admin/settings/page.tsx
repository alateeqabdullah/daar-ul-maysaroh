// src/app/(dashboard)/admin/settings/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SystemSettingsClient from "@/components/admin/system-settings-client";

export default async function SystemSettingsPage() {
  const session = await auth();

  // 1. Authentication Check
  if (!session) {
    redirect("/login");
  }

  // 2. Authorization Check
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // 3. Data Fetching (Placeholder for future database-driven settings)
  let settings = null;
  try {
    // If you have a settings table, you would fetch it here:
    // settings = await prisma.systemSettings.findFirst();

    // For now, we pass the session or initial empty config
    settings = {
      institutionName: "Islamic Institute",
      timezone: "UTC",
      currency: "USD",
    };
  } catch (error) {
    console.error("Error loading system settings:", error);
  }

  return (
    <SystemSettingsClient
      initialSettings={settings ? JSON.parse(JSON.stringify(settings)) : null}
    />
  );
}

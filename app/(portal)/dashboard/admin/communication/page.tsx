import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CommunicationTerminalClient from "@/components/admin/communication-terminal-client";

export default async function CommunicationPage() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    redirect("/login");

  // Parallel Node Gathering
  const [announcementsRaw, messagesRaw, usersRaw] = await Promise.all([
    prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: { select: { name: true, image: true } } },
    }),
    prisma.message.findMany({
      where: { receiverId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { sender: { select: { name: true, image: true } } },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true, role: true, email: true },
    }),
  ]);

  // Next.js 16 Turbo Serialization
  const announcements = JSON.parse(JSON.stringify(announcementsRaw));
  const messages = JSON.parse(JSON.stringify(messagesRaw));
  const users = JSON.parse(JSON.stringify(usersRaw));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8">
      <CommunicationTerminalClient
        initialAnnouncements={announcements}
        initialMessages={messages}
        users={users}
      />
    </div>
  );
}

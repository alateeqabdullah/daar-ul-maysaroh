import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CommunicationTerminalClient from "@/components/admin/communication-terminal-client";

export default async function CommunicationPage() {
  const session = await auth();
  if (!session || !session.user?.email) redirect("/login");

  // Parallel Handshake for Node Discovery
  const [announcementsRaw, messagesRaw, usersRaw, currentUserRaw] = await Promise.all([
    prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: { select: { name: true, image: true } } }
    }),
    prisma.message.findMany({
      where: { receiverId: session.user.id || undefined, parentMessageId: null },
      orderBy: { createdAt: "desc" },
      include: { sender: { select: { name: true, image: true } } }
    }),
    prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true, role: true, email: true, image: true }
    }),
    // FIX: Explicitly fetch the current user's DB record
    prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, image: true }
    })
  ]);

  if (!currentUserRaw) redirect("/login");

  // Turbo-Safe Serialization
  const announcements = JSON.parse(JSON.stringify(announcementsRaw));
  const messages = JSON.parse(JSON.stringify(messagesRaw));
  const users = JSON.parse(JSON.stringify(usersRaw));
  const currentUser = JSON.parse(JSON.stringify(currentUserRaw));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black p-0 md:p-8">
      <CommunicationTerminalClient 
        initialAnnouncements={announcements} 
        initialMessages={messages}
        users={users}
        currentUser={currentUser} // Passed to client
      />
    </div>
  );
}
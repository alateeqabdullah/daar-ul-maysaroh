import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // Update path if needed (e.g. @/auth)
import { prisma } from "@/lib/prisma";
import CommunicationClient from "@/components/teacher/communication-client";
import { Conversation, ChatUser } from "@/types/communication";

export const metadata = {
  title: "Messages | Teacher",
  description: "Chat with students and parents",
};

export default async function CommunicationPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: { select: { id: true } } }
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");

  // 1. Fetch Students & Parents associated with this Teacher
  // Find students in classes taught by this teacher
  const students = await prisma.student.findMany({
    where: {
      enrollments: {
        some: { class: { teacherId: dbUser.teacherProfile.id, isActive: true } }
      }
    },
    select: {
      user: { select: { id: true, name: true, image: true, role: true } },
      parent: { select: { user: { select: { id: true, name: true, image: true, role: true } } } }
    }
  });

  // 2. Fetch recent messages to build conversation list
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: dbUser.id }, { receiverId: dbUser.id }]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { id: true, name: true, image: true } },
      receiver: { select: { id: true, name: true, image: true } }
    }
  });

  // 3. Build Contacts List (For the "New Chat" modal)
  const contacts: ChatUser[] = [];
  
  students.forEach(s => {
    // Add Student
    contacts.push({
      id: s.user.id,
      name: s.user.name,
      image: s.user.image,
      role: "STUDENT"
    });
    
    // Add Parent (if exists)
    if(s.parent?.user) {
      contacts.push({
        id: s.parent.user.id,
        name: s.parent.user.name,
        image: s.parent.user.image,
        role: "PARENT"
      });
    }
  });

  // 4. Transform into Conversations List
  const conversationMap = new Map<string, Conversation>();

  // Optional: Pre-fill conversations with all contacts (showing "No messages yet")
  // Or you can skip this loop if you only want to show existing chats.
  contacts.forEach(contact => {
    conversationMap.set(contact.id, {
      id: contact.id,
      user: contact,
      lastMessage: "", // Empty string indicates no real message yet
      timestamp: "",
      unreadCount: 0
    });
  });

  // Update with real message data
  messages.forEach(m => {
    const otherUser = m.senderId === dbUser.id ? m.receiver : m.sender;
    const existing = conversationMap.get(otherUser.id);
    
    // If conversation exists (from contact list) or needs to be created (if contact wasn't in list)
    if (existing) {
       // Only update metadata if it's the most recent message processed so far
       // (Since we iterate messages desc, the first one we hit is the latest)
       if (!existing.timestamp || new Date(m.createdAt) > new Date(existing.timestamp)) {
          existing.lastMessage = m.content;
          existing.timestamp = m.createdAt.toISOString();
       }
       
       // Count unread messages
       if (!m.isRead && m.senderId !== dbUser.id) {
         existing.unreadCount++;
       }
    } else {
        // Handle case where message exists but user isn't in current class list (e.g. old student)
        conversationMap.set(otherUser.id, {
            id: otherUser.id,
            user: { ...otherUser, role: "STUDENT" }, // Defaulting role if unknown
            lastMessage: m.content,
            timestamp: m.createdAt.toISOString(),
            unreadCount: (!m.isRead && m.senderId !== dbUser.id) ? 1 : 0
        });
    }
  });

  // Convert map to array and sort by date
  // Filter out contacts with no messages unless you want them to appear in the main list
  const conversations = Array.from(conversationMap.values())
    .filter(c => c.timestamp !== "") // Only show active chats
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <CommunicationClient 
      initialConversations={conversations} 
      contacts={contacts} // <--- THIS WAS MISSING
      currentUserId={dbUser.id} 
    />
  );
}
export interface ChatUser {
  id: string;
  name: string;
  image: string | null;
  role: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string; // ISO
  isRead: boolean;
  senderName: string;
  senderImage: string | null;
}

export interface Conversation {
  id: string; // User ID of the other person
  user: ChatUser;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}
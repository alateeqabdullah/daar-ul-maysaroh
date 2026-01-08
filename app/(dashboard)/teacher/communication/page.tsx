// src/app/(dashboard)/teacher/communication/page.tsx
"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Search,
  Paperclip,
  Smile,
  MoreVertical,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: "student" | "parent" | "group";
}

export default function CommunicationPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Ahmed Khan",
      lastMessage: "Can you explain this concept again?",
      timestamp: "10:30 AM",
      unread: 2,
      type: "student",
    },
    {
      id: "2",
      name: "Parent Group - Quran 101",
      lastMessage: "Reminder: Parent meeting tomorrow",
      timestamp: "Yesterday",
      unread: 0,
      type: "group",
    },
    {
      id: "3",
      name: "Fatima Ali",
      lastMessage: "Submitted my assignment",
      timestamp: "2 days ago",
      unread: 0,
      type: "student",
    },
    {
      id: "4",
      name: "Mohamed Hassan (Parent)",
      lastMessage: "Thank you for the update",
      timestamp: "3 days ago",
      unread: 0,
      type: "parent",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Ahmed Khan",
      content: "Assalamu alaikum teacher",
      timestamp: "10:25 AM",
      unread: false,
    },
    {
      id: "2",
      sender: "You",
      content: "Wa alaikum assalam. How can I help you?",
      timestamp: "10:26 AM",
      unread: false,
    },
    {
      id: "3",
      sender: "Ahmed Khan",
      content: "Can you explain the tajweed rule for noon saakin again?",
      timestamp: "10:28 AM",
      unread: false,
    },
    {
      id: "4",
      sender: "Ahmed Khan",
      content: "I'm having trouble with the idgham rules",
      timestamp: "10:30 AM",
      unread: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unread: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Communication
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Communicate with students and parents
          </p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <MessageSquare className="h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="students" className="flex-1">
                  Students
                </TabsTrigger>
                <TabsTrigger value="parents" className="flex-1">
                  Parents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-2">
                  {conversations.map((convo) => (
                    <div
                      key={convo.id}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-primary text-white">
                            {convo.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold truncate">
                              {convo.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {convo.timestamp}
                            </span>
                          </div>
                          <p className="truncate text-sm text-gray-600">
                            {convo.lastMessage}
                          </p>
                        </div>
                      </div>
                      {convo.unread > 0 && (
                        <Badge className="ml-2 bg-red-500">
                          {convo.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-white">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Ahmed Khan</CardTitle>
                  <CardDescription>Student • Quran 101</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] space-y-4 overflow-y-auto p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === "You"
                        ? "bg-gradient-primary text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{message.sender}</span>
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                      {message.unread && message.sender !== "You" && (
                        <Badge className="bg-red-500 text-xs">New</Badge>
                      )}
                    </div>
                    <p className="mt-1">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-gradient-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common communication tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Users className="h-6 w-6" />
              <span>Class Announcement</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <MessageSquare className="h-6 w-6" />
              <span>Parent Update</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Send className="h-6 w-6" />
              <span>Assignment Reminder</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Users className="h-6 w-6" />
              <span>Group Message</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Mic,
  Paperclip,
  Check,
  CheckCheck,
  ArrowLeft,
  Plus,
  X,
  MessageSquare,
} from "lucide-react";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; // NEW: For multi-line chat input

// Utilities
import { getInitials, cn } from "@/lib/utils";
import { Conversation, ChatMessage, ChatUser } from "@/types/communication";
import { toast } from "sonner";
import { format } from "date-fns";
import { ScrollArea } from "@radix-ui/react-scroll-area";

// --- ANIMATION VARIANTS ---
const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};
const chatItemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const messageVariants = {
  hidden: { y: 10, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

interface Props {
  initialConversations: Conversation[];
  contacts: ChatUser[]; // List of all available people (Students/Parents)
  currentUserId: string;
  defaultSelectedId?: string; // For deep linking
}

export default function CommunicationClient({
  initialConversations,
  contacts,
  currentUserId,
  defaultSelectedId,
}: Props) {
  // State
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // New Chat Modal State
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [newChatQuery, setNewChatQuery] = useState("");

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null); // UPDATED: Ref for Textarea

  // --- AUTO SELECT CHAT FROM URL ---
  useEffect(() => {
    if (defaultSelectedId) {
      const target = conversations.find((c) => c.id === defaultSelectedId);
      if (target) {
        setSelectedChat(target);
      } else {
        const contact = contacts.find((c) => c.id === defaultSelectedId);
        if (contact) startNewChat(contact);
      }
    }
  }, [defaultSelectedId, conversations, contacts]);

  // --- SCROLL TO BOTTOM LOGIC ---
  // Automatically scrolls whenever messages change or a new chat is selected
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChat]);

  // --- FILTER LOGIC ---
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const matchesSearch = c.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "ALL" || c.user.role === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [conversations, searchQuery, activeTab]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(newChatQuery.toLowerCase())
    );
  }, [contacts, newChatQuery]);

  // --- START NEW CHAT ---
  const startNewChat = (contact: ChatUser) => {
    const existing = conversations.find((c) => c.id === contact.id);

    if (existing) {
      setSelectedChat(existing);
    } else {
      const newConv: Conversation = {
        id: contact.id,
        user: contact,
        lastMessage: "Start a conversation",
        timestamp: new Date().toISOString(),
        unreadCount: 0,
      };
      setConversations([newConv, ...conversations]);
      setSelectedChat(newConv);
    }
    setIsNewChatOpen(false);
  };

  // --- LOAD MESSAGES ---
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/teacher/communication?userId=${selectedChat.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setMessages(data);

          // Update URL
          window.history.pushState(
            null,
            "",
            `/teacher/communication?userId=${selectedChat.id}`
          );

          // Mark read locally
          setConversations((prev) =>
            prev.map((c) =>
              c.id === selectedChat.id ? { ...c, unreadCount: 0 } : c
            )
          );

          // API Mark Read
          if (selectedChat.unreadCount > 0) {
            fetch("/api/teacher/communication", {
              method: "POST",
              body: JSON.stringify({
                action: "MARK_READ",
                data: { senderId: selectedChat.id },
              }),
            });
          }
        }
      } catch (e) {
        toast.error("Connection error");
      } finally {
        setIsLoading(false);
        // Focus input after loading
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  // --- SEND MESSAGE ---
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    const tempId = Date.now().toString();
    const now = new Date().toISOString();
    const textToSend = inputText;

    const newMessage: ChatMessage = {
      id: tempId,
      senderId: currentUserId,
      content: textToSend,
      createdAt: now,
      isRead: false,
      senderName: "Me",
      senderImage: null,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    // Scroll handled by useEffect

    // Move conversation to top
    setConversations((prev) => {
      const others = prev.filter((c) => c.id !== selectedChat.id);
      const updated = {
        ...selectedChat,
        lastMessage: textToSend,
        timestamp: now,
      };
      return [updated, ...others];
    });

    try {
      await fetch("/api/teacher/communication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SEND",
          data: { receiverId: selectedChat.id, content: textToSend },
        }),
      });
    } catch {
      toast.error("Failed to deliver");
    }
  };

  // Handle Enter key in Textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; msgs: ChatMessage[] }[] = [];
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.date === date) {
        lastGroup.msgs.push(msg);
      } else {
        groups.push({ date, msgs: [msg] });
      }
    });
    return groups;
  }, [messages]);

  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] flex gap-6 pb-6">
      {/* --- LEFT SIDEBAR --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className={cn(
          "flex flex-col gap-4 w-full md:w-[380px] shrink-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300",
          selectedChat ? "hidden md:flex" : "flex"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 pb-2 space-y-4 bg-white/40 dark:bg-slate-900/40 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex justify-between items-center px-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Messages
            </h1>
            <Button
              size="icon"
              className="bg-indigo-600 rounded-full h-8 w-8 hover:bg-indigo-700 text-white shadow-md"
              onClick={() => setIsNewChatOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search messages..."
              className="pl-10 h-11 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="ALL"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl h-10">
              <TabsTrigger
                value="ALL"
                className="rounded-lg text-xs font-medium"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="STUDENT"
                className="rounded-lg text-xs font-medium"
              >
                Students
              </TabsTrigger>
              <TabsTrigger
                value="PARENT"
                className="rounded-lg text-xs font-medium"
              >
                Parents
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {filteredConversations.map((chat) => (
              <motion.div
                key={chat.id}
                variants={chatItemVariants}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 group border border-transparent",
                  selectedChat?.id === chat.id
                    ? "bg-indigo-600 shadow-lg shadow-indigo-500/20 border-indigo-500"
                    : "hover:bg-white hover:shadow-sm dark:hover:bg-slate-800"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-900 shadow-sm">
                    <AvatarImage src={chat.user.image || undefined} />
                    <AvatarFallback
                      className={cn(
                        "text-sm font-bold",
                        selectedChat?.id === chat.id
                          ? "text-indigo-700 bg-white"
                          : "bg-indigo-50 text-indigo-600"
                      )}
                    >
                      {getInitials(chat.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {chat.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-rose-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4
                      className={cn(
                        "font-bold text-sm truncate",
                        selectedChat?.id === chat.id
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      )}
                    >
                      {chat.user.name}
                    </h4>
                    <span
                      className={cn(
                        "text-[10px]",
                        selectedChat?.id === chat.id
                          ? "text-indigo-200"
                          : "text-slate-400"
                      )}
                    >
                      {chat.timestamp
                        ? format(new Date(chat.timestamp), "h:mm a")
                        : ""}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-xs truncate flex items-center",
                      selectedChat?.id === chat.id
                        ? "text-indigo-100"
                        : "text-slate-500",
                      chat.unreadCount > 0 &&
                        selectedChat?.id !== chat.id &&
                        "font-bold text-slate-800 dark:text-slate-200"
                    )}
                  >
                    {chat.user.role === "PARENT" && (
                      <Badge
                        variant="outline"
                        className="mr-1 h-4 px-1 text-[9px] border-emerald-200 text-emerald-600 bg-emerald-50"
                      >
                        PARENT
                      </Badge>
                    )}
                    {chat.lastMessage}
                  </p>
                </div>
              </motion.div>
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm opacity-60">
                No conversations found
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.div>

      {/* --- RIGHT SIDE: CHAT WINDOW --- */}
      <AnimatePresence mode="wait">
        {selectedChat ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Chat Header */}
            <div className="h-20 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden -ml-2"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-800 shadow-sm cursor-pointer">
                  <AvatarImage src={selectedChat.user.image || undefined} />
                  <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white font-bold">
                    {getInitials(selectedChat.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedChat.user.name}
                    <Badge variant="secondary" className="text-[9px] h-4 px-1.5">
                      {selectedChat.user.role}
                    </Badge>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Online
                  </div>
                </div>
              </div>
              <div className="flex gap-1 text-slate-400">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                >
                  <Phone className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                >
                  <Video className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-slate-900 dark:hover:text-white rounded-full"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Block User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-black/20"
              ref={scrollRef}
            >
              {groupedMessages.map((group, i) => (
                <div key={i} className="space-y-6">
                  <div className="flex justify-center sticky top-0 z-10">
                    <span className="bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                      {group.date}
                    </span>
                  </div>
                  {group.msgs.map((msg) => {
                    const isMe = msg.senderId === currentUserId;
                    return (
                      <motion.div
                        key={msg.id}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                          "flex w-full",
                          isMe ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] p-3 px-4 rounded-2xl text-sm shadow-sm relative group transition-all",
                            isMe
                              ? "bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm"
                              : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm"
                          )}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                          <div
                            className={cn(
                              "text-[10px] mt-1 flex justify-end gap-1 items-center opacity-70",
                              isMe ? "text-indigo-100" : "text-slate-400"
                            )}
                          >
                            {format(new Date(msg.createdAt), "h:mm a")}
                            {isMe &&
                              (msg.isRead ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-end gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-3xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-indigo-600 rounded-full h-10 w-10 shrink-0"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                <Textarea
                  ref={inputRef}
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-sm py-3 max-h-32 min-h-11 resize-none placeholder:text-slate-400 shadow-none scrollbar-hide"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />

                {inputText ? (
                  <Button
                    size="icon"
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 h-10 w-10 shadow-md shrink-0"
                    onClick={(e) => handleSend(e)}
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                ) : (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 rounded-full h-10 w-10"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          // EMPTY STATE
          <div className="flex-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
            <div className="w-24 h-24 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-slate-800 dark:to-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <MessageSquare className="h-10 w-10 text-indigo-300 opacity-80" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
              Select a Conversation
            </h3>
            <p className="text-sm max-w-xs text-center mt-2 opacity-80">
              Or click the + button to start a new chat.
            </p>
            <Button
              onClick={() => setIsNewChatOpen(true)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Start New Chat
            </Button>
          </div>
        )}
      </AnimatePresence>

      {/* --- NEW CHAT MODAL --- */}
      <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
          <DialogHeader className="p-4 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle>New Message</DialogTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search people..."
                value={newChatQuery}
                onChange={(e) => setNewChatQuery(e.target.value)}
                className="pl-9 h-10 bg-slate-50 dark:bg-slate-900 border-transparent focus:bg-white focus:border-indigo-500"
              />
            </div>
          </DialogHeader>
          <div className="h-[400px] overflow-y-auto p-2">
            <p className="text-xs font-bold text-slate-500 uppercase px-2 mb-2">
              Contacts
            </p>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => startNewChat(c)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <Avatar className="h-10 w-10 border border-slate-100">
                    <AvatarImage src={c.image || undefined} />
                    <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      {c.name}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {c.role.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 py-8">
                No results found.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
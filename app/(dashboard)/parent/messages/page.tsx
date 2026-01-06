// src/app/(dashboard)/parent/messages/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  Search, 
  Paperclip,
  Smile,
  Image as ImageIcon,
  File,
  Video,
  User,
  Check,
  CheckCheck,
  Clock,
  Filter,
  MoreVertical,
  Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInitials } from '@/lib/utils'
import { toast } from 'sonner'

interface Message {
  id: string
  sender: 'PARENT' | 'TEACHER' | 'ADMIN' | 'SYSTEM'
  senderName: string
  senderRole: string
  content: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    role: string
    avatar?: string
    childName?: string
  }
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export default function ParentMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Mock data - Replace with API calls
        const mockConversations: Conversation[] = [
          {
            id: '1',
            participant: {
              id: 't1',
              name: 'Sheikh Ahmed Al-Qari',
              role: 'Quran Teacher',
              childName: 'Omar Ahmed'
            },
            lastMessage: 'Omar has improved his tajweed significantly this week.',
            lastMessageTime: '2 hours ago',
            unreadCount: 2
          },
          {
            id: '2',
            participant: {
              id: 't2',
              name: 'Ustadh Muhammad Ali',
              role: 'Fiqh Teacher',
              childName: 'Aisha Ahmed'
            },
            lastMessage: 'Please remind Aisha about the upcoming fiqh test.',
            lastMessageTime: '1 day ago',
            unreadCount: 0
          },
          {
            id: '3',
            participant: {
              id: 'a1',
              name: 'Admin Office',
              role: 'Administration'
            },
            lastMessage: 'February tuition fee reminder.',
            lastMessageTime: '3 days ago',
            unreadCount: 1
          },
          {
            id: '4',
            participant: {
              id: 't3',
              name: 'Ustadha Fatima Zahra',
              role: 'Arabic Teacher',
              childName: 'Omar Ahmed'
            },
            lastMessage: 'Great progress in Arabic vocabulary!',
            lastMessageTime: '1 week ago',
            unreadCount: 0
          }
        ]

        const mockMessages: Message[] = [
          {
            id: 'm1',
            sender: 'TEACHER',
            senderName: 'Sheikh Ahmed Al-Qari',
            senderRole: 'Quran Teacher',
            content: 'Assalamu alaikum! I wanted to update you on Omar\'s Quran memorization progress.',
            timestamp: '10:30 AM',
            read: true
          },
          {
            id: 'm2',
            sender: 'TEACHER',
            senderName: 'Sheikh Ahmed Al-Qari',
            senderRole: 'Quran Teacher',
            content: 'He has successfully memorized Surah An-Naba and is now working on Surah An-Naziat.',
            timestamp: '10:32 AM',
            read: true
          },
          {
            id: 'm3',
            sender: 'PARENT',
            senderName: 'You',
            senderRole: 'Parent',
            content: 'Wa alaikum assalam! That\'s wonderful news, ma sha Allah. How is his tajweed?',
            timestamp: '11:15 AM',
            read: true
          },
          {
            id: 'm4',
            sender: 'TEACHER',
            senderName: 'Sheikh Ahmed Al-Qari',
            senderRole: 'Quran Teacher',
            content: 'His tajweed has improved significantly. He\'s applying the rules of ghunnah and qalqalah correctly.',
            timestamp: '2 hours ago',
            read: false
          },
          {
            id: 'm5',
            sender: 'TEACHER',
            senderName: 'Sheikh Ahmed Al-Qari',
            senderRole: 'Quran Teacher',
            content: 'I recommend increasing his revision time to 30 minutes daily for better retention.',
            timestamp: '2 hours ago',
            read: false,
            attachments: ['Revision_Schedule.pdf']
          }
        ]

        setConversations(mockConversations)
        setSelectedConversation(mockConversations[0]?.id || '')
        setMessages(mockMessages)
      } catch (error) {
        toast.error('Failed to load messages')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const selectedConversationData = conversations.find(c => c.id === selectedConversation)

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.participant.childName && conv.participant.childName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      sender: 'PARENT',
      senderName: 'You',
      senderRole: 'Parent',
      content: newMessage,
      timestamp: 'Just now',
      read: true
    }

    setMessages([...messages, newMsg])
    setNewMessage('')
    
    // In production: Send to API
    toast.success('Message sent')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Communicate with teachers and administration
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
              <Badge variant="outline" className="gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </Badge>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full rounded-none border-b px-4">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="teachers" className="flex-1">Teachers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="m-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`flex w-full items-start gap-3 border-b p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedConversation === conversation.id
                          ? 'bg-purple-50 dark:bg-purple-900/20'
                          : ''
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {getInitials(conversation.participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="truncate font-medium">
                            {conversation.participant.name}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                          {conversation.participant.role}
                        </p>
                        {conversation.participant.childName && (
                          <p className="text-xs text-gray-500">
                            Regarding: {conversation.participant.childName}
                          </p>
                        )}
                        <p className="mt-1 truncate text-sm text-gray-600 dark:text-gray-400">
                          {conversation.lastMessage}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {conversation.lastMessageTime}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {selectedConversationData ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {getInitials(selectedConversationData.participant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedConversationData.participant.name}
                      </CardTitle>
                      <CardDescription>
                        {selectedConversationData.participant.role}
                        {selectedConversationData.participant.childName && (
                          <span> • Regarding: {selectedConversationData.participant.childName}</span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-[500px] overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender === 'PARENT' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={
                            message.sender === 'PARENT'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-purple-100 text-purple-600'
                          }>
                            {getInitials(message.senderName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[70%] ${
                          message.sender === 'PARENT' ? 'text-right' : ''
                        }`}>
                          <div className={`rounded-2xl px-4 py-2 ${
                            message.sender === 'PARENT'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                          }`}>
                            <p>{message.content}</p>
                            
                            {/* Attachments */}
                            {message.attachments && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 rounded-lg bg-white/20 p-2"
                                  >
                                    <File className="h-4 w-4" />
                                    <span className="text-sm">{attachment}</span>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <span>{message.timestamp}</span>
                            {message.sender === 'PARENT' && (
                              message.read ? (
                                <CheckCheck className="h-3 w-3 text-blue-500" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="mb-2 flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <File className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="min-h-[60px]"
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-primary h-[60px] w-[60px]"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-[600px] flex-col items-center justify-center p-8">
              <MessageSquare className="h-16 w-16 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No conversation selected</h3>
              <p className="mt-2 text-center text-gray-500">
                Select a conversation from the list to start messaging
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
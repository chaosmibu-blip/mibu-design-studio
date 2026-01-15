import { useState } from "react";
import { Send, User, Phone, MoreVertical, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  role: 'member' | 'planner';
  lastMessage: string;
  unreadCount: number;
  isOnline: boolean;
}

// Mock data
const mockContacts: ChatContact[] = [
  {
    id: "group",
    name: "團員群組",
    avatar: "👥",
    role: "member",
    lastMessage: "我們晚上幾點集合？",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "planner",
    name: "旅程策劃師 - 小王",
    avatar: "🧑‍💼",
    role: "planner",
    lastMessage: "已為您安排好明天的行程",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "member1",
    name: "小明",
    avatar: "😎",
    role: "member",
    lastMessage: "等等見！",
    unreadCount: 0,
    isOnline: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "planner",
    senderName: "旅程策劃師 - 小王",
    senderAvatar: "🧑‍💼",
    content: "大家好！我是負責這次旅程的策劃師小王，有任何問題都可以問我哦~",
    timestamp: new Date(Date.now() - 3600000),
    isMe: false,
  },
  {
    id: "2",
    senderId: "me",
    senderName: "我",
    senderAvatar: "😊",
    content: "你好！請問明天的行程有什麼建議嗎？",
    timestamp: new Date(Date.now() - 3000000),
    isMe: true,
  },
  {
    id: "3",
    senderId: "planner",
    senderName: "旅程策劃師 - 小王",
    senderAvatar: "🧑‍💼",
    content: "建議早上先去九份老街，人比較少。下午再去十分瀑布，傍晚可以在十分放天燈！",
    timestamp: new Date(Date.now() - 2400000),
    isMe: false,
  },
  {
    id: "4",
    senderId: "member1",
    senderName: "小明",
    senderAvatar: "😎",
    content: "聽起來不錯耶！我們幾點出發？",
    timestamp: new Date(Date.now() - 1800000),
    isMe: false,
  },
];

const ChatRoom = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
  };

  if (activeChat === null) {
    // Contact list view
    return (
      <div className="space-y-2 animate-fade-in">
        {mockContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setActiveChat(contact.id)}
            className="w-full flex items-center gap-3 p-4 bg-card rounded-2xl border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                contact.role === 'planner' ? 'bg-primary/20' : 'bg-secondary'
              }`}>
                {contact.avatar}
              </div>
              {contact.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{contact.name}</p>
                {contact.role === 'planner' && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                    策劃師
                  </span>
                )}
              </div>
              <p className="text-sm text-muted line-clamp-1">{contact.lastMessage}</p>
            </div>
            {contact.unreadCount > 0 && (
              <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {contact.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Chat view
  const currentContact = mockContacts.find(c => c.id === activeChat);
  
  return (
    <div className="flex flex-col h-[calc(100vh-220px)] animate-fade-in">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 bg-card rounded-t-2xl border border-border">
        <button 
          onClick={() => setActiveChat(null)}
          className="text-muted hover:text-foreground transition-colors"
        >
          ←
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-primary/20">
          {currentContact?.avatar}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{currentContact?.name}</p>
          <p className="text-xs text-green-500">線上</p>
        </div>
        <Button size="icon" variant="ghost">
          <Phone className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.isMe ? 'flex-row-reverse' : ''}`}
          >
            {!message.isMe && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-card">
                {message.senderAvatar}
              </div>
            )}
            <div className={`max-w-[70%] ${message.isMe ? 'items-end' : 'items-start'}`}>
              {!message.isMe && (
                <p className="text-xs text-muted mb-1">{message.senderName}</p>
              )}
              <div className={`px-4 py-2 rounded-2xl ${
                message.isMe 
                  ? 'bg-primary text-primary-foreground rounded-br-sm' 
                  : 'bg-card border border-border rounded-bl-sm'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-muted mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-card rounded-b-2xl border border-t-0 border-border">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Smile className="w-5 h-5" />
          </Button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="輸入訊息..."
            className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button size="icon" className="rounded-full bg-primary">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

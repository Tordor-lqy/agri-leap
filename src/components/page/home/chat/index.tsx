import { useState } from "react";
import {
  Phone,
  Search,
  Send,
  Paperclip,
  Mic,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Chatbox from "./chat-box";
import ContactBox from "./contact-box";
import EmojiInputPopover from "./emoji-input-popover";

const WeChatInterface = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  // 模拟联系人数据
  const contacts = [
    {
      id: 1,
      name: "张小明",
      avatar: "/api/placeholder/40/40",
      lastMessage: "今天天气不错啊",
      time: "14:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "李美丽",
      avatar: "/api/placeholder/40/40",
      lastMessage: "周末一起看电影吧",
      time: "13:45",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "王大力",
      avatar: "/api/placeholder/40/40",
      lastMessage: "好的，没问题",
      time: "12:20",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "刘小花",
      avatar: "/api/placeholder/40/40",
      lastMessage: "谢谢你的帮助！",
      time: "昨天",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "赵小刚",
      avatar: "/api/placeholder/40/40",
      lastMessage: "项目进度如何了？",
      time: "11:15",
      unread: 3,
      online: true,
    },
    {
      id: 6,
      name: "钱小红",
      avatar: "/api/placeholder/40/40",
      lastMessage: "记得取快递哦",
      time: "10:40",
      unread: 0,
      online: false,
    },
    {
      id: 7,
      name: "孙小美",
      avatar: "/api/placeholder/40/40",
      lastMessage: "晚上一起吃饭吧",
      time: "09:25",
      unread: 1,
      online: true,
    },
    {
      id: 8,
      name: "周大勇",
      avatar: "/api/placeholder/40/40",
      lastMessage: "周末加班安排好了",
      time: "昨天",
      unread: 2,
      online: true,
    },
    {
      id: 9,
      name: "吴小莉",
      avatar: "/api/placeholder/40/40",
      lastMessage: "收到新文件了吗？",
      time: "前天",
      unread: 0,
      online: false,
    },
    {
      id: 10,
      name: "郑小康",
      avatar: "/api/placeholder/40/40",
      lastMessage: "这个方案不错",
      time: "上周五",
      unread: 1,
      online: true,
    },
  ];

  // 模拟聊天消息数据
  const chatMessages = [
    {
      id: 1,
      sender: "other",
      content: "你好！最近怎么样？",
      time: "14:25",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      sender: "me",
      content: "还不错，工作挺忙的",
      time: "14:26",
    },
    {
      id: 3,
      sender: "other",
      content: "今天天气不错啊，要不要出去走走？",
      time: "14:30",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 4,
      sender: "me",
      content: "好主意！下午有时间",
      time: "14:31",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // 这里可以添加发送消息的逻辑
      console.log("发送消息:", message);
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-0 border-0 md:w-80 md:border-r border-primary-foreground/50 overflow-hidden transition-all duration-300">
        {/* 中间联系人列表 */}
        <div className="flex flex-col">
          {/* 搜索栏 */}
          <div className="p-4 border-b border-r border-primary-foreground/50 h-16">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
              <Input placeholder="搜索联系人或聊天记录" className="pl-10" />
            </div>
          </div>

          {/* 联系人列表 */}
          <ScrollArea className="flex-1 overflow-y-scroll max-h-[calc(100vh-4rem)]">
            {contacts.map((contact, index) => (
              <ContactBox
                key={contact.id.toString()}
                contact={contact}
                index={index}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col min-w-[300px] md:min-w-[400px]">
        {/* 聊天头部 */}
        <div className="border-b border-primary-foreground/50 px-6 py-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={contacts[selectedChat]?.avatar} />
              <AvatarFallback>{contacts[selectedChat]?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold ">{contacts[selectedChat]?.name}</h2>
              <p className="text-sm ">
                {contacts[selectedChat]?.online ? "在线" : "离线"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 消息区域 */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                    msg.sender === "me"
                      ? "flex-row-reverse space-x-reverse bg-primary text-primary-foreground rounded-md"
                      : ""
                  }`}
                >
                  {msg.sender === "other" && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>TA</AvatarFallback>
                    </Avatar>
                  )}
                  <Chatbox msg={msg} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* 输入区域 */}
        <div className=" border-t border-primary-foreground/50 p-4">
          <div className="flex items-center space-x-2 mb-3">
            {/* <Button variant="ghost" size="icon">
              <Smile className="w-5 h-5" />
            </Button> */}
            <EmojiInputPopover onEmojiSelect={(emoji) => setMessage(message + emoji)} />
            <Button variant="ghost" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入消息..."
                className="min-h-[40px] resize-none"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className=""
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeChatInterface;

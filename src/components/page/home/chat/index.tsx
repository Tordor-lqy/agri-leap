import { useState } from "react";
import {
  Phone,
  Search,
  Send,
  Smile,
  Paperclip,
  Mic,
  MoreVertical,
  Circle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      {/* 中间联系人列表 */}
      <div className="w-80  border-r  flex flex-col">
        {/* 搜索栏 */}
        <div className="p-4 border-b ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
            <Input placeholder="搜索联系人或聊天记录" className="pl-10 " />
          </div>
        </div>

        {/* 联系人列表 */}
        <ScrollArea className="flex-1">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`p-4  cursor-pointer border-b  ${
                selectedChat === index ? " border-l-4 " : ""
              }`}
              onClick={() => setSelectedChat(index)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <Circle className="absolute -bottom-1 -right-1 w-4 h-4  fill-current" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium  truncate">{contact.name}</h3>
                    <span className="text-xs ">{contact.time}</span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm  truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="  text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天头部 */}
        <div className=" border-b  px-6 py-4 flex items-center justify-between">
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

                  <div
                    className={`rounded-lg px-4 py-2 ${
                      msg.sender === "me" ? "0 " : " border "
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* 输入区域 */}
        <div className=" border-t  p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Button variant="ghost" size="icon">
              <Smile className="w-5 h-5" />
            </Button>
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

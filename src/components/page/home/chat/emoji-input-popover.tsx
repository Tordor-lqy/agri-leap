import React, { useState } from "react";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface EmojiInputPopoverProps {
  onEmojiSelect?: (emoji: string) => void;
  className?: string;
}

// Emoji 数据
const emojiCategories: Record<string, string[]> = {
  表情: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
  ],
  手势: [
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤲",
    "🤝",
    "🙏",
  ],
  心形: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "♥️",
    "💌",
    "💐",
    "🌹",
    "🌷",
  ],
  动物: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
  ],
  食物: [
    "🍎",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥒",
    "🌶️",
    "🌽",
    "🥕",
    "🥔",
    "🍠",
  ],
  活动: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥅",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🎖️",
    "🏵️",
    "🎗️",
    "🎫",
    "🎟️",
    "🎪",
    "🎭",
  ],
};

const EmojiInputPopover: React.FC<EmojiInputPopoverProps> = ({
  onEmojiSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("表情");

  // 获取当前分类下的 emoji
  const filteredEmojis: string[] = emojiCategories[activeCategory] || [];

  const handleEmojiClick = (emoji: string): void => {
    onEmojiSelect?.(emoji);
    // 移除自动关闭功能
    // setIsOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-4">
            {/* 头部：标题和关闭按钮 */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">选择 Emoji</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="关闭"
              >
                ×
              </button>
            </div>

            {/* Emoji 网格 */}
            <div className="grid grid-cols-8 gap-2 max-h-48">
              {filteredEmojis.map((emoji: string, index: number) => (
                <button
                  key={`${emoji}-${index}`}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-8 h-8 flex items-center justify-center text-xl hover:bg-primary/50a text-primary-foreground rounded transition-colors"
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* 分类标签 */}
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full overflow-x-scroll"
            >
              <TabsList className="flex flex-wrap gap-2 min-w-max">
                {Object.keys(emojiCategories).map((category: string) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-xs"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiInputPopover;

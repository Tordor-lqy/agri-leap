import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useHover } from "@/hooks/use-hover";

import { useRef } from "react";
import toast from "react-hot-toast";

function Chatbox({ msg }: { msg: { sender: string; content: string , time: string } }) {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(hoverRef as React.RefObject<HTMLElement>);

  // 定义复制内容到剪贴板的方法，使用闭包来记录上次复制时间
  const copyToClipboard = (() => {
    // 用于记录上次复制的时间，放在闭包内保持状态
    let lastCopyTime = 0;
    return async (text: string) => {
      const currentTime = Date.now();
      // 短时间内再次点击复制，不执行复制操作
      if (currentTime - lastCopyTime < 1000) {
        return;
      }
      lastCopyTime = currentTime;
      try {
        await navigator.clipboard.writeText(text);
        toast.success('复制成功')
      } catch (err) {
        console.error('复制失败: ', err);
        toast.error('复制失败')
      }
    };
  })();

  return (
    <div className="">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative select-auto">
            <div
              className={`rounded-lg px-4 py-2 cursor-pointer ${
                msg.sender === "me"
                  ? "0 "
                  : "border border-primary-foreground/50"
              }`}
              ref={hoverRef}
              onDoubleClick={() => copyToClipboard(msg.content)}
            >
              <p className="text-sm selection:bg-primary selection:text-primary-foreground">{msg.content}</p>
            </div>
            {isHovered && (
              <div className="absolute -bottom-6 right-2">
                <p className="text-sm text-primary-foreground/50">{msg.time}</p>
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem inset>
            复制
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export default Chatbox;

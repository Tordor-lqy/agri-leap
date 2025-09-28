import React from "react";
import { Circle } from "lucide-react";
import BoringAvatar from "boring-avatars";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface Contact {
  id: number;
  name: string;
  avatar?: string;
  online: boolean;
  time: string;
  lastMessage: string;
  unread: number;
}

interface ContactBoxProps {
  contact: Contact;
  index: number;
  selectedChat: number;
  setSelectedChat: (index: number) => void;
}

const ContactSelectBox: React.FC<ContactBoxProps> = ({
  contact,
  index,
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <div
      key={contact.id}
      className={`cursor-pointer border-b border-primary-foreground/10 transition-colors duration-200`}
      onClick={() => setSelectedChat(index)}
    >
      <div
        className={`p-2 m-1 rounded-sm transition-colors duration-200 hover:bg-primary/25 ${
          selectedChat === index ? "bg-primary/50" : ""
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <BoringAvatar
              name={String(contact.unread)}
              variant="beam"
              size={40}
              colors={[
                ["#FF6B6B", "#4ECDC4", "#F7FFF7", "#FFE66D", "#1A535C"][
                  Math.floor(Math.random() * 5)
                ],
                ["#FF9F1C", "#FFBF69", "#CBF3F0", "#2EC4B6", "#011627"][
                  Math.floor(Math.random() * 5)
                ],
                ["#89023E", "#D81E5B", "#F0A202", "#F18805", "#456990"][
                  Math.floor(Math.random() * 5)
                ],
                ["#D90368", "#A44A3F", "#F6F4D2", "#CBDFBD", "#F19C79"][
                  Math.floor(Math.random() * 5)
                ],
                ["#540D6E", "#EE4266", "#FFD23F", "#3BCEAC", "#0EAD69"][
                  Math.floor(Math.random() * 5)
                ],
              ]}
            />
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
    </div>
  );
};

function ContactBox({
  contact,
  index,
  selectedChat,
  setSelectedChat,
}: ContactBoxProps) {
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <ContactSelectBox
            contact={contact}
            index={index}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export default ContactBox;

import { MessageCircle, Users, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useTranslation } from "react-i18next";
import Setting from "./tool/setting";

function ToolSidebar() {
  const { t } = useTranslation();
  return (
    <div className="border-r border-primary-foreground/50 w-0 chat-md:w-16 overflow-hidden transition-all duration-300">
      <div className="flex flex-col items-center py-4 space-y-4 h-full">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 " />
        </div>

        <Button variant="ghost" size="icon" className="w-10 h-10  ">
          <Users className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon" className="w-10 h-10  ">
          <Phone className="w-5 h-5" />
        </Button>

        <div className="flex-1"></div>

        <Setting />

        <Avatar className="w-10 h-10">
          <AvatarImage src="/api/placeholder/40/40" />
          <AvatarFallback>我</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default ToolSidebar;

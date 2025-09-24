import {
  MessageCircle,
  Users,
  Phone,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


function ToolSidebar() {
  return (
      <div className="w-16  flex flex-col items-center py-4 space-y-4 border-r">
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

        <Button variant="ghost" size="icon" className="w-10 h-10  ">
          <Settings className="w-5 h-5" />
        </Button>

        <Avatar className="w-10 h-10">
          <AvatarImage src="/api/placeholder/40/40" />
          <AvatarFallback>我</AvatarFallback>
        </Avatar>
      </div>
  );
}

export default ToolSidebar;

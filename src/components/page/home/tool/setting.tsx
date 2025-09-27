import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

function Setting() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10  ">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="min-w-3xl">
        <DialogTitle>{t("settings.title")}</DialogTitle>
        <DialogDescription>{t("settings.description")}</DialogDescription>
        <Input placeholder={t("settings.placeholder")} />
      </DialogContent>
    </Dialog>
  );
}

export default Setting;

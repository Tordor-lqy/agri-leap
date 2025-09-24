import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const SwitchLang = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // 更新语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    // 可选：将语言选择保存到本地存储
    localStorage.setItem('i18nextLng', lng);
  };

  // 监听语言变化
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLang(i18n.language);
    };

    // 监听语言变化事件
    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          <span className="capitalize">
            {currentLang === 'en' ? 'English' : '中文'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={currentLang === 'en' ? 'font-medium ' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('zh')}
          className={currentLang === 'zh' ? 'font-medium ' : ''}
        >
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLang;
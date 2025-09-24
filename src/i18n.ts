import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译文件
import enTranslation from './i18n/locales/en/translation.json';
import zhTranslation from './i18n/locales/zh/translation.json';

// 配置语言资源
const resources = {
  en: {
    translation: enTranslation
  },
  zh: {
    translation: zhTranslation
  }
};

i18n
  .use(initReactI18next) // 将 i18n 实例传递给 react-i18next
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'en', // 备用语言
    debug: true,
    interpolation: {
      escapeValue: false // React 已经安全地处理了 XSS
    }
  });

export default i18n;
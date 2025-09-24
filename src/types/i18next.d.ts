// i18next.d.ts
import 'i18next';

// 导入英文翻译文件以获取类型信息
import enTranslation from '../locales/en/translation.json';

// 扩展 CustomTypeOptions 接口
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enTranslation;
    };
  }
}
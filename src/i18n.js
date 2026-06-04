// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入剛才放在 src/locales 內 winter 的 JSON 檔案
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh_TW.json';
import esTranslation from './locales/es.json';

// 設定資源檔案對應的語系代碼
const resources = {
  en: {
    translation: enTranslation
  },
  zh: {
    translation: zhTranslation
  },
  es: {
    translation: esTranslation
  }
};

i18n
  .use(initReactI18next) // 綁定 react-i18next
  .init({
    resources,
    lng: 'zh',            // 預設網頁載入時的語言（與 App.js 中的 'zh' 對應）
    fallbackLng: 'en',    // 如果找不到對應翻譯時的備用語系
    interpolation: {
      escapeValue: false  // React 本身已具備 XSS 防護，故設為 false
    }
  });

export default i18n;
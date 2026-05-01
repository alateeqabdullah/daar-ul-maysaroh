import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      welcome: "Welcome back",
      settings: "Settings",
      logout: "Sign Out",
      search: "Quick search...",
    },
  },
  ar: {
    translation: {
      dashboard: "لوحة القيادة",
      welcome: "مرحباً بك",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      search: "بحث سريع...",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18n;

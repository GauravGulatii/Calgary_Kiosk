import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import koTranslations from "./locales/ko.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    ko: {
      translation: koTranslations.translation,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

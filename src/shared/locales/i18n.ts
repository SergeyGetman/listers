import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEs from './es';
import translationEn from './en';
import translationUk from './uk';

const resources = {
  en: {
    translation: translationEn,
  },
  es: {
    translation: translationEs,
  },
  uk: {
    translation: translationUk,
  },
};
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    supportedLngs: ['en', 'es', 'uk'],
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'navigator'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import htTranslations from './locales/ht.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import ptTranslations from './locales/pt.json';

const resources = {
  ht: { translation: htTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  pt: { translation: ptTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ht',
    supportedLngs: ['ht', 'en', 'es', 'fr', 'pt'],
    interpolation: {
      escapeValue: false,
    },
    lng: 'ht',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kafa-language',
    },
  });

export default i18n;

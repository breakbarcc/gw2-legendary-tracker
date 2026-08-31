import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import de from './locales/de';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

// Shared across all *.breakbar.cc projects — see "Sprachauswahl-Cookie zwischen
// breakbar.cc-Projekten teilen". Only set the cross-subdomain domain/secure
// attributes when actually running on breakbar.cc, otherwise the cookie would
// be silently rejected by the browser (e.g. on localhost during development).
const isBreakbarHost =
  typeof window !== 'undefined' && window.location.hostname.endsWith('breakbar.cc');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'breakbar-language',
      lookupLocalStorage: 'gw2_legendary_tracker_lang',
      cookieOptions: {
        path: '/',
        sameSite: 'lax',
        maxAge: 31536000,
        ...(isBreakbarHost && { domain: '.breakbar.cc', secure: true }),
      },
    },
  });

export default i18n;

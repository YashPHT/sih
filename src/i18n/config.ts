import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/common.json'
import hi from './locales/hi/common.json'
import mr from './locales/mr/common.json'
import te from './locales/te/common.json'
import ta from './locales/ta/common.json'
import gu from './locales/gu/common.json'
import ur from './locales/ur/common.json'
import kn from './locales/kn/common.json'
import or from './locales/or/common.json'
import bn from './locales/bn/common.json'
import ml from './locales/ml/common.json'

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  te: { translation: te },
  ta: { translation: ta },
  gu: { translation: gu },
  ur: { translation: ur },
  kn: { translation: kn },
  or: { translation: or },
  bn: { translation: bn },
  ml: { translation: ml }
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n

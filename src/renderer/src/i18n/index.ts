import { createI18n } from 'vue-i18n'
import en from './locales/en'
import lo from './locales/lo'

export type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en' | 'lo'>({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    lo
  }
})

export default i18n

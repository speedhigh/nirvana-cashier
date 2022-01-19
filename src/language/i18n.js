import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import messages from './index'
const language = window.localStorage.getItem('language') ? window.localStorage.getItem('language') : "zhCn"
const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: language || "zhCn",
  messages,
  fallbackWarn: false,
  missingWarn: false
});

export default i18n
import Vue from "vue";

// langs
import en from '@/assets/locales/en/index';
import ar from '@/assets/locales/ar/index';

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


export default new VueI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages: {
    ar: ar,
    en: en
  }
});

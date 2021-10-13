import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

import en from '@/assets/locales/en/vuetify';
import ar from '@/assets/locales/ar/vuetify';


export default new Vuetify({
  lang: {
    locales: { ar, en },
    current: 'en',
  },
});

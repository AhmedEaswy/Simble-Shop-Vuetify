import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import ZoomOnHover from "vue-zoom-on-hover";

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
Vue.use(ZoomOnHover);

import './directives.js'

axios.defaults.baseURL = 'https://student.valuxapps.com/api/';
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';




Vue.config.productionTip = false;
Vue.prototype.$vuetify = vuetify;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

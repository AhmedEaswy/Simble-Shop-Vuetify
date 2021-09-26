import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import themeModule from './themeModule';
import authModule from './authModule';

export default new Vuex.Store({
  state: {

  },
  mutations: {},
  actions: {},
  modules: {
    themeModule,
    authModule
  },
});

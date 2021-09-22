import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import themeModule from './themeModule';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    themeModule
  },
});

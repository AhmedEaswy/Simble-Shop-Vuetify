import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import themeModule from './themeModule';
import authModule from './authModule';
import shopModule from './shopModule';
import homeModule from './homeModule';

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {},
  modules: {
    themeModule,
    authModule,
    shopModule,
    homeModule
  },
});

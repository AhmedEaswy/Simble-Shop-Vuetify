import themeConfig from "@/../themeConfig";

// import Vuetify from "vuetify";

export default {
  namespaced: true,
  state: {
    lang: localStorage.getItem("lang") || themeConfig.app.layout.lang,
    langs: ["en", "ar"],
    dir: localStorage.getItem("dir") || themeConfig.app.layout.dir,
    theme: localStorage.getItem("theme") || themeConfig.app.layout.theme,
    loading: true,
  },
  getters: {
    isDark: state => state.theme === 'dark',
    load: state => state.loading,
    lang: state => state.lang,
    dir: state => state.dir,
    langs: state => state.langs,

  },
  mutations: {
    changeLang(state, { vm, lang }) {
      localStorage.setItem("lang", lang);
      vm.$vuetify.lang.current = lang;
      state.lang = lang;
    },
    changeDir(state, { vm, lang }) {
      let dir;
      lang === 'ar' ? dir = 'rtl' : dir = 'ltr';
      localStorage.setItem("dir", dir);
      vm.$vuetify.rtl = dir === 'rtl';
      state.dir = dir;
    },
    changeTheme(state, { vm, theme }) {
      vm.$vuetify.theme.dark = theme;
      theme === true ? theme = "dark" : theme = "light";
      localStorage.setItem("theme", theme);
      state.theme = localStorage.getItem("theme");
    },
    defaultTheme(state, { vm }) {
      vm.$vuetify.theme.dark = state.theme === 'dark';
      vm.$vuetify.rtl = state.dir === 'rtl';
      vm.$vuetify.lang.current = state.lang;
    },
    endLoading(state) {
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
    },
  },
  actions: {
    handleChange({ commit }, { vm, lang }) {
      commit("changeLang", { vm, lang });
      commit("changeDir", { vm, lang });
    },
    handleTheme({ commit }, { vm, theme }) {
      commit("changeTheme", { vm, theme });
    },
    runDefaultTheme({ commit }, { vm }) {
      commit('defaultTheme', { vm })
    },
  }
};

import themeConfig from "@/../themeConfig";

export default {
  namespaced: true,
  state: {
    lang: localStorage.getItem("lang") || themeConfig.app.layout.lang,
    langs: ["en", "ar"],
    dir: localStorage.getItem("dir") || themeConfig.app.layout.dir,
    theme: localStorage.getItem("theme") || themeConfig.app.layout.theme
  },
  mutations: {
    changeLang(state, lang) {
      localStorage.setItem("lang", lang);
      // Vuetify.framework.lang.current = lang;
      state.lang = lang;
    },
    changeDir(state, dir) {
      localStorage.setItem("dir", dir);
      // Vue.prototype.$vuetify.dir.current = dir;
      state.dir = dir;
    },
    changeTheme(state, { vm, theme }) {
      vm.$vuetify.theme.dark = !vm.$vuetify.theme.dark;
      theme === true ? theme = "light" : theme = "dark";
      localStorage.setItem("theme", theme);
      state.theme = localStorage.getItem("theme");
    },
    defaultTheme(state, { vm }) {
      vm.$vuetify.theme.dark = state.theme === 'dark';
    }
  },
  actions: {
    handleChange({ commit }, lang) {
      commit("changeLang", lang);
      commit("changeDir", lang);
    },
    handleTheme({ commit }, { vm, theme }) {
      commit("changeTheme", { vm, theme });
    },
    runDefaultTheme({ commit }, { vm }) {
      commit('defaultTheme', { vm })
    }
  }
};

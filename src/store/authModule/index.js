import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "@/router";


Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    user: null,
    authToken: localStorage.getItem("user-token") || null,
    errorMessage: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user.data;
      localStorage.setItem("user-token", user.data.token);
    },
    logout(state) {
      state.user = null;
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    errorMessage: state => state.errorMessage
  },
  actions: {
    LogIn({ commit, state }, user) {

      axios.post(
        "login",
        {
          "email": user.email,
          "password": user.password
        },
        {
          headers: {
            "Content-Type": "application/json",
            "lang": localStorage.getItem("lang")
          }
        }
      ).then(res => {
        if (res.data.status === true) {
          commit("setUser", res.data);
          router.push("/profile");
        } else {
          state.errorMessage = res.data.message;
          console.log(res.data.message);
        }
      });


    },
    async LogOut({ commit }) {
      let user = null;
      commit("logout", user);
    }
  }
};

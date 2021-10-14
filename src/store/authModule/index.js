import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "@/router";

import store from "@/store"

Vue.use(VueAxios, axios);

import Addresses from "./addresses";

export default {
  namespaced: true,
  state: {
    user: null,
    authToken: localStorage.getItem("user-token") || null,
    errorMessage: null,
    successMessage: null,
    logProccess: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user.data;
      localStorage.setItem("user-token", user.data.token);

    },
    logout(state) {
      state.user = null;
      state.authToken = null;
      localStorage.removeItem('user-token');
      // router.push('home')
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    token: state => state.authToken,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage,
    logProccess: state => state.logProccess
  },
  actions: {
    LogIn({ commit, state }, user) {
      state.logProccess = true;
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
          state.logProccess = false;
          commit("setUser", res.data);
          store.dispatch("shopModule/Cart/getCart");
          store.dispatch("shopModule/Favourites/getFavourites");
          router.push("/profile");
        } else {
          state.logProccess = false;
          state.errorMessage = res.data.message;
        }
      });

    },

    register({ commit, state }, user) {
      state.logProccess = true;
      axios.post(
        "register",
        {
          "email": user.email,
          "password": user.password,
          "name": user.name,
          "phone": user.phone,
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
          state.logProccess = false;
          router.push("/profile");
        } else {
          state.logProccess = false;
          state.errorMessage = res.data.message;
        }
      });

    },

    tokenLogAuth({ commit }) {
      if (localStorage.getItem('user-token')) {
        axios.get(
          'profile',
          {
            headers: {
              "lang": localStorage.getItem('lang'),
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('user-token')
            }
          }
        ).then(res => {
          if (res.data.status === true) {
            commit("setUser", res.data);
          } else {
            localStorage.removeItem('user-token');
          }
        })
      }
    },

    updateProfile({ commit, state }, user) {
        state.logProccess = true;
        axios.put(
          'update-profile',
          {
            "email": user.email,
            "password": user.password,
            "name": user.name,
            "phone": user.phone,
          },
          {
            headers: {
              "lang": localStorage.getItem('lang'),
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('user-token')
            }
          }
        ).then(res => {
          if (res.data.status === true) {
            commit("setUser", res.data);
            state.logProccess = false;
            state.successMessage = res.data.message;
          } else {
            state.logProccess = false;
            state.errorMessage = res.data.message;
          }
        })

    },

    LogOut({ commit }) {
      commit("logout");
      store.dispatch("shopModule/Cart/clearCart");
      store.dispatch("shopModule/Favourites/clearFavourites");
      // store.dispatch("shopModule/clearUserData");
      router.go();
    }
  },
  modules: {
    Addresses
  }
};

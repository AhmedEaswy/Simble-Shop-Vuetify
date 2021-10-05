// import themeConfig from "@/../themeConfig";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import router from "@/router";

import store from "@/store";

Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    favourites: [],
    favProccess: {
      status: false,
      id: null,
    },
    favouritesOpen: false,
  },
  getters: {
    isAuthenticated() {
      return store.getters["authModule/isAuthenticated"]
    },
    products() {
      return store.getters["shopModule/products"];
    },
    favourites: state => state.favourites,
    favProccess: state => state.favProccess,
    checkFavourites: state => state.favourites.length > 0,
    favouritesOpen: state => state.favouritesOpen,
    favouritesLength: state => state.favourites.length,
  },
  mutations: {
    openFavourites(state) {
      state.favouritesOpen = true
    },
    closeFavourites(state) {
      state.favouritesOpen = false
    },
    SET_FAVOURITS(state, favourites) {
      state.favourites = favourites.data.data;
    },
    UPDATE_FAVOURITS(state, product) {

      if(store.state.shopModule.products) {
        store.getters["shopModule/products"].map((item) => {
          if(item.id === product.product.id) {
            item.in_favorites = !item.in_favorites;
          }
        })
      }

      if(store.state.shopModule.productsCategory) {
        store.getters["shopModule/productsCategory"].map((item) => {
          if(item.id === product.product.id) {
            item.in_favorites = !item.in_favorites;
          }
        })
      }

      if(state.favourites.find((item) => item.product.id === product.product.id)) {
        state.favourites = state.favourites.filter(item => item.product.id != product.product.id)
      } else {
        state.favourites = [product, ...state.favourites];
      }
    },
    CLEAR_FAVOURITES(state) {
      state.favourites = []
    }

  },
  actions: {


    getFavourites({commit}) {
      axios.get(
        'favorites',
        {
          headers: {
            "lang": localStorage.getItem('lang'),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        }).then(res => {
        commit("SET_FAVOURITS", res.data);
      })
    },

    changeFavourit({commit, state, getters}, product) {

      state.favProccess.status = true;
      state.favProccess.id = product.id;

      commit('UPDATE_FAVOURITS', { "product": product })
      state.favProccess.status = false;

      if (getters.isAuthenticated) {
        axios.post(
          'favorites',
          {
            "product_id": product.id,
          },
          {
            headers: {
              "lang": localStorage.getItem('lang'),
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('user-token')
            }
          }
        ).then(res => {
          if(res.data.status === false) {
            state.favProccess.status = false;
          }
          // commit('UPDATE_FAVOURITS', res.data.data)
        })
      }

    },

    clearFavourites({commit}) {
      commit("CLEAR_FAVOURITES");
    }

  },

};

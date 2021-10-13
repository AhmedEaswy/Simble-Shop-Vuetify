// import themeConfig from "@/../themeConfig";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";
// sub modules
import Cart from "./cart";
import Favourites from "./favourites";

Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    products: null,
    productsCategory: null,
    loadProducts: null,
    categories: null,
    singleProduct: null,
    singleProductStatus: null,
  },
  getters: {
    loadProducts: state => state.loadProducts,
    products: state => state.products,
    productsCategory: state => state.productsCategory,
    categories: state => state.categories,
    singleProduct: state => state.singleProduct,
    singleProductStatus: state => state.singleProductStatus,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products.data.data
    },
    SET_PRODUCTS_CATEGORY(state, products) {
      state.productsCategory = products.data.data
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories.data.data
    },
    SET_SINGLE_PRODUCT(state, product) {
      state.singleProduct = product.data;
      state.singleProductStatus = product.status;
    }
  },
  actions: {
    getProducts({state, commit}) {
      state.loadProducts = false;
      axios.get(
        'products',
        {
          headers: {
            "lang": localStorage.getItem("lang"),
            "Authorization": localStorage.getItem("user-token")
          }
        }).then(res => {
          if (res.data.status === true) {
            commit("SET_PRODUCTS", res.data);
            state.loadProducts = true;
          } else {
            state.loadProducts = true;
          }

      })
    },
    callProductsWithCat({state, commit}, categoryId) {
      state.loadProducts = false;
      state.productsCategory = null;

      axios.get(
        `products?category_id=${categoryId}`,
        {
          headers: {
            "lang": localStorage.getItem("lang"),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("user-token")
          }
        }).then(res => {
          state.loadProducts = true;
          if (res.data.status === true) {
            commit("SET_PRODUCTS_CATEGORY", res.data);
          }
      })
    },

    callProducts({dispatch, state}) {
      if(state.products === null) {
        dispatch('getProducts');
      }
    },

    getCategories({commit}) {
      axios.get(
        'categories',
        {
          headers: {
            "lang": localStorage.getItem("lang")
          }
        }).then(res => {
            commit("SET_CATEGORIES", res.data);
      })
    },



    clearUserData() {

      store.state.products.map(item => {
        item.in_favorites = false;
        item.in_cart = false;
      })

    },

    getProduct({commit}, productId) {
      commit("SET_SINGLE_PRODUCT", {});
      axios.get(
        `products/${productId}`,
        {
          headers: {
            "lang": localStorage.getItem("lang"),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("user-token")
          }
        }).then(res => {
          commit("SET_SINGLE_PRODUCT", res.data);
      })
    }
  },

  modules: {
    Cart,
    Favourites
  }

};

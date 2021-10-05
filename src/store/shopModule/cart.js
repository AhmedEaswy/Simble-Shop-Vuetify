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
    maxCartItemLength: 10,
    cart: {
      data: {
        cart_items: [],
        total: 0,
        sub_total: 0,
      }
    },
    cartProccess: {
      status: false,
      id: null,
    },
    cartOpen: false,
  },
  getters: {
    cartProccess: state => state.cartProccess,
    cart: state => state.cart.data,
    checkCart: state => state.cart.data.cart_items.length > 0,
    cartOpen: state => state.cartOpen,
    cartLength: state => state.cart.data.cart_items.length,
    maxCartItemLength: state => state.maxCartItemLength,
  },
  mutations: {
    openCart(state) {
      state.cartOpen = true
    },
    closeCart(state) {
      state.cartOpen = false
    },

    SET_CART(state, cart) {
      state.cart = cart;
    },

    UPDATE_CART(state, product) {
      // product = product.product;
      // update change to main products array

      if (store.state.shopModule.products) {
        store.state.shopModule.products.map((item) => {
          if(item.id === product.product.id) item.in_cart = !item.in_cart;
        })
      }

      if (store.state.shopModule.productsCategory) {
        store.state.shopModule.productsCategory.map((item) => {
          if(item.id === product.product.id) item.in_cart = !item.in_cart;
        })
      }

      // update change to cart

      // remove if it exists
      if(state.cart.data.cart_items.find((item) => item.product.id === product.product.id)) {
        state.cart.data.cart_items = state.cart.data.cart_items.filter(item => item.product.id != product.product.id)
        state.cart.data.total = state.cart.data.total - (product.quantity * product.product.price);
        state.cart.data.sub_total = state.cart.data.sub_total - (product.quantity * product.product.price);
        // add if it does ont exists
      } else {
        if (state.cart.data.cart_items.length > 0 ){
          product.id = state.cart.data.cart_items[state.cart.data.cart_items.length - 1].id + 1;
        }
        else {
          product.id = product.product.id;
        }
        state.cart.data.cart_items = [...state.cart.data.cart_items, product];
        state.cart.data.total = state.cart.data.total + (product.quantity * product.product.price);
        state.cart.data.sub_total = state.cart.data.sub_total + (product.quantity * product.product.price);
      }

    },

    UPDATE_CART_ITEM_QUANTITY(state, data) {

      state.cart.data.cart_items.map((item) => {
        if(item.id === data.id) {
          if(item.quantity < data.quantity) {
            item.quantity =  data.quantity
            state.cart.data.total = state.cart.data.total + data.product.price;
          } else if (item.quantity >  data.quantity) {
            item.quantity =  data.quantity
            state.cart.data.total = state.cart.data.total - data.product.price;
          }
        }

      })

    },

    CLEAR_CART(state) {
      state.cart = {
        data: { cart_items: [], total: null, sub_total: null }
      }
    }

  },
  actions: {

    getCart({commit}) {
      axios.get(
        'carts',
        {
          headers: {
            "lang": localStorage.getItem('lang'),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        }).then(res => {
        commit("SET_CART", res.data);
      })
    },

    changeCart({commit, state}, product) {
      state.cartProccess.status = true;
      state.cartProccess.id = product.id;

      let productCart = state.cart.data.cart_items.filter(item => item.product.id === product.id),
          productQuantity = productCart[0] ? productCart[0].quantity : 1;

      commit('UPDATE_CART', {"id": product.id, "quantity": productQuantity ? productQuantity : 1, "product": product })
      state.cartProccess.status = false;

      if (store.getters["authModule/isAuthenticated"]) {
        axios.post(
          'carts',
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
            state.cartProccess.status = false;
            commit('UPDATE_CART', res.data)
          }
        })
      }

    },

    updateCartQuantity({commit, state}, cartItem)
    {
      state.cartProccess.status = true;
      state.cartProccess.id = cartItem.product.id;

      let newQuantity,
          operation = cartItem.oberation,
          cartItemId = cartItem.product.id;
      cartItem = cartItem.product;

      if(operation === "add") {
        newQuantity = cartItem.quantity < state.maxCartItemLength ? cartItem.quantity + 1 : cartItem.quantity;
      } else {
        newQuantity = cartItem.quantity  > 1 ? cartItem.quantity - 1 : 1;
      }

      commit('UPDATE_CART_ITEM_QUANTITY', {id: cartItem.id, quantity: newQuantity, product: cartItem.product })

      state.cartProccess.status = false;

      if (store.getters["authModule/isAuthenticated"]) {
        axios.put(
          `carts/${cartItemId}`,
          {
            "quantity": newQuantity,
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
            console.log(res)
            state.cartProccess.status = true;
          }
        })
      }

    },

    clearCart({commit}) {
      commit("CLEAR_CART");
    },


  },

};

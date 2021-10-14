import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    banners: {data: []},

  },
  getters: {
    banners: state => state.banners.data,
    features: state => state.features
  },
  mutations: {
    SET_BANNERS(state, banners) {
      state.banners = banners;
    }
  },
  actions: {
    getBanners({ commit }) {
      axios.get(
        'banners',
        {
          headers: {
            "lang": localStorage.getItem('lang'),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        }).then(res => {
        commit("SET_BANNERS", res.data);
      });
    }
  }

// {{url}}products?category_id=43

};

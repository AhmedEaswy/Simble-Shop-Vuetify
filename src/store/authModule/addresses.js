import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    addresses: null
  },
  mutations: {
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses.data.data
    },
    ADD_ADDRESSES(state, addresse) {
      state.addresses.push(addresse)
    }
  },
  getters: {
    addresses: state => state.addresses
  },
  actions: {

    getAddresses({commit, state}) {
      if (!state.addresses) {
        axios.get(
          'addresses',
          {
            headers: {
              "lang": localStorage.getItem('lang'),
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('user-token')
            }
          }
        ).then(res => {
          if (res.data.status === true) {
            commit("SET_ADDRESSES", res.data);
          } else {
            console.log(res)
          }
        })
      }

    },

    addAddresses({ commit }, Address) {
      axios.post(
        'addresses',
        {
          "name": Address.name,
          "city": Address.city,
          "region": Address.region,
          "details": Address.details,
          "notes": Address.notes,
          "latitude": "00.00",
          "longitude": "00.00",
          },
        {
          headers: {
            "lang": localStorage.getItem('lang'),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        }
      ).then(res => {
        if (res.status === true) {
          commit("ADD_ADDRESSES", res.data)
        }
      })
    }

  },
};

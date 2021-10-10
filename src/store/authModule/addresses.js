import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    addresses: null,
    logProccess: null,
  },
  getters: {
    addresses: state => state.addresses,
    logProccess: state => state.logProccess,
  },
  mutations: {
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses.data.data
    },
    ADD_ADDRESSE(state, addresse) {
      state.addresses = [addresse, ...state.addresses];
    },
    REMOVE_ADDRESSE(state, addresse) {
      if(state.addresses.find((item) => item.id === addresse.id)) {
        state.addresses = state.addresses.filter(item => item.id != addresse.id)
      }
    },
    EDIT_ADDRESSE(state, addresse) {
      state.addresses.map((item) => {
        if (item.id === addresse.id) {
          item.name = addresse.name;
          item.city = addresse.city;
          item.details = addresse.city;
          item.notes = addresse.city;
          item.longitude = addresse.city;
          item.longitude = addresse.city;
        }
      })
    }
  },
  actions: {

    getAddresses({ commit, state }) {
      state.logProccess = true;
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
            state.logProccess = false;
            commit("SET_ADDRESSES", res.data);
          } else {
            console.log(res)
          }
        })
      }

    },

    addAddresses({ commit, state }, Address) {
      state.logProccess = true;
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
        if (res.data.status === true) {
          commit("ADD_ADDRESSE", res.data.data)
          state.logProccess = false;
        }
      })
    },

    deleteAddresses({ commit, state }, address) {
      state.logProccess = true;
      axios.delete(
        `addresses/${address.id}`,
        {
          headers: {
            "lang": localStorage.getItem('lang'),
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token')
          }
        }
      ).then(res => {
        if (res.data.status === true) {
          commit("REMOVE_ADDRESSE", res.data.data)
          state.logProccess = false;
        }
      })
    },

    editAddresses({ commit, state }, address) {
      state.logProccess = true;
      axios.put(
        `addresses/${address.id}`,
        {
          "name": address.name,
          "city": address.city,
          "region": address.region,
          "details": address.details,
          "notes": address.notes,
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
        if (res.data.status === true) {
          commit("EDIT_ADDRESSE", res.data.data)
          state.logProccess = false;
        }
      })
    },

  },

};

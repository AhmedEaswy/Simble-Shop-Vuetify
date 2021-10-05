<template>
  <div>
    <v-app>
      <v-progress-linear
        color="lime"
        indeterminate
        reverse
        :absolute="true"
        :active="loaderStatus"
      ></v-progress-linear>
      <Header />
    </v-app>
  </div>
</template>

<script>
import Header from "./components/banners/Header";
import store from "@/store";
export default {
  name: "App",
  components: { Header },
  data: () => ({

  }),
  computed: {
    loaderStatus() { return store.getters["themeModule/load"] },
    isAuthenticated() { return store.getters["authModule/isAuthenticated"] }
  },
  beforeMount() {

    store.dispatch("themeModule/runDefaultTheme", { vm: this });
    store.dispatch("shopModule/getCategories")

    if(this.isAuthenticated || localStorage.getItem('user-token')) {
      store.dispatch("authModule/tokenLogAuth")
      store.dispatch("shopModule/Favourites/getFavourites")
      store.dispatch("shopModule/Cart/getCart")
    }


  },
  mounted() {

  }
};
</script>

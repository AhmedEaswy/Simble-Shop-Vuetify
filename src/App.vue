<template>
  <div>
    <v-app :dir="dir" :dark="isDark">
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
import { mapGetters } from "vuex";

import "@/assets/scss/main.scss";

export default {
  name: "App",
  components: { Header },
  data: () => ({
    isRouterAlive: true
  }),
  computed: {
    ...mapGetters({
      loaderStatus: "themeModule/load",
      isAuthenticated: "authModule/isAuthenticated",
      dir: "themeModule/dir",
      isDark: "themeModule/isDark"
    })
  },
  methods: {
    configAppData() {
      this.reload();
      store.dispatch("themeModule/runDefaultTheme", { vm: this });
      store.dispatch("shopModule/getCategories")

      if(this.isAuthenticated || localStorage.getItem('user-token')) {
        store.dispatch("authModule/tokenLogAuth")
        store.dispatch("shopModule/Favourites/getFavourites")
        store.dispatch("shopModule/Cart/getCart")
      }
    },
    reload(){
      this.isRouterAlive = false
      setTimeout(()=>{
        this.isRouterAlive = true
      },0)
    }
  },
  beforeMount() {
    this.configAppData();
  },
};

</script>

<style lang="scss">
.v-link {
  text-decoration: none;
  cursor: pointer;
}
</style>

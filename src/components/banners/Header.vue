<template>
  <v-card
    class="overflow-hidden"

    style="border-radius: 0 !important;"
  >
    <v-app-bar
      color="blue"
      dark
      style="border-radius: 0 !important;"

    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>LOGO</v-toolbar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->
      <v-btn icon @click="openFavourites">
        <v-badge
          color="green"
          :content="favouritesLength"
          v-if="favouritesLength > 0"
        >
          <v-icon>mdi-heart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="openCart">
        <v-badge
          color="green"
          :content="cartLength"
          v-if="cartLength > 0"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>

      <v-btn v-if="isAuthenticated" icon :to="{ name: 'Profile' }" >
        <v-avatar size="30">
          <img
            :src="user.image"
            :alt="user.name"
          >
        </v-avatar>
      </v-btn>
      <v-btn v-else icon :to="{ name: 'Login' }">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      min-height="92vh"
      id="scrolling-techniques-4"
    >
      <transition name="fade">
      <router-view />
    </transition>

    </v-sheet>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <template v-slot:prepend v-if="isAuthenticated">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="user.image">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >

          <v-list-item :to="{ name: 'Login' }" v-if="!isAuthenticated">
            <v-list-item-icon>

              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login & Register</v-list-item-title>
          </v-list-item>
          <v-list-group
            :value="false"
            v-else
            no-action
            prepend-icon="mdi-account-circle"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item :to="{ name: 'Profile' }">
                <v-list-item-icon>
                  <v-icon>mdi-cog-outline</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="isAuthenticated" @click="logOut">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>
          <v-list-item :to="{ name : 'Home' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <!--            v-model="item.active"-->


        </v-list-item-group>

        <v-list-item-group>
          <v-list-group
            prepend-icon="mdi-group"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Categories</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: 'Products' }">
              <v-list-item-title>All</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="category in categories"
              :key="category.id"
              :to="{ name: 'ProductsCategory',  params: { categoryId: category.id }}"
            >
              <v-list-item-content>
                <v-list-item-title v-text="category.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <Cart />
    <Favourites />
  </v-card>
</template>
<script>

import store from '@/store';
import { mapGetters } from "vuex";
import Cart from "@/components/shop/Cart";
import Favourites from "@/components/shop/Favourites";

 export default {
   name: "Navbar",
  components: {
    Cart,
    Favourites,
  },
   data() {
     return {
       theme: store.state.theme,
       isDark: store.state.theme === 'dark',
       drawer: false,
       group: null,
       appTitle: 'Awesome App',
       sidebar: false,
       admins: [
         ['Management', 'mdi-account-multiple-outline'],
         ['Settings', 'mdi-cog-outline'],
       ],
       cruds: [
         ['Create', 'mdi-plus-outline'],
         ['Read', 'mdi-file-outline'],
         ['Update', 'mdi-update'],
         ['Delete', 'mdi-delete'],
       ],
     }
   },
   computed: {
     ...mapGetters({
       isAuthenticated: "authModule/isAuthenticated",
       user: "authModule/StateUser",
       categories: "shopModule/categories",
       cartLength: "shopModule/Cart/cartLength",
       favouritesLength: "shopModule/Favourites/favouritesLength",
     }),
   },
   methods: {
     handleTheme(theme) {
       store.dispatch('themeModule/handleTheme', { vm: this, theme });
     },
     logOut() {
       store.dispatch('authModule/LogOut');
     },
     openCart() {
       store.commit("shopModule/Cart/openCart");
     },
     openFavourites() {
       store.commit("shopModule/Favourites/openFavourites");
     }
   }
 }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-left: 40px !important;
}
.v-application--is-rtl .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding-right: 40px !important;
}


/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}
</style>

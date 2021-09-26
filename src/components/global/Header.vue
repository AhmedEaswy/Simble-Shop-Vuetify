<template>
  <v-card
    class="overflow-hidden"
    height="1000"
    style="border-radius: 0 !important;"
  >
    <v-app-bar
      color="deep-purple"
      dark
      style="border-radius: 0 !important;"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Shop</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-4"
    >
        <router-view />
    </v-sheet>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="login">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>

import store from '@/store';

 export default {
   name: "Navbar",
   data() {
     return {
       theme: store.state.theme,
       isDark: store.state.theme === 'dark',
       drawer: false,
       group: null,
       appTitle: 'Awesome App',
       sidebar: false,
       menuItems: [
         { title: 'Home', path: '/home', icon: '$mdihome' },
         { title: 'Sign Up', path: '/signup', icon: 'face' },
         { title: 'Sign In', path: '/signin', icon: 'lock_open' }
       ],
     }
   },
   methods: {
     handleTheme(theme) {
       store.dispatch('themeModule/handleTheme', { vm: this, theme });
     }
   }
 }
</script>

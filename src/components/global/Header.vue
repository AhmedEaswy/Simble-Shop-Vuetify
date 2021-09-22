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

        <v-carousel
          cycle
          height="500"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.img"
          >
            <v-sheet
              color="rgba(000,000,000,0.5)"
              height="105%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="text-h2 white--text">
                  {{ slide.title }} Slide
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group
            multiple
            show-arrows
          >
            <v-slide-item
              v-for="n in 25"
              :key="n"
              v-slot="{ active, toggle }"
            >
              <v-btn
                class="mx-2"
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
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
       items: [
         { title: 'Click Me' },
         { title: 'Click Me' },
         { title: 'Click Me' },
         { title: 'Click Me 2' },
       ],
       colors: [
         'indigo',
         'warning',
         'pink darken-2',
         'red lighten-1',
         'deep-purple accent-4',
       ],
       slides: [
         {
           img: 'https://picsum.photos/id/11/500/300',
           title: 'First'
         },
         {
           img: 'https://picsum.photos/id/11/500/300',
           title: 'Second'
         },
         {
           img: 'https://picsum.photos/id/11/500/300',
           title: 'Third'
         },
         {
           img: 'https://picsum.photos/id/11/500/300',
           title: 'Fourth'
         },
         {
           img: 'https://picsum.photos/id/11/500/300',
           title: 'Fifth'
         },
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

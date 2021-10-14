<template>
  <div>
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
          v-for="slide in banners"
          :key="slide.id"
          :src="slide.image"
        >

<!--          <v-sheet-->
<!--            color="rgba(000,000,000,0.5)"-->
<!--            height="105%"-->
<!--          >-->
<!--&lt;!&ndash;            <v-row&ndash;&gt;-->
<!--&lt;!&ndash;              class="fill-height"&ndash;&gt;-->
<!--&lt;!&ndash;              align="center"&ndash;&gt;-->
<!--&lt;!&ndash;              justify="center"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="text-h2 white&#45;&#45;text">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ slide.title }} Slide&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-row>&ndash;&gt;-->
<!--          </v-sheet>-->

        </v-carousel-item>
      </v-carousel>
    </v-sheet>
    <Features />

    <v-sheet>
      <v-container class="mt-10">
        <v-row v-if="products" no-gutters>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="4"
          >
            <Product :product="product"/>
          </v-col>
        </v-row>
        <v-row
          v-else
          v-for="n in 2"
          :key="n"
          class="mt-5"
        >
          <v-col
            v-for="n in 3"
            :key="n"
            cols="12"
            sm="4"
          >
          <v-skeleton-loader
            v-bind="attrs"
            type="image, card-heading, list-item-three-line, actions"
          ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import store from '@/store';
import Product from '@/components/shop/Product';
import Features from "@/components/Features";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Features,
    Product
  },
  data() {
    return {
      loading: false,
      features: [
        {
          icon: 'mdi-truck',
          title: 'Fast Delivered'
        },
        {
          icon: 'mdi-account-supervisor',
          title: 'Customer Support'
        },
        {
          icon: 'mdi-hours-24',
          title: 'Work 24 Hours'
        },
      ],
      selection: 1,
      lang: store.state.lang,
      langs: store.state.langs,
      theme: store.state.theme,
      isDark: store.state.theme === 'dark',
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],

    }
  },
  props: {
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 2,
    },
  },
  computed: {
    ...mapGetters({
      products: "shopModule/products",
      productsCategory: "shopModule/productsCategory",
      loadProducts: "shopModule/loadProducts",
      isAuthenticated: "authModule/isAuthenticated",
      banners: "homeModule/banners",
    }),
  },
  methods: {
    handleChange(currentLang) {
      store.dispatch("themeModule/handleChange", currentLang);
      window.location.reload();
    },
  },
  beforeMount() {
    store.dispatch("homeModule/getBanners");
    if (!this.products) {
      store.dispatch("shopModule/callProducts");
    }
  },
};
</script>

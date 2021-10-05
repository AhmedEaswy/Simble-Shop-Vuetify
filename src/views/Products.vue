<template>
  <div>
    <v-sheet>
      <v-container class="grey lighten-5 mt-10">
        <v-row no-gutters>
          <v-col
            v-for="item in features"
            :key="item.index"
            cols="12"
            sm="4"
          >
            <v-card
              class="pa-5"
              elevation="0"
            >

              <v-card-title class="text-h5">
                <v-icon size="40" class="mr-3" color="blue">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet>
      <v-container class="grey lighten-5 mt-10">
        <v-row v-if="productsData && productsData.length > 0" no-gutters>
          <v-col
            v-for="product in productsData"
            :key="product.id"
            cols="12"
            sm="4"
          >
            <Product :product="product"/>
          </v-col>
        </v-row>
        <v-row v-else-if="loadProducts">
          no products data
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

import store from "@/store"
import Product from "@/components/shop/Product";
export default {
  name: "Products.vue",
  components: {
    Product
  },
  data() {
    return {
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
    products: () => store.getters["shopModule/products"],
    productsCategory: () => store.getters["shopModule/productsCategory"],
    loadProducts: () => store.getters["shopModule/loadProducts"],
    productsData() {
      if (this.$attrs.categoryId) {
        return this.productsCategory;
      } else {
        return this.products;
      }
    }
  },
  beforeMount() {

  },
};
</script>

<style scoped>

</style>

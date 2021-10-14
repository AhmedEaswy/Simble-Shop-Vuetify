<template>
  <div>
    <v-dialog
      v-model="dialogStatus"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeFavourites"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('wish_list.name') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>

          <v-list
            three-line
            subheader
          >
            <v-subheader>{{ $t('products_list') }}</v-subheader>

            <transition name="fade" v-for="item in favourites" :key="item.id">
              <v-list-item>
                <v-list-item-action>
                  <v-btn
                    class="mt-2 d-block"
                    :loading="favProccess.id === item.product.id ? favProccess.status : false"
                    icon
                    @click="removeFavouritesItem(item.product)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-avatar tile size="50" class="mr-5 ml-5">
                  <v-img :src="item.product.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{item.product.name}}</v-list-item-title>
                  <v-list-item-subtitle>${{item.product.price}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
              </v-list-item>
            </transition>

            <div v-if="!checkFavourites" v-text="$t('empty.whish_list')"></div>
          </v-list>
          <v-divider></v-divider>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store"
export default {
  name: "Favourites",
  computed: {
    checkFavourites: () => store.getters["shopModule/Favourites/checkFavourites"],
    dialogStatus: () => store.getters["shopModule/Favourites/favouritesOpen"],
    favProccess: () => store.getters["shopModule/Favourites/favProccess"],
    favourites: () => store.getters["shopModule/Favourites/favourites"],

  },
  methods: {
    closeFavourites() {
      store.commit("shopModule/Favourites/closeFavourites");
    },
    removeFavouritesItem(product) {
      store.dispatch("shopModule/Favourites/changeFavourit", product)
    }
  }
};
</script>

<style scoped>

</style>

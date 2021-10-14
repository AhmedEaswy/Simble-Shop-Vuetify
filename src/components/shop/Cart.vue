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
          @click="closeCart"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('cart.name') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>

        <v-list
          three-line
          subheader
        >
          <v-subheader>{{ $t('products_list') }}</v-subheader>

          <transition name="fade" v-for="item in cart.cart_items" :key="item.id">
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  class="mt-2 d-block"
                  :loading="cartProccess.id === item.product.id ? cartProccess.status : false"
                  icon
                  @click="removeCartItem(item.product)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-avatar tile size="50" class="mr-5 ml-5">
                <v-img :src="item.product.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> <router-link :to="{ name: 'Product',  params: { productId: item.product.id }}" tag="div" class="v-link">{{item.product.name}}</router-link></v-list-item-title>
                <v-list-item-subtitle>${{item.product.price}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                :disabled="item.quantity <= 1"
                color="primary"
                @click="decreaseQuantity(item)"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
              <div class="body-1">{{item.quantity}}</div>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                :disabled="item.qunatity === maxCartItemLength"
                color="primary"
                @click="increaseQuantity(item)"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-list-item>
          </transition>

        </v-list>
        <div v-if="checkCart">
          <v-divider></v-divider>
          <v-subheader class="text-body-1">{{ $t('total') }}: <v-card-text class="font-weight-black" color="blue">${{cart.total}}</v-card-text></v-subheader>
        </div>
        <div v-else v-text="$t('empty.cart')"></div>
      </v-card-text>

      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import store from "@/store"
export default {
  name: "Cart",
  computed: {
    checkCart: () => store.getters["shopModule/Cart/checkCart"],
    dialogStatus: () => store.getters["shopModule/Cart/cartOpen"],
    cartProccess: () => store.getters["shopModule/Cart/cartProccess"],
    cart: () => store.getters["shopModule/Cart/cart"],
    maxCartItemLength: () => store.getters["shopModule/Cart/maxCartItemLength"],
  },
  methods: {
    closeCart() {
      store.commit("shopModule/Cart/closeCart");
    },
    removeCartItem(product) {
      store.dispatch("shopModule/Cart/changeCart", product)
    },
    decreaseQuantity(product) {
      store.dispatch("shopModule/Cart/updateCartQuantity", { oberation: "remove", product: product })
    },
    increaseQuantity(product) {
      store.dispatch("shopModule/Cart/updateCartQuantity", { oberation: "add", product: product })

    },
  }
};
</script>

<style scoped>

</style>

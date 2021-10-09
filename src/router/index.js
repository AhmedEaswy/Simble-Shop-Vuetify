import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Profile from "../views/profile.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";

import store from "@/store";

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
    alias: '/home'
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/:productId",
    name: "Product",
    component: Product,
  },
  {
    path: "/products/category/:categoryId",
    name: "ProductsCategory",
    component: Products,
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});



router.beforeResolve()



// call products with category filter or not
router.beforeEach((to, from, next) => {
  if(to.name === "ProductsCategory") {
    store.dispatch('shopModule/callProductsWithCat', to.params.categoryId)
  } else if (to.name === "Products" && !to.params.categoryId) {
    store.dispatch("shopModule/callProducts");
  }
  next();
});

// call single product page
router.beforeEach((to, from, next) => {
  if(to.name === "Product") {
    store.dispatch("shopModule/getProduct", to.params.productId);
  }
  next();
});


router.afterEach(() => {
  store.commit("shopModule/Cart/closeCart");
  // Loading Spinner End
  setTimeout(function () {
    store.commit('themeModule/endLoading')
  }, 500)

});



// router.beforeEach((to, from, next) => {
//   setTimeout(function() {
//     store.commit("themeModule/startLoading")
//   }, 1000)
//   next();
// });
// router.afterEach(() => {
//   setTimeout(function() {
//     store.commit("themeModule/endLoading")
//   }, 1000)
// });

export default router;

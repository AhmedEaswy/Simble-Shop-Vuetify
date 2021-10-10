import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
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
    path: '/about',
    name: "About",
    component: About,
    alias: '/about'
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

// auth guard
router.beforeEach((to, from, next) => {

  // Loading Spin Start
  store.commit('themeModule/startLoading')

  const publicPages = ['/login', '/register'];
  const logPages = publicPages.includes(to.path);


  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["authModule/isAuthenticated"] && !localStorage.getItem('user-token')) {
      next({ name: 'Login' })
    } else {
      if (!store.state.authModule.addresses) {
        store.dispatch("authModule/Addresses/getAddresses")
      }
      next() // go to wherever I'm going
    }
  } else if (logPages) {

    if (!store.getters["authModule/isAuthenticated"] && !localStorage.getItem('user-token')) {
      next()
    } else {
      next({ name: 'Profile' })
    }

  } else {
    next();
  }

});

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

// end loading and close cart after going to new page
router.afterEach(() => {
  store.commit("shopModule/Cart/closeCart");
  // Loading Spinner End
  setTimeout(function () {
    store.commit('themeModule/endLoading')
  }, 500)

});




export default router;

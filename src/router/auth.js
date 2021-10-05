import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";
import router from "@/router";

Vue.use(VueRouter);

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

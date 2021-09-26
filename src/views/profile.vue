<template>
<div>
  <div v-if="isLoggedIn">
    hello user
    {{user}}
  </div>
  <div v-else>
    no user
  </div>
</div>
</template>

<script>
export default {
  name: "profile",
  data: () => {
    return {

    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters["authModule/isAuthenticated"]},
    user : function(){ return this.$store.getters["authModule/StateUser"]},
  },
  beforeCreate() {
    if(this.isLoggedIn) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>

</style>

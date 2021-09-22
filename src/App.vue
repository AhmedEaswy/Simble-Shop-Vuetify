<template>
  <div>
    <v-app>
      <Header />
    </v-app>
  </div>
</template>

<script>
import Header from "./components/global/Header";
import store from "@/store";
export default {
  name: "App",
  components: { Header },
  data: () => ({
    //
  }),
  created() {
    store.dispatch("themeModule/runDefaultTheme", { vm: this });
  }
};
</script>

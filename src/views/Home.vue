<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import store from '@/store';

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
  data() {
    return {
      lang: store.state.lang,
      langs: store.state.langs,
      theme: store.state.theme,
      isDark: store.state.theme === 'dark',
    }
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleChange(currentLang) {
      store.dispatch("handleChange", currentLang);
      window.location.reload();
    },
  },
};
</script>

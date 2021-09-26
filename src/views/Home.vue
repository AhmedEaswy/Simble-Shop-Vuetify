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
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.img"
        >
          <v-sheet
            color="rgba(000,000,000,0.5)"
            height="105%"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="text-h2 white--text">
                {{ slide.title }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: "Home",

  data() {
    return {
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
      slides: [
        {
          img: 'https://picsum.photos/id/11/500/300',
          title: 'First'
        },
        {
          img: 'https://picsum.photos/id/11/500/300',
          title: 'Second'
        },
        {
          img: 'https://picsum.photos/id/11/500/300',
          title: 'Third'
        },
        {
          img: 'https://picsum.photos/id/11/500/300',
          title: 'Fourth'
        },
        {
          img: 'https://picsum.photos/id/11/500/300',
          title: 'Fifth'
        },
      ],
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
      store.dispatch("themeModule/handleChange", currentLang);
      window.location.reload();
    },
  },
};
</script>

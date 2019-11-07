<template>
  <div>
    <h2 class="mx-4 md:mx-6 md:text-xl">{{headline}}</h2>
    <div>
      <swiper :options="swiperOptions" class="mt-6 mb-12 overflow-visible">
        <swiper-slide v-for="(m,index) in gallery" :key="index" class="overflow-visible" :tabindex="0">
          <router-link :to="`/about?id=${m.id}`" class="rounded" tabindex="-1">
            <poster :url="`${cdn}/original/${m.poster_path}`" :title="m.title"></poster>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import poster from "@/components/Poster.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "PosterSlide",
  props: ["headline", "gallery"],
  components: {
    poster,
    swiper,
    swiperSlide
  },
  data() {
    return {
      cdn: this.$store.state.api.cdnPath,
      swiperOptions: {
        slidesPerView: window.matchMedia("(min-width: 1080px)").matches ? 6 : 3,
        spaceBetween: 20,
        grabCursor: true
      }
    };
  }
};
</script>

<style lang="scss">
.swiper-slide {
  opacity: 0.8;
  transition: opacity 360ms ease-in, transform 360ms ease-out;
  &:hover, &:focus {
    opacity: 0.96;
    transform: scale(1.1);
  }
  &:active {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
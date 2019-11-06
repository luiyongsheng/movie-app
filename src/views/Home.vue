<template>
  <div class="home">
    <main class="mx-auto">
      <header>
        <section class="hero relative text-white overflow-hidden">
          <div
            class="bg-no-repeat bg-center bg-cover h-full"
            :style="`background-image:url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`"
          >
            <div class="z-50 absolute bottom-0 w-full">
              <div class="p-6 mb-12 flex flex-col items-center">
                <p class="text-sm star-badge">
                  <ion-icon name="ios-star" class="leading-none text-yellow-600"></ion-icon>
                  <span class="ml-1">{{heroMovie.vote_average}}</span>
                </p>
                <h3 class="text-3xl md:text-5xl font-bold">{{ heroMovie.title }}</h3>
                <p class="text-lg md:text-xl mb-3"></p>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section class="today">
        <div class="flex flex-col">
          <h2 class="mx-4 md:mx-6 text-xl">Trending Now</h2>
          <div class="today">
            <swiper :options="swiperOptions" class="pt-6 pb-12">
              <swiper-slide v-for="(m,index) in todayPick" :key="index">
                <router-link :to="`/about?movie-id=${m.id}`" class="rounded">
                  <img
                    class="rounded w-64 h-full poster mx-4 md:mx-6"
                    :src="`https://image.tmdb.org/t/p/original${m.poster_path}`"
                    :alt="m.title"
                    :title="m.title"
                  />
                </router-link>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "home",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      token: "",
      apiKey: "",
      swiperOptions: {
        slidesPerView: window.matchMedia("(min-width: 1080px)").matches ? 6 : 3,
        spaceBetween: 20,
        grabCursor: true
      },
      todayPick: null,
      heroMovie: null
    };
  },
  mounted() {
    this.token = process.env.VUE_APP_ACCESS_TOKEN;
    this.apiKey = process.env.VUE_APP_API_KEY;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?page=1&include_video=true&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${this.apiKey}`
      )
      .then(resp => {
        this.todayPick = resp.data.results.slice(0, 20);
        this.heroMovie = this.todayPick[Math.floor(Math.random() * 20) - 1];
      });
  }
};
</script>
<style lang="scss">
.hero {
  height: 52vh;
  @media screen and (min-width: 768px) {
    height: 88vh;
  }
  &::after {
    @apply block absolute bottom-0 left-0 w-full h-full;
    content: "";
    background: linear-gradient(to top, #1a202c, transparent);
  }
}
.star-badge {
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.333);
  border-radius: 3px;
}
.poster {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.8),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.swiper-slide {
  opacity: 0.8;
  transition: opacity, transform 360ms ease-out;
  &:hover {
    opacity: 0.96;
    transform: scale(1.1);
  }
  &:active {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
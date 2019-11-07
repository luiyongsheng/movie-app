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
                  <i class="icon ion-ios-star leading-none text-yellow-600"></i>
                  <span class="ml-1">{{heroMovie.vote_average}}</span>
                </p>
                <h3 class="text-3xl md:text-5xl font-bold">{{ heroMovie.title }}</h3>
                <p class="text-lg md:text-xl mb-3"></p>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section class="today-movie">
        <div class="flex flex-col">
          <poster-slide headline="Today's Pick" :gallery="todayPick"></poster-slide>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import posterSlide from "@/components/PosterSlide";

export default {
  name: "home",
  components: {
    posterSlide
  },
  data() {
    return {
      token: "",
      apiKey: "",
      todayPick: [],
      heroMovie: [],
      tvShows: [],
      trendingMovie_week: []
    };
  },
  methods: {
    ...mapActions(["getGenres"])
  },
  created() {
    this.getGenres();
    axios
      .get(
        `${this.$store.state.api.basePath}/discover/movie?page=1&include_video=true&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${this.$store.state.api.key}`
      )
      .then(async resp => {
        this.todayPick = resp.data.results.slice(0, 20);
        this.heroMovie = this.todayPick[Math.floor(Math.random() * 20) - 1];
      });
    axios
      .get(
        `${this.$store.state.api.basePath}/discover/tv?api_key=${this.$store.state.api.key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`
      )
      .then(async resp => {
        this.tvShows = resp.data.results.slice(0, 20);
      });
    axios
      .get(
        `${this.$store.state.api.basePath}/trending/movie/week?api_key=${this.$store.state.api.key}`
      )
      .then(async resp => {
        this.trendingMovie_week = resp.data.results.slice(0, 20);
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
</style>
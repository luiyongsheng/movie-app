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
                <h3
                  class="text-3xl md:text-5xl font-bold text-center leading-none my-3"
                >{{ heroMovie.title }}</h3>
                <p class="text-sm md:text-lg text-center opacity-50">
                  <span
                    class="px-2"
                    v-for="(g,i) in heroMovie.genre_ids"
                    :key="i"
                  >{{getGenresById(g)}}</span>
                </p>
                <div class="mt-6">
                  <button class="px-6 py-3 btn-cta rounded" @click="playTrailer">
                    <i class="icon ion-ios-play mr-3"></i>Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tv absolute top-0 left-0 w-full h-full overflow-hidden">
            <div class="screen mute absolute top-0 right-0 bottom-0 left-0 m-auto" id="tv"></div>
          </div>
        </section>
      </header>

      <section class="today-movie">
        <div class="flex flex-col">
          <poster-slide headline="Today's Pick" :gallery="todayPick"></poster-slide>
        </div>
      </section>
      <section class="trending-tv">
        <div class="flex flex-col">
          <poster-slide headline="Trending TV Shows" :gallery="tvShows"></poster-slide>
        </div>
      </section>
      <section class="trending-tv">
        <div class="flex flex-col">
          <poster-slide
            headline="Movies people are watching this week"
            :gallery="trendingMovie_week"
          ></poster-slide>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import posterSlide from "@/components/PosterSlide";

export default {
  name: "home",
  components: {
    posterSlide
  },
  data() {
    return {
      playerSettings: {
        autoplay: 0,
        autohide: 1,
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
        controls: 0,
        disabledkb: 0,
        enablejsapi: 0,
        iv_load_policy: 3
      },
      heroVideo: null,
      tv: null,
      tvPlaying: false,
      todayPick: [],
      heroMovie: [],
      tvShows: [],
      trendingMovie_week: []
    };
  },
  methods: {
    playerReady() {
      this.tv.loadVideoById({
        videoId: this.heroVideo,
        suggestedQuality: "hd1080"
      });
      this.tv.mute();
    },
    playTrailer() {
      document.getElementById("tv").classList.add("active");
      /*this.tv.loadVideoById({
        videoId: this.heroVideo,
        suggestedQuality: "hd1080"
      });*/
      this.tv.seekTo(0);
      this.tv.unMute();
    },
    videoRescale() {
      var w = window.innerWidth,
        h = window.innerHeight;
      if (w / h > 16 / 9) {
        this.tv.setSize(w, (w / 16) * 9);
        document.getElementById("tv").style.left = "0px";
      } else {
        this.tv.setSize((h / 9) * 16, h);
        var dom = document.getElementById("tv");
        dom.style.left = `-${dom.outerWidth - w / 2}`;
      }
    },
    ...mapActions(["fetchGenres"])
  },
  computed: {
    ...mapGetters(["getGenresById"])
  },
  created() {
    this.fetchGenres();
    window.addEventListener("load", this.videoRescale);
    window.addEventListener("resize", this.videoRescale);
    axios
      .get(
        `${this.$store.state.api.basePath}/discover/movie?page=1&include_video=true&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${this.$store.state.api.key}`
      )
      .then(async resp => {
        this.todayPick = resp.data.results.slice(0, 20);
        this.heroMovie = this.todayPick[Math.floor(Math.random() * 20) - 1];
        axios
          .get(
            `${this.$store.state.api.basePath}/movie/${this.heroMovie.id}/videos?language=en-US&api_key=${this.$store.state.api.key}`
          )
          .then(resp => {
            var v =
              resp.data.results[
                Math.floor(Math.random()) * resp.data.results.length
              ];
            this.heroVideo = v.key;
            this.tv = new window.YT.Player("tv", {
              events: {
                onReady: this.playerReady
              },
              playerVars: this.playerSettings
            });
          });
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
.screen {
  opacity: 0;
  transition: opacity 369ms;
  &.active {
    opacity: 1;
  }
}
.btn-cta {
  background: rgba(#2d3748, 0.8);
  backdrop-filter: saturate(180%) blur(20px);

  box-shadow: 0 0 48px rgba(#2d3748, 0.3618);
  transition: 128ms ease-out;
  outline: none !important;
  @apply border border-transparent font-bold;

  &:hover {
    background: rgba(#2d3748, 0.5);
    @apply border-gray-700;
  }
  &:active {
    background: rgba(#48556b, 0.8);
  }
}
</style>
<template>
  <div class="home">
    <main class="mx-auto">
      <header>
        <section class="hero relative text-white overflow-hidden">
          <div
            class="bg-no-repeat bg-center bg-cover h-full"
            style="background-image:url(https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg)"
          >
            <div class="z-50 absolute bottom-0 w-full">
              <div class="p-6 mb-12 flex flex-col items-center">
                <p class="text-sm star-badge">
                  <ion-icon name="ios-star" class="leading-none text-yellow-600"></ion-icon>
                  <span class="ml-1">8.5</span>
                </p>
                <h3 class="text-3xl md:text-5xl font-bold">Joker</h3>
                <p class="text-lg md:text-xl mb-3">Mischief. Mayhem. Soap.</p>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section class="today">
        <div class="flex flex-col">
          <h2 class="mx-4 md:mx-6 my-3 text-xl">Today's Pick</h2>
          <div class="today mb-12">
            <vue-glide
              :perView="8"
              :gap="25"
              :rewind="false"
              :breakpoints="{
            1024: {
              perView: 5
            },
            800: {
              perView: 4,
            },
            576: {
              perView: 3,
              peek: {
                before: 0,
                after: 0,
              }
            }
          }"
            >
              <vue-glide-slide v-for="i in 12" :key="i">
                <router-link to="/" class="block rounded">
                  <img
                    class="rounded overflow-hidden w-64 h-full poster mt-3 mb-12 mx-4 md:mx-6"
                    src="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
                  />
                </router-link>
              </vue-glide-slide>
            </vue-glide>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      token: ""
    };
  },
  mounted() {
    this.token = process.env.VUE_APP_ACCESS_TOKEN;
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
</style>
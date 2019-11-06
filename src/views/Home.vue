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
                <h3 class="text-3xl md:text-5xl font-bold">Joker</h3>
                <p class="text-lg md:text-xl mb-6">Mischief. Mayhem. Soap.</p>
                <p class="text-sm"><ion-icon name="ios-star" class="text-yellow-600"></ion-icon> 7.2</p>
              </div>
            </div>
          </div>
        </section>
      </header>
    </main>
    <div class="fixed bottom-0 w-full">
      <aside class="flex self-center items-center sticky justify-center mb-4 md:mb-6">
        <nav
          class="flex flex-row items-center justify-center self-center p-4 md:p-8 icon-nav border border-gray-800 hover:border-gray-700"
        >
          <ion-icon name="ios-home" class="text-3xl mx-6 md:mx-8"></ion-icon>
          <ion-icon name="ios-search" class="text-3xl mx-6 md:mx-8"></ion-icon>
          <ion-icon name="ios-star" class="text-3xl mx-6 md:mx-8"></ion-icon>
          <ion-icon name="ios-settings" class="text-3xl mx-6 md:mx-8"></ion-icon>
        </nav>
      </aside>
    </div>
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
.icon-nav {
  background: rgba(#2d3748, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  border-radius: 12px;
  box-shadow: 0 0 48px rgba(#2d3748, 0.3618);
  transition: 256ms ease-in;

  &:hover {
    box-shadow: 0 0 32px rgba(#697a97, 0.3618);
  }
}
</style>
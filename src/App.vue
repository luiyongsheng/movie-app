<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen relative">
    <div class="w-full overflow-hidden">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>
    <div class="fixed bottom-0 w-full z-50">
      <aside class="flex self-center items-center sticky justify-center mb-4 md:mb-6">
        <nav
          class="flex flex-row items-center justify-center self-center p-4 md:p-6 icon-nav border border-gray-800 hover:border-gray-700"
        >
          <router-link to="/">
            <div class="flex flex-col items-center hover:text-yellow-500">
              <ion-icon name="ios-home" class="text-3xl mx-6 md:mx-8"></ion-icon>
            </div>
          </router-link>
          <ion-icon name="ios-search" class="text-3xl mx-6 md:mx-8"></ion-icon>
          <router-link to="/about">
            <div class="flex flex-col items-center hover:text-yellow-500">
              <ion-icon name="ios-settings" class="text-3xl mx-6 md:mx-8"></ion-icon>
            </div>
          </router-link>
        </nav>
      </aside>
    </div>
  </div>
</template>

<style lang="scss">
* {
  -webkit-tap-highlight-color: transparent;
}

/**
  Vue Transition
**/
.page-enter-active,
.page-leave-active {
  transition: opacity 260ms ease-in, transform 260ms ease-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: scale(1.1);
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

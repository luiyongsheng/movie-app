<template>
  <div>
    <img :src="url" :title="title" :alt="title" class="rounded w-64 h-full poster mx-4 md:mx-6" />
  </div>
</template>
<script>
export default {
  name: "Poster",
  props: ["title", "url"]
};
</script>
<style lang="scss" scoped>
.poster {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.8),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
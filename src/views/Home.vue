<template>
  <div class="home">
    <p>{{ token }}</p>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      token: ''
    }
  },
  mounted() {
    this.token = process.env.VUE_APP_ACCESS_TOKEN
  }
}
</script>

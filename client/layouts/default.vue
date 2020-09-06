<template lang="pug">
  div
    navbar
    nuxt
    fixed-img(
      v-if="bodyImages.length > 0"
      v-for="(img, ind) in bodyImages"
      :src="img.src"
      :position="img.position"
      :key="ind")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  middleware: 'checkAuth',

  watch: {
    async $route() {
      await this.$store.dispatch('init')
    },
  },

  computed: mapState(['bodyImages']),

  async fetch() {
    await this.$store.dispatch('init')
  },
})
</script>

<style lang="scss">
nav a {
  border-bottom: 0px;
}
</style>

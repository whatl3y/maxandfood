<template lang="pug">
  div
    Navbar
    Nuxt
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  watch: {
    async $route() {
      await this.$store.dispatch('init')
    },
  },

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

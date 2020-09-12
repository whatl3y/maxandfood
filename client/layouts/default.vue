<template lang="pug">
  v-app
    navbar
    v-main
      v-container(fluid)
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
  middleware: ['initState', 'checkAuth'],
  computed: mapState(['bodyImages']),
})
</script>

<style lang="scss">
nav a {
  border-bottom: 0px;
}
</style>

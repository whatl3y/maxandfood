<template lang="pug">
  img.no-border(:src="imgSrc" :class="imgClass")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    src: { type: String, required: true },
    position: { type: String, default: null },
  },

  computed: {
    imgClass() {
      return this.position || 'bottomright'
    },

    imgSrc() {
      return `http://public.maxandfood.com/${this.src}`
    },
  },
})
</script>

<style lang="scss" scoped>
img {
  position: fixed;
  max-width: 200px;
  max-height: auto;

  &.topleft {
    top: 50px;
    left: 0;
  }

  &.topright {
    top: 50px;
    right: 0;
  }

  &.bottomleft {
    bottom: 0;
    left: 0;
  }

  &.bottomright {
    bottom: 0;
    right: 0;
  }
}
</style>

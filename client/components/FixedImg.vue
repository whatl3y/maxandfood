<template lang="pug">
  img.no-border(:src="imgSrc" :class="imgClass")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    src: { type: String, required: true },
    position: { type: String, default: null },
  },

  computed: {
    ...mapState(['s3BucketUrl']),

    imgClass() {
      return this.position || 'bottomright'
    },

    imgSrc() {
      return `${this.s3BucketUrl}/${this.src}`
    },
  },
})
</script>

<style lang="scss" scoped>
img {
  position: fixed;
  max-height: auto;

  max-width: 50px;

  @media only screen and (min-width: 768px) {
    max-width: 120px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 200px;
  }

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

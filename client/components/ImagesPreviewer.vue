<template lang="pug">
  div.row.small-gutters.mb-0
    div.col.xs-12.mb-2
      img(:src="`${s3BucketUrl}/${main}`" :class="!border && 'border-0'")
    template(v-for="image in images")
      div.col.xs-4.sm-3.md-2.clickable(v-if="image != main" @click="changeMain(image)")
        img.border-0(:src="`${s3BucketUrl}/${image}`" :class="!border && 'border-0'")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    images: { type: Array, default: () => [] },
    border: { type: Boolean, default: true },
  },

  data() {
    return {
      main: null,
    }
  },

  computed: mapState(['s3BucketUrl']),

  methods: {
    changeMain(newImg) {
      this.main = newImg
    },
  },

  created() {
    this.main = this.images[0]
  },
})
</script>

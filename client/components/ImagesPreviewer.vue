<template lang="pug">
  v-row(dense align="center" justify="center")
    v-col(cols="12")
      v-img(:src="`${s3BucketUrl}/${main}`")
    template(v-for="(image, ind) in images")
      v-col(:key="ind" xs="4" sm="3" md="2" v-if="image != main" @click="changeMain(image)")
        v-img.clickable(:src="`${s3BucketUrl}/${image}`")
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

<template lang="pug">
  v-chip(
    :large="large"
    :x-large="xLarge"
    :small="small"
    :x-small="xSmall"
    :close="close"
    :color="color || 'blue'"
    :text-color="getTextColor(color || 'blue')"
    @click="click"
    @click:close="clickClose")
      slot
</template>

<script lang="ts">
import Vue from 'vue'
import { isDarkColor } from '../helpers/Colors'

export default Vue.extend({
  props: {
    color: { type: String, default: null },
    close: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
  },

  methods: {
    getTextColor(bgCol) {
      return isDarkColor(bgCol) ? '#fff' : '#000'
    },

    click() {
      this.$emit('click', ...arguments)
    },

    clickClose() {
      this.$emit('close', ...arguments)
    },
  },
})
</script>

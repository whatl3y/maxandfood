<template lang="pug">
  div
    v-btn.mr-1(color="warning" fab dark small @click="remove")
      i.fa.fa-minus
    v-btn(color="success" fab dark small @click="add")
      i.fa.fa-plus
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    add() {
      this.$emit('add')
    },

    remove() {
      this.$emit('remove')
    },
  },
})
</script>

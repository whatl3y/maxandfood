<template lang="pug">
  div
    button.mr-1.btn-danger-outline.btn-small(@click="remove") #[i.fa.fa-minus]
    button.btn-success-outline.btn-small(@click="add") #[i.fa.fa-plus]
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

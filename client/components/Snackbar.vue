<template lang="pug">
  v-snackbar(
    v-model="show"
    :color="color"
    :bottom="true"
    :right="true")
      | {{ text }}
      template(v-slot:action="{ attrs }")
        v-btn(text color="white" v-bind="attrs" @click="show = false") Close
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    color() {
      return this.$store.state.snackbar.color
    },

    text() {
      return this.$store.state.snackbar.text
    },

    show: {
      get() {
        return this.$store.state.snackbar.show
      },

      set(v) {
        this.$store.commit('SET_SNACKBAR_SHOW', v)
      },
    },
  },
})
</script>

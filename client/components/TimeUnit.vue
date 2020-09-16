<template lang="pug">
  v-row(align="center")
    v-col(cols="12")
      v-text-field(
        v-model='time'
        light
        prepend-icon='mdi-clock'
        :label='label'
        type="number")
    v-col(cols="12")
      v-select(
        label="Time units"
        :items="timeUnits"
        v-model="units"
        prepend-icon="mdi-clock")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: Object, required: true },
    label: { type: String, default: 'Enter time' },
  },

  computed: {
    timeUnits() {
      return ['minutes', 'hours']
    },

    time: {
      get() {
        return this.value.time
      },

      set(newTime) {
        this.$emit('input', { ...this.value, time: newTime })
      },
    },

    units: {
      get() {
        return this.value.units
      },

      set(newUnit) {
        this.$emit('input', { ...this.value, units: newUnit })
      },
    },
  },
})
</script>

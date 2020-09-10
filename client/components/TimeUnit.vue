<template lang="pug">
  div.form-group.m-0
    label
      h4.my-0 {{ label }}
    input#prep-time.mb-1.input-block(type="number" :placeholder="label" v-model="time")
    select#prep-time-unit.input-block(v-model="units")
        option(v-for="u in timeUnits" :value="u") {{ u }}
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

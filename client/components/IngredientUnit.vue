<template lang="pug">
  v-select(
    placeholder="Unit..."
    :options="options"
    :reduce="u => u.label"
    v-model="unit")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: Object, default: () => null },
  },

  data() {
    return {
      options: [
        { label: 'teaspoon (tsp)', value: 'tsp' },
        { label: 'tablespoon (tbsp)', value: 'tbsp' },
        { label: 'fluid ounce (fl oz)', value: 'fl oz' },
        { label: 'cup', value: 'cup' },
        { label: 'pint', value: 'pint' },
        { label: 'quart', value: 'quart' },
        { label: 'gallon', value: 'gallon' },
        { label: 'milliliter (ml)', value: 'ml' },
        { label: 'liter (l)', value: 'l' },

        { label: 'pound (lb)', value: 'lb' },
        { label: 'ounce (oz)', value: 'oz' },
        { label: 'milligram (mg)', value: 'mg' },
        { label: 'gram (g)', value: 'g' },
        { label: 'kilogram (kg)', value: 'kg' },
      ],
    }
  },

  computed: {
    unit: {
      get() {
        return this.value
      },

      set(newUnit) {
        this.$emit('input', newUnit)
      },
    },
  },
})
</script>

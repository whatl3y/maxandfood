<template lang="pug">
  v-select(
    label="Unit"
    :items="options"
    v-model="unit")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: String, default: null },
  },

  data() {
    return {
      options: [
        { text: 'teaspoon (tsp)', value: 'tsp' },
        { text: 'tablespoon (tbsp)', value: 'tbsp' },
        { text: 'fluid ounce (fl oz)', value: 'fl oz' },
        { text: 'cup', value: 'cup' },
        { text: 'pint', value: 'pint' },
        { text: 'quart', value: 'quart' },
        { text: 'gallon', value: 'gallon' },
        { text: 'milliliter (ml)', value: 'ml' },
        { text: 'liter (l)', value: 'l' },

        { text: 'pound (lb)', value: 'lb' },
        { text: 'ounce (oz)', value: 'oz' },
        { text: 'milligram (mg)', value: 'mg' },
        { text: 'gram (g)', value: 'g' },
        { text: 'kilogram (kg)', value: 'kg' },
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

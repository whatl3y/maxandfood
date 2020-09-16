<template lang="pug">
  vue-select(
    placeholder="Search for ingredient..."
    :filterBy="() => true"
    :options="options"
    v-model="ingredient"
    @search="ingredientSearch")
      template(v-slot:no-options="{ search, searching }")
        template(v-if="searching") Searching...
        template(v-else)
          i Type something to search...
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '../helpers/Utils'

// NOTE: see filterBy option in vue-select, prevents
// results from being filtered since they're filtered
// based on scoring from the usda.gov website
// https://vue-select.org/api/props.html#filterby

export default Vue.extend({
  props: {
    value: { type: Object, default: () => null },
  },

  data() {
    return {
      options: [
        // {label: 'long desc of ingredient', raw: {raw JSON}}
      ],
    }
  },

  computed: {
    ingredient: {
      get() {
        return this.value
      },

      set(newIng) {
        this.$emit('input', newIng)
      },
    },
  },

  methods: {
    ingredientSearch: debounce(async function (searchText): Promise<void> {
      if (!searchText || searchText.length === 0) return
      const data = await this.$axios.$get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=dzwAjo4eBbJq9ERLlUGoz0dvUvZDcNnB8ibX5hgr&dataType=SR%20Legacy&query=${searchText}&sortBy=score&sortOrder=desc&pageSize=100`
      )
      this.options = data.foods.map((food) => ({
        label: food.description,
        raw: food,
      }))
    }, 600),
  },
})
</script>

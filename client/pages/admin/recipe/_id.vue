<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center")
      v-col(offset-md="2" md="8")
        h1.text-center Create new recipe!

        v-text-field(
          v-model='title'
          light
          prepend-icon='mdi-hamburger'
          label='Recipe Title')

        h2.mt-5 Recipe Images
        v-row(v-if="images.length > 0" dense align="center" justify="center")
          v-col(cols="12" md="3" v-for="(img, ind) in images" :key="ind")
            v-img(:src="`${s3BucketUrl}/${img.imageNameOptimized}`")
        file-uploader(
          :options="{ acceptedFiles: 'image/*' }"
          @added="addImage")

        h2.mt-5 Timing
        v-row
          v-col(md="6")
            v-card
              v-card-text
                time-unit(v-model="prepTime" label="Prep time")
          v-col(md="6")
            v-card
              v-card-text
                time-unit(v-model="cookTime" label="Cook time")

        h2.mt-5 Recipe Narrative
        client-only(placeholder="Loading...")
          v-card
            v-card-text
              rich-text-editor(v-model="narrative")

        v-divider.my-6

        h2.mb-3
          div.d-flex.align-items-center
            | Ingredients
            add-remove.float-left.py-0.col(
              @add="ingredients.push({quantity: null, measurement: null, description: null, raw: null})"
              @remove="ingredients.splice(ingredients.length - 1, 1)")
        v-card.mb-2(v-for="(ingredient, ind) in ingredients" :key="ind")
          v-card-text
            v-row(align="center" justify="center")
              v-col.text-right.py-0(cols="12" md="1") {{ ind + 1 }}.
              v-col.py-0(cols="12" md="2")
                v-text-field(
                  v-model='ingredient.quantity'
                  light
                  prepend-icon='mdi-number'
                  label='Amount'
                  type="number")
              v-col.py-0(cols="12" md="3")
                ingredient-unit(v-model="ingredient.measurement")
              v-col.py-0(cols="12" md="5")
                ingredient-finder(v-model="ingredient.raw")

        v-divider.my-6

        h2.mb-3
          div.d-flex.align-items-center
            | Directions
            add-remove.float-left.py-0.col(
              @add="directions.push({description: null})"
              @remove="directions.splice(directions.length - 1, 1)")
        v-card.mb-2(v-for="(direction, ind) in directions" :key="ind")
          v-card-text
            v-row(align="center" justify="center")
              v-col.text-right.py-0(cols="1") {{ ind + 1 }}.
              v-col.py-0(cols="11")
                v-textarea.mr-3(
                  rows="1"
                  :auto-grow="true"
                  v-model="direction.description"
                  placeholder="Add direction here...")

        v-btn.my-10(
          x-large
          :block="true"
          color="success"
          @click="saveRecipe") Save
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  watch: {
    async id() {
      await this.fetchRecipe()
    },
  },

  data() {
    const defaultNarrative = `
        <h1>This is a heading!</h1>
        <p>Optionally add whatever you'd like to discuss personally that will show up at the top of the recipe! Leave this section blank if you don't want a narrative.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <ol>
          <li>add lists that can list out</li>
          <li>whatever you would like</li>
        </ol>
      `

    return {
      title: null,
      ingredients: [
        { quantity: null, measurement: null, description: null, raw: null },
      ],
      directions: [{ description: null }],
      images: [],
      prepTime: { time: null, units: 'minutes' },
      cookTime: { time: null, units: 'minutes' },

      defaultNarrative,
      narrative: defaultNarrative,
    }
  },

  computed: {
    ...mapState(['s3BucketUrl', 'recipe']),

    id() {
      return this.$route.params.id
    },
  },

  methods: {
    addImage([_, imgInfo]) {
      this.images = this.images.concat([imgInfo])
    },

    async fetchRecipe() {
      try {
        if (this.id === 'new') return

        await this.$store.dispatch('getRecipe', this.id)

        this.title = this.recipe.title
        this.narrative = this.recipe.narrative || this.narrative
        this.prepTime.time = this.recipe.prepTime || this.prepTime.time
        this.prepTime.units = this.recipe.prepTimeUnits || this.prepTime.units
        this.cookTime.time = this.recipe.cookTime || this.cookTime.time
        this.cookTime.units = this.recipe.cookTimeUnits || this.cookTime.units
        this.ingredients = JSON.parse(
          JSON.stringify(this.recipe.recipe_ingredients)
        )
        this.directions = JSON.parse(
          JSON.stringify(this.recipe.recipe_directions)
        )
        this.images = JSON.parse(JSON.stringify(this.recipe.recipe_images))
      } catch (err) {}
    },

    async saveRecipe() {
      try {
        await this.$axios.$post('/api/1.0/recipes/save', {
          id: (this.id !== 'new' && this.id) || null,
          title: this.title,
          ingredients: this.ingredients,
          directions: this.directions,
          images: this.images,
          prepTime: this.prepTime,
          cookTime: this.cookTime,
          narrative:
            (this.narrative !== this.defaultNarrative && this.narrative) ||
            null,
        })
      } catch (err) {}
    },
  },

  async created() {
    await this.fetchRecipe()
  },
})
</script>

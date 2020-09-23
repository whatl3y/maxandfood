<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center")
      v-col(offset-md="2" md="8")
        h3.text-h3.text-center.mb-5
          | {{ id !== 'new' ? `Edit ${title || 'recipe'}` : 'Create new recipe!' }}

        v-text-field(
          v-model='title'
          light
          prepend-icon='mdi-hamburger'
          label='Recipe Title')

        tag-selector(v-model="tags")

        h3.text-h3.mt-5 Recipe Summary
        div.my-2
          | Optionally add whatever you'd like to discuss personally that
          | will show up at the top of the recipe! Leave this section
          | blank if you don't want a summary.
        client-only(placeholder="Loading...")
          rich-text-editor(v-model="narrative")

        h3.text-h3.mt-5 Images
        draggable(
          v-if="images.length > 0"
          v-model="images"
          tag="v-row"
          :component-data="{ props: { align: 'center', justify: 'center' }}")
            v-col(cols="6" md="3" v-for="(img, ind) in images" :key="`img-${ind}`")
              v-card(:elevation="1")
                v-img(:src="`${s3BucketUrl}/${img.imageNameOptimized}`")
                v-card-actions.d-flex.justify-end
                  v-btn(color="red" fab dark small @click="removeImage(ind)")
                    v-icon mdi-close
        file-uploader(
          :options="{ acceptedFiles: 'image/*' }"
          @added="addImage")

        h3.text-h3.mt-5 Timing
        v-row
          v-col(cols="12" md="6")
            v-card
              v-card-text
                time-unit(v-model="prepTime" label="Prep time")
          v-col(cols="12" md="6")
            v-card
              v-card-text
                time-unit(v-model="cookTime" label="Cook time")

        v-divider.my-6

        v-text-field(
          v-model='yieldServings'
          light
          prepend-icon='mdi-alpha-y-box'
          label='Yield Servings'
          type='number')

        h3.text-h3.mb-3
          div.d-flex.align-center
            | Ingredients
            add-remove.float-left.py-0.col(
              @add="ingredients.push({quantity: null, measurement: null, description: null, raw: null})"
              @remove="ingredients.splice(ingredients.length - 1, 1)")
        v-alert(color="yellow" v-if="ingredients.length === 0")
          | Add ingredients by clicking the plus sign above!
        draggable(v-else v-model="ingredients")
          v-card.mb-2(
            v-for="(ingredient, ind) in ingredients"
            elevation="1"
            :key="`ingredient-${ind}`")
              v-card-text
                v-row(align="center" justify="center")
                  //- v-col.text-right.py-0(cols="12" md="1") {{ ind + 1 }}.
                  v-col.py-0(cols="12" md="6")
                    v-text-field(
                      v-model='ingredient.quantity'
                      light
                      label='Amount'
                      type="number")
                  v-col.py-0(cols="12" md="6")
                    ingredient-unit(v-model="ingredient.measurement")
                  v-col.py-0(cols="12" md="6")
                    v-text-field(
                      v-model='ingredient.description'
                      light
                      label='Ingredient Description')
                  v-col.py-0(cols="12" md="6")
                    ingredient-finder(v-model="ingredient.raw")

        v-divider.my-6

        h3.text-h3.mb-3
          div.d-flex.align-center
            | Directions
            add-remove.float-left.py-0.col(
              @add="directions.push({description: null})"
              @remove="directions.splice(directions.length - 1, 1)")
        v-alert(color="yellow" v-if="directions.length === 0")
          | Add directions by clicking the plus sign above!
        draggable(v-else v-model="directions")
          v-card.mb-2(
            v-for="(direction, ind) in directions"
            elevation="1"
            :key="`direction-${ind}`")
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
    return {
      title: null,
      ingredients: [
        // { quantity: null, measurement: null, description: null, raw: null },
      ],
      directions: [
        // { description: null }
      ],
      images: [],
      tags: [],
      prepTime: { time: null, units: 'minutes' },
      cookTime: { time: null, units: 'minutes' },
      yieldServings: null,

      narrative: null,
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

    removeImage(imgInd) {
      this.images.splice(imgInd, 1)
    },

    async fetchRecipe() {
      try {
        if (this.id === 'new') return

        await this.$store.dispatch('getRecipe', this.id)

        this.title = this.recipe.title
        this.yieldServings = this.recipe.yieldServings || this.yieldServings
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
        this.tags = JSON.parse(JSON.stringify(this.recipe.tags))
      } catch (err) {}
    },

    async saveRecipe() {
      try {
        const { id } = await this.$axios.$post('/api/1.0/recipes/save', {
          id: (this.id !== 'new' && this.id) || null,
          title: this.title,
          ingredients: this.ingredients,
          directions: this.directions,
          images: this.images,
          tags: this.tags,
          prepTime: this.prepTime,
          cookTime: this.cookTime,
          narrative: this.narrative,
          yieldServings: this.yieldServings,
        })
        // this.$router.push(`/admin/settings/recipes`)
        this.$router.push(`/p/${id}`)
      } catch (err) {
        this.$toast.responseError(err)
      }
    },
  },

  async created() {
    await this.fetchRecipe()
  },
})
</script>

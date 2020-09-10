<template lang="pug">
  div.container.container-sm
    h1.text-center Create new recipe!

    div.form-group
      label(for="recipe-title")
        h4.mt-3.mb-0 Recipe Title
      input#recipe-title.input-block(placeholder="Recipe Title" v-model="title")

    div.form-group
    label
      h4.mt-3.mb-0 Recipe Images
      div.my-1.row(v-if="images.length > 0")
        div.col.md-3(v-for="img in images")
          img(:src="`${s3BucketUrl}/${img.imageNameOptimized}`")
      file-uploader(
        :options="{ acceptedFiles: 'image/*' }"
        @added="addImage")

    div.form-group
      label
        h4.mt-3.mb-0 Timing
      div.row
        div.col.md-6
          div.card
            div.card-body.background-secondary
              time-unit(v-model="prepTime" label="Prep time")
        div.col.md-6
          div.card
            div.card-body.background-secondary
              time-unit(v-model="cookTime" label="Cook time")
            //- div.row.small-gutters
            //-   div.col.md-6
            //-     input#prep-time.input-block(type="number" placeholder="Prep time" v-model="prepTime")
            //-   div.col.md-6
            //-     select#prep-time-unit.input-block(v-model="prepTimeUnit")
            //-       option(v-for="unit in timeUnits" :value="unit") {{ unit }}

    div.form-group
      label
        h4.mt-3.mb-0 Recipe Narrative
      client-only(placeholder="Loading...")
        rich-text-editor(v-model="narrative")

    hr.py-4
    
    div.form-group
      label.row.small-gutters.py-0.mt-3
        h4.float-left.py-0.col.my-0 Recipe Ingredients
        add-remove.float-left.py-0.col(
          @add="ingredients.push({quantity: null, measurement: null, description: null, raw: null})"
          @remove="ingredients.splice(ingredients.length - 1, 1)")
      div.row.small-gutters.flex-middle(v-for="(ingredient, ind) in ingredients")
        div.py-1.col.md-1 {{ ind + 1 }}.
        div.py-1.col.md-2
          input.input-block(
            type="number"
            placeholder="Amount"
            v-model="ingredient.quantity")
        div.py-1.col.md-3
          ingredient-unit(v-model="ingredient.measurement")
        div.py-1.col.md-5
          ingredient-finder(v-model="ingredient.raw")

    hr.py-4
    
    div.form-group
      label.row.small-gutters.py-0.mt-3
        h4.float-left.py-0.col.my-0 Recipe Directions
        add-remove.float-left.py-0.col(
          @add="directions.push({description: null})"
          @remove="directions.splice(directions.length - 1, 1)")
      div.row(v-for="(direction, ind) in directions")
        div.py-1.col.md-1 {{ ind + 1 }}.
        div.py-1.col.md-11
          textarea.input-block(
            v-model="direction.description"
            placeholder="Add direction here...")

    hr.py-4

    button.mb-5.btn-large.btn-block.btn-success(@click="saveRecipe") Save

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
        <h3>This is a heading!</h3>
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

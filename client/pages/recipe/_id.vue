<template lang="pug">
  div.container.container-sm
    div.alert.alert-danger(v-if="!recipe")
      | Uh oh, we didn't find the recipe!
    template(v-else)
      h1.mt-0.mb-4.align-middle.row.flex-middle
        //- nuxt-link.mr-2(v-if="user" :to="`/admin/recipe/${recipe.id}`")
        //-   button.btn-warning-outline.btn-small
        //-     i.fa.fa-edit
        img.col.px-0(
          v-if="recipe.recipe_ingredients.length > 0"
          :src="`${s3BucketUrl}/${recipe.recipe_images[0].imageNameOptimized}`"
          style="max-height: 120px;")
        div.col.col-fill {{ recipe.title }}

      div.narrative.mb-4(v-if="recipe.narrative")
        div(v-html="recipe.narrative")

      div.row.mb-0.small-gutters
        div.col.md-7.mb-4
          images-previewer(:images="recipeImages")
        div.col.md-5.mb-4.text-secondary(v-if="recipe.recipe_ingredients.length > 0")
          h5.mt-0.mb-2 #[i.fa.fa-pepper-hot] Ingredients
          div.p-2
            small
              ul.pl-4.my-0
                li.mb-3(v-for="ing in recipe.recipe_ingredients")
                  | {{ ing.quantity }} {{ ing.measurement }} {{ ing.raw.label }}

      div.border.px-4.mb-4
        h2.mt-3 #[i.fa.fa-list-ol] Directions
        ol.text-large
          li.mb-2(v-for="dir in recipe.recipe_directions")
            | {{ dir.description }}

</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  watch: {
    async id(newId) {
      await this.$store.dispatch('getRecipe', newId)
    },
  },

  computed: {
    ...mapState(['s3BucketUrl', 'recipe', 'user']),

    id() {
      return this.$route.params.id
    },

    recipeImages() {
      return this.recipe.recipe_images.map((i) => i.imageNameOptimized)
    },
  },

  async middleware({ route, store }: Context) {
    await store.dispatch('getRecipe', route.params.id)
  },
})
</script>

<style lang="scss">
.narrative {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0px;
    margin-bottom: 1rem;
  }
}
</style>

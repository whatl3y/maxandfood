<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center")
      v-col(offset-md="2" md="8")
        v-alert(v-if="!recipe" type="error")
          | Uh oh, we didn't find the recipe!
        
        template(v-else)
          h1
            v-row(align="center")
              v-col(cols="2" v-if="recipe.recipe_ingredients.length > 0")
                v-img(:src="`${s3BucketUrl}/${recipe.recipe_images[0].imageNameOptimized}`")
              v-col {{ recipe.title }}

          div.narrative.mb-4(v-if="recipe.narrative")
            div(v-html="recipe.narrative")

          v-row
            v-col.mb-4(md="7")
              images-previewer(:images="recipeImages")
            v-col.mb-4(md="5")
              h5.mb-2 #[i.fa.fa-pepper-hot] Ingredients
              //- v-list
              //-   v-list-item-group
              //-     v-list-item.mb-2(v-for="(ing, ind) in recipe.recipe_ingredients" :key="ind")
              //-       | {{ ing.quantity }} {{ ing.measurement }} {{ ing.raw.label }}
              ul
                li.mb-3(v-for="ing in recipe.recipe_ingredients")
                  | {{ ing.quantity }} {{ ing.measurement }} {{ ing.raw.label }}

          v-row(align="center" justify="center")
            v-col(md="12")
              v-card
                v-card-title
                  h2 #[i.fa.fa-list-ol] Directions
                v-card-text
                  ol
                    li.mb-2(v-for="(dir, ind) in recipe.recipe_directions" :key="ind")
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

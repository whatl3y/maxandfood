<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center")
      v-col(offset-md="2" md="8" offset-lg="3" lg="6")
        v-alert(v-if="!recipe" type="error")
          | Uh oh, we didn't find the recipe!
        
        template(v-else)
          h3.text-h3
            div.d-flex.align-center
              div.mr-2(v-if="recipe.recipe_images.length > 0")
                v-avatar(size="62")
                  img(:src="`${s3BucketUrl}/${recipe.recipe_images[0].imageNameOptimized}`")
              div {{ recipe.title }}
          
          div.mt-3(v-if="recipe.tags && recipe.tags.length > 0")
            tag.mr-1(
              v-for="tag in recipe.tags"
              small
              :key="`recipe-tag-${tag.id}`"
              :color="tag.colorHex") {{ tag.name }}

          div.narrative.my-4(v-if="recipe.narrative")
            div(v-html="recipe.narrative")

          v-card.mb-4.darken-4(v-if="recipe.prepTime || recipe.cookTime" color="indigo" dark)
            v-card-title
              v-row(align="center" justify="center")
                v-col.d-flex.align-center.flex-column.py-0(cols="6" md="4")
                  div.text-uppercase prep time
                  v-avatar.accent-1(color="indigo" size="72")
                    div
                      h3.text-h3(style="line-height: 2rem;") {{ recipe.prepTime }}
                      div.text-caption.font-weight-light {{ recipe.prepTimeUnits }}
                v-col.d-flex.align-center.flex-column.py-0(cols="6" md="4")
                  div.text-uppercase cook time
                  v-avatar.accent-1(color="indigo" size="72")
                    div
                      h3.text-h3(style="line-height: 2rem;") {{ recipe.cookTime }}
                      div.text-caption.font-weight-light {{ recipe.cookTimeUnits }}
                v-col.d-flex.align-center.flex-column.py-0(cols="6" md="4")
                  div.text-uppercase total time
                  v-avatar.accent-1(color="indigo" size="72")
                    div
                      h3.text-h3(style="line-height: 2rem;") {{ totalTime }}
                      div.text-caption.font-weight-light {{ totalTimeUnits }}

          v-row(v-if="shouldShowImageAndSpecCard")
            v-col.mb-4(md="12")
              //- images-previewer(:images="recipeImages")
              v-card(elevation="1")
                div.d-flex.align-center
                  v-list(two-line)
                    v-list-item
                      v-list-item-avatar(v-if="recipe.user && recipe.user.avatarUrl")
                        v-img(:src="recipe.user.avatarUrl")
                      v-list-item-content
                        div.d-flex
                          div
                            v-list-item-title {{ recipe.user.firstName }} {{ recipe.user.lastName }}
                            v-list-item-subtitle {{ $dayjs.formatDate(recipe.createdAt) }}
                          div.ml-auto.d-flex.align-end(v-if="recipe.yieldServings")
                            h4.text-h4.mr-1 {{ recipe.yieldServings }}
                            small.text--secondary servings
                  div.ml-auto.px-4.d-flex.flex-column.align-end
                    div.grey--text
                      small.success--text(v-if="recipeUserRating")
                        | Thanks for rating this recipe with a #[strong {{ recipeUserRating }}]
                      small(v-else) Rate {{ recipe.user.firstName }}'s recipe!
                    v-rating(
                      small
                      dense
                      hover
                      half-increments
                      color="orange"
                      :value="recipeAvgRating"
                      @input="setUserRating")
                v-carousel(:cycle="true")
                  v-carousel-item(
                    v-for="(img, ind) in recipeImages"
                    :key="`img-carousel-${ind}`"
                    :src="`${s3BucketUrl}/${img}`")
                v-card-text(v-if="recipe.recipe_ingredients.length > 0 || recipe.recipe_directions.length > 0")
                  v-row(align="center" justify="center")
                    v-col.mb-2(v-if="recipe.recipe_ingredients.length > 0" cols="12" md="6")
                      h5.text-h5.mb-3 #[i.fa.fa-pepper-hot] Ingredients
                      //- v-list
                      //-   v-list-item-group
                      //-     v-list-item.mb-2(v-for="(ing, ind) in recipe.recipe_ingredients" :key="ind")
                      //-       | {{ ing.quantity }} {{ ing.measurement }} {{ ing.description || ing.raw.label }}
                      ul
                        li.mb-3(v-for="ing in recipe.recipe_ingredients")
                          | {{ ing.quantity }} {{ ing.measurement }} {{ ing.description || ing.raw.label }}
                    v-col.mb-2(cols="12" md="6")
                      h5.text-h5.mb-2 #[i.fa.fa-list-ol] Directions
                      ol.directions.ml-2
                        li.mb-3(v-for="(dir, ind) in recipe.recipe_directions" :key="ind")
                          | {{ dir.description }}

</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async middleware({ route, store }: Context) {
    await store.dispatch('getRecipe', route.params.id)
  },

  watch: {
    async id(newId) {
      await this.$store.dispatch('getRecipe', newId)
    },
  },

  computed: {
    ...mapState([
      's3BucketUrl',
      'recipe',
      'recipeAvgRating',
      'recipeUserRating',
      'user',
    ]),

    id() {
      return this.$route.params.id
    },

    recipeImages() {
      return this.recipe.recipe_images.map((i) => i.imageNameOptimized)
    },

    totalTime() {
      return (this.recipe.prepTime || 0) + (this.recipe.cookTime || 0)
    },

    totalTimeUnits() {
      return this.recipe.prepTimeUnits
    },

    shouldShowImageAndSpecCard() {
      return (
        this.recipeImages.length > 0 ||
        this.recipe.recipe_ingredients.length > 0 ||
        this.recipe.recipe_directions.length > 0
      )
    },
  },

  methods: {
    // filterOnTag(tagId) {
    //   console.log('TAGFILTER', tagId)
    // },

    async setUserRating(newRating) {
      if (!this.user) {
        return this.$toast.error(
          `Sorry, you have to be logged in to add a rating!`
        )
      }
      await this.$store.dispatch('setRecipeUserRating', {
        recipeId: this.id,
        rating: Math.round(newRating),
      })
    },
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

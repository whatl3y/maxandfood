<template lang="pug">
  v-container
    v-row(align="center" justify="center")
      v-col(v-if="!homeRecipes || homeRecipes.length === 0")
        v-alert.mx-auto.text-center(max-width="500" color="orange")
          h4.m-0 No recipes available to show yet!
      v-col(
        v-else
        v-for="(recipe, ind) in homeRecipes"
        :key="ind"
        cols="6"
        md="4"
        lg="3")
          nuxt-link(:to="`/p/${recipe.id}`")
            v-card
              v-img.white--text.align-end(:src="`${s3BucketUrl}/${recipe.recipe_images[0].imageNameOptimized}`")
              v-list(two-line)
                v-list-item
                  v-list-item-avatar(v-if="recipe.user && recipe.user.avatarUrl")
                    v-img(:src="recipe.user.avatarUrl")
                  v-list-item-content
                    v-list-item-title {{ recipe.title }}
                    v-list-item-subtitle
                      div.d-flex.align-start
                        div {{ recipe.user.firstName }} {{ recipe.user.lastName }}
                        div.ml-auto.text-caption.font-weight-thin
                          small {{ $dayjs.formatDate(recipe.createdAt) }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async middleware({ store }: Context) {
    await store.dispatch('getHomeRecipes')
  },

  computed: mapState(['s3BucketUrl', 'homeRecipes']),
})
</script>

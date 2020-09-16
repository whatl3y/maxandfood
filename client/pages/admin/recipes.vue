<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center")
      v-col(offset-md="2" md="8")
        v-card
          v-simple-table(v-slot:default)
            thead
              tr
                th #
                th Recipe
                th Created
                th Published?
                th.text-right Actions
            tbody
              tr(v-for="(recipe, ind) in allRecipes")
                td {{ ind + 1 }}.
                td
                  nuxt-link.d-flex.align-center(:to="`/recipe/${recipe.id}`")
                    v-avatar.mr-2(v-if="recipe.recipe_images.length > 0" size="36")
                      img(:src="`${s3BucketUrl}/${recipe.recipe_images[0].imageNameOptimized}`")
                    div {{ recipe.title }}
                td {{ formatDate(recipe.createdAt) }}
                td
                  v-switch(
                    :input-value="recipe.isLive"
                    @change="toggleLive(recipe)")
                td.text-right
                  //- nuxt-link(:to="`/recipe/${recipe.id}`")
                  //-   v-btn(color="blue" fab dark x-small)
                  //-     i.fa.fa-link
                  nuxt-link(:to="`/admin/recipe/${recipe.id}`")
                    v-btn(color="orange" fab dark x-small)
                      i.fa.fa-edit
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async middleware({ store }: Context) {
    await store.dispatch('getAllRecipes')
  },

  computed: mapState(['s3BucketUrl', 'allRecipes']),

  methods: {
    formatDate(str: Date | string) {
      return moment(str).format('MM/DD/YYYY h:mma')
    },

    async toggleLive(recipe) {
      try {
        await this.$axios.$post('/api/1.0/recipes/save', {
          id: recipe.id,
          isLive: !recipe.isLive,
        })
      } catch (err) {}
    },
  },
})
</script>

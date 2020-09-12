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
                th.text-right Actions
            tbody
              tr(v-for="(recipe, ind) in allRecipes")
                td {{ ind + 1 }}.
                td {{ recipe.title }}
                td {{ formatDate(recipe.createdAt) }}
                td.text-right
                  nuxt-link(:to="`/admin/recipe/${recipe.id}`")
                    v-btn(color="orange" fab dark small)
                      i.fa.fa-edit
                  nuxt-link.ml-2(:to="`/recipe/${recipe.id}`")
                    v-btn(color="blue" fab dark small)
                      i.fa.fa-link
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

  computed: mapState(['allRecipes']),

  methods: {
    formatDate(str: Date | string) {
      return moment(str).format('YYYY-MM-DD h:mma')
    },
  },
})
</script>

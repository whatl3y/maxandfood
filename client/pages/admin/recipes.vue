<template lang="pug">
  div.container.container-sm.mb-5
    h1.text-center Your recipes
    div.alert.alert-danger.text-center(v-if="allRecipes.length === 0")
      | You haven't created any recipes yet.
      | #[nuxt-link(to="/admin/recipe/new") Click here]
      | to create your first recipe!
    table.border.table-hover
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
            nuxt-link(:to="`/recipe/${recipe.id}`")
              button.btn-primary-outline.btn-small
                i.fa.fa-link
            nuxt-link.ml-2(:to="`/admin/recipe/${recipe.id}`")
              button.btn-warning-outline.btn-small
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

  computed: mapState(['allRecipes']),

  methods: {
    formatDate(str: Date | string) {
      return moment(str).format('YYYY-MM-DD h:mma')
    },
  },
})
</script>

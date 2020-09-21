<template lang="pug">
  v-container(fill-height)
    v-row(align-content="center" justify-content="center" dense)
      v-col(offset-md="1" md="2")
        v-tabs.elevation-1(
          v-model="tab"
          :vertical="true")
            v-tabs-slider
            v-tab(
              v-for="(t, i) in tabs"
              v-if="typeof t.condition === 'undefined' || t.condition"
              nuxt
              :key="i"
              :to="`/admin/settings/${t.link}`") {{ t.text }}
      v-col(md="8")
        nuxt-child
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  data() {
    const tabs = [
      { text: 'Recipes', name: 'admin-settings-recipes', link: 'recipes' },
      { text: 'Account', name: 'admin-settings-account', link: 'account' },
      {
        text: 'Tags',
        name: 'admin-settings-tags',
        link: 'tags',
        condition: true,
      },
    ]

    return {
      tab: tabs.find((t) => t.name === this.$route.name).name,
      tabs,
    }
  },
})
</script>

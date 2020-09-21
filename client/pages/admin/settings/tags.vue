<template lang="pug">
  div
    div
      a(@click="toggleCreateCard()") Create new tag...
    v-card(v-if="isCreatingTag")
      v-card-title
        h4 New Tag
      v-card-text
        v-row(justify="center")
          v-col(cols="12" md="4")
            v-text-field(
              v-model='newTag.name'
              light
              label='Tag Name')
          v-col(cols="12" md="4")
            v-text-field(
              v-model='newTag.description'
              light
              label='Description')
          v-col(cols="12" md="4")
            v-color-picker(
              :value="newTag.colorHex"
              @input="setNewTagColor"
              elevation="1")
          v-col(v-if="newTag.name" cols="12")
            tag.mr-1(:color="newTag.colorHex || 'blue'") {{ newTag.name }}
            v-btn(@click="saveTag()") Save Tag
    div.mt-4(v-if="tags.length > 0")
      tag.ma-1(
        v-for="(tag, ind) in tags"
        :key="`tag-${ind}`"
        :close="true"
        :color="tag.colorHex || 'blue'") {{ tag.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async middleware({ store }: Context) {
    await store.dispatch('getAllTags')
  },

  data() {
    return {
      isCreatingTag: false,
      newTag: buildNewTag(),
    }
  },

  computed: mapState(['tags']),

  methods: {
    setNewTagColor(color) {
      this.newTag.colorHex = color.slice(0, 7)
    },

    toggleCreateCard() {
      this.isCreatingTag = !this.isCreatingTag
    },

    async saveTag(tag = this.newTag) {
      await this.$axios.$post('/api/1.0/tags/save', tag)
      await this.$store.dispatch('getAllTags')
      this.newTag = buildNewTag()
    },
  },
})

function buildNewTag() {
  return {
    name: null,
    description: null,
    colorHex: '#00f',
  }
}
</script>

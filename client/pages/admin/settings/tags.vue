<template lang="pug">
  div
    div
      a(@click="toggleCreateCard()") Create new tag...
    tag-editor(
      v-if="isCreatingTag"
      v-model="newTag"
      @saved="tagSaved")
    div.mt-4(v-if="tags.length > 0")
      tag.ma-1(
        v-for="(tag, ind) in tags"
        :key="`tag-${ind}`"
        :close="true"
        :color="tag.colorHex || 'blue'"
        @click="setEditingTag(tag)"
        @close="updateDeletedStatus(tag)")
          v-icon.mr-1(
            v-if="tag.isDeleted"
            color="orange"
            small) fas fa-minus-square
          | {{ tag.name }}
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
    setEditingTag(tag) {
      this.newTag = { ...tag }
      this.isCreatingTag = true
    },

    toggleCreateCard() {
      this.isCreatingTag = !this.isCreatingTag
    },

    tagSaved() {
      this.newTag = buildNewTag()
    },

    async updateDeletedStatus({ id, isDeleted }) {
      await this.$axios.$post('/api/1.0/tags/save', {
        id,
        isDeleted: !isDeleted,
      })
      await this.$store.dispatch('getAllTags')
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

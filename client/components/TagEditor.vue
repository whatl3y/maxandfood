<template lang="pug">
  v-card
    v-card-title
      h4 {{ value.id ? `Editing ${editableName}` : 'New Tag' }}
    v-card-text
      v-row(justify="center")
        v-col(cols="12" md="4")
          v-text-field(
            v-model='editableName'
            light
            label='Tag Name')
        v-col(cols="12" md="4")
          v-text-field(
            v-model='editableDescription'
            light
            label='Description')
        v-col(cols="12" md="4")
          v-color-picker(
            :value="editableColor"
            @input="setNewTagColor"
            elevation="1")
        v-col(v-if="editableName" cols="12")
          tag.mr-1(:color="editableColor || 'blue'") {{ editableName }}
          v-btn(@click="saveTag()") Save Tag
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    value: { type: Object, default: () => {} },
  },

  computed: {
    editableName: {
      get() {
        return this.value.name
      },

      set(newName) {
        this.$emit('input', { ...this.value, name: newName })
      },
    },

    editableDescription: {
      get() {
        return this.value.description
      },

      set(newDesc) {
        this.$emit('input', { ...this.value, description: newDesc })
      },
    },

    editableColor: {
      get() {
        return this.value.colorHex
      },

      set(newColorHex) {
        this.$emit('input', { ...this.value, colorHex: newColorHex })
      },
    },
  },

  methods: {
    setNewTagColor(color) {
      this.editableColor = color.slice(0, 7)
    },

    async saveTag() {
      await this.$axios.$post('/api/1.0/tags/save', this.value)
      await this.$store.dispatch('getAllTags')
      this.$emit('saved')
    },
  },
})
</script>

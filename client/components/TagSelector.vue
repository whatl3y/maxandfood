<template lang="pug">
  v-combobox(
    v-if="undeletedTags.length > 0"
    v-model="selectedTags"
    :items="undeletedTags"
    chips
    clearable
    :label="label"
    prepend-icon="mdi-label"
    item-text="name"
    multiple
    solo)
      template(v-slot:selection="{ attrs, item, select, selected }")
        tag(
          :color="item.colorHex"
          close
          @close="removeTag(item)") {{ item.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    value: { type: Array, default: () => [] },
    label: { type: String, default: 'Add tags...' },
  },

  computed: {
    ...mapState(['tags']),

    undeletedTags() {
      return this.tags.filter((t) => !t.isDeleted)
    },

    selectedTags: {
      get() {
        return this.value
      },

      set(tags) {
        this.$emit('input', tags)
      },
    },
  },

  methods: {
    removeTag({ id }) {
      this.selectedTags = this.selectedTags.filter((t) => t.id !== id)
    },
  },

  async created() {
    await this.$store.dispatch('getAllTags')
  },
})
</script>

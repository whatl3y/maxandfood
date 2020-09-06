<template lang="pug">
  div.form-group.m-0
    label
      h4.my-0 Prep Time
    input#prep-time.mb-1.input-block(type="number" placeholder="Prep time" v-model="prepTime")
    select#prep-time-unit.input-block(v-model="prepTimeUnit")
        option(v-for="unit in timeUnits" :value="unit") {{ unit }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: { type: Object, required: true },
    placeholder: { type: String, default: 'Enter time' },
    label: { type: String, default: 'Enter time' },
  },
})
</script>

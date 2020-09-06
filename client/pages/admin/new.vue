<template lang="pug">
  div.container.container-sm
    h1.text-center Create new recipe!

    div.form-group
      label(for="recipe-title")
        h4.mt-3.mb-0 Recipe Title
      input#recipe-title.input-block(placeholder="Recipe Title" v-model="title")

    div.row
      div.col.md-4
        div.card
          div.card-body.background-secondary
            div.form-group.m-0
              label
                h4.my-0 Prep Time
              input#prep-time.mb-1.input-block(type="number" placeholder="Prep time" v-model="prepTime")
              select#prep-time-unit.input-block(v-model="prepTimeUnit")
                  option(v-for="unit in timeUnits" :value="unit") {{ unit }}
          //- div.row.small-gutters
          //-   div.col.md-6
          //-     input#prep-time.input-block(type="number" placeholder="Prep time" v-model="prepTime")
          //-   div.col.md-6
          //-     select#prep-time-unit.input-block(v-model="prepTimeUnit")
          //-       option(v-for="unit in timeUnits" :value="unit") {{ unit }}

    div.form-group
      label
        h4.mt-3.mb-0 Ingredients

    div.form-group
      label
        h4.mt-3.mb-0 Recipe Narrative
      client-only(placeholder="Loading...")
        rich-text-editor(v-model="narrative")

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      title: null,
      prepTime: null,
      prepTimeUnit: 'minutes',
      narrative: `
        <h3>This is a section heading!</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <ol>
          <li>this is</li>
          <li>a numbered list</li>
        </ol>
      `,
    }
  },

  computed: {
    timeUnits() {
      return ['minutes', 'hours']
    },
  },
})
</script>

<template lang="pug">
  - // .fixed navbar class
  nav.split-nav.shadow.shadow-large.margin-bottom-large
    div.nav-brand
      h3
        nuxt-link(to="/") eat w/ max
    div.collapsible
      input#collapsible1(type="checkbox" name="collapsible1")
      label(for="collapsible1")
        div.bar1
        div.bar2
        div.bar3
      div.collapsible-body
        ul.inline
          li
            a(href="#") Find Recipes
          li(v-if="user")
            a(href="/logout") Logout
          li(v-else)
            nuxt-link(to="/login") Login
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootState } from '../store/state'

export default Vue.extend({
  computed: mapState(['user']),
})
</script>

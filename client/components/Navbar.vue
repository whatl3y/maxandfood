<template lang="pug">
  - // .fixed navbar class
  nav.split-nav.shadow.shadow-large.margin-bottom-large
    div.nav-brand.row.m-0
      h4.m-0.text-nowrap.align-middle
        nuxt-link(to="/")
          img.my-0.mx-2.float-left.no-border(style="max-height: 30px",src="/public/max-papoose.png")
          span.float-left.m-0 max &amp; food
    div.collapsible
      input#collapsible1(type="checkbox" name="collapsible1")
      label(for="collapsible1")
        div.bar1
        div.bar2
        div.bar3
      div.collapsible-body
        ul.inline
          //- li
          //-   a(href="#")
          //-     small Find Recipes
          template(v-if="user")
            li.text-nowrap
              nuxt-link(to="/admin/recipes")
                small Your Recipes
            li
              nuxt-link(to="/admin/new" title="Add recipe!")
                button.btn-success.btn-small #[i.fa.fa-plus]
            li
              a(href="/logout" title="Logout")
                button.btn-danger.btn-small
                  i.fa.fa-power-off
          li(v-else)
            nuxt-link(to="/login")
              button.btn-success.py-2 Login
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootState } from '../store/state'

export default Vue.extend({
  computed: mapState(['user']),
})
</script>

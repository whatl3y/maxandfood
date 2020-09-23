<template lang="pug">
  v-app-bar(app)
    //- v-app-bar-nav-icon
    v-toolbar-title
      nuxt-link(to="/")
        img.float-left.mr-2(
          style="max-height: 30px"
          src="/public/favicon.ico")
        span.float-left max &amp; food
    v-spacer
    template(v-if="user")
      nuxt-link(to="/admin/settings/recipes")
        v-avatar.mr-2(size="36")
          img(
            v-if="user && user.avatarUrl"
            :src="user.avatarUrl"
            :alt="user.firstName")
          v-icon(v-else dark color="primary") mdi-account-circle
        //- v-btn(icon)
        //-   v-icon mdi-food-fork-drink
      nuxt-link(to="/admin/post/new" title="Add recipe!")
        v-btn(icon color="green")
          v-icon mdi-plus-circle-outline
      a(href="/logout" title="Logout")
        v-btn(icon color="red")
          v-icon mdi-logout
    nuxt-link(v-else to="/login")
      v-btn(icon color="green")
        v-icon mdi-login
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: mapState(['user']),
})
</script>

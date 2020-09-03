<template lang="pug">
  div.paper.container.container-xs.margin-bottom-large
    form(@submit="tryToLogin")
      h3.margin-top-none Login
      div.alert.alert-danger(v-if="error") {{ error }}
      div.form-group
        label(for="login") Email address:
        input.input-block(type="text" placeholder="Email address" v-model="email")
      div.form-group
        label(for="login") Password:
        input.input-block(type="password" v-model="password")
      div.margin-top.text-center
        button.btn-primary(type="submit") Login
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootState } from '../store/state'

export default Vue.extend({
  data() {
    return {
      email: null,
      password: null,
      error: null,
    }
  },

  computed: mapState(['user']),

  methods: {
    async tryToLogin(evt: Event) {
      try {
        evt.preventDefault()
        await this.$axios.post('/auth/login', {
          username: this.email,
          password: this.password,
        })
        this.$router.push('/')
      } catch (err) {
        const baseErr =
          err.response &&
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.message
        this.error = baseErr || err.stack
      }
    },
  },

  created() {
    if (this.user) this.$router.push('/')
  },
})
</script>

<template lang="pug">
  v-container(fill-height)
    v-layout(align-center justify-center)
      v-flex.login-form.text-xs-center
        v-alert(v-if="error" type="error") {{ error }}
        v-card.mx-auto(light max-width="400")
          v-card-text
            v-form(@submit="tryToLogin")
              //- v-text-field(v-if='!options.isLoggingIn' v-model='user.name' light prepend-icon='person' label='Name')
              v-text-field(
                v-model='email'
                light
                prepend-icon='mdi-email'
                label='Email'
                type='email')
              v-text-field(
                v-model='password'
                light
                prepend-icon='mdi-lock'
                label='Password'
                type='password')
              //- v-checkbox(v-if='options.isLoggingIn' v-model='options.shouldStayLoggedIn' light label='Stay logged in?' hide-details)
              v-btn(block type='submit') Sign in
              //- v-btn(v-else block type='submit' @click.prevent='options.isLoggingIn = true') Sign up
              oauth-button(
                v-if="integrations && integrations.google"
                type="google"
                href="/auth/google")
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

  computed: mapState(['integrations', 'user']),

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

<style>
.login-form {
  max-width: 500px;
}
</style>

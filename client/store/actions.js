export default {
  async init({ dispatch }, reset = false) {
    await dispatch('getUser', reset)
  },

  async getUser({ commit, state }, reset = false) {
    if (state.user && !reset) return

    const data = await this.$axios.$get('/api/1.0/users/me')
    commit('SET_USER', data && data.user)
  },
}

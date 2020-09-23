export default {
  async init({ dispatch }, reset = false) {
    await Promise.all([
      dispatch('getBodyImages', reset),
      dispatch('getGlobalIntegrations', reset),
      dispatch('getUser', reset),
    ])
  },

  async getBodyImages({ commit, state }, reset = false) {
    if (state.bodyImages.length > 0 && !reset) return

    const data = await this.$axios.$get('/unprotected/global/bodyimages')
    commit(
      'SET_BODY_IMAGES',
      data &&
        data.images &&
        data.images.map((img) => ({
          src: img.imageName,
          position: img.position,
        }))
    )
  },

  async getGlobalIntegrations({ commit, state }, reset = false) {
    if (
      state.integrations &&
      Object.keys(state.integrations).length > 0 &&
      !reset
    )
      return

    const data = await this.$axios.$get('/unprotected/global/integrations')
    commit('SET_GLOBAL_INTEGRATIONS', data && data.integrations)
  },

  async getAllTags({ commit }) {
    const data = await this.$axios.$get('/unprotected/global/tags')
    commit('SET_TAGS', data && data.tags)
  },

  async getUser({ commit, state }, reset = false) {
    if (state.user && !reset) return

    const data = await this.$axios.$get('/api/1.0/users/me')
    commit('SET_USER', data && data.user)
  },

  async getAccount({ commit }) {
    const data = await this.$axios.$get('/api/1.0/accounts/me')
    commit('SET_ACCOUNT', data && data.account)
    commit('SET_ACCOUNT_IMAGES', data && data.images)
  },

  async getAllRecipes({ commit }) {
    const { recipes } = await this.$axios.$get(`/api/1.0/recipes/all`)
    commit('SET_ALL_RECIPES', recipes)
  },

  async getRecipe({ commit }, recipeId) {
    const { recipe, ratingAvg, userRating } = await this.$axios.$get(
      `/api/1.0/recipes/get?id=${recipeId}`
    )
    commit('SET_RECIPE', recipe)
    commit('SET_RECIPE_AVG_RATING', ratingAvg)
    commit('SET_RECIPE_USER_RATING', userRating)
  },

  async setRecipeUserRating({ commit }, { recipeId, rating }) {
    await this.$axios.$post(`/api/1.0/recipes/rating`, { recipeId, rating })
    commit('SET_RECIPE_USER_RATING', rating)
  },

  async getHomeRecipes({ commit }) {
    const { recipes } = await this.$axios.$get('/api/1.0/recipes/home')
    commit('SET_HOME_RECIPES', recipes)
  },
}

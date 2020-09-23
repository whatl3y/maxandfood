import { MutationTree } from 'vuex'
import { RootState } from './state'

const mutations: MutationTree<RootState> = {
  SET_BODY_IMAGES(state, images) {
    state.bodyImages = images
  },

  SET_GLOBAL_INTEGRATIONS(state, integrations: any) {
    state.integrations = integrations
  },

  SET_TAGS(state, tags: any[]) {
    state.tags = tags
  },

  SET_USER(state, user: any) {
    state.user = user
  },

  SET_ACCOUNT(state, account: any) {
    state.account = account
  },

  SET_ACCOUNT_FIELD(state, { key, value }) {
    state.account = {
      ...state.account,
      [key]: value,
    }
  },

  SET_ACCOUNT_IMAGES(state, images: any) {
    state.accountImages = images
  },

  SET_ALL_RECIPES(state, recipes: any) {
    state.allRecipes = recipes
  },

  SET_RECIPE(state, recipe: any) {
    state.recipe = recipe
  },

  SET_RECIPE_AVG_RATING(state, rating: null | number) {
    state.recipeAvgRating = rating
  },

  SET_RECIPE_USER_RATING(state, rating: null | number) {
    state.recipeUserRating = rating
  },

  SET_HOME_RECIPES(state, recipes: any) {
    state.homeRecipes = recipes
  },

  SET_SNACKBAR_COLOR(state, color) {
    state.snackbar.color = color
  },

  SET_SNACKBAR_SHOW(state, show) {
    state.snackbar.show = show
  },

  SET_SNACKBAR(state, info) {
    let color: string = 'red'
    let text: string = ''
    if (typeof info === 'object') {
      color = info.color
      text = info.text
    } else {
      text = info
    }
    state.snackbar.color = color || 'red'
    state.snackbar.text = text
    state.snackbar.show = true
  },
}

export default mutations

import { MutationTree } from 'vuex'
import { RootState } from './state'

const mutations: MutationTree<RootState> = {
  SET_BODY_IMAGES(state, images) {
    state.bodyImages = images
  },

  SET_GLOBAL_INTEGRATIONS(state, integrations: any) {
    state.integrations = integrations
  },

  SET_USER(state, user: any) {
    state.user = user
  },

  SET_ALL_RECIPES(state, recipes: any) {
    state.allRecipes = recipes
  },

  SET_RECIPE(state, recipe: any) {
    state.recipe = recipe
  },

  SET_HOME_RECIPES(state, recipes: any) {
    state.homeRecipes = recipes
  },
}

export default mutations

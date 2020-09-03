import { MutationTree } from 'vuex'
import { RootState } from './state'

const mutations: MutationTree<RootState> = {
  SET_USER(state, user: any) {
    state.user = user
  },
}

export default mutations

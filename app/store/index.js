import { firebaseMutations } from 'vuexfire'
import _ from 'lodash'

export const state = () => ({
  app: {},
  isLoading: true
})

export const mutations = {
  ...firebaseMutations,
  updateLoading(state, loadingState) {
    state.isLoading = loadingState
  }
}

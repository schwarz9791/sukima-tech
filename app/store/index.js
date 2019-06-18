import { vuexfireMutations } from 'vuexfire'
import _ from 'lodash'

export const state = () => ({
  app: {},
  isLoading: true
})

export const mutations = {
  ...vuexfireMutations,
  updateLoading(state, loadingState) {
    state.isLoading = loadingState
  }
}

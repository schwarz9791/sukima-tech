import * as types from './types.js'

const mutations = {
  [types.MUTATE_SET_USER]: (state, payload) => {
    state.user = payload
  }
}

export default mutations

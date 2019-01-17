import * as types from './types.js'

const actions = {
  [types.ACTION_SET_USER]({ commit }, payload) {
    commit(types.MUTATE_SET_USER, payload)
  }
}

export default actions

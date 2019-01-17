import * as types from './types.js'

const getters = {
  [types.GETTER_AUTH_USER]: state => {
    return state.user
  },
  [types.GETTER_IS_AUTHENTICATED]: state => {
    return !!state.user
  }
}

export default getters

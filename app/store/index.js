import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  user: null,
  token: null
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
}

export default createStore

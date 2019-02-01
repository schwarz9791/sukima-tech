import * as types from './types.js'

const mutations = {
  [types.MUTATE_SET_USER]: (state, payload) => {
    if (!!payload && payload.uid) {
      state.user = {
        uid: payload.uid,
        displayName: payload.displayName,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL
      }
    } else {
      state.user = null
    }
  },
  [types.MUTATE_SET_TOKEN]: (state, payload) => {
    state.token = payload
  }
}

export default mutations

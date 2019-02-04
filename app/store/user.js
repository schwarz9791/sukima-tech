export const state = () => ({
  user: null,
  token: null
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  setToken({ commit }, payload) {
    commit('setToken', payload)
  }
}

export const mutations = {
  setUser(state, payload) {
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
  setToken(state, payload) {
    state.token = payload
  }
}

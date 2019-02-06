import firebase from '@/plugins/firebase'

const db = firebase.firestore()

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
  async setUser({ commit }, payload) {
    if (payload && payload.uid) {
      await db
        .collection('users')
        .doc(payload.uid)
        .set({
          displayName: payload.displayName,
          email: payload.email,
          emailVerified: payload.emailVerified,
          phoneNumber: payload.phoneNumber,
          photoURL: payload.photoURL
        })
        .then(() => {
          commit('setUser', payload)
        })
        .catch(error => {
          console.error('Error writing document: ', error)
        })
    } else {
      commit('setUser', null)
    }
  },
  setToken({ commit }, payload) {
    commit('setToken', payload)
  },
  async setAuthorizedUser({ commit }, { result, next }) {
    try {
      const user = result.user
      if (!!user && user.uid) {
        await db
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const token = result.credential.accessToken
              commit('setToken', token)
              commit('setUser', user)
              if (next) this.$router.push(next)
            } else {
              throw new Error('Permission denied.')
            }
          })
      }
    } catch (error) {
      console.error(error.message)
    }
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

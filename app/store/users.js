import firebase from '@/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  user: null
})

export const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.user && state.user.token ? state.user.token : null
  }
}

export const actions = {
  async user({ commit }, payload) {
    if (payload && payload.uid) {
      try {
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
        commit('user', payload)
      } catch (error) {
        console.error('Error writing document: ', error)
      }
    } else {
      commit('user', null)
    }
  },
  token({ commit }, payload) {
    commit('token', payload)
  },
  async authorizedUser({ commit }, { result, next }) {
    try {
      const user = result.user
      if (!!user && user.uid) {
        const doc = await db
          .collection('users')
          .doc(user.uid)
          .get()
        if (doc.exists) {
          const token = result.credential.accessToken
          commit('user', user)
          commit('token', token)
          if (next) this.$router.push(next)
        } else {
          throw new Error('Permission denied.')
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const mutations = {
  user(state, payload) {
    if (!!payload && payload.uid) {
      state.user = {
        uid: payload.uid,
        displayName: payload.displayName,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
        token: null
      }
    } else {
      state.user = null
    }
  },
  token(state, payload) {
    state.user.token = payload
  }
}

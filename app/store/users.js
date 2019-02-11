import firebase from '@/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({
  user: null,
  token: null
})

export const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.token
  }
}

export const actions = {
  async user({ commit }, payload) {
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
          commit('user', payload)
        })
        .catch(error => {
          console.error('Error writing document: ', error)
        })
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
        await db
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const token = result.credential.accessToken
              commit('token', token)
              commit('user', user)
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
  user(state, payload) {
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
  token(state, payload) {
    state.token = payload
  }
}

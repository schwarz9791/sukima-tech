import * as types from './types.js'
import firebase from '@/plugins/firebase'

const actions = {
  [types.ACTION_SET_USER]({ commit }, payload) {
    commit(types.MUTATE_SET_USER, payload)
  },
  [types.ACTION_SET_TOKEN]({ commit }, payload) {
    commit(types.MUTATE_SET_TOKEN, payload)
  },
  [types.ACTION_AUTH_LOGIN]() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ hd: 'sukima.tech' })
    firebase
      .auth()
      .signInWithRedirect(provider)
      .catch(error => {
        alert(error)
      })
  },
  [types.ACTION_AUTH_LOGOUT]({ dispatch }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(types.ACTION_SET_USER, null)
      })
      .catch(error => {
        alert(error)
      })
  },
  async [types.ACTION_GET_REDIRECT_RESULT]({ dispatch }, next) {
    await firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          const token = result.credential.accessToken
          dispatch(types.ACTION_SET_TOKEN, token)
        }
        const user = result.user
        if (!!user) {
          dispatch(types.ACTION_SET_USER, user)
          if (next) this.$router.push(next)
        } else {
          throw new Error('Not logged in.')
        }
      })
  }
  // async [types.ACTION_GET_ALL_USERS]({}, payload) {
  //   const response = await this.$axios.$get()
  // }
}

export default actions

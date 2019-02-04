import firebase from '@/plugins/firebase'
import { mapActions } from 'vuex'

export const actions = {
  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ hd: 'sukima.tech' })
    firebase
      .auth()
      .signInWithRedirect(provider)
      .catch(error => {
        alert(error)
      })
  },
  logout({ dispatch }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch('user/setUser', null, { root: true })
      })
      .catch(error => {
        alert(error)
      })
  },
  async getRedirectResult({ dispatch }, next) {
    await firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          const token = result.credential.accessToken
          dispatch('user/setToken', token, { root: true })
        }
        const user = result.user
        if (!!user) {
          dispatch('user/setUser', user, { root: true })
          if (next) this.$router.push(next)
        } else {
          throw new Error('Not logged in.')
        }
      })
  }
}

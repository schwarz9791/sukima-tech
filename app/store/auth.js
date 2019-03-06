import firebase from '@/plugins/firebase'

export const actions = {
  async login() {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({ hd: 'sukima.tech' })
      await firebase.auth().signInWithRedirect(provider)
    } catch (error) {
      alert(error)
    }
  },
  async logout({ dispatch }) {
    try {
      await firebase.auth().signOut()
      dispatch('users/user', null, { root: true })
    } catch (error) {
      alert(error)
    }
  },
  async getRedirectResult({ dispatch }, next) {
    try {
      const result = await firebase.auth().getRedirectResult()
      dispatch('users/authorizedUser', { result, next }, { root: true })
    } catch (error) {
      console.error(error.message)
    }
  }
}

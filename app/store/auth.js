import firebase from '@/plugins/firebase'

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
    try {
      await firebase
        .auth()
        .getRedirectResult()
        .then(result => {
          dispatch('user/setAuthorizedUser', { result, next }, { root: true })
        })
    } catch (error) {
      console.error(error.message)
    }
  }
}

import FirebaseLocalStorageDB from '@/assets/javascripts/FirebaseLocalStorageDB'

export default async function({ store, route, redirect }) {
  try {
    const db = await FirebaseLocalStorageDB.connect()
    const firebaseData = await db.get(
      `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`
    )
    if (firebaseData) {
      store.commit('users/user', firebaseData.value)
      store.commit(
        'users/token',
        firebaseData.value.stsTokenManager.accessToken
      )
    }
    if (store.getters['users/user']) return
    if (
      route.name !== 'admin' &&
      route.name !== 'admin-logout' &&
      route.name.includes('admin')
    ) {
      throw new Error('Please login.')
    }
  } catch (e) {
    alert(e.message)
    redirect(`/admin?rd=${route.path}`)
  }
}
